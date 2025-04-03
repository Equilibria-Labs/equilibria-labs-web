import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { CRITICAL_FRIEND_INSTRUCTIONS } from '@/ai/system-instructions/critical-friend';
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Generate a follow-up question based on the user's response
  const systemPrompt = CRITICAL_FRIEND_INSTRUCTIONS;

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    system: systemPrompt,
  });

  return result.toDataStreamResponse();
}
