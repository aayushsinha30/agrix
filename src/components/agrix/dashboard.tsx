'use client';

import { useState } from 'react';
import type { FarmerProfile as FarmerProfileType } from '@/lib/types';
import Header from './header';
import FarmerProfile from './farmer-profile';
import WeatherWidget from './weather-widget';
import MarketPrices from './market-prices';
import CropSuggester from './crop-suggester';
import DiseaseDetector from './disease-detector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Activity,
  DollarSign,
  LayoutGrid,
  MessagesSquare,
  ShoppingBag,
  Tractor,
} from 'lucide-react';
import PricePredictor from './price-predictor';
import Community from './community';
import PestControl from './pest-control';
import Schemes from './schemes';
import PrecisionIrrigation from './precision-irrigation';
import PostHarvestSorting from './post-harvest-sorting';
import LivestockManagement from './livestock-management';
import SmartInsurance from './smart-insurance';
import ValueAddition from './value-addition';
import Shop from './shop';
import ColdStorageFinder from './cold-storage-finder';
import ProfitLossTracker from './profit-loss-tracker';

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
    location: 'Chhattisgarh',
    farmSize: 50,
    soilType: 'Loamy',
    mainCrops: ['Rice', 'Wheat'],
    languagePreference: 'English',
  });

  return (
    <div className="min-h-screen bg-background text-foreground relative isolate">
      <Header />
      <main className="p-4 md:p-6 lg:p-8">
        <Tabs defaultValue="dashboard">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">
              <LayoutGrid className="mr-2" /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="markets">
              <Activity className="mr-2" /> Markets
            </TabsTrigger>
            <TabsTrigger value="finance">
              <DollarSign className="mr-2" /> Finance
            </TabsTrigger>
            <TabsTrigger value="services">
              <Tractor className="mr-2" /> Farm Services
            </TabsTrigger>
             <TabsTrigger value="shop">
              <ShoppingBag className="mr-2" /> Shop
            </TabsTrigger>
            <TabsTrigger value="community">
              <MessagesSquare className="mr-2" /> Community
            </TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <div className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-1 flex flex-col gap-6 md:gap-8">
                  <FarmerProfile profile={profile} onUpdate={setProfile} />
                  <WeatherWidget />
                </div>
                <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
                  <CropSuggester farmerProfile={profile} />
                  <DiseaseDetector />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="markets">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <MarketPrices />
              <PricePredictor />
            </div>
          </TabsContent>
          <TabsContent value="finance">
            <ProfitLossTracker />
          </TabsContent>
          <TabsContent value="services">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <PestControl />
              <Schemes />
              <PrecisionIrrigation />
              <PostHarvestSorting />
              <LivestockManagement />
              <SmartInsurance />
              <ValueAddition />
              <ColdStorageFinder />
            </div>
          </TabsContent>
           <TabsContent value="shop">
            <Shop />
          </TabsContent>
          <TabsContent value="community">
            <Community />
          </TabsContent>
        </Tabs>
      </main>
      <LandscapeBackground />
    </div>
  );
}
