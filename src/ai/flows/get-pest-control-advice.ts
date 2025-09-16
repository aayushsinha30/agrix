
'use server';

import { ai } from '@/ai/genkit';
import {
  PestControlAdviceInputSchema,
  PestControlAdviceOutputSchema,
  type PestControlAdviceInput,
  type PestControlAdviceOutput,
} from './get-pest-control-advice.types';

export async function getPestControlAdvice(
  input: PestControlAdviceInput
): Promise<PestControlAdviceOutput> {
  return getPestControlAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getPestControlAdvicePrompt',
  input: { schema: PestControlAdviceInputSchema },
  output: { schema: PestControlAdviceOutputSchema },
  prompt: `You are an expert entomologist specializing in agricultural pests in India. A farmer from Chhattisgarh needs advice on controlling a pest affecting their crops.

Crop: {{{cropName}}}
Pest Description: {{{pestDescription}}}

Provide clear, concise, and actionable advice. Suggest both organic and chemical control methods if applicable. Keep the language simple and easy for a farmer to understand.`,
});

const getPestControlAdviceFlow = ai.defineFlow(
  {
    name: 'getPestControlAdviceFlow',
    inputSchema: PestControlAdviceInputSchema,
    outputSchema: PestControlAdviceOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
