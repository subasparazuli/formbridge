import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

export async function POST(request: Request) {
    try {
        const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || '';
        if (!secret) {
            console.error('LEMON_SQUEEZY_WEBHOOK_SECRET is not set');
            return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
        }

        const rawBody = await request.text();
        const signature = request.headers.get('x-signature') || '';

        const hmac = crypto.createHmac('sha256', secret);
        const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
        const signatureBuffer = Buffer.from(signature, 'utf8');

        // Timing safe comparison to prevent timing attacks
        if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const payload = JSON.parse(rawBody);
        const eventName = payload.meta.event_name;

        console.log(`Received Lemon Squeezy webhook: ${eventName}`);

        // Only process successful subscription or order events
        if (eventName === 'subscription_created' || eventName === 'order_created') {
            const customerId = payload.data.attributes.customer_id?.toString();
            // Assuming we pass the Supabase user ID through the custom data in the checkout link
            const userId = payload.meta.custom_data?.user_id;

            if (!userId) {
                console.warn('Webhook received without user_id in custom_data');
                return NextResponse.json({ success: true, warning: 'No user_id provided' }, { status: 200 });
            }

            if (supabase) {
                // Upsert to profiles (assuming they might not have a profile yet)
                const { error } = await supabase
                    .from('profiles')
                    .upsert({
                        id: userId,
                        subscription_status: 'pro',
                        lemon_squeezy_customer_id: customerId
                    });

                if (error) {
                    console.error('Failed to update user profile to Pro:', error);
                    return NextResponse.json({ error: 'Failed to update database' }, { status: 500 });
                }

                console.log(`Successfully upgraded user ${userId} to Pro`);
            } else {
                console.warn('Supabase not configured. Mocking Pro upgrade for user:', userId);
            }
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Webhook processing error:', error);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}
