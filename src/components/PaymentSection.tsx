import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { CreditCard, Wallet, FileText } from "lucide-react";

interface PaymentSectionProps {
  orderTotal: number;
  selectedPayment: string;
  onPaymentChange: (payment: string) => void;
}

export function PaymentSection({ orderTotal, selectedPayment, onPaymentChange }: PaymentSectionProps) {
  const [creditCardInfo, setCreditCardInfo] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
    sameAsBilling: true,
    billingAddress: "",
    billingState: "",
    billingZip: ""
  });

  const paymentMethods = [
    {
      value: "credit",
      label: "Credit Card",
      icon: CreditCard,
      description: "Pay with your credit or debit card"
    },
    {
      value: "paypal",
      label: "PayPal",
      icon: Wallet,
      description: "Pay securely with your PayPal account"
    },
    {
      value: "check",
      label: "Check",
      icon: FileText,
      description: "Pay by check in person"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Order Total */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Order Total:</span>
            <span className="text-2xl font-bold text-green-600">
              ${orderTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <Separator />

        {/* Payment Methods */}
        <div>
          <h3 className="font-medium mb-4">Select Payment Method</h3>
          <RadioGroup value={selectedPayment} onValueChange={onPaymentChange}>
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <div
                    key={method.value}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                      selectedPayment === method.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <RadioGroupItem value={method.value} id={method.value} />
                    <IconComponent className="w-5 h-5 text-gray-600" />
                    <Label
                      htmlFor={method.value}
                      className="flex-1 cursor-pointer"
                    >
                      <div className="font-medium">{method.label}</div>
                      <div className="text-sm text-gray-500">{method.description}</div>
                    </Label>
                  </div>
                );
              })}
            </div>
          </RadioGroup>
        </div>

        {/* Payment Method Details */}
        {selectedPayment === "credit" && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium">Credit Card Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="cardName">Name on Card *</Label>
                <Input
                  id="cardName"
                  type="text"
                  value={creditCardInfo.name}
                  onChange={(e) => setCreditCardInfo({...creditCardInfo, name: e.target.value})}
                  placeholder="Full name as on card"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="cardNumber">Card Number *</Label>
                <Input
                  id="cardNumber"
                  type="text"
                  value={creditCardInfo.number}
                  onChange={(e) => setCreditCardInfo({...creditCardInfo, number: e.target.value})}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div>
                <Label htmlFor="expiry">Expiration Date *</Label>
                <Input
                  id="expiry"
                  type="text"
                  value={creditCardInfo.expiry}
                  onChange={(e) => setCreditCardInfo({...creditCardInfo, expiry: e.target.value})}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  type="text"
                  value={creditCardInfo.cvv}
                  onChange={(e) => setCreditCardInfo({...creditCardInfo, cvv: e.target.value})}
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="sameAsBilling"
                checked={creditCardInfo.sameAsBilling}
                onCheckedChange={(checked) => 
                  setCreditCardInfo({...creditCardInfo, sameAsBilling: checked as boolean})
                }
              />
              <Label htmlFor="sameAsBilling">
                Billing address is the same as customer address
              </Label>
            </div>

            {!creditCardInfo.sameAsBilling && (
              <div className="space-y-4">
                <h5 className="font-medium">Billing Address</h5>
                <div>
                  <Label htmlFor="billingAddress">Address *</Label>
                  <Input
                    id="billingAddress"
                    type="text"
                    value={creditCardInfo.billingAddress}
                    onChange={(e) => setCreditCardInfo({...creditCardInfo, billingAddress: e.target.value})}
                    placeholder="Billing address"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="billingState">State *</Label>
                    <Input
                      id="billingState"
                      type="text"
                      value={creditCardInfo.billingState}
                      onChange={(e) => setCreditCardInfo({...creditCardInfo, billingState: e.target.value})}
                      placeholder="State"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="billingZip">ZIP Code *</Label>
                    <Input
                      id="billingZip"
                      type="text"
                      value={creditCardInfo.billingZip}
                      onChange={(e) => setCreditCardInfo({...creditCardInfo, billingZip: e.target.value})}
                      placeholder="ZIP Code"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedPayment === "paypal" && (
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Wallet className="w-4 h-4 mr-2" />
              Sign into PayPal
            </Button>
            <p className="text-sm text-gray-600 mt-2">
              You will be redirected to PayPal to complete your payment
            </p>
          </div>
        )}

        {selectedPayment === "check" && (
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <h4 className="font-medium mb-2">Pay by Check</h4>
            <p className="text-gray-600">
              Please bring your check in person to complete the purchase.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}