'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { FarmerProfile } from '@/lib/types';
import { User, Edit } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  location: z.string().min(2, 'Location is required'),
  farmSize: z.coerce.number().positive('Farm size must be positive'),
  soilType: z.string().min(2, 'Soil type is required'),
  mainCrops: z.string().min(2, 'Enter at least one crop'),
  languagePreference: z.string().min(2, 'Language is required'),
});

interface FarmerProfileProps {
  profile: FarmerProfile;
  onUpdate: (profile: FarmerProfile) => void;
}

export default function FarmerProfile({
  profile,
  onUpdate,
}: FarmerProfileProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...profile,
      mainCrops: profile.mainCrops.join(', '),
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    onUpdate({
      ...values,
      mainCrops: values.mainCrops.split(',').map((s) => s.trim()),
    });
    toast({
      title: 'Profile Updated',
      description: 'Your information has been saved.',
    });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <User className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Farmer Profile</CardTitle>
        </div>
        <CardDescription>
          Keep your information up-to-date for better recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Chhattisgarh" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="farmSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Farm Size (acres)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="soilType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soil Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Loamy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="mainCrops"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Crops (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Rice, Wheat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              <Edit />
              Update Profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
