'use client';

import { useState, useRef } from 'react';
import { getSoilBasedRecommendations } from '@/ai/flows/get-soil-based-recommendations';
import type { GetSoilBasedRecommendationsOutput } from '@/ai/flows/get-soil-based-recommendations.types';
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
import {
  FileText,
  Loader2,
  Sparkles,
  Upload,
  DollarSign,
  Leaf,
} from 'lucide-react';
import Image from 'next/image';

export default function SoilAnalysisRecommender() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] =
    useState<GetSoilBasedRecommendationsOutput | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !preview) {
      toast({
        title: 'Input Required',
        description: 'Please upload a photo of your soil test report.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const analysisResult = await getSoilBasedRecommendations({
        reportPhotoDataUri: preview,
      });
      setResult(analysisResult);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not analyze the report. Please try again.',
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
          <FileText className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Soil Health Analysis</CardTitle>
        </div>
        <CardDescription>
          Upload your soil test report to get crop and income-boosting
          recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            className="relative border-2 border-dashed border-muted rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Input
              id="report-photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
            {preview ? (
              <Image
                src={preview}
                alt="Soil report preview"
                width={200}
                height={200}
                className="mx-auto rounded-md object-cover h-48 w-full"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-48">
                <Upload className="w-10 h-10 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Click to upload your report
                </p>
                <p className="text-xs text-muted-foreground/80">
                  PNG, JPG, or PDF as image
                </p>
              </div>
            )}
          </div>
          <Button
            type="submit"
            disabled={loading || !file}
            className="w-full"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            Analyze & Recommend
          </Button>
        </form>

        {loading && (
          <div className="mt-6 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-2">Analyzing soil report...</p>
          </div>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-lg">
              Crop & Profit Recommendations:
            </h3>
            {result.recommendations.map((rec, index) => (
              <Card key={index} className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-primary text-xl">
                    {rec.cropName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 font-semibold text-sm">
                      <Leaf className="h-4 w-4 text-green-500" />
                      <span>Soil Suitability</span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      {rec.suitabilityReason}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 font-semibold text-sm">
                      <DollarSign className="h-4 w-4 text-amber-500" />
                      <span>Profit Strategy</span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      {rec.profitStrategy}
                    </p>
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
