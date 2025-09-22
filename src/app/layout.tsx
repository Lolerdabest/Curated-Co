import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Press_Start_2P, VT323 } from "next/font/google";
import { cn } from '@/lib/utils';
import { FallingStars } from '@/components/falling-stars';
import { CartProvider } from '@/context/cart-context';
 
const fontSans = VT323({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

const fontHeadline = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: "400"
});

export const metadata: Metadata = {
  title: 'Curated and Co',
  description: 'Bespoke orders, curated for you.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("min-h-screen bg-background font-sans antialiased flex flex-col", fontSans.variable, fontHeadline.variable)}>
        <CartProvider>
          <FallingStars />
          <main className="flex-grow z-10">{children}</main>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
