import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error && data.user) {
            // Create a profile row if one doesn't exist yet
            const { data: existingProfile } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', data.user.id)
                .single()

            if (!existingProfile) {
                await supabase.from('profiles').insert({
                    id: data.user.id,
                    subscription_status: 'free',
                })
            }

            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    // If something went wrong, redirect to login with an error
    return NextResponse.redirect(`${origin}/login?error=Could not verify your email. Please try again.`)
}
