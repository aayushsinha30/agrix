'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting crops based on expected profit margins.
 *
 * It takes farmer's profile data and seasonal information as input and returns a list of suggested crops with their potential profit margins.
 *
 * @fileOverview
 * - `suggestCropsProfit`: A function that suggests crops based on profit margins.
 * - `SuggestCropsProfitInput`: The input type for the suggestCropsProfit function.
 * - `SuggestCropsProfitOutput`: The return type for the suggestCropsProfit function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCropsProfitInputSchema = z.object({
  farmerProfile: z.object({
    name: z.string().describe("Farmer's name."),
    location: z.string().describe("Farmer's location."),
    farmSize: z.number().describe("Farmer's farm size in acres."),
    soilType: z.string().describe("Farmer's soil type."),
    mainCrops: z.array(z.string()).describe("Farmer's currently grown crops."),
    languagePreference: z.string().describe("Farmer's preferred language."),
  }).describe("Farmer's profile information."),
  seasonalInfo: z.string().describe("Information about the current season and weather conditions."),
});

export type SuggestCropsProfitInput = z.infer<typeof SuggestCropsProfitInputSchema>;

const SuggestCropsProfitOutputSchema = z.object({
  suggestedCrops: z.array(
    z.object({
      cropName: z.string().describe("Name of the suggested crop."),
      profitMargin: z.number().describe("Expected profit margin for the crop."),
      reasons: z.string().describe("Reasons for suggesting the crop."),
    })
  ).describe("List of suggested crops with profit margins and reasons."),
});

export type SuggestCropsProfitOutput = z.infer<typeof SuggestCropsProfitOutputSchema>;


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
