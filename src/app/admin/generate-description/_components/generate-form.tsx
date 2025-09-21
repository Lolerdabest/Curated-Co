"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { generateDescriptionAction } from "../actions";
import { Wand2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  productName: z.string().min(2, "Product name is required"),
  category: z.string().min(2, "Category is required"),
  keyFeatures: z.string().min(10, "List at least one key feature"),
  targetAudience: z.string().min(3, "Describe the target audience"),
});

export function GenerateForm() {
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      category: "",
      keyFeatures: "",
      targetAudience: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedDescription("");
    const result = await generateDescriptionAction(values);
    setIsLoading(false);

    if (result.success && result.description) {
      setGeneratedDescription(result.description);
      toast({
        title: "Description Generated!",
        description: "The AI has created a new product description.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: result.message || "An unknown error occurred.",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Ergonomic Office Chair" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Furniture" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keyFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Features</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Adjustable lumbar support, breathable mesh, 4D armrests" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a few key features, separated by commas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Audience</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Remote workers, gamers" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              <Wand2 className="mr-2 h-4 w-4" />
              {isLoading ? "Generating..." : "Generate Description"}
            </Button>
          </form>
        </Form>
        
        {(isLoading || generatedDescription) && (
            <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Generated Description</h3>
                {isLoading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ) : (
                    <Textarea
                        readOnly
                        value={generatedDescription}
                        className="min-h-[150px] bg-muted"
                    />
                )}
            </div>
        )}
      </CardContent>
    </Card>
  );
}
