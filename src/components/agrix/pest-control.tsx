
'use client';
import { useState } from 'react';
import { getPestControlAdvice } from '@/ai/flows/get-pest-control-advice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Bug, Loader2, Sparkles } from 'lucide-react';

export default function PestControl() {
  const [cropName, setCropName] = useState('');
  const [pestDescription, setPestDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropName || !pestDescription) {
      toast({
        title: 'Input Required',
        description: 'Please provide both crop name and pest description.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setAdvice(null);
    try {
      const result = await getPestControlAdvice({
        cropName,
        pestDescription,
      });
      setAdvice(result.advice);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not get pest control advice. Please try again.',
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
          <Bug className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Smart Pest Control</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
            placeholder="Enter crop name (e.g., Rice)"
          />
          <Input
            value={pestDescription}
            onChange={(e) => setPestDescription(e.target.value)}
            placeholder="Describe the pest (e.g., Small yellow insects)"
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            Get Advice
          </Button>
        </form>

        {advice && (
          <div className="mt-6">
            <h3 className="font-semibold">Our Advice:</h3>
            <p className="text-sm mt-2">{advice}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
