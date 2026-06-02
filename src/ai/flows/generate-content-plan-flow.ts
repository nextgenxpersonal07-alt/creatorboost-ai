'use server';
/**
 * @fileOverview A Genkit flow for generating a strategic content calendar.
 *
 * - generateContentPlan - A function that handles the content plan generation process.
 * - GenerateContentPlanInput - The input type for the generateContentPlan function.
 * - GenerateContentPlanOutput - The return type for the generateContentPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContentPlanInputSchema = z.object({
  niche: z.string().describe('The content creator\'s niche (e.g., tech reviews, beauty tutorials).'),
  targetAudience: z.string().describe('The target audience for the content (e.g., Gen Z, small business owners).'),
  contentGoal: z.string().describe('The primary goal for the content (e.g., increase engagement, drive sales, build brand awareness).'),
  platformSelection: z.array(z.string()).describe('A list of selected social media platforms (e.g., YouTube, Instagram, Shorts, Reels, TikTok).'),
  planDuration: z.enum(['7 Day Plan', '30 Day Plan', '90 Day Plan']).describe('The duration for the content plan (weekly, monthly, or quarterly).'),
});
export type GenerateContentPlanInput = z.infer<typeof GenerateContentPlanInputSchema>;

const ContentPlanEntrySchema = z.object({
  day: z.string().describe('The specific day for the content (e.g., "Day 1", "Monday").'),
  contentTopic: z.string().describe('A suggested topic for the content.'),
  format: z.string().describe('The recommended format for the content (e.g., video, carousel, short-form video).'),
  postingTime: z.string().describe('The optimal time to post the content for maximum reach.'),
  platform: z.string().describe('The specific platform for this content piece.'),
  cta: z.string().describe('A suggested Call To Action for the content.'),
});

const GenerateContentPlanOutputSchema = z.object({
  plan: z.array(ContentPlanEntrySchema).describe('A strategic content plan with daily entries.'),
});
export type GenerateContentPlanOutput = z.infer<typeof GenerateContentPlanOutputSchema>;

export async function generateContentPlan(input: GenerateContentPlanInput): Promise<GenerateContentPlanOutput> {
  return generateContentPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContentPlanPrompt',
  input: {schema: GenerateContentPlanInputSchema},
  output: {schema: GenerateContentPlanOutputSchema},
  prompt: `You are an expert content strategist and AI assistant for creators.
Your task is to generate a strategic content plan based on the user's input.

Generate a {{planDuration}} content plan, including specific content topics, recommended formats, optimal posting times, and a clear Call To Action for each entry.

Use the following details to create the plan:
Niche: {{{niche}}}
Target Audience: {{{targetAudience}}}
Content Goal: {{{contentGoal}}}
Platforms: {{{platformSelection}}}

Ensure the plan is detailed, actionable, and tailored for maximum creator growth and audience engagement.
`,
});

const generateContentPlanFlow = ai.defineFlow(
  {
    name: 'generateContentPlanFlow',
    inputSchema: GenerateContentPlanInputSchema,
    outputSchema: GenerateContentPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
