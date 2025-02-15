'use client';

import { useState } from 'react';
import { Questionnaire } from '@/components/dialogue/questionnaire/questionnaire';
import { onboardingConfig } from '@/config/onboarding';
import { ChoiceValue } from '@/types';

export default function Onboarding() {
  const handleComplete = (answers: Record<string, ChoiceValue[]>) => {
    console.log('Questionnaire completed:', answers);
  };

  return (
    <Questionnaire
      config={onboardingConfig}
      onCompleteAction={handleComplete}
    />
  );
}
