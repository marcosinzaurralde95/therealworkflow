
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Cpu, Globe, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { extractRating, extractPrice, formatToolName, generateId } from '../utils/helpers';

export function ToolCard({ tool, index }) {
    // Safely extract rating and price using utility functions
    const rating = extractRating(tool?.tags) || 0;
    const price = extractPrice(tool?.tags);
    const toolId = generateId(tool, index);
    const formattedName = formatToolName(tool?.name);
    
    // Handle click for tool analysis
    const handleViewAnalysis = () => {
        if (tool?.url) {
            window.open(tool.url, '_blank', 'noopener,noreferrer');
        } else {
            // Could open a modal or navigate to detail page in future
            console.log('View analysis for:', tool?.name);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors duration-300 overflow-hidden"
            role="article"
            aria-labelledby={`tool-title-${toolId}`}
        >
            <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover:text-indigo-300 transition-colors"
                             aria-label={`Icon for ${formattedName}`}>
                            <Cpu size={24} aria-hidden="true" />
                        </div>
                        <h3 id={`tool-title-${toolId}`} className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                            {formattedName}
                        </h3>
                    </div>
                    {rating > 0 && (
                        <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 px-2 py-1 rounded text-xs font-bold"
                             aria-label={`Rating: ${rating} out of 10`}>
                            <Star size={12} fill="currentColor" aria-hidden="true" />
                            <span>{rating.toFixed(1)}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Tool tags">
                    {tool?.tags?.map((tag, i) => (
                        <span key={`${toolId}-tag-${i}`} 
                              className="px-2 py-1 text-xs bg-slate-800 text-slate-400 rounded-md border border-slate-700"
                              role="listitem">
                            {tag.trim()}
                        </span>
                    ))}
                </div>

                <div className="text-slate-400 text-sm line-clamp-4 prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {tool?.description || 'No description available'}
                    </ReactMarkdown>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-mono" aria-label={`Price: ${price}`}>
                        {price}
                    </span>
                    <button 
                        onClick={handleViewAnalysis}
                        className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                        aria-label={`View detailed analysis for ${formattedName}`}
                        type="button"
                    >
                        Ver análisis {tool?.url ? <ExternalLink size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
