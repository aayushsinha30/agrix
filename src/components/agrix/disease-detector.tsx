'use client';

import { useState, useRef } from 'react';
import { detectCropDisease } from '@/ai/flows/detect-crop-disease';
import type { DetectCropDiseaseOutput } from '@/ai/flows/detect-crop-disease.types';
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
import { Stethoscope, Loader2, Sparkles, Upload } from 'lucide-react';
import Image from 'next/image';
import { Progress } from '../ui/progress';

export default function DiseaseDetector() {
  const [cropDescription, setCropDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectCropDiseaseOutput | null>(null);
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
        description: 'Please upload a photo of the crop.',
        variant: 'destructive',
      });
      return;
    }
    if (!cropDescription) {
      toast({
        title: 'Input Required',
        description: 'Please provide a description of the crop.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const analysisResult = await detectCropDisease({
        photoDataUri: preview,
        cropDescription: cropDescription,
      });
      setResult(analysisResult);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not analyze the image. Please try again.',
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
          <Stethoscope className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Pest & Disease Detection</CardTitle>
        </div>
        <CardDescription>
          Upload a photo of a crop to detect diseases and get treatment advice.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="crop-photo" className="text-sm font-medium">
                Crop Photo
              </label>
              <div
                className="relative border-2 border-dashed border-muted rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Input
                  id="crop-photo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                {preview ? (
                  <Image
                    src={preview}
                    alt="Crop preview"
                    width={200}
                    height={200}
                    className="mx-auto rounded-md object-cover h-48 w-full"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-48">
                    <Upload className="w-10 h-10 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Click to upload an image
                    </p>
                    <p className="text-xs text-muted-foreground/80">
                      PNG, JPG, WEBP up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="crop-description" className="text-sm font-medium">
                  Crop Description
                </label>
                <Textarea
                  id="crop-description"
                  value={cropDescription}
                  onChange={(e) => setCropDescription(e.target.value)}
                  placeholder="Describe the crop and any visible symptoms (e.g., 'Yellow spots on tomato leaves')."
                  className="mt-1 min-h-[150px]"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Sparkles />
                )}
                Analyze Crop
              </Button>
            </div>
          </div>
        </form>

        {loading && (
          <div className="mt-6 text-center">
            <p>Analyzing image... this may take a moment.</p>
            <Loader2 className="mx-auto mt-2 h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-lg">Analysis Result:</h3>
            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Detected Disease
                </p>
                <p className="text-xl font-bold text-primary">
                  {result.diseaseName}
                </p>
              </div>
              {result.diseaseName !== 'None' && (
                <>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Confidence Level
                    </p>
                    <div className="flex items-center gap-2">
                      <Progress value={result.confidenceLevel * 100} className="w-full" />
                      <span className="font-mono text-sm font-semibold">
                        {(result.confidenceLevel * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Recommended Treatment
                    </p>
                    <p className="text-sm whitespace-pre-wrap">
                      {result.treatmentOptions}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
