'use client';

import React, { useEffect, useState } from 'react';
import { Heading, BodyText } from '@/components/common/Typography';

interface ReframeConversationProps {
  transcript: Array<{ role: string; content: string }>;
}

interface SummaryResponse {
  originalThought: string;
  reframedThought: string;
}

export default function ReframeConversationSummary({
  transcript,
}: ReframeConversationProps) {
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch('/api/reframe/summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ transcript }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch summary');
        }

        const data = await response.json();
        setSummary(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    if (transcript.length > 0) {
      fetchSummary();
    }
  }, [transcript]);

  if (error) {
    return <BodyText>Error: {error}</BodyText>;
  }

  if (!summary) {
    return <BodyText>Loading summary...</BodyText>;
  }

  return (
    <div className='space-y-6'>
      <Heading>Conversation Summary</Heading>
      <div className='space-y-4'>
        <div>
          <BodyText className='font-semibold'>Original Thought</BodyText>
          <BodyText>{summary.originalThought}</BodyText>
        </div>
        <div>
          <BodyText className='font-semibold'>Reframed Thought</BodyText>
          <BodyText>{summary.reframedThought}</BodyText>
        </div>
      </div>
    </div>
  );
}
