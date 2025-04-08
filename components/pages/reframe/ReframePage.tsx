'use client';

import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AnySymptoms from '@/components/dialogue/reframe/AnySymptoms';
import WhatsYourMood from '@/components/dialogue/reframe/WhatsYourMood';
import WhatAreYouDoing from '@/components/dialogue/reframe/WhatAreYouDoing';
import ReframeConversation from '@/components/dialogue/reframe/ReframeConversation';
import ReframeConversationSummary from '@/components/dialogue/reframe/ReframeConversationSummary';
import Box from '@/components/structure/Box';
import Loading from '@/components/structure/Loading';
import ContentPageHeader from '@/components/structure/ContentPageHeader';
import { useReframeSummary } from '@/hooks/useReframeSummary';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Check In | Equilibria',
  description: 'Daily check-in to track your symptoms, mood, and activities',
};

interface ReframeSummaryResponse {
  originalThought: string;
  reframedThought: string;
  helpfulness?: string;
}

type ReframeStep = 'reframe' | 'symptoms' | 'mood' | 'activity' | 'summary';
type ReframeState = {
  wellness?: number;
  symptoms: string[];
  moods: string[];
  activities: string[];
  reframeTranscript: Array<{ role: string; content: string }>;
  summary?: ReframeSummaryResponse;
};

function ReframeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<ReframeStep>('reframe');
  const [ReframeState, setReframeState] = useState<ReframeState>({
    symptoms: [],
    moods: [],
    activities: [],
    reframeTranscript: [],
    summary: undefined,
  });

  const { summary, error, isLoading } = useReframeSummary(
    ReframeState.reframeTranscript
  );

  useEffect(() => {
    const wellnessValue = searchParams.get('wellness');
    if (wellnessValue) {
      setReframeState(prev => ({
        ...prev,
        wellness: parseInt(wellnessValue, 10),
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (summary) {
      setReframeState(prev => ({
        ...prev,
        summary: summary,
      }));
    }
  }, [summary]);

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

  const handleCompleteReframeConversation = (
    transcript: Array<{ role: string; content: string }>
  ) => {
    setReframeState(prev => ({
      ...prev,
      reframeTranscript: transcript,
    }));
    setCurrentStep('summary');
  };

  const handleHelpfulnessChange = (helpfulness: string) => {
    setReframeState(prev => ({
      ...prev,
      summary: prev.summary ? { ...prev.summary, helpfulness } : undefined,
    }));
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
      case 'reframe':
        return (
          <ReframeConversation
            onCompleteAction={handleCompleteReframeConversation}
          />
        );
      case 'summary':
        return (
          <ReframeConversationSummary
            summary={summary}
            error={error}
            isLoading={isLoading}
            onHelpfulnessChangeAction={handleHelpfulnessChange}
          />
        );
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

export default function ReframePage() {
  return (
    <Suspense fallback={<Loading />}>
      <ReframeContent />
    </Suspense>
  );
}
