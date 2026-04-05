import React, { useState, useMemo } from 'react';
import { ToolCard } from './ToolCard';
import { Search } from 'lucide-react';
import { useDebounce } from '../hooks/useContentLoader';
import { generateId } from '../utils/helpers';

export function ToolGrid({ tools = [] }) {
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounce(filter, 300);

    const filteredTools = useMemo(() => {
        if (!debouncedFilter) return tools || [];
        
        const searchLower = debouncedFilter.toLowerCase();
        return (tools || []).filter(tool => {
            const nameMatch = tool?.name?.toLowerCase().includes(searchLower);
            const descMatch = tool?.description?.toLowerCase().includes(searchLower);
            const tagsMatch = tool?.tags?.some(tag => tag.toLowerCase().includes(searchLower));
            return nameMatch || descMatch || tagsMatch;
        });
    }, [tools, debouncedFilter]);

    return (
        <section className="py-12 px-4 sm:px-0" aria-label="Tools section">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                    Top Herramientas
                    <span 
                        className="text-sm font-normal text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800"
                        aria-label={`${filteredTools.length} tools available`}
                    >
                        {filteredTools.length}
                    </span>
                </h2>

                <div className="relative w-full md:w-96">
                    <Search 
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" 
                        size={18} 
                        aria-hidden="true"
                    />
                    <input
                        type="search"
                        placeholder="Buscar herramientas, tags..."
                        className="w-full bg-slate-900/60 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        aria-label="Search tools"
                    />
                </div>
            </div>

            <div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                role="list"
                aria-label="Tools list"
            >
                {filteredTools.map((tool, index) => (
                    <ToolCard 
                        key={generateId(tool, index)} 
                        tool={tool} 
                        index={index} 
                    />
                ))}
                {filteredTools.length === 0 && (
                    <div 
                        className="col-span-full text-center py-20 text-slate-500"
                        role="status"
                        aria-live="polite"
                    >
                        {tools?.length === 0 
                            ? 'No hay herramientas disponibles actualmente.'
                            : 'No se encontraron herramientas que coincidan con tu búsqueda.'
                        }
                    </div>
                )}
            </div>
        </section>
    );
}
