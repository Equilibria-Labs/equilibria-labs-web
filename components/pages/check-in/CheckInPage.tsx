'use client';

import { Metadata } from 'next';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AnySymptoms from '@/components/dialogue/check-in/AnySymptoms';
import WhatsYourMood from '@/components/dialogue/check-in/WhatsYourMood';
import WhatAreYouDoing from '@/components/dialogue/check-in/WhatAreYouDoing';
import Box from '@/components/structure/Box';

export const metadata: Metadata = {
  title: 'Check In | Equilibria',
  description: 'Daily check-in to track your symptoms, mood, and activities',
};

type CheckInStep = 'symptoms' | 'mood' | 'activity';
type CheckInState = {
  wellness?: number;
  symptoms: string[];
  moods: string[];
  activities: string[];
};

function CheckInContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<CheckInStep>('symptoms');
  const [checkInState, setCheckInState] = useState<CheckInState>({
    symptoms: [],
    moods: [],
    activities: [],
  });

  useEffect(() => {
    const wellnessValue = searchParams.get('wellness');
    if (wellnessValue) {
      setCheckInState(prev => ({
        ...prev,
        wellness: parseInt(wellnessValue, 10),
      }));
    }
  }, [searchParams]);

  const handleCompletion = (finalState: CheckInState) => {
    console.log('Final check-in state:', finalState);
    router.push('/?sheet=relief');
  };

  const handleSymptomsSubmit = (symptoms: string[]) => {
    setCheckInState(prev => ({ ...prev, symptoms }));
    setCurrentStep('mood');
  };

  const handleMoodSubmit = (moods: string[]) => {
    setCheckInState(prev => ({ ...prev, moods }));
    setCurrentStep('activity');
  };

  const handleActivitySubmit = (activities: string[]) => {
    const finalState = { ...checkInState, activities };
    setCheckInState(finalState);
    handleCompletion(finalState);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'symptoms':
        return <AnySymptoms onSubmitAction={handleSymptomsSubmit} />;
      case 'mood':
        return <WhatsYourMood onSubmitAction={handleMoodSubmit} />;
      case 'activity':
        return <WhatAreYouDoing onSubmitAction={handleActivitySubmit} />;
      default:
        return null;
    }
  };

  return (
    <Box hasLargePadding shouldRise>
      {renderCurrentStep()}
    </Box>
  );
}

export default function CheckInPage() {
  return (
    <Suspense
      fallback={
        <Box hasLargePadding shouldRise>
          Loading...
        </Box>
      }
    >
      <CheckInContent />
    </Suspense>
  );
}
