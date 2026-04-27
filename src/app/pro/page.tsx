'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Zap } from 'lucide-react';
import { usePaddle } from '@/components/paddle-provider';
import { createClient } from '@/lib/supabase-browser';

export default function ProSubscriptionPage() {
  const paddle = usePaddle();
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        setUserEmail(user.email || null);
      }
    };
    getUser();
  }, [supabase.auth]);

  const handleCheckout = () => {
    if (!paddle) {
      console.error('Paddle is not initialized yet');
      return;
    }

    if (!userId) {
      // Redirect to login or show alert
      window.location.href = '/login?redirectTo=/pro';
      return;
    }

    paddle.Checkout.open({
      items: [
        {
          priceId: 'pri_12345', // Replace with your actual Paddle Price ID
          quantity: 1
        }
      ],
      customData: {
        user_id: userId
      },
      ...(userEmail ? { customer: { email: userEmail } } : {})
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="font-semibold text-lg tracking-tight flex items-center gap-2">
            <span className="h-6 w-6 rounded-md bg-foreground text-background flex items-center justify-center text-xs font-bold ring-1 ring-border">Fb</span>
            Formbridge
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Zap className="h-4 w-4 mr-2" /> Upgrade your workflow
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Go Pro for unlimited power.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock unlimited form submissions, priority email delivery, and advanced analytics for less than the price of a coffee.
          </p>
        </div>

        <div className="w-full max-w-md rounded-2xl border border-border bg-secondary/30 backdrop-blur-sm p-8 shadow-2xl relative">
          {/* <div className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-emerald-500 text-background text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transform rotate-3">
            Best Value
          </div> */}

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Pro Subscription</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold tracking-tight">$5</span>
              <span className="text-muted-foreground">/ month</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {[
              'Unlimited form submissions',
              'Unlimited email notifications',
              'Priority spam filtering',
              'Advanced CORS configurations',
              'Custom webhook integrations',
              'Premium support'
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            onClick={handleCheckout}
            disabled={!paddle}
          >
            {paddle ? 'Subscribe Pro' : 'Loading Checkout...'}
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Secure payment powered by Paddle. Cancel anytime.
          </p>
        </div>
      </main>
    </div>
  );
}
