'use client';

import React from 'react';
import {
  Heading,
  BodyText,
  HeadingSmall,
  LabelText,
  BodyTextLarge,
} from '@/components/common/Typography';
import Column from '@/components/structure/Column';
import TextLoader from '@/components/common/TextLoader';
import { ChoiceRadioGroup } from '@/components/common/ChoiceRadioGroup';
import { ChoiceValue } from '@/types';
import Box from '@/components/structure/Box';

interface ReframeConversationProps {
  summary: {
    originalThought: string;
    reframedThought: string;
  } | null;
  error: string | null;
  isLoading: boolean;
  onHelpfulnessChangeAction: (helpfulness: string) => void;
}

export default function ReframeConversationSummary({
  summary,
  error,
  isLoading,
  onHelpfulnessChangeAction,
}: ReframeConversationProps) {
  if (error) {
    return <BodyText>Error: {error}</BodyText>;
  }

  if (isLoading || !summary) {
    return <TextLoader text='Reframing...' />;
  }

  const choices = [
    {
      choiceId: 'helpful',
      text: 'Helpful',
      value: { stringValue: 'helpful' },
      iconName: 'smile' as const,
    },
    {
      choiceId: 'neutral',
      text: 'Neither helpful nor unhelpful',
      value: { stringValue: 'neutral' },
      iconName: 'meh' as const,
    },
    {
      choiceId: 'unhelpful',
      text: 'Unhelpful',
      value: { stringValue: 'unhelpful' },
      iconName: 'frown' as const,
    },
  ];

  const handleChange = (value: ChoiceValue) => {
    if (value.stringValue) {
      onHelpfulnessChangeAction(value.stringValue);
    }
  };

  return (
    <Column hasLargeGap>
      <Box hasNoGap>
        <Heading className={`text-secondary`}>Original Thought</Heading>
        <BodyTextLarge>{summary.originalThought}</BodyTextLarge>
      </Box>
      <Box hasNoGap>
        <Heading className={`text-secondary`}>Reframed Thought</Heading>
        <BodyTextLarge>{summary.reframedThought}</BodyTextLarge>
      </Box>
      <Column>
        <Heading className={`text-secondary`}>
          How do you find this reframed thought?
        </Heading>
        <ChoiceRadioGroup
          value={[]}
          onChange={handleChange}
          next={() => {}}
          choices={choices}
        />
      </Column>
    </Column>
  );
}
