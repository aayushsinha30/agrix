import {z} from 'genkit';

export const SuggestCropsProfitInputSchema = z.object({
  farmerProfile: z.object({
    name: z.string().describe("Farmer's name."),
    location: z.string().describe("Farmer's location."),
    farmSize: z.number().describe("Farmer's farm size in acres."),
    soilType: z.string().describe("Farmer's soil type."),
    mainCrops: z.array(z.string()).describe("Farmer's currently grown crops."),
    languagePreference: z.string().describe("Farmer's preferred language."),
  }).describe("Farmer's profile information."),
  seasonalInfo: z.string().describe("Information about the current season and weather conditions."),
});

export type SuggestCropsProfitInput = z.infer<typeof SuggestCropsProfitInputSchema>;

export const SuggestCropsProfitOutputSchema = z.object({
  suggestedCrops: z.array(
    z.object({
      cropName: z.string().describe("Name of the suggested crop."),
      profitMargin: z.number().describe("Expected profit margin for the crop."),
      reasons: z.string().describe("Reasons for suggesting the crop."),
    })
  ).describe("List of suggested crops with profit margins and reasons."),
});

export type SuggestCropsProfitOutput = z.infer<typeof SuggestCropsProfitOutputSchema>;
