'use client';

import { useState } from 'react';
import { getProfitImprovementAdvice } from '@/ai/flows/get-profit-improvement-advice';
import type { GetProfitImprovementAdviceOutput } from '@/ai/flows/get-profit-improvement-advice.types';
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
import { DollarSign, TrendingUp, TrendingDown, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProfitLossTracker() {
  const [cropName, setCropName] = useState('');
  const [expenses, setExpenses] = useState('');
  const [revenue, setRevenue] = useState('');
  const [profit, setProfit] = useState<number | null>(null);
  const [advice, setAdvice] = useState<GetProfitImprovementAdviceOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const exp = parseFloat(expenses);
    const rev = parseFloat(revenue);
    if (isNaN(exp) || isNaN(rev)) {
      toast({
        title: 'Invalid Numbers',
        description: 'Please enter valid numbers for expenses and revenue.',
        variant: 'destructive',
      });
      return;
    }
    setProfit(rev - exp);
    setAdvice(null); // Clear previous advice
  };

  const handleGetAdvice = async () => {
    if (profit === null || !cropName) {
      toast({
        title: 'Input Required',
        description:
          'Please calculate profit and enter a crop name before getting advice.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    setAdvice(null);
    try {
      const result = await getProfitImprovementAdvice({
        cropName,
        totalExpenses: parseFloat(expenses),
        totalRevenue: parseFloat(revenue),
      });
      setAdvice(result);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not get advice. Please try again.',
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
            <DollarSign className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">Profit & Loss Tracker</CardTitle>
          </div>
          <CardDescription>
            Calculate your profitability and get AI tips to improve it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCalculate} className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                placeholder="Crop name (e.g., Rice)"
                required
              />
              <Input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                placeholder="Total Expenses (₹)"
                required
              />
              <Input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                placeholder="Total Revenue (₹)"
                required
              />
            </div>
            <Button type="submit" className="w-full">Calculate Profit/Loss</Button>
          </form>

          {profit !== null && (
            <div className="text-center p-6 bg-muted/50 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground">
                Net Profit / Loss
              </p>
              <p
                className={cn(
                  'text-4xl font-bold',
                  profit >= 0 ? 'text-green-500' : 'text-red-500'
                )}
              >
                ₹{profit.toLocaleString()}
              </p>
            </div>
          )}

          {profit !== null && (
            <div className="text-center">
              <Button onClick={handleGetAdvice} disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                How can I increase my profit?
              </Button>
            </div>
          )}

          {advice && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-lg">AI Profitability Advice:</h3>
              <ul className="space-y-3">
                {advice.suggestions.map((suggestion, index) => (
                  <li key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                      {suggestion.impact === 'High' ? <TrendingUp className="h-5 w-5 text-green-500" /> : <TrendingDown className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div>
                        <p className="font-semibold">{suggestion.advice}</p>
                         <p className="text-xs text-muted-foreground mt-1">Potential Impact: {suggestion.impact}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
