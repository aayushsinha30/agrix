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
  { crop: 'Wheat', price: 250, change: 2.5, icon: Wheat },
  { crop: 'Corn', price: 180, change: -1.2, icon: Sprout },
  { crop: 'Apples', price: 150, change: 5.1, icon: Apple },
  { crop: 'Carrots', price: 80, change: -3.4, icon: Carrot },
];

export const mockWeather: WeatherInfo = {
  location: 'Green Valley',
  temperature: 24,
  condition: 'Sunny',
  icon: Sun,
  forecast: [
    { day: 'Tue', temp: 26, icon: Sun },
    { day: 'Wed', temp: 22, icon: Cloud },
    { day: 'Thu', temp: 19, icon: CloudRain },
  ],
};
