'use client';
import { useState } from 'react';
import { findColdStorage } from '@/ai/flows/find-cold-storage';
import type { FindColdStorageOutput } from '@/ai/flows/find-cold-storage.types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Snowflake, Loader2, Sparkles, MapPin, Phone } from 'lucide-react';
import { Badge } from '../ui/badge';

export default function ColdStorageFinder() {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FindColdStorageOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) {
      toast({
        title: 'Input Required',
        description: 'Please enter a location to search for.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const searchResult = await findColdStorage({ location });
      setResult(searchResult);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not find cold storage facilities. Please try again.',
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
          <Snowflake className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Cold Storage Finder</CardTitle>
        </div>
        <CardDescription>
          Find cold storage units for your fruits and vegetables near you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <div className="relative w-full">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your city or district..."
              className="pl-10"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            Find
          </Button>
        </form>

        {loading && (
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-2">Searching for facilities...</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {result.facilities.map((facility, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{facility.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{facility.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{facility.contact}</span>
                  </div>
                   <div className="flex flex-wrap gap-2 pt-2">
                    {facility.suitableFor.map(item => <Badge key={item} variant="secondary">{item}</Badge>)}
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
