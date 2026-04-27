import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8 mt-auto bg-background">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Formbridge. All rights reserved.</span>
        <div className="flex items-center gap-6">
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/refund" className="hover:text-foreground transition-colors">Refund Policy</Link>
        </div>
      </div>
    </footer>
  );
}
