
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Pill, MapPin, Clock, Phone, Truck, Camera, User } from 'lucide-react';

interface MedicineDeliveryProps {
  language: string;
}

const MedicineDelivery: React.FC<MedicineDeliveryProps> = ({ language }) => {
  const [orderType, setOrderType] = useState('prescription');
  const [patientName, setPatientName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [medicines, setMedicines] = useState('');
  const [urgency, setUrgency] = useState('standard');
  const [prescriptionImage, setPrescriptionImage] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliveryOptions = [
    { id: 'express', label: '1-2 Hours', price: '₹50', icon: '🚀' },
    { id: 'standard', label: '3-6 Hours', price: '₹20', icon: '🚚' },
    { id: 'scheduled', label: 'Schedule Later', price: '₹10', icon: '📅' }
  ];

  const nearbyPharmacies = [
    { name: 'Apollo Pharmacy', distance: '0.8 km', rating: '4.5', available: true },
    { name: 'MedPlus', distance: '1.2 km', rating: '4.3', available: true },
    { name: 'Local Chemist', distance: '0.5 km', rating: '4.0', available: false },
    { name: 'Wellness Pharmacy', distance: '2.1 km', rating: '4.4', available: true }
  ];

  const handleOrderSubmit = () => {
    setOrderPlaced(true);
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
            onClick={() => setOrderPlaced(false)}
          >
            Place Another Order
          </Button>
        </CardContent>
      </Card>
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
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Take a clear photo of your prescription</p>
                <Button variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Capture Prescription
                </Button>
              </div>
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
                    <p className="text-sm text-gray-600">{option.price}</p>
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
            disabled={!patientName || !address || !phoneNumber}
            className="w-full"
            size="lg"
          >
            <Truck className="w-4 h-4 mr-2" />
            Place Order - ₹{urgency === 'express' ? '50' : urgency === 'standard' ? '20' : '10'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicineDelivery;
