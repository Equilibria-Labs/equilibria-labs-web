import { Step } from '@/types';

export type SleepReportDialogueConfig = {
  steps: Step[];
};

export const sleepReportDialogueConfig: SleepReportDialogueConfig = {
  steps: [
    {
      id: 'question-1a',
      description: 'How difficult is it for you to fall asleep?',
      type: 'single-choice',
      question: 'How difficult is it for you to *fall asleep*?',
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
      id: 'question-1b',
      description: 'How difficult is it for you to stay asleep?',
      type: 'single-choice',
      question: 'How difficult is it for you to *stay asleep*?',
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
      id: 'question-1c',
      description: 'How severe are problems waking too early?',
      type: 'single-choice',
      question: 'How severe are problems *waking too early*?',
      instruction: 'In the past 2 weeks',
      choices: [
        { id: 'none', text: 'None', value: 0 },
        { id: 'mild', text: 'Mild', value: 1 },
        { id: 'moderate', text: 'Moderate', value: 2 },
        { id: 'severe', text: 'Severe', value: 3 },
        { id: 'very-severe', text: 'Very Severe', value: 4 },
      ],
    },
    {
      id: 'question-2',
      description:
        'How satisfied/dissatisfied are you with your currentsleep pattern?',
      instruction: 'In the past 2 weeks',
      type: 'single-choice',
      question:
        'How *satisfied/dissatisfied* are you with your current sleep pattern?',
      choices: [
        { id: 'satisfied', text: 'Satisfied', value: 0 },
        { id: 'moderately-satisfied', text: 'Moderately satisfied', value: 1 },
        { id: 'neutral', text: 'Neutral', value: 2 },
        { id: 'dissatisfied', text: 'Dissatisfied', value: 3 },
        { id: 'very-dissatisfied', text: 'Very Dissatisfied', value: 4 },
      ],
    },
    {
      id: 'question-3',
      description:
        'How much does your sleep problem interfere with your daily functioning?',
      type: 'single-choice',
      question:
        'How much does your sleep problem *interfere* with your daily functioning?',
      instruction: 'Fatigue, concentration, memory, mood, etc.',
      choices: [
        { id: 'not-at-all', text: 'Not at all interfering', value: 0 },
        { id: 'a-little', text: 'A little interfering', value: 1 },
        { id: 'somewhat', text: 'Somewhat interfering', value: 2 },
        { id: 'much', text: 'Much interfering', value: 3 },
        { id: 'very-much', text: 'Very much interfering', value: 4 },
      ],
    },
    {
      id: 'question-4',
      type: 'single-choice',
      question:
        'How *noticeable* to others do you think your sleep problem is?',
      instruction: 'In terms of impairing the quality of your life',
      choices: [
        { id: 'not-at-all', text: 'Not at all noticeable at all' },
        { id: 'barely', text: 'Barely' },
        { id: 'somewhat', text: 'Somewhat' },
        { id: 'much', text: 'Much' },
        { id: 'very-much', text: 'Very Much Noticeable' },
      ],
    },
    {
      id: 'question-5',
      type: 'single-choice',
      question:
        'How *worried/distressed* are you about your current sleep problem?',
      choices: [
        { id: 'not-at-all', text: 'Not at all Worried' },
        { id: 'a-little', text: 'A Little' },
        { id: 'somewhat', text: 'Somewhat' },
        { id: 'much', text: 'Much' },
        { id: 'very-much', text: 'Very Much Worried' },
      ],
    },
  ],
};
