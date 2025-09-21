"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  orderDescription: z.string().min(1, "Order description is required."),
  contactEmail: z.string().email("A valid email is required."),
  name: z.string().min(1, "Your name is required."),
  offer: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive("Offer must be a positive number.")
  ),
});

export default function Home() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderDescription: "",
      contactEmail: "",
      name: "",
      offer: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you'd send this to a backend or webhook.
    console.log(values);
    toast({
      title: "Order Placed!",
      description: "Your custom order has been submitted.",
    });
    form.reset();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <header className="text-center mb-10">
        <h1 className="text-2xl font-medium tracking-widest uppercase text-foreground/80">
          Curated and Co
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Bespoke orders, curated for you.
        </p>
      </header>
      
      <main className="w-full max-w-md bg-card border border-border/50 rounded-lg p-6 md:p-8 shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-6">
          Place a Custom Order
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="orderDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., A vintage leather-bound journal, a set of hand-poured scented candles..."
                      className="bg-input border-border/70 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      className="bg-input border-border/70 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      className="bg-input border-border/70 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="offer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Offer (in $)</FormLabel>
                  <FormControl>
                     <Input
                        type="number"
                        placeholder="100"
                        className="bg-input border-border/70 text-base"
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full font-bold text-lg py-3 rounded-md">
              Place Order
            </Button>
          </form>
        </Form>
      </main>

      <footer className="mt-8 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Curated and Co - All rights reserved</p>
      </footer>
    </div>
  );
}
