
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SymptomChecker from '@/components/SymptomChecker';
import MedicineDelivery from '@/components/MedicineDelivery';
import DoctorSchedule from '@/components/DoctorSchedule';
import { MedicationAlarm } from '@/components/MedicationAlarm';
import { MedicalHistory } from '@/components/MedicalHistory';
import VoiceCall from '@/components/VoiceCall';
import AIChatbot from '@/components/AIChatbot';
import { Heart, Pill, Calendar, Clock, FileText, Phone, Bot } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface HealthcareTabsProps {
  language: string;
}

const HealthcareTabs: React.FC<HealthcareTabsProps> = ({ language }) => {
  const { translations } = useLanguage();

  return (
    <div className="w-full">
      <Tabs defaultValue="symptom-checker" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 mb-8 h-auto p-1">
          <TabsTrigger value="symptom-checker" className="flex flex-col items-center gap-1 p-3 text-xs">
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">{translations.symptom_checker}</span>
            <span className="sm:hidden">{translations.symptoms}</span>
          </TabsTrigger>
          <TabsTrigger value="medicine-delivery" className="flex flex-col items-center gap-1 p-3 text-xs">
            <Pill className="w-4 h-4" />
            <span className="hidden sm:inline">{translations.medicine_delivery}</span>
            <span className="sm:hidden">{translations.medicine}</span>
          </TabsTrigger>
          <TabsTrigger value="doctor-schedule" className="flex flex-col items-center gap-1 p-3 text-xs">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">{translations.doctor_appointment}</span>
            <span className="sm:hidden">{translations.doctor}</span>
          </TabsTrigger>
          <TabsTrigger value="medication-alarm" className="flex flex-col items-center gap-1 p-3 text-xs">
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">{translations.medication_alarms}</span>
            <span className="sm:hidden">{translations.alarms}</span>
          </TabsTrigger>
          <TabsTrigger value="medical-history" className="flex flex-col items-center gap-1 p-3 text-xs">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">{translations.medical_history}</span>
            <span className="sm:hidden">{translations.history}</span>
          </TabsTrigger>
          <TabsTrigger value="voice-support" className="flex flex-col items-center gap-1 p-3 text-xs">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">{translations.voice_support}</span>
            <span className="sm:hidden">{translations.voice}</span>
          </TabsTrigger>
          <TabsTrigger value="ai-assistant" className="flex flex-col items-center gap-1 p-3 text-xs">
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">{translations.ai_assistant}</span>
            <span className="sm:hidden">{translations.ai_chat}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="symptom-checker" className="mt-0">
          <SymptomChecker language={language} />
        </TabsContent>

        <TabsContent value="medicine-delivery" className="mt-0">
          <MedicineDelivery language={language} />
        </TabsContent>

        <TabsContent value="doctor-schedule" className="mt-0">
          <DoctorSchedule language={language} />
        </TabsContent>

        <TabsContent value="medication-alarm" className="mt-0">
          <MedicationAlarm />
        </TabsContent>

        <TabsContent value="medical-history" className="mt-0">
          <MedicalHistory />
        </TabsContent>

        <TabsContent value="voice-support" className="mt-0">
          <VoiceCall language={language} />
        </TabsContent>

        <TabsContent value="ai-assistant" className="mt-0">
          <AIChatbot />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthcareTabs;
