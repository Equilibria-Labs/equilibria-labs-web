'use client';

import { useState } from 'react';
import { QuestionnaireConfig, ChoiceValue, ResultsStep, Answer } from '@/types';
import { SingleChoiceStep } from './steps/single-choice';
import { MultipleChoiceStep } from './steps/multiple-choice';
import { MessageStep } from './steps/message';
import { EducationalStep } from './steps/educational';
import WeatherHeatmapResults from './resultsSteps/weather-heatmap-results';
import { ProgressBar } from '@/components/common/ProgressBar';

// Map result types to their components
const ResultsComponents = {
  'weather-heatmap-results': WeatherHeatmapResults,
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
  const [answers, setAnswers] = useState<Answer[]>([]);

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
      const newAnswer: Answer = { questionId, value: answer };
      return [...prev, newAnswer];
    });
  };

  const renderResults = (results: ResultsStep) => {
    const ResultsComponent = ResultsComponents[results.type];
    if (!ResultsComponent) {
      console.warn(`No component found for results type: ${results.type}`);
      return null;
    }
    return <ResultsComponent answers={answers} config={config} />;
  };

  const renderStep = () => {
    switch (currentStep.type) {
      case 'single-choice':
        return (
          <SingleChoiceStep
            step={currentStep}
            value={
              answers.find(a => a.questionId === currentStep.questionId)
                ?.value || []
            }
            onChange={value =>
              handleAnswer(
                currentStep.questionId,
                value !== undefined ? [value] : []
              )
            }
            next={handleNext}
          />
        );
      case 'multiple-choice-required':
      case 'multiple-choice-optional':
        return (
          <MultipleChoiceStep
            step={currentStep}
            initialValue={
              answers.find(a => a.questionId === currentStep.questionId)
                ?.value || []
            }
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
        <ProgressBar
          currentStepIndex={currentStepIndex}
          totalSteps={config.steps.length}
        />
      )}

      {isComplete && config.results
        ? renderResults(config.results)
        : renderStep()}
    </>
  );
}
