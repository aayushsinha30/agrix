'use server';

/**
 * @fileOverview This file defines a Genkit flow for predicting market prices of crops.
 * It takes crop name and location as input and returns a forecasted price range and reasoning.
 *
 * - predictMarketPrice: A function that forecasts crop prices.
 * - PredictMarketPriceInput: The input type for the predictMarketPrice function.
 * - PredictMarketPriceOutput: The return type for the predictMarketPrice function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PredictMarketPriceInputSchema = z.object({
  cropName: z.string().describe('The name of the crop.'),
  location: z.string().describe('The market location (mandi) in Chhattisgarh.'),
  timeHorizon: z
    .string()
    .describe('The time horizon for the prediction (e.g., "next week", "next month").'),
});
export type PredictMarketPriceInput = z.infer<
  typeof PredictMarketPriceInputSchema
>;

const PredictMarketPriceOutputSchema = z.object({
  predictedPriceMin: z
    .number()
    .describe('The minimum predicted price in Rupees (₹) per quintal.'),
  predictedPriceMax: z
    .number()
    .describe('The maximum predicted price in Rupees (₹) per quintal.'),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the prediction, considering market trends, seasonality, and other factors.'
    ),
  confidenceScore: z
    .number()
    .min(0)
    .max(1)
    .describe('Confidence score of the prediction from 0 to 1.'),
});
export type PredictMarketPriceOutput = z.infer<
  typeof PredictMarketPriceOutputSchema
>;

export async function predictMarketPrice(
  input: PredictMarketPriceInput
): Promise<PredictMarketPriceOutput> {
  return predictMarketPriceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictMarketPricePrompt',
  input: { schema: PredictMarketPriceInputSchema },
  output: { schema: PredictMarketPriceOutputSchema },
  prompt: `You are an agricultural market analyst specializing in the Indian market, specifically for the state of Chhattisgarh.

A farmer wants a price forecast for their crop. Analyze the provided information and historical data to predict the market price range.

- Crop: {{{cropName}}}
- Location: {{{location}}}, Chhattisgarh
- Time Horizon: {{{timeHorizon}}}

Provide a predicted price range (min and max) in Rupees (₹) per quintal.
Also, provide a detailed reasoning for your forecast, mentioning factors like:
- Current market trends
- Seasonal demand and supply
- Government policies (like MSP)
- Weather patterns
- Historical price data for this region and crop.

Finally, provide a confidence score for your prediction.`,
});

const predictMarketPriceFlow = ai.defineFlow(
  {
    name: 'predictMarketPriceFlow',
    inputSchema: PredictMarketPriceInputSchema,
    outputSchema: PredictMarketPriceOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
