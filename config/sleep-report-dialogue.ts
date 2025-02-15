import { QuestionnaireConfig } from '@/types';

export const sleepReportDialogueConfig: QuestionnaireConfig = {
  dialogueId: 'isi',
  version: '1.1',
  shouldShowProgress: true,
  results: {
    formulaString: '1a + 1b + 1c + 2 + 3 + 4 + 5',
    stepId: 'results',
    type: 'speed-dial-results',
    title: 'Your Sleep Report',
    score: 0,
    issues: [],
    recommendation: '',
    resultsBands: [
      {
        min: 0,
        max: 7,
        textTechnical: 'No clinically significant insomnia',
        textFriendly: 'No clinically significant insomnia',
        description: 'No clinically significant insomnia',
      },
      {
        min: 8,
        max: 14,
        textTechnical: 'Subthreshold insomnia',
        textFriendly: 'Subthreshold insomnia',
        description: 'Subthreshold insomnia',
      },
      {
        min: 15,
        max: 21,
        textTechnical: 'Clinical insomnia (moderate severity)',
        textFriendly: 'Clinical insomnia (moderate severity)',
        description: 'Clinical insomnia (moderate severity)',
      },
      {
        min: 22,
        max: 28,
        textTechnical: 'Clinical insomnia (severe)',
        textFriendly: 'Clinical insomnia (severe)',
        description: 'Clinical insomnia (severe)',
      },
    ],
  },
  steps: [
    {
      stepId: 'question-1a',
      questionId: '1a',
      description: 'How difficult is it for you to fall asleep?',
      type: 'single-choice',
      question: 'How difficult is it for you to *fall asleep*?',
      instruction: 'In the past 2 weeks',
      choices: [
        { choiceId: 'not-at-all', text: 'Not at all difficult', value: 0 },
        { choiceId: 'mildly-difficult', text: 'Mildly difficult', value: 1 },
        {
          choiceId: 'moderately-difficult',
          text: 'Moderately difficult',
          value: 2,
        },
        { choiceId: 'very-difficult', text: 'Very difficult', value: 3 },
        {
          choiceId: 'extremely-difficult',
          text: 'Extremely difficult',
          value: 4,
        },
      ],
    },
    {
      stepId: 'question-1b',
      questionId: '1b',
      description: 'How difficult is it for you to stay asleep?',
      type: 'single-choice',
      question: 'How difficult is it for you to *stay asleep*?',
      instruction: 'In the past 2 weeks',
      choices: [
        { choiceId: 'not-at-all', text: 'Not at all difficult', value: 0 },
        { choiceId: 'mildly-difficult', text: 'Mildly difficult', value: 1 },
        {
          choiceId: 'moderately-difficult',
          text: 'Moderately difficult',
          value: 2,
        },
        { choiceId: 'very-difficult', text: 'Very difficult', value: 3 },
        {
          choiceId: 'extremely-difficult',
          text: 'Extremely difficult',
          value: 4,
        },
      ],
    },
    {
      stepId: 'question-1c',
      questionId: '1c',
      description: 'How severe are problems waking too early?',
      type: 'single-choice',
      question: 'How severe are problems *waking too early*?',
      instruction: 'In the past 2 weeks',
      choices: [
        { choiceId: 'none', text: 'None', value: 0 },
        { choiceId: 'mild', text: 'Mild', value: 1 },
        { choiceId: 'moderate', text: 'Moderate', value: 2 },
        { choiceId: 'severe', text: 'Severe', value: 3 },
        { choiceId: 'very-severe', text: 'Very Severe', value: 4 },
      ],
    },
    {
      stepId: 'question-2',
      questionId: '2',
      description:
        'How satisfied/dissatisfied are you with your currentsleep pattern?',
      instruction: 'In the past 2 weeks',
      type: 'single-choice',
      question:
        'How *satisfied/dissatisfied* are you with your current sleep pattern?',
      choices: [
        { choiceId: 'satisfied', text: 'Satisfied', value: 0 },
        {
          choiceId: 'moderately-satisfied',
          text: 'Moderately satisfied',
          value: 1,
        },
        { choiceId: 'neutral', text: 'Neutral', value: 2 },
        { choiceId: 'dissatisfied', text: 'Dissatisfied', value: 3 },
        { choiceId: 'very-dissatisfied', text: 'Very Dissatisfied', value: 4 },
      ],
    },
    {
      stepId: 'question-3',
      questionId: '3',
      description:
        'How much does your sleep problem interfere with your daily functioning?',
      type: 'single-choice',
      question:
        'How much does your sleep problem *interfere* with your daily functioning?',
      instruction: 'Fatigue, concentration, memory, mood, etc.',
      choices: [
        { choiceId: 'not-at-all', text: 'Not at all interfering', value: 0 },
        { choiceId: 'a-little', text: 'A little interfering', value: 1 },
        { choiceId: 'somewhat', text: 'Somewhat interfering', value: 2 },
        { choiceId: 'much', text: 'Much interfering', value: 3 },
        { choiceId: 'very-much', text: 'Very much interfering', value: 4 },
      ],
    },
    {
      stepId: 'question-4',
      questionId: '4',
      type: 'single-choice',
      question:
        'How *noticeable* to others do you think your sleep problem is?',
      instruction: 'In terms of impairing the quality of your life',
      choices: [
        {
          choiceId: 'not-at-all',
          text: 'Not at all noticeable at all',
          value: 0,
        },
        { choiceId: 'barely', text: 'Barely', value: 1 },
        { choiceId: 'somewhat', text: 'Somewhat', value: 2 },
        { choiceId: 'much', text: 'Much', value: 3 },
        { choiceId: 'very-much', text: 'Very Much Noticeable', value: 4 },
      ],
    },
    {
      stepId: 'question-5',
      questionId: '5',
      type: 'single-choice',
      question:
        'How *worried/distressed* are you about your current sleep problem?',
      choices: [
        { choiceId: 'not-at-all', text: 'Not at all Worried', value: 0 },
        { choiceId: 'a-little', text: 'A Little', value: 1 },
        { choiceId: 'somewhat', text: 'Somewhat', value: 2 },
        { choiceId: 'much', text: 'Much', value: 3 },
        { choiceId: 'very-much', text: 'Very Much Worried', value: 4 },
      ],
    },
  ],
};
