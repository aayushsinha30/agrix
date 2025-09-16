import type { MarketPrice, WeatherInfo } from '@/lib/types';
import {
  Apple,
  Carrot,
  Cloud,
  CloudRain,
  Sprout,
  Sun,
  Wheat,
} from 'lucide-react';

export const mockMarketPrices: MarketPrice[] = [
  { crop: 'Rice', price: 2203, change: 1.5, icon: Sprout },
  { crop: 'Wheat', price: 2700, change: -0.8, icon: Wheat },
  { crop: 'Corn', price: 2150, change: 2.1, icon: Sprout },
  { crop: 'Gram', price: 6500, change: -2.4, icon: Carrot },
];

export const mockWeather: WeatherInfo = {
  location: 'Raipur, Chhattisgarh',
  temperature: 32,
  condition: 'Partly Cloudy',
  icon: Cloud,
  forecast: [
    { day: 'Tue', temp: 34, icon: Sun },
    { day: 'Wed', temp: 33, icon: Cloud },
    { day: 'Thu', temp: 28, icon: CloudRain },
  ],
};
