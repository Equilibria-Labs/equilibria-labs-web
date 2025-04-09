'use client';

import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ReframeConversation from '@/components/dialogue/reframe/ReframeConversation';
import ReframeConversationSummary from '@/components/dialogue/reframe/ReframeConversationSummary';
import ThinkingTraps from '@/components/dialogue/reframe/ThinkingTraps';
import Box from '@/components/structure/Box';
import Loading from '@/components/structure/Loading';
import ContentPageHeader from '@/components/structure/ContentPageHeader';
import { useReframeSummary } from '@/hooks/useReframeSummary';
import { useThinkingTraps } from '@/hooks/useThinkingTraps';
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

interface ThinkingTrap {
  name: string;
  description: string;
  agreedWithUser: boolean;
}

type ReframeStep = 'reframe' | 'summary' | 'thinking-traps';
type ReframeState = {
  reframeTranscript: Array<{ role: string; content: string }>;
  summary?: ReframeSummaryResponse;
  thinkingTrap?: ThinkingTrap;
};

function ReframeContent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<ReframeStep>('reframe');
  const [ReframeState, setReframeState] = useState<ReframeState>({
    reframeTranscript: [],
    summary: undefined,
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
