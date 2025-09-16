import { z } from 'genkit';

export const FindFarmingSuppliesInputSchema = z.object({
  query: z.string().describe('The farmer\'s search query for a product (e.g., "pesticide for rice stem borer", "organic manure").'),
});

export type FindFarmingSuppliesInput = z.infer<typeof FindFarmingSuppliesInputSchema>;

const ProductSuggestionSchema = z.object({
    productName: z.string().describe('The name of the suggested product.'),
    description: z.string().describe('A brief description of the product and its use case.'),
    estimatedPrice: z.string().describe('An estimated price for the product in Rupees (e.g., "₹500 per litre").'),
    seller: z.string().describe('A fictional seller or online store link where the product might be found.'),
});

export const FindFarmingSuppliesOutputSchema = z.object({
  products: z
    .array(ProductSuggestionSchema)
    .describe('A list of suggested farming supply products.'),
});

export type FindFarmingSuppliesOutput = z.infer<
  typeof FindFarmingSuppliesOutputSchema
>;
