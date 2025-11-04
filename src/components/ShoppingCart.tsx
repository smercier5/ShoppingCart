import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Product } from "./ProductCard";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export function ShoppingCart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: ShoppingCartProps) {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Shopping Cart ({totalItems} items)
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Add some products to get started
                </p>
                <Button onClick={onClose}>Continue Shopping</Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-6">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-sm line-clamp-1">
                              {item.product.name}
                            </h4>
                            <p className="text-sm text-gray-500 capitalize">
                              {item.product.category}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  Math.max(0, item.quantity - 1)
                                )
                              }
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Badge variant="secondary" className="px-3 py-1">
                              {item.quantity}
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-sm text-gray-500">
                                ${item.product.price.toFixed(2)} each
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Cart Summary */}
              <div className="py-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" className="w-full" onClick={onClose}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}