import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../lib/utils';

// Memoize the component for better performance
export const MarkdownRenderer = memo(function MarkdownRenderer({ content, className }) {
    return (
        <div className={cn("prose prose-invert prose-slate max-w-none prose-headings:text-indigo-100 prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-strong:text-white prose-table:border-collapse prose-th:bg-slate-900 prose-th:p-3 prose-td:p-3 prose-td:border-slate-800 prose-th:border-slate-800 prose-tr:border-slate-800", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-8 border border-slate-800 rounded-lg">
                            <table className="w-full text-left text-sm" {...props} />
                        </div>
                    ),
                    thead: ({ node, ...props }) => (
                        <thead className="bg-slate-900/50 text-slate-200" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                        <th className="p-4 font-semibold border-b border-slate-700" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                        <td className="p-4 border-b border-slate-800 text-slate-400" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                        <a 
                            className="text-indigo-400 hover:underline" 
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote 
                            className="border-l-4 border-indigo-500 pl-4 italic text-slate-400 my-6 bg-slate-900/30 p-4 rounded-r-lg" 
                            {...props} 
                        />
                    ),
                    code: ({ node, inline, className, children, ...props }) => {
                        return inline ? (
                            <code className="bg-slate-800 text-indigo-300 px-1 py-0.5 rounded text-sm" {...props}>
                                {children}
                            </code>
                        ) : (
                            <pre className="bg-slate-950 border border-slate-800 p-4 rounded-lg overflow-x-auto text-sm text-slate-300 my-4" {...props}>
                                <code>{children}</code>
                            </pre>
                        );
                    },
                    // Add accessibility to headings
                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-white mb-4" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-white mb-3" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-xl font-semibold text-indigo-300 mb-2" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1 my-2" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-1 my-2" {...props} />,
                    li: ({ node, ...props }) => <li className="text-slate-300" {...props} />,
                    p: ({ node, ...props }) => <p className="text-slate-300 my-2" {...props} />,
                }}
            >
                {Array.isArray(content) ? content.join('\n') : content || ''}
            </ReactMarkdown>
        </div>
    );
});
