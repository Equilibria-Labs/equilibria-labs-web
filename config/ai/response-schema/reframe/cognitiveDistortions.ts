import { z } from 'zod';
import { CognitiveDistortionId } from '@/types/shared/cognitive-distortion-id';

// NOTE: This list needs to be kept in sync with the ThinkingTrapId type in @/types/thinking-trap.ts
// If you modify the list of thinking traps, update both places
const CognitiveDistortionEnum = z.enum([
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
] as const satisfies readonly CognitiveDistortionId[]);

export const CognitiveDistortionsResponseSchema = z.object({
  id: CognitiveDistortionEnum,
});
