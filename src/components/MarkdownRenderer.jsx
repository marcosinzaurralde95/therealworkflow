
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../lib/utils';

export function MarkdownRenderer({ content, className }) {
    return (
        <div className={cn("prose prose-invert prose-slate max-w-none prose-headings:text-indigo-100 prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-strong:text-white prose-table:border-collapse prose-th:bg-slate-900 prose-th:p-3 prose-td:p-3 prose-td:border-slate-800 prose-th:border-slate-800 prose-tr:border-slate-800", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    table: ({ node, ...props }) => <div className="overflow-x-auto my-8 border border-slate-800 rounded-lg"><table className="w-full text-left text-sm" {...props} /></div>,
                    thead: ({ node, ...props }) => <thead className="bg-slate-900/50 text-slate-200" {...props} />,
                    th: ({ node, ...props }) => <th className="p-4 font-semibold border-b border-slate-700" {...props} />,
                    td: ({ node, ...props }) => <td className="p-4 border-b border-slate-800 text-slate-400" {...props} />,
                    a: ({ node, ...props }) => <a className="text-indigo-400 hover:underline" {...props} />,
                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-400 my-6 bg-slate-900/30 p-4 rounded-r-lg" {...props} />,
                    code: ({ node, inline, className, children, ...props }) => {
                        return inline ?
                            <code className="bg-slate-800 text-indigo-300 px-1 py-0.5 rounded text-sm" {...props}>{children}</code> :
                            <pre className="bg-slate-950 border border-slate-800 p-4 rounded-lg overflow-x-auto text-sm text-slate-300 my-4" {...props}><code>{children}</code></pre>
                    }
                }}
            >
                {Array.isArray(content) ? content.join('\n') : content}
            </ReactMarkdown>
        </div>
    );
}
