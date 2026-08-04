'use client';

import { useState, useCallback, useRef } from 'react';
import { startDownload as apiStartDownload, getJobProgress, JobStatus, API_BASE } from '@/lib/api';

interface UseDownloadReturn {
  jobStatus: JobStatus | null;
  isDownloading: boolean;
  error: string | null;
  startDownload: (url: string, format: 'mp3' | 'mp4', quality: string) => Promise<void>;
  reset: () => void;
}

/** Hook for managing media download with progress polling */
export function useDownload(): UseDownloadReturn {
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  const startDownload = useCallback(async (url: string, format: 'mp3' | 'mp4', quality: string) => {
    setIsDownloading(true);
    setError(null);
    setJobStatus(null);
    stopPolling();

    try {
      const jobId = await apiStartDownload(url, format, quality);

      // Start polling for progress
      pollingRef.current = setInterval(async () => {
        try {
          const status = await getJobProgress(jobId);
          setJobStatus(status);

          if (status.stage === 'completed') {
            stopPolling();
            setIsDownloading(false);

            // Auto-trigger download using our proxy endpoint
            if (status.downloadUrl) {
              window.location.assign(`${API_BASE}/media/file/${jobId}`);
            }
          } else if (status.stage === 'failed') {
            stopPolling();
            setIsDownloading(false);
            setError(status.error || 'Download failed.');
          }
        } catch {
          // Continue polling on temporary network errors
        }
      }, 1000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to start download.';
      setError(message);
      setIsDownloading(false);
    }
  }, [stopPolling]);

  const reset = useCallback(() => {
    stopPolling();
    setJobStatus(null);
    setIsDownloading(false);
    setError(null);
  }, [stopPolling]);

  return { jobStatus, isDownloading, error, startDownload, reset };
}
