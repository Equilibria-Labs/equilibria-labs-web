import { generateObject } from 'ai';
import { Provider, PROVIDER_CONFIGS } from '@/config/ai/providers.config';
import { ConversationSummaryResponseSchema } from '@/config/ai/response-schema/reframe/conversationSummary';
import { REFRAME_CONVERSATION_SUMMARY_SYSTEM_PROMPT } from '@/config/ai/system-prompt/reframe/summary';

const PROVIDER: Provider = 'togetherai';

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json();

    if (!Array.isArray(transcript)) {
      throw new Error('Transcript must be an array');
    }

    const config = PROVIDER_CONFIGS[PROVIDER];
    const result = await generateObject({
      model: config.getModel(config.model),
      schema: ConversationSummaryResponseSchema,
      system: REFRAME_CONVERSATION_SUMMARY_SYSTEM_PROMPT,
      prompt: `Here is the conversation transcript to analyze:\n\n${transcript
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n')}`,
    });

    return new Response(JSON.stringify(result.object), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
