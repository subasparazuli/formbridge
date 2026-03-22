'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, ArrowLeft, Mail, Lock } from 'lucide-react'
import { toast } from 'sonner'
import { signIn } from '@/app/auth/actions'

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const searchParams = useSearchParams()

    useEffect(() => {
        const error = searchParams.get('error')
        if (error) {
            toast.error(error)
        }
    }, [searchParams])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const result = await signIn(formData)

        if (result?.error) {
            toast.error(result.error)
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-zinc-800/20 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

            {/* Back to home */}
            <Link
                href="/"
                className="absolute top-6 left-6 flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </Link>

            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-10">
                <span className="h-8 w-8 rounded-lg bg-white text-black flex items-center justify-center text-sm font-bold ring-1 ring-zinc-100">
                    Fb
                </span>
                <span className="text-xl font-semibold tracking-tight">Formbridge</span>
            </div>

            {/* Card */}
            <div className="w-full max-w-sm">
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-xl p-8 shadow-2xl shadow-black/20">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-semibold tracking-tight mb-2">Welcome back</h1>
                        <p className="text-sm text-zinc-400">Sign in to your account to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-300 text-sm font-medium">
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    className="bg-zinc-950/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 pl-10 h-11 focus-visible:ring-zinc-700 focus-visible:border-zinc-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-zinc-300 text-sm font-medium">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="bg-zinc-950/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 pl-10 h-11 focus-visible:ring-zinc-700 focus-visible:border-zinc-700"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-11 bg-white text-black hover:bg-zinc-200 font-medium transition-all rounded-lg"
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-4 text-center">
                        <Link href="/forgot-password" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                <p className="text-center text-sm text-zinc-500 mt-6">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="text-zinc-200 hover:text-white underline underline-offset-4 transition-colors">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    )
}
