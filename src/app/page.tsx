import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { createClient } from '@/lib/supabase-server';
import { signOut } from '@/app/auth/actions';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border/50 bg-background/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-semibold text-xl tracking-tight flex items-center gap-2">
            <span className="h-6 w-6 rounded-md bg-foreground text-background flex items-center justify-center text-xs font-bold ring-1 ring-border">Fb</span>
            Formbridge
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="/guide" className="hover:text-foreground transition-colors">API Guide</Link>
            {isLoggedIn ? (
              <form action={signOut}>
                <button
                  type="submit"
                  className="text-foreground hover:text-muted-foreground transition-colors"
                >
                  Sign Out
                </button>
              </form>
            ) : (
              <Link href="/login" className="text-foreground hover:text-muted-foreground transition-colors">Sign In</Link>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-32 relative overflow-hidden">
        {/* Abstract background gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full poiner-events-none -z-10" />

        <div className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm font-medium text-secondary-foreground mb-8 backdrop-blur-sm shadow-sm transition-transform hover:scale-105 cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          v1.0 API is now generally available
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground pb-2">
          The headless form backend for modern developers.
        </h1>

        <p className="text-xl text-muted-foreground mb-10 max-w-2xl text-balance">
          Collect submissions, trigger webhooks, and send automated emails without writing a single line of backend code.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button size="lg" className="rounded-full px-8 h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all hover:pr-6 group" asChild>
            <Link href="/dashboard">
              {isLoggedIn ? 'Go to Dashboard' : 'Start Building'} <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-border bg-transparent text-foreground hover:bg-secondary hover:text-foreground transition-colors" asChild>
            <Link href="/guide">
              <Code className="mr-2 h-4 w-4 text-muted-foreground" /> API Guide
            </Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Formbridge. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/refund" className="hover:text-foreground transition-colors">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
