import {
  CloudFog,
  Glasses,
  Waves,
  CircleDashed,
  Filter,
  Hand,
  Heart,
  PackageCheck,
  Boxes,
} from 'lucide-react';
import type { ThinkingTrap } from '@/types/thinking-trap';

export const thinkingTraps: ThinkingTrap[] = [
  {
    id: 'catastrophizing',
    name: 'Catastrophizing',
    description:
      'Imagining the worst possible thing is going to happen and that we will be unable to cope.',
    question:
      "What's the worst that could happen and how would I cope? Is this a hassle or a horror? Will this still matter in a year?",
    unbalancedExample:
      "If I mess up, I'll get fired and never find another job.",
    balancedExample: 'If I mess up, it might not be as bad as I think.',
    icon: Waves,
  },
  {
    id: 'fortune-telling',
    name: 'Fortune-Telling',
    description:
      "Believing you can predict the future and assuming it's going to be negative. But you don't actually have a crystal ball.",
    question:
      "Are you 100% sure what the future holds? What else could happen? What's most likely to happen?",
    unbalancedExample: "I'm going to make a mistake.",
    balancedExample: "It's not guaranteed that I'll make a mistake.",
    icon: CloudFog,
  },
  {
    id: 'black-and-white',
    name: 'Black and White Thinking',
    description:
      'Thinking of situations in extremes (either really good or really bad). But in reality, most things are somewhere in between (or in the "grey")',
    question:
      "What's a less extreme way of thinking about this? Does it really have to be one thing or another?",
    unbalancedExample: "I'm either going to nail the presentation or bomb it.",
    balancedExample: "I'll probably do better on some parts than on others.",
    icon: CircleDashed,
  },
  {
    id: 'mind-reading',
    name: 'Mind-Reading',
    description:
      "Believing you know exactly what others are thinking and assuming it's negative. But you can't actually read minds.",
    question:
      "Can you read minds? What evidence do you have for what they're thinking? What else might they be thinking?",
    unbalancedExample: "Everyone thinks I'm incompetent.",
    balancedExample: "I don't know for sure what others think of me.",
    icon: Glasses,
  },
  {
    id: 'over-generalizing',
    name: 'Over-Generalizing',
    description:
      'Making sweeping judgements about things based on one or two experiences, and using words like "always" or "never".',
    question:
      "Is this always true? Has there ever been a time when this wasn't the case?",
    unbalancedExample: 'I always mess up important meetings.',
    balancedExample: "I've had both good and bad meetings in the past.",
    icon: Boxes,
  },
  {
    id: 'negative-filter',
    name: 'Negative Brain Filter',
    description:
      'Only paying attention to the bad things that happen and ignoring all the good things.',
    question:
      "What positive aspects am I ignoring? What's going well that I'm not noticing?",
    unbalancedExample: 'My presentation had so many flaws.',
    balancedExample: 'There were some good parts to my presentation too.',
    icon: Filter,
  },
  {
    id: 'should-statements',
    name: 'Should Statements',
    description:
      'Telling yourself how you "should" feel or behave. However, this is not how you actually feel or behave.',
    question:
      'Is this a realistic expectation? What would be a more compassionate way to think about this?',
    unbalancedExample: 'I should never feel anxious about public speaking.',
    balancedExample: "It's normal to feel some anxiety about public speaking.",
    icon: Hand,
  },
  {
    id: 'emotional-reasoning',
    name: 'Emotional Reasoning',
    description:
      'Believing something is true based on feelings rather than facts.',
    question:
      'Just because I feel this way, does it make it true? What are the facts?',
    unbalancedExample: 'I feel like a failure, so I must be one.',
    balancedExample: "Feeling like a failure doesn't mean I am one.",
    icon: Heart,
  },
  {
    id: 'not-sure',
    name: "I'm Not Sure",
    description: 'None of the thinking traps seem to apply.',
    question: 'Take some time to reflect on your thought patterns.',
    unbalancedExample: '',
    balancedExample: '',
    icon: PackageCheck,
  },
];
