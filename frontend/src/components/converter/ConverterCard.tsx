'use client';

import React, { useState, useCallback } from 'react';
import { FormatSelector } from './FormatSelector';
import { MediaInfo } from './MediaInfo';
import { QualitySelector } from './QualitySelector';
import { DownloadProgress } from './DownloadProgress';
import { SkeletonLoader } from './SkeletonLoader';
import { ToastContainer } from '@/components/ui/Toast';
import { useMediaInfo } from '@/hooks/useMediaInfo';
import { useDownload } from '@/hooks/useDownload';
import { useToast } from '@/hooks/useToast';

export function ConverterCard() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState<'mp3' | 'mp4'>('mp4');
  const [activeQuality, setActiveQuality] = useState<string | null>(null);

  const { mediaInfo, isLoading, error: infoError, fetchInfo, reset: resetInfo } = useMediaInfo();
  const { jobStatus, isDownloading, error: downloadError, startDownload, reset: resetDownload } = useDownload();
  const { toasts, addToast, removeToast } = useToast();

  const handleConvert = useCallback(async () => {
    if (!url.trim()) {
      addToast('Please paste a valid URL.', 'error');
      return;
    }

    resetDownload();
    setActiveQuality(null);
    await fetchInfo(url.trim());
  }, [url, fetchInfo, resetDownload, addToast]);

  const handleDownload = useCallback(async (quality: string) => {
    if (!mediaInfo) return;
    setActiveQuality(quality);
    addToast(`Starting ${format.toUpperCase()} download at ${quality}...`, 'info');
    await startDownload(mediaInfo.url, format, quality);
  }, [mediaInfo, format, startDownload, addToast]);

  const handleReset = useCallback(() => {
    setUrl('');
    setFormat('mp4');
    setActiveQuality(null);
    resetInfo();
    resetDownload();
  }, [resetInfo, resetDownload]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConvert();
    }
  };

  // Show error toast when errors occur
  React.useEffect(() => {
    if (infoError) addToast(infoError, 'error');
  }, [infoError, addToast]);

  React.useEffect(() => {
    if (downloadError) addToast(downloadError, 'error');
  }, [downloadError, addToast]);

  // Show success toast when download completes
  React.useEffect(() => {
    if (jobStatus?.stage === 'completed') {
      addToast('File downloaded successfully! 🎉', 'success');
    }
  }, [jobStatus?.stage, addToast]);

  const qualities = format === 'mp4' ? mediaInfo?.videoQualities : mediaInfo?.audioQualities;

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div id="converter" className="w-full max-w-3xl mx-auto scroll-mt-24">
        <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/5">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-card-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-heading text-foreground">
                  Media Converter
                </h2>
                <p className="text-sm text-muted mt-0.5">
                  Paste a URL and choose your format
                </p>
              </div>
              <FormatSelector format={format} onFormatChange={setFormat} />
            </div>
          </div>

          {/* Input area */}
          <div className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Paste your supported media URL here"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-card-border text-foreground placeholder-muted/50 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 text-sm"
                  disabled={isLoading}
                  id="url-input"
                />
              </div>
              <button
                onClick={handleConvert}
                disabled={isLoading || !url.trim()}
                className="btn-gradient px-8 py-4 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 min-w-[140px]"
                id="convert-button"
              >
                {isLoading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                      <path d="M21 12a9 9 0 11-6.219-8.56" />
                    </svg>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 3 21 3 21 8" />
                      <line x1="4" y1="20" x2="21" y2="3" />
                      <polyline points="21 16 21 21 16 21" />
                      <line x1="15" y1="15" x2="21" y2="21" />
                      <line x1="4" y1="4" x2="9" y2="9" />
                    </svg>
                    <span>Convert</span>
                  </>
                )}
              </button>
            </div>

            {/* Reset button (when info is loaded) */}
            {mediaInfo && (
              <button
                onClick={handleReset}
                className="text-xs text-muted hover:text-foreground transition-colors flex items-center gap-1"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                Start over
              </button>
            )}
          </div>

          {/* Results area */}
          {(isLoading || mediaInfo || infoError) && (
            <div className="px-6 pb-6 space-y-4">
              {isLoading && <SkeletonLoader />}

              {mediaInfo && (
                <>
                  <MediaInfo info={mediaInfo} />

                  {qualities && (
                    <QualitySelector
                      format={format}
                      qualities={qualities}
                      onDownload={handleDownload}
                      isDownloading={isDownloading}
                      activeQuality={activeQuality}
                    />
                  )}

                  {jobStatus && <DownloadProgress job={jobStatus} />}
                </>
              )}

              {infoError && !isLoading && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400 flex-shrink-0 mt-0.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-red-400">Error</p>
                    <p className="text-xs text-red-400/70 mt-0.5">{infoError}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted/50 mt-4 px-4">
          Only convert media you have the right to download. By using this service, you agree to our{' '}
          <a href="/terms" className="underline hover:text-muted transition-colors">Terms of Service</a>.
        </p>
      </div>
    </>
  );
}
