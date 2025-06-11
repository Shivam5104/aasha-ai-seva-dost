
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, AlertTriangle } from 'lucide-react';
import { locationService } from '@/services/locationService';

interface LocationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPermissionGranted: (granted: boolean) => void;
}

const LocationPermissionModal: React.FC<LocationPermissionModalProps> = ({
  isOpen,
  onClose,
  onPermissionGranted
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAllowLocation = async () => {
    setIsLoading(true);
    try {
      const granted = await locationService.requestPermission();
      onPermissionGranted(granted);
      onClose();
    } catch (error) {
      console.error('Location permission error:', error);
      onPermissionGranted(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDenyLocation = () => {
    onPermissionGranted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-800">
            <MapPin className="w-6 h-6" />
            Location Permission
          </DialogTitle>
          <DialogDescription className="text-left mt-4">
            <div className="space-y-4">
              <p>
                To provide you with the best healthcare experience, we'd like to access your location to:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Find nearby hospitals and pharmacies
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Enable emergency services
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Provide location-based health recommendations
                </li>
              </ul>
              <div className="bg-orange-50 p-3 rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-orange-800">
                  Your location data is kept private and secure. You can change this setting anytime.
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button 
            onClick={handleAllowLocation}
            disabled={isLoading}
            className="flex-1"
          >
            <Navigation className="w-4 h-4 mr-2" />
            {isLoading ? 'Getting Location...' : 'Allow Location'}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDenyLocation}
            disabled={isLoading}
            className="flex-1"
          >
            Not Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationPermissionModal;
