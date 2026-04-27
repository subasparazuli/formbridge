import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

// Basic function to verify Paddle Webhook Signature
function verifyPaddleSignature(signatureHeader: string, rawBody: string, secret: string): boolean {
    if (!signatureHeader || !secret) return false;
    
    // Paddle signature format: ts=161123...;h1=hash
    const parts = signatureHeader.split(';');
    const tsPart = parts.find(p => p.startsWith('ts='));
    const h1Part = parts.find(p => p.startsWith('h1='));
    
    if (!tsPart || !h1Part) return false;
    
    const ts = tsPart.split('=')[1];
    const signature = h1Part.split('=')[1];
    
    const payload = `${ts}:${rawBody}`;
    const hmac = crypto.createHmac('sha256', secret);
    const digest = hmac.update(payload).digest('hex');
    
    // Timing safe comparison
    const digestBuffer = Buffer.from(digest, 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');
    
    if (digestBuffer.length !== signatureBuffer.length) return false;
    return crypto.timingSafeEqual(digestBuffer, signatureBuffer);
}

export async function POST(request: Request) {
    try {
        const secret = process.env.PADDLE_WEBHOOK_SECRET || '';
        if (!secret) {
            console.error('PADDLE_WEBHOOK_SECRET is not set');
            return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
        }

        const rawBody = await request.text();
        const signatureHeader = request.headers.get('paddle-signature') || '';

        // Verify the signature
        if (!verifyPaddleSignature(signatureHeader, rawBody, secret)) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const payload = JSON.parse(rawBody);
        const eventType = payload.event_type;

        console.log(`Received Paddle webhook: ${eventType}`);

        // Handle successful subscription events
        if (eventType === 'subscription.created' || eventType === 'subscription.updated' || eventType === 'subscription.activated') {
            const customerId = payload.data?.customer_id;
            const userId = payload.data?.custom_data?.user_id;

            if (!userId) {
                console.warn('Webhook received without user_id in custom_data');
                return NextResponse.json({ success: true, warning: 'No user_id provided' }, { status: 200 });
            }

            if (supabase) {
                // Upsert to profiles
                const { error } = await supabase
                    .from('profiles')
                    .upsert({
                        id: userId,
                        subscription_status: 'pro',
                        paddle_customer_id: customerId
                    });

                if (error) {
                    console.error('Failed to update user profile to Pro:', error);
                    return NextResponse.json({ error: 'Failed to update database' }, { status: 500 });
                }

                console.log(`Successfully upgraded user ${userId} to Pro`);
            } else {
                console.warn('Supabase not configured. Mocking Pro upgrade for user:', userId);
            }
        } else if (eventType === 'subscription.canceled') {
            const userId = payload.data?.custom_data?.user_id;
            if (userId && supabase) {
                await supabase
                    .from('profiles')
                    .upsert({ id: userId, subscription_status: 'free' });
            }
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Webhook processing error:', error);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}
