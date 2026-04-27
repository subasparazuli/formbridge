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
import { ThemeProvider } from "@/components/theme-provider";
import { PaddleProvider } from "@/components/paddle-provider";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col selection:bg-primary selection:text-primary-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PaddleProvider>
            <TooltipProvider>
              <div className="flex-1 flex flex-col">
                {children}
              </div>
              <Footer />
            </TooltipProvider>
            <Toaster position="bottom-right" />
          </PaddleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
