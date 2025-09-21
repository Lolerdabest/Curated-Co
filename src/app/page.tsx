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
import Link from 'next/link';

const formSchema = z.object({
  orderDescription: z.string().min(1, "Order description is required."),
  minecraftUsername: z.string().min(1, "Minecraft username is required."),
  discordId: z.string().min(1, "Discord ID is required."),
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
      minecraftUsername: "",
      discordId: "",
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
        <h1 className="text-5xl font-headline text-shadow" style={{textShadow: '0 0 10px hsl(var(--foreground))'}}>
          Curated and Co
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          order anything from a to z very cheap and fast
        </p>
      </header>
      
      <main className="w-full max-w-md bg-card border border-border/50 rounded-lg p-6 md:p-8 shadow-lg">
        <h2 className="text-3xl font-headline text-center mb-6 text-primary" style={{textShadow: '0 0 10px hsl(var(--primary))'}}>
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
                      placeholder="e.g., Bulk order: 2 shulkers of iron blocks, 15 Mending books, etc."
                      className="bg-input border-border/70"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minecraftUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minecraft Username *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="YourUsername"
                      className="bg-input border-border/70"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discordId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discord ID *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username#1234"
                      className="bg-input border-border/70"
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
                     <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">$</span>
                        <Input
                          type="number"
                          placeholder="0"
                          className="bg-input border-border/70 pl-7"
                          {...field}
                        />
                      </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full font-headline text-lg py-6 rounded-md text-white">
              Place Order
            </Button>
          </form>
        </Form>
      </main>
      
      <nav className="mt-8">
        <Link href="/rentals" className="text-primary hover:underline">
          View Rentals
        </Link>
      </nav>

      <footer className="mt-8 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Curated and Co - All rights reserved</p>
      </footer>
    </div>
  );
}
