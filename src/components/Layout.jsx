import React from 'react';
import { cn } from '../lib/utils';

export function Layout({ children, className }) {
    return (
        <div className={cn("min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30", className)}>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" aria-hidden="true" />
            <div className="relative z-10 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav 
                    className="flex items-center justify-between py-6 border-b border-white/10"
                    role="navigation"
                    aria-label="Main navigation"
                >
                    <div className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        IA Tools 2026
                    </div>
                    <div className="text-sm text-slate-400">
                        Guía Completa
                    </div>
                </nav>
                <main className="flex-grow py-8" role="main">
                    {children}
                </main>
                <footer 
                    className="py-8 border-t border-white/10 text-center text-slate-500 text-sm"
                    role="contentinfo"
                >
                    Updates & Feedback @ 2026
                </footer>
            </div>
        </div>
    );
}
