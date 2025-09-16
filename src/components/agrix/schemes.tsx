
'use client';
import { useState } from 'react';
import { getGovtSchemes } from '@/ai/flows/get-govt-schemes';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Landmark } from 'lucide-react';
import type { GovtScheme } from '@/lib/types';

export default function Schemes() {
  const [loading, setLoading] = useState(false);
  const [schemes, setSchemes] = useState<GovtScheme[]>([]);
  const { toast } = useToast();

  const handleFetchSchemes = async () => {
    setLoading(true);
    setSchemes([]);
    try {
      const result = await getGovtSchemes();
      setSchemes(result.schemes);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not fetch government schemes. Please try again.',
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
          <Landmark className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Government Schemes</CardTitle>
        </div>
        <CardDescription>
          Find relevant government schemes for your needs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleFetchSchemes}
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Sparkles />
          )}
          Find Schemes
        </Button>

        {schemes.length > 0 && (
          <div className="mt-6 space-y-4">
            {schemes.map((scheme, index) => (
              <div key={index} className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-bold text-primary">{scheme.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {scheme.description}
                </p>
                <a
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent mt-2 inline-block"
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
