'use server';

/**
 * @fileOverview Crop disease detection and treatment flow.
 *
 * - detectCropDisease - A function that handles the crop disease detection and treatment process.
 */

import {ai} from '@/ai/genkit';
import {
  DetectCropDiseaseInputSchema,
  DetectCropDiseaseOutputSchema,
  type DetectCropDiseaseInput,
  type DetectCropDiseaseOutput,
} from './detect-crop-disease.types';

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
