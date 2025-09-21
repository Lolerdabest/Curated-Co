"use server";

import { generateProductDescription, type GenerateProductDescriptionInput } from "@/ai/flows/generate-product-description";

export async function generateDescriptionAction(input: GenerateProductDescriptionInput) {
    try {
        const output = await generateProductDescription(input);
        return { success: true, description: output.description };
    } catch (error) {
        console.error("Error generating product description:", error);
        return { success: false, message: "Failed to generate description due to a server error." };
    }
}
