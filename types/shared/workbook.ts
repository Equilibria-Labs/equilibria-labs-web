import { CognitiveDistortionId } from '@/types/shared/cognitive-distortion-id';
import { ChatTranscript } from '@/types/shared/chat-transcript';
import { Emotion, SpecificEmotion } from '@/types/shared/emotions';
export type SummarisedThought = string;

export type AdaptiveResponse = string;

export type ReframeHelpfulness = 'helpful' | 'neutral' | 'unhelpful';

export type BeforeAfterRating = {
  before: number;
  after: number;
};

export type WorkbookEntry = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  summarisedThought?: SummarisedThought;
  adaptiveResponse?: AdaptiveResponse;
  reframeHelpfulness?: ReframeHelpfulness;
  cognitiveDistortionId?: CognitiveDistortionId;
  cognitiveDistortionAgreedWithUser?: boolean;
  beliefRating?: BeforeAfterRating;
  emotion?: Emotion;
  specificEmotion?: SpecificEmotion;
  emotionRating?: BeforeAfterRating;
  reframeTranscript?: ChatTranscript;
};
