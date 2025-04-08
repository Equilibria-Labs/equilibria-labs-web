import { openai } from '@ai-sdk/openai';
import { togetherai } from '@ai-sdk/togetherai';

export type Provider = 'openai' | 'objects' | 'chat';

export const PROVIDER_CONFIGS = {
  openai: {
    model: 'gpt-4o',
    getModel: openai,
  },
  objects: {
    model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
    getModel: togetherai,
  },
  chat: {
    model: 'deepseek-ai/DeepSeek-V3',
    getModel: togetherai,
  },
} as const;
