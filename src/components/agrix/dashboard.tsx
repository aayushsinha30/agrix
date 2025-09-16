'use client';

import { useState } from 'react';
import type { FarmerProfile as FarmerProfileType } from '@/lib/types';
import Header from './header';
import FarmerProfile from './farmer-profile';
import WeatherWidget from './weather-widget';
import MarketPrices from './market-prices';
import CropSuggester from './crop-suggester';
import DiseaseDetector from './disease-detector';

const LandscapeBackground = () => (
  <div
    aria-hidden="true"
    className="absolute bottom-0 left-0 right-0 h-48 -z-10 w-full overflow-hidden opacity-40"
  >
    <svg
      className="absolute bottom-0 left-0 w-full h-auto"
      viewBox="0 0 1440 320"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="hsl(var(--primary) / 0.1)"
        d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,154.7C672,128,768,96,864,106.7C960,117,1056,171,1152,181.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
      <path
        fill="hsl(var(--primary) / 0.2)"
        d="M0,256L80,240C160,224,320,192,480,192C640,192,800,224,960,218.7C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      ></path>
    </svg>
  </div>
);

export default function AgrixDashboard() {
  const [profile, setProfile] = useState<FarmerProfileType>({
    name: 'Alex Farmer',
    location: 'Green Valley',
    farmSize: 50,
    soilType: 'Loamy',
    mainCrops: ['Corn', 'Wheat'],
    languagePreference: 'English',
  });

  return (
    <div className="min-h-screen bg-background text-foreground relative isolate">
      <Header />
      <main className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-1 flex flex-col gap-6 md:gap-8">
            <FarmerProfile profile={profile} onUpdate={setProfile} />
            <WeatherWidget />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
            <MarketPrices />
            <CropSuggester farmerProfile={profile} />
          </div>
        </div>
        <DiseaseDetector />
      </main>
      <LandscapeBackground />
    </div>
  );
}
