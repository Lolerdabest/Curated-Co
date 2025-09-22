"use server";

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { RentalItem } from './lib/types';
import { format } from 'date-fns';

const orderSchema = z.object({
  orderDescription: z.string().min(1, "Order description is required."),
  minecraftUsername: z.string().min(1, "Minecraft username is required."),
  discordId: z.string().min(1, "Discord ID is required."),
  offer: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive("Offer must be a positive number.")
  ),
});

export async function submitCustomOrder(data: unknown) {
  const parsed = orderSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: 'Invalid form data.', errors: parsed.error.flatten().fieldErrors };
  }

  const webhookUrl = "https://discord.com/api/webhooks/1419499799903731815/9tzAGU6MGm4koVDguh3Kqn9KX5fXSgtadM7stsTc3TjjBuaplvfvS96h44eEAosl4C5g";
  if (!webhookUrl) {
    console.error('WEBHOOK_URL is not defined.');
    return { success: false, message: 'Server configuration error: Webhook URL is not set.' };
  }

  const payload = {
    content: "New Custom Order Received!",
    embeds: [{
      title: "Custom Order Details",
      color: 15844367, // Gold color
      fields: [
        { name: "Minecraft Username", value: parsed.data.minecraftUsername, inline: true },
        { name: "Discord ID", value: parsed.data.discordId, inline: true },
        { name: "Offer", value: `$${parsed.data.offer.toFixed(2)}`, inline: true },
        { name: "Order Description", value: parsed.data.orderDescription },
      ],
      timestamp: new Date().toISOString()
    }]
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

  const webhookUrl = "https://discord.com/api/webhooks/1419499799903731815/9tzAGU6MGm4koVDguh3Kqn9KX5fXSgtadM7stsTc3TjjBuaplvfvS96h44eEAosl4C5g";
   if (!webhookUrl) {
    console.error('WEBHOOK_URL is not defined.');
    return { success: false, message: 'Server configuration error: Webhook URL is not set.' };
  }

  const payload = {
    content: "New Rental Request!",
    embeds: [{
      title: "Rental Request Details",
      color: 15844367, // Gold color
      fields: [
        { name: "Item", value: item.name, inline: false },
        { name: "Price", value: `$${item.pricePerDay.toFixed(2)}/day`, inline: false },
        { name: "Minecraft Username", value: parsed.data.minecraftUsername, inline: true },
        { name: "Discord ID", value: parsed.data.discordId, inline: true },
        { name: "Requested Rental Date", value: format(parsed.data.rentalDate, "PPP"), inline: false },
      ],
      timestamp: new Date().toISOString()
    }]
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
