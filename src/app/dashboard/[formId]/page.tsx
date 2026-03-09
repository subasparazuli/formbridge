"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Copy, Download, Check, Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Mock data generator for submissions
const generateMockSubmissions = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `sub_${Math.random().toString(36).substring(2, 9)}`,
        data: {
            email: `user${i + 1}@example.com`,
            message: "Really interested in early access! Let me know when you launch.",
            company: i % 2 === 0 ? "Acme Corp" : "Globex"
        },
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString()
    }));
};

export default function FormDetails() {
    const params = useParams();
    const formId = params.formId as string;

    // In a real app we would fetch the form metadata here. For now, we mock.
    const formUrl = `https://api.formbridge.dev/submit/${formId}`;

    const [copied, setCopied] = useState(false);
    const [submissions] = useState(generateMockSubmissions(12));

    const handleCopy = () => {
        navigator.clipboard.writeText(formUrl);
        setCopied(true);
        toast.success("Endpoint URL copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="pb-12">
            <div className="border-b border-zinc-800/50 bg-zinc-950/50">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center gap-4 text-sm text-zinc-400 mb-6">
                        <Link href="/dashboard" className="hover:text-zinc-50 transition-colors flex items-center gap-1">
                            <ArrowLeft className="h-4 w-4" /> Back to Endpoints
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-zinc-50 tracking-tight">Waitlist Form</h1>
                            <p className="text-zinc-400 mt-1">ID: {formId}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" className="border-zinc-800 bg-transparent text-zinc-300 hover:text-white hover:bg-zinc-800">
                                <Settings className="h-4 w-4 mr-2" /> Settings
                            </Button>
                            <Button variant="outline" className="border-red-900/50 bg-red-950/20 text-red-500 hover:text-red-400 hover:bg-red-950/40">
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center gap-2 max-w-xl">
                        <div className="flex-1 flex items-center bg-black/50 border border-zinc-800 rounded-md overflow-hidden p-1 shadow-inner">
                            <div className="bg-zinc-900 text-zinc-500 text-xs px-3 py-1.5 rounded-sm font-medium border border-zinc-800/50 mr-2">POST</div>
                            <Input
                                readOnly
                                value={formUrl}
                                className="bg-transparent border-0 h-8 text-sm font-mono text-zinc-300 focus-visible:ring-0 p-0"
                            />
                        </div>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size="icon" onClick={handleCopy} className="bg-white text-black hover:bg-zinc-200 shrink-0">
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Copy endpoint URL</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <Card className="bg-zinc-900/40 border-zinc-800/60 shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between pb-6">
                        <div>
                            <CardTitle className="text-xl font-semibold text-zinc-50">Submissions</CardTitle>
                            <CardDescription className="text-zinc-500">View and manage form entries.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="border-zinc-800 bg-black/50 text-zinc-300 hover:text-white hover:bg-zinc-800">
                            <Download className="h-4 w-4 mr-2" /> Export CSV
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border border-zinc-800/50 overflow-hidden">
                            <Table>
                                <TableHeader className="bg-zinc-950/50">
                                    <TableRow className="border-zinc-800 hover:bg-transparent">
                                        <TableHead className="text-zinc-400 font-medium">Date</TableHead>
                                        <TableHead className="text-zinc-400 font-medium">Email</TableHead>
                                        <TableHead className="text-zinc-400 font-medium">Company</TableHead>
                                        <TableHead className="text-zinc-400 font-medium text-right text-xs">ID</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {submissions.map((sub) => (
                                        <TableRow key={sub.id} className="border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                                            <TableCell className="text-zinc-300 whitespace-nowrap">{sub.createdAt}</TableCell>
                                            <TableCell className="text-zinc-100 font-medium">{sub.data.email}</TableCell>
                                            <TableCell className="text-zinc-400">{sub.data.company}</TableCell>
                                            <TableCell className="text-zinc-600 text-right font-mono text-xs">{sub.id}</TableCell>
                                        </TableRow>
                                    ))}
                                    {submissions.length === 0 && (
                                        <TableRow className="border-0">
                                            <TableCell colSpan={4} className="h-32 text-center text-zinc-500">
                                                No submissions yet.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
