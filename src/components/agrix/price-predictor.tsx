'use client';

import { useState } from 'react';
import { predictMarketPrice } from '@/ai/flows/predict-market-price';
import type { PredictMarketPriceOutput } from '@/ai/flows/predict-market-price.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Loader2, Sparkles } from 'lucide-react';
import { Progress } from '../ui/progress';

const crops = ['Rice', 'Wheat', 'Corn', 'Gram'];
const locations = ['Raipur', 'Bilaspur', 'Durg', 'Rajnandgaon'];
const horizons = ['Next 7 Days', 'Next 15 Days', 'Next 30 Days'];

export default function PricePredictor() {
  const [cropName, setCropName] = useState('');
  const [location, setLocation] = useState('');
  const [timeHorizon, setTimeHorizon] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictMarketPriceOutput | null>(
    null
  );
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropName || !location || !timeHorizon) {
      toast({
        title: 'Input Required',
        description: 'Please fill out all fields for a prediction.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setPrediction(null);
    try {
      const result = await predictMarketPrice({
        cropName,
        location,
        timeHorizon,
      });
      setPrediction(result);
    } catch (error)
      {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not get price prediction. Please try again.',
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
          <LineChart className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">
            Market Price Prediction
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="cropName" className="text-sm font-medium">
                Crop
              </label>
              <Select value={cropName} onValueChange={setCropName}>
                <SelectTrigger id="cropName" className="mt-1">
                  <SelectValue placeholder="Select a crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop} value={crop}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="location" className="text-sm font-medium">
                Mandi Location
              </label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger id="location" className="mt-1">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="timeHorizon" className="text-sm font-medium">
                Forecast Period
              </label>
              <Select value={timeHorizon} onValueChange={setTimeHorizon}>
                <SelectTrigger id="timeHorizon" className="mt-1">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  {horizons.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            Forecast Price
          </Button>
        </form>

        {loading && (
          <div className="mt-6 text-center">
            <p>Forecasting prices... please wait.</p>
            <Loader2 className="mx-auto mt-2 h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {prediction && (
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-lg">Price Forecast:</h3>
            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Predicted Price Range (per quintal)
                </p>
                <p className="text-2xl font-bold text-primary">
                  ₹{prediction.predictedPriceMin.toFixed(2)} - ₹
                  {prediction.predictedPriceMax.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Confidence
                </p>
                <div className="flex items-center gap-2">
                  <Progress
                    value={prediction.confidenceScore * 100}
                    className="w-full"
                  />
                  <span className="font-mono text-sm font-semibold">
                    {(prediction.confidenceScore * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Analysis
                </p>
                <p className="text-sm whitespace-pre-wrap">
                  {prediction.reasoning}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
