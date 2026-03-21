'use server';

/**
 * @fileOverview Provides crop recommendations based on a soil test report analysis.
 *
 * - getSoilBasedRecommendations - A function that analyzes a report and suggests profitable crops.
 */

import { ai } from '@/ai/genkit';
import {
  GetSoilBasedRecommendationsInputSchema,
  GetSoilBasedRecommendationsOutputSchema,
  type GetSoilBasedRecommendationsInput,
  type GetSoilBasedRecommendationsOutput,
} from './get-soil-based-recommendations.types';

export async function getSoilBasedRecommendations(
  input: GetSoilBasedRecommendationsInput
): Promise<GetSoilBasedRecommendationsOutput> {
  return getSoilBasedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getSoilBasedRecommendationsPrompt',
  input: { schema: GetSoilBasedRecommendationsInputSchema },
  output: { schema: GetSoilBasedRecommendationsOutputSchema },
  prompt: `You are an expert agronomist advising farmers in Chhattisgarh, India. Your task is to analyze a soil test report and provide crop recommendations that can improve the farmer's income.

Analyze the soil test report from this image: {{media url=reportPhotoDataUri}}

From the report, identify key parameters like pH, Nitrogen (N), Phosphorus (P), Potassium (K), and any other available metrics.

Based on this analysis, provide:
1.  A list of 2-3 suitable crops.
2.  For each crop, explain why it is a good match for the soil conditions identified in the report.
3.  For each crop, suggest a specific, actionable strategy to maximize profit (e.g., "Consider inter-cropping with lentils to fix nitrogen," or "Focus on direct-to-consumer sales in nearby Raipur markets for higher margins").`,
});

const getSoilBasedRecommendationsFlow = ai.defineFlow(
  {
    name: 'getSoilBasedRecommendationsFlow',
    inputSchema: GetSoilBasedRecommendationsInputSchema,
    outputSchema: GetSoilBasedRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
