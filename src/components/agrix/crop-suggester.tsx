'use client';

import { useState } from 'react';
import { suggestCropsProfit } from '@/ai/flows/suggest-crops-profit';
import type { SuggestCropsProfitOutput } from '@/ai/flows/suggest-crops-profit.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import type { FarmerProfile } from '@/lib/types';
import { Lightbulb, Loader2, Sparkles } from 'lucide-react';

interface CropSuggesterProps {
  farmerProfile: FarmerProfile;
}

export default function CropSuggester({ farmerProfile }: CropSuggesterProps) {
  const [seasonalInfo, setSeasonalInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] =
    useState<SuggestCropsProfitOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seasonalInfo) {
      toast({
        title: 'Input Required',
        description: 'Please provide seasonal information.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setSuggestions(null);
    try {
      const result = await suggestCropsProfit({
        farmerProfile,
        seasonalInfo,
      });
      setSuggestions(result);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not get suggestions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Lightbulb className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Smart Crop Selection</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="seasonalInfo" className="text-sm font-medium">
              Seasonal & Weather Info
            </label>
            <Input
              id="seasonalInfo"
              value={seasonalInfo}
              onChange={(e) => setSeasonalInfo(e.target.value)}
              placeholder="e.g., 'Upcoming rainy season, mild temperatures'"
              className="mt-1"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Sparkles />
            )}
            Get Suggestions
          </Button>
        </form>

        {loading && (
          <div className="mt-4 text-center">
            <p>Analyzing... please wait.</p>
          </div>
        )}

        {suggestions && suggestions.suggestedCrops.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-lg">Recommended Crops:</h3>
            <ul className="space-y-4">
              {suggestions.suggestedCrops.map((crop, index) => (
                <li key={index} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-primary">{crop.cropName}</p>
                    <p className="font-semibold text-accent">
                      ~{crop.profitMargin}% Profit
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {crop.reasons}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
