import { mockWeather } from '@/lib/mock-data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { ThermometerSun } from 'lucide-react';
import { Separator } from '../ui/separator';

export default function WeatherWidget() {
  const weather = mockWeather;
  const CurrentIcon = weather.icon;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <ThermometerSun className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Weather Forecasting</CardTitle>
        </div>
         <CardDescription>
          AI-powered weather predictions for better planning.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="text-left">
            <p className="text-muted-foreground">{weather.location}</p>
            <p className="text-5xl font-bold">{weather.temperature}°C</p>
            <p className="text-lg text-muted-foreground">{weather.condition}</p>
          </div>
          <CurrentIcon className="w-24 h-24 text-accent" />
        </div>
        <Separator />
        <div className="flex justify-around text-center">
          {weather.forecast.map((day, index) => {
            const ForecastIcon = day.icon;
            return (
              <div key={index} className="flex flex-col items-center gap-1">
                <p className="font-semibold text-muted-foreground">
                  {day.day}
                </p>
                <ForecastIcon className="w-8 h-8 text-muted-foreground" />
                <p className="font-bold">{day.temp}°</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
