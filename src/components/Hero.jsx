import React from 'react';
import { motion } from 'framer-motion';

export function Hero({ title, subtitle, metadata }) {
    const metadataEntries = Object.entries(metadata || {});
    
    return (
        <section className="py-20 text-center space-y-6" aria-label="Hero section">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-indigo-400 uppercase bg-indigo-500/10 rounded-full mb-4 border border-indigo-500/20">
                    Edición 2026
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
                    {title}
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            </motion.div>

            {metadataEntries.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 pt-4"
                    role="list"
                    aria-label="Hero metadata"
                >
                    {metadataEntries.map(([key, value]) => (
                        <div 
                            key={key} 
                            className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-lg border border-white/5"
                            role="listitem"
                        >
                            <span className="text-slate-400 font-semibold">{key}:</span>
                            <span className="text-indigo-300">{value}</span>
                        </div>
                    ))}
                </motion.div>
            )}
        </section>
    );
}
