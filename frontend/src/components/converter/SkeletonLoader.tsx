'use client';

import React from 'react';

export function SkeletonLoader() {
  return (
    <div className="fade-in space-y-5 p-5">
      {/* Thumbnail + Info skeleton */}
      <div className="flex gap-5">
        <div className="skeleton w-44 h-28 rounded-xl flex-shrink-0" style={{
          boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.4)',
        }} />
        <div className="flex flex-col gap-3 flex-1 justify-center">
          <div className="skeleton h-5 w-4/5 rounded-lg" />
          <div className="skeleton h-4 w-1/2 rounded-lg" />
          <div className="skeleton h-4 w-2/5 rounded-lg" />
        </div>
      </div>

      {/* Quality header skeleton */}
      <div className="flex items-center gap-3 pt-2">
        <div className="skeleton h-4 w-28 rounded-lg" />
        <div className="h-px flex-1 bg-gradient-to-r from-accent/10 to-transparent" />
      </div>

      {/* Quality grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="skeleton h-[4.5rem] rounded-xl" style={{ 
            animationDelay: `${i * 0.1}s`,
            boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.4)',
          }} />
        ))}
      </div>
    </div>
  );
}
