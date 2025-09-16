
import { z } from 'genkit';

export const GovtSchemeSchema = z.object({
  name: z.string().describe('The official name of the government scheme.'),
  description: z.string().describe('A brief summary of the scheme.'),
  link: z
    .string()
    .url()
    .describe('A URL for more information about the scheme.'),
});

export const GovtSchemesOutputSchema = z.object({
  schemes: z
    .array(GovtSchemeSchema)
    .describe(
      'A list of relevant government schemes for farmers in Chhattisgarh.'
    ),
});

export type GovtSchemesOutput = z.infer<typeof GovtSchemesOutputSchema>;
