import { generateObject } from 'ai';
import { Provider, PROVIDER_CONFIGS } from '@/config/ai/providers.config';
import { ConversationSummaryResponseSchema } from '@/config/ai/response-schema/reframe/conversationSummary';
import { REFRAME_CONVERSATION_SUMMARY_SYSTEM_PROMPT } from '@/config/ai/system-prompt/reframe/summary';

// Configure which AI provider to use for generating summaries
const PROVIDER: Provider = 'objects';

/**
 * POST endpoint that generates an AI summary of a conversation transcript
 * The summary follows a predefined schema (ConversationSummaryResponseSchema)
 */
export async function POST(req: Request) {
  try {
    // Extract and validate the transcript from the request body
    const { transcript } = await req.json();

    if (!Array.isArray(transcript)) {
      throw new Error('Transcript must be an array');
    }

    // Get the AI provider configuration
    const config = PROVIDER_CONFIGS[PROVIDER];
    console.log('📝 Processing summary request with:', {
      provider: PROVIDER,
      model: config.model,
      transcriptLength: transcript.length,
    });

    // Generate the summary using the AI model
    // The generateObject function ensures the response follows our schema
    const result = await generateObject({
      model: config.getModel(config.model),
      schema: ConversationSummaryResponseSchema,
      system: REFRAME_CONVERSATION_SUMMARY_SYSTEM_PROMPT,
      prompt: `Here is the conversation transcript to analyze:\n\n${transcript
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n')}`,
    });

    // Validate the AI response against our schema using Zod
    const parsedResult = ConversationSummaryResponseSchema.safeParse(
      result.object
    );

    // Handle validation failures
    if (!parsedResult.success) {
      console.error('❌ Schema validation failed:', {
        issues: parsedResult.error.issues.map(issue => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
        // Log the raw response to help debug schema mismatches
        rawResponse: JSON.stringify(result.object, null, 2),
      });
      return new Response(
        JSON.stringify({ error: 'Invalid response format' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Log successful response and return the validated data
    console.log('✅ Successfully generated summary:', {
      data: parsedResult.data,
    });

    return new Response(JSON.stringify(parsedResult.data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Handle any unexpected errors during processing
    console.error('Error in reframe summary:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error details:', {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
