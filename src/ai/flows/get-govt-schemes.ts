
'use server';

import { ai } from '@/ai/genkit';
import {
  GovtSchemesOutputSchema,
  type GovtSchemesOutput,
} from './get-govt-schemes.types';

export async function getGovtSchemes(): Promise<GovtSchemesOutput> {
  return getGovtSchemesFlow();
}

const prompt = ai.definePrompt({
  name: 'getGovtSchemesPrompt',
  output: { schema: GovtSchemesOutputSchema },
  prompt: `You are an expert on agricultural government schemes in India, with a focus on Chhattisgarh. List 3-4 relevant and popular schemes that a farmer in Chhattisgarh could benefit from.

For each scheme, provide:
- A clear, simple name.
- A brief, one-sentence description of its main benefit.
- A (fictional but realistic) URL to a government portal for more information.

Focus on schemes related to crop insurance, subsidies, or direct benefit transfers.`,
});

const getGovtSchemesFlow = ai.defineFlow(
  {
    name: 'getGovtSchemesFlow',
    outputSchema: GovtSchemesOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    return output!;
  }
);
