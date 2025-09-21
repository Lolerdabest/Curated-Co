import { rentalItems, rentalCategories } from '@/lib/data';
import type { RentalItem } from '@/lib/types';
import { RentalCard } from '@/components/rental-card';
import { FilterControls } from '@/components/filter-controls';

export default function RentalsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    category?: string;
  };
}) {
  const query = searchParams?.query?.toLowerCase() || '';
  const category = searchParams?.category || 'all';

  const filteredItems = rentalItems.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    const matchesQuery =
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">Item Rentals</h1>
        <p className="mt-2 text-lg text-muted-foreground">Rent high-quality gear for your next project or event.</p>
      </header>
      
      <FilterControls categories={rentalCategories} />

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredItems.map((item: RentalItem) => (
            <RentalCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No Items Found</h2>
          <p className="mt-2 text-muted-foreground">
            Your search for "{query}" in {category === 'all' ? 'all categories' : `the ${category} category`} did not return any results.
          </p>
        </div>
      )}
    </div>
  );
}
