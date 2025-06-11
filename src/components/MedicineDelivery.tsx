
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Pill, MapPin, Clock, Phone, Truck, Camera, User, Upload, CheckCircle, CreditCard, Smartphone, Banknote, Calculator } from 'lucide-react';

interface MedicineDeliveryProps {
  language: string;
}

interface Medicine {
  name: string;
  price: number;
  quantity: number;
  available: boolean;
}

const MedicineDelivery: React.FC<MedicineDeliveryProps> = ({ language }) => {
  const [orderType, setOrderType] = useState('prescription');
  const [patientName, setPatientName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [medicines, setMedicines] = useState('');
  const [urgency, setUrgency] = useState('standard');
  const [prescriptionImage, setPrescriptionImage] = useState<File | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock medicines from prescription analysis
  const prescriptionMedicines: Medicine[] = [
    { name: 'Paracetamol 500mg (10 tablets)', price: 25, quantity: 1, available: true },
    { name: 'Amoxicillin 250mg (10 capsules)', price: 120, quantity: 1, available: true },
    { name: 'Vitamin D3 (4 tablets)', price: 80, quantity: 1, available: true }
  ];

  const deliveryOptions = [
    { id: 'express', label: '1-2 Hours', price: 50, icon: '🚀' },
    { id: 'standard', label: '3-6 Hours', price: 20, icon: '🚚' },
    { id: 'scheduled', label: 'Schedule Later', price: 10, icon: '📅' }
  ];

  const nearbyPharmacies = [
    { name: 'Apollo Pharmacy', distance: '0.8 km', rating: '4.5', available: true },
    { name: 'MedPlus', distance: '1.2 km', rating: '4.3', available: true },
    { name: 'Local Chemist', distance: '0.5 km', rating: '4.0', available: false },
    { name: 'Wellness Pharmacy', distance: '2.1 km', rating: '4.4', available: true }
  ];

  const paymentMethods = [
    { id: 'upi', label: 'UPI Payment', icon: <Smartphone className="w-5 h-5" />, description: 'Pay using UPI ID' },
    { id: 'card', label: 'Credit/Debit Card', icon: <CreditCard className="w-5 h-5" />, description: 'Visa, Mastercard, RuPay' },
    { id: 'cod', label: 'Cash on Delivery', icon: <Banknote className="w-5 h-5" />, description: 'Pay when delivered' }
  ];

  // Calculate pricing
  const medicineTotal = prescriptionMedicines.reduce((sum, med) => sum + (med.price * med.quantity), 0);
  const deliveryCharges = deliveryOptions.find(opt => opt.id === urgency)?.price || 20;
  const subtotal = medicineTotal + deliveryCharges;
  const isFirstTimeCustomer = true; // Mock - can be determined from user profile
  const discount = isFirstTimeCustomer ? Math.round(subtotal * 0.15) : 0; // 15% first-time discount
  const afterDiscount = subtotal - discount;
  const gst = Math.round(afterDiscount * 0.18); // 18% GST
  const totalAmount = afterDiscount + gst;

  const handleOrderSubmit = () => {
    if (prescriptionImage || medicines) {
      setShowPayment(true);
    }
  };

  const handlePaymentSubmit = () => {
    setOrderPlaced(true);
    setShowPayment(false);
  };

  const handleCaptureClick = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setIsCapturing(true);
      navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
        setIsCapturing(false);
        fileInputRef.current?.click();
      });
    } else {
      fileInputRef.current?.click();
    }
  };

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `prescription_${Date.now()}.jpg`, { type: 'image/jpeg' });
            setPrescriptionImage(file);
            setIsCapturing(false);
            
            const stream = video.srcObject as MediaStream;
            if (stream) {
              stream.getTracks().forEach(track => track.stop());
            }
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPrescriptionImage(file);
    }
  };

  const cancelCapture = () => {
    setIsCapturing(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  if (orderPlaced) {
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
            onClick={() => {
              setOrderPlaced(false);
              setShowPayment(false);
              setPrescriptionImage(null);
              setMedicines('');
              setPaymentMethod('');
            }}
          >
            Place Another Order
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isCapturing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-green-600" />
            Capture Prescription
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <video 
              ref={videoRef} 
              className="w-full rounded-lg"
              style={{ maxHeight: '400px' }}
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>
          <div className="flex gap-3">
            <Button onClick={takePicture} className="flex-1">
              <Camera className="w-4 h-4 mr-2" />
              Take Picture
            </Button>
            <Button variant="outline" onClick={cancelCapture} className="flex-1">
              Cancel
            </Button>
          </div>
          <p className="text-sm text-gray-600 text-center">
            Position your prescription clearly in the camera view and click "Take Picture"
          </p>
        </CardContent>
      </Card>
    );
  }

  if (showPayment) {
    return (
      <div className="space-y-6">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-green-600" />
              Order Summary & Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Medicine List */}
            <div>
              <h3 className="font-semibold mb-3">Medicines</h3>
              <div className="space-y-2">
                {prescriptionMedicines.map((medicine, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium">{medicine.name}</span>
                      <p className="text-sm text-gray-600">Qty: {medicine.quantity}</p>
                    </div>
                    <span className="font-semibold">₹{medicine.price * medicine.quantity}</span>
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
                  <span>Delivery Charges ({deliveryOptions.find(opt => opt.id === urgency)?.label})</span>
                  <span>₹{deliveryCharges}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {isFirstTimeCustomer && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1">
                      First Time Customer Discount (15%)
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
                onClick={() => setShowPayment(false)}
                className="flex-1"
              >
                Back to Order
              </Button>
              <Button 
                onClick={handlePaymentSubmit}
                disabled={!paymentMethod || (paymentMethod === 'upi' && !upiId) || (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvv || !cardName))}
                className="flex-1"
                size="lg"
              >
                {paymentMethod === 'cod' ? 'Confirm Order' : `Pay ₹${totalAmount}`}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-green-600" />
            Medicine Delivery Service
          </CardTitle>
          <p className="text-gray-600">
            Order medicines from nearby pharmacies with quick delivery in your area
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Order Type */}
          <div>
            <Label className="text-base font-medium">Order Type</Label>
            <div className="flex gap-4 mt-2">
              <Button
                variant={orderType === 'prescription' ? 'default' : 'outline'}
                onClick={() => setOrderType('prescription')}
                className="flex-1"
              >
                <Camera className="w-4 h-4 mr-2" />
                Upload Prescription
              </Button>
              <Button
                variant={orderType === 'manual' ? 'default' : 'outline'}
                onClick={() => setOrderType('manual')}
                className="flex-1"
              >
                <Pill className="w-4 h-4 mr-2" />
                Enter Manually
              </Button>
            </div>
          </div>

          {/* Patient Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                placeholder="+91 XXXXX XXXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Delivery Address</Label>
            <Textarea
              id="address"
              placeholder="Enter complete address with landmark"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
            />
          </div>

          {/* Medicine Details */}
          {orderType === 'prescription' ? (
            <div>
              <Label>Upload Prescription</Label>
              {prescriptionImage ? (
                <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-medium">
                        Prescription captured: {prescriptionImage.name}
                      </span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setPrescriptionImage(null)}
                    >
                      Remove
                    </Button>
                  </div>
                  <p className="text-sm text-green-600 mt-2">
                    ✅ Your prescription has been uploaded successfully
                  </p>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Take a clear photo of your prescription</p>
                  <div className="flex gap-3 justify-center">
                    <Button onClick={handleCaptureClick}>
                      <Camera className="w-4 h-4 mr-2" />
                      Capture Prescription
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload File
                    </Button>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*,.pdf"
                    className="hidden"
                  />
                </div>
              )}
            </div>
          ) : (
            <div>
              <Label htmlFor="medicines">Medicine List</Label>
              <Textarea
                id="medicines"
                placeholder="Enter medicine names, quantities, and any specific instructions..."
                value={medicines}
                onChange={(e) => setMedicines(e.target.value)}
                rows={4}
              />
            </div>
          )}

          {/* Delivery Options */}
          <div>
            <Label className="text-base font-medium">Delivery Speed</Label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {deliveryOptions.map((option) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer border-2 transition-all ${
                    urgency === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setUrgency(option.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <h4 className="font-medium">{option.label}</h4>
                    <p className="text-sm text-gray-600">₹{option.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Nearby Pharmacies */}
          <div>
            <Label className="text-base font-medium">Available Pharmacies</Label>
            <div className="space-y-3 mt-2">
              {nearbyPharmacies.map((pharmacy, index) => (
                <Card key={index} className={`${!pharmacy.available ? 'opacity-60' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{pharmacy.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {pharmacy.distance}
                          </span>
                          <span>⭐ {pharmacy.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={pharmacy.available ? "default" : "secondary"}
                        >
                          {pharmacy.available ? 'Available' : 'Unavailable'}
                        </Badge>
                        {!pharmacy.available && (
                          <p className="text-xs text-gray-500 mt-1">Available in 24-48hrs</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleOrderSubmit}
            disabled={!patientName || !address || !phoneNumber || (!prescriptionImage && !medicines)}
            className="w-full"
            size="lg"
          >
            <Truck className="w-4 h-4 mr-2" />
            Proceed to Payment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicineDelivery;
