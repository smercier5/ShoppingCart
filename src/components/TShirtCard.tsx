import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface TShirtCardProps {
  id: string;
  title: string;
  image: string;
  onAddToCart: (type: string, title: string, size: string, color: string, quantity: number, image: string) => void;
}

const colors = [
  { name: "White", value: "white", bgColor: "bg-white", borderColor: "border-gray-300" },
  { name: "Blue", value: "blue", bgColor: "bg-blue-500", borderColor: "border-blue-500" },
  { name: "Black", value: "black", bgColor: "bg-black", borderColor: "border-black" }
];

const sizes = ["Small", "Medium", "Large", "Extra Large"];

export function TShirtCard({ id, title, image, onAddToCart }: TShirtCardProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(id, title, selectedSize, selectedColor, quantity, image);
    // Reset form after adding to cart
    setSelectedSize("");
    setSelectedColor("");
    setQuantity(1);
  };

  const isFormValid = selectedSize && selectedColor && quantity > 0;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="text-2xl font-bold text-green-600">$10.00</div>
      </CardHeader>
      <CardContent className="flex-1 space-y-6">
        {/* Product Image */}
        <div className="w-full h-48 overflow-hidden rounded-lg">
          <ImageWithFallback 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Size Selection */}
        <div>
          <Label htmlFor={`size-${id}`} className="block text-sm font-medium mb-2">Size:</Label>
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger id={`size-${id}`}>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Color Selection */}
        <div>
          <Label className="block text-sm font-medium mb-2">Color:</Label>
          <div className="flex gap-3 justify-center">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                className={`w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                  color.bgColor
                } ${
                  selectedColor === color.value
                    ? `${color.borderColor} ring-2 ring-offset-2 ring-blue-500`
                    : "border-gray-300 hover:border-gray-400"
                }`}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Quantity Selection */}
        <div>
          <Label htmlFor={`quantity-${id}`} className="block text-sm font-medium mb-2">Quantity:</Label>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 p-0"
            >
              -
            </Button>
            <Input
              id={`quantity-${id}`}
              type="number"
              min="1"
              max="99"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 p-0"
            >
              +
            </Button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button 
          onClick={handleAddToCart}
          disabled={!isFormValid}
          className="w-full"
          size="lg"
        >
          Add to Cart
        </Button>

        {/* Form Validation Message */}
        {!isFormValid && (
          <p className="text-sm text-gray-500 text-center">
            Please select size and color
          </p>
        )}
      </CardContent>
    </Card>
  );
}