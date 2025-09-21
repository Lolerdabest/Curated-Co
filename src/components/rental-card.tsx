"use client";

import Image from 'next/image';
import type { RentalItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { RentalRequestDialog } from './rental-request-dialog';

interface RentalCardProps {
  item: RentalItem;
}

export function RentalCard({ item }: RentalCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === item.imageId);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        {image && (
            <Image
                src={image.imageUrl}
                alt={item.name}
                width={600}
                height={600}
                className="w-full h-48 object-cover"
                data-ai-hint={image.imageHint}
            />
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1">{item.name}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <div>
          <p className="text-lg font-bold">${item.pricePerDay.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">per day</p>
        </div>
        <RentalRequestDialog item={item}>
          <Button size="sm">Request to Rent</Button>
        </RentalRequestDialog>
      </CardFooter>
    </Card>
  );
}
