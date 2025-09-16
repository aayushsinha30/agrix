'use server';

/**
 * @fileOverview Finds cold storage facilities near a given location.
 *
 * - findColdStorage - A function that suggests facilities based on location.
 */

import { ai } from '@/ai/genkit';
import {
  FindColdStorageInputSchema,
  FindColdStorageOutputSchema,
  type FindColdStorageInput,
  type FindColdStorageOutput,
} from './find-cold-storage.types';

export async function findColdStorage(
  input: FindColdStorageInput
): Promise<FindColdStorageOutput> {
  return findColdStorageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findColdStoragePrompt',
  input: { schema: FindColdStorageInputSchema },
  output: { schema: FindColdStorageOutputSchema },
  prompt: `You are an AI assistant for farmers in Chhattisgarh, India.

A farmer is looking for a cold storage facility near their location. Your task is to suggest 3-4 suitable, fictional facilities.

Farmer's Location: {{{location}}}

For each suggested facility, provide:
1.  A facility name (e.g., "Raipur Cold Storage Pvt. Ltd.").
2.  A full fictional address within or near the farmer's specified location.
3.  A fictional contact number (should look like a real Indian mobile number).
4.  A list of suitable produce for that storage (e.g., "Fruits, Vegetables, Dairy").
`,
});

const findColdStorageFlow = ai.defineFlow(
  {
    name: 'findColdStorageFlow',
    inputSchema: FindColdStorageInputSchema,
    outputSchema: FindColdStorageOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
