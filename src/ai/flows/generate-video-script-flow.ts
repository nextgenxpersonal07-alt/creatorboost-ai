'use server';
/**
 * @fileOverview A video script generation AI agent.
 *
 * - generateVideoScript - A function that handles the video script generation process.
 * - GenerateVideoScriptInput - The input type for the generateVideoScript function.
 * - GenerateVideoScriptOutput - The return type for the generateVideoScript function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVideoScriptInputSchema = z.object({
  topic: z.string().describe('The main subject or theme of the video.'),
  niche: z.string().describe('The specific audience or market segment the video is targeting.'),
  targetAudience: z.string().describe('A detailed description of the intended viewers.'),
  contentGoal: z.string().describe('The primary objective of the video (e.g., inform, entertain, convert, educate).'),
  platform: z.enum([
    'YouTube',
    'Instagram',
    'Shorts',
    'Reels',
    'TikTok'
  ]).describe('The platform where the video will be published.'),
});
export type GenerateVideoScriptInput = z.infer<typeof GenerateVideoScriptInputSchema>;

const GenerateVideoScriptOutputSchema = z.object({
  hook: z.string().describe('A captivating opening to grab viewer attention.'),
  introduction: z.string().describe('An introduction that sets the stage and explains what the video is about.'),
  mainContent: z.string().describe('The core message or story of the video, broken down into key points.'),
  callToAction: z.string().describe('A clear instruction for viewers on what to do next (e.g., like, subscribe, visit link).'),
});
export type GenerateVideoScriptOutput = z.infer<typeof GenerateVideoScriptOutputSchema>;

export async function generateVideoScript(input: GenerateVideoScriptInput): Promise<GenerateVideoScriptOutput> {
  return generateVideoScriptFlow(input);
}

const generateVideoScriptPrompt = ai.definePrompt({
  name: 'generateVideoScriptPrompt',
  input: {schema: GenerateVideoScriptInputSchema},
  output: {schema: GenerateVideoScriptOutputSchema},
  prompt: `You are an expert video scriptwriter specializing in creating engaging and high-converting scripts for various platforms. Your goal is to produce a complete video script based on the provided details.

Generate a script that includes a compelling hook, a clear introduction, structured main content, and an effective call to action.

Input Details:
Topic: {{{topic}}}
Niche: {{{niche}}}
Target Audience: {{{targetAudience}}}
Content Goal: {{{contentGoal}}}
Platform: {{{platform}}}

Ensure the script is tailored to the specified platform and effectively meets the content goal while resonating with the target audience.

Script Structure:`,
});

const generateVideoScriptFlow = ai.defineFlow(
  {
    name: 'generateVideoScriptFlow',
    inputSchema: GenerateVideoScriptInputSchema,
    outputSchema: GenerateVideoScriptOutputSchema,
  },
  async (input) => {
    const {output} = await generateVideoScriptPrompt(input);
    return output!;
  }
);
