import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata = {
  title: 'Terms of Service | Formbridge',
  description: 'Read the Formbridge Terms of Service to understand your rights and responsibilities when using our platform.',
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">{title}</h2>
    <div className="space-y-4 text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

export default function TermsPage() {
  const effectiveDate = 'April 27, 2026';

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
            <span className="text-muted-foreground text-sm font-medium hidden sm:inline">Terms of Service</span>
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
            <FileText className="h-3.5 w-3.5" />
            Legal
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground mb-3">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-sm">Effective date: {effectiveDate}</p>
        </div>

        <div className="prose-neutral">
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using Formbridge (&quot;the Service&quot;), you agree to be bound by these Terms of Service
              (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Service. These Terms apply to all
              visitors, users, and others who access or use the Service.
            </p>
          </Section>

          <Section title="2. Description of Service">
            <p>
              Formbridge is a headless form backend platform that enables developers to collect form submissions,
              trigger webhooks, and send automated email notifications without building their own backend
              infrastructure. We offer both free and paid subscription tiers with different feature sets and usage limits.
            </p>
          </Section>

          <Section title="3. User Accounts">
            <p>
              To access certain features, you must create an account. You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Maintaining the confidentiality of your account credentials.</li>
              <li>All activities that occur under your account.</li>
              <li>Ensuring your account information is accurate and up to date.</li>
              <li>Notifying us immediately of any unauthorized access to your account.</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms.
            </p>
          </Section>

          <Section title="4. Acceptable Use">
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Collect sensitive personal information (e.g., passwords, financial data) without proper safeguards.</li>
              <li>Send spam, phishing content, or any form of unsolicited communication.</li>
              <li>Violate any applicable local, national, or international law or regulation.</li>
              <li>Infringe upon the intellectual property rights of others.</li>
              <li>Introduce malicious code or attempt to interfere with the Service&apos;s integrity.</li>
              <li>Resell or sublicense access to the Service without our prior written consent.</li>
            </ul>
          </Section>

          <Section title="5. Subscriptions and Billing">
            <p>
              Formbridge offers a free tier and a Pro subscription plan. By subscribing to a paid plan, you agree to
              pay the applicable fees as described on our pricing page. Payments are processed by Paddle, our authorized
              payment processor. Subscriptions renew automatically unless cancelled before the renewal date.
            </p>
            <p>
              We reserve the right to change our pricing at any time. Any price changes will be communicated to
              subscribers with at least 14 days&apos; notice before the change takes effect.
            </p>
          </Section>

          <Section title="6. Data and Privacy">
            <p>
              Your use of the Service is also governed by our{' '}
              <Link href="/privacy" className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">
                Privacy Policy
              </Link>
              , which is incorporated into these Terms by reference. By using the Service, you consent to our data
              practices as described in that policy.
            </p>
          </Section>

          <Section title="7. Intellectual Property">
            <p>
              The Service and all of its original content, features, and functionality are and will remain the exclusive
              property of Formbridge and its licensors. Our trademarks and trade dress may not be used in connection
              with any product or service without the prior written consent of Formbridge.
            </p>
          </Section>

          <Section title="8. Disclaimers and Limitation of Liability">
            <p>
              The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without any warranties,
              express or implied. To the fullest extent permitted by applicable law, Formbridge shall not be liable for
              any indirect, incidental, special, consequential, or punitive damages arising from your use of (or
              inability to use) the Service.
            </p>
          </Section>

          <Section title="9. Termination">
            <p>
              We reserve the right to terminate or suspend your account and access to the Service at our sole discretion,
              with or without notice, for conduct that we believe violates these Terms or is harmful to other users,
              us, or third parties, or for any other reason.
            </p>
          </Section>

          <Section title="10. Changes to Terms">
            <p>
              We may revise these Terms at any time by posting an updated version on this page. Continued use of the
              Service after any changes constitutes your acceptance of the new Terms. We encourage you to review
              this page periodically.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>
              If you have any questions about these Terms, please reach out to us at{' '}
              <a href="mailto:support@formbridge.dev" className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">
                support@formbridge.dev
              </a>
              .
            </p>
          </Section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Formbridge. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-foreground hover:text-muted-foreground transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/refund" className="hover:text-foreground transition-colors">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
