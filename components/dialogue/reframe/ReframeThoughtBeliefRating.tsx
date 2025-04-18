'use client';

import React, { useState } from 'react';
import {
  Heading,
  BodyText,
  BodyTextLarge,
} from '@/components/common/Typography';
import Column from '@/components/structure/Column';
import TextLoader from '@/components/common/TextLoader';
import Box from '@/components/structure/Box';
import SliderWithLabels from '@/components/common/SliderWithLabels';
import { Button } from '@/components/ui/button';

interface ReframeConversationProps {
  originalThought?: string;
  error: string | null;
  isLoading: boolean;
  onBeliefRatingSetAction: (beliefRating: number) => void;
}

export default function ReframeConversationSummary({
  originalThought,
  error,
  isLoading,
  onBeliefRatingSetAction,
}: ReframeConversationProps) {
  const [value, setValue] = useState<number>(50);
  if (error) {
    return <BodyText>Error: {error}</BodyText>;
  }

  if (isLoading || !originalThought) {
    return <TextLoader text='Paraphrasing original thought...' />;
  }

  return (
    <Column hasLargeGap>
      <Heading className={`text-secondary`}>
        How strongly did you believe this thought?
      </Heading>
      <SliderWithLabels
        value={[value]}
        min={1}
        max={100}
        step={1}
        onValueChange={(vals: number[]) => setValue(vals[0])}
        leftLabel='Not at all'
        rightLabel='Completely'
      />
      <Box hasNoGap>
        <Heading className={`text-secondary`}>Initial thought</Heading>
        <BodyTextLarge>{originalThought}</BodyTextLarge>
      </Box>
      <Button
        variant='secondary'
        size={'lg'}
        isAlignedRight
        isLoading={isLoading}
        iconName='chevronRight'
        onClick={() => {
          onBeliefRatingSetAction(value);
        }}
      >
        Continue
      </Button>
    </Column>
  );
}
