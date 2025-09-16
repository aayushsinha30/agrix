export type FarmerProfile = {
  name: string;
  location: string;
  farmSize: number;
  soilType: string;
  mainCrops: string[];
  languagePreference: string;
};

export type MarketPrice = {
  crop: string;
  price: number;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
};

export type WeatherInfo = {
  location: string;
  temperature: number;
  condition: string;
  icon: React.ComponentType<{ className?: string }>;
  forecast: {
    day: string;
    temp: number;
    icon: React.ComponentType<{ className?: string }>;
  }[];
};

export type CommunityPost = {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
};

export type GovtScheme = {
  name: string;
  description: string;
  link: string;
};
