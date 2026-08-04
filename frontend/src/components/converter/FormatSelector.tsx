'use client';

import React from 'react';

interface FormatSelectorProps {
  format: 'mp3' | 'mp4';
  onFormatChange: (format: 'mp3' | 'mp4') => void;
}

export function FormatSelector({ format, onFormatChange }: FormatSelectorProps) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl glass w-fit">
      <button
        onClick={() => onFormatChange('mp4')}
        className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
          format === 'mp4'
            ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/25'
            : 'text-muted hover:text-foreground'
        }`}
      >
        <span className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="3" />
            <polygon points="10 9 15 12 10 15 10 9" />
          </svg>
          MP4
        </span>
      </button>
      <button
        onClick={() => onFormatChange('mp3')}
        className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
          format === 'mp3'
            ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/25'
            : 'text-muted hover:text-foreground'
        }`}
      >
        <span className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
          </svg>
          MP3
        </span>
      </button>
    </div>
  );
}
