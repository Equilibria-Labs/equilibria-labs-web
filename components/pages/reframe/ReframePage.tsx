'use client';

import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { WorkbookEntry, ReframeHelpfulness } from '@/types/shared/workbook';
import ReframeConversation from '@/components/dialogue/reframe/ReframeConversation';
import ReframeConversationSummary from '@/components/dialogue/reframe/ReframeConversationSummary';
import CognitiveDistortions from '@/components/dialogue/reframe/CognitiveDistortions';
import Box from '@/components/structure/Box';
import Loading from '@/components/structure/Loading';
import ContentPageHeader from '@/components/structure/ContentPageHeader';
import { useReframeSummary } from '@/hooks/useReframeSummary';
import { useCognitiveDistortions } from '@/hooks/useCognitiveDistortions';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import ReframeThoughtBeliefRating from '@/components/dialogue/reframe/ReframeThoughtBeliefRating';
import { ChatTranscript } from '@/types/shared/chat-transcript';
import SaveToWorkbook from '@/components/dialogue/reframe/SaveToWorkbook';
import { AdaptiveResponse } from '@/types/shared/workbook';

export const metadata: Metadata = {
  title: 'Reframe | Equilibria',
  description: 'Reframe unhelpful thoughts and build your workbook',
};

type ReframeStep =
  | 'reframe'
  | 'thought-belief-rating'
  | 'summary'
  | 'cognitive-distortions'
  | 'save-to-workbook';

function ReframeContent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<ReframeStep>('reframe');
  const [workbookEntryState, setWorkbookEntryState] = useState<WorkbookEntry>({
    id: crypto.randomUUID(),
    title: 'Reframe Exercise',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reframeTranscript: [],
    beliefRating: { before: 50, after: 50 },
  });

  const {
    summary,
    error: summaryError,
    isLoading: summaryIsLoading,
  } = useReframeSummary(workbookEntryState.reframeTranscript || []);

  const {
    cognitiveDistortion,
    error: cognitiveDistortionError,
    isLoading: cognitiveDistortionIsLoading,
  } = useCognitiveDistortions(workbookEntryState.reframeTranscript || []);

  useEffect(() => {
    if (summary) {
      setWorkbookEntryState(prev => ({
        ...prev,
        summarisedThought: summary.originalThought,
        adaptiveResponse: summary.reframedThought,
        updatedAt: new Date().toISOString(),
      }));
    }
  }, [summary]);

  useEffect(() => {
    if (cognitiveDistortion) {
      setWorkbookEntryState(prev => ({
        ...prev,
        cognitiveDistortionId: cognitiveDistortion.id,
        updatedAt: new Date().toISOString(),
      }));
    }
  }, [cognitiveDistortion]);

  const handleCompletion = (finalState: WorkbookEntry) => {
    console.log('Final workbook entry state:', finalState);
    router.push('/?sheet=relief');
  };

  const handleCompleteReframeConversation = (transcript: ChatTranscript) => {
    setWorkbookEntryState(prev => ({
      ...prev,
      reframeTranscript: transcript,
      updatedAt: new Date().toISOString(),
    }));
    setCurrentStep('cognitive-distortions');
  };

  const handleBeliefRatingSet = (rating: number) => {
    setWorkbookEntryState(prev => ({
      ...prev,
      beliefRating: {
        before: prev.beliefRating?.before || 50,
        after: rating,
      },
      updatedAt: new Date().toISOString(),
    }));
    setCurrentStep('summary');
  };

  const handleHelpfulnessChange = (helpfulness: ReframeHelpfulness) => {
    setWorkbookEntryState(prev => ({
      ...prev,
      reframeHelpfulness: helpfulness,
      updatedAt: new Date().toISOString(),
    }));
    setCurrentStep('cognitive-distortions');
  };

  const handleAgreeDisagreeSelect = (selected: string) => {
    setWorkbookEntryState(prev => ({
      ...prev,
      cognitiveDistortionAgreedWithUser: selected === 'agree',
      updatedAt: new Date().toISOString(),
    }));
    setCurrentStep('save-to-workbook');
  };

  const handleSaveToWorkbook = () => {
    handleCompletion(workbookEntryState);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'reframe':
        return (
          <ReframeConversation
            onCompleteAction={handleCompleteReframeConversation}
          />
        );
      case 'cognitive-distortions':
        return (
          <CognitiveDistortions
            cognitiveDistortion={cognitiveDistortion?.id ?? null}
            error={cognitiveDistortionError}
            isLoading={cognitiveDistortionIsLoading}
            onAgreeDisagreeSelectAction={handleAgreeDisagreeSelect}
          />
        );
      case 'summary':
        return (
          <ReframeConversationSummary
            summary={summary}
            error={summaryError}
            isLoading={summaryIsLoading}
            onHelpfulnessChangeAction={(helpfulness: string) => {
              handleHelpfulnessChange(helpfulness as ReframeHelpfulness);
            }}
          />
        );
      case 'thought-belief-rating':
        return (
          <ReframeThoughtBeliefRating
            onBeliefRatingSetAction={handleBeliefRatingSet}
            originalThought={workbookEntryState.reframeTranscript?.[0]?.content}
            error={cognitiveDistortionError}
            isLoading={cognitiveDistortionIsLoading}
          />
        );
      case 'save-to-workbook':
        return (
          <SaveToWorkbook
            reframeData={workbookEntryState}
            onSaveAction={handleSaveToWorkbook}
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
