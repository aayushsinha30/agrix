import { z } from 'genkit';

export const GetSoilBasedRecommendationsInputSchema = z.object({
  reportPhotoDataUri: z
    .string()
    .describe(
      "A photo of the soil test report, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type GetSoilBasedRecommendationsInput = z.infer<
  typeof GetSoilBasedRecommendationsInputSchema
>;

const RecommendationSchema = z.object({
  cropName: z.string().describe('The name of the recommended crop.'),
  suitabilityReason: z
    .string()
    .describe(
      'The reason why this crop is suitable for the soil, based on the report.'
    ),
  profitStrategy: z
    .string()
    .describe(
      'A specific strategy to improve income for this particular crop.'
    ),
});

export const GetSoilBasedRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(RecommendationSchema)
    .describe('A list of crop recommendations based on the soil report.'),
});

export type GetSoilBasedRecommendationsOutput = z.infer<
  typeof GetSoilBasedRecommendationsOutputSchema
>;
