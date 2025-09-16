'use server';

/**
 * @fileOverview Generates placeholder community content for the AGRIX app.
 *
 * - generateCommunityContent - A function that creates realistic community posts.
 * - GenerateCommunityContentOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CommunityPostSchema = z.object({
  author: z.string().describe("The name of the farmer posting the content."),
  time: z.string().describe("A relative time string, e.g., '2 hours ago'."),
  content: z
    .string()
    .describe(
      "The text content of the post. Should be a question, a tip, or a general comment related to farming in Chhattisgarh."
    ),
  likes: z
    .number()
    .int()
    .min(0)
    .describe("A random number of likes for the post."),
  comments: z
    .number()
    .int()
    .min(0)
    .describe("A random number of comments on the post."),
});

const GenerateCommunityContentOutputSchema = z.object({
  posts: z
    .array(CommunityPostSchema)
    .length(5)
    .describe('An array of 5 community posts.'),
});

export type GenerateCommunityContentOutput = z.infer<
  typeof GenerateCommunityContentOutputSchema
>;

export async function generateCommunityContent(): Promise<GenerateCommunityContentOutput> {
  return generateCommunityContentFlow();
}

const prompt = ai.definePrompt({
  name: 'generateCommunityContentPrompt',
  output: { schema: GenerateCommunityContentOutputSchema },
  prompt: `You are an AI assistant for a farming app in Chhattisgarh, India. Your task is to generate 5 realistic and engaging community posts from fictional farmers.

The posts should be in a mix of English and Hinglish. They should reflect common questions, tips, and discussions relevant to farmers in Chhattisgarh.

Topics can include:
- Questions about paddy (rice) cultivation.
- Best fertilizers for wheat.
- Dealing with common pests for vegetables.
- Sharing success stories about crop yields.
- Asking for advice on government schemes.
- Weather-related comments.

Make the author names sound like they are from the Chhattisgarh region.
Generate a realistic number of likes and comments for each post.
Keep the post content concise and to the point.
`,
});

const generateCommunityContentFlow = ai.defineFlow(
  {
    name: 'generateCommunityContentFlow',
    outputSchema: GenerateCommunityContentOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    return output!;
  }
);
