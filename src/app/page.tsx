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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white font-pixel">
      <header className="text-center mb-8">
        <h1 
          className="text-5xl md:text-7xl font-bold uppercase"
          style={{ textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff' }}
        >
          lolers<br/>hustle
        </h1>
        <p className="mt-4 text-sm text-gray-300 tracking-wider">
          order anything from a to z very cheap and fast
        </p>
      </header>
      
      <main className="w-full max-w-md bg-black bg-opacity-50 border border-red-800 rounded-lg p-6 md:p-8">
        <h2 className="text-2xl text-red-500 font-bold text-center mb-6">
          Place a Custom Order
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="orderDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-gray-400">Order Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Bulk order: 2 shulkers of iron blocks, 15 Mending books, etc."
                      className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 text-sm"
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
                  <FormLabel className="text-xs text-gray-400">Minecraft Username *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="YourUsername"
                      className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 text-sm"
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
                  <FormLabel className="text-xs text-gray-400">Discord ID *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username#1234"
                      className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 text-sm"
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
                  <FormLabel className="text-xs text-gray-400">Your Offer (in R$) *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0"
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 text-sm pl-3 pr-8"
                        {...field}
                      />
                      <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 text-sm">R$</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-3 rounded-md">
              Place Order
            </Button>
          </form>
        </Form>
      </main>

      <footer className="mt-8 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} lolers hustle - All rights reserved</p>
      </footer>
    </div>
  );
}
