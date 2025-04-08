'use client';

import React from 'react';
import { Heading } from '@/components/common/Typography';

interface ReframeConversationProps {
  transcript: Array<{ role: string; content: string }>;
}

export default function ReframeConversationSummary({
  transcript,
}: ReframeConversationProps) {
  console.log(transcript);
  return <Heading>Summary</Heading>;
}
