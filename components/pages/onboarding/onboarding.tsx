'use client';

import { Questionnaire } from '@/components/dialogue/questionnaire/questionnaire';
import { onboardingConfig } from '@/config/onboarding';
import { Answer } from '@/types';

export default function Onboarding() {
  const handleComplete = (answers: Answer[]) => {
    console.log('Questionnaire completed:', answers);
  };

  return (
    <Questionnaire
      config={onboardingConfig}
      onCompleteAction={handleComplete}
    />
  );
}
