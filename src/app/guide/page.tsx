'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Copy,
  Check,
  BookOpen,
  Zap,
  Shield,
  Bell,
  Code,
  Terminal,
  FileCode,
  ChevronRight,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Info,
  ArrowLeft,
  Github,
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

/* ────────────────────────────────────────────────── helpers ─── */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="absolute top-3 right-3 p-1.5 rounded-md bg-muted/80 hover:bg-muted text-muted-foreground hover:text-secondary-foreground transition-all duration-200 backdrop-blur-sm"
      aria-label="Copy code"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  )
}

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  return (
    <div className="relative group rounded-lg border border-border bg-background overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border/80 bg-secondary/50">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
        </div>
        <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider ml-2">{language}</span>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-secondary-foreground font-mono">{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  )
}

function TabbedCode({ tabs }: { tabs: { label: string; language: string; code: string }[] }) {
  const [active, setActive] = useState(0)
  return (
    <div className="rounded-lg border border-border bg-background overflow-hidden">
      <div className="flex items-center border-b border-border/80 bg-secondary/50">
        <div className="flex gap-1.5 px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
        </div>
        <div className="flex ml-2">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActive(i)}
              className={`px-4 py-2 text-xs font-mono tracking-wide transition-colors duration-150 border-b-2 ${
                active === i
                  ? 'text-foreground border-white bg-muted/30'
                  : 'text-muted-foreground border-transparent hover:text-secondary-foreground hover:bg-muted/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-secondary-foreground font-mono">{tabs[active].code}</code>
        </pre>
        <CopyButton text={tabs[active].code} />
      </div>
    </div>
  )
}

function StepCard({
  step,
  title,
  children,
}: {
  step: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="relative pl-12 pb-12 group last:pb-0">
      {/* Connector line */}
      <div className="absolute left-[18px] top-10 bottom-0 w-px bg-gradient-to-b from-border to-transparent group-last:hidden" />
      {/* Step circle */}
      <div className="absolute left-0 top-0 h-9 w-9 rounded-full border border-border bg-secondary flex items-center justify-center text-sm font-bold text-foreground shadow-[0_0_12px_rgba(255,255,255,0.05)] group-hover:border-muted-foreground transition-colors">
        {step}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-3 pt-1">{title}</h3>
      <div className="text-muted-foreground text-[15px] leading-relaxed space-y-4">{children}</div>
    </div>
  )
}

function AlertBox({
  type,
  children,
}: {
  type: 'info' | 'warning' | 'success'
  children: React.ReactNode
}) {
  const styles = {
    info: {
      bg: 'bg-sky-500/5',
      border: 'border-sky-500/20',
      icon: <Info className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />,
    },
    warning: {
      bg: 'bg-amber-500/5',
      border: 'border-amber-500/20',
      icon: <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />,
    },
    success: {
      bg: 'bg-emerald-500/5',
      border: 'border-emerald-500/20',
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />,
    },
  }
  const s = styles[type]
  return (
    <div className={`flex gap-3 rounded-lg border p-4 ${s.bg} ${s.border}`}>
      {s.icon}
      <div className="text-sm text-secondary-foreground leading-relaxed">{children}</div>
    </div>
  )
}

/* ──────────────────────────────────────────────── sections ─── */

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'quickstart', label: 'Quick Start' },
  { id: 'endpoint', label: 'Endpoint Reference' },
  { id: 'content-types', label: 'Content Types' },
  { id: 'spam-protection', label: 'Spam Protection' },
  { id: 'responses', label: 'Response Codes' },
  { id: 'examples', label: 'Code Examples' },
  { id: 'limits', label: 'Rate Limits' },
  { id: 'cors', label: 'CORS' },
  { id: 'faq', label: 'FAQ' },
]

/* ────────────────────────────────────────────────── page ──── */

export default function GuidePage() {
  const [activeSection, setActiveSection] = useState('overview')

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
            <span className="text-muted-foreground text-sm font-medium hidden sm:inline">API Guide</span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Home
            </Link>
            <Link href="/dashboard" className="text-foreground hover:text-muted-foreground transition-colors">
              Dashboard
            </Link>
            <a href="https://github.com/subasparazuli/formbridge" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              <Github className="h-4 w-4" />
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full flex">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-56 shrink-0 border-r border-border/40 py-8 pr-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4 px-3">
            On this page
          </p>
          <nav className="flex flex-col gap-0.5">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setActiveSection(s.id)}
                className={`block px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                  activeSection === s.id
                    ? 'text-foreground bg-muted/60 font-medium'
                    : 'text-muted-foreground hover:text-secondary-foreground hover:bg-muted/30'
                }`}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 lg:px-12 py-12 max-w-3xl">
          {/* Hero */}
          <div className="mb-16">
            <div className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground mb-6 backdrop-blur-sm">
              <BookOpen className="h-3 w-3 mr-1.5" />
              Developer Guide
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground">
              Formbridge API Guide
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Everything you need to integrate Formbridge into your projects.
              Point any HTML form, fetch call, or HTTP client at your unique endpoint and
              we&apos;ll handle storage, spam filtering, and email notifications.
            </p>
          </div>

          {/* ──── Overview ──── */}
          <section id="overview" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-400" /> Overview
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Formbridge is a <strong className="text-secondary-foreground">headless form backend</strong> that
              gives you a unique API endpoint for every form you create. There is no front-end
              library to install — just a URL to POST to. Under the hood, each submission is:
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { icon: <Shield className="h-5 w-5" />, title: 'Spam Filtered', desc: 'Built-in honeypot detection silently blocks bots.' },
                { icon: <Zap className="h-5 w-5" />, title: 'Stored Instantly', desc: 'Persisted to Supabase Postgres in real time.' },
                { icon: <Bell className="h-5 w-5" />, title: 'Notified', desc: 'Email alerts via Resend on every valid submission.' },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-lg border border-border bg-secondary/30 p-5 hover:border-border transition-colors group"
                >
                  <div className="h-9 w-9 rounded-lg bg-muted/80 flex items-center justify-center mb-3 text-muted-foreground group-hover:text-foreground transition-colors">
                    {f.icon}
                  </div>
                  <p className="font-medium text-foreground text-sm mb-1">{f.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ──── Quick Start ──── */}
          <section id="quickstart" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-foreground mb-8 flex items-center gap-2">
              <Terminal className="h-5 w-5 text-emerald-400" /> Quick Start
            </h2>

            <StepCard step={1} title="Create a form in the Dashboard">
              <p>
                Head to your{' '}
                <Link href="/dashboard" className="text-foreground underline underline-offset-4 decoration-border hover:decoration-muted-foreground transition-colors">
                  Dashboard
                </Link>{' '}
                and click <strong className="text-secondary-foreground">&quot;Create New Form&quot;</strong>. You&apos;ll
                get a unique Form ID (UUID) — this is the key to your endpoint.
              </p>
            </StepCard>

            <StepCard step={2} title="Copy your endpoint URL">
              <p>Your unique API endpoint follows this pattern:</p>
              <CodeBlock
                language="url"
                code={`POST  https://your-domain.com/api/f/{YOUR_FORM_ID}`}
              />
            </StepCard>

            <StepCard step={3} title="Point your form at the endpoint">
              <p>The simplest integration is a plain HTML form with an <code className="text-secondary-foreground bg-muted px-1.5 py-0.5 rounded text-sm">action</code> attribute:</p>
              <CodeBlock
                language="html"
                code={`<form
  action="https://your-domain.com/api/f/YOUR_FORM_ID"
  method="POST"
>
  <input type="text"  name="name"  placeholder="Name" />
  <input type="email" name="email" placeholder="Email" />
  <textarea name="message" placeholder="Message"></textarea>

  <!-- Honeypot (keep hidden with CSS) -->
  <input type="text" name="_my_honeypot"
         style="display:none" tabindex="-1" autocomplete="off" />

  <button type="submit">Send</button>
</form>`}
              />
            </StepCard>

            <StepCard step={4} title="Receive submissions">
              <p>
                That&apos;s it! Every valid submission is saved to your dashboard and, if configured,
                triggers an email notification automatically.
              </p>
              <AlertBox type="success">
                You can test your endpoint right away using the test form at{' '}
                <code className="text-emerald-300 bg-emerald-900/30 px-1 py-0.5 rounded text-xs">/test-form.html</code> in the public directory.
              </AlertBox>
            </StepCard>
          </section>

          {/* ──── Endpoint Reference ──── */}
          <section id="endpoint" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Code className="h-5 w-5 text-violet-400" /> Endpoint Reference
            </h2>

            <div className="rounded-lg border border-border bg-secondary/30 overflow-hidden">
              <div className="px-5 py-4 border-b border-border/60 bg-secondary/50 flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                  POST
                </span>
                <code className="text-sm text-secondary-foreground font-mono">/api/f/&#123;formId&#125;</code>
              </div>
              <div className="p-5 space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Path Parameters</p>
                  <div className="rounded-md border border-border overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-secondary/50 text-muted-foreground">
                          <th className="text-left px-4 py-2.5 font-medium">Parameter</th>
                          <th className="text-left px-4 py-2.5 font-medium">Type</th>
                          <th className="text-left px-4 py-2.5 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-border/60">
                          <td className="px-4 py-2.5 font-mono text-emerald-400 text-xs">formId</td>
                          <td className="px-4 py-2.5 text-muted-foreground">string (UUID)</td>
                          <td className="px-4 py-2.5 text-muted-foreground">Your unique form identifier from the dashboard.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Request Body</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    The body should contain your form fields as key-value pairs. Formbridge accepts
                    three content types (see below). All fields are stored as a JSON object in the
                    <code className="text-secondary-foreground bg-muted px-1 py-0.5 rounded text-xs mx-1">data</code>
                    column of the submissions table.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ──── Content Types ──── */}
          <section id="content-types" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <FileCode className="h-5 w-5 text-sky-400" /> Supported Content Types
            </h2>
            <div className="space-y-4">
              {[
                {
                  type: 'application/x-www-form-urlencoded',
                  desc: 'Default for HTML <form> elements. Fields are encoded as key=value pairs.',
                  tag: 'HTML Forms',
                },
                {
                  type: 'multipart/form-data',
                  desc: 'Standard for file uploads. Fields are sent as form-data parts.',
                  tag: 'Form Data',
                },
                {
                  type: 'application/json',
                  desc: 'Best for programmatic use with fetch / axios / cURL.',
                  tag: 'JSON',
                },
              ].map((ct) => (
                <div
                  key={ct.type}
                  className="rounded-lg border border-border bg-secondary/20 p-5 hover:border-border transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <code className="text-sm font-mono text-foreground">{ct.type}</code>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {ct.tag}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{ct.desc}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-border group-hover:text-muted-foreground transition-colors mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ──── Spam Protection ──── */}
          <section id="spam-protection" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Shield className="h-5 w-5 text-rose-400" /> Spam Protection
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Formbridge uses a <strong className="text-secondary-foreground">honeypot field</strong> strategy.
              Add a hidden input named <code className="text-secondary-foreground bg-muted px-1.5 py-0.5 rounded text-sm">_my_honeypot</code> to
              your form. Real users won&apos;t see it; bots will auto-fill it. Any submission with a
              non-empty honeypot is silently accepted (returning <code className="text-secondary-foreground bg-muted px-1.5 py-0.5 rounded text-sm">200 OK</code>)
              but <strong className="text-secondary-foreground">never saved</strong> to the database.
            </p>
            <CodeBlock
              language="html"
              code={`<!-- Add this hidden field to your form -->
<input
  type="text"
  name="_my_honeypot"
  style="display:none"
  tabindex="-1"
  autocomplete="off"
  aria-hidden="true"
/>`}
            />
            <AlertBox type="warning">
              <strong>Do not rename</strong> the honeypot field. The API specifically checks for the
              key <code className="font-mono text-amber-300">_my_honeypot</code>. If the field is missing, spam filtering
              is effectively disabled.
            </AlertBox>
          </section>

          {/* ──── Response Codes ──── */}
          <section id="responses" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" /> Response Codes
            </h2>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/60 text-muted-foreground border-b border-border">
                    <th className="text-left px-5 py-3 font-medium">Status</th>
                    <th className="text-left px-5 py-3 font-medium">Body</th>
                    <th className="text-left px-5 py-3 font-medium">Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {[
                    { code: '200', body: '{ success: true }', meaning: 'Submission saved (or honeypot caught silently).' },
                    { code: '400', body: '{ error: "..." }', meaning: 'Form ID missing from URL.' },
                    { code: '403', body: '{ error: "..." }', meaning: 'Free-plan submission limit reached (10 max).' },
                    { code: '404', body: '{ error: "..." }', meaning: 'Form ID not found in the database.' },
                    { code: '500', body: '{ error: "..." }', meaning: 'Server error (DB write failed, etc.).' },
                  ].map((r) => (
                    <tr key={r.code} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-5 py-3">
                        <span
                          className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                            r.code === '200'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : r.code.startsWith('4')
                              ? 'bg-amber-500/10 text-amber-400'
                              : 'bg-rose-500/10 text-rose-400'
                          }`}
                        >
                          {r.code}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{r.body}</td>
                      <td className="px-5 py-3 text-muted-foreground">{r.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ──── Code Examples ──── */}
          <section id="examples" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Terminal className="h-5 w-5 text-cyan-400" /> Code Examples
            </h2>

            <TabbedCode
              tabs={[
                {
                  label: 'cURL',
                  language: 'bash',
                  code: `curl -X POST https://your-domain.com/api/f/YOUR_FORM_ID \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Hello from cURL!"
  }'`,
                },
                {
                  label: 'JavaScript',
                  language: 'javascript',
                  code: `const res = await fetch(
  "https://your-domain.com/api/f/YOUR_FORM_ID",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "Hello from fetch!",
    }),
  }
);

const data = await res.json();
console.log(data);
// → { success: true, message: "Submission received securely." }`,
                },
                {
                  label: 'Python',
                  language: 'python',
                  code: `import requests

url = "https://your-domain.com/api/f/YOUR_FORM_ID"
payload = {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Hello from Python!",
}

response = requests.post(url, json=payload)
print(response.json())
# → {'success': True, 'message': 'Submission received securely.'}`,
                },
                {
                  label: 'React',
                  language: 'tsx',
                  code: `function ContactForm() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const res = await fetch(
      "https://your-domain.com/api/f/YOUR_FORM_ID",
      { method: "POST", body: formData }
    );

    if (res.ok) {
      alert("Submitted successfully!");
      form.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name"  placeholder="Name"  required />
      <input name="email" placeholder="Email" required type="email" />
      <textarea name="message" placeholder="Message" />
      {/* Hidden honeypot */}
      <input
        name="_my_honeypot"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />
      <button type="submit">Send</button>
    </form>
  );
}`,
                },
                {
                  label: 'HTML',
                  language: 'html',
                  code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Contact Form</title>
</head>
<body>
  <form
    action="https://your-domain.com/api/f/YOUR_FORM_ID"
    method="POST"
  >
    <label>
      Name
      <input type="text" name="name" required />
    </label>
    <label>
      Email
      <input type="email" name="email" required />
    </label>
    <label>
      Message
      <textarea name="message"></textarea>
    </label>

    <!-- Honeypot -->
    <input type="text" name="_my_honeypot"
      style="display:none" tabindex="-1"
      autocomplete="off" />

    <button type="submit">Submit</button>
  </form>
</body>
</html>`,
                },
              ]}
            />
          </section>

          {/* ──── Rate Limits ──── */}
          <section id="limits" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" /> Rate Limits &amp; Plan Quotas
            </h2>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/60 text-muted-foreground border-b border-border">
                    <th className="text-left px-5 py-3 font-medium">Plan</th>
                    <th className="text-left px-5 py-3 font-medium">Submissions / Form</th>
                    <th className="text-left px-5 py-3 font-medium">Email Notifications</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  <tr className="hover:bg-secondary/30 transition-colors">
                    <td className="px-5 py-3 font-medium text-foreground flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground" /> Free
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">10 per form</td>
                    <td className="px-5 py-3 text-muted-foreground">Included</td>
                  </tr>
                  <tr className="hover:bg-secondary/30 transition-colors">
                    <td className="px-5 py-3 font-medium text-foreground flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" /> Pro
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">Unlimited</td>
                    <td className="px-5 py-3 text-muted-foreground">Included</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <AlertBox type="info">
              When the free-plan limit is reached, the API returns a <code className="font-mono text-sky-300">403</code> status
              with the message <code className="font-mono text-sky-300">&quot;Form submission limit reached on Free plan.&quot;</code>.
              Upgrade to Pro to unlock unlimited submissions.
            </AlertBox>
          </section>

          {/* ──── CORS ──── */}
          <section id="cors" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-indigo-400" /> CORS
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Formbridge API is fully <strong className="text-secondary-foreground">CORS-enabled</strong>.
              Preflight <code className="text-secondary-foreground bg-muted px-1 py-0.5 rounded text-xs">OPTIONS</code> requests
              return the appropriate headers so you can call the endpoint from any origin — whether it&apos;s
              a static HTML page, a React SPA, or a mobile webview.
            </p>
            <CodeBlock
              language="http"
              code={`HTTP/1.1 204 No Content
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization`}
            />
          </section>

          {/* ──── FAQ ──── */}
          <section id="faq" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-foreground mb-8 flex items-center gap-2">
              <Info className="h-5 w-5 text-sky-400" /> FAQ
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Can I use this from a static site (e.g. GitHub Pages)?',
                  a: 'Absolutely. Because CORS is wide-open, any origin can POST to your endpoint. You don\'t need a backend of your own.',
                },
                {
                  q: 'Does Formbridge store file uploads?',
                  a: 'The API accepts multipart/form-data but currently stores file contents as text values in the JSON data column. For large file handling consider a pre-upload to your own storage and submitting the URL.',
                },
                {
                  q: 'How do I enable email notifications?',
                  a: 'Set the "notify_email" field on your form in the dashboard. Every valid submission will trigger an email to that address via Resend.',
                },
                {
                  q: 'Is the honeypot field required?',
                  a: 'No, but it\'s strongly recommended. Without it, you won\'t have any built-in spam protection and all submissions — including from bots — will be saved.',
                },
                {
                  q: 'What happens when I exceed the free plan limit?',
                  a: 'The API returns a 403 Forbidden response. Existing submissions are preserved. Upgrade to Pro to continue receiving submissions.',
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="rounded-lg border border-border bg-secondary/20 p-5 hover:border-border transition-colors"
                >
                  <p className="font-medium text-foreground text-sm mb-2 flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    {item.q}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed ml-6">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer CTA */}
          <div className="border-t border-border/60 pt-12 pb-8">
            <div className="rounded-xl border border-border bg-gradient-to-br from-secondary to-background p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)]" />
              <h3 className="text-xl font-semibold text-foreground mb-2 relative">Ready to get started?</h3>
              <p className="text-muted-foreground text-sm mb-6 relative">
                Create your first form in under a minute.
              </p>
              <div className="flex justify-center gap-4 relative">
                <Button
                  size="lg"
                  className="rounded-full px-8 h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all hover:pr-6 group"
                  asChild
                >
                  <Link href="/dashboard">
                    Go to Dashboard{' '}
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
