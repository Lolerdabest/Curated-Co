export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageId: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type RentalItem = {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  category: string;
  imageId: string;
  color?: string;
};
