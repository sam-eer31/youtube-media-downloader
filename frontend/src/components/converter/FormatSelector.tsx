'use client';

import React from 'react';

interface FormatSelectorProps {
  format: 'mp3' | 'mp4';
  onFormatChange: (format: 'mp3' | 'mp4') => void;
}

export function FormatSelector({ format, onFormatChange }: FormatSelectorProps) {
  return (
    <div className="relative flex items-center gap-0.5 p-1.5 rounded-2xl clay-inset w-fit">
      {/* Sliding indicator */}
      <div
        className="absolute top-1.5 bottom-1.5 rounded-xl clay-sm transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          left: format === 'mp4' ? '6px' : '50%',
          width: 'calc(50% - 6px)',
        }}
      />

      <button
        onClick={() => onFormatChange('mp4')}
        className={`relative z-10 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
          format === 'mp4'
            ? 'text-accent'
            : 'text-muted hover:text-foreground'
        }`}
      >
        <span className="flex items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="3" />
            <polygon points="10 9 15 12 10 15 10 9" />
          </svg>
          MP4
        </span>
      </button>
      <button
        onClick={() => onFormatChange('mp3')}
        className={`relative z-10 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
          format === 'mp3'
            ? 'text-accent'
            : 'text-muted hover:text-foreground'
        }`}
      >
        <span className="flex items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
          </svg>
          MP3
        </span>
      </button>
    </div>
  );
}
