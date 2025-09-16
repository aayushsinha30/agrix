import { z } from 'genkit';

export const AssessCropDamageInputSchema = z.object({
  cropType: z.string().describe('The type of crop that was damaged.'),
  damageCause: z
    .string()
    .describe('The cause of the damage (e.g., "Hailstorm", "Pest attack", "Drought").'),
  description: z.string().describe('A brief description of the damage.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the damaged crop, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type AssessCropDamageInput = z.infer<typeof AssessCropDamageInputSchema>;

export const AssessCropDamageOutputSchema = z.object({
  estimatedDamagePercentage: z
    .number()
    .min(0)
    .max(100)
    .describe('The estimated percentage of crop loss.'),
  claimEligibility: z
    .string()
    .describe('An assessment of the likely eligibility for an insurance claim.'),
  nextSteps: z
    .array(z.string())
    .describe('A list of recommended next steps for the farmer.'),
  disclaimer: z
    .string()
    .describe('A disclaimer that this is a preliminary assessment.'),
});

export type AssessCropDamageOutput = z.infer<
  typeof AssessCropDamageOutputSchema
>;
