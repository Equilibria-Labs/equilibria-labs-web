'use client';

import React from 'react';
import {
  Heading,
  BodyText,
  BodyTextLarge,
} from '@/components/common/Typography';
import Column from '@/components/structure/Column';
import TextLoader from '@/components/common/TextLoader';
import { ChoiceRadioGroup } from '@/components/common/ChoiceRadioGroup';
import { ChoiceValue } from '@/types';
import Box from '@/components/structure/Box';
import { ThinkingTrapId } from '@/types/thinking-trap';
import { thinkingTraps } from '@/config/thinking-traps';

interface ThinkingTrapsProps {
  thinkingTrap: ThinkingTrapId | null;
  error: string | null;
  isLoading: boolean;
  onAgreeDisagreeSelectAction: (helpfulness: string) => void;
}

export default function ThinkingTraps({
  thinkingTrap,
  error,
  isLoading,
  onAgreeDisagreeSelectAction,
}: ThinkingTrapsProps) {
  if (error) {
    return <BodyText>Error: {error}</BodyText>;
  }

  if (isLoading || !thinkingTrap) {
    return <TextLoader text='Identifying thinking traps...' />;
  }

  const getThinkingTrap = (id: ThinkingTrapId) => {
    return thinkingTraps.find(trap => trap.id === id);
  };

  const choices = [
    {
      choiceId: 'agree',
      text: 'Agree',
      value: { stringValue: 'agree' },
      iconName: 'smile' as const,
    },
    {
      choiceId: 'disagree',
      text: 'Disagree',
      value: { stringValue: 'disagree' },
      iconName: 'frown' as const,
    },
  ];

  const handleChange = (value: ChoiceValue) => {
    if (value.stringValue) {
      onAgreeDisagreeSelectAction(value.stringValue);
    }
  };

  return (
    <Column hasLargeGap>
      <Box hasNoGap>
        <Heading className={`text-secondary`}>
          {getThinkingTrap(thinkingTrap)?.name}
        </Heading>
        <BodyTextLarge>
          {getThinkingTrap(thinkingTrap)?.description}
        </BodyTextLarge>
      </Box>
      <Column>
        <Heading className={`text-secondary`}>
          Do you think you might have fallen into this thinking trap?
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
