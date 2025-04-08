import { useState, useEffect, useRef } from 'react';

interface ReframeSummaryResponse {
  originalThought: string;
  reframedThought: string;
}

interface Transcript {
  role: string;
  content: string;
}

interface UseReframeSummaryResult {
  summary: ReframeSummaryResponse | null;
  error: string | null;
  isLoading: boolean;
}

export function useReframeSummary(
  transcript: Transcript[]
): UseReframeSummaryResult {
  const [summary, setSummary] = useState<ReframeSummaryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const hasCalledApi = useRef(false);

  useEffect(() => {
    const fetchSummary = async () => {
      // Prevent multiple API calls
      if (
        isLoading ||
        summary ||
        hasCalledApi.current ||
        transcript.length === 0
      ) {
        return;
      }

      hasCalledApi.current = true;
      setIsLoading(true);

      try {
        const response = await fetch('/api/reframe/summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ transcript }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch summary: ${response.status}`);
        }

        const data = await response.json();
        setSummary(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Reset hasCalledApi on error to allow retry
        hasCalledApi.current = false;
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();

    return () => {
      hasCalledApi.current = false;
    };
  }, [transcript]);

  return { summary, error, isLoading };
}
