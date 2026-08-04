'use client';

import React from 'react';

export function SkeletonLoader() {
  return (
    <div className="fade-in space-y-4 p-6">
      {/* Thumbnail + Info skeleton */}
      <div className="flex gap-4">
        <div className="skeleton w-40 h-24 flex-shrink-0" />
        <div className="flex flex-col gap-3 flex-1">
          <div className="skeleton h-5 w-3/4" />
          <div className="skeleton h-4 w-1/2" />
          <div className="skeleton h-4 w-1/3" />
        </div>
      </div>

      {/* Quality grid skeleton */}
      <div className="space-y-3 pt-2">
        <div className="skeleton h-4 w-1/4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="skeleton h-20 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
