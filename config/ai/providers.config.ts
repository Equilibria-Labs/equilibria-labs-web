import { openai } from '@ai-sdk/openai';
import { togetherai } from '@ai-sdk/togetherai';

export type Provider = 'openai' | 'togetherai';

export const PROVIDER_CONFIGS = {
  openai: {
    model: 'gpt-4o',
    getModel: openai,
  },
  togetherai: {
    model: 'deepseek-ai/DeepSeek-V3',
    getModel: togetherai,
  },
} as const;
