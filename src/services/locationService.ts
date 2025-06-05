
export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: number;
  latitude: number;
  longitude: number;
  type: 'General' | 'Emergency' | 'Specialty';
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  address?: string;
}

class LocationService {
  private userLocation: UserLocation | null = null;

  async requestPermission(): Promise<boolean> {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported by this browser');
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        });
      });

      this.userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      // Get address from coordinates
      await this.getAddressFromCoordinates(this.userLocation.latitude, this.userLocation.longitude);
      
      return true;
    } catch (error) {
      console.error('Location permission denied:', error);
      return false;
    }
  }

  private async getAddressFromCoordinates(lat: number, lng: number): Promise<void> {
    try {
      // Using a free geocoding service (in production, use Google Maps API or similar)
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      const data = await response.json();
      
      if (this.userLocation) {
        this.userLocation.address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      }
    } catch (error) {
      console.error('Error getting address:', error);
      if (this.userLocation) {
        this.userLocation.address = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      }
    }
  }

  getUserLocation(): UserLocation | null {
    return this.userLocation;
  }

  // Mock hospital data - in production, this would come from a real API
  findNearbyHospitals(radiusKm: number = 10): Hospital[] {
    if (!this.userLocation) return [];

    const mockHospitals: Hospital[] = [
      {
        id: '1',
        name: 'City General Hospital',
        address: '123 Main Street, City Center',
        phone: '+91 11-2345-6789',
        distance: 2.5,
        latitude: this.userLocation.latitude + 0.01,
        longitude: this.userLocation.longitude + 0.01,
        type: 'General'
      },
      {
        id: '2',
        name: 'Emergency Care Center',
        address: '456 Emergency Ave, Medical District',
        phone: '+91 11-9876-5432',
        distance: 1.8,
        latitude: this.userLocation.latitude - 0.008,
        longitude: this.userLocation.longitude + 0.012,
        type: 'Emergency'
      },
      {
        id: '3',
        name: 'Metro Heart Institute',
        address: '789 Cardiac Lane, Health Zone',
        phone: '+91 11-5555-1234',
        distance: 4.2,
        latitude: this.userLocation.latitude + 0.02,
        longitude: this.userLocation.longitude - 0.015,
        type: 'Specialty'
      },
      {
        id: '4',
        name: 'Community Health Center',
        address: '321 Community Road, Suburb',
        phone: '+91 11-7777-8888',
        distance: 3.1,
        latitude: this.userLocation.latitude - 0.015,
        longitude: this.userLocation.longitude - 0.01,
        type: 'General'
      }
    ];

    return mockHospitals
      .filter(hospital => hospital.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);
  }

  makeEmergencyCall(number: string = '108') {
    // Indian emergency number
    window.open(`tel:${number}`, '_self');
  }
}

export const locationService = new LocationService();
