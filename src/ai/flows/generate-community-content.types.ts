import { z } from 'genkit';

export const CommunityPostSchema = z.object({
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

export const GenerateCommunityContentOutputSchema = z.object({
  posts: z
    .array(CommunityPostSchema)
    .length(5)
    .describe('An array of 5 community posts.'),
});

export type GenerateCommunityContentOutput = z.infer<
  typeof GenerateCommunityContentOutputSchema
>;
