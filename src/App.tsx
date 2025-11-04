import { useState } from "react";
import { TShirtCard } from "./components/TShirtCard";
import { CustomerForm } from "./components/CustomerForm";
import { ShippingOptions } from "./components/ShippingOptions";
import { PaymentSection } from "./components/PaymentSection";
import { OrderReview } from "./components/OrderReview";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { OrderActions } from "./components/OrderActions";

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

const tShirts = [
  {
    id: "short-sleeve",
    title: "Short Sleeve T-Shirt",
    image: "https://raw.githubusercontent.com/smercier5/Image-asset/main/Screenshot%202025-09-27%20at%208.27.05%20PM.png"
  },
  {
    id: "long-sleeve",
    title: "Long Sleeve T-Shirt",
    image: "https://raw.githubusercontent.com/smercier5/Image-asset/main/Screenshot%202025-09-27%20at%208.28.03%20PM.png"
  },
  {
    id: "muscle-tee",
    title: "Muscle Tee",
    image: "https://raw.githubusercontent.com/smercier5/Image-asset/main/Screenshot%202025-09-27%20at%208.28.35%20PM.png"
  }
];


const shippingCosts = { express: 5, standard: 2, pickup: 0 };

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "", address: "", state: "", zip: "", email: "", phone: ""
  });
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [selectedPayment, setSelectedPayment] = useState("credit");
  const [showOrderReview, setShowOrderReview] = useState(false);

  const addToCart = (type: string, title: string, size: string, color: string, quantity: number, image: string) => {
    if (!size || !color || quantity <= 0) {
      console.error("Please select size, color, and quantity before adding to cart");
      return;
    }

    const itemId = `${type}-${size}-${color}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        existing.quantity += quantity;
        console.log(`Updated ${title} (${size}, ${color}) quantity`);
        return [...prev];
      }
      console.log(`Added ${title} (${size}, ${color}) to cart`);
      return [...prev, { id: itemId, type, title, size, color, quantity, image }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    console.log("Item removed from cart");
  };

  const updateCartItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = totalQuantity * 10;
  const shippingCost = shippingCosts[selectedShipping as keyof typeof shippingCosts];
  const orderTotal = subtotal + shippingCost;

  const handleSubmitOrder = () => {
    if (cartItems.length === 0 || totalQuantity === 0) { console.error("Please add at least one item"); return; }
    if (!customerInfo.name || !customerInfo.address || !customerInfo.state || !customerInfo.zip || !customerInfo.email || !customerInfo.phone) {
      console.error("Please fill in all customer fields"); return;
    }
    setShowOrderReview(true);
  };

  const handleConfirmOrder = () => {
    console.log("Order confirmed! Confirmation email will be sent.");
    setShowOrderReview(false);
  };

  const handleCancelOrder = () => {
    console.log("Order cancelled");
    setShowOrderReview(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-3xl font-bold">Fast Shopping HCI20</h1>
          <p className="text-gray-600 mt-2">High-quality t-shirts for $10 each</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
        {/* T-Shirt Selection */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tShirts.map(shirt => (
            <TShirtCard
              key={shirt.id}
              id={shirt.id}
              title={shirt.title}
              image={shirt.image}
              onAddToCart={addToCart}
            />
          ))}
        </section>

        {/* Shopping Cart */}
        {cartItems.length > 0 && (
          <section>
            <Card>
              <CardHeader><CardTitle>Shopping Cart</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-4">
                    <div className="flex gap-4 items-center">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded"/>
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-600">Size: {item.size}, Color: {item.color}</div>
                        <div className="text-sm font-medium">${(item.quantity*10).toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => updateCartItemQuantity(item.id, item.quantity-1)}>-</Button>
                      <span>{item.quantity}</span>
                      <Button onClick={() => updateCartItemQuantity(item.id, item.quantity+1)}>+</Button>
                      <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        )}

        {/* Order Summary */}
        {totalQuantity > 0 && (
          <section>
            <Card>
              <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
              <CardContent>
                <div className="flex justify-between">Subtotal: ${subtotal.toFixed(2)}</div>
                <div className="flex justify-between">Shipping: {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</div>
                <div className="flex justify-between font-bold text-lg">Total: ${orderTotal.toFixed(2)}</div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Shipping, Customer, Payment */}
        <ShippingOptions selectedShipping={selectedShipping} onShippingChange={setSelectedShipping} />
        <CustomerForm customerInfo={customerInfo} onCustomerInfoChange={setCustomerInfo} />
        <PaymentSection orderTotal={orderTotal} selectedPayment={selectedPayment} onPaymentChange={setSelectedPayment} />

        {/* Order Review */}
        {totalQuantity > 0 && (
          <OrderReview
            cartItems={cartItems}
            customerInfo={customerInfo}
            selectedShipping={selectedShipping}
            selectedPayment={selectedPayment}
            orderTotal={orderTotal}
            shippingCost={shippingCost}
            subtotal={subtotal}
            onConfirmOrder={handleConfirmOrder}
            onCancelOrder={handleCancelOrder}
            showReview={showOrderReview}
            onToggleReview={() => setShowOrderReview(!showOrderReview)}
          />
        )}

        {/* Order Actions */}
        {totalQuantity > 0 && (
          <OrderActions
            onPlaceOrder={handleSubmitOrder}
            onClearForm={() => {
              setCartItems([]);
              setCustomerInfo({ name: "", address: "", state: "", zip: "", email: "", phone: "" });
              setSelectedShipping("standard");
              setSelectedPayment("credit");
            }}
            onCancel={() => handleCancelOrder()}
          />
        )}

      </main>
    </div>
  );
}
