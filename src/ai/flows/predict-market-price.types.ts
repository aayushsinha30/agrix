import { z } from 'genkit';

export const PredictMarketPriceInputSchema = z.object({
  cropName: z.string().describe('The name of the crop.'),
  location: z.string().describe('The market location (mandi) in Chhattisgarh.'),
  timeHorizon: z
    .string()
    .describe('The time horizon for the prediction (e.g., "next week", "next month").'),
});
export type PredictMarketPriceInput = z.infer<
  typeof PredictMarketPriceInputSchema
>;

export const PredictMarketPriceOutputSchema = z.object({
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
