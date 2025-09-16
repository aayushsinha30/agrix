'use server';

/**
 * @fileOverview Provides AI-driven post-harvest produce grading.
 *
 * - gradeProduce - A function that analyzes a produce image and assigns a quality grade.
 */

import { ai } from '@/ai/genkit';
import {
  GradeProduceInputSchema,
  GradeProduceOutputSchema,
  type GradeProduceInput,
  type GradeProduceOutput,
} from './grade-produce.types';

export async function gradeProduce(
  input: GradeProduceInput
): Promise<GradeProduceOutput> {
  return gradeProduceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'gradeProducePrompt',
  input: { schema: GradeProduceInputSchema },
  output: { schema: GradeProduceOutputSchema },
  prompt: `You are an expert in agricultural quality control, specializing in produce from the Chhattisgarh region of India.

A farmer has provided a photo of their harvest and wants it graded. Analyze the image and description to assign a quality grade.

- Produce Type: {{{produceType}}}
- Photo: {{media url=photoDataUri}}

Common produce includes rice, wheat, tomatoes, and mangoes.
Assign a grade (e.g., "Premium Quality", "Grade A", "Grade B", "Feed Grade").
Provide a list of 2-3 key reasons for the grade, focusing on visual characteristics like size, color, uniformity, and visible defects (or lack thereof).
Keep the reasoning clear and concise.`,
});

const gradeProduceFlow = ai.defineFlow(
  {
    name: 'gradeProduceFlow',
    inputSchema: GradeProduceInputSchema,
    outputSchema: GradeProduceOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
