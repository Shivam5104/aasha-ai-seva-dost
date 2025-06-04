
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, Pill, Phone, MapPin, Clock, Heart, Languages, User, Bell } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import SymptomChecker from '@/components/SymptomChecker';
import MedicineDelivery from '@/components/MedicineDelivery';
import VoiceCall from '@/components/VoiceCall';
import DoctorSchedule from '@/components/DoctorSchedule';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { selectedLanguage, setSelectedLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();

  const features = [
    {
      icon: <Stethoscope className="w-8 h-8 text-blue-600" />,
      title: t('aiConsultation'),
      description: t('aiConsultationDesc'),
      tab: "symptoms"
    },
    {
      icon: <Pill className="w-8 h-8 text-green-600" />,
      title: t('medicineDelivery'),
      description: t('medicineDeliveryDesc'),
      tab: "delivery"
    },
    {
      icon: <Phone className="w-8 h-8 text-purple-600" />,
      title: t('voiceSupportTitle'),
      description: t('voiceSupportDesc'),
      tab: "voice"
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: t('doctorAppointments'),
      description: t('doctorAppointmentsDesc'),
      tab: "schedule"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'symptoms':
        return <SymptomChecker language={selectedLanguage} />;
      case 'delivery':
        return <MedicineDelivery language={selectedLanguage} />;
      case 'voice':
        return <VoiceCall language={selectedLanguage} />;
      case 'schedule':
        return <DoctorSchedule language={selectedLanguage} />;
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-2xl">
              <div className="flex justify-center mb-4">
                <div className="bg-white p-4 rounded-full shadow-lg">
                  <Heart className="w-12 h-12 text-red-500" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {t('heroTitle')}
              </h1>
              <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
                {t('heroDescription')}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">{t('available24_7')}</Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-800">{t('languages15')}</Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">{t('sameDayDelivery')}</Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">{t('voiceSupport')}</Badge>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => setActiveTab(feature.tab)}>
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Emergency Section */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-700 flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  {t('emergencyServices')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600 mb-4">
                  {t('emergencyDesc')}
                </p>
                <div className="flex gap-4">
                  <Button variant="destructive" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    {t('callEmergency')}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MapPin className="w-4 h-4 mr-2" />
                    {t('findHospital')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-blue-800">{t('consultations')}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">15+</div>
                <div className="text-sm text-green-800">{t('languages15')}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-purple-800">{t('available24_7')}</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">2Hr</div>
                <div className="text-sm text-orange-800">{t('avgDelivery')}</div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-lg">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-800">{t('appTitle')}</h1>
                <p className="text-sm text-gray-600">{t('appSubtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector 
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                {t('profile')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      {activeTab !== 'home' && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-1 py-2">
              <Button 
                variant={activeTab === 'home' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setActiveTab('home')}
              >
                {t('home')}
              </Button>
              <Button 
                variant={activeTab === 'symptoms' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setActiveTab('symptoms')}
              >
                {t('symptomChecker')}
              </Button>
              <Button 
                variant={activeTab === 'delivery' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setActiveTab('delivery')}
              >
                {t('medicineDelivery')}
              </Button>
              <Button 
                variant={activeTab === 'voice' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setActiveTab('voice')}
              >
                {t('voiceSupportTitle')}
              </Button>
              <Button 
                variant={activeTab === 'schedule' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setActiveTab('schedule')}
              >
                {t('schedule')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-2">{t('footerText')}</p>
          <p className="text-gray-400 text-sm">
            {t('footerContact')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
