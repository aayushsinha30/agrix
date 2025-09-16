import { z } from 'genkit';

export const GetLocationFromCoordsInputSchema = z.object({
  latitude: z.number().describe('The latitude coordinate.'),
  longitude: z.number().describe('The longitude coordinate.'),
});

export type GetLocationFromCoordsInput = z.infer<
  typeof GetLocationFromCoordsInputSchema
>;

export const GetLocationFromCoordsOutputSchema = z.object({
  location: z.string().describe('The city or district name.'),
});

export type GetLocationFromCoordsOutput = z.infer<
  typeof GetLocationFromCoordsOutputSchema
>;
