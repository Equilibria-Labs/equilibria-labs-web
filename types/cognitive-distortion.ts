import { CognitiveDistortionId } from '@/types/shared/cognitive-distortion-id';

export type CognitiveDistortion = {
  id: CognitiveDistortionId;
  name: string;
  description: string;
  question: string;
  unbalancedExample: string;
  balancedExample: string;
  icon: React.ComponentType<{ className?: string }>;
};
