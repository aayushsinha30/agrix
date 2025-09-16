'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplets } from 'lucide-react';

export default function PrecisionIrrigation() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Droplets className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Precision Irrigation</CardTitle>
        </div>
        <CardDescription>
          Optimize water usage and reduce costs with AI-powered irrigation schedules.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button disabled className="w-full">
          Coming Soon
        </Button>
      </CardContent>
    </Card>
  );
}
