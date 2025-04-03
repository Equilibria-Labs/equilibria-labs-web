'use client';

import { useState } from 'react';
import {
  QuestionnaireConfig,
  ChoiceValue,
  Answer,
  QuestionStep,
} from '@/types';
import { SingleChoiceStep } from './steps/single-choice';
import { MultipleChoiceStep } from './steps/multiple-choice';
import { MessageStep } from './steps/message';
import { EducationalStep } from './steps/educational';
import WeatherHeatmapResults from './resultsSteps/weather-heatmap-results';
import { ProgressBar } from '@/components/common/ProgressBar';
import { BodyText } from '@/components/common/Typography';
import Column from '@/components/structure/Column';
import Box from '@/components/structure/Box';
import { getScoreFromAnswersWithFormula } from './helpers/getScoreFromAnswersWithFormula';
import { useAlternativeTheme } from '@/hooks/useAlternativeTheme';

interface QuestionnaireProps {
  config: QuestionnaireConfig;
  onCompleteAction: (answers: Answer[], score?: number) => void;
}

export function Questionnaire({
  config,
  onCompleteAction,
}: QuestionnaireProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const { setNextTheme } = useAlternativeTheme();

  const handleNext = () => {
    const nextStepIndex = currentStepIndex + 1;
    const allSteps = [...config.steps, ...config.resultsSteps];

    setNextTheme();

    // Move to next step if it exists
    if (nextStepIndex < allSteps.length) {
      setCurrentStepIndex(nextStepIndex);
      return;
    }

    // Call onCompleteAction when we've completed all steps including results
    const score = config.formulaString
      ? getScoreFromAnswersWithFormula(answers, config.formulaString)
      : undefined;
    onCompleteAction(answers, score);
  };

  const handleAnswer = (step: QuestionStep, answer: ChoiceValue[]) => {
    setAnswers((prev: Answer[]) => {
      const newAnswer: Answer = {
        step,
        value: answer,
      };
      return [...prev, newAnswer];
    });
  };

  const renderStep = () => {
    const allSteps = [...config.steps, ...config.resultsSteps];
    const step = allSteps[currentStepIndex];

    if (!step) return null;

    // Handle all step types in the switch statement
    switch (step.type) {
      case 'single-choice':
        return (
          <SingleChoiceStep
            step={step}
            value={
              answers.find(a => a.step.questionId === step.questionId)?.value ||
              []
            }
            onChange={value =>
              handleAnswer(step, value !== undefined ? [value] : [])
            }
            next={handleNext}
          />
        );
      case 'multiple-choice-required':
      case 'multiple-choice-optional':
        return (
          <MultipleChoiceStep
            step={step}
            initialValue={
              answers.find(a => a.step.questionId === step.questionId)?.value ||
              []
            }
            onChange={value => handleAnswer(step, value)}
            next={handleNext}
          />
        );
      case 'message':
        return <MessageStep step={step} next={handleNext} />;
      case 'educational':
        return <EducationalStep step={step} next={handleNext} />;
      case 'weather-heatmap-results':
        return (
          <WeatherHeatmapResults
            step={step}
            next={handleNext}
            answers={answers}
          />
        );
      default:
        return null;
    }
  };

  const isComplete =
    currentStepIndex >= [...config.steps, ...config.resultsSteps].length;

  return (
    <Column hasSmallGap>
      <BodyText>{config.title}</BodyText>
      {config.shouldShowProgress && !isComplete && (
        <ProgressBar
          currentStepIndex={currentStepIndex}
          totalSteps={[...config.steps, ...config.resultsSteps].length}
        />
      )}
      <Box shouldRise>{renderStep()}</Box>
    </Column>
  );
}
