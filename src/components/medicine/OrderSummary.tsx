
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Plus, Minus } from 'lucide-react';

interface Medicine {
  name: string;
  price: number;
  quantity: number;
  available: boolean;
}

interface OrderSummaryProps {
  medicines: Medicine[];
  onQuantityChange: (index: number, newQuantity: number) => void;
  deliveryCharges: number;
  deliveryOption: string;
  onProceedToPayment: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  medicines,
  onQuantityChange,
  deliveryCharges,
  deliveryOption,
  onProceedToPayment
}) => {
  // Calculate pricing with very low prices
  const medicineTotal = medicines.reduce((sum, med) => sum + (med.price * med.quantity), 0);
  const subtotal = medicineTotal + deliveryCharges;
  const isFirstTimeCustomer = true; // Mock - can be determined from user profile
  const discount = isFirstTimeCustomer ? Math.round(subtotal * 0.50) : 0; // 50% first-time discount
  const afterDiscount = subtotal - discount;
  const gst = Math.round(afterDiscount * 0.18); // 18% GST
  const totalAmount = afterDiscount + gst;

  const deliveryOptions = [
    { id: 'express', label: '1-2 Hours' },
    { id: 'standard', label: '3-6 Hours' },
    { id: 'scheduled', label: 'Schedule Later' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-green-600" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Medicine List with Quantity Controls */}
        <div>
          <h3 className="font-semibold mb-3">Medicines</h3>
          <div className="space-y-3">
            {medicines.map((medicine, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <span className="font-medium">{medicine.name}</span>
                  <p className="text-sm text-gray-600">₹{medicine.price} per unit</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onQuantityChange(index, Math.max(1, medicine.quantity - 1))}
                      disabled={medicine.quantity <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{medicine.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onQuantityChange(index, medicine.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <span className="font-semibold min-w-16 text-right">₹{medicine.price * medicine.quantity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bill Breakdown */}
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3">Bill Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Medicine Total</span>
              <span>₹{medicineTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges ({deliveryOptions.find(opt => opt.id === deliveryOption)?.label})</span>
              <span>₹{deliveryCharges}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            {isFirstTimeCustomer && (
              <div className="flex justify-between text-green-600">
                <span className="flex items-center gap-1">
                  First Time Customer Discount (50%)
                  <Badge variant="secondary" className="text-xs">NEW</Badge>
                </span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>After Discount</span>
              <span>₹{afterDiscount}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹{gst}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>

        <Button onClick={onProceedToPayment} className="w-full" size="lg">
          Proceed to Payment
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
