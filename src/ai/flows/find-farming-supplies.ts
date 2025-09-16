'use server';

/**
 * @fileOverview Finds farming supplies like pesticides and fertilizers.
 *
 * - findFarmingSupplies - A function that suggests products based on a query.
 */

import { ai } from '@/ai/genkit';
import {
  FindFarmingSuppliesInputSchema,
  FindFarmingSuppliesOutputSchema,
  type FindFarmingSuppliesInput,
  type FindFarmingSuppliesOutput,
} from './find-farming-supplies.types';

export async function findFarmingSupplies(
  input: FindFarmingSuppliesInput
): Promise<FindFarmingSuppliesOutput> {
  return findFarmingSuppliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findFarmingSuppliesPrompt',
  input: { schema: FindFarmingSuppliesInputSchema },
  output: { schema: FindFarmingSuppliesOutputSchema },
  prompt: `You are an AI agricultural supply expert for farmers in Chhattisgarh, India.

A farmer is looking for a specific type of product. Your task is to suggest 3-4 suitable products available in the Indian market.

Farmer's Query: {{{query}}}

For each suggested product, provide:
1.  A product name (can be a real or realistic fictional brand).
2.  A brief description of what it's used for.
3.  An estimated price in Rupees (₹).
4.  A fictional seller or online store link.

The suggestions should be relevant to the farmer's query and suitable for use in Chhattisgarh.`,
});

const findFarmingSuppliesFlow = ai.defineFlow(
  {
    name: 'findFarmingSuppliesFlow',
    inputSchema: FindFarmingSuppliesInputSchema,
    outputSchema: FindFarmingSuppliesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
