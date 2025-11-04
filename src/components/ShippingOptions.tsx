import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Truck, Package, MapPin } from "lucide-react";

interface ShippingOptionsProps {
  selectedShipping: string;
  onShippingChange: (shipping: string) => void;
}

const shippingOptions = [
  {
    value: "express",
    label: "Express Shipping",
    price: 5.00,
    description: "2-3 business days",
    icon: Truck
  },
  {
    value: "standard",
    label: "Standard Shipping",
    price: 2.00,
    description: "5-7 business days",
    icon: Package
  },
  {
    value: "pickup",
    label: "Pickup",
    price: 0.00,
    description: "Free - pickup in person",
    icon: MapPin
  }
];

export function ShippingOptions({ selectedShipping, onShippingChange }: ShippingOptionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Options</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedShipping} onValueChange={onShippingChange}>
          <div className="space-y-3">
            {shippingOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <div
                  key={option.value}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                    selectedShipping === option.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <IconComponent className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <Label
                      htmlFor={option.value}
                      className="flex justify-between items-center cursor-pointer"
                    >
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-gray-500">{option.description}</div>
                      </div>
                      <div className="font-bold text-green-600">
                        {option.price === 0 ? "FREE" : `$${option.price.toFixed(2)}`}
                      </div>
                    </Label>
                  </div>
                </div>
              );
            })}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}