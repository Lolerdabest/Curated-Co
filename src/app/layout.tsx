import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { PT_Mono, Inter } from "next/font/google";
import { cn } from '@/lib/utils';
 
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeadline = PT_Mono({
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
          <main className="flex-grow">{children}</main>
          <Toaster />
      </body>
    </html>
  );
}
