'use client';

import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { WorkbookEntry } from '@/types/shared/workbook';
import ReframeConversation from '@/components/dialogue/reframe/ReframeConversation';
// import ReframeConversationSummary from '@/components/dialogue/reframe/ReframeConversationSummary';
import CognitiveDistortions from '@/components/dialogue/reframe/CognitiveDistortions';
import Box from '@/components/structure/Box';
import Loading from '@/components/structure/Loading';
import ContentPageHeader from '@/components/structure/ContentPageHeader';
import { useReframeSummary } from '@/hooks/useReframeSummary';
import { useCognitiveDistortions } from '@/hooks/useCognitiveDistortions';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import ThoughtBeliefRating from '@/components/dialogue/reframe/ThoughtBeliefRating';
import { ChatTranscript } from '@/types/shared/chat-transcript';
import SaveToWorkbook from '@/components/dialogue/reframe/SaveToWorkbook';
import { AdaptiveResponse } from '@/types/shared/workbook';
import { ExtentRating } from '@/types/shared/workbook';

export const metadata: Metadata = {
  title: 'Reframe | Equilibria',
  description: 'Reframe unhelpful thoughts and build your workbook',
};

type ReframeStep =
  | 'reframe'
  | 'initial-thought-belief-rating'
  | 'cognitive-distortions'
  | 'reframed-thought-belief-rating'
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

  const handleSaveWorkbookEntry = (workbookEntry: WorkbookEntry) => {
    console.log('Final workbook entry state:', workbookEntry);
  };

  const handleRedirect = () => {
    router.push('/?sheet=relief');
  };

  const handleCompleteReframeConversation = (transcript: ChatTranscript) => {
    setWorkbookEntryState(prev => ({
      ...prev,
      reframeTranscript: transcript,
      updatedAt: new Date().toISOString(),
    }));
    setCurrentStep('initial-thought-belief-rating');
  };

  const handleSummarisedThoughtBeliefRatingSet = (rating: number) => {
    setWorkbookEntryState(prev => ({
      ...prev,
      summarisedThoughtBeliefRating: rating,
      updatedAt: new Date().toISOString(),
    }));
    setCurrentStep('cognitive-distortions');
  };

  const handleCognitiveDistortionExtentRating = (rating: ExtentRating) => {
    setWorkbookEntryState(prev => ({
      ...prev,
      cognitiveDistortionExtentRating: rating,
      updatedAt: new Date().toISOString(),
    }));
    setCurrentStep('reframed-thought-belief-rating');
  };

  const handleReframedThoughtBeliefRatingSet = (rating: number) => {
    setWorkbookEntryState(prev => ({
      ...prev,
      reframedThoughtBeliefRating: rating,
      updatedAt: new Date().toISOString(),
    }));
    setCurrentStep('save-to-workbook');
  };

  // const handleHelpfulnessChange = (helpfulness: ReframeHelpfulness) => {
  //   setWorkbookEntryState(prev => ({
  //     ...prev,
  //     reframeHelpfulness: helpfulness,
  //     updatedAt: new Date().toISOString(),
  //   }));
  //   setCurrentStep('save-to-workbook');
  // };

  const handleSaveToWorkbook = (shouldSave: boolean) => {
    if (shouldSave) {
      handleSaveWorkbookEntry(workbookEntryState);
    }
    handleRedirect();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'reframe':
        return (
          <ReframeConversation
            onCompleteAction={handleCompleteReframeConversation}
          />
        );
      case 'initial-thought-belief-rating':
        return (
          <ThoughtBeliefRating
            onBeliefRatingSetAction={handleSummarisedThoughtBeliefRatingSet}
            thought={workbookEntryState.summarisedThought}
            error={summaryError}
            isLoading={summaryIsLoading}
          />
        );
      case 'cognitive-distortions':
        return (
          <CognitiveDistortions
            cognitiveDistortion={cognitiveDistortion?.id ?? null}
            error={cognitiveDistortionError}
            isLoading={cognitiveDistortionIsLoading}
            onCognitiveDistortionExtentRatingAction={
              handleCognitiveDistortionExtentRating
            }
          />
        );
      case 'reframed-thought-belief-rating':
        return (
          <ThoughtBeliefRating
            onBeliefRatingSetAction={handleReframedThoughtBeliefRatingSet}
            thought={workbookEntryState.adaptiveResponse}
            error={summaryError}
            isLoading={summaryIsLoading}
            isReframed
          />
        );
      case 'save-to-workbook':
        return (
          <SaveToWorkbook
            reframeData={workbookEntryState}
            onSaveAction={shouldSave => handleSaveToWorkbook(shouldSave)}
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
