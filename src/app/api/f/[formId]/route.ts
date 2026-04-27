import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const resendApiKey = process.env.RESEND_API_KEY || '';

// Initialize clients conditionally to prevent build crashes if env vars are missing
const supabase = supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(
    request: Request,
    { params }: { params: Promise<{ formId: string }> }
) {
    try {
        const { formId } = await params;

        if (!formId) {
            return NextResponse.json({ error: 'Form ID is required' }, { status: 400 });
        }

        // Parse formData or JSON body
        let data: Record<string, any> = {};
        const contentType = request.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
            data = await request.json();
        } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
            const formData = await request.formData();
            formData.forEach((value, key) => {
                data[key] = value;
            });
        }

        // 1. Honeypot check for spam protection
        // Assume '_my_honeypot' is the invisible field. 
        // If it has any value, silently succeed but don't save to DB.
        if (data['_my_honeypot']) {
            console.log(`[Form ${formId}] Blocked spam submission via honeypot`);
            return NextResponse.json(
                { success: true, message: 'Submission received securely.' },
                { status: 200 }
            );
        }

        // Clean up internal fields before saving
        delete data['_my_honeypot'];

        // 2. Validate Form ID exists (if Supabase is configured)
        if (supabase) {
            const { data: form, error: formError } = await supabase
                .from('forms')
                .select('id, name, notify_email, user_id')
                .eq('id', formId)
                .single();

            if (formError || !form) {
                console.error('Form not found or error:', formError);
                return NextResponse.json({ error: 'Invalid Form ID' }, { status: 404 });
            }

            // 2.5 Check subscription limits
            const { data: profile } = await supabase
                .from('profiles')
                .select('subscription_status')
                .eq('id', form.user_id)
                .single();

            const isPro = profile?.subscription_status === 'pro';

            if (!isPro) {
                const { count, error: countError } = await supabase
                    .from('submissions')
                    .select('*', { count: 'exact', head: true })
                    .eq('form_id', formId);

                if (countError) {
                    console.error('Error counting submissions:', countError);
                    return NextResponse.json({ error: 'Failed to check submission limits' }, { status: 500 });
                }

                if (count !== null && count >= 10) {
                    return NextResponse.json(
                        { success: false, error: 'Form submission limit reached on Free plan.' },
                        { status: 403 }
                    );
                }
            }

            // 3. Save the submission data
            const { error: insertError } = await supabase
                .from('submissions')
                .insert([{ form_id: formId, data }]);

            if (insertError) {
                console.error('Error saving submission:', insertError);
                return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
            }

            // 4. Trigger Email Notification via Resend (if configured)
            if (resend && form.notify_email) {
                const emailHtml = `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto;">
                        <div style="border-bottom: 1px solid #e5e5e5; padding-bottom: 16px; margin-bottom: 24px;">
                            <h2 style="margin: 0; font-size: 18px; color: #171717;">New submission to <strong>${form.name}</strong></h2>
                            <p style="margin: 4px 0 0; font-size: 13px; color: #737373;">Form ID: ${formId}</p>
                        </div>
                        <table style="width: 100%; border-collapse: collapse;">
                            ${Object.entries(data).map(([key, value]) => `
                                <tr>
                                    <td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-size: 13px; font-weight: 600; color: #525252; background: #fafafa; width: 120px;">${key}</td>
                                    <td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-size: 13px; color: #171717;">${value}</td>
                                </tr>
                            `).join('')}
                        </table>
                        <p style="margin-top: 24px; font-size: 12px; color: #a3a3a3;">Sent via Formbridge · Originally to: ${form.notify_email}</p>
                    </div>
                `;

                try {
                    // Try sending to the form's configured notify_email
                    const emailResult = await resend.emails.send({
                        from: 'Formbridge <onboarding@resend.dev>',
                        to: form.notify_email,
                        subject: `New submission to ${form.name}`,
                        html: emailHtml,
                    });

                    // Resend SDK returns { data, error } — check for error
                    if (emailResult.error) {
                        console.warn(`[Email] Failed to send to ${form.notify_email}:`, emailResult.error.message);

                        // On free tier, Resend only allows sending to the account owner's email.
                        // Fall back to DEV_EMAIL_OVERRIDE if configured.
                        const fallbackEmail = process.env.DEV_EMAIL_OVERRIDE;
                        if (fallbackEmail) {
                            console.log(`[Email] Retrying with fallback email: ${fallbackEmail}`);
                            const retry = await resend.emails.send({
                                from: 'Formbridge <onboarding@resend.dev>',
                                to: fallbackEmail,
                                subject: `New submission to ${form.name}`,
                                html: emailHtml,
                            });
                            if (retry.error) {
                                console.error('[Email] Fallback also failed:', retry.error.message);
                            } else {
                                console.log('[Email] Sent to fallback email successfully:', retry.data?.id);
                            }
                        } else {
                            console.warn('[Email] Tip: Set DEV_EMAIL_OVERRIDE in .env to your Resend account email to receive notifications on the free tier.');
                        }
                    } else {
                        console.log('[Email] Notification sent successfully:', emailResult.data?.id);
                    }
                } catch (emailError: any) {
                    console.error('[Email] Error sending notification:', emailError?.message || emailError);
                    // Don't fail the whole request if email fails
                }
            }
        } else {
            // Mock mode if environment variables aren't set
            console.warn('Supabase not configured. Mocking clear submission success for Form ID:', formId);
            console.log('Submission data:', data);

            // Mock tracking logic to test the limit feature
            const globalAny = global as any;
            if (!globalAny.mockSubmissions) {
                globalAny.mockSubmissions = {};
            }
            if (!globalAny.mockSubmissions[formId]) {
                globalAny.mockSubmissions[formId] = 0;
            }

            if (globalAny.mockSubmissions[formId] >= 10) {
                return NextResponse.json(
                    { success: false, error: 'Form submission limit reached on Free plan.' },
                    { status: 403 }
                );
            }

            globalAny.mockSubmissions[formId]++;
            console.log(`Mock submission count: ${globalAny.mockSubmissions[formId]}/10`);
        }

        return NextResponse.json(
            { success: true, message: 'Submission received securely.' },
            {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
            }
        );
    } catch (error) {
        console.error('[API] Submission Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error processing submission' },
            { status: 500 }
        );
    }
}

// Handle CORS preflight requests
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
