import { streamText } from 'ai';
import { REFRAME_CONVERSATION_SYSTEM_PROMPT } from '@/config/ai/system-prompt/reframe/conversation';
import { Provider, PROVIDER_CONFIGS } from '@/config/ai/providers.config';

export const maxDuration = 30;

// Configure the AI provider here
const PROVIDER: Provider = 'chat';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const systemPrompt = REFRAME_CONVERSATION_SYSTEM_PROMPT;

  const config = PROVIDER_CONFIGS[PROVIDER];
  const result = streamText({
    model: config.getModel(config.model),
    messages,
    system: systemPrompt,
  });

  return result.toDataStreamResponse();
}
