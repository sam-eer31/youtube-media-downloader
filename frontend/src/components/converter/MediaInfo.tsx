'use client';

import React from 'react';
import { MediaInfo as MediaInfoType } from '@/lib/api';

interface MediaInfoProps {
  info: MediaInfoType;
}

export function MediaInfo({ info }: MediaInfoProps) {
  return (
    <div className="fade-in flex flex-col sm:flex-row gap-4 p-4 rounded-xl glass">
      {/* Thumbnail */}
      {info.thumbnail && (
        <div className="relative w-full sm:w-48 h-28 rounded-lg overflow-hidden flex-shrink-0 bg-black/20">
          <img
            src={info.thumbnail}
            alt={info.title}
            className="w-full h-full object-cover"
          />
          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-xs font-medium backdrop-blur-sm">
            {info.durationFormatted}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="flex flex-col gap-1.5 min-w-0">
        <h3 className="text-base font-semibold font-heading text-foreground line-clamp-2 leading-snug">
          {info.title}
        </h3>
        <p className="text-sm text-muted flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
          {info.uploader}
        </p>
        <p className="text-sm text-muted flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
          {info.durationFormatted}
        </p>
      </div>
    </div>
  );
}
