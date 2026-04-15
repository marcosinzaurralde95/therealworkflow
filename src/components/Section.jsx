import React from 'react';
import { motion } from 'framer-motion';
import { MarkdownRenderer } from './MarkdownRenderer';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { generateId } from '../utils/helpers';

export function Section({ title, content, index }) {
    const [isOpen, setIsOpen] = useState(true);
    const sectionId = generateId({ name: title }, index);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="mb-8 border border-white/5 bg-slate-900/40 rounded-xl overflow-hidden backdrop-blur-sm"
            role="region"
            aria-labelledby={`section-title-${sectionId}`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset"
                aria-expanded={isOpen}
                aria-controls={`section-content-${sectionId}`}
                type="button"
            >
                <h2 id={`section-title-${sectionId}`} className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-1 h-8 bg-indigo-500 rounded-full inline-block" aria-hidden="true"></span>
                    {title.replace(/^[0-9]+.\s*/, '').replace(/^[^\w]+/, '')}
                </h2>
                {isOpen ? 
                    <ChevronUp className="text-slate-500" aria-hidden="true" /> : 
                    <ChevronDown className="text-slate-500" aria-hidden="true" />
                }
            </button>

            {isOpen && (
                <div 
                    id={`section-content-${sectionId}`}
                    className="p-6 pt-0 border-t border-white/5"
                    role="tabpanel"
                >
                    {content?.map((item, i) => (
                        <article key={generateId(item, i)} className="mb-8 last:mb-0">
                            {item.subtitle && !item.subtitle.includes(title) && (
                                <h3 className="text-xl font-semibold text-indigo-300 mb-4 mt-6">
                                    {item.subtitle.replace(/\*\*/g, '')}
                                </h3>
                            )}
                            <MarkdownRenderer content={item.text} />
                        </article>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
