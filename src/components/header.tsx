"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package2 } from 'lucide-react';
import { CartSheet } from '@/components/cart-sheet';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Shop' },
    { href: '/rentals', label: 'Rentals' },
    { href: '/admin/generate-description', label: 'AI Tool'}
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Package2 className="h-6 w-6 text-accent" />
          <span className="font-bold">Curated Co.</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === link.href ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto">
          <CartSheet />
        </div>
      </div>
    </header>
  );
}
