
import React, { useState } from 'react';
import { ToolCard } from './ToolCard';
import { Search } from 'lucide-react';

export function ToolGrid({ tools }) {
    const [filter, setFilter] = useState('');

    const filteredTools = tools.filter(tool =>
        tool.name.toLowerCase().includes(filter.toLowerCase()) ||
        tool.description.toLowerCase().includes(filter.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
    );

    return (
        <section className="py-12 px-4 sm:px-0">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                    Top Herramientas
                    <span className="text-sm font-normal text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                        {filteredTools.length}
                    </span>
                </h2>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar herramientas, tags..."
                        className="w-full bg-slate-900/60 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTools.map((tool, index) => (
                    <ToolCard key={index} tool={tool} index={index} />
                ))}
                {filteredTools.length === 0 && (
                    <div className="col-span-full text-center py-20 text-slate-500">
                        No se encontraron herramientas que coincidan con tu búsqueda.
                    </div>
                )}
            </div>
        </section>
    );
}
