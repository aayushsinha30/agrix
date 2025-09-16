'use server';

/**
 * @fileOverview Provides AI-driven precision irrigation advice.
 *
 * - getIrrigationAdvice - A function that returns a watering recommendation.
 */

import { ai } from '@/ai/genkit';
import {
  GetIrrigationAdviceInputSchema,
  GetIrrigationAdviceOutputSchema,
  type GetIrrigationAdviceInput,
  type GetIrrigationAdviceOutput,
} from './get-irrigation-advice.types';

export async function getIrrigationAdvice(
  input: GetIrrigationAdviceInput
): Promise<GetIrrigationAdviceOutput> {
  return getIrrigationAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getIrrigationAdvicePrompt',
  input: { schema: GetIrrigationAdviceInputSchema },
  output: { schema: GetIrrigationAdviceOutputSchema },
  prompt: `You are an agricultural expert specializing in water management for farms in Chhattisgarh, India.

A farmer needs advice on when and how much to water their crops. Analyze the provided data to give a clear, actionable recommendation.

- Crop Type: {{{cropType}}}
- Soil Moisture Level: {{{soilMoistureLevel}}}%
- Weather Forecast: {{{weatherForecast}}}

Provide a watering recommendation (e.g., "Water today", "Wait 2 days") and specify the recommended amount in simple terms (e.g., "Light watering", "Heavy watering for 1 hour").
Include a brief reasoning for your advice, considering the crop's needs, current soil moisture, and upcoming weather.
The advice should be easy for a farmer to understand and implement.`,
});

const getIrrigationAdviceFlow = ai.defineFlow(
  {
    name: 'getIrrigationAdviceFlow',
    inputSchema: GetIrrigationAdviceInputSchema,
    outputSchema: GetIrrigationAdviceOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
