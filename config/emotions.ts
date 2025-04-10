interface Emotion {
  name: string;
  displayName: string;
  description: string;
  category: EmotionCategory;
  isNegative: boolean;
}

interface EmotionCategory {
  name: string;
  displayName: string;
  description: string;
  color: string;
}

export const categories: { [key: string]: EmotionCategory } = {
  anxiety: {
    name: 'anxiety',
    displayName: 'Anxiety',
    description: 'Feelings of worry, nervousness, or unease about something.',
    color: '#FFD700', // Gold/yellow - represents alertness and tension
  },
  sadness: {
    name: 'sadness',
    displayName: 'Sadness',
    description: 'Feelings of sorrow, unhappiness, or emotional pain.',
    color: '#4682B4', // Steel blue - represents melancholy and depth
  },
  anger: {
    name: 'anger',
    displayName: 'Anger',
    description: 'Feelings of strong displeasure, hostility, or antagonism.',
    color: '#DC143C', // Crimson - represents intensity and heat
  },
  shame: {
    name: 'shame',
    displayName: 'Shame',
    description: 'Feelings of humiliation, guilt, or self-consciousness.',
    color: '#800080', // Purple - represents heaviness and introspection
  },
  fear: {
    name: 'fear',
    displayName: 'Fear',
    description: 'Feelings of being afraid, scared, or threatened.',
    color: '#2F4F4F', // Dark slate gray - represents uncertainty and darkness
  },
  disgust: {
    name: 'disgust',
    displayName: 'Disgust',
    description: 'Feelings of revulsion, aversion, or strong disapproval.',
    color: '#556B2F', // Dark olive green - represents nausea and distaste
  },
  positive: {
    name: 'positive',
    displayName: 'Positive',
    description: 'Feelings of happiness, contentment, or optimism.',
    color: '#32CD32', // Lime green - represents growth and vitality
  },
};

