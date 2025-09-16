import { z } from 'genkit';

export const GetIrrigationAdviceInputSchema = z.object({
  cropType: z.string().describe('The type of crop being cultivated.'),
  soilMoistureLevel: z
    .number()
    .min(0)
    .max(100)
    .describe('The current moisture level of the soil as a percentage (0-100%).'),
  weatherForecast: z
    .string()
    .describe('A brief description of the upcoming weather forecast (e.g., "Hot and sunny", "Rain expected tomorrow").'),
});

export type GetIrrigationAdviceInput = z.infer<
  typeof GetIrrigationAdviceInputSchema
>;

export const GetIrrigationAdviceOutputSchema = z.object({
  recommendation: z
    .string()
    .describe('The primary watering advice (e.g., "Water Today", "Delay Watering").'),
  amount: z
    .string()
    .describe('The recommended amount or duration of watering (e.g., "Light watering", "1 hour with drip system").'),
  reasoning: z
    .string()
    .describe('A brief explanation for the recommendation.'),
});

export type GetIrrigationAdviceOutput = z.infer<
  typeof GetIrrigationAdviceOutputSchema
>;
