import { config } from 'dotenv';
config();

import './flows/suggest-crops-profit.ts';
import './flows/detect-crop-disease.ts';
import './flows/predict-market-price.ts';
import './flows/generate-community-content.ts';
