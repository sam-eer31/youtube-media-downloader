'use client';

import React from 'react';
import { MediaInfo as MediaInfoType } from '@/lib/api';

interface MediaInfoProps {
  info: MediaInfoType;
}

export function MediaInfo({ info }: MediaInfoProps) {
  return (
    <div className="fade-in flex flex-col sm:flex-row gap-5 p-5 rounded-xl clay">
      {/* Thumbnail */}
      {info.thumbnail && (
        <div className="relative w-full sm:w-52 h-32 rounded-xl overflow-hidden flex-shrink-0 group clay-sm" style={{ padding: 0 }}>
          <img
            src={info.thumbnail}
            alt={info.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          {/* Play icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
          {/* Duration badge */}
          <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[0.6875rem] font-mono font-bold tracking-wider">
            {info.durationFormatted}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="flex flex-col gap-2 min-w-0 justify-center">
        <h3 className="text-base font-semibold font-heading text-foreground line-clamp-2 leading-snug">
          {info.title}
        </h3>
        <div className="flex flex-col gap-1.5 mt-1">
          <p className="text-sm text-muted flex items-center gap-2">
            <div className="w-5 h-5 rounded-md clay-inset flex items-center justify-center flex-shrink-0 text-accent">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span className="truncate">{info.uploader}</span>
          </p>
          <p className="text-sm text-muted flex items-center gap-2">
            <div className="w-5 h-5 rounded-md clay-inset flex items-center justify-center flex-shrink-0 text-accent">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            {info.durationFormatted}
          </p>
        </div>
      </div>
    </div>
  );
}
