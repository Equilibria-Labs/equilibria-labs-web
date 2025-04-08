import { z } from 'zod';

export const ConversationSummaryResponseSchema = z.object({
  originalThought: z.string(),
  reframedThought: z.string(),
});
