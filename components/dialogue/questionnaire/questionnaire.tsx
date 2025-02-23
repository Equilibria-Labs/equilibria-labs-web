'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { QuestionnaireConfig, ChoiceValue, Answer } from '@/types';
import { SingleChoiceStep } from './steps/single-choice';
import { MultipleChoiceStep } from './steps/multiple-choice';
import { MessageStep } from './steps/message';
import { EducationalStep } from './steps/educational';
import WeatherHeatmapResults from './resultsSteps/weather-heatmap-results';
import { ProgressBar } from '@/components/common/ProgressBar';
import { BodyText } from '@/components/common/Typography';
import Column from '@/components/structure/Column';
import Box from '@/components/structure/Box';
import { ThemeSwitcher } from '@/components/account/theme-switcher';

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
  const { setTheme } = useTheme();

  const handleNext = () => {
    const nextStepIndex = currentStepIndex + 1;
    const allSteps = [...config.steps, ...config.resultsSteps];

    // Cycle through themes based on step index
    const themeNumber = (nextStepIndex % 4) + 1; // We have theme-1 through theme-4
    setTheme(`theme-${themeNumber}`);

    // Move to next step if it exists
    if (nextStepIndex < allSteps.length) {
      setCurrentStepIndex(nextStepIndex);
      return;
    }

    // Call onCompleteAction when we've completed all steps including results
    onCompleteAction(answers);
  };

  const handleAnswer = (questionId: string, answer: ChoiceValue[]) => {
    setAnswers((prev: Answer[]) => {
      const newAnswer: Answer = { questionId, value: answer };
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
              answers.find(a => a.questionId === step.questionId)?.value || []
            }
            onChange={value =>
              handleAnswer(step.questionId, value !== undefined ? [value] : [])
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
              answers.find(a => a.questionId === step.questionId)?.value || []
            }
            onChange={value => handleAnswer(step.questionId, value)}
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
