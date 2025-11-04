import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface CartItem {
  id: string;
  type: string;
  title: string;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

interface CustomerInfo {
  name: string;
  address: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
}

interface OrderReviewProps {
  cartItems: CartItem[];
  customerInfo: CustomerInfo;
  selectedShipping: string;
  selectedPayment: string;
  orderTotal: number;
  shippingCost: number;
  subtotal: number;
  onConfirmOrder: () => void;
  onCancelOrder: () => void;
  showReview: boolean;
  onToggleReview: () => void;
}

export function OrderReview({
  cartItems,
  customerInfo,
  selectedShipping,
  selectedPayment,
  orderTotal,
  shippingCost,
  subtotal,
  onConfirmOrder,
  onCancelOrder,
  showReview,
  onToggleReview
}: OrderReviewProps) {

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const shippingNames = {
    express: "Express Shipping (2-3 business days)",
    standard: "Standard Shipping (5-7 business days)",
    pickup: "Pickup (Free)"
  };

  const paymentNames = {
    credit: "Credit Card",
    paypal: "PayPal",
    check: "Check (In Person)"
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            📝 Order Review
          </CardTitle>
          <Button variant="outline" onClick={onToggleReview} className="text-sm">
            {showReview ? "Hide Details" : "Show Details"}
          </Button>
        </div>
      </CardHeader>

      {showReview && (
        <CardContent className="space-y-6">

          {/* Order Items */}
          <div>
            <h3 className="font-medium mb-3">
              Order Items ({totalItems} item{totalItems !== 1 ? 's' : ''})
            </h3>
            <div className="space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-gray-600">
                      Size: {item.size} | Color: {item.color.charAt(0).toUpperCase() + item.color.slice(1)} | Qty: {item.quantity}
                    </div>
                  </div>
                  <div className="font-medium text-green-600">
                    ${(item.quantity * 10).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Customer Info */}
          <div>
            <h3 className="font-medium mb-3">Customer Information</h3>
            <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-1">
              <div><strong>Name:</strong> {customerInfo.name}</div>
              <div><strong>Email:</strong> {customerInfo.email}</div>
              <div><strong>Phone:</strong> {customerInfo.phone}</div>
              <div><strong>Address:</strong> {customerInfo.address}, {customerInfo.state} {customerInfo.zip}</div>
            </div>
          </div>

          <Separator />

          {/* Shipping & Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Shipping Method</h3>
              <div className="bg-gray-50 p-3 rounded-lg text-sm">{shippingNames[selectedShipping as keyof typeof shippingNames]}</div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Payment Method</h3>
              <div className="bg-gray-50 p-3 rounded-lg text-sm">{paymentNames[selectedPayment as keyof typeof paymentNames]}</div>
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div>
            <h3 className="font-medium mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-green-600">${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button onClick={onConfirmOrder} className="flex-1 bg-green-600 hover:bg-green-700 text-white" size="lg">
              ✅ Confirm Order
            </Button>
            <Button onClick={onCancelOrder} variant="outline" className="flex-1 text-red-600 border-red-600 hover:bg-red-50" size="lg">
              ❌ Cancel Order
            </Button>
          </div>

        </CardContent>
      )}
    </Card>
  );
}
