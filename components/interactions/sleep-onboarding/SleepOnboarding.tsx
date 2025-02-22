'use client';

import { Questionnaire } from '@/components/dialogue/questionnaire/questionnaire';
import { onboardingConfig } from '@/config/onboarding';
import { Answer } from '@/types';
import Box from '@/components/structure/Box';

interface OnboardingProps {
  onCompleteAction: (answers: Answer[]) => void;
}

export default function Onboarding({ onCompleteAction }: OnboardingProps) {
  return (
    <Box shouldRise>
      <Questionnaire
        config={onboardingConfig}
        onCompleteAction={onCompleteAction}
      />
    </Box>
  );
}
