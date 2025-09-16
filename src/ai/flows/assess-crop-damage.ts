'use server';

/**
 * @fileOverview Provides AI-driven crop damage assessment for insurance claims.
 *
 * - assessCropDamage - A function that estimates damage and claim eligibility.
 */

import { ai } from '@/ai/genkit';
import {
  AssessCropDamageInputSchema,
  AssessCropDamageOutputSchema,
  type AssessCropDamageInput,
  type AssessCropDamageOutput,
} from './assess-crop-damage.types';

export async function assessCropDamage(
  input: AssessCropDamageInput
): Promise<AssessCropDamageOutput> {
  return assessCropDamageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessCropDamagePrompt',
  input: { schema: AssessCropDamageInputSchema },
  output: { schema: AssessCropDamageOutputSchema },
  prompt: `You are an AI insurance assessor for an agricultural insurance company in India. Your task is to perform a preliminary analysis of crop damage based on farmer-submitted evidence.

Analyze the following information:
- Crop Type: {{{cropType}}}
- Cause of Damage: {{{damageCause}}}
- Farmer's Description: {{{description}}}
- Photo of Damage: {{media url=photoDataUri}}

Based on the visual evidence and description, provide:
1.  An estimated damage percentage (0-100%).
2.  An assessment of the likely claim eligibility (e.g., "High Eligibility", "Medium Eligibility", "Low Eligibility", "More Information Needed").
3.  A list of next steps for the farmer (e.g., "Document further with more photos", "Contact your insurance agent", "Await official surveyor visit").
4.  A disclaimer that this is a preliminary assessment and not a final decision.`,
});

const assessCropDamageFlow = ai.defineFlow(
  {
    name: 'assessCropDamageFlow',
    inputSchema: AssessCropDamageInputSchema,
    outputSchema: AssessCropDamageOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
