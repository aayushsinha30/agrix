import { z } from 'genkit';

export const GetProfitImprovementAdviceInputSchema = z.object({
  cropName: z.string().describe('The name of the crop.'),
  totalExpenses: z.number().describe('The total expenses incurred in Rupees.'),
  totalRevenue: z.number().describe('The total revenue generated in Rupees.'),
});

export type GetProfitImprovementAdviceInput = z.infer<
  typeof GetProfitImprovementAdviceInputSchema
>;

const SuggestionSchema = z.object({
  advice: z
    .string()
    .describe('A single, actionable piece of advice for the farmer.'),
  impact: z
    .enum(['High', 'Medium', 'Low'])
    .describe('The estimated potential impact of implementing the advice.'),
});

export const GetProfitImprovementAdviceOutputSchema = z.object({
  suggestions: z
    .array(SuggestionSchema)
    .describe('A list of suggestions to improve profitability.'),
});

export type GetProfitImprovementAdviceOutput = z.infer<
  typeof GetProfitImprovementAdviceOutputSchema
>;
