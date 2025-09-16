'use server';

/**
 * @fileOverview Provides AI-driven advice for livestock health.
 *
 * - getLivestockAdvice - A function that returns health advice based on symptoms.
 */

import { ai } from '@/ai/genkit';
import {
  GetLivestockAdviceInputSchema,
  GetLivestockAdviceOutputSchema,
  type GetLivestockAdviceInput,
  type GetLivestockAdviceOutput,
} from './get-livestock-advice.types';

export async function getLivestockAdvice(
  input: GetLivestockAdviceInput
): Promise<GetLivestockAdviceOutput> {
  return getLivestockAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getLivestockAdvicePrompt',
  input: { schema: GetLivestockAdviceInputSchema },
  output: { schema: GetLivestockAdviceOutputSchema },
  prompt: `You are a veterinarian specializing in common livestock in rural India (cattle, goats, poultry).

A farmer needs advice about a sick animal. Based on the information provided, suggest potential issues and immediate actions the farmer should take.

- Animal Type: {{{animalType}}}
- Symptoms: {{{symptoms}}}

Provide a list of possible health issues (2-3 suggestions).
For each issue, provide a confidence score (Low, Medium, High).
Provide a list of clear, simple, and actionable steps the farmer should take immediately.
Include a strong disclaimer that this is not a substitute for a professional veterinary diagnosis and to consult a local vet.`,
});

const getLivestockAdviceFlow = ai.defineFlow(
  {
    name: 'getLivestockAdviceFlow',
    inputSchema: GetLivestockAdviceInputSchema,
    outputSchema: GetLivestockAdviceOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
