import { z } from 'genkit';

export const FindColdStorageInputSchema = z.object({
  location: z.string().describe('The farmer\'s city or district in Chhattisgarh (e.g., "Raipur", "Durg").'),
});

export type FindColdStorageInput = z.infer<typeof FindColdStorageInputSchema>;

const FacilitySuggestionSchema = z.object({
    name: z.string().describe('The name of the cold storage facility.'),
    address: z.string().describe('The full address of the facility.'),
    contact: z.string().describe('A contact phone number for the facility.'),
    suitableFor: z.array(z.string()).describe('A list of produce types suitable for storage.'),
});

export const FindColdStorageOutputSchema = z.object({
  facilities: z
    .array(FacilitySuggestionSchema)
    .describe('A list of suggested cold storage facilities.'),
});

export type FindColdStorageOutput = z.infer<
  typeof FindColdStorageOutputSchema
>;
