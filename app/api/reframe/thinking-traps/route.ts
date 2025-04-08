import { generateObject } from 'ai';
import { Provider, PROVIDER_CONFIGS } from '@/config/ai/providers.config';
import { ThinkingTrapsResponseSchema } from '@/config/ai/response-schema/reframe/thinkingTraps';
import { THINKING_TRAPS_ANALYSIS_SYSTEM_PROMPT } from '@/config/ai/system-prompt/reframe/thinkingTraps';

// Configure which AI provider to use for generating thinking trap analysis
const PROVIDER: Provider = 'objects';

/**
 * POST endpoint that analyzes a conversation transcript to identify thinking traps
 * The response follows a predefined schema (ThinkingTrapsResponseSchema)
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
    console.log('📝 Processing thinking traps request with:', {
      provider: PROVIDER,
      model: config.model,
      transcriptLength: transcript.length,
    });

    // Generate the thinking trap analysis using the AI model
    // The generateObject function ensures the response follows our schema
    const result = await generateObject({
      model: config.getModel(config.model),
      schema: ThinkingTrapsResponseSchema,
      system: THINKING_TRAPS_ANALYSIS_SYSTEM_PROMPT,
      prompt: `Here is the conversation transcript to analyze:\n\n${transcript
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n')}`,
    });

    // Validate the AI response against our schema using Zod
    const parsedResult = ThinkingTrapsResponseSchema.safeParse(result.object);

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
    console.log('✅ Successfully identified thinking trap:', {
      data: parsedResult.data,
    });

    return new Response(JSON.stringify(parsedResult.data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Handle any unexpected errors during processing
    console.error('Error in thinking traps analysis:', error);
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
