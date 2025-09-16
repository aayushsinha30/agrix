'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CookingPot } from 'lucide-react';

export default function ValueAddition() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CookingPot className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Value-Addition Support</CardTitle>
        </div>
        <CardDescription>
          AI-driven insights for processing crops into products like rice flour or dried fruits.
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
