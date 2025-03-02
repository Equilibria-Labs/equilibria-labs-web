import { QuestionnaireConfig } from '@/types';

export const onboardingConfig: QuestionnaireConfig = {
  dialogueId: 'onboarding',
  title: 'Onboarding',
  version: '1',
  shouldShowProgress: true,
  answers: [],
  status: 'not_started',
  resultsSteps: [
    {
      stepId: 'results',
      type: 'weather-heatmap-results',
      title: 'Your Sleep Quality',
      score: 38,
      maxScore: 100,
      resultsBands: [],
      formulaString: '',
      issues: [
        { icon: 'clock', text: 'You only get 6 hours of sleep per night' },
        { icon: 'moon', text: 'You often wake up in middle of the night' },
        { icon: 'calendar', text: "You've struggled with sleep for a year" },
        { icon: 'brain', text: 'Poor sleep sometimes affects your mood' },
        { icon: 'alert', text: 'Racing thoughts sometimes keep you up' },
      ],
    },
  ],
  steps: [
    {
      stepId: 'intro',
      type: 'message',
      question: 'CBT for Insomnia',
      message: 'CBT for Insomnia has a 99% success rate for most people',
      reference: null,
    },
    {
      stepId: 'sleep-goals',
      questionId: 'sleep-goals',
      type: 'multiple-choice-required',
      question: 'What are your sleep goals?',
      instruction: '(Select all that apply)',
      choices: [
        {
          choiceId: 'fall-asleep',
          value: { stringValue: 'fall-asleep' },
          text: 'Fall asleep quicker',
        },
        {
          choiceId: 'sleep-through',
          value: { stringValue: 'sleep-through' },
          text: 'Sleep through the night',
        },
        {
          choiceId: 'reduce-waking-up-early',
          value: { stringValue: 'reduce-waking-up-early' },
          text: 'Reduce waking up too early',
        },
        {
          choiceId: 'deep-sleep',
          value: { stringValue: 'deep-sleep' },
          text: 'Get more deep sleep',
        },
      ],
      minSelections: 1,
      reference: 'cbt-i',
    },
    {
      stepId: 'age-group',
      questionId: 'age-group',
      type: 'single-choice',
      question: 'What is your age group?',
      instruction: 'Sleep needs change over time.',
      choices: [
        {
          choiceId: 'under-18',
          value: { stringValue: 'under-18' },
          text: 'Under 18',
        },
        { choiceId: '18-29', value: { stringValue: '18-29' }, text: '18-29' },
        { choiceId: '30s', value: { stringValue: '30s' }, text: '30s' },
        { choiceId: '40s', value: { stringValue: '40s' }, text: '40s' },
        { choiceId: '50s', value: { stringValue: '50s' }, text: '50s' },
        { choiceId: '60s', value: { stringValue: '60s' }, text: '60s' },
        {
          choiceId: '70-plus',
          value: { stringValue: '70-plus' },
          text: '70s or over',
        },
      ],
      reference: 'cbt-i',
    },
    {
      stepId: 'wake-up-frequency',
      questionId: 'wake-up-frequency',
      type: 'single-choice',
      question: 'How often do you wake up in the middle of the night?',
      choices: [
        {
          choiceId: 'every-night',
          value: { stringValue: 'every-night' },
          text: 'Every night',
        },
        {
          choiceId: 'several-times',
          value: { stringValue: 'several-times' },
          text: 'Several times a week',
        },
        {
          choiceId: 'once-or-less',
          value: { stringValue: 'once-or-less' },
          text: 'Once a week or less',
        },
      ],
      reference: 'PSQI',
    },
    {
      stepId: 'bathroom-wakeup',
      questionId: 'bathroom-wakeup',
      type: 'single-choice',
      question: 'Do you often wake up to go to the bathroom?',
      choices: [
        {
          choiceId: 'always',
          value: { stringValue: 'always' },
          text: 'Always',
        },
        {
          choiceId: 'sometimes',
          value: { stringValue: 'sometimes' },
          text: 'Sometimes',
        },
        { choiceId: 'never', value: { stringValue: 'never' }, text: 'Never' },
      ],
      reference: 'PSQI',
    },
    {
      stepId: 'fall-back-asleep',
      questionId: 'fall-back-asleep',
      type: 'single-choice',
      question:
        'After you wake up at night, do you struggle to fall back asleep?',
      choices: [
        {
          choiceId: 'every-time',
          value: { stringValue: 'every-time' },
          text: 'Every time',
        },
        {
          choiceId: 'sometimes',
          value: { stringValue: 'sometimes' },
          text: 'Sometimes',
        },
        { choiceId: 'never', value: { stringValue: 'never' }, text: 'Never' },
      ],
      reference: 'PSQI',
    },
    {
      stepId: 'awake-in-bed',
      questionId: 'awake-in-bed',
      type: 'single-choice',
      question: 'On an average night, how long are you awake in bed?',
      instruction: 'Include the time it takes you to fall asleep',
      choices: [
        {
          choiceId: '20-min',
          value: { stringValue: '20-min' },
          text: '20 minutes or less',
        },
        {
          choiceId: '30-45-min',
          value: { stringValue: '30-45-min' },
          text: 'Between 30 - 45 mins',
        },
        {
          choiceId: '1-2-hours',
          value: { stringValue: '1-2-hours' },
          text: 'Between 1 - 2 hours',
        },
        {
          choiceId: 'over-2-hours',
          value: { stringValue: 'over-2-hours' },
          text: 'Over 2 hours',
        },
      ],
      reference: 'PSQI',
    },
    {
      stepId: 'interrupted-sleep',
      type: 'message',
      question: 'Interrupted sleep is exhausting.',
      message:
        'Our tailored approach helps you get the deep, uninterrupted sleep you deserve.',
      reference: null,
    },
    {
      stepId: 'sleep-hours',
      questionId: 'sleep-hours',
      type: 'single-choice',
      question: 'How many hours of sleep do you typically get per night?',
      instruction: 'An estimate for the last week will do!',
      choices: [
        { choiceId: '4', value: { stringValue: '4' }, text: '4 hours or less' },
        { choiceId: '5', value: { stringValue: '5' }, text: '5 hours' },
        { choiceId: '6', value: { stringValue: '6' }, text: '6 hours' },
        { choiceId: '7', value: { stringValue: '7' }, text: '7 hours' },
        { choiceId: '8', value: { stringValue: '8' }, text: '8 hours' },
        { choiceId: '9', value: { stringValue: '9' }, text: '9 hours or more' },
      ],
      reference: 'PSQI',
    },
    {
      stepId: 'sleep-myth',
      type: 'educational',
      fact: 'Sleep Myth #1: Taking a nap will help your insomnia symptoms.',
      explanation:
        "Everyone's sleep needs are different, and the quality of your sleep often matters more than the quantity. We'll help you discover what works best for you.",
      reference: '1',
    },
    {
      stepId: 'racing-thoughts',
      questionId: 'racing-thoughts',
      type: 'single-choice',
      question: 'Do racing thoughts keep you up at night?',
      choices: [
        { choiceId: 'often', value: { stringValue: 'often' }, text: 'Often' },
        {
          choiceId: 'sometimes',
          value: { stringValue: 'sometimes' },
          text: 'Sometimes',
        },
        { choiceId: 'never', value: { stringValue: 'never' }, text: 'Never' },
      ],
      reference: null,
    },
    {
      stepId: 'sleep-issues',
      questionId: 'sleep-issues',
      type: 'single-choice',
      question: 'How long have sleep issues affected you?',
      choices: [
        {
          choiceId: 'less-than-year',
          value: { stringValue: 'less-than-year' },
          text: 'Less than a year',
        },
        {
          choiceId: 'about-year',
          value: { stringValue: 'about-year' },
          text: 'About a year',
        },
        {
          choiceId: 'several-years',
          value: { stringValue: 'several-years' },
          text: 'Several years',
        },
        {
          choiceId: 'entire-life',
          value: { stringValue: 'entire-life' },
          text: 'My entire life',
        },
      ],
    },
    {
      stepId: 'sleep-solution',
      questionId: 'sleep-solution',
      type: 'multiple-choice-required',
      question: 'Why are you seeking a sleep solution?',
      instruction: 'Select all that apply:',
      choices: [
        {
          choiceId: 'health',
          value: { stringValue: 'health' },
          text: "I'm worried about my health",
        },
        {
          choiceId: 'productivity',
          value: { stringValue: 'productivity' },
          text: 'I feel unproductive / ineffective',
        },
        {
          choiceId: 'mood',
          value: { stringValue: 'mood' },
          text: 'I feel irritable and moody',
        },
        {
          choiceId: 'self',
          value: { stringValue: 'self' },
          text: "I don't feel like myself",
        },
        {
          choiceId: 'nothing-worked',
          value: { stringValue: 'nothing-worked' },
          text: 'Nothing else has worked for me',
        },
        {
          choiceId: 'none',
          value: { stringValue: 'none' },
          text: 'None of the above',
        },
      ],
      minSelections: 1,
    },
    {
      stepId: 'sleep-quality',
      questionId: 'sleep-quality',
      type: 'single-choice',
      question:
        'Over the past two weeks, how would you rate the quality of your sleep?',
      choices: [
        { choiceId: 'good', value: { stringValue: 'good' }, text: 'Good' },
        { choiceId: 'okay', value: { stringValue: 'okay' }, text: 'Okay' },
        { choiceId: 'poor', value: { stringValue: 'poor' }, text: 'Poor' },
        {
          choiceId: 'very-poor',
          value: { stringValue: 'very-poor' },
          text: 'Very Poor',
        },
        {
          choiceId: 'unsure',
          value: { stringValue: 'unsure' },
          text: 'Unsure',
        },
      ],
    },
    {
      stepId: 'sleep-experience',
      questionId: 'sleep-experience',
      type: 'multiple-choice-optional',
      question:
        "Which of these best describes what you've been experiencing recently?",
      instruction: 'Select all that apply:',
      choices: [
        {
          choiceId: 'stay-up-late',
          value: { stringValue: 'stay-up-late' },
          text: 'I often stay up too late',
        },
        {
          choiceId: 'work-stress',
          value: { stringValue: 'work-stress' },
          text: 'Work stress',
        },
        {
          choiceId: 'health-issues',
          value: { stringValue: 'health-issues' },
          text: 'Health issues, injury or disease',
        },
        {
          choiceId: 'hormonal-imbalance',
          value: { stringValue: 'hormonal-imbalance' },
          text: 'Hormonal imbalance',
        },
        {
          choiceId: 'family-stress',
          value: { stringValue: 'family-stress' },
          text: 'Family stress',
        },
        {
          choiceId: 'move-relocation',
          value: { stringValue: 'move-relocation' },
          text: 'Move or relocation',
        },
      ],
    },
    {
      stepId: 'sleep-recovery',
      type: 'educational',
      fact: 'Poor sleep can slow down recovery and weaken your immune system.',
      explanation:
        'Quality sleep releases hormones that repair your body and strengthen immune cells. Improving your sleep helps you recover faster and feel your best.',
      reference: 'Mayo Foundation for Medical Education & Research',
    },
    {
      stepId: 'sleep-routine',
      questionId: 'sleep-routine',
      type: 'single-choice',
      question: 'Do you usually go to bed at the same time?',
      choices: [
        {
          choiceId: 'most-of-time',
          value: { stringValue: 'most-of-time' },
          text: 'Most of the time',
        },
        {
          choiceId: 'sometimes',
          value: { stringValue: 'sometimes' },
          text: 'Sometimes',
        },
        { choiceId: 'never', value: { stringValue: 'never' }, text: 'Never' },
      ],
    },
    {
      stepId: 'sleep-bed',
      questionId: 'sleep-bed',
      type: 'single-choice',
      question:
        "True or false? If you have trouble falling asleep, it's best to stay in bed and wait until you get sleepy.",
      choices: [
        { choiceId: 'true', value: { stringValue: 'true' }, text: 'True' },
        { choiceId: 'false', value: { stringValue: 'false' }, text: 'False' },
      ],
    },
    {
      stepId: 'sleep-reset',
      type: 'educational',
      fact: "Staying in bed when you can't sleep often makes things worse.",
      explanation:
        'Your Sleep Reset program will teach you strategies recommended by sleep doctors to rebuild the connection between your bed and sleep.',
      reference: 'Verywell Health, 2024',
    },
    {
      stepId: 'sleep-partner',
      questionId: 'sleep-partner',
      type: 'single-choice',
      question: 'Do you share your bed with a partner?',
      choices: [
        {
          choiceId: 'always',
          value: { stringValue: 'always' },
          text: 'Always',
        },
        {
          choiceId: 'sometimes',
          value: { stringValue: 'sometimes' },
          text: 'Sometimes',
        },
        { choiceId: 'never', value: { stringValue: 'never' }, text: 'Never' },
      ],
    },
    {
      stepId: 'sleep-disruptions',
      questionId: 'sleep-disruptions',
      type: 'single-choice',
      question: 'Does noise, light, or temperature often disrupt your sleep?',
      choices: [
        {
          choiceId: 'always',
          value: { stringValue: 'always' },
          text: 'Always',
        },
        {
          choiceId: 'sometimes',
          value: { stringValue: 'sometimes' },
          text: 'Sometimes',
        },
        { choiceId: 'never', value: { stringValue: 'never' }, text: 'Never' },
      ],
    },
    {
      stepId: 'sleep-tracker',
      questionId: 'sleep-tracker',
      type: 'single-choice',
      question: 'Do you wear a smartwatch or a sleep tracker?',
      choices: [
        { choiceId: 'yes', value: { stringValue: 'yes' }, text: 'Yes' },
        { choiceId: 'no', value: { stringValue: 'no' }, text: 'No' },
      ],
    },
    {
      stepId: 'sleep-data',
      type: 'educational',
      fact: 'We make it simple by connecting with your sleep tracker to guide your progress and create personalized solutions.',
      explanation:
        'Your sleep data helps us tailor our recommendations and track your improvement over time.',
      reference: '',
    },
    {
      stepId: 'sleep-understand',
      questionId: 'sleep-understand',
      type: 'single-choice',
      question:
        'Do you want to understand the root causes of your sleep issues?',
      choices: [
        { choiceId: 'yes', value: { stringValue: 'yes' }, text: 'Yes' },
        { choiceId: 'no', value: { stringValue: 'no' }, text: 'No' },
      ],
    },
    {
      stepId: 'sleep-feel',
      questionId: 'sleep-feel',
      type: 'single-choice',
      question:
        "Do you find it difficult to get through the day after a poor night's sleep?",
      choices: [
        { choiceId: 'often', value: { stringValue: 'often' }, text: 'Often' },
        {
          choiceId: 'sometimes',
          value: { stringValue: 'sometimes' },
          text: 'Sometimes',
        },
        { choiceId: 'never', value: { stringValue: 'never' }, text: 'Never' },
      ],
    },
    {
      stepId: 'sleep-affects',
      questionId: 'sleep-affects',
      type: 'multiple-choice-required',
      question: 'Which parts of your life are most affected by poor sleep?',
      instruction: 'Select all that apply:',
      choices: [
        {
          choiceId: 'relationships',
          value: { stringValue: 'relationships' },
          text: 'Relationships with family and friends',
        },
        {
          choiceId: 'work',
          value: { stringValue: 'work' },
          text: 'Work and career',
        },
        {
          choiceId: 'health',
          value: { stringValue: 'health' },
          text: 'Health, fitness and diet',
        },
        {
          choiceId: 'hobbies',
          value: { stringValue: 'hobbies' },
          text: 'Hobbies and activities',
        },
        { choiceId: 'other', value: { stringValue: 'other' }, text: 'Other' },
      ],
      minSelections: 1,
    },
    {
      stepId: 'sleep-impatience',
      questionId: 'sleep-impatience',
      type: 'single-choice',
      question:
        'Does poor sleep ever cause you to feel impatient, cranky, or unfriendly toward people you care about?',
      choices: [
        { choiceId: 'often', value: { stringValue: 'often' }, text: 'Often' },
        {
          choiceId: 'sometimes',
          value: { stringValue: 'sometimes' },
          text: 'Sometimes',
        },
        { choiceId: 'never', value: { stringValue: 'never' }, text: 'Never' },
      ],
    },
    {
      stepId: 'sleep-care',
      type: 'educational',
      fact: 'Caring for your sleep means caring for your loved ones.',
      explanation:
        'Over 50% of adults report snapping at loved ones after poor sleep. Your personalized program will help improve both your sleep and your mood.',
      reference: 'American Psychological Society - Stress & Sleep',
    },
    {
      stepId: 'sleep-alzheimer',
      questionId: 'sleep-alzheimer',
      type: 'single-choice',
      question:
        "Is there a history of Alzheimer's or Parkinson's in your family?",
      instruction: 'Sleep issues can increase health risks.',
      choices: [
        { choiceId: 'yes', value: { stringValue: 'yes' }, text: 'Yes' },
        { choiceId: 'no', value: { stringValue: 'no' }, text: 'No' },
        {
          choiceId: 'unsure',
          value: { stringValue: 'unsure' },
          text: 'Unsure',
        },
      ],
    },
    {
      stepId: 'sleep-apnea',
      questionId: 'sleep-apnea',
      type: 'single-choice',
      question:
        'Have you been previously diagnosed with or treated for sleep apnea?',
      choices: [
        { choiceId: 'yes', value: { stringValue: 'yes' }, text: 'Yes' },
        { choiceId: 'no', value: { stringValue: 'no' }, text: 'No' },
        {
          choiceId: 'unsure',
          value: { stringValue: 'unsure' },
          text: 'Unsure',
        },
      ],
    },
    {
      stepId: 'sleep-anxiety',
      questionId: 'sleep-anxiety',
      type: 'single-choice',
      question: 'Do you ever feel stressed at the thought of going to bed?',
      instruction: 'Long-term sleep issues can lead to sleep anxiety.',
      choices: [
        { choiceId: 'often', value: { stringValue: 'often' }, text: 'Often' },
        {
          choiceId: 'sometimes',
          value: { stringValue: 'sometimes' },
          text: 'Sometimes',
        },
        { choiceId: 'never', value: { stringValue: 'never' }, text: 'Never' },
      ],
    },
    {
      stepId: 'sleep-statement',
      questionId: 'sleep-statement',
      type: 'single-choice',
      question:
        '"I want to improve my sleep, but nothing I\'ve tried has worked in a lasting way."',
      instruction: 'Do you relate to the statement above?',
      choices: [
        { choiceId: 'yes', value: { stringValue: 'yes' }, text: 'Yes' },
        { choiceId: 'no', value: { stringValue: 'no' }, text: 'No' },
      ],
    },
    {
      stepId: 'sleep-tried',
      questionId: 'sleep-tried',
      type: 'multiple-choice-required',
      question: 'What have you tried to improve your sleep?',
      instruction: 'Select all that apply:',
      choices: [
        {
          choiceId: 'caffeine',
          value: { stringValue: 'caffeine' },
          text: 'Cutting caffeine',
        },
        {
          choiceId: 'meditation',
          value: { stringValue: 'meditation' },
          text: 'Meditation / Yoga',
        },
        {
          choiceId: 'screen-time',
          value: { stringValue: 'screen-time' },
          text: 'Reducing screen time',
        },
        {
          choiceId: 'supplements',
          value: { stringValue: 'supplements' },
          text: 'Supplements (CBD, magnesium)',
        },
        {
          choiceId: 'diet',
          value: { stringValue: 'diet' },
          text: 'Eating or drinking less at night',
        },
        { choiceId: 'other', value: { stringValue: 'other' }, text: 'Other' },
      ],
      minSelections: 1,
    },
    {
      stepId: 'sleep-reset-different',
      type: 'educational',
      fact: 'Sleep Reset is different.',
      explanation:
        'We create a personalized, structured plan tailored to your unique sleep challenges, using proven techniques from top sleep clinics like Stanford and Mayo Clinic.',
      reference: 'Stanford MEDICINE, MAYO CLINIC, HARVARD MEDICAL SCHOOL, NIH',
    },
    {
      stepId: 'sleep-cbti',
      questionId: 'sleep-cbti',
      type: 'single-choice',
      question: 'How familiar are you with CBT-I?',
      instruction:
        'Sleep Reset uses Cognitive Behavioral Therapy for Insomnia (CBT-I), a top recommendation from doctors.',
      choices: [
        {
          choiceId: 'done-before',
          value: { stringValue: "I've done CBTI before" },
          text: "I've done CBTI before",
        },
        {
          choiceId: 'heard-of',
          value: { stringValue: 'heard-of' },
          text: 'Heard of it but never tried it',
        },
        {
          choiceId: 'never-heard',
          value: { stringValue: 'never-heard' },
          text: 'Never heard of it',
        },
      ],
    },
    {
      stepId: 'sleep-recovery-recommend',
      questionId: 'sleep-recovery-recommend',
      type: 'single-choice',
      question:
        "After a poor night's sleep, which of these do sleep experts recommend?",
      choices: [
        {
          choiceId: 'sleep-in',
          value: { stringValue: 'sleep-in' },
          text: 'Sleep in to make up for lost sleep',
        },
        {
          choiceId: 'earlier-bedtime',
          value: { stringValue: 'earlier-bedtime' },
          text: 'Go to bed earlier the next night',
        },
        {
          choiceId: 'nap',
          value: { stringValue: 'nap' },
          text: 'Take a nap to make up for lost sleep',
        },
        {
          choiceId: 'none',
          value: { stringValue: 'none' },
          text: 'None of the above',
        },
      ],
    },
    {
      stepId: 'sleep-deep',
      questionId: 'sleep-deep',
      type: 'single-choice',
      question: "What's the most effective way to get deeper sleep?",
      choices: [
        {
          choiceId: 'longer-bed',
          value: { stringValue: 'longer-bed' },
          text: 'Stay in bed longer',
        },
        {
          choiceId: 'melatonin',
          value: { stringValue: 'melatonin' },
          text: 'Use melatonin',
        },
        {
          choiceId: 'adjust-schedule',
          value: { stringValue: 'adjust-schedule' },
          text: 'Adjust your sleep schedule',
        },
        {
          choiceId: 'all',
          value: { stringValue: 'all' },
          text: 'All of the above',
        },
      ],
    },
    {
      stepId: 'sleep-personalized',
      questionId: 'sleep-personalized',
      type: 'multiple-choice-required',
      question:
        'What are you most excited about with your personalized program?',
      instruction: 'Select all that apply:',
      choices: [
        {
          choiceId: 'uncover-causes',
          value: { stringValue: 'uncover-causes' },
          text: 'Uncover causes of my sleep issues',
        },
        {
          choiceId: 'learn-ways',
          value: { stringValue: 'learn-ways' },
          text: 'Learn proven ways to improve sleep',
        },
        {
          choiceId: 'break-habits',
          value: { stringValue: 'break-habits' },
          text: 'Break habits that hurt sleep quality',
        },
        {
          choiceId: 'build-habits',
          value: { stringValue: 'build-habits' },
          text: 'Build positive sleep habits',
        },
        {
          choiceId: 'track-patterns',
          value: { stringValue: 'track-patterns' },
          text: 'Track my sleep patterns',
        },
        {
          choiceId: 'use-tools',
          value: { stringValue: 'use-tools' },
          text: 'Use proven tools to reset my sleep',
        },
        {
          choiceId: 'none',
          value: { stringValue: 'none' },
          text: 'None of the above',
        },
      ],
      minSelections: 1,
    },
    {
      stepId: 'sleep-ready',
      questionId: 'sleep-ready',
      type: 'single-choice',
      question: 'How ready do you feel to start improving your sleep?',
      choices: [
        {
          choiceId: 'ready',
          value: { stringValue: 'ready' },
          text: "I'm ready",
        },
        {
          choiceId: 'somewhat',
          value: { stringValue: 'somewhat' },
          text: 'Somewhat ready',
        },
        {
          choiceId: 'not-ready',
          value: { stringValue: 'not-ready' },
          text: 'Not ready at all',
        },
        {
          choiceId: 'unsure',
          value: { stringValue: 'unsure' },
          text: 'Unsure',
        },
      ],
    },
    {
      stepId: 'sleep-reference',
      questionId: 'sleep-reference',
      type: 'single-choice',
      question: 'Where did you first hear about Sleep Reset?',
      choices: [
        {
          choiceId: 'healthcare',
          value: { stringValue: 'healthcare' },
          text: 'Healthcare professional',
        },
        {
          choiceId: 'news',
          value: { stringValue: 'news' },
          text: 'News, blog or article',
        },
        {
          choiceId: 'google',
          value: { stringValue: 'google' },
          text: 'Google',
        },
        {
          choiceId: 'social-media',
          value: { stringValue: 'social-media' },
          text: 'Social media',
        },
        {
          choiceId: 'podcast',
          value: { stringValue: 'podcast' },
          text: 'Podcast',
        },
        {
          choiceId: 'friend-family',
          value: { stringValue: 'friend-family' },
          text: 'Friend or family member',
        },
        {
          choiceId: 'app-store',
          value: { stringValue: 'app-store' },
          text: 'App Store',
        },
        { choiceId: 'other', value: { stringValue: 'other' }, text: 'Other' },
      ],
    },
    {
      stepId: 'sleep-diagnosed',
      questionId: 'sleep-diagnosed',
      type: 'single-choice',
      question: 'Have you ever been diagnosed or treated for insomnia?',
      choices: [
        { choiceId: 'yes', value: { stringValue: 'yes' }, text: 'Yes' },
        { choiceId: 'no', value: { stringValue: 'no' }, text: 'No' },
        {
          choiceId: 'not-sure',
          value: { stringValue: 'not-sure' },
          text: 'Not Sure',
        },
      ],
    },
    {
      stepId: 'sleep-routine-evening',
      questionId: 'sleep-routine-evening',
      type: 'single-choice',
      question: 'Do you have a nightly routine to wind down in the evenings?',
      choices: [
        { choiceId: 'yes', value: { stringValue: 'yes' }, text: 'Yes' },
        { choiceId: 'no', value: { stringValue: 'no' }, text: 'No' },
        {
          choiceId: 'unsure',
          value: { stringValue: 'unsure' },
          text: 'Unsure',
        },
      ],
    },
    {
      stepId: 'sleep-profile',
      type: 'message',
      question:
        'Create your profile to get started on your journey to better sleep',
      message:
        'Sleep Reset ensures the confidentiality of your personal information. By clicking "Continue" you agree to receive emails from Sleep Reset and accept our Terms & Privacy Policy.',
    },
  ],
};
