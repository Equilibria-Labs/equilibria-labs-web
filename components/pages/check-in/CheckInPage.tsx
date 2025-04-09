'use client';

import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AnySymptoms from '@/components/dialogue/check-in/AnySymptoms';
import WhatsYourMood from '@/components/dialogue/check-in/WhatsYourMood';
import WhatAreYouDoing from '@/components/dialogue/check-in/WhatAreYouDoing';
import Box from '@/components/structure/Box';
import Loading from '@/components/structure/Loading';
import ContentPageHeader from '@/components/structure/ContentPageHeader';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Check In | Equilibria',
  description: 'Daily check-in to track your symptoms, mood, and activities',
};

type ReframeStep = 'symptoms' | 'mood' | 'activity';
type ReframeState = {
  wellness?: number;
  symptoms: string[];
  moods: string[];
  activities: string[];
};

function CheckInContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<ReframeStep>('symptoms');
  const [ReframeState, setReframeState] = useState<ReframeState>({
    symptoms: [],
    moods: [],
    activities: [],
  });

  useEffect(() => {
    const wellnessValue = searchParams.get('wellness');
    if (wellnessValue) {
      setReframeState(prev => ({
        ...prev,
        wellness: parseInt(wellnessValue, 10),
      }));
    }
  }, [searchParams]);

  const handleCompletion = (finalState: ReframeState) => {
    console.log('Final reframe state:', finalState);
    router.push('/?sheet=relief');
  };

  const handleSymptomsSubmit = (symptoms: string[]) => {
    setReframeState(prev => ({ ...prev, symptoms }));
    setCurrentStep('mood');
  };

  const handleMoodSubmit = (moods: string[]) => {
    setReframeState(prev => ({ ...prev, moods }));
    setCurrentStep('activity');
  };

  const handleActivitySubmit = (activities: string[]) => {
    setReframeState(prev => ({ ...prev, activities }));
    handleCompletion(ReframeState);
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
    <>
      <ContentPageHeader isBackButtonHome={false} title='Check In' />
      <Box hasNoBg>{renderCurrentStep()}</Box>
    </>
  );
}

export default function CheckInPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CheckInContent />
    </Suspense>
  );
}
