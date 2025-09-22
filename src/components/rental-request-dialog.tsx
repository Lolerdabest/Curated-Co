"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import type { RentalItem } from '@/lib/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitRentalRequest } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { useState, type ReactNode } from 'react';

const rentalSchema = z.object({
    minecraftUsername: z.string().min(1, "Minecraft username is required."),
    discordId: z.string().min(1, "Discord ID is required."),
    rentalDate: z.date({ required_error: "Please select a date." }),
});

interface RentalRequestDialogProps {
  item: RentalItem;
  children: ReactNode;
}

export function RentalRequestDialog({ item, children }: RentalRequestDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof rentalSchema>>({
    resolver: zodResolver(rentalSchema),
    defaultValues: { minecraftUsername: "", discordId: "" },
  });

  const onSubmit = async (values: z.infer<typeof rentalSchema>) => {
    const result = await submitRentalRequest(item, values);
    if (result.success) {
      toast({
        title: "Request Submitted",
        description: "Your rental request has been sent. We will contact you shortly with details.",
      });
      setOpen(false);
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Request Failed",
        description: result.message || "An unknown error has occurred.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request to Rent: {item.name}</DialogTitle>
          <DialogDescription>
            Please provide your details below to request this item.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="minecraftUsername" render={({ field }) => (
              <FormItem>
                <FormLabel>Minecraft Username</FormLabel>
                <FormControl><Input placeholder="YourUsername" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="discordId" render={({ field }) => (
              <FormItem>
                <FormLabel>Discord ID</FormLabel>
                <FormControl><Input placeholder="your_discord_username" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="rentalDate" render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Rental Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter className="flex-col gap-2 !justify-normal">
              <p className="text-xs text-muted-foreground text-center">You will be contacted via Discord with further details. All rentals require signing a contract.</p>
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Submitting...' : 'Order the Rent'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
