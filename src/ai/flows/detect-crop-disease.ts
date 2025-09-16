'use server';

/**
 * @fileOverview Crop disease detection and treatment flow.
 *
 * - detectCropDisease - A function that handles the crop disease detection and treatment process.
 * - DetectCropDiseaseInput - The input type for the detectCropDisease function.
 * - DetectCropDiseaseOutput - The return type for the detectCropDisease function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectCropDiseaseInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the crop, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  cropDescription: z.string().describe('The description of the crop.'),
});
export type DetectCropDiseaseInput = z.infer<typeof DetectCropDiseaseInputSchema>;

const DetectCropDiseaseOutputSchema = z.object({
  diseaseName: z.string().describe('The name of the detected disease, if any.'),
  treatmentOptions: z
    .string()
    .describe('Recommended treatment options for the detected disease.'),
  confidenceLevel: z
    .number()
    .describe('The confidence level of the disease detection (0-1).'),
});
export type DetectCropDiseaseOutput = z.infer<typeof DetectCropDiseaseOutputSchema>;

export async function detectCropDisease(input: DetectCropDiseaseInput): Promise<DetectCropDiseaseOutput> {
  return detectCropDiseaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectCropDiseasePrompt',
  input: {schema: DetectCropDiseaseInputSchema},
  output: {schema: DetectCropDiseaseOutputSchema},
  prompt: `You are an expert in plant pathology. A farmer will provide a photo and description of a crop, and you will diagnose any diseases present and suggest treatment options.

Analyze the following information to detect potential diseases and suggest treatments:

Crop Description: {{{cropDescription}}}
Photo: {{media url=photoDataUri}}

Respond with the disease name, treatment options, and a confidence level (0-1). If no disease is detected, disease name should be 'None'.`,
});

const detectCropDiseaseFlow = ai.defineFlow(
  {
    name: 'detectCropDiseaseFlow',
    inputSchema: DetectCropDiseaseInputSchema,
    outputSchema: DetectCropDiseaseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
