'use client';

import { Questionnaire } from '@/components/dialogue/questionnaire/questionnaire';
import { onboardingConfig } from '@/config/onboarding';
import { Answer } from '@/types';
import Box from '@/components/structure/Box';

export default function Onboarding() {
  const handleComplete = (answers: Answer[]) => {
    console.log('Questionnaire completed:', answers);
  };

  return (
    <Box shouldRise>
      <Questionnaire
        config={onboardingConfig}
        onCompleteAction={handleComplete}
      />
    </Box>
  );
}
