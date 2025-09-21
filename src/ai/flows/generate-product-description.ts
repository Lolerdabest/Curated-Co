'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating product descriptions using AI.
 *
 * The flow takes limited product details as input and generates a compelling and informative description.
 *
 * @interface GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * @interface GenerateProductDescriptionOutput - The output type for the generateProductDescription function.
 * @function generateProductDescription - The function to call to generate a product description.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  category: z.string().describe('The category of the product.'),
  keyFeatures: z.string().describe('Key features of the product.'),
  targetAudience: z.string().describe('The target audience for the product.'),
});

export type GenerateProductDescriptionInput = z.infer<
  typeof GenerateProductDescriptionInputSchema
>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('A detailed and engaging product description.'),
});

export type GenerateProductDescriptionOutput = z.infer<
  typeof GenerateProductDescriptionOutputSchema
>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const generateProductDescriptionPrompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in creating engaging product descriptions.

  Based on the following information, write a compelling and informative product description:

  Product Name: {{{productName}}}
  Category: {{{category}}}
  Key Features: {{{keyFeatures}}}
  Target Audience: {{{targetAudience}}}

  Description:`, // Ensure the output matches the schema's 'description' field
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateProductDescriptionPrompt(input);
    return output!;
  }
);
