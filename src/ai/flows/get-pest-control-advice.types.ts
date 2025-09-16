
import { z } from 'genkit';

export const PestControlAdviceInputSchema = z.object({
  cropName: z.string().describe('The name of the crop affected.'),
  pestDescription: z.string().describe('A description of the pest.'),
});
export type PestControlAdviceInput = z.infer<
  typeof PestControlAdviceInputSchema
>;

export const PestControlAdviceOutputSchema = z.object({
  advice: z
    .string()
    .describe('Actionable advice for controlling the specified pest.'),
});
export type PestControlAdviceOutput = z.infer<
  typeof PestControlAdviceOutputSchema
>;
