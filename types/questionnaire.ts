export interface BaseStep {
  stepId: string;
  type: string;
  title?: string;
  question?: string;
  instruction?: string;
  description?: string;
}

export interface QuestionStep extends BaseStep {
  questionId: string;
}

export type ChoiceValue = string | number | undefined;

export interface Choice {
  choiceId: string;
  text: string;
  value?: ChoiceValue;
}

export interface MultipleChoiceStep extends QuestionStep {
  type: 'multiple-choice-required' | 'multiple-choice-optional';
  choices: Choice[];
  minSelections?: number;
  maxSelections?: number;
}

export interface SingleChoiceStep extends QuestionStep {
  type: 'single-choice';
  choices: Choice[];
}

export interface EducationalStep extends BaseStep {
  type: 'educational';
  fact: string;
  explanation: string;
  reference: string;
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
  textTechnical: string;
  textFriendly: string;
  description: string;
}

export interface BaseResultsStep extends BaseStep {
  type: 'speed-dial-results' | 'results';
  title: string;
}

export interface SpeedDialResultsStep extends BaseResultsStep {
  type: 'speed-dial-results';
  score: number;
  issues: ResultsIssue[];
  recommendation: string;
  resultsBands: ResultsBand[];
  formulaString: string;
}

export type ResultsStep = SpeedDialResultsStep;

export type Step =
  | MultipleChoiceStep
  | SingleChoiceStep
  | EducationalStep
  | MessageStep
  | ResultsStep;

export type Answer = Record<string, ChoiceValue[]>;

export type QuestionnaireConfig = {
  dialogueId: string;
  version: string;
  steps: Step[];
  shouldShowProgress: boolean;
  results: SpeedDialResultsStep;
};
