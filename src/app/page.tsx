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
import { submitCustomOrder } from "./actions";

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
    const result = await submitCustomOrder(values);

    if (result.success) {
      toast({
        title: "Order Placed!",
        description: "Your custom order has been submitted.",
      });
      form.reset();
    } else {
       toast({
        variant: "destructive",
        title: "Order Failed",
        description: result.message || "An unknown error occurred.",
      });
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
       <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-xl font-headline text-primary" style={{textShadow: '0 0 5px hsl(var(--primary))'}}>
              C & Co
            </h1>
          </Link>
          <nav>
            <Button variant="default" asChild>
                <Link href="/rentals">Rentals</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-headline text-shadow whitespace-nowrap" style={{textShadow: '0 0 10px hsl(var(--foreground))'}}>
            Curated and Co
          </h1>
          <p className="mt-4 text-lg text-foreground/80">
            order anything from a to z very cheap and fast
          </p>
        </div>
        
        <div className="w-full max-w-md bg-card border border-border/50 rounded-lg p-6 md:p-8 shadow-lg">
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
                            onChange={event => field.onChange(+event.target.value)}
                          />
                        </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full font-headline text-lg py-6 rounded-md" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Placing Order...' : 'Place Order'}
              </Button>
            </form>
          </Form>
        </div>
      </main>
      
      <footer className="py-6 text-center text-xs text-muted-foreground border-t border-border/50 z-10">
        <p>&copy; {new Date().getFullYear()} Curated and Co - All rights reserved</p>
      </footer>
    </div>
  );
}
