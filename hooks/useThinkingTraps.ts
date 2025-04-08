import { useState, useEffect, useRef } from 'react';
import { ThinkingTrapId } from '@/types/thinking-trap';

type ThinkingTrapsResponse = ThinkingTrapId;

interface Transcript {
  role: string;
  content: string;
}

interface UseThinkingTrapsResult {
  thinkingTrap: ThinkingTrapsResponse | null;
  error: string | null;
  isLoading: boolean;
}

export function useThinkingTraps(
  transcript: Transcript[]
): UseThinkingTrapsResult {
  const [thinkingTrap, setThinkingTrap] =
    useState<ThinkingTrapsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchThinkingTraps = async () => {
      // Prevent API calls when we already have data or are loading
      if (isLoading || thinkingTrap || transcript.length === 0) {
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch('/api/reframe/thinking-traps', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ transcript }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch thinking traps: ${response.status}`);
        }

        const data = await response.json();
        setThinkingTrap(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchThinkingTraps();
  }, [transcript]);

  return { thinkingTrap, error, isLoading };
}
