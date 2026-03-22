import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Key } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-zinc-800/50 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-semibold text-xl tracking-tight flex items-center gap-2">
            <span className="h-6 w-6 rounded-md bg-white text-black flex items-center justify-center text-xs font-bold ring-1 ring-zinc-100">Fb</span>
            Formbridge
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-zinc-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#docs" className="hover:text-white transition-colors">Documentation</Link>
            <Link href="/login" className="text-white hover:text-zinc-200 transition-colors">Sign In</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-32 relative overflow-hidden">
        {/* Abstract background gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-zinc-800/30 blur-[120px] rounded-full poiner-events-none -z-10" />

        <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm font-medium text-zinc-300 mb-8 backdrop-blur-sm shadow-sm transition-transform hover:scale-105 cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          v1.0 API is now generally available
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 pb-2">
          The headless form backend for modern developers.
        </h1>

        <p className="text-xl text-zinc-400 mb-10 max-w-2xl text-balance">
          Collect submissions, trigger webhooks, and send automated emails without writing a single line of backend code.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button size="lg" className="rounded-full px-8 h-12 bg-white text-black hover:bg-zinc-200 font-medium transition-all hover:pr-6 group" asChild>
            <Link href="/dashboard">
              Start Building <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-zinc-800 bg-transparent text-white hover:bg-zinc-900 hover:text-white transition-colors" asChild>
            <Link href="#docs">
              <Code className="mr-2 h-4 w-4 text-zinc-400" /> Read Docs
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
