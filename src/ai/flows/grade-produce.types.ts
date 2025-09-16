import { z } from 'genkit';

export const GradeProduceInputSchema = z.object({
  produceType: z.string().describe('The type of produce being graded (e.g., "Rice", "Tomato").'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the produce, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type GradeProduceInput = z.infer<typeof GradeProduceInputSchema>;

export const GradeProduceOutputSchema = z.object({
  grade: z
    .string()
    .describe('The quality grade assigned to the produce (e.g., "Premium Quality", "Grade A", "Grade B").'),
  reasons: z
    .array(z.string())
    .min(2)
    .max(3)
    .describe('A list of key reasons for the assigned grade based on visual analysis.'),
});

export type GradeProduceOutput = z.infer<typeof GradeProduceOutputSchema>;
