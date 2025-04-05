'use client';

import { Metadata } from 'next';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AnySymptoms from '@/components/dialogue/check-in/AnySymptoms';
import WhatsYourMood from '@/components/dialogue/check-in/WhatsYourMood';
import WhatAreYouDoing from '@/components/dialogue/check-in/WhatAreYouDoing';
import CriticalFriend from '@/components/dialogue/check-in/CriticalFriend';
import Box from '@/components/structure/Box';
import Loading from '@/components/structure/Loading';
import ContentPageHeader from '@/components/structure/ContentPageHeader';
export const metadata: Metadata = {
  title: 'Check In | Equilibria',
  description: 'Daily check-in to track your symptoms, mood, and activities',
};

type CheckInStep = 'critical-friend' | 'symptoms' | 'mood' | 'activity';
type CheckInState = {
  wellness?: number;
  symptoms: string[];
  moods: string[];
  activities: string[];
};

function CheckInContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] =
    useState<CheckInStep>('critical-friend');
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

  const handleCriticalFriendComplete = () => {
    setCurrentStep('symptoms');
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

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'symptoms':
        return <AnySymptoms onSubmitAction={handleSymptomsSubmit} />;
      case 'mood':
        return <WhatsYourMood onSubmitAction={handleMoodSubmit} />;
      case 'activity':
        return <WhatAreYouDoing onSubmitAction={handleActivitySubmit} />;
      case 'critical-friend':
        return <CriticalFriend onComplete={handleCriticalFriendComplete} />;
      default:
        return null;
    }
  };

  return (
    <>
      <ContentPageHeader isBackButtonHome={false} title='Clarity' />
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
