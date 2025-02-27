import { ChoiceIconName } from '@/components/common/Choice';

export interface BaseStep {
  stepId: string;
  type: string;
  title?: string;
  question?: string;
  instruction?: string;
  description?: string;
  reference?: string | null;
}

export type ChoiceValue = string | number | undefined;

export interface Choice {
  choiceId: string;
  text: string;
  value?: ChoiceValue;
  iconName?: ChoiceIconName;
}

export interface QuestionStep extends BaseStep {
  questionId: string;
  choices: Choice[];
}

export interface MultipleChoiceStep extends QuestionStep {
  type: 'multiple-choice-required' | 'multiple-choice-optional';
  minSelections?: number;
  maxSelections?: number;
}

export interface SingleChoiceStep extends QuestionStep {
  type: 'single-choice';
}

export interface EducationalStep extends BaseStep {
  type: 'educational';
  fact: string;
  explanation: string;
}

export interface MessageStep extends BaseStep {
  type: 'message';
  message: string;
  imageUrl?: string;
}

export interface ResultsIssue {
  icon: string;
  text: string;
}

export interface ResultsBand {
  min: number;
  max: number;
  textTechnical?: string;
  textFriendly?: string;
  description?: string;
  buttonText?: string;
  sourceId?: string;
  iconName?: 'sun' | 'cloud' | 'rain' | 'lightning';
}

export interface BaseResultsStep extends BaseStep {
  type: 'weather-heatmap-results';
}

export interface WeatherHeatmapResults extends BaseResultsStep {
  arrowLabel?: string;
  arrowSubLabel?: string;
  score: number;
  maxScore: number;
  issues: ResultsIssue[];
  resultsBands: ResultsBand[];
  formulaString: string;
  heading?: string;
  text?: string;
  buttonText?: string;
  buttonLink?: string;
}

export type ResultsStep = WeatherHeatmapResults;

export type Step =
  | MultipleChoiceStep
  | SingleChoiceStep
  | EducationalStep
  | MessageStep
  | ResultsStep;

export type Answer = {
  question: QuestionStep;
  value: ChoiceValue[];
};

export type QuestionnaireConfig = {
  dialogueId: string;
  title: string;
  version: string;
  shouldShowProgress: boolean;
  steps: Step[];
  resultsSteps: ResultsStep[];
};
