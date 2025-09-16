'use client';
import { useState } from 'react';
import { getIrrigationAdvice } from '@/ai/flows/get-irrigation-advice';
import type { GetIrrigationAdviceOutput } from '@/ai/flows/get-irrigation-advice.types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Droplets, Loader2, Sparkles, Wind } from 'lucide-react';

export default function PrecisionIrrigation() {
  const [cropType, setCropType] = useState('');
  const [soilMoisture, setSoilMoisture] = useState(50);
  const [weatherForecast, setWeatherForecast] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<GetIrrigationAdviceOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropType || !weatherForecast) {
      toast({
        title: 'Input Required',
        description: 'Please fill out all fields.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    setAdvice(null);
    try {
      const result = await getIrrigationAdvice({
        cropType,
        soilMoistureLevel: soilMoisture,
        weatherForecast,
      });
      setAdvice(result);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not get irrigation advice. Please try again.',
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
          <Droplets className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Precision Irrigation</CardTitle>
        </div>
        <CardDescription>
          Optimize water usage with AI-powered schedules.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            placeholder="Enter crop type (e.g., Paddy)"
          />
          <div>
            <label className="text-sm font-medium">
              Soil Moisture: {soilMoisture}%
            </label>
            <Slider
              value={[soilMoisture]}
              onValueChange={(value) => setSoilMoisture(value[0])}
              max={100}
              step={1}
              className="mt-2"
            />
          </div>
          <div className="relative">
            <Wind className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={weatherForecast}
              onChange={(e) => setWeatherForecast(e.target.value)}
              placeholder="Weather forecast (e.g., Sunny, rain in 2 days)"
              className="pl-10"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            Get Watering Advice
          </Button>
        </form>

        {advice && (
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-lg">Recommendation:</h3>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-xl font-bold text-primary">
                {advice.recommendation}
              </p>
              <p className="font-semibold">{advice.amount}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {advice.reasoning}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
