import React from 'react';

/**
 * Loading skeleton component for better UX during data loading
 */
export function Skeleton({ className = '' }) {
  return (
    <div 
      className={`animate-pulse bg-slate-800/50 rounded ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Loading state for tool cards grid
 */
export function ToolGridSkeleton() {
  return (
    <section className="py-12 px-4 sm:px-0" aria-label="Loading tools">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
        <Skeleton className="h-10 w-full md:w-96 rounded-lg" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-6 w-16 rounded" />
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Skeleton className="h-5 w-16 rounded-md" />
              <Skeleton className="h-5 w-20 rounded-md" />
              <Skeleton className="h-5 w-14 rounded-md" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Loading state for sections
 */
export function SectionSkeleton() {
  return (
    <div className="mb-8 border border-white/5 bg-slate-900/40 rounded-xl overflow-hidden backdrop-blur-sm">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-1 rounded-full" />
          <Skeleton className="h-6 w-64" />
        </div>
        <Skeleton className="h-6 w-6" />
      </div>
      <div className="p-6 pt-0 space-y-4">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

/**
 * Full page loading state
 */
export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950" role="status" aria-label="Loading content">
      <div className="text-center space-y-4">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 border-4 border-slate-800 rounded-full" />
          <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin" />
        </div>
        <p className="text-slate-400 animate-pulse">Loading content...</p>
      </div>
    </div>
  );
}
