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

export interface Choice {
  choiceId: string;
  text: string;
  value?: string | number;
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

export interface ResultsStep extends BaseStep {
  type: 'results';
  title: string;
  score: number;
  issues: ResultsIssue[];
  recommendation: string;
}

export type Step =
  | MultipleChoiceStep
  | SingleChoiceStep
  | EducationalStep
  | MessageStep
  | ResultsStep;

export type QuestionnaireState = {
  currentStepIndex: number;
  answers: Record<string, string[]>;
};

export type QuestionnaireConfig = {
  dialogueId: string;
  version: string;
  steps: Step[];
  formulaString: string;
  resultsBands: {
    min: number;
    max: number;
    textTechnical: string;
    textFriendly: string;
    description: string;
  }[];
};
