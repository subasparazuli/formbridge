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
                try {
                    await resend.emails.send({
                        from: 'Formbridge <notifications@formbridge.dev>', // Update with your verified domain
                        to: form.notify_email,
                        subject: `New submission to ${form.name}`,
                        text: `You have received a new submission:\n\n${JSON.stringify(data, null, 2)}`,
                        // html: `<p>You have received a new submission:</p><pre>${JSON.stringify(data, null, 2)}</pre>`
                    });
                } catch (emailError) {
                    console.error('Error sending email:', emailError);
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
