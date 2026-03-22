'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Lock } from 'lucide-react'
import { toast } from 'sonner'
import { updatePassword } from '@/app/auth/actions'

export default function ResetPasswordPage() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        setIsLoading(true)
        const result = await updatePassword(formData)

        if (result?.error) {
            toast.error(result.error)
            setIsLoading(false)
        }
        // If successful, the server action redirects to /dashboard
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-zinc-800/20 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

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
                        <h1 className="text-2xl font-semibold tracking-tight mb-2">Set new password</h1>
                        <p className="text-sm text-zinc-400">Enter your new password below</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-zinc-300 text-sm font-medium">
                                New Password
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

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-zinc-300 text-sm font-medium">
                                Confirm New Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
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
                            Update Password
                        </Button>
                    </form>
                </div>

                <p className="text-center text-sm text-zinc-500 mt-6">
                    <Link href="/login" className="text-zinc-200 hover:text-white underline underline-offset-4 transition-colors">
                        Back to Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}
