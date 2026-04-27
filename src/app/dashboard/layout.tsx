'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { LogOut, Github } from 'lucide-react';
import { createClient } from '@/lib/supabase-browser';
import { signOut } from '@/app/auth/actions';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [userEmail, setUserEmail] = useState<string>('');
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) setUserEmail(user.email || '');
        };
        getUser();
    }, []);

    return (
        <div className="min-h-screen">
            <header className="border-b border-border/50 bg-background/50 backdrop-blur-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="font-semibold text-lg tracking-tight flex items-center gap-2">
                        <span className="h-6 w-6 rounded-md bg-foreground text-background flex items-center justify-center text-xs font-bold ring-1 ring-border">Fb</span>
                        Formbridge <span className="text-muted-foreground font-normal">/</span> <span className="text-muted-foreground font-normal">Dashboard</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://formbridgesaas.lemonsqueezy.com/buy/12345?checkout[custom][user_id]=user_123"
                            className="lemonsqueezy-button bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20 text-sm font-medium px-4 py-1.5 rounded-full transition-colors flex items-center gap-2"
                        >
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Upgrade to Pro
                        </a>
                        {userEmail && (
                            <span className="text-sm text-muted-foreground hidden sm:block">{userEmail}</span>
                        )}
                        <a href="https://github.com/subasparazuli/formbridge" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Github className="h-4 w-4" />
                        </a>
                        <form action={signOut}>
                            <Button
                                type="submit"
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground hover:bg-muted transition-colors gap-2"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="hidden sm:inline">Sign Out</span>
                            </Button>
                        </form>
                        <ThemeToggle />
                    </div>
                </div>
            </header>
            <main>
                {children}
            </main>
        </div>
    );
}
