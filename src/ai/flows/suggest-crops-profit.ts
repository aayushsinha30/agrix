'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting crops based on expected profit margins.
 *
 * It takes farmer's profile data and seasonal information as input and returns a list of suggested crops with their potential profit margins.
 *
 * - `suggestCropsProfit`: A function that suggests crops based on profit margins.
 */

import {ai} from '@/ai/genkit';
import {
  SuggestCropsProfitInputSchema,
  SuggestCropsProfitOutputSchema,
  type SuggestCropsProfitInput,
  type SuggestCropsProfitOutput,
} from './suggest-crops-profit.types';

export async function suggestCropsProfit(input: SuggestCropsProfitInput): Promise<SuggestCropsProfitOutput> {
  return suggestCropsProfitFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCropsProfitPrompt',
  input: {schema: SuggestCropsProfitInputSchema},
  output: {schema: SuggestCropsProfitOutputSchema},
  prompt: `You are an expert agricultural advisor. Based on the farmer's profile and seasonal information, suggest the best crops to plant, considering the expected profit margins. Provide reasons for each suggestion.

Farmer Profile:
Name: {{{farmerProfile.name}}}
Location: {{{farmerProfile.location}}}
Farm Size: {{{farmerProfile.farmSize}}} acres
Soil Type: {{{farmerProfile.soilType}}}
Main Crops: {{#each farmerProfile.mainCrops}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Language Preference: {{{farmerProfile.languagePreference}}}

Seasonal Information: {{{seasonalInfo}}}

Suggest crops that are most suitable for this farmer, considering the profit margins. Return a JSON object.
`,  
});

const suggestCropsProfitFlow = ai.defineFlow(
  {
    name: 'suggestCropsProfitFlow',
    inputSchema: SuggestCropsProfitInputSchema,
    outputSchema: SuggestCropsProfitOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
