'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, ArrowLeft, Mail, Lock, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { signUp } from '@/app/auth/actions'

export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

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
        const result = await signUp(formData)

        if (result?.error) {
            toast.error(result.error)
            setIsLoading(false)
        } else if (result?.success) {
            setSuccess(true)
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

            {/* Back to home */}
            <Link
                href="/"
                className="absolute top-6 left-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </Link>

            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-10">
                <span className="h-8 w-8 rounded-lg bg-foreground text-background flex items-center justify-center text-sm font-bold ring-1 ring-border">
                    Fb
                </span>
                <span className="text-xl font-semibold tracking-tight">Formbridge</span>
            </div>

            {/* Card */}
            <div className="w-full max-w-sm">
                <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-xl p-8 shadow-2xl shadow-black/10">
                    {success ? (
                        <div className="text-center py-4">
                            <div className="flex justify-center mb-4">
                                <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                    <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold tracking-tight mb-2">Check your email</h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                We&apos;ve sent a confirmation link to your email address. Click the link to activate your account and start building.
                            </p>
                            <Link href="/login">
                                <Button
                                    variant="outline"
                                    className="mt-6"
                                >
                                    Back to Sign In
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-semibold tracking-tight mb-2">Create your account</h1>
                                <p className="text-sm text-muted-foreground">Get started with Formbridge for free</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-foreground text-sm font-medium">
                                        Email
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            required
                                            className="bg-background border-border text-foreground placeholder:text-muted-foreground/50 pl-10 h-11 focus-visible:ring-ring"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-foreground text-sm font-medium">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="••••••••"
                                            required
                                            minLength={6}
                                            className="bg-background border-border text-foreground placeholder:text-muted-foreground/50 pl-10 h-11 focus-visible:ring-ring"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-foreground text-sm font-medium">
                                        Confirm Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            required
                                            minLength={6}
                                            className="bg-background border-border text-foreground placeholder:text-muted-foreground/50 pl-10 h-11 focus-visible:ring-ring"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all rounded-lg"
                                >
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Create Account
                                </Button>
                            </form>
                        </>
                    )}
                </div>

                {!success && (
                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Already have an account?{' '}
                        <Link href="/login" className="text-foreground hover:text-foreground/80 underline underline-offset-4 transition-colors">
                            Sign in
                        </Link>
                    </p>
                )}
            </div>
        </div>
    )
}
