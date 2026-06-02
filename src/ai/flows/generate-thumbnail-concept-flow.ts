'use server';
/**
 * @fileOverview A Genkit flow for generating creative and click-worthy thumbnail ideas.
 *
 * - generateThumbnailConcept - A function that handles the thumbnail concept generation process.
 * - GenerateThumbnailConceptInput - The input type for the generateThumbnailConcept function.
 * - GenerateThumbnailConceptOutput - The return type for the generateThumbnailConcept function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateThumbnailConceptInputSchema = z.object({
  topic: z.string().describe('The main topic or subject of the content.'),
  niche: z.string().describe('The specific niche or industry the content belongs to.'),
  targetAudience: z.string().describe('The intended demographic or audience for the content.'),
  contentGoal: z.string().describe('The primary objective of the content (e.g., inform, entertain, persuade, drive sales).'),
  platform: z.enum(['YouTube', 'Instagram', 'Shorts', 'Reels', 'TikTok']).describe('The platform where the content will be published.'),
});
export type GenerateThumbnailConceptInput = z.infer<typeof GenerateThumbnailConceptInputSchema>;

const GenerateThumbnailConceptOutputSchema = z.object({
  thumbnailTextIdeas: z.array(z.string()).describe('A list of short, punchy text overlays suitable for thumbnails.'),
  thumbnailDesignSuggestions: z.array(z.string()).describe('Creative design elements and visual compositions for the thumbnail.'),
  emotionSuggestions: z.array(z.string()).describe('Emotions or feelings the thumbnail should evoke (e.g., curiosity, excitement, shock, inspiration).'),
});
export type GenerateThumbnailConceptOutput = z.infer<typeof GenerateThumbnailConceptOutputSchema>;

export async function generateThumbnailConcept(input: GenerateThumbnailConceptInput): Promise<GenerateThumbnailConceptOutput> {
  return generateThumbnailConceptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateThumbnailConceptPrompt',
  input: { schema: GenerateThumbnailConceptInputSchema },
  output: { schema: GenerateThumbnailConceptOutputSchema },
  prompt: `You are an expert thumbnail designer for YouTube and Instagram, skilled at creating highly engaging and click-worthy visuals.
Your goal is to generate creative thumbnail ideas based on the user's content details.

Input Details:
Topic: {{{topic}}}
Niche: {{{niche}}}
Target Audience: {{{targetAudience}}}
Content Goal: {{{contentGoal}}}
Platform: {{{platform}}}

Based on the above information, provide:
- Three to five concise and impactful text overlay ideas for the thumbnail.
- Three to five distinct design suggestions, including visual elements, color schemes, and composition.
- Three to five emotions or feelings the thumbnail should aim to evoke in the viewer to maximize clicks and engagement.

Ensure the suggestions are tailored to the specified platform and audience. Focus on visual impact and curiosity.`,
});

const generateThumbnailConceptFlow = ai.defineFlow(
  {
    name: 'generateThumbnailConceptFlow',
    inputSchema: GenerateThumbnailConceptInputSchema,
    outputSchema: GenerateThumbnailConceptOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate thumbnail concept output.');
    }
    return output;
  }
);
