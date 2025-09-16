import { z } from 'genkit';

export const GetLivestockAdviceInputSchema = z.object({
  animalType: z.string().describe('The type of livestock (e.g., "Cow", "Goat", "Chicken").'),
  symptoms: z
    .string()
    .describe('A description of the animal\'s symptoms.'),
});

export type GetLivestockAdviceInput = z.infer<
  typeof GetLivestockAdviceInputSchema
>;

const PossibleIssueSchema = z.object({
  issue: z.string().describe('The name of the potential health issue.'),
  confidence: z.enum(['Low', 'Medium', 'High']).describe('The confidence level for this potential issue.'),
});

export const GetLivestockAdviceOutputSchema = z.object({
  possibleIssues: z
    .array(PossibleIssueSchema)
    .describe('A list of possible health issues based on the symptoms.'),
  recommendations: z
    .array(z.string())
    .describe('A list of immediate, actionable steps for the farmer to take.'),
  disclaimer: z
    .string()
    .describe('A disclaimer advising consultation with a professional veterinarian.'),
});

export type GetLivestockAdviceOutput = z.infer<
  typeof GetLivestockAdviceOutputSchema
>;
