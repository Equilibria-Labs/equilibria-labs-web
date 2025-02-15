'use client';

import { useState } from 'react';
import { QuestionnaireConfig, ChoiceValue, ResultsStep, Answer } from '@/types';
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
  onCompleteAction: (answers: Answer[]) => void;
}

export function Questionnaire({
  config,
  onCompleteAction,
}: QuestionnaireProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([{}]);
  const [results, setResults] = useState<Record<string, any>>({});

  const currentStep = config.steps[currentStepIndex];

  const handleNext = () => {
    const nextStepIndex = currentStepIndex + 1;

    // Move to next step if it exists
    if (nextStepIndex < config.steps.length) {
      setCurrentStepIndex(nextStepIndex);
      return;
    }

    // Update step index when we've completed all steps
    setCurrentStepIndex(nextStepIndex);

    // Call onCompleteAction if no results
    if (!config.results) {
      onCompleteAction(answers);
    }
  };

  const handleAnswer = (questionId: string, answer: ChoiceValue[]) => {
    setAnswers((prev: Answer[]) => {
      const newAnswers = [...prev];
      newAnswers[0] = { ...newAnswers[0], [questionId]: answer };
      return newAnswers;
    });
  };

  const renderResults = (results: ResultsStep) => {
    const ResultsComponent = ResultsComponents[results.type];
    if (!ResultsComponent) {
      console.warn(`No component found for results type: ${results.type}`);
      return null;
    }
    return <ResultsComponent step={results} answers={answers[0]} />;
  };

  const renderStep = () => {
    switch (currentStep.type) {
      case 'single-choice':
        return (
          <SingleChoiceStep
            step={currentStep}
            value={answers[0][currentStep.questionId] || []}
            onChange={value => handleAnswer(currentStep.questionId, [value])}
            next={handleNext}
          />
        );
      case 'multiple-choice-required':
      case 'multiple-choice-optional':
        return (
          <MultipleChoiceStep
            step={currentStep}
            initialValue={answers[0][currentStep.questionId] || []}
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

  const isComplete = currentStepIndex >= config.steps.length;

  return (
    <>
      {config.shouldShowProgress && !isComplete && (
        <div className='mb-6 h-1 rounded-full'>
          <div
            className='h-full rounded-full transition-all duration-300'
            style={{
              width: `${((currentStepIndex + 1) / config.steps.length) * 100}%`,
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
