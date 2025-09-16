'use server';

/**
 * @fileOverview This file defines a Genkit flow for predicting market prices of crops.
 * It takes crop name and location as input and returns a forecasted price range and reasoning.
 *
 * - predictMarketPrice: A function that forecasts crop prices.
 */

import { ai } from '@/ai/genkit';
import {
  PredictMarketPriceInputSchema,
  PredictMarketPriceOutputSchema,
  type PredictMarketPriceInput,
  type PredictMarketPriceOutput,
} from './predict-market-price.types';

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
