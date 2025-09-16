import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-crops-profit.ts';
import '@/ai/flows/detect-crop-disease.ts';
import '@/ai/flows/predict-market-price.ts';
import '@/ai/flows/generate-community-content.ts';
