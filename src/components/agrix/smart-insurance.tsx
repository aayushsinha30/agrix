'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldHalf } from 'lucide-react';

export default function SmartInsurance() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <ShieldHalf className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Smart Insurance & Loans</CardTitle>
        </div>
        <CardDescription>
          Get faster claim approvals and access to loans with AI-powered risk assessment.
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
