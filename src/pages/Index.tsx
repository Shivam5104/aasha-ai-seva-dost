
import React from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useLanguage } from '@/contexts/LanguageContext';
import LocationPermission from "@/components/LocationPermission";
import SymptomChecker from "@/components/SymptomChecker";
import AIChatbot from "@/components/AIChatbot";
import MedicineDelivery from "@/components/MedicineDelivery";
import DoctorSchedule from "@/components/DoctorSchedule";
import VoiceCall from "@/components/VoiceCall";
import { MedicationAlarm } from "@/components/MedicationAlarm";
import { MedicalHistory } from "@/components/MedicalHistory";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Heart, Pill, Calendar, Phone, MapPin } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const { translations, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
            {translations.welcome}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {translations.health_companion} - {translations.ai_powered_healthcare}
          </p>
          
          {user && (
            <div className="mt-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg inline-block">
              <p className="text-green-600 dark:text-green-400 font-medium">
                {translations.welcome_back}
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
                <h3 className="text-xl font-semibold dark:text-white">{translations.ai_health_assistant}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {translations.instant_medical_advice}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Pill className="h-8 w-8 text-blue-500 mr-3" />
                <h3 className="text-xl font-semibold dark:text-white">{translations.smart_medicine_management}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {translations.order_medicines}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 text-green-500 mr-3" />
                <h3 className="text-xl font-semibold dark:text-white">{translations.doctor_appointments}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {translations.schedule_consultations}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Phone className="h-8 w-8 text-purple-500 mr-3" />
                <h3 className="text-xl font-semibold dark:text-white">{translations.voice_consultation}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {translations.talk_to_experts}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-8 w-8 text-orange-500 mr-3" />
                <h3 className="text-xl font-semibold dark:text-white">{translations.emergency_services}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {translations.find_nearby_hospitals}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-indigo-500 mr-3" />
                <h3 className="text-xl font-semibold dark:text-white">{translations.secure_private}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {translations.health_data_encrypted}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <LocationPermission />
          <SymptomChecker language={language} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <MedicineDelivery language={language} />
          <DoctorSchedule language={language} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <MedicationAlarm />
          <MedicalHistory />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <VoiceCall language={language} />
          <AIChatbot />
        </div>
      </div>
    </div>
  );
};

export default Index;
