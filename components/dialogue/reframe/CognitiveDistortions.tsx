'use client';

import React, { useState } from 'react';
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
import SliderWithLabels from '@/components/common/SliderWithLabels';
import { ExtentRating } from '@/types/shared/workbook';
import { Button } from '@/components/ui/button';

interface CognitiveDistortionsProps {
  cognitiveDistortion: CognitiveDistortionId | null;
  error: string | null;
  isLoading: boolean;
  onCognitiveDistortionExtentRatingAction: (rating: ExtentRating) => void;
}

export default function CognitiveDistortions({
  cognitiveDistortion,
  error,
  isLoading,
  onCognitiveDistortionExtentRatingAction,
}: CognitiveDistortionsProps) {
  const [extentRating, setExtentRating] = useState<ExtentRating>(50);

  if (error) {
    return <BodyText>Error: {error}</BodyText>;
  }

  if (isLoading || !cognitiveDistortion) {
    return <TextLoader text='Identifying cognitive distortions...' />;
  }

  const getCognitiveDistortion = (id: CognitiveDistortionId) => {
    return cognitiveDistortions.find(distortion => distortion.id === id);
  };

  // const choices = [
  //   {
  //     choiceId: 'yes',
  //     text: 'Yes',
  //     value: { stringValue: 'yes' },
  //     iconName: 'check' as const,
  //   },
  //   {
  //     choiceId: 'no',
  //     text: 'No',
  //     value: { stringValue: 'no' },
  //     iconName: 'x' as const,
  //   },
  //   {
  //     choiceId: 'dont-know',
  //     text: "Don't know",
  //     value: { stringValue: 'dont-know' },
  //     iconName: 'circleHelp' as const,
  //   },
  // ];

  return (
    <Column hasLargeGap>
      <Heading className={`text-secondary`}>
        Could this be {getCognitiveDistortion(cognitiveDistortion)?.name}?
      </Heading>
      <Box hasNoGap>
        <Heading className={`text-secondary`}>
          {getCognitiveDistortion(cognitiveDistortion)?.name}
        </Heading>
        <BodyTextLarge>
          {getCognitiveDistortion(cognitiveDistortion)?.description}
        </BodyTextLarge>
      </Box>
      {/* <ChoiceRadioGroup
        value={[]}
        onChange={handleChange}
        next={() => {}}
        choices={choices}
      /> */}
      <SliderWithLabels
        value={[extentRating]}
        min={1}
        max={100}
        step={1}
        onValueChange={(vals: number[]) => {
          const newRating = vals[0];
          setExtentRating(newRating);
        }}
        leftLabel='Not at all'
        rightLabel='Completely'
      />

      <Button
        variant='secondary'
        size={'lg'}
        isAlignedRight
        isLoading={isLoading}
        iconName='chevronRight'
        onClick={() => {
          onCognitiveDistortionExtentRatingAction(extentRating);
        }}
      >
        Continue
      </Button>
    </Column>
  );
}
