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
  // Find best quality to mark as recommended
  const bestQuality = qualities[qualities.length - 1]?.value;

  return (
    <div className="fade-in fade-in-delay-2 space-y-4">
      <div className="flex items-center gap-2">
        <h4 className="text-xs font-semibold text-muted uppercase tracking-[0.12em]">
          {format === 'mp4' ? 'Video Quality' : 'Audio Quality'}
        </h4>
        <div className="h-px flex-1 bg-gradient-to-r from-accent/10 to-transparent" />
        <span className="text-[0.625rem] text-muted/60 font-mono">Select to download</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {qualities.map((q) => {
          const isActive = activeQuality === q.value && isDownloading;
          const isRecommended = q.value === bestQuality;
          return (
            <button
              key={q.value}
              onClick={() => onDownload(q.value)}
              disabled={isDownloading}
              className={`group relative p-4 rounded-xl text-left transition-all duration-400 overflow-hidden ${
                isActive
                  ? 'clay scale-[1.02]'
                  : 'clay clay-hover'
              } ${isDownloading && !isActive ? 'opacity-30 cursor-not-allowed' : ''}`}
              style={isActive ? {
                boxShadow: '10px 10px 24px var(--clay-shadow), -5px -5px 14px var(--clay-highlight), inset 2px 2px 5px rgba(255,255,255,0.55), 0 0 20px rgba(102, 187, 106,0.1)',
              } : undefined}
            >
              {/* Recommended badge */}
              {isRecommended && !isDownloading && (
                <div className="absolute top-0 right-0">
                  <div className="px-2 py-0.5 rounded-bl-lg rounded-tr-xl clay-sm text-[0.5625rem] font-bold text-accent uppercase tracking-wider">
                    Best
                  </div>
                </div>
              )}

              <div className="relative flex flex-col gap-1.5">
                <span className="text-base font-bold font-heading text-foreground">
                  {q.label}
                </span>
                <span className="text-[0.6875rem] text-muted font-mono">
                  ~{q.estimatedSize}
                </span>
              </div>

              {/* Download icon */}
              <div className={`absolute bottom-3 right-3 transition-all duration-300 ${
                isActive ? 'text-accent' : 'text-muted/30 group-hover:text-accent group-hover:translate-y-0.5'
              }`}>
                {isActive ? (
                  <div className="relative w-4 h-4">
                    <div className="absolute inset-0 rounded-full border-2 border-accent/20" />
                    <div className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent orbit" />
                  </div>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
