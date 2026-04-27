import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata = {
  title: 'Privacy Policy | Formbridge',
  description: 'Learn how Formbridge collects, uses, and protects your personal information.',
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">{title}</h2>
    <div className="space-y-4 text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

export default function PrivacyPage() {
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
            <span className="text-muted-foreground text-sm font-medium hidden sm:inline">Privacy Policy</span>
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
            <Lock className="h-3.5 w-3.5" />
            Legal
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground mb-3">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm">Effective date: {effectiveDate}</p>
        </div>

        <div>
          <p className="text-muted-foreground leading-relaxed mb-10">
            At Formbridge, we take your privacy seriously. This Privacy Policy explains what information we collect,
            how we use it, and the choices you have regarding your data. By using the Service, you agree to the
            collection and use of information in accordance with this policy.
          </p>

          <Section title="1. Information We Collect">
            <p><strong className="text-foreground font-medium">Account Information:</strong> When you create an account, we collect your email address and any profile information you provide.</p>
            <p><strong className="text-foreground font-medium">Usage Data:</strong> We automatically collect information about how you interact with the Service, including IP addresses, browser type, pages visited, and timestamps.</p>
            <p><strong className="text-foreground font-medium">Form Submission Data:</strong> We store the data your end-users submit through your configured form endpoints on your behalf, as a data processor.</p>
            <p><strong className="text-foreground font-medium">Payment Information:</strong> Billing details are handled entirely by our payment processor, Paddle. We never directly store your credit card information.</p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Provide, operate, and maintain the Service.</li>
              <li>Process transactions and send related information, including purchase confirmations and invoices.</li>
              <li>Send transactional emails, such as account notifications and form submission alerts.</li>
              <li>Monitor and analyze usage trends to improve the Service.</li>
              <li>Detect, prevent, and address technical issues and fraudulent activity.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </Section>

          <Section title="3. Data Storage and Security">
            <p>
              Your data is stored securely in a PostgreSQL database hosted on Supabase infrastructure, with data centers
              located in the EU and US regions. We implement industry-standard security measures, including encryption
              in transit (TLS) and at rest, to protect your information.
            </p>
            <p>
              However, no method of transmission over the Internet or method of electronic storage is 100% secure.
              While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee
              its absolute security.
            </p>
          </Section>

          <Section title="4. Data Sharing and Disclosure">
            <p>We do not sell your personal data. We may share your information only in the following limited circumstances:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong className="text-foreground font-medium">Service Providers:</strong> We share data with trusted third parties (Supabase, Resend, Paddle) to operate the Service under strict data processing agreements.</li>
              <li><strong className="text-foreground font-medium">Legal Requirements:</strong> We may disclose your information if required by law or in response to valid legal processes.</li>
              <li><strong className="text-foreground font-medium">Business Transfers:</strong> In the event of a merger or acquisition, your data may be transferred as part of that transaction.</li>
            </ul>
          </Section>

          <Section title="5. Cookies and Tracking">
            <p>
              Formbridge uses essential cookies to maintain your authenticated session. We do not use third-party
              advertising cookies or behavioral tracking. You can instruct your browser to refuse all cookies, but
              some parts of the Service may not function properly as a result.
            </p>
          </Section>

          <Section title="6. Your Rights (GDPR & CCPA)">
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data (&quot;right to be forgotten&quot;).</li>
              <li>Object to or restrict our processing of your data.</li>
              <li>Request a portable copy of your data.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:privacy@formbridge.dev" className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">
                privacy@formbridge.dev
              </a>
              . We will respond to your request within 30 days.
            </p>
          </Section>

          <Section title="7. Data Retention">
            <p>
              We retain your personal data for as long as your account is active or as needed to provide the Service.
              Form submission data is retained for the period specified in your subscription plan. Upon account deletion,
              we will delete or anonymize your personal data within 30 days, unless retention is required by law.
            </p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>
              The Service is not directed at children under the age of 13. We do not knowingly collect personal
              information from children under 13. If we become aware that a child under 13 has provided us with
              personal information, we will take steps to delete such information.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any significant changes
              by posting the new policy on this page and updating the effective date. We encourage you to review
              this policy periodically.
            </p>
          </Section>

          <Section title="10. Contact Us">
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at{' '}
              <a href="mailto:privacy@formbridge.dev" className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">
                privacy@formbridge.dev
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
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/privacy" className="text-foreground hover:text-muted-foreground transition-colors">Privacy</Link>
            <Link href="/refund" className="hover:text-foreground transition-colors">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
