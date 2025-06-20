
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Navigation, Hospital, Clock, AlertTriangle } from 'lucide-react';
import { locationService, Hospital as HospitalType } from '@/services/locationService';

const LocationPermission: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(locationService.getUserLocation());
  const [nearbyHospitals, setNearbyHospitals] = useState<HospitalType[]>([]);
  const [showHospitals, setShowHospitals] = useState(false);

  const requestLocation = async () => {
    setIsLoading(true);
    try {
      const granted = await locationService.requestPermission();
      setHasPermission(granted);
      if (granted) {
        const location = locationService.getUserLocation();
        setUserLocation(location);
        const hospitals = locationService.findNearbyHospitals();
        setNearbyHospitals(hospitals);
      }
    } catch (error) {
      console.error('Location error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmergencyCall = () => {
    locationService.makeEmergencyCall('108'); // Indian emergency number
  };

  return (
    <div className="space-y-4">
      {/* Location Permission Card */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <MapPin className="w-5 h-5" />
            Location Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!hasPermission ? (
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Enable location to find nearby hospitals and emergency services
              </p>
              <Button 
                onClick={requestLocation} 
                disabled={isLoading}
                className="w-full"
              >
                <Navigation className="w-4 h-4 mr-2" />
                {isLoading ? 'Getting Location...' : 'Enable Location'}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">Location Enabled</Badge>
              </div>
              {userLocation?.address && (
                <p className="text-sm text-gray-600">
                  📍 {userLocation.address}
                </p>
              )}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowHospitals(!showHospitals)}
                >
                  <Hospital className="w-4 h-4 mr-1" />
                  {showHospitals ? 'Hide' : 'Find'} Hospitals
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Call Card */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-red-800 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Emergency Services
              </h4>
              <p className="text-sm text-red-600">24/7 Emergency Medical Assistance</p>
            </div>
            <Button 
              variant="destructive" 
              onClick={handleEmergencyCall}
              size="lg"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call 108
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Nearby Hospitals */}
      {showHospitals && nearbyHospitals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hospital className="w-5 h-5 text-green-600" />
              Nearby Hospitals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {nearbyHospitals.map((hospital) => (
                <div key={hospital.id} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium flex items-center gap-2">
                        {hospital.name}
                        <Badge variant="outline" className="text-xs">
                          {hospital.type}
                        </Badge>
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{hospital.address}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-blue-600 flex items-center gap-1">
                          <Navigation className="w-3 h-3" />
                          {hospital.distance} km away
                        </span>
                        <span className="text-sm text-green-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          ~{Math.ceil(hospital.distance * 3)} mins
                        </span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(`tel:${hospital.phone}`, '_self')}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LocationPermission;
