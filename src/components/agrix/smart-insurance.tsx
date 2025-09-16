'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { assessCropDamage } from '@/ai/flows/assess-crop-damage';
import type { AssessCropDamageOutput } from '@/ai/flows/assess-crop-damage.types';
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
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Shield, Loader2, Sparkles, Upload, AlertTriangle } from 'lucide-react';
import { Badge } from '../ui/badge';

export default function SmartInsurance() {
  const [formState, setFormState] = useState({
    cropType: '',
    damageCause: '',
    description: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AssessCropDamageOutput | null>(null);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !preview || !formState.cropType || !formState.damageCause || !formState.description) {
      toast({
        title: 'Input Required',
        description: 'Please fill out all fields and upload a photo.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const assessment = await assessCropDamage({
        ...formState,
        photoDataUri: preview,
      });
      setResult(assessment);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not assess damage. Please try again.',
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
          <Shield className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Smart Insurance</CardTitle>
        </div>
        <CardDescription>
          Get a preliminary assessment for your insurance claim.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            className="relative border-2 border-dashed border-muted rounded-lg p-4 text-center cursor-pointer hover:border-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
            {preview ? (
              <Image
                src={preview}
                alt="Damage preview"
                width={200}
                height={150}
                className="mx-auto rounded-md object-cover h-36 w-full"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-36">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Upload Photo of Damage
                </p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
             <Input name="cropType" value={formState.cropType} onChange={handleChange} placeholder="Crop (e.g., Wheat)" />
             <Input name="damageCause" value={formState.damageCause} onChange={handleChange} placeholder="Cause (e.g., Hailstorm)" />
          </div>
          <Textarea name="description" value={formState.description} onChange={handleChange} placeholder="Describe the damage..." />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            Assess Damage
          </Button>
        </form>

        {result && (
          <div className="mt-6 space-y-4">
             <h3 className="font-semibold text-lg">Preliminary Assessment:</h3>
             <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Claim Eligibility</p>
                    <Badge variant={result.claimEligibility.includes('High') ? 'default' : 'secondary'}>{result.claimEligibility}</Badge>
                </div>
                <div>
                    <p className="text-sm font-medium">Estimated Damage</p>
                    <div className="flex items-center gap-2">
                      <Progress value={result.estimatedDamagePercentage} className="w-full" />
                      <span className="font-mono text-sm font-semibold">
                        {result.estimatedDamagePercentage.toFixed(0)}%
                      </span>
                    </div>
                </div>
                <div>
                    <p className="text-sm font-medium">Next Steps</p>
                    <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                        {result.nextSteps.map((step, i) => <li key={i}>{step}</li>)}
                    </ul>
                </div>
             </div>
             <div className="p-3 bg-accent/10 border-l-4 border-accent text-accent-foreground rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 text-accent" />
                <p className="text-xs font-semibold">{result.disclaimer}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
