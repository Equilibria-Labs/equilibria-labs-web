import { QuestionnaireConfig } from '@/types';

export const sleepIsiConfig: QuestionnaireConfig = {
  dialogueId: 'isi',
  title: 'Assessing your sleep issues',
  version: '1.1',
  shouldShowProgress: true,
  resultsSteps: [
    {
      formulaString:
        'fall-asleep + stay-asleep + waking-too-early + sleep-satisfaction + daily-functioning + noticeable-to-others + sleep-worry',
      stepId: 'results',
      type: 'weather-heatmap-results',
      arrowLabel: 'You',
      arrowSubLabel: 'Today',
      score: 0,
      maxScore: 28,
      issues: [],
      resultsBands: [
        {
          min: 0,
          max: 7,
          textTechnical: 'No clinically significant insomnia',
          textFriendly: 'Healthy Sleep',
          description:
            'No significant sleep issues. Good sleep supports focus, mood, and long-term health.',
          buttonText: 'Find out more about insomnia',
          sourceId: 'sit',
          iconName: 'sun',
        },
        {
          min: 8,
          max: 14,
          textTechnical: 'Sub-threshold insomnia',
          textFriendly: 'Sleep Disruption',
          description:
            'Some sleep difficulties, which can lead to fatigue and reduced focus. Long-term, this may increase stress and impact wellbeing.',
          buttonText: 'How can I improve my sleep?',
          sourceId: 'sit',
          iconName: 'cloud',
        },
        {
          min: 15,
          max: 21,
          textTechnical: 'Clinical insomnia (moderate severity)',
          textFriendly: 'Moderate Insomnia',
          description:
            'Sleep problems are affecting daily life. If persistent, this can raise risks of anxiety, low energy, and long-term health issues.',
          buttonText: 'What can I do?',
          sourceId: 'sit',
          iconName: 'rain',
        },
        {
          min: 22,
          max: 28,
          textTechnical: 'Clinical insomnia (severe)',
          textFriendly: 'Severe Insomnia',
          description:
            'Serious sleep disruption. Chronic insomnia can increase the risk of heart disease, depression, and cognitive decline.',
          buttonText: 'What should I do?',
          sourceId: 'sit',
          iconName: 'lightning',
        },
      ],
    },
    {
      formulaString:
        '(fall-asleep + stay-asleep + waking-too-early + sleep-satisfaction + daily-functioning + noticeable-to-others + sleep-worry) * 0.6',
      stepId: 'forecast',
      type: 'weather-heatmap-results',
      arrowLabel: 'You',
      arrowSubLabel: 'In 2 weeks',
      score: 0,
      maxScore: 28,
      issues: [],
      heading: 'CBT for Insomnia is clinically proven to improve sleep',
      text: 'People following this program typically see a 30% - 50% improvement in their sleep quality after 2 weeks.',
      buttonText: 'Check your sleep quality',
      resultsBands: [
        {
          min: 0,
          max: 7,
          textTechnical: 'No clinically significant insomnia',
          textFriendly: 'Healthy Sleep',
          sourceId: 'sit',
          iconName: 'sun',
        },
        {
          min: 8,
          max: 14,
          textTechnical: 'Sub-threshold insomnia',
          textFriendly: 'Sleep Disruption',
          sourceId: 'sit',
          iconName: 'cloud',
        },
        {
          min: 15,
          max: 21,
          textTechnical: 'Clinical insomnia (moderate severity)',
          textFriendly: 'Moderate Insomnia',
          sourceId: 'sit',
          iconName: 'rain',
        },
        {
          min: 22,
          max: 28,
          textTechnical: 'Clinical insomnia (severe)',
          textFriendly: 'Severe Insomnia',
          sourceId: 'sit',
          iconName: 'lightning',
        },
      ],
    },
  ],
  steps: [
    {
      stepId: 'fall-asleep',
      questionId: 'fall-asleep',
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
      stepId: 'stay-asleep',
      questionId: 'stay-asleep',
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
      stepId: 'waking-too-early',
      questionId: 'waking-too-early',
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
      stepId: 'sleep-satisfaction',
      questionId: 'sleep-satisfaction',
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
      stepId: 'daily-functioning',
      questionId: 'daily-functioning',
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
      stepId: 'noticeable-to-others',
      questionId: 'noticeable-to-others',
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
      stepId: 'sleep-worry',
      questionId: 'sleep-worry',
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
