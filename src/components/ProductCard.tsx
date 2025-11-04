import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                New
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge variant="destructive">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Heart icon */}
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white transition-colors ${
              isLiked ? "text-red-500" : "text-gray-600"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </Button>

          {/* Add to cart overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-4">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                className="w-full bg-white text-black hover:bg-gray-100"
                size="sm"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <p className="text-sm text-gray-500 capitalize">{product.category}</p>
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}