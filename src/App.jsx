import React, { Suspense, lazy } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { ToolGrid } from './components/ToolGrid';
import { Section } from './components/Section';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PageLoader } from './components/ui/Skeleton';
import content from './data/content.json';
import { validateContentData, getDefaultContent } from './utils/helpers';

// Lazy load heavy components for better performance
const MarkdownRenderer = lazy(() => import('./components/MarkdownRenderer').then(module => ({ default: module.MarkdownRenderer })));

function App() {
  // Validate content data and use defaults if invalid
  const validation = validateContentData(content);
  const safeContent = validation.valid ? content : getDefaultContent();

  return (
    <ErrorBoundary>
      <Layout>
        <Hero
          title={safeContent.hero.title}
          subtitle={safeContent.hero.subtitle}
          metadata={safeContent.hero.metadata || {}}
        />

        <div className="max-w-7xl mx-auto space-y-20">
          <ToolGrid tools={safeContent.topTools || []} />

          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-slate-800 flex-1" aria-hidden="true"></div>
              <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest">Guía Completa</h2>
              <div className="h-px bg-slate-800 flex-1" aria-hidden="true"></div>
            </div>

            {safeContent.categories.map((category, index) => (
              <Section
                key={category.title || `category-${index}`}
                title={category.title}
                content={category.content}
                index={index}
              />
            ))}
          </div>
        </div>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
