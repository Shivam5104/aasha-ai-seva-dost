
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Pill, MapPin, Camera, Truck, User, Upload } from 'lucide-react';
import OrderSummary from './medicine/OrderSummary';
import PaymentMethods from './medicine/PaymentMethods';
import PrescriptionUpload from './medicine/PrescriptionUpload';
import OrderConfirmation from './medicine/OrderConfirmation';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock medicines from prescription analysis with very low prices
  const [prescriptionMedicines, setPrescriptionMedicines] = useState<Medicine[]>([
    { name: 'Paracetamol 500mg (10 tablets)', price: 15, quantity: 1, available: true },
    { name: 'Amoxicillin 250mg (10 capsules)', price: 25, quantity: 1, available: true },
    { name: 'Vitamin D3 (4 tablets)', price: 12, quantity: 1, available: true }
  ]);

  const deliveryOptions = [
    { id: 'express', label: '1-2 Hours', price: 15, icon: '🚀' },
    { id: 'standard', label: '3-6 Hours', price: 8, icon: '🚚' },
    { id: 'scheduled', label: 'Schedule Later', price: 5, icon: '📅' }
  ];

  const nearbyPharmacies = [
    { name: 'Apollo Pharmacy', distance: '0.8 km', rating: '4.5', available: true },
    { name: 'MedPlus', distance: '1.2 km', rating: '4.3', available: true },
    { name: 'Local Chemist', distance: '0.5 km', rating: '4.0', available: false },
    { name: 'Wellness Pharmacy', distance: '2.1 km', rating: '4.4', available: true }
  ];

  // Calculate pricing
  const medicineTotal = prescriptionMedicines.reduce((sum, med) => sum + (med.price * med.quantity), 0);
  const deliveryCharges = deliveryOptions.find(opt => opt.id === urgency)?.price || 8;
  const subtotal = medicineTotal + deliveryCharges;
  const isFirstTimeCustomer = true;
  const discount = isFirstTimeCustomer ? Math.round(subtotal * 0.50) : 0; // 50% first-time discount
  const afterDiscount = subtotal - discount;
  const gst = Math.round(afterDiscount * 0.18);
  const totalAmount = afterDiscount + gst;

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedMedicines = [...prescriptionMedicines];
    updatedMedicines[index].quantity = newQuantity;
    setPrescriptionMedicines(updatedMedicines);
  };

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
      });
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

  const cancelCapture = () => {
    setIsCapturing(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handlePlaceAnotherOrder = () => {
    setOrderPlaced(false);
    setShowPayment(false);
    setPrescriptionImage(null);
    setMedicines('');
    setPaymentMethod('');
    setUpiId('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setCardName('');
    setPrescriptionMedicines([
      { name: 'Paracetamol 500mg (10 tablets)', price: 15, quantity: 1, available: true },
      { name: 'Amoxicillin 250mg (10 capsules)', price: 25, quantity: 1, available: true },
      { name: 'Vitamin D3 (4 tablets)', price: 12, quantity: 1, available: true }
    ]);
  };

  if (orderPlaced) {
    return (
      <OrderConfirmation 
        totalAmount={totalAmount}
        paymentMethod={paymentMethod}
        onPlaceAnotherOrder={handlePlaceAnotherOrder}
      />
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
        <OrderSummary 
          medicines={prescriptionMedicines}
          onQuantityChange={handleQuantityChange}
          deliveryCharges={deliveryCharges}
          deliveryOption={urgency}
          onProceedToPayment={() => {}}
        />
        <PaymentMethods 
          totalAmount={totalAmount}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          upiId={upiId}
          setUpiId={setUpiId}
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          cardExpiry={cardExpiry}
          setCardExpiry={setCardExpiry}
          cardCvv={cardCvv}
          setCardCvv={setCardCvv}
          cardName={cardName}
          setCardName={setCardName}
          onPaymentSubmit={handlePaymentSubmit}
          onBack={() => setShowPayment(false)}
        />
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
            Order medicines from nearby pharmacies with quick delivery in your area. 
            <span className="text-green-600 font-medium"> New customers get 50% off!</span>
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
            <PrescriptionUpload 
              prescriptionImage={prescriptionImage}
              setPrescriptionImage={setPrescriptionImage}
              onCaptureClick={handleCaptureClick}
            />
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
