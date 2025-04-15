import { CognitiveDistortionId } from '@/types/shared/cognitive-distortion-id';
import { ChatTranscript } from '@/types/shared/chat-transcript';
import { Emotion, SpecificEmotion } from '@/types/shared/emotions';
export type SummarisedThought = string;

export type AdaptiveResponse = string;

// export type ReframeHelpfulness = 'helpful' | 'neutral' | 'unhelpful';

export type BeforeAfterRating = {
  before: number;
  after: number;
};

export type BeliefRating = number;

export type ExtentRating = number;

export type WorkbookEntry = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  summarisedThought?: SummarisedThought;
  summarisedThoughtBeliefRating?: BeliefRating;
  adaptiveResponse?: AdaptiveResponse;
  adaptiveResponseBeliefRating?: BeliefRating;
  // reframeHelpfulness?: ReframeHelpfulness;
  cognitiveDistortionId?: CognitiveDistortionId;
  cognitiveDistortionExtentRating?: ExtentRating;
  emotion?: Emotion;
  specificEmotion?: SpecificEmotion;
  emotionRating?: BeforeAfterRating;
  reframeTranscript?: ChatTranscript;
};
