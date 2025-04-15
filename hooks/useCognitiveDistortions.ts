import { useState, useEffect, useRef } from 'react';
import { CognitiveDistortionId } from '@/types/shared/cognitive-distortion-id';

type CognitiveDistortionsResponse = {
  id: CognitiveDistortionId;
};

interface Transcript {
  role: string;
  content: string;
}

interface UseCognitiveDistortionsResult {
  cognitiveDistortion: CognitiveDistortionsResponse | null;
  error: string | null;
  isLoading: boolean;
}

export function useCognitiveDistortions(
  transcript: Transcript[]
): UseCognitiveDistortionsResult {
  const [cognitiveDistortion, setCognitiveDistortion] =
    useState<CognitiveDistortionsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCognitiveDistortions = async () => {
      // Prevent API calls when we already have data or are loading
      if (isLoading || cognitiveDistortion || transcript.length === 0) {
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch('/api/reframe/cognitive-distortions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ transcript }),
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch cognitive distortions: ${response.status}`
          );
        }

        const data = await response.json();
        setCognitiveDistortion(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCognitiveDistortions();
  }, [transcript]);

  return { cognitiveDistortion, error, isLoading };
}
