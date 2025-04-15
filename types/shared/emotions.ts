export interface SpecificEmotion {
  name: string;
  displayName: string;
  description: string;
  category: Emotion;
  isNegative: boolean;
}

export interface Emotion {
  name: string;
  displayName: string;
  description: string;
  color: string;
}
