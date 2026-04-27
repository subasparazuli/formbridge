'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Shield, Zap, Bell, Database, Globe, Code } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

export default function FeaturesPage() {
  const features = [
    {
      title: 'Headless API Endpoints',
      description: 'Get a unique POST endpoint for every form. Submit data from any frontend framework or static site using standard HTTP requests.',
      icon: <Globe className="h-6 w-6 text-sky-400" />,
      color: 'bg-sky-500/10 border-sky-500/20'
    },
    {
      title: 'Built-in Spam Protection',
      description: 'Zero-configuration honeypot spam filtering. We silently drop bot submissions so your inbox stays clean without annoying CAPTCHAs.',
      icon: <Shield className="h-6 w-6 text-emerald-400" />,
      color: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Instant Email Notifications',
      description: 'Get notified the moment a user submits a form. Powered by Resend for ultra-fast, reliable transactional email delivery.',
      icon: <Bell className="h-6 w-6 text-amber-400" />,
      color: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'Supabase Integration',
      description: 'All your submissions are instantly stored in a secure PostgreSQL database. View, search, and manage your data from the dashboard.',
      icon: <Database className="h-6 w-6 text-violet-400" />,
      color: 'bg-violet-500/10 border-violet-500/20'
    },
    {
      title: 'Universal Compatibility',
      description: 'Fully CORS-enabled. Works perfectly with React, Vue, Next.js, plain HTML, WordPress, or any platform that can send a POST request.',
      icon: <Code className="h-6 w-6 text-rose-400" />,
      color: 'bg-rose-500/10 border-rose-500/20'
    },
    {
      title: 'Lightning Fast',
      description: 'Built on edge infrastructure to ensure your form submissions are processed in milliseconds, providing a seamless experience for your users.',
      icon: <Zap className="h-6 w-6 text-cyan-400" />,
      color: 'bg-cyan-500/10 border-cyan-500/20'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-semibold text-xl tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="h-6 w-6 rounded-md bg-foreground text-background flex items-center justify-center text-xs font-bold ring-1 ring-border">
                Fb
              </span>
              Formbridge
            </Link>
            <span className="text-muted-foreground hidden sm:inline">/</span>
            <span className="text-muted-foreground text-sm font-medium hidden sm:inline">Features</span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Home
            </Link>
            <Link href="/guide" className="hover:text-foreground transition-colors">API Guide</Link>
            <Link href="/dashboard" className="text-foreground hover:text-muted-foreground transition-colors">
              Dashboard
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-20 w-full relative">
        {/* Abstract background gradient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full poiner-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground">
            Everything you need for forms. <br />Nothing you don&apos;t.
          </h1>
          <p className="text-xl text-muted-foreground text-balance">
            Formbridge is laser-focused on providing the most reliable, secure, and developer-friendly headless form backend experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {features.map((feature, index) => (
            <div key={index} className="rounded-xl border border-border bg-secondary/30 p-8 hover:bg-secondary/50 hover:border-muted-foreground/30 transition-all duration-300 group">
              <div className={`h-14 w-14 rounded-lg flex items-center justify-center mb-6 border ${feature.color} bg-background group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-background overflow-hidden mb-24 shadow-2xl">
          <div className="p-8 md:p-12 text-center border-b border-border/50 bg-secondary/20">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why choose Formbridge?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">See how we compare against building your own backend or using traditional form builders.</p>
          </div>
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="p-8 md:p-12">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <span className="text-rose-400">✕</span> The Old Way
              </h3>
              <ul className="space-y-4">
                {['Setting up a Node/Express server', 'Configuring SMTP or email APIs', 'Writing database schemas and logic', 'Implementing CAPTCHAs', 'Handling CORS issues'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-rose-400/70 mt-1 text-sm">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 md:p-12 bg-secondary/10">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <span className="text-emerald-400">✓</span> The Formbridge Way
              </h3>
              <ul className="space-y-4">
                {['One POST request', 'Instant email alerts via Resend', 'Automatic database storage', 'Invisible honeypot spam protection', 'Zero configuration required'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground font-medium">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center rounded-2xl border border-border bg-gradient-to-br from-secondary to-background p-12 relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)]" />
           <h2 className="text-3xl font-bold text-foreground mb-4 relative">Ready to simplify your forms?</h2>
           <p className="text-muted-foreground mb-8 max-w-xl mx-auto relative">Get your first endpoint set up in less than 60 seconds.</p>
           <Button size="lg" className="rounded-full px-8 h-12 bg-primary text-primary-foreground font-medium relative" asChild>
             <Link href="/dashboard">
               Start Building for Free
             </Link>
           </Button>
        </div>
      </main>
    </div>
  );
}
