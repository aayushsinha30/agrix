'use client';
import { useState } from 'react';
import { findFarmingSupplies } from '@/ai/flows/find-farming-supplies';
import type { FindFarmingSuppliesOutput } from '@/ai/flows/find-farming-supplies.types';
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
import { ShoppingBag, Loader2, Sparkles, ExternalLink } from 'lucide-react';

export default function Shop() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FindFarmingSuppliesOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
      toast({
        title: 'Input Required',
        description: 'Please enter what you are looking for.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const searchResult = await findFarmingSupplies({ query });
      setResult(searchResult);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not find supplies. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">Farming Supply Finder</CardTitle>
          </div>
          <CardDescription>
            Find pesticides, manure, and other supplies. We'll suggest products and potential sellers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'Urea fertilizer' or 'Pest control for tomatoes'"
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
              Find
            </Button>
          </form>

          {loading && (
            <div className="mt-6 text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <p className="mt-2">Searching for supplies...</p>
            </div>
          )}

          {result && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-lg">Product Suggestions:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.products.map((product, index) => (
                  <Card key={index} className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-lg">{product.productName}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    </CardContent>
                    <div className="p-4 pt-0">
                      <p className="font-bold text-primary text-lg">{product.estimatedPrice}</p>
                      <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-accent mt-2 inline-flex items-center gap-1">
                        View Seller <ExternalLink className="h-4 w-4" />
                      </a>
                      <p className="text-xs text-muted-foreground mt-1">({product.seller})</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
