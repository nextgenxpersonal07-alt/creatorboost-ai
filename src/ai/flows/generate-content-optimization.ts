'use server';
/**
 * @fileOverview A Genkit flow for generating high-converting titles, engaging captions, trending hashtags,
 * and SEO-friendly video descriptions for content creators across various platforms.
 *
 * - generateContentOptimization - A function that handles the content optimization process.
 * - GenerateContentOptimizationInput - The input type for the generateContentOptimization function.
 * - GenerateContentOptimizationOutput - The return type for the generateContentOptimization function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateContentOptimizationInputSchema = z.object({
  topic: z.string().describe('The main topic of the content.'),
  niche: z.string().describe('The specific niche the content belongs to.'),
  targetAudience: z.string().describe('Description of the intended target audience.'),
  contentGoal: z.string().describe('The primary goal of the content (e.g., increase engagement, drive traffic, educate).'),
  platform: z.enum(['YouTube', 'Instagram', 'Shorts', 'Reels', 'TikTok']).describe('The primary platform for the content.'),
});
export type GenerateContentOptimizationInput = z.infer<typeof GenerateContentOptimizationInputSchema>;

const GenerateContentOptimizationOutputSchema = z.object({
  titles: z.array(z.string().describe('A high-converting title idea.')).describe('10 distinct, click-worthy titles.'),
  captions: z.object({
    short: z.string().describe('A short, punchy caption suitable for quick reads.'),
    medium: z.string().describe('A medium-length caption that provides more detail and encourages interaction.'),
    long: z.string().describe('A long, comprehensive caption that tells a story or offers significant value.'),
  }).describe('Multiple caption styles for different needs.'),
  hashtags: z.object({
    trending: z.array(z.string()).describe('An array of trending hashtags.'),
    niche: z.array(z.string()).describe('An array of niche-specific hashtags.'),
    highReach: z.array(z.string()).describe('An array of high-reach hashtags.'),
  }).describe('Categorized lists of hashtags.'),
  videoDescription: z.string().optional().describe('An SEO-friendly video description, applicable for YouTube and Shorts.'),
});
export type GenerateContentOptimizationOutput = z.infer<typeof GenerateContentOptimizationOutputSchema>;

export async function generateContentOptimization(input: GenerateContentOptimizationInput): Promise<GenerateContentOptimizationOutput> {
  return generateContentOptimizationFlow(input);
}

const contentOptimizationPrompt = ai.definePrompt({
  name: 'contentOptimizationPrompt',
  input: { schema: GenerateContentOptimizationInputSchema },
  output: { schema: GenerateContentOptimizationOutputSchema },
  prompt: `You are an expert content strategist and marketing specialist for YouTube and Instagram creators. Your goal is to help creators generate high-converting titles, engaging captions, trending hashtags, and SEO-friendly video descriptions.\n\nBased on the following information, generate the content optimizations. Provide the output in JSON format, strictly following the provided schema.\n\nTopic: {{{topic}}}\nNiche: {{{niche}}}\nTarget Audience: {{{targetAudience}}}\nContent Goal: {{{contentGoal}}}\nPlatform: {{{platform}}}\n\nCarefully consider the platform's best practices for maximizing visibility and engagement.\n\nGenerate 10 distinct, click-worthy titles that grab attention and accurately reflect the content. Each title should be concise and compelling.\n\nFor captions, provide three distinct styles: a short, punchy caption; a medium-length caption with more detail; and a long, comprehensive caption.\n\nFor hashtags, provide separate lists (arrays) for trending, niche-specific, and high-reach hashtags. Each list should contain relevant and popular hashtags.\n\nIf the platform is 'YouTube' or 'Shorts', generate an SEO-friendly video description that is detailed, includes relevant keywords, encourages engagement (likes, comments, subscribes), and provides a clear call to action.\nIf the platform is not 'YouTube' or 'Shorts', then omit the "videoDescription" field from the JSON output.`,
});

const generateContentOptimizationFlow = ai.defineFlow(
  {
    name: 'generateContentOptimizationFlow',
    inputSchema: GenerateContentOptimizationInputSchema,
    outputSchema: GenerateContentOptimizationOutputSchema,
  },
  async (input) => {
    const { output } = await contentOptimizationPrompt(input);
    if (!output) {
      throw new Error('Failed to generate content optimization output.');
    }
    return output;
  }
);
