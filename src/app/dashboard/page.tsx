"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Plus, Activity, Settings, Check, Loader2, FlaskConical } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase-browser";

interface Form {
    id: string;
    name: string;
    notify_email: string;
    created_at: string;
    submission_count?: number;
    last_activity?: string;
}

export default function Dashboard() {
    const [forms, setForms] = useState<Form[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newFormName, setNewFormName] = useState("");
    const [newFormEmail, setNewFormEmail] = useState("");
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string>("");
    const supabase = createClient();

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        setIsLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            setUserEmail(user.email || '');

            // Fetch forms
            const { data: formsData, error: formsError } = await supabase
                .from("forms")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (formsError) throw formsError;

            // Fetch submission stats for each form
            const formsWithStats = await Promise.all((formsData || []).map(async (form: any) => {
                const { count, error: countError } = await supabase
                    .from("submissions")
                    .select("*", { count: "exact", head: true })
                    .eq("form_id", form.id);

                const { data: lastSub, error: lastSubError } = await supabase
                    .from("submissions")
                    .select("created_at")
                    .eq("form_id", form.id)
                    .order("created_at", { ascending: false })
                    .limit(1)
                    .single();

                return {
                    ...form,
                    submission_count: count || 0,
                    last_activity: lastSub ? new Date(lastSub.created_at).toLocaleDateString() : "Never"
                };
            }));

            setForms(formsWithStats);
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch forms");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!newFormName.trim() || !newFormEmail.trim()) {
            toast.error("Name and Notification Email are required");
            return;
        }

        setIsCreating(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            const { data, error } = await supabase
                .from("forms")
                .insert([
                    {
                        name: newFormName,
                        notify_email: newFormEmail,
                        user_id: user.id
                    }
                ])
                .select()
                .single();

            if (error) throw error;

            toast.success("Endpoint created successfully");
            setIsCreateOpen(false);
            setNewFormName("");
            setNewFormEmail("");
            fetchForms();
        } catch (error: any) {
            toast.error(error.message || "Failed to create endpoint");
        } finally {
            setIsCreating(false);
        }
    };

    const copyToClipboard = (id: string) => {
        const url = `${window.location.origin}/api/f/${id}`;
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        toast.success("Endpoint URL copied to clipboard");
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div>
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Endpoints</h1>
                        <p className="text-muted-foreground mt-1">Manage and monitor your headless API endpoints.</p>
                    </div>

                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-none font-medium">
                                <Plus className="mr-2 h-4 w-4" /> Create Endpoint
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create New Endpoint</DialogTitle>
                                <DialogDescription>
                                    Create a new headless form endpoint to start receiving submissions.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g. Waitlist Form"
                                        className="col-span-3"
                                        value={newFormName}
                                        onChange={(e) => setNewFormName(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Notify Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        className="col-span-3"
                                        value={newFormEmail}
                                        onChange={(e) => setNewFormEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    onClick={handleCreate}
                                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                                    disabled={isCreating}
                                >
                                    {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Create Endpoint
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : forms.length === 0 ? (
                    <div className="text-center py-20 bg-muted/40 rounded-xl border border-border border-dashed">
                        <p className="text-muted-foreground mb-4">No endpoints created yet.</p>
                        <Button onClick={() => setIsCreateOpen(true)} variant="outline">
                            Create your first endpoint
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {forms.map(form => (
                            <Card key={form.id} className="bg-card/60 border-border shadow-none hover:bg-card/90 transition-colors group">
                                <CardHeader className="pb-4">
                                    <div className="flex justify-between items-start">
                                        <Link href={`/dashboard/${form.id}`} className="block flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                                <CardTitle className="text-base text-foreground font-medium group-hover:text-foreground/80 transition-colors">
                                                    {form.name}
                                                </CardTitle>
                                            </div>
                                            <CardDescription className="text-muted-foreground text-sm">{form.notify_email}</CardDescription>
                                        </Link>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted shrink-0">
                                            <Settings className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-2 mb-6">
                                        <Input
                                            readOnly
                                            value={`${typeof window !== 'undefined' ? window.location.origin : ''}/api/f/${form.id}`}
                                            className="bg-muted/50 border-border text-muted-foreground font-mono text-xs h-9 focus-visible:ring-0 cursor-text"
                                        />
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() => copyToClipboard(form.id)}
                                            className="h-9 w-9 border-border bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
                                        >
                                            {copiedId === form.id ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                        <a
                                            href={`/test-form.html?url=${encodeURIComponent(`${typeof window !== 'undefined' ? window.location.origin : ''}/api/f/${form.id}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="h-9 w-9 border-border bg-muted/50 text-muted-foreground hover:text-emerald-500 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-colors shrink-0"
                                            >
                                                <FlaskConical className="h-4 w-4" />
                                            </Button>
                                        </a>
                                    </div>
                                    <Link href={`/dashboard/${form.id}`}>
                                        <div className="flex gap-8 text-sm border-t border-border/50 pt-4 mt-2 cursor-pointer group/stats">
                                            <div>
                                                <div className="text-xl font-medium text-foreground mb-1 group-hover/stats:text-foreground/80 transition-colors">{(form.submission_count || 0).toLocaleString()}</div>
                                                <div className="text-muted-foreground flex items-center gap-1.5"><Activity className="h-3.5 w-3.5" /> Submissions</div>
                                            </div>
                                            <div>
                                                <div className="text-xl font-medium text-foreground mb-1 group-hover/stats:text-foreground/80 transition-colors">{form.last_activity}</div>
                                                <div className="text-muted-foreground">Last Activity</div>
                                            </div>
                                        </div>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
