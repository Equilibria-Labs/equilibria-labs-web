import { z } from 'zod';
import { ThinkingTrapId } from '@/types/thinking-trap';

// NOTE: This list needs to be kept in sync with the ThinkingTrapId type in @/types/thinking-trap.ts
// If you modify the list of thinking traps, update both places
export const ThinkingTrapsResponseSchema = z.enum([
  'catastrophizing',
  'fortune-telling',
  'black-and-white',
  'mind-reading',
  'over-generalizing',
  'negative-filter',
  'should-statements',
  'emotional-reasoning',
  'disqualifying-the-positive',
  'labelling',
  'personalisation',
  'blame',
] as const satisfies readonly ThinkingTrapId[]);
