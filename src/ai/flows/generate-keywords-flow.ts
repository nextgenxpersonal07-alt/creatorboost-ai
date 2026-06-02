'use server';
/**
 * @fileOverview A Genkit flow for generating SEO-optimized keywords for content creators.
 *
 * - generateKeywords - A function that handles the keyword generation process.
 * - GenerateKeywordsInput - The input type for the generateKeywords function.
 * - GenerateKeywordsOutput - The return type for the generateKeywords function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateKeywordsInputSchema = z.object({
  topic: z.string().describe('The main topic to generate keywords for.'),
  niche: z.string().describe('The creator\'s specific niche.'),
  platform: z.enum(['YouTube', 'Google', 'TikTok', 'Instagram', 'Pinterest']).describe('The target platform for SEO.'),
  intent: z.enum(['Informational', 'Transactional', 'Educational', 'Viral']).describe('The search intent behind the keywords.'),
});
export type GenerateKeywordsInput = z.infer<typeof GenerateKeywordsInputSchema>;

const KeywordSchema = z.object({
  keyword: z.string(),
  volume: z.enum(['High', 'Medium', 'Low']).describe('Estimated search volume.'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('Ranking difficulty.'),
  relevance: z.number().describe('Score from 0-100 indicating relevance to topic.'),
});

const GenerateKeywordsOutputSchema = z.object({
  primaryKeywords: z.array(KeywordSchema).describe('High-priority keywords.'),
  secondaryKeywords: z.array(KeywordSchema).describe('Supporting keywords.'),
  longTailKeywords: z.array(z.string()).describe('Specific long-tail phrases.'),
  seoTips: z.string().describe('Actionable advice for using these keywords.'),
});
export type GenerateKeywordsOutput = z.infer<typeof GenerateKeywordsOutputSchema>;

export async function generateKeywords(input: GenerateKeywordsInput): Promise<GenerateKeywordsOutput> {
  return generateKeywordsFlow(input);
}

const generateKeywordsPrompt = ai.definePrompt({
  name: 'generateKeywordsPrompt',
  input: { schema: GenerateKeywordsInputSchema },
  output: { schema: GenerateKeywordsOutputSchema },
  prompt: `You are an expert SEO strategist specializing in digital content creation.
Your goal is to generate a comprehensive list of high-performing keywords based on the following:

Topic: {{{topic}}}
Niche: {{{niche}}}
Platform: {{{platform}}}
Search Intent: {{{intent}}}

Generate:
1. 5 Primary keywords with volume and difficulty estimates.
2. 5 Secondary keywords.
3. 10 Long-tail keyword phrases that users are likely to search for.
4. A brief paragraph of SEO implementation tips specifically for {{{platform}}}.

Ensure the keywords are modern, trending, and highly relevant to the {{{niche}}} niche.`,
});

const generateKeywordsFlow = ai.defineFlow(
  {
    name: 'generateKeywordsFlow',
    inputSchema: GenerateKeywordsInputSchema,
    outputSchema: GenerateKeywordsOutputSchema,
  },
  async (input) => {
    const { output } = await generateKeywordsPrompt(input);
    if (!output) throw new Error('Failed to generate keywords');
    return output;
  }
);
