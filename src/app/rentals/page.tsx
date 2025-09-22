import { rentalItems, rentalCategories } from "@/lib/data";
import type { RentalItem } from "@/lib/types";
import { RentalCard } from "@/components/rental-card";
import { FilterControls } from "@/components/filter-controls";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

interface RentalsPageProps {
  searchParams?: {
    query?: string;
    category?: string;
  };
}

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      aria-hidden="true"
      role="img"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M20.317 4.36981C18.699 3.50425 16.9248 2.89447 15.0644 2.58442C14.878 2.92212 14.6994 3.25195 14.5286 3.57391C12.5932 3.23813 10.65 3.23813 8.71458 3.57391C8.54381 3.25195 8.36517 2.92212 8.17882 2.58442C6.31838 2.89447 4.54419 3.50425 2.92622 4.36981C0.424332 7.7917 -0.112111 11.1098 0.021021 14.3853C1.61607 15.8208 3.3275 16.9837 5.12267 17.857C5.5845 17.2625 5.97883 16.621 6.31278 15.9402C5.79989 15.6881 5.30873 15.3999 4.8469 15.0838C4.98002 14.9916 5.10529 14.8916 5.22271 14.7839C8.42337 16.4851 12.0125 16.4851 15.011 14.7839C15.1284 14.8916 15.2537 14.9916 15.3868 15.0838C14.925 15.3999 14.4338 15.6881 13.9209 15.9402C14.2549 16.621 14.6492 17.2625 15.111 17.857C16.9062 16.9837 18.6176 15.8208 20.2127 14.3853C20.4192 10.8717 19.6433 7.61863 20.317 4.36981ZM8.0201 12.34C7.03185 12.34 6.22234 11.4791 6.22234 10.4281C6.22234 9.37701 7.024 8.51612 8.0201 8.51612C9.01619 8.51612 9.81786 9.37701 9.80999 10.4281C9.80999 11.4791 9.01619 12.34 8.0201 12.34ZM12.2142 12.34C11.226 12.34 10.4165 11.4791 10.4165 10.4281C10.4165 9.37701 11.2181 8.51612 12.2142 8.51612C13.2103 8.51612 14.012 9.37701 14.0041 10.4281C14.0041 11.4791 13.2103 12.34 12.2142 12.34Z" />
    </svg>
);

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
       <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-xl font-headline text-primary" style={{textShadow: '0 0 5px hsl(var(--primary))'}}>
              C & Co
            </h1>
          </Link>
          <nav className="flex items-center gap-4">
             <Button variant="default" asChild className="w-full sm:w-auto">
                <Link href="/">Bulk Order</Link>
            </Button>
            <div className="hidden sm:flex items-center gap-2 animate-pulse">
                <MoveLeft className="text-primary w-6 h-6" />
                <p className="text-sm text-primary" style={{textShadow: '0 0 5px hsl(var(--primary))'}}>Click for bulk orders</p>
            </div>
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

       <footer className="mt-8 py-6 px-4 text-center text-xs text-muted-foreground border-t border-border/50 z-10 flex flex-col items-center gap-4">
          <Button asChild variant="outline">
              <Link href="https://discord.gg/YOUR_INVITE_CODE" target="_blank">
                  <DiscordIcon className="mr-2" />
                  Join our Discord
              </Link>
          </Button>
          <p>
              &copy; {new Date().getFullYear()} Curated and Co - All rights reserved
          </p>
          <p className="font-headline text-primary" style={{textShadow: '0 0 8px hsl(var(--primary)), 0 0 2px black'}}>
              By Eddiegonza420
          </p>
        </footer>
    </div>
  );
}
