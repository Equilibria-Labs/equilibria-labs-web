'use client';

import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import ReframeConversation from '@/components/dialogue/reframe/ReframeConversation';
import ReframeConversationSummary from '@/components/dialogue/reframe/ReframeConversationSummary';
import ThinkingTraps from '@/components/dialogue/reframe/ThinkingTraps';
import Box from '@/components/structure/Box';
import Loading from '@/components/structure/Loading';
import ContentPageHeader from '@/components/structure/ContentPageHeader';
import { useReframeSummary } from '@/hooks/useReframeSummary';
import { useThinkingTraps } from '@/hooks/useThinkingTraps';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import ReframeThoughtBeliefRating from '@/components/dialogue/reframe/ReframeThoughtBeliefRating';

export const metadata: Metadata = {
  title: 'Check In | Equilibria',
  description: 'Daily check-in to track your symptoms, mood, and activities',
};

interface ReframeSummaryResponse {
  originalThought: string;
  reframedThought: string;
  helpfulness?: string;
}

interface ThinkingTrap {
  id: string;
  agreedWithUser?: boolean;
}

type ReframeStep =
  | 'reframe'
  | 'thought-belief-rating'
  | 'summary'
  | 'thinking-traps';

type ReframeState = {
  reframeTranscript: Array<{ role: string; content: string }>;
  summary?: ReframeSummaryResponse;
  thinkingTrap?: ThinkingTrap;
  beliefRating?: number;
};

function ReframeContent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<ReframeStep>('reframe');
  const [ReframeState, setReframeState] = useState<ReframeState>({
    reframeTranscript: [],
    summary: undefined,
    beliefRating: 50,
  });

  const {
    summary,
    error: summaryError,
    isLoading: summaryIsLoading,
  } = useReframeSummary(ReframeState.reframeTranscript);

  const {
    thinkingTrap,
    error: thinkingTrapError,
    isLoading: thinkingTrapIsLoading,
  } = useThinkingTraps(ReframeState.reframeTranscript);

  useEffect(() => {
    if (summary) {
      setReframeState(prev => ({
        ...prev,
        summary: summary,
      }));
    }
  }, [summary]);

  useEffect(() => {
    if (thinkingTrap) {
      setReframeState(prev => ({
        ...prev,
        thinkingTrap: { id: thinkingTrap.id },
      }));
    }
  }, [thinkingTrap]);

  const handleCompletion = (finalState: ReframeState) => {
    console.log('Final reframe state:', finalState);
    router.push('/?sheet=relief');
  };

  const handleCompleteReframeConversation = (
    transcript: Array<{ role: string; content: string }>
  ) => {
    setReframeState(prev => ({
      ...prev,
      reframeTranscript: transcript,
    }));
    setCurrentStep('thought-belief-rating');
  };

  const handleBeliefRatingSet = (beliefRating: number) => {
    setReframeState(prev => ({
      ...prev,
      beliefRating: beliefRating,
    }));
    setCurrentStep('summary');
  };

  const handleHelpfulnessChange = (helpfulness: string) => {
    setReframeState(prev => ({
      ...prev,
      summary: prev.summary ? { ...prev.summary, helpfulness } : undefined,
    }));
    setCurrentStep('thinking-traps');
  };

  const handleAgreeDisagreeSelect = (selected: string) => {
    setReframeState(prev => ({
      ...prev,
      thinkingTrap: prev.thinkingTrap
        ? { ...prev.thinkingTrap, agreedWithUser: selected === 'agree' }
        : undefined,
    }));
    handleCompletion(ReframeState);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'reframe':
        return (
          <ReframeConversation
            onCompleteAction={handleCompleteReframeConversation}
          />
        );
      case 'thought-belief-rating':
        return (
          <ReframeThoughtBeliefRating
            originalThought={summary?.originalThought}
            error={summaryError}
            isLoading={summaryIsLoading}
            onBeliefRatingSetAction={handleBeliefRatingSet}
          />
        );
      case 'summary':
        return (
          <ReframeConversationSummary
            summary={summary}
            error={summaryError}
            isLoading={summaryIsLoading}
            onHelpfulnessChangeAction={handleHelpfulnessChange}
          />
        );
      case 'thinking-traps':
        return (
          <ThinkingTraps
            thinkingTrap={thinkingTrap?.id ?? null}
            error={thinkingTrapError}
            isLoading={thinkingTrapIsLoading}
            onAgreeDisagreeSelectAction={handleAgreeDisagreeSelect}
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
