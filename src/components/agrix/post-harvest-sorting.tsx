'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Boxes } from 'lucide-react';

export default function PostHarvestSorting() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Boxes className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Post-Harvest Sorting</CardTitle>
        </div>
        <CardDescription>
          AI-powered machines to grade rice, fruits, and other produce for premium prices.
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
