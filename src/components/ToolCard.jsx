
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Cpu, Globe } from 'lucide-react';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function ToolCard({ tool, index }) {
    // Extract rating if present in tags or details
    const rating = tool.tags.find(t => t.includes('/10')) || '9.0/10';
    const price = tool.tags.find(t => t.includes('Pago') || t.includes('Gratis') || t.includes('$')) || 'Consultar';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors duration-300 overflow-hidden"
        >
            <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover:text-indigo-300 transition-colors">
                            <Cpu size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                            {tool.name.replace(/#/g, '').trim()}
                        </h3>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 px-2 py-1 rounded text-xs font-bold">
                        <Star size={12} fill="currentColor" />
                        {rating.replace('Rating:', '').trim()}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {tool.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 text-xs bg-slate-800 text-slate-400 rounded-md border border-slate-700">
                            {tag.trim()}
                        </span>
                    ))}
                </div>

                <div className="text-slate-400 text-sm line-clamp-4 prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {tool.description}
                    </ReactMarkdown>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-mono">
                        {price}
                    </span>
                    <button className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        Ver análisis <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
