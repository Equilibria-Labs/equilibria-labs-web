'use client';

import React from 'react';
import { Heading, BodyText } from '@/components/common/Typography';

interface ReframeConversationProps {
  summary: {
    originalThought: string;
    reframedThought: string;
  } | null;
  error: string | null;
  isLoading: boolean;
}

export default function ReframeConversationSummary({
  summary,
  error,
  isLoading,
}: ReframeConversationProps) {
  if (error) {
    return <BodyText>Error: {error}</BodyText>;
  }

  if (isLoading || !summary) {
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
