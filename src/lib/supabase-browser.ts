import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        if (typeof window === 'undefined') {
            console.warn('Supabase URL or Key missing in SSR. Skipping client initialization.')
        }
        return null as any
    }

    return createBrowserClient(
        supabaseUrl,
        supabaseKey
    )
}
