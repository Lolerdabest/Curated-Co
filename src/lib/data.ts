import type { Product, RentalItem } from './types';

export const categories = [
  'Electronics',
  'Home Goods',
  'Groceries',
  'Apparel',
];

export const products: Product[] = [
  {
    id: 'prod1',
    name: 'Pro-Grade Noise-Cancelling Headphones',
    description: 'Experience immersive sound with our top-of-the-line noise-cancelling headphones. Perfect for audiophiles and commuters alike.',
    price: 349.99,
    category: 'Electronics',
    imageId: 'headphones',
  },
  {
    id: 'prod2',
    name: 'Artisanal Pour-Over Coffee Maker',
    description: 'Brew the perfect cup every morning. This stylish and functional pour-over coffee maker enhances your coffee ritual.',
    price: 79.5,
    category: 'Home Goods',
    imageId: 'coffee-maker',
  },
  {
    id: 'prod3',
    name: 'Organic Mediterranean Olive Oil - 2L',
    description: 'A large jug of premium, cold-pressed extra virgin olive oil, sourced from the finest groves in the Mediterranean.',
    price: 45.0,
    category: 'Groceries',
    imageId: 'olive-oil',
  },
  {
    id: 'prod4',
    name: 'All-Weather Performance Jacket',
    description: 'Stay dry and comfortable in any condition with this versatile, waterproof, and breathable performance jacket.',
    price: 199.99,
    category: 'Apparel',
    imageId: 'jacket',
  },
  {
    id: 'prod5',
    name: '4K Ultra-HD Smart Television',
    description: 'Bring cinema-quality viewing to your living room. A 65-inch screen with vibrant colors and smart connectivity.',
    price: 1299.0,
    category: 'Electronics',
    imageId: 'television',
  },
  {
    id: 'prod6',
    name: 'Minimalist Dutch Oven',
    description: 'An essential for any kitchen. Enameled cast iron dutch oven, perfect for braising, baking, and stewing.',
    price: 150.0,
    category: 'Home Goods',
    imageId: 'dutch-oven',
  },
  {
    id: 'prod7',
    name: 'Bulk Almond Flour - 5kg',
    description: 'Finely ground almond flour for all your gluten-free baking needs. A pantry staple in a convenient bulk size.',
    price: 65.25,
    category: 'Groceries',
    imageId: 'almond-flour',
  },
  {
    id: 'prod8',
    name: 'Merino Wool Crewneck Sweater',
    description: 'A timeless classic. Soft, breathable, and temperature-regulating merino wool sweater for everyday luxury.',
    price: 110.0,
    category: 'Apparel',
    imageId: 'sweater',
  },
];

export const rentalCategories = ['Event Gear', 'Tools', 'Outdoor Equipment', 'Mining Equipment'];

export const rentalItems: RentalItem[] = [
  {
    id: 'rent1',
    name: 'Professional Event Projector',
    description: 'High-lumen projector suitable for large venues, presentations, and movie nights. Includes all necessary cables.',
    pricePerDay: 75,
    category: 'Event Gear',
    imageId: 'projector',
  },
  {
    id: 'rent2',
    name: 'Heavy-Duty Pressure Washer',
    description: 'Gas-powered pressure washer for tackling tough cleaning jobs on decks, driveways, and siding.',
    pricePerDay: 50,
    category: 'Tools',
    imageId: 'pressure-washer',
  },
  {
    id: 'rent3',
    name: 'Premium 4-Person Camping Tent',
    description: 'Spacious and weatherproof tent for your next outdoor adventure. Easy setup and durable materials.',
    pricePerDay: 35,
    category: 'Outdoor Equipment',
    imageId: 'tent',
  },
  {
    id: 'rent4',
    name: 'Portable PA System',
    description: 'All-in-one PA system with two speakers, a mixer, and microphones. Perfect for parties, weddings, and public speaking.',
    pricePerDay: 100,
    category: 'Event Gear',
    imageId: 'pa-system',
  },
  {
    id: 'rent5',
    name: 'Golden Mining Drill',
    description: 'Top-tier mining drill for extracting rare resources with unparalleled speed and efficiency.',
    pricePerDay: 600,
    category: 'Mining Equipment',
    imageId: 'golden-drill',
  },
  {
    id: 'rent6',
    name: 'Iron Mining Drill',
    description: 'A reliable and sturdy drill for all your standard mining operations. Great for iron and coal.',
    pricePerDay: 500,
    category: 'Mining Equipment',
    imageId: 'iron-drill',
  },
  {
    id: 'rent7',
    name: 'Copper Mining Drill',
    description: 'Efficient and lightweight, this drill is perfect for extracting copper and other soft metals.',
    pricePerDay: 300,
    category: 'Mining Equipment',
    imageId: 'copper-drill',
  },
  {
    id: 'rent8',
    name: 'Diamond Mining Drill',
    description: 'The ultimate mining tool. Capable of boring through obsidian and finding the rarest gems.',
    pricePerDay: 1000,
    category: 'Mining Equipment',
    imageId: 'diamond-drill',
  },
];
