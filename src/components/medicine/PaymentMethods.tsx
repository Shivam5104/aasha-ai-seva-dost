
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Smartphone, Banknote, Calculator } from 'lucide-react';

interface PaymentMethodsProps {
  totalAmount: number;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  upiId: string;
  setUpiId: (id: string) => void;
  cardNumber: string;
  setCardNumber: (number: string) => void;
  cardExpiry: string;
  setCardExpiry: (expiry: string) => void;
  cardCvv: string;
  setCardCvv: (cvv: string) => void;
  cardName: string;
  setCardName: (name: string) => void;
  onPaymentSubmit: () => void;
  onBack: () => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  totalAmount,
  paymentMethod,
  setPaymentMethod,
  upiId,
  setUpiId,
  cardNumber,
  setCardNumber,
  cardExpiry,
  setCardExpiry,
  cardCvv,
  setCardCvv,
  cardName,
  setCardName,
  onPaymentSubmit,
  onBack
}) => {
  const paymentMethods = [
    { id: 'upi', label: 'UPI Payment', icon: <Smartphone className="w-5 h-5" />, description: 'Pay using UPI ID' },
    { id: 'card', label: 'Credit/Debit Card', icon: <CreditCard className="w-5 h-5" />, description: 'Visa, Mastercard, RuPay' },
    { id: 'cod', label: 'Cash on Delivery', icon: <Banknote className="w-5 h-5" />, description: 'Pay when delivered' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-green-600" />
          Payment Methods
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Methods */}
        <div>
          <h3 className="font-semibold mb-3">Select Payment Method</h3>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <div className="flex items-center gap-3 flex-1">
                    {method.icon}
                    <div>
                      <Label htmlFor={method.id} className="font-medium cursor-pointer">
                        {method.label}
                      </Label>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Payment Details Forms */}
        {paymentMethod === 'upi' && (
          <div className="space-y-3">
            <Label htmlFor="upiId">UPI ID</Label>
            <Input
              id="upiId"
              placeholder="yourname@paytm / yourname@phonepe"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}

        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="Name on card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cardExpiry">Expiry Date</Label>
                <Input
                  id="cardExpiry"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cardCvv">CVV</Label>
                <Input
                  id="cardCvv"
                  placeholder="123"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  maxLength={3}
                  type="password"
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'cod' && (
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Cash on Delivery:</strong> You can pay ₹{totalAmount} in cash when your order is delivered. 
              Please keep exact change ready.
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex-1"
          >
            Back to Order
          </Button>
          <Button 
            onClick={onPaymentSubmit}
            disabled={!paymentMethod || (paymentMethod === 'upi' && !upiId) || (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvv || !cardName))}
            className="flex-1"
            size="lg"
          >
            {paymentMethod === 'cod' ? 'Confirm Order' : `Pay ₹${totalAmount}`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;
