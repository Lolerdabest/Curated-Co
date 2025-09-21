"use server";

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { CartItem, RentalItem } from './lib/types';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  discountCode: z.string().optional(),
});

export async function submitOrder(cart: CartItem[], totalPrice: number, data: unknown) {
  const parsed = checkoutSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: 'Invalid form data.', errors: parsed.error.flatten().fieldErrors };
  }

  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('WEBHOOK_URL is not defined in environment variables.');
    return { success: false, message: 'Server configuration error. Could not process order.' };
  }

  const payload = {
    ...parsed.data,
    items: cart,
    totalPrice: totalPrice,
    orderDate: new Date().toISOString(),
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Webhook failed with status ${response.status}`);
    }

    revalidatePath('/');
    revalidatePath('/checkout');
    return { success: true, message: 'Order placed successfully!' };
  } catch (error) {
    console.error('Failed to submit order to webhook:', error);
    return { success: false, message: 'Failed to place order. Please try again later.' };
  }
}

const rentalSchema = z.object({
  minecraftUsername: z.string().min(1, 'Minecraft username is required.'),
  discordId: z.string().min(1, 'Discord ID is required.'),
  rentalDate: z.date({ required_error: 'Please select a date.' }),
});

export async function submitRentalRequest(item: RentalItem, data: unknown) {
  const parsed = rentalSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: 'Invalid form data.', errors: parsed.error.flatten().fieldErrors };
  }

  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('WEBHOOK_URL is not defined in environment variables.');
    return { success: false, message: 'Server configuration error. Could not process request.' };
  }

  const payload = {
    ...parsed.data,
    item,
    requestDate: new Date().toISOString(),
  };
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Webhook failed with status ${response.status}`);
    }
    
    return { success: true, message: 'Rental request submitted!' };
  } catch (error) {
    console.error('Failed to submit rental request:', error);
    return { success: false, message: 'Failed to submit request. Please try again.' };
  }
}
