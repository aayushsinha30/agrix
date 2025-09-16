'use client';
import { useState } from 'react';
import { getLivestockAdvice } from '@/ai/flows/get-livestock-advice';
import type { GetLivestockAdviceOutput } from '@/ai/flows/get-livestock-advice.types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Beef, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { Badge } from '../ui/badge';

export default function LivestockManagement() {
  const [animalType, setAnimalType] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GetLivestockAdviceOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!animalType || !symptoms) {
      toast({
        title: 'Input Required',
        description: 'Please fill out all fields.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const advice = await getLivestockAdvice({ animalType, symptoms });
      setResult(advice);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not get livestock advice. Please try again.',
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
          <Beef className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Livestock Management</CardTitle>
        </div>
        <CardDescription>
          Get AI-driven health advice for your cattle, goats, and poultry.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={animalType}
            onChange={(e) => setAnimalType(e.target.value)}
            placeholder="Animal type (e.g., Cow, Goat)"
          />
          <Textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe symptoms (e.g., 'Not eating, has a fever')"
            className="min-h-[100px]"
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            Get Health Advice
          </Button>
        </form>

        {result && (
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Potential Issues</h3>
              <div className="space-y-2 mt-2">
                {result.possibleIssues.map((issue, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                    <span>{issue.issue}</span>
                    <Badge variant={issue.confidence === 'High' ? 'destructive' : 'secondary'}>{issue.confidence}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Immediate Actions</h3>
              <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                {result.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
              </ul>
            </div>

            <div className="p-3 bg-destructive/10 border-l-4 border-destructive text-destructive-foreground rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <p className="text-xs font-semibold">{result.disclaimer}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
