export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-zinc-950">
            <header className="border-b border-zinc-800/50 bg-black/50 backdrop-blur-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="font-semibold text-lg tracking-tight flex items-center gap-2">
                        <span className="h-6 w-6 rounded-md bg-white text-black flex items-center justify-center text-xs font-bold ring-1 ring-zinc-100">Fb</span>
                        Formbridge <span className="text-zinc-600 font-normal">/</span> <span className="text-zinc-400 font-normal">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://formbridgesaas.lemonsqueezy.com/buy/12345?checkout[custom][user_id]=user_123"
                            className="lemonsqueezy-button bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20 text-sm font-medium px-4 py-1.5 rounded-full transition-colors flex items-center gap-2"
                        >
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Upgrade to Pro
                        </a>
                        <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs text-zinc-400 font-medium">
                            SP
                        </div>
                    </div>
                </div>
            </header>
            <main>
                {children}
            </main>
        </div>
    );
}
