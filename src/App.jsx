
import React from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { ToolGrid } from './components/ToolGrid';
import { Section } from './components/Section';
import content from './data/content.json';

function App() {
  return (
    <Layout>
      <Hero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        metadata={content.hero.metadata}
      />

      <div className="max-w-7xl mx-auto space-y-20">
        <ToolGrid tools={content.topTools} />

        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-slate-800 flex-1"></div>
            <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest">Guía Completa</h2>
            <div className="h-px bg-slate-800 flex-1"></div>
          </div>

          {content.categories.map((category, index) => (
            <Section
              key={index}
              title={category.title}
              content={category.content}
              index={index}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default App;
