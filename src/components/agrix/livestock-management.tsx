'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Beef } from 'lucide-react';

export default function LivestockManagement() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Beef className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Livestock Management</CardTitle>
        </div>
        <CardDescription>
          Monitor cattle health, track milk yield, and optimize your livestock operations.
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
