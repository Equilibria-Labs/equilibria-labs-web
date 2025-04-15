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
import { CognitiveDistortionId } from '@/types/shared/cognitive-distortion-id';
import { cognitiveDistortions } from '@/config/cognitive-distortions';

interface CognitiveDistortionsProps {
  cognitiveDistortion: CognitiveDistortionId | null;
  error: string | null;
  isLoading: boolean;
  onAgreeDisagreeSelectAction: (selected: string) => void;
}

export default function CognitiveDistortions({
  cognitiveDistortion,
  error,
  isLoading,
  onAgreeDisagreeSelectAction,
}: CognitiveDistortionsProps) {
  if (error) {
    return <BodyText>Error: {error}</BodyText>;
  }

  if (isLoading || !cognitiveDistortion) {
    return <TextLoader text='Identifying cognitive distortions...' />;
  }

  const getCognitiveDistortion = (id: CognitiveDistortionId) => {
    return cognitiveDistortions.find(distortion => distortion.id === id);
  };

  const choices = [
    {
      choiceId: 'agree',
      text: 'Agree',
      value: { stringValue: 'agree' },
      iconName: 'check' as const,
    },
    {
      choiceId: 'disagree',
      text: 'Disagree',
      value: { stringValue: 'disagree' },
      iconName: 'x' as const,
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
          {getCognitiveDistortion(cognitiveDistortion)?.name}
        </Heading>
        <BodyTextLarge>
          {getCognitiveDistortion(cognitiveDistortion)?.description}
        </BodyTextLarge>
      </Box>
      <Column>
        <Heading className={`text-secondary`}>
          Do you think this is and example of{' '}
          {getCognitiveDistortion(cognitiveDistortion)?.name}?
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
