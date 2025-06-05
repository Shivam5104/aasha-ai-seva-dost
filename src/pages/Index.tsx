
import React from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import LocationPermission from "@/components/LocationPermission";
import SymptomChecker from "@/components/SymptomChecker";
import AIChatbot from "@/components/AIChatbot";
import MedicineDelivery from "@/components/MedicineDelivery";
import DoctorSchedule from "@/components/DoctorSchedule";
import VoiceCall from "@/components/VoiceCall";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Heart, Pill, Calendar, Phone, MapPin } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Welcome to{" "}
            <span className="text-blue-600">Aasha AI Seva</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your AI-powered healthcare companion providing 24/7 medical assistance, 
            medicine delivery, and expert consultations in your preferred language.
          </p>
          
          {user && (
            <div className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-lg inline-block">
              <p className="text-green-600 font-medium">
                Welcome back! Your personalized healthcare dashboard is ready.
              </p>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-red-500 mr-3" />
                <h3 className="text-xl font-semibold">AI Health Assistant</h3>
              </div>
              <p className="text-gray-600">
                Get instant medical advice and symptom analysis powered by advanced AI
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Pill className="h-8 w-8 text-blue-500 mr-3" />
                <h3 className="text-xl font-semibold">Medicine Delivery</h3>
              </div>
              <p className="text-gray-600">
                Order medicines online with home delivery and prescription scanning
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 text-green-500 mr-3" />
                <h3 className="text-xl font-semibold">Doctor Appointments</h3>
              </div>
              <p className="text-gray-600">
                Schedule consultations with certified doctors and specialists
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Phone className="h-8 w-8 text-purple-500 mr-3" />
                <h3 className="text-xl font-semibold">Voice Consultation</h3>
              </div>
              <p className="text-gray-600">
                Talk to healthcare experts in your preferred language
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-8 w-8 text-orange-500 mr-3" />
                <h3 className="text-xl font-semibold">Emergency Services</h3>
              </div>
              <p className="text-gray-600">
                Find nearby hospitals and emergency contact assistance
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-indigo-500 mr-3" />
                <h3 className="text-xl font-semibold">Secure & Private</h3>
              </div>
              <p className="text-gray-600">
                Your health data is encrypted and securely stored
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <LocationPermission />
          <SymptomChecker />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <MedicineDelivery />
          <DoctorSchedule />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <VoiceCall />
          <AIChatbot />
        </div>
      </div>
    </div>
  );
};

export default Index;
