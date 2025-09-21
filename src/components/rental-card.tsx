"use client";

import type { RentalItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RentalRequestDialog } from './rental-request-dialog';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface RentalCardProps {
  item: RentalItem;
}

export function RentalCard({ item }: RentalCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow hover:shadow-lg bg-card/80 border-border/50">
      <CardContent className="p-4 flex-grow flex flex-col items-center justify-center">
        <CardTitle 
            className="text-2xl font-headline text-center text-primary"
            style={{textShadow: '0 0 8px hsl(var(--primary))'}}
        >
            {item.name}
        </CardTitle>
        <p className="text-sm text-center text-muted-foreground mt-2">{item.description}</p>
      </CardContent>
      <CardFooter className="p-4 flex flex-col items-center justify-center gap-4">
        <div className='text-center'>
          <p className="text-xl font-bold">${item.pricePerDay.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">per day</p>
        </div>
        <RentalRequestDialog item={item}>
          <Button size="sm">Request to Rent</Button>
        </RentalRequestDialog>
      </CardFooter>
    </Card>
  );
}
