"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from 'next/image';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitOrder } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const checkoutSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  discountCode: z.string().optional(),
});

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart, cartCount } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      discountCode: "",
    },
  });

  useEffect(() => {
    if (cartCount === 0) {
      router.replace('/');
    }
  }, [cartCount, router]);

  const onSubmit = async (values: z.infer<typeof checkoutSchema>) => {
    const result = await submitOrder(cart, totalPrice, values);
    if (result.success) {
      toast({
        title: "Order Placed!",
        description: "Your order has been successfully submitted.",
      });
      clearCart();
      router.push("/order-success");
    } else {
      toast({
        variant: "destructive",
        title: "Order Failed",
        description: result.message,
      });
    }
  };

  if (cartCount === 0) {
    return null; // or a loading state
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 font-headline">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping Address</FormLabel>
                      <FormControl><Input placeholder="123 Main St, Anytown, USA" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="discountCode" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Code (Optional)</FormLabel>
                      <FormControl><Input placeholder="SAVE10" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Placing Order...' : `Place Order - $${totalPrice.toFixed(2)}`}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map(item => {
              const image = PlaceHolderImages.find(img => img.id === item.imageId);
              return (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative">
                    {image && <Image src={image.imageUrl} alt={item.name} width={64} height={64} className="rounded-md" data-ai-hint={image.imageHint} />}
                    <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs rounded-full bg-primary text-primary-foreground">{item.quantity}</span>
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{item.name}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              )
            })}
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
