import Link from 'next/link';
import { ArrowLeft, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata = {
  title: 'Refund Policy | Formbridge',
  description: 'Understand Formbridge\'s refund and cancellation policy for Pro subscriptions.',
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">{title}</h2>
    <div className="space-y-4 text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

export default function RefundPage() {
  const effectiveDate = 'April 27, 2026';

  const eligible = [
    'Your first month of a Pro subscription, if you are unsatisfied and request a refund within 7 days of your initial charge.',
    'Accidental duplicate charges caused by a payment processing error on our end.',
    'Charges made after you have cancelled, if the cancellation was confirmed via email.',
  ];

  const ineligible = [
    'Partial refunds for unused portions of a billing cycle.',
    'Refunds requested more than 7 days after the charge date.',
    'Repeated Pro subscription charges after the first refund has been issued.',
    'Accounts suspended or terminated for violations of our Terms of Service.',
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
            <span className="text-muted-foreground text-sm font-medium hidden sm:inline">Refund Policy</span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Home
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16 w-full">
        {/* Page title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
            <RotateCcw className="h-3.5 w-3.5" />
            Legal
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground mb-3">
            Refund Policy
          </h1>
          <p className="text-muted-foreground text-sm">Effective date: {effectiveDate}</p>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-10">
          We want you to be completely satisfied with Formbridge. This policy outlines the conditions under which
          we issue refunds for our Pro subscription plan. Please read it carefully before making a purchase.
        </p>

        {/* Eligible / Not Eligible Cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              Eligible for a Refund
            </h3>
            <ul className="space-y-3">
              {eligible.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-6">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
              <XCircle className="h-5 w-5 text-rose-400 shrink-0" />
              Not Eligible for a Refund
            </h3>
            <ul className="space-y-3">
              {ineligible.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <XCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Section title="1. Subscription Model">
          <p>
            Formbridge Pro is a monthly subscription service billed automatically each month on your renewal date.
            Access to Pro features is provided immediately upon payment. Because the service is digital and access
            is granted instantly, we operate a limited refund policy rather than an unconditional one.
          </p>
        </Section>

        <Section title="2. 7-Day Satisfaction Guarantee">
          <p>
            New subscribers who are unsatisfied with Formbridge Pro may request a full refund within <strong className="text-foreground font-medium">7 calendar days</strong> of
            their first charge. This guarantee applies only to the initial subscription payment and is available
            once per customer account.
          </p>
          <p>
            To request a refund under this guarantee, email us at{' '}
            <a href="mailto:support@formbridge.dev" className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">
              support@formbridge.dev
            </a>{' '}
            with the subject line &quot;Refund Request&quot; and include your account email address.
          </p>
        </Section>

        <Section title="3. Cancellation">
          <p>
            You may cancel your Pro subscription at any time from the billing section of your dashboard or by
            contacting our support team. Upon cancellation:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Your Pro access will continue until the end of the current billing period.</li>
            <li>You will not be charged for the next billing cycle.</li>
            <li>No partial refund will be issued for the remaining days in your current period.</li>
          </ul>
        </Section>

        <Section title="4. How We Process Refunds">
          <p>
            Approved refunds are processed via Paddle, our payment processor. Once a refund is approved, it
            typically takes <strong className="text-foreground font-medium">5–10 business days</strong> to appear on your statement, depending on
            your bank or card issuer. Refunds are returned to the original payment method used at the time
            of purchase.
          </p>
        </Section>

        <Section title="5. Exceptional Circumstances">
          <p>
            We handle all refund requests on a case-by-case basis and may make exceptions to this policy at
            our sole discretion. If you believe your situation warrants special consideration, please contact
            us and we will do our best to find a fair resolution.
          </p>
        </Section>

        <Section title="6. Contact Us">
          <p>
            For any questions about refunds or to submit a refund request, please contact us at{' '}
            <a href="mailto:support@formbridge.dev" className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">
              support@formbridge.dev
            </a>
            . Our team typically responds within 1–2 business days.
          </p>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Formbridge. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/refund" className="text-foreground hover:text-muted-foreground transition-colors">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
