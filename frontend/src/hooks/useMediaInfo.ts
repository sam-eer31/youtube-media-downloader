'use client';

import { useState, useCallback } from 'react';
import { fetchMediaInfo as apiFetchMediaInfo, MediaInfo } from '@/lib/api';

interface UseMediaInfoReturn {
  mediaInfo: MediaInfo | null;
  isLoading: boolean;
  error: string | null;
  fetchInfo: (url: string) => Promise<void>;
  reset: () => void;
}

/** Hook for fetching media information from a URL */
export function useMediaInfo(): UseMediaInfoReturn {
  const [mediaInfo, setMediaInfo] = useState<MediaInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInfo = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);
    setMediaInfo(null);

    try {
      const info = await apiFetchMediaInfo(url);
      setMediaInfo(info);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch media info.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setMediaInfo(null);
    setIsLoading(false);
    setError(null);
  }, []);

  return { mediaInfo, isLoading, error, fetchInfo, reset };
}
