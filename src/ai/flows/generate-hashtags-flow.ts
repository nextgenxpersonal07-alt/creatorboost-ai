'use server';
/**
 * @fileOverview A specialized hashtag generation agent.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateHashtagsInputSchema = z.object({
  topic: z.string().describe('The content topic.'),
  platform: z.enum(['Instagram', 'TikTok', 'YouTube Shorts', 'Twitter/X', 'LinkedIn']).describe('The platform for the hashtags.'),
  niche: z.string().describe('The specific niche.'),
  count: z.number().min(5).max(30).default(15).describe('Number of hashtags to generate.'),
});
export type GenerateHashtagsInput = z.infer<typeof GenerateHashtagsInputSchema>;

const GenerateHashtagsOutputSchema = z.object({
  trending: z.array(z.string()).describe('Broad, high-traffic hashtags.'),
  nicheSpecific: z.array(z.string()).describe('Targeted hashtags for the specific niche.'),
  lowCompetition: z.array(z.string()).describe('Smaller hashtags that are easier to rank in.'),
  hashtagStrategy: z.string().describe('Advice on how to mix these hashtags for best results.'),
});
export type GenerateHashtagsOutput = z.infer<typeof GenerateHashtagsOutputSchema>;

export async function generateHashtags(input: GenerateHashtagsInput): Promise<GenerateHashtagsOutput> {
  return generateHashtagsFlow(input);
}

const generateHashtagsPrompt = ai.definePrompt({
  name: 'generateHashtagsPrompt',
  input: { schema: GenerateHashtagsInputSchema },
  output: { schema: GenerateHashtagsOutputSchema },
  prompt: `You are a social media growth expert. Generate a set of {{{count}}} hashtags for a {{{topic}}} post on {{{platform}}}.

The niche is {{{niche}}}.

Categorize the hashtags into:
- Trending (Broad reach)
- Niche-Specific (Targeted audience)
- Low-Competition (Easier to get into the "Top" section)

Provide a brief strategy on how to use them effectively on {{{platform}}}.
Do not include the '#' symbol in the JSON array values, just the text.`,
});

const generateHashtagsFlow = ai.defineFlow(
  {
    name: 'generateHashtagsFlow',
    inputSchema: GenerateHashtagsInputSchema,
    outputSchema: GenerateHashtagsOutputSchema,
  },
  async (input) => {
    const { output } = await generateHashtagsPrompt(input);
    if (!output) throw new Error('Failed to generate hashtags');
    return output;
  }
);
