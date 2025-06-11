
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, Phone, MapPin } from 'lucide-react';

interface OrderConfirmationProps {
  totalAmount: number;
  paymentMethod: string;
  onPlaceAnotherOrder: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  totalAmount,
  paymentMethod,
  onPlaceAnotherOrder
}) => {
  const paymentMethods = [
    { id: 'upi', label: 'UPI Payment' },
    { id: 'card', label: 'Credit/Debit Card' },
    { id: 'cod', label: 'Cash on Delivery' }
  ];

  return (
    <Card className="bg-green-50 border-green-200">
      <CardHeader>
        <CardTitle className="text-green-800 flex items-center gap-2">
          <Truck className="w-5 h-5" />
          Order Confirmed!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Order Details</h3>
          <div className="space-y-2 text-sm">
            <div><strong>Order ID:</strong> MD-{Math.random().toString(36).substr(2, 8).toUpperCase()}</div>
            <div><strong>Total Paid:</strong> ₹{totalAmount}</div>
            <div><strong>Payment Method:</strong> {paymentMethods.find(p => p.id === paymentMethod)?.label}</div>
            <div><strong>Estimated Delivery:</strong> 45-90 minutes</div>
            <div><strong>Delivery Partner:</strong> Raj Kumar (+91 98765-43210)</div>
            <div><strong>Pharmacy:</strong> Apollo Pharmacy (0.8 km away)</div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Delivery Tracking</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Order confirmed</span>
              <span className="text-xs text-gray-500">2 min ago</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Pharmacy processing</span>
              <span className="text-xs text-gray-500">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-500">Out for delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-500">Delivered</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button className="flex-1">
            <Phone className="w-4 h-4 mr-2" />
            Call Delivery Partner
          </Button>
          <Button variant="outline" className="flex-1">
            <MapPin className="w-4 h-4 mr-2" />
            Track Live Location
          </Button>
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={onPlaceAnotherOrder}
        >
          Place Another Order
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderConfirmation;
