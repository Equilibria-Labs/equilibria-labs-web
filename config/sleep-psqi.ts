import { QuestionnaireConfig } from '@/types';

export const sleepPsqiConfig: QuestionnaireConfig = {
  dialogueId: 'psqi',
  title: 'Sleep Quality',
  version: '1.0',
  shouldShowProgress: true,
  resultsSteps: [
    {
      formulaString:
        'subjective-sleep-quality + min(sleep-latency-time + sleep-latency-frequency, 3) + sleep-efficiency + min(bathroom + breathing + cough-snore + too-cold + too-hot + bad-dreams + pain + other-reasons, 3) + sleep-medications + min(avg(wake-middle-night + bathroom + breathing + cough-snore + too-cold + too-hot + bad-dreams + pain + other-reasons), 3) + min(daytime-alertness + daytime-function, 3)',
      stepId: 'results',
      type: 'weather-heatmap-results',
      arrowLabel: 'You',
      arrowSubLabel: 'Past Month',
      score: 0,
      maxScore: 21,
      issues: [],
      resultsBands: [
        {
          min: 0,
          max: 5,
          textTechnical: 'Good sleep quality',
          textFriendly: 'Healthy Sleep',
          description:
            'Your sleep quality is within the normal range. Good sleep supports focus, mood, and long-term health.',
          buttonText: 'Learn more about sleep quality',
          sourceId: 'psqi',
          iconName: 'sun',
        },
        {
          min: 6,
          max: 21,
          textTechnical: 'Poor sleep quality',
          textFriendly: 'Poor Sleep Quality',
          description:
            'Your sleep quality indicates some difficulties that may be affecting your daily life. Consider consulting a healthcare provider.',
          buttonText: 'What can I do to improve?',
          sourceId: 'psqi',
          iconName: 'cloud',
        },
      ],
    },
  ],
  steps: [
    {
      stepId: 'subjective-sleep-quality',
      questionId: 'subjective-sleep-quality',
      type: 'single-choice',
      question: 'How would you rate your sleep quality overall?',
      instruction: 'During the past month',
      choices: [
        { choiceId: 'very-good', text: 'Very good', value: 0 },
        { choiceId: 'fairly-good', text: 'Fairly good', value: 1 },
        { choiceId: 'fairly-bad', text: 'Fairly bad', value: 2 },
        { choiceId: 'very-bad', text: 'Very bad', value: 3 },
      ],
    },
    {
      stepId: 'sleep-latency-time',
      questionId: 'sleep-latency-time',
      type: 'single-choice',
      question:
        'How long (in minutes) has it typically taken you to fall asleep?',
      instruction: 'During the past month',
      choices: [
        { choiceId: '0-15', text: '0-15 minutes', value: 0 },
        { choiceId: '16-30', text: '16-30 minutes', value: 1 },
        { choiceId: '31-60', text: '31-60 minutes', value: 2 },
        { choiceId: 'over-60', text: 'More than 60 minutes', value: 3 },
      ],
    },
    {
      stepId: 'sleep-latency-frequency',
      questionId: 'sleep-latency-frequency',
      type: 'single-choice',
      question: 'How often have you had trouble falling asleep?',
      instruction: 'During the past month',
      choices: [
        {
          choiceId: 'not-during-month',
          text: 'Not during the past month',
          value: 0,
        },
        { choiceId: 'less-than-once', text: 'Less than once a week', value: 1 },
        { choiceId: 'once-or-twice', text: 'Once or twice a week', value: 2 },
        {
          choiceId: 'three-or-more',
          text: 'Three or more times a week',
          value: 3,
        },
      ],
    },
    {
      stepId: 'sleep-duration',
      questionId: 'sleep-duration',
      type: 'single-choice',
      question: 'How many hours of actual sleep did you get at night?',
      instruction: 'During the past month',
      choices: [
        { choiceId: 'more-than-7', text: 'More than 7 hours', value: 0 },
        { choiceId: '6-7', text: '6-7 hours', value: 1 },
        { choiceId: '5-6', text: '5-6 hours', value: 2 },
        { choiceId: 'less-than-5', text: 'Less than 5 hours', value: 3 },
      ],
    },
    {
      stepId: 'sleep-efficiency',
      questionId: 'sleep-efficiency',
      type: 'single-choice',
      question: 'How often have you had trouble staying asleep?',
      instruction: 'During the past month',
      choices: [
        {
          choiceId: 'not-during-month',
          text: 'Not during the past month',
          value: 0,
        },
        { choiceId: 'less-than-once', text: 'Less than once a week', value: 1 },
        { choiceId: 'once-or-twice', text: 'Once or twice a week', value: 2 },
        {
          choiceId: 'three-or-more',
          text: 'Three or more times a week',
          value: 3,
        },
      ],
    },
    // Sleep Disturbances Section
    {
      stepId: 'wake-middle-night',
      questionId: 'wake-middle-night',
      type: 'single-choice',
      question:
        'How often have you had trouble waking up in the middle of the night or early morning?',
      instruction: 'During the past month',
      choices: [
        {
          choiceId: 'not-during-month',
          text: 'Not during the past month',
          value: 0,
        },
        { choiceId: 'less-than-once', text: 'Less than once a week', value: 1 },
        { choiceId: 'once-or-twice', text: 'Once or twice a week', value: 2 },
        {
          choiceId: 'three-or-more',
          text: 'Three or more times a week',
          value: 3,
        },
      ],
    },
    {
      stepId: 'bathroom',
      questionId: 'bathroom',
      type: 'single-choice',
      question: 'How often have you had to get up to use the bathroom?',
      instruction: 'During the past month',
      choices: [
        {
          choiceId: 'not-during-month',
          text: 'Not during the past month',
          value: 0,
        },
        { choiceId: 'less-than-once', text: 'Less than once a week', value: 1 },
        { choiceId: 'once-or-twice', text: 'Once or twice a week', value: 2 },
        {
          choiceId: 'three-or-more',
          text: 'Three or more times a week',
          value: 3,
        },
      ],
    },
    {
      stepId: 'breathing',
      questionId: 'breathing',
      type: 'single-choice',
      question: 'How often have you had trouble breathing?',
      instruction: 'During the past month',
      choices: [
        {
          choiceId: 'not-during-month',
          text: 'Not during the past month',
          value: 0,
        },
        { choiceId: 'less-than-once', text: 'Less than once a week', value: 1 },
        { choiceId: 'once-or-twice', text: 'Once or twice a week', value: 2 },
        {
          choiceId: 'three-or-more',
          text: 'Three or more times a week',
          value: 3,
        },
      ],
    },
    {
      stepId: 'cough-snore',
      questionId: 'cough-snore',
      type: 'single-choice',
      question: 'How often have you coughed or snored loudly?',
      instruction: 'During the past month',
      choices: [
        {
          choiceId: 'not-during-month',
          text: 'Not during the past month',
          value: 0,
        },
        { choiceId: 'less-than-once', text: 'Less than once a week', value: 1 },
        { choiceId: 'once-or-twice', text: 'Once or twice a week', value: 2 },
        {
          choiceId: 'three-or-more',
          text: 'Three or more times a week',
          value: 3,
        },
      ],
    },
    {
      stepId: 'too-cold',
      questionId: 'too-cold',
      type: 'single-choice',
      question: 'How often have you felt too cold?',
      instruction: 'During the past month',
      choices: [
        {
          choiceId: 'not-during-month',
          text: 'Not during the past month',
          value: 0,
        },
        { choiceId: 'less-than-once', text: 'Less than once a week', value: 1 },
        { choiceId: 'once-or-twice', text: 'Once or twice a week', value: 2 },
        {
          choiceId: 'three-or-more',
          text: 'Three or more times a week',
          value: 3,
        },
      ],
    },
    {
      stepId: 'too-hot',
      questionId: 'too-hot',
      type: 'single-choice',
      question: 'How often have you felt too hot?',
      instruction: 'During the past month',
      choices: [
        {
          choiceId: 'not-during-month',
          text: 'Not during the past month',
          value: 0,
        },
        { choiceId: 'less-than-once', text: 'Less than once a week', value: 1 },
        { choiceId: 'once-or-twice', text: 'Once or twice a week', value: 2 },
        {
          choiceId: 'three-or-more',
          text: 'Three or more times a week',
          value: 3,
        },
      ],
    },
    {
      stepId: 'bad-dreams',
      questionId: 'bad-dreams',
      type: 'single-choice',
      question: 'How often have you had bad dreams?',
      instruction: 'During the past month',
      choices: [
        {
          choiceId: 'not-during-month',
          text: 'Not during the past month',
          value: 0,
        },
        { choiceId: 'less-than-once', text: 'Less than once a week', value: 1 },
        { choiceId: 'once-or-twice', text: 'Once or twice a week', value: 2 },
        {
          choiceId: 'three-or-more',
          text: 'Three or more times a week',
          value: 3,
        },
      ],
    },
    {
      stepId: 'pain',
      questionId: 'pain',
      type: 'single-choice',
      question: 'How often have you had pain?',
      instruction: 'During the past month',
      choices: [
        {
          choiceId: 'not-during-month',
          text: 'Not during the past month',
          value: 0,
        },
        { choiceId: 'less-than-once', text: 'Less than once a week', value: 1 },
        { choiceId: 'once-or-twice', text: 'Once or twice a week', value: 2 },
        {
          choiceId: 'three-or-more',
          text: 'Three or more times a week',
          value: 3,
        },
      ],
    },
    {
      stepId: 'other-reasons',
      questionId: 'other-reasons',
      type: 'single-choice',
      question:
        'How often have you had other reasons that have troubled your sleep?',
      instruction: 'During the past month',
      choices: [
        {
          choiceId: 'not-during-month',
          text: 'Not during the past month',
          value: 0,
        },
        { choiceId: 'less-than-once', text: 'Less than once a week', value: 1 },
        { choiceId: 'once-or-twice', text: 'Once or twice a week', value: 2 },
        {
          choiceId: 'three-or-more',
          text: 'Three or more times a week',
          value: 3,
        },
      ],
    },
    {
      stepId: 'sleep-medications',
      questionId: 'sleep-medications',
      type: 'single-choice',
      question:
        'During the past month, how often have you taken medicine to help you sleep (prescribed or "over the counter")?',
      choices: [
        {
          choiceId: 'not-during-month',
          text: 'Not during the past month',
          value: 0,
        },
        { choiceId: 'less-than-once', text: 'Less than once a week', value: 1 },
        { choiceId: 'once-or-twice', text: 'Once or twice a week', value: 2 },
        {
          choiceId: 'three-or-more',
          text: 'Three or more times a week',
          value: 3,
        },
      ],
    },
    {
      stepId: 'daytime-alertness',
      questionId: 'daytime-alertness',
      type: 'single-choice',
      question:
        'How much of a problem has it been for you to stay awake while driving, eating meals, or engaging in social activity?',
      instruction: 'During the past month',
      choices: [
        { choiceId: 'no-problem', text: 'No problem at all', value: 0 },
        { choiceId: 'slight', text: 'Only a slight problem', value: 1 },
        { choiceId: 'moderate', text: 'Somewhat of a problem', value: 2 },
        { choiceId: 'big', text: 'A very big problem', value: 3 },
      ],
    },
    {
      stepId: 'daytime-function',
      questionId: 'daytime-function',
      type: 'single-choice',
      question:
        'How much of a problem has it been for you to keep up enthusiasm to get things done?',
      instruction: 'During the past month',
      choices: [
        { choiceId: 'no-problem', text: 'No problem at all', value: 0 },
        { choiceId: 'slight', text: 'Only a slight problem', value: 1 },
        { choiceId: 'moderate', text: 'Somewhat of a problem', value: 2 },
        { choiceId: 'big', text: 'A very big problem', value: 3 },
      ],
    },
  ],
};
