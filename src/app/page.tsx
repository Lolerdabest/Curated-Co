import { products, categories } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/product-card';
import { FilterControls } from '@/components/filter-controls';

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    category?: string;
  };
}) {
  const query = searchParams?.query?.toLowerCase() || '';
  const category = searchParams?.category || 'all';

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesQuery =
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">Welcome to Curated Co.</h1>
        <p className="mt-2 text-lg text-muted-foreground">Inspired by bulk, refined by taste.</p>
      </header>
      
      <FilterControls categories={categories} />

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No Products Found</h2>
          <p className="mt-2 text-muted-foreground">
            Your search for "{query}" in {category === 'all' ? 'all categories' : `the ${category} category`} did not return any results.
          </p>
        </div>
      )}
    </div>
  );
}
