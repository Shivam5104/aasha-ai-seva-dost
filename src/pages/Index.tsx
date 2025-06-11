
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useLanguage } from '@/contexts/LanguageContext';
import LocationPermission from "@/components/LocationPermission";
import LocationPermissionModal from "@/components/LocationPermissionModal";
import HealthcareTabs from "@/components/HealthcareTabs";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Heart, Pill, Calendar, Phone, MapPin } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const { translations, language } = useLanguage();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);

  useEffect(() => {
    // Check if location permission was already requested
    const locationRequested = localStorage.getItem('locationRequested');
    if (!locationRequested) {
      setShowLocationModal(true);
    }
  }, []);

  const handleLocationPermission = (granted: boolean) => {
    setLocationPermissionGranted(granted);
    localStorage.setItem('locationRequested', 'true');
    if (granted) {
      localStorage.setItem('locationGranted', 'true');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <LocationPermissionModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onPermissionGranted={handleLocationPermission}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
            {translations.welcome}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {translations.health_companion} - AI-powered healthcare with 24/7 medical assistance, 
            medicine delivery, and expert consultations in your preferred language.
          </p>
          
          {user && (
            <div className="mt-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg inline-block">
              <p className="text-green-600 dark:text-green-400 font-medium">
                Welcome back! Your personalized healthcare dashboard is ready.
              </p>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-red-500 mr-3" />
                <h3 className="text-xl font-semibold dark:text-white">AI Health Assistant</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Get instant medical advice and symptom analysis with specific medicine recommendations
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Pill className="h-8 w-8 text-blue-500 mr-3" />
                <h3 className="text-xl font-semibold dark:text-white">Smart Medicine Management</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Order medicines with prescription scanning, set reminders, and track medication history
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 text-green-500 mr-3" />
                <h3 className="text-xl font-semibold dark:text-white">Doctor Appointments</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Schedule consultations with certified doctors and maintain your medical history
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Phone className="h-8 w-8 text-purple-500 mr-3" />
                <h3 className="text-xl font-semibold dark:text-white">Voice Consultation</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Talk to healthcare experts in your preferred language with real-time translation
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-8 w-8 text-orange-500 mr-3" />
                <h3 className="text-xl font-semibold dark:text-white">Emergency Services</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Find nearby hospitals and emergency contact assistance with location tracking
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-indigo-500 mr-3" />
                <h3 className="text-xl font-semibold dark:text-white">Secure & Private</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Your health data is encrypted, securely stored, and HIPAA compliant
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Location Services */}
        <div className="mb-8">
          <LocationPermission />
        </div>

        {/* Healthcare Services Tabs */}
        <HealthcareTabs language={language} />
      </div>
    </div>
  );
};

export default Index;