export const emotions: Emotion[] = [
  {
    name: 'anxious',
    displayName: 'Anxious',
    description: 'A general sense of unease or nervous anticipation.',
    category: categories.anxiety,
    isNegative: true,
  },
  {
    name: 'nervous',
    displayName: 'Nervous',
    description: 'Feeling jittery or unsettled, often before an event.',
    category: categories.anxiety,
    isNegative: true,
  },
  {
    name: 'worried',
    displayName: 'Worried',
    description: 'Concerned about possible negative outcomes.',
    category: categories.anxiety,
    isNegative: true,
  },
  {
    name: 'apprehensive',
    displayName: 'Apprehensive',
    description: 'Uneasy about something that might happen.',
    category: categories.anxiety,
    isNegative: true,
  },
  {
    name: 'panicked',
    displayName: 'Panicked',
    description: 'Overcome with sudden fear or anxiety.',
    category: categories.anxiety,
    isNegative: true,
  },
  {
    name: 'overwhelmed',
    displayName: 'Overwhelmed',
    description: 'Feeling mentally or emotionally overloaded.',
    category: categories.anxiety,
    isNegative: true,
  },
  {
    name: 'sad',
    displayName: 'Sad',
    description: 'A feeling of unhappiness or sorrow.',
    category: categories.sadness,
    isNegative: true,
  },
  {
    name: 'down',
    displayName: 'Down',
    description: 'Low in mood but not necessarily crying or despondent.',
    category: categories.sadness,
    isNegative: true,
  },
  {
    name: 'hopeless',
    displayName: 'Hopeless',
    description: 'Feeling that things will never improve.',
    category: categories.sadness,
    isNegative: true,
  },
  {
    name: 'discouraged',
    displayName: 'Discouraged',
    description: 'Lacking motivation due to setbacks or failures.',
    category: categories.sadness,
    isNegative: true,
  },
  {
    name: 'lonely',
    displayName: 'Lonely',
    description: 'Feeling socially isolated or emotionally disconnected.',
    category: categories.sadness,
    isNegative: true,
  },
  {
    name: 'hurt',
    displayName: 'Hurt',
    description: 'Emotionally pained due to words or actions.',
    category: categories.sadness,
    isNegative: true,
  },
  {
    name: 'angry',
    displayName: 'Angry',
    description: 'A strong feeling of displeasure or hostility.',
    category: categories.anger,
    isNegative: true,
  },
  {
    name: 'frustrated',
    displayName: 'Frustrated',
    description: 'Blocked from achieving something; annoyed.',
    category: categories.anger,
    isNegative: true,
  },
  {
    name: 'irritated',
    displayName: 'Irritated',
    description: 'Mild anger or annoyance.',
    category: categories.anger,
    isNegative: true,
  },
  {
    name: 'resentful',
    displayName: 'Resentful',
    description: 'Holding bitterness from perceived unfairness.',
    category: categories.anger,
    isNegative: true,
  },
  {
    name: 'enraged',
    displayName: 'Enraged',
    description: 'Intensely furious or incensed.',
    category: categories.anger,
    isNegative: true,
  },
  {
    name: 'betrayed',
    displayName: 'Betrayed',
    description: 'Feeling deeply hurt by broken trust.',
    category: categories.anger,
    isNegative: true,
  },
  {
    name: 'embarrassed',
    displayName: 'Embarrassed',
    description: 'Self-conscious due to a perceived mistake or exposure.',
    category: categories.shame,
    isNegative: true,
  },
  {
    name: 'ashamed',
    displayName: 'Ashamed',
    description: 'Feeling bad about oneself for something done.',
    category: categories.shame,
    isNegative: true,
  },
  {
    name: 'guilty',
    displayName: 'Guilty',
    description: 'Feeling responsible for a wrongdoing.',
    category: categories.shame,
    isNegative: true,
  },
  {
    name: 'inadequate',
    displayName: 'Inadequate',
    description: 'Feeling not good enough or lacking ability.',
    category: categories.shame,
    isNegative: true,
  },
  {
    name: 'worthless',
    displayName: 'Worthless',
    description: 'Feeling of no value or significance.',
    category: categories.shame,
    isNegative: true,
  },
  {
    name: 'afraid',
    displayName: 'Afraid',
    description: 'Fearful of a threat or danger.',
    category: categories.fear,
    isNegative: true,
  },
  {
    name: 'scared',
    displayName: 'Scared',
    description: 'Frightened or panicked by perceived danger.',
    category: categories.fear,
    isNegative: true,
  },
  {
    name: 'terrified',
    displayName: 'Terrified',
    description: 'Intense fear and alarm.',
    category: categories.fear,
    isNegative: true,
  },
  {
    name: 'insecure',
    displayName: 'Insecure',
    description: 'Lacking confidence or feeling unsafe.',
    category: categories.fear,
    isNegative: true,
  },
  {
    name: 'helpless',
    displayName: 'Helpless',
    description: 'Unable to take control or influence events.',
    category: categories.fear,
    isNegative: true,
  },
  {
    name: 'disgusted',
    displayName: 'Disgusted',
    description: 'Strong aversion or revulsion.',
    category: categories.disgust,
    isNegative: true,
  },
  {
    name: 'contemptuous',
    displayName: 'Contemptuous',
    description: 'Feeling superior and dismissive toward others.',
    category: categories.disgust,
    isNegative: true,
  },
  {
    name: 'repulsed',
    displayName: 'Repulsed',
    description: 'Driven away by something offensive or sickening.',
    category: categories.disgust,
    isNegative: true,
  },
  {
    name: 'relieved',
    displayName: 'Relieved',
    description: 'Feeling better after worry or stress subsides.',
    category: categories.positive,
    isNegative: false,
  },
  {
    name: 'hopeful',
    displayName: 'Hopeful',
    description: 'Expecting a positive outcome.',
    category: categories.positive,
    isNegative: false,
  },
  {
    name: 'content',
    displayName: 'Content',
    description: 'Peaceful satisfaction with the present.',
    category: categories.positive,
    isNegative: false,
  },
  {
    name: 'proud',
    displayName: 'Proud',
    description: 'Satisfied and dignified about accomplishments.',
    category: categories.positive,
    isNegative: false,
  },
  {
    name: 'confident',
    displayName: 'Confident',
    description: 'Feeling capable and self-assured.',
    category: categories.positive,
    isNegative: false,
  },
];
