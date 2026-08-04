'use client';

import React from 'react';
import { type JobStatus, API_BASE } from '@/lib/api';

interface DownloadProgressProps {
  job: JobStatus;
}

const stageLabels: Record<string, string> = {
  queued: 'Queued...',
  fetching: 'Fetching media...',
  processing: 'Downloading & processing...',
  converting: 'Converting format...',
  uploading: 'Uploading to cloud...',
  completed: 'Complete!',
  failed: 'Failed',
};

const stageIcons: Record<string, React.ReactNode> = {
  queued: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
  ),
  fetching: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
  ),
  processing: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 11-6.219-8.56" /></svg>
  ),
  converting: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" /></svg>
  ),
  uploading: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
  ),
  completed: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
  ),
  failed: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
  ),
};

export function DownloadProgress({ job }: DownloadProgressProps) {
  const isComplete = job.stage === 'completed';
  const isFailed = job.stage === 'failed';

  return (
    <div className="fade-in space-y-4 p-5 rounded-xl glass">
      {/* Stage indicator */}
      <div className="flex items-center gap-3">
        <div className={`${
          isComplete ? 'text-emerald-400' : isFailed ? 'text-red-400' : 'text-violet-400 animate-pulse'
        }`}>
          {stageIcons[job.stage]}
        </div>
        <div className="flex-1">
          <p className={`text-sm font-semibold ${
            isComplete ? 'text-emerald-400' : isFailed ? 'text-red-400' : 'text-foreground'
          }`}>
            {stageLabels[job.stage]}
          </p>
          {isFailed && job.error && (
            <p className="text-xs text-red-400/80 mt-1">{job.error}</p>
          )}
        </div>
        <span className={`text-sm font-bold ${
          isComplete ? 'text-emerald-400' : 'text-foreground'
        }`}>
          {job.progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            isComplete
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
              : isFailed
                ? 'bg-red-500'
                : 'progress-bar'
          }`}
          style={{ width: `${job.progress}%` }}
        />
      </div>

      {/* Stage timeline */}
      <div className="flex items-center justify-between gap-2 pt-1">
        {['fetching', 'processing', 'converting', 'uploading', 'completed'].map((stage, i) => {
          const stages = ['fetching', 'processing', 'converting', 'uploading', 'completed'];
          const currentIndex = stages.indexOf(job.stage);
          const isReached = i <= currentIndex;

          return (
            <div key={stage} className="flex items-center gap-2 flex-1 last:flex-none">
              <div
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-300 ${
                  isReached
                    ? isComplete
                      ? 'bg-emerald-400'
                      : 'bg-violet-400 glow-pulse'
                    : 'bg-white/10'
                }`}
              />
              {i < stages.length - 1 && (
                <div
                  className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${
                    i < currentIndex
                      ? isComplete
                        ? 'bg-emerald-400/50'
                        : 'bg-violet-400/30'
                      : 'bg-white/5'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Success message */}
      {isComplete && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-emerald-400 text-lg">🎉</span>
            <div>
              <p className="text-sm font-semibold text-emerald-400">File is ready!</p>
              <p className="text-xs text-emerald-400/70">Your download should start automatically.</p>
            </div>
          </div>
          
          {job.downloadUrl && (
            <a 
              href={`${API_BASE}/media/file/${job.id}`}
              download={job.filename || 'download'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download File Manually</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
