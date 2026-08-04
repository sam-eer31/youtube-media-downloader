'use client';

import React from 'react';
import type { QualityOption } from '@/lib/api';

interface QualitySelectorProps {
  format: 'mp3' | 'mp4';
  qualities: QualityOption[];
  onDownload: (quality: string) => void;
  isDownloading: boolean;
  activeQuality: string | null;
}

export function QualitySelector({ format, qualities, onDownload, isDownloading, activeQuality }: QualitySelectorProps) {
  return (
    <div className="fade-in fade-in-delay-2 space-y-3">
      <h4 className="text-sm font-semibold text-muted uppercase tracking-wider">
        {format === 'mp4' ? 'Video Quality' : 'Audio Quality'} — Select to download
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {qualities.map((q) => {
          const isActive = activeQuality === q.value && isDownloading;
          return (
            <button
              key={q.value}
              onClick={() => onDownload(q.value)}
              disabled={isDownloading}
              className={`group relative p-4 rounded-xl glass glass-hover text-left transition-all duration-300 ${
                isActive
                  ? 'border-violet-500/50 shadow-lg shadow-violet-500/20'
                  : ''
              } ${isDownloading && !isActive ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-base font-bold font-heading text-foreground">
                  {q.label}
                </span>
                <span className="text-xs text-muted">
                  ~{q.estimatedSize}
                </span>
              </div>

              {/* Download icon */}
              <div className={`absolute top-3 right-3 text-muted transition-all duration-300 ${
                isActive ? 'text-violet-400 animate-bounce' : 'group-hover:text-violet-400'
              }`}>
                {isActive ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
