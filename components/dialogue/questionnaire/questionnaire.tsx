'use client';

import { useState } from 'react';
import {
  QuestionnaireState,
  QuestionnaireConfig,
  ChoiceValue,
  ResultsStep,
} from '@/types';
import { SingleChoiceStep } from './steps/single-choice';
import { MultipleChoiceStep } from './steps/multiple-choice';
import { MessageStep } from './steps/message';
import { EducationalStep } from './steps/educational';
import { SpeedDialResultsStep } from './resultsSteps/speed-dial-results';

// Map result types to their components
const ResultsComponents = {
  'speed-dial-results': SpeedDialResultsStep,
} as const;

interface QuestionnaireProps {
  config: QuestionnaireConfig;
  onCompleteAction: (answers: Record<string, ChoiceValue[]>) => void;
}

export function Questionnaire({
  config,
  onCompleteAction,
}: QuestionnaireProps) {
  const [state, setState] = useState<QuestionnaireState>({
    currentStepIndex: 0,
    answers: {},
  });

  const currentStep = config.steps[state.currentStepIndex];

  const handleNext = () => {
    const nextStepIndex = state.currentStepIndex + 1;

    // Move to next step if it exists
    if (nextStepIndex < config.steps.length) {
      setState(prev => ({
        ...prev,
        currentStepIndex: nextStepIndex,
      }));
      return;
    }

    // Always update the step index when we've completed all steps
    setState(prev => ({
      ...prev,
      currentStepIndex: nextStepIndex,
    }));

    // Call onCompleteAction if no results
    if (!config.results) {
      onCompleteAction(state.answers);
    }
  };

  const handleAnswer = (questionId: string, answer: ChoiceValue[]) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
    }));
  };

  const renderResults = (results: ResultsStep) => {
    const ResultsComponent = ResultsComponents[results.type];
    if (!ResultsComponent) {
      console.warn(`No component found for results type: ${results.type}`);
      return null;
    }
    return <ResultsComponent step={results} answers={state.answers} />;
  };

  const renderStep = () => {
    switch (currentStep.type) {
      case 'single-choice':
        return (
          <SingleChoiceStep
            step={currentStep}
            value={state.answers[currentStep.questionId] || []}
            onChange={value => handleAnswer(currentStep.questionId, [value])}
            next={handleNext}
          />
        );
      case 'multiple-choice-required':
      case 'multiple-choice-optional':
        return (
          <MultipleChoiceStep
            step={currentStep}
            initialValue={state.answers[currentStep.questionId] || []}
            onChange={value => handleAnswer(currentStep.questionId, value)}
            next={handleNext}
          />
        );
      case 'message':
        return <MessageStep step={currentStep} next={handleNext} />;
      case 'educational':
        return <EducationalStep step={currentStep} next={handleNext} />;
      default:
        return null;
    }
  };

  const isComplete = state.currentStepIndex >= config.steps.length;

  return (
    <>
      {config.shouldShowProgress && !isComplete && (
        <div className='mb-6 h-1 rounded-full'>
          <div
            className='h-full rounded-full transition-all duration-300'
            style={{
              width: `${((state.currentStepIndex + 1) / config.steps.length) * 100}%`,
            }}
          />
        </div>
      )}

      {isComplete && config.results
        ? renderResults(config.results)
        : renderStep()}
    </>
  );
}
