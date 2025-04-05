import { openai } from '@ai-sdk/openai';
import { togetherai } from '@ai-sdk/togetherai';
import { streamText } from 'ai';
import { CRITICAL_FRIEND_INSTRUCTIONS } from '@/ai/system-instructions/critical-friend';

// Configure the AI provider here
type Provider = 'openai' | 'togetherai';
const PROVIDER: Provider = 'openai';

// Provider-specific configurations
const PROVIDER_CONFIGS = {
  openai: {
    model: 'gpt-4o',
    getModel: openai,
  },
  togetherai: {
    model: 'deepseek-ai/DeepSeek-V3',
    getModel: togetherai,
  },
} as const;

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const systemPrompt = CRITICAL_FRIEND_INSTRUCTIONS;

  const config = PROVIDER_CONFIGS[PROVIDER];
  const result = streamText({
    model: config.getModel(config.model),
    messages,
    system: systemPrompt,
  });

  return result.toDataStreamResponse();
}
