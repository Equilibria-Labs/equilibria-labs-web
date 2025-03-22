export interface Card {
  id: string;
  text: string;
}

export interface CardCategory {
  id: string;
  name: string;
  cards: Card[];
}

// General Worry cards
const generalWorryCards: Card[] = [
  { id: 'gw1', text: "I don't have to believe everything I think." },
  {
    id: 'gw2',
    text: "I can't predict the future, so there is no point in guessing.",
  },
  { id: 'gw3', text: 'This feeling will pass. All feelings eventually do.' },
  {
    id: 'gw4',
    text: 'Worrying about a problem is not the same as solving it.',
  },
  { id: 'gw5', text: "I've survived all my worst days so far." },
  {
    id: 'gw6',
    text: "I can handle uncertainty. I've done it many times before.",
  },
  { id: 'gw7', text: 'My thoughts are not facts. They are just thoughts.' },
  {
    id: 'gw8',
    text: "I can focus on what I can control and let go of what I can't.",
  },
  {
    id: 'gw9',
    text: "This moment is temporary. I don't need to project it into the future.",
  },
  { id: 'gw10', text: 'I am stronger than my anxiety.' },
];

// Social Anxiety cards
const socialAnxietyCards: Card[] = [
  {
    id: 'sa1',
    text: 'People are generally focused on themselves, not on judging me.',
  },
  { id: 'sa2', text: "I don't need everyone's approval to be okay." },
  {
    id: 'sa3',
    text: 'Making mistakes in social situations is normal and human.',
  },
  {
    id: 'sa4',
    text: 'I can be anxious and still participate in social activities.',
  },
  {
    id: 'sa5',
    text: 'Most people are too busy thinking about themselves to notice my flaws.',
  },
  { id: 'sa6', text: 'I have value to offer in social situations.' },
  {
    id: 'sa7',
    text: 'Perfect social performance is not required or expected.',
  },
  {
    id: 'sa8',
    text: "I can leave a situation if I need to, but I don't have to.",
  },
  { id: 'sa9', text: "My worth is not determined by others' opinions of me." },
  { id: 'sa10', text: 'Being myself is enough.' },
];

// Perfectionism cards
const perfectionismCards: Card[] = [
  { id: 'p1', text: 'Done is better than perfect.' },
  { id: 'p2', text: 'Mistakes are how I learn and grow.' },
  { id: 'p3', text: 'I can set high standards without demanding perfection.' },
  { id: 'p4', text: 'My worth is not tied to my achievements.' },
  { id: 'p5', text: 'Progress matters more than perfection.' },
  { id: 'p6', text: 'I can be proud of my effort, not just the outcome.' },
  {
    id: 'p7',
    text: 'Perfectionism slows me down. Good enough moves me forward.',
  },
  { id: 'p8', text: "Everyone makes mistakes. It's part of being human." },
  {
    id: 'p9',
    text: 'I can learn from criticism without being devastated by it.',
  },
  { id: 'p10', text: 'I am more than my accomplishments.' },
];

// Panic cards
const panicCards: Card[] = [
  { id: 'pa1', text: 'This feeling is uncomfortable, but not dangerous.' },
  {
    id: 'pa2',
    text: "My body's alarm system is overreacting. I am actually safe.",
  },
  { id: 'pa3', text: 'Panic attacks always end. This will pass.' },
  { id: 'pa4', text: 'I can feel my anxiety without being controlled by it.' },
  { id: 'pa5', text: "I've survived panic before. I can handle this one too." },
  { id: 'pa6', text: 'My breathing can help calm my body.' },
  {
    id: 'pa7',
    text: 'These physical sensations are just adrenaline, not danger.',
  },
  { id: 'pa8', text: 'I can ride this wave of anxiety without fighting it.' },
  {
    id: 'pa9',
    text: "Panic cannot harm me. It's just an uncomfortable feeling.",
  },
  { id: 'pa10', text: "I am in control, even when I feel I'm not." },
];

// Phobias cards
const phobiasCards: Card[] = [
  {
    id: 'ph1',
    text: 'I can face my fears gradually, one small step at a time.',
  },
  { id: 'ph2', text: 'Avoidance increases fear. Facing fears reduces them.' },
  { id: 'ph3', text: 'This fear feels overwhelming, but it cannot harm me.' },
  { id: 'ph4', text: 'I can be anxious and still do difficult things.' },
  { id: 'ph5', text: 'My fear is not a reflection of actual danger.' },
  {
    id: 'ph6',
    text: "I've faced fears before and survived. I can do it again.",
  },
  { id: 'ph7', text: 'Each time I face my fear, it loses some of its power.' },
  { id: 'ph8', text: "I can tolerate discomfort. It doesn't last forever." },
  { id: 'ph9', text: "My fear doesn't define me or limit what I can do." },
  { id: 'ph10', text: 'I am building courage every time I face my fears.' },
];

// Custom cards (placeholder - users would add their own)
const customCards: Card[] = [
  {
    id: 'c1',
    text: 'I can create personalized coping statements that work for me.',
  },
  { id: 'c2', text: 'My unique challenges require unique solutions.' },
  { id: 'c3', text: 'I know myself best and can create tools that help me.' },
  { id: 'c4', text: 'I can adapt these strategies to fit my specific needs.' },
  {
    id: 'c5',
    text: 'What works for me might be different from what works for others.',
  },
  {
    id: 'c6',
    text: 'I can experiment to find what coping strategies help me most.',
  },
  { id: 'c7', text: 'My personal experiences inform my coping strategies.' },
  {
    id: 'c8',
    text: 'I can combine different techniques to create my own approach.',
  },
  { id: 'c9', text: 'My coping tools can evolve as I learn and grow.' },
  {
    id: 'c10',
    text: 'I have the power to create my own path to managing anxiety.',
  },
];

export const categories: CardCategory[] = [
  {
    id: 'general-worry',
    name: 'General Worry',
    cards: generalWorryCards,
  },
  {
    id: 'social-anxiety',
    name: 'Social Anxiety',
    cards: socialAnxietyCards,
  },
  {
    id: 'perfectionism',
    name: 'Perfectionism',
    cards: perfectionismCards,
  },
  {
    id: 'panic',
    name: 'Panic',
    cards: panicCards,
  },
  {
    id: 'phobias',
    name: 'Phobias',
    cards: phobiasCards,
  },
  {
    id: 'custom',
    name: 'Custom',
    cards: customCards,
  },
];
