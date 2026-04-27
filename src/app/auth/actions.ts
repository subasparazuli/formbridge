'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

export async function signIn(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Email and password are required.' }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('[Auth] Sign-in error:', error.message, '| Status:', error.status)

        // Supabase returns "Invalid login credentials" for BOTH wrong password
        // AND unconfirmed email accounts — give the user a more helpful hint.
        if (error.message === 'Invalid login credentials') {
            return {
                error: 'Invalid credentials. Please check your email and password, or confirm your email if you just signed up.',
            }
        }

        if (error.message === 'Email not confirmed') {
            return {
                error: 'Please confirm your email address before signing in. Check your inbox for the confirmation link.',
            }
        }

        return { error: error.message }
    }

    if (!data.user) {
        return { error: 'Sign-in succeeded but no user was returned. Please try again.' }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signUp(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const isDev = process.env.NODE_ENV === 'development'

    if (isDev) {
        // In development, use admin API to create pre-confirmed users
        // This bypasses the email rate limit entirely
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (supabaseUrl && serviceRoleKey) {
            const res = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    email_confirm: true,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                // Handle "user already exists" from admin API
                if (data.msg?.includes('already been registered') || data.message?.includes('already been registered')) {
                    return {
                        error: 'An account with this email already exists. Please sign in instead, or use "Forgot password" to reset your password.',
                    }
                }
                return { error: data.msg || data.message || 'Failed to create account.' }
            }

            return { success: 'Account created! You can now sign in — no email confirmation needed in dev mode.' }
        }
    }

    // Production: standard signUp with email confirmation
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${getBaseUrl()}/auth/callback`,
        },
    })

    if (error) {
        return { error: error.message }
    }

    // Supabase returns a fake user with no identities when the email already exists
    // (to prevent email enumeration). Detect this and give the user a helpful message.
    if (data.user && data.user.identities && data.user.identities.length === 0) {
        return {
            error: 'An account with this email already exists. Please sign in instead, or use "Forgot password" to reset your password.',
        }
    }

    return { success: 'Check your email for a confirmation link to complete your signup.' }
}

export async function resetPassword(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${getBaseUrl()}/auth/callback?next=/reset-password`,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: 'Check your email for a password reset link.' }
}

export async function updatePassword(formData: FormData) {
    const supabase = await createClient()
    const password = formData.get('password') as string

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
}

function getBaseUrl() {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL
    }
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`
    }
    return 'http://localhost:3000'
}
