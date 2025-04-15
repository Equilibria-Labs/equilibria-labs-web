import { CognitiveDistortion } from '@/types/shared/cognitive-distortion-id';

export interface JournalEntry {
  id: string;
  worry: string;
  distortions: CognitiveDistortion[];
  rewrite: string;
  createdAt: string;
}
