'use server';
/**
 * @fileOverview A Genkit flow for repurposing long-form content into various formats.
 *
 * - repurposeContent - A function that handles the content repurposing process.
 * - RepurposeContentInput - The input type for the repurposeContent function.
 * - RepurposeContentOutput - The return type for the repurposeContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RepurposeContentInputSchema = z.object({
  longFormContent: z
    .string()
    .describe('The full text of the long-form content to be repurposed (e.g., video transcript, blog post).'),
  desiredFormats: z
    .array(z.string())
    .describe(
      'An array of desired output formats for the repurposed content (e.g., "Social Media Post", "Blog Outline", "Short Clip Ideas").'
    ),
  topic: z.string().optional().describe('The main topic of the content.'),
  niche: z.string().optional().describe('The niche the content belongs to.'),
  targetAudience: z.string().optional().describe('The intended target audience for the repurposed content.'),
  contentGoal: z.string().optional().describe('The primary goal of the repurposed content (e.g., "educate", "entertain", "drive traffic").'),
});
export type RepurposeContentInput = z.infer<typeof RepurposeContentInputSchema>;

const RepurposeContentOutputSchema = z.record(z.string(), z.string()).describe('An object where keys are the desired formats and values are the repurposed content for that format.');
export type RepurposeContentOutput = z.infer<typeof RepurposeContentOutputSchema>;

export async function repurposeContent(input: RepurposeContentInput): Promise<RepurposeContentOutput> {
  return repurposeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'repurposeContentPrompt',
  input: { schema: RepurposeContentInputSchema },
  output: { schema: RepurposeContentOutputSchema },
  prompt: `You are an AI assistant specialized in content repurposing for creators.
Your task is to take the provided long-form content and transform it into several specified formats.
The output should be a JSON object where each key corresponds to a desired format and its value is the repurposed content for that format.

---
Long-Form Content:
{{{longFormContent}}}
---

{{#if topic}}
Topic: {{{topic}}}
{{/if}}

{{#if niche}}
Niche: {{{niche}}}
{{/if}}

{{#if targetAudience}}
Target Audience: {{{targetAudience}}}
{{/if}}

{{#if contentGoal}}
Content Goal: {{{contentGoal}}}
{{/if}}

Please repurpose the content into the following formats. The keys in the JSON output should exactly match these format names:
{{#each desiredFormats}}
- "{{this}}"
{{/each}}

Example output structure for formats ["Social Media Post", "Blog Outline"]:
{
  "Social Media Post": "Engaging social media text...",
  "Blog Outline": "Detailed blog post outline..."
}

Now generate the repurposed content in JSON format for the requested formats based on the input content and additional context provided.`,
});

const repurposeContentFlow = ai.defineFlow(
  {
    name: 'repurposeContentFlow',
    inputSchema: RepurposeContentInputSchema,
    outputSchema: RepurposeContentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
