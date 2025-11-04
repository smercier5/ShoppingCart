import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface CustomerInfo {
  name: string;
  address: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
}

interface CustomerFormProps {
  customerInfo: CustomerInfo;
  onCustomerInfoChange: (info: CustomerInfo) => void;
}

export function CustomerForm({ customerInfo, onCustomerInfoChange }: CustomerFormProps) {
  const handleChange = (field: keyof CustomerInfo, value: string) => {
    onCustomerInfoChange({
      ...customerInfo,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              type="text"
              value={customerInfo.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={customerInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            type="text"
            value={customerInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Enter your street address"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="state">State *</Label>
            <Input
              id="state"
              type="text"
              value={customerInfo.state}
              onChange={(e) => handleChange('state', e.target.value)}
              placeholder="State"
              required
            />
          </div>
          <div>
            <Label htmlFor="zip">ZIP Code *</Label>
            <Input
              id="zip"
              type="text"
              value={customerInfo.zip}
              onChange={(e) => handleChange('zip', e.target.value)}
              placeholder="ZIP Code"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={customerInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="Phone number"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}