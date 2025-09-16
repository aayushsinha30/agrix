'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { gradeProduce } from '@/ai/flows/grade-produce';
import type { GradeProduceOutput } from '@/ai/flows/grade-produce.types';
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
import { Boxes, Loader2, Sparkles, Upload, CheckCircle } from 'lucide-react';

export default function PostHarvestSorting() {
  const [produceType, setProduceType] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GradeProduceOutput | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult(null);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !preview || !produceType) {
      toast({
        title: 'Input Required',
        description: 'Please upload a photo and enter the produce type.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const analysisResult = await gradeProduce({
        photoDataUri: preview,
        produceType,
      });
      setResult(analysisResult);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not grade the produce. Please try again.',
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
          <Boxes className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Post-Harvest Sorting</CardTitle>
        </div>
        <CardDescription>
          AI-powered grading for rice, fruits, and other produce.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            className="relative border-2 border-dashed border-muted rounded-lg p-4 text-center cursor-pointer hover:border-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <Input
              id="produce-photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
            {preview ? (
              <Image
                src={preview}
                alt="Produce preview"
                width={200}
                height={150}
                className="mx-auto rounded-md object-cover h-36 w-full"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-36">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Upload Produce Image
                </p>
              </div>
            )}
          </div>
          <Input
            value={produceType}
            onChange={(e) => setProduceType(e.target.value)}
            placeholder="Enter produce type (e.g., Tomato)"
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            Grade Produce
          </Button>
        </form>

        {result && (
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-lg">Grading Result:</h3>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-xl font-bold text-primary">{result.grade}</p>
              <ul className="mt-2 space-y-1">
                {result.reasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
