import { Step } from '@/types';

export type SleepReportDialogueConfig = {
  steps: Step[];
};

export const sleepReportDialogueConfig: SleepReportDialogueConfig = {
  steps: [
    {
      id: '1a',
      description: 'How difficult is it for you to fall asleep?',
      type: 'single-choice',
      question: 'How difficult is it for you to fall asleep?',
      instruction: 'In the past 2 weeks',
      choices: [
        { id: 'not-at-all', text: 'Not at all difficult', value: 0 },
        { id: 'mildly-difficult', text: 'Mildly difficult', value: 1 },
        { id: 'moderately-difficult', text: 'Moderately difficult', value: 2 },
        { id: 'very-difficult', text: 'Very difficult', value: 3 },
        { id: 'extremely-difficult', text: 'Extremely difficult', value: 4 },
      ],
    },
    {
      id: 'question-2',
      type: 'single-choice',
      question: 'Rate your difficulty staying asleep in the past week',
      choices: [
        { id: 'none', text: 'None' },
        { id: 'mild', text: 'Mild' },
        { id: 'moderate', text: 'Moderate' },
        { id: 'severe', text: 'Severe' },
        { id: 'very-severe', text: 'Very Severe' },
      ],
    },
    {
      id: 'question-3',
      type: 'single-choice',
      question: 'Rate your problems with waking up too early in the past week',
      choices: [
        { id: 'none', text: 'None' },
        { id: 'mild', text: 'Mild' },
        { id: 'moderate', text: 'Moderate' },
        { id: 'severe', text: 'Severe' },
        { id: 'very-severe', text: 'Very Severe' },
      ],
    },
    {
      id: 'question-4',
      type: 'single-choice',
      question:
        'How satisfied/dissatisfied are you with your sleep pattern in the last 2 weeks?',
      choices: [
        { id: 'very-satisfied', text: 'Very Satisfied' },
        { id: 'satisfied', text: 'Satisfied' },
        { id: 'moderately-satisfied', text: 'Moderately Satisfied' },
        { id: 'dissatisfied', text: 'Dissatisfied' },
        { id: 'very-dissatisfied', text: 'Very Dissatisfied' },
      ],
    },
    {
      id: 'question-5',
      type: 'single-choice',
      question:
        'How noticeable to others do you think your sleep problem is in terms of impairing the quality of your life?',
      choices: [
        { id: 'not-at-all', text: 'Not at all Noticeable' },
        { id: 'a-little', text: 'A Little' },
        { id: 'somewhat', text: 'Somewhat' },
        { id: 'much', text: 'Much' },
        { id: 'very-much', text: 'Very Much Noticeable' },
      ],
    },
    {
      id: 'question-6',
      type: 'single-choice',
      question:
        'How worried/distressed are you about your current sleep problem?',
      choices: [
        { id: 'not-at-all', text: 'Not at all Worried' },
        { id: 'a-little', text: 'A Little' },
        { id: 'somewhat', text: 'Somewhat' },
        { id: 'much', text: 'Much' },
        { id: 'very-much', text: 'Very Much Worried' },
      ],
    },
    {
      id: 'question-7',
      type: 'single-choice',
      question:
        'To what extent do you consider your sleep problem to interfere with your daily functioning (e.g. ability to function at work) in the last 2 weeks?',
      choices: [
        { id: 'not-at-all', text: 'Not at all Interfering' },
        { id: 'a-little', text: 'A Little' },
        { id: 'somewhat', text: 'Somewhat' },
        { id: 'much', text: 'Much' },
        { id: 'very-much', text: 'Very Much Interfering' },
      ],
    },
  ],
};
