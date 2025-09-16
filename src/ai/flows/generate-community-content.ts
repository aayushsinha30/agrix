'use server';

/**
 * @fileOverview Generates placeholder community content for the AGRIX app.
 *
 * - generateCommunityContent - A function that creates realistic community posts.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateCommunityContentOutputSchema,
  type GenerateCommunityContentOutput,
} from './generate-community-content.types';


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
