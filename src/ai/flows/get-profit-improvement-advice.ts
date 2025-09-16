'use server';

/**
 * @fileOverview Provides AI-driven advice to improve farm profitability.
 *
 * - getProfitImprovementAdvice - A function that returns suggestions to increase profit.
 */

import { ai } from '@/ai/genkit';
import {
  GetProfitImprovementAdviceInputSchema,
  GetProfitImprovementAdviceOutputSchema,
  type GetProfitImprovementAdviceInput,
  type GetProfitImprovementAdviceOutput,
} from './get-profit-improvement-advice.types';

export async function getProfitImprovementAdvice(
  input: GetProfitImprovementAdviceInput
): Promise<GetProfitImprovementAdviceOutput> {
  return getProfitImprovementAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getProfitImprovementAdvicePrompt',
  input: { schema: GetProfitImprovementAdviceInputSchema },
  output: { schema: GetProfitImprovementAdviceOutputSchema },
  prompt: `You are an expert agricultural economist advising a farmer in Chhattisgarh, India.

The farmer has provided the following financial data for their recent harvest:
- Crop: {{{cropName}}}
- Total Expenses: ₹{{{totalExpenses}}}
- Total Revenue: ₹{{{totalRevenue}}}

Analyze this information and provide 3-4 actionable suggestions on how the farmer can increase their profit for the next cycle of this crop.

For each suggestion, provide:
1.  A clear piece of advice.
2.  An estimated impact level (e.g., "High", "Medium", "Low").

Focus on practical, region-specific advice. Suggestions could relate to:
- Reducing input costs (fertilizer, seeds, etc.)
- Improving yield (better techniques, irrigation)
- Getting better prices (market timing, direct selling)
- Reducing post-harvest losses
- Exploring value-addition opportunities`,
});

const getProfitImprovementAdviceFlow = ai.defineFlow(
  {
    name: 'getProfitImprovementAdviceFlow',
    inputSchema: GetProfitImprovementAdviceInputSchema,
    outputSchema: GetProfitImprovementAdviceOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
