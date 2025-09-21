import { rentalItems, rentalCategories } from "@/lib/data";
import type { RentalItem } from "@/lib/types";
import { RentalCard } from "@/components/rental-card";
import { FilterControls } from "@/components/filter-controls";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface RentalsPageProps {
  searchParams?: {
    query?: string;
    category?: string;
  };
}

export default function RentalsPage({ searchParams }: RentalsPageProps) {
  const query = searchParams?.query?.toLowerCase() || "";
  const category = searchParams?.category || "all";

  const filteredItems = rentalItems.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    const matchesQuery =
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="flex flex-col min-h-screen">
       <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-xl font-headline text-primary" style={{textShadow: '0 0 5px hsl(var(--primary))'}}>
              Curated and Co
            </h1>
          </Link>
          <nav>
            <Button variant="ghost" asChild>
                <Link href="/rentals">Rentals</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-headline text-shadow" style={{textShadow: '0 0 10px hsl(var(--foreground))'}}>
            Item Rentals
          </h1>
          <p className="mt-4 text-lg text-foreground/80">
            Rent high-quality gear for your next project or event.
          </p>
        </div>

        <FilterControls categories={rentalCategories} />

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item: RentalItem) => (
              <RentalCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-2">No Items Found</h2>
            <p className="text-muted-foreground">
              Try adjusting your search or category filters.
            </p>
          </div>
        )}
      </main>

       <footer className="mt-8 py-6 text-center text-xs text-muted-foreground border-t border-border/50">
          <p>&copy; {new Date().getFullYear()} Curated and Co - All rights reserved</p>
        </footer>
    </div>
  );
}
