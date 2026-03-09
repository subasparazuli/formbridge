import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Formbridge | Minimalist Form Backend",
  description: "Headless form backend for developers",
};

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${inter.variable} font-sans antialiased bg-zinc-950 text-zinc-50 min-h-screen selection:bg-zinc-800 selection:text-white`}
      >
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script>
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
