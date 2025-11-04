import { ProductCard, Product } from "./ProductCard";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Grid, List } from "lucide-react";
import { useState } from "react";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

type SortOption = "name" | "price-low" | "price-high" | "rating" | "newest";
type ViewMode = "grid" | "list";

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="flex-1">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <p className="text-gray-600">
            {products.length} product{products.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="px-3"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="px-3"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Sort Select */}
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid/List */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        <div className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }>
          {sortedProducts.map((product) => (
            <div key={product.id} className={
              viewMode === "list" ? "max-w-none" : ""
            }>
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}