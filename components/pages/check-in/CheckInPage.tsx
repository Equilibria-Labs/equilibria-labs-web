'use client';

import { Metadata } from 'next';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AnySymptoms from '@/components/dialogue/check-in/AnySymptoms';
import WhatsYourMood from '@/components/dialogue/check-in/WhatsYourMood';
import WhatAreYouDoing from '@/components/dialogue/check-in/WhatAreYouDoing';
import ReframeConversation from '@/components/dialogue/check-in/ReframeConversation';
import Box from '@/components/structure/Box';
import Loading from '@/components/structure/Loading';
import ContentPageHeader from '@/components/structure/ContentPageHeader';
export const metadata: Metadata = {
  title: 'Check In | Equilibria',
  description: 'Daily check-in to track your symptoms, mood, and activities',
};

type CheckInStep = 'reframe' | 'symptoms' | 'mood' | 'activity';
type CheckInState = {
  wellness?: number;
  symptoms: string[];
  moods: string[];
  activities: string[];
};

function CheckInContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<CheckInStep>('reframe');
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
    setCheckInState(prev => ({ ...prev, activities }));
    handleCompletion(checkInState);
  };

  const handleCompleteAction = (
    transcript: Array<{ role: string; content: string }>
  ) => {
    console.log('Transcript:', transcript);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'symptoms':
        return <AnySymptoms onSubmitAction={handleSymptomsSubmit} />;
      case 'mood':
        return <WhatsYourMood onSubmitAction={handleMoodSubmit} />;
      case 'activity':
        return <WhatAreYouDoing onSubmitAction={handleActivitySubmit} />;
      case 'reframe':
        return <ReframeConversation onCompleteAction={handleCompleteAction} />;
      default:
        return null;
    }
  };

  return (
    <>
      <ContentPageHeader isBackButtonHome={false} title='Reframe' />
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
