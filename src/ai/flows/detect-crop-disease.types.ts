import {z} from 'genkit';

export const DetectCropDiseaseInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the crop, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  cropDescription: z.string().describe('The description of the crop.'),
});
export type DetectCropDiseaseInput = z.infer<typeof DetectCropDiseaseInputSchema>;

export const DetectCropDiseaseOutputSchema = z.object({
  diseaseName: z.string().describe('The name of the detected disease, if any.'),
  treatmentOptions: z
    .string()
    .describe('Recommended treatment options for the detected disease.'),
  confidenceLevel: z
    .number()
    .describe('The confidence level of the disease detection (0-1).'),
});
export type DetectCropDiseaseOutput = z.infer<typeof DetectCropDiseaseOutputSchema>;
