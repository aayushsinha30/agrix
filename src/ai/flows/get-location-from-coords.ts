'use server';

/**
 * @fileOverview Gets a city/district name from geographic coordinates.
 *
 * - getLocationFromCoords - A function that returns a location name.
 */

import { ai } from '@/ai/genkit';
import {
  GetLocationFromCoordsInputSchema,
  GetLocationFromCoordsOutputSchema,
  type GetLocationFromCoordsInput,
  type GetLocationFromCoordsOutput,
} from './get-location-from-coords.types';

export async function getLocationFromCoords(
  input: GetLocationFromCoordsInput
): Promise<GetLocationFromCoordsOutput> {
  return getLocationFromCoordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getLocationFromCoordsPrompt',
  input: { schema: GetLocationFromCoordsInputSchema },
  output: { schema: GetLocationFromCoordsOutputSchema },
  prompt: `Based on the following geographic coordinates, identify the primary city or district name. The location is likely within Chhattisgarh, India. Respond with only the city or district name.

Latitude: {{{latitude}}}
Longitude: {{{longitude}}}`,
});

const getLocationFromCoordsFlow = ai.defineFlow(
  {
    name: 'getLocationFromCoordsFlow',
    inputSchema: GetLocationFromCoordsInputSchema,
    outputSchema: GetLocationFromCoordsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
