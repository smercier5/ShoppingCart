import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Slider } from "./ui/slider";
import { Star } from "lucide-react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedRating: number;
  onRatingChange: (rating: number) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  selectedRating,
  onRatingChange,
}: CategoryFilterProps) {
  return (
    <div className="w-64 space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onCategoryChange("all")}
            >
              All Products
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                className="w-full justify-start capitalize"
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              min={0}
              max={2000}
              step={50}
              value={priceRange}
              onValueChange={(value) => onPriceRangeChange(value as [number, number])}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[4, 3, 2, 1, 0].map((rating) => (
              <Button
                key={rating}
                variant={selectedRating === rating ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => onRatingChange(rating)}
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm">
                    {rating === 0 ? "All" : `${rating}+ stars`}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          onCategoryChange("all");
          onPriceRangeChange([0, 2000]);
          onRatingChange(0);
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );
}