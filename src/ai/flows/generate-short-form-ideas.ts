'use server';
/**
 * @fileOverview A Genkit flow for generating innovative and viral short-form video ideas.
 *
 * - generateShortFormIdeas - A function that handles the generation of short-form video ideas.
 * - GenerateShortFormIdeasInput - The input type for the generateShortFormIdeas function.
 * - GenerateShortFormIdeasOutput - The return type for the generateShortFormIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateShortFormIdeasInputSchema = z.object({
  topic: z.string().describe('The main topic or subject of the short video (e.g., productivity tips, cooking hacks, travel vlogs).'),
  niche: z.string().describe('The creator\'s niche (e.g., comedy, educational, DIY, beauty, gaming, fitness).'),
  targetAudience: z.string().describe('The target audience for the short video (e.g., Gen Z, young professionals, parents, fitness enthusiasts, tech enthusiasts).'),
  platform: z.enum(['YouTube Shorts', 'Instagram Reels', 'TikTok']).describe('The specific platform for which the short video is intended.'),
  moodTone: z.string().optional().describe('The desired mood or tone of the video (e.g., funny, informative, inspiring, sarcastic, motivational, calming).'),
});
export type GenerateShortFormIdeasInput = z.infer<typeof GenerateShortFormIdeasInputSchema>;

const ShortFormVideoIdeaSchema = z.object({
  title: z.string().describe('A catchy, attention-grabbing, and viral-worthy title for the short video.'),
  concept: z.string().describe('A detailed outline or description of the video concept, including key visuals, actions, and narrative points.'),
  trendingSounds: z.array(z.string()).describe('A list of 2-3 trending sound suggestions (e.g., song titles, specific audio snippets, viral sound themes) that would fit this video idea.'),
  hooks: z.array(z.string()).describe('2-3 distinct suggestions for strong opening hooks (e.g., a provocative question, a surprising fact, a relatable scenario) to immediately grab attention within the first 3 seconds.'),
  callToAction: z.string().describe('A clear and engaging call to action for the end of the video (e.g., "Follow for more!", "Link in bio for full recipe", "What are your thoughts?").'),
});

const GenerateShortFormIdeasOutputSchema = z.object({
  ideas: z.array(ShortFormVideoIdeaSchema).describe('An array of 3 innovative and viral short-form video ideas, each complete with a catchy title, detailed concept outline, trending sound suggestions, strong opening hooks, and a clear call to action.'),
});
export type GenerateShortFormIdeasOutput = z.infer<typeof GenerateShortFormIdeasOutputSchema>;

export async function generateShortFormIdeas(
  input: GenerateShortFormIdeasInput
): Promise<GenerateShortFormIdeasOutput> {
  return generateShortFormIdeasFlow(input);
}

const generateShortFormIdeasPrompt = ai.definePrompt({
  name: 'generateShortFormIdeasPrompt',
  input: {schema: GenerateShortFormIdeasInputSchema},
  output: {schema: GenerateShortFormIdeasOutputSchema},
  prompt: `You are an expert short-form video content strategist specialized in creating viral content for platforms like YouTube Shorts, Instagram Reels, and TikTok. Your goal is to generate innovative and highly engaging short-form video ideas, complete with trending sound suggestions and a detailed concept outline, tailored to the creator's niche and target audience.

Consider the following details:
Creator's Niche: {{{niche}}}
Target Audience: {{{targetAudience}}}
Main Topic: {{{topic}}}
Platform: {{{platform}}}
{{#if moodTone}}Desired Mood/Tone: {{{moodTone}}}{{/if}}

Generate 3 unique and viral short-form video ideas. For each idea, provide a catchy title, a detailed concept outline, 2-3 specific suggestions for trending sounds, 2-3 strong opening hooks, and a clear call to action. Ensure the ideas are fresh, engaging, and have high potential for virality on the specified platform. Focus on creativity and actionable concepts.`,
});

const generateShortFormIdeasFlow = ai.defineFlow(
  {
    name: 'generateShortFormIdeasFlow',
    inputSchema: GenerateShortFormIdeasInputSchema,
    outputSchema: GenerateShortFormIdeasOutputSchema,
  },
  async (input) => {
    const {output} = await generateShortFormIdeasPrompt(input);
    if (!output) {
      throw new Error('Failed to generate short-form video ideas.');
    }
    return output;
  }
);
