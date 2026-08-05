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
    <div className="fade-in space-y-5 p-6 rounded-xl clay">
      {/* Stage indicator */}
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl clay-sm flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          isComplete
            ? 'text-success'
            : isFailed
              ? 'text-error'
              : 'text-accent'
        }`}>
          <div className={!isComplete && !isFailed ? 'animate-pulse' : ''}>
            {stageIcons[job.stage]}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${
            isComplete ? 'text-success' : isFailed ? 'text-error' : 'text-foreground'
          }`}>
            {stageLabels[job.stage]}
          </p>
          {isFailed && job.error && (
            <p className="text-xs text-error/70 mt-0.5 truncate">{job.error}</p>
          )}
        </div>
        <span className={`text-2xl font-bold font-mono tabular-nums ${
          isComplete ? 'text-success' : isFailed ? 'text-error' : 'gradient-text-static'
        }`}>
          {job.progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-3 rounded-full clay-inset overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            isComplete
              ? 'bg-gradient-to-r from-success to-emerald-400'
              : isFailed
                ? 'bg-error'
                : 'progress-bar'
          }`}
          style={{ width: `${job.progress}%` }}
        />
      </div>

      {/* Stage timeline */}
      <div className="flex items-center justify-between gap-1.5 pt-1">
        {['fetching', 'processing', 'converting', 'uploading', 'completed'].map((stage, i) => {
          const stages = ['fetching', 'processing', 'converting', 'uploading', 'completed'];
          const currentIndex = stages.indexOf(job.stage);
          const isReached = i <= currentIndex;
          const isCurrent = i === currentIndex;

          return (
            <div key={stage} className="flex items-center gap-1.5 flex-1 last:flex-none">
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-3 h-3 rounded-full flex-shrink-0 transition-all duration-500 ${
                    isReached
                      ? isComplete
                        ? 'bg-success'
                        : 'bg-accent'
                      : ''
                  }`}
                  style={!isReached ? {
                    background: 'var(--clay)',
                    boxShadow: 'inset 1px 1px 3px var(--clay-shadow), inset -1px -1px 2px rgba(255,255,255,0.3)',
                  } : {
                    boxShadow: isComplete
                      ? '0 0 8px rgba(77, 154, 62, 0.3)'
                      : '0 0 8px rgba(102, 187, 106, 0.3)',
                  }}
                />
                {isCurrent && !isComplete && !isFailed && (
                  <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
                )}
              </div>
              {i < stages.length - 1 && (
                <div
                  className={`h-0.5 flex-1 rounded-full transition-all duration-700`}
                  style={{
                    background: i < currentIndex
                      ? isComplete
                        ? 'rgba(77, 154, 62, 0.25)'
                        : 'rgba(102, 187, 106, 0.2)'
                      : 'rgba(102, 187, 106, 0.06)',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Success message */}
      {isComplete && (
        <div className="space-y-4 fade-in">
          <div className="flex items-center gap-3 p-4 rounded-xl" style={{
            background: 'rgba(77, 154, 62, 0.06)',
            boxShadow: 'inset 2px 2px 5px rgba(77, 154, 62, 0.05), inset -1px -1px 3px rgba(255,255,255,0.3)',
          }}>
            <div className="w-8 h-8 rounded-lg clay-sm flex items-center justify-center text-success flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-success">File is ready!</p>
              <p className="text-xs text-success/60">Your download should start automatically.</p>
            </div>
          </div>
          
          {job.downloadUrl && (
            <a 
              href={`${API_BASE}/media/file/${job.id}`}
              download={job.filename || 'download'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2.5"
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
