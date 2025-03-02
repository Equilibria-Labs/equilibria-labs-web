import { Dialogue, BaseStep, QuestionStep, Choice } from './shared/dialogue';
import { ChoiceIconName } from '@/components/common/Choice';

export interface UIChoice extends Choice {
  iconName?: ChoiceIconName;
}

export interface MultipleChoiceStep extends Omit<QuestionStep, 'choices'> {
  type: 'multiple-choice-required' | 'multiple-choice-optional';
  minSelections?: number;
  maxSelections?: number;
  choices: UIChoice[];
}

export interface SingleChoiceStep extends Omit<QuestionStep, 'choices'> {
  type: 'single-choice';
  choices: UIChoice[];
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
  formulaString: string;
  score: number;
  maxScore: number;
  issues: ResultsIssue[];
  resultsBands: ResultsBand[];
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

export type QuestionnaireConfig = Dialogue & {
  shouldShowProgress: boolean;
  formulaString?: string;
  steps: Step[];
  resultsSteps: ResultsStep[];
};
