
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  translations: Record<string, string>;
  fontClass: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languageFonts = {
  english: 'font-sans',
  hindi: 'font-serif',
  marathi: 'font-serif', 
  telugu: 'font-serif',
  kannada: 'font-serif',
  bhojpuri: 'font-serif',
  kashmiri: 'font-serif',
  odia: 'font-serif',
  gujarati: 'font-serif',
  punjabi: 'font-serif',
  bengali: 'font-serif',
  tamil: 'font-serif',
  malayalam: 'font-serif',
  assamese: 'font-serif',
  urdu: 'font-serif'
};

const translations = {
  english: {
    welcome: 'Welcome to Aasha AI Seva',
    health_companion: 'Your Health Companion',
    sign_in: 'Sign In',
    symptom_checker: 'AI Symptom Checker',
    medicine_delivery: 'Medicine Delivery',
    doctor_appointment: 'Doctor Appointment'
  },
  hindi: {
    welcome: 'आशा AI सेवा में आपका स्वागत है',
    health_companion: 'आपका स्वास्थ्य साथी',
    sign_in: 'साइन इन करें',
    symptom_checker: 'AI लक्षण जांचकर्ता',
    medicine_delivery: 'दवा वितरण',
    doctor_appointment: 'डॉक्टर की नियुक्ति'
  },
  marathi: {
    welcome: 'आशा AI सेवामध्ये तुमचे स्वागत',
    health_companion: 'तुमचा आरोग्य साथी',
    sign_in: 'साइन इन करा',
    symptom_checker: 'AI लक्षण तपासणी',
    medicine_delivery: 'औषध वितरण',
    doctor_appointment: 'डॉक्टरांची भेट'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('english');

  const applyFont = (lang: string) => {
    const fontClass = languageFonts[lang as keyof typeof languageFonts] || 'font-sans';
    
    // Remove all existing font classes
    document.documentElement.classList.remove('font-sans', 'font-serif', 'font-mono');
    
    // Add the new font class
    document.documentElement.classList.add(fontClass);
    
    // Also apply to body for better coverage
    document.body.classList.remove('font-sans', 'font-serif', 'font-mono');
    document.body.classList.add(fontClass);
    
    console.log('Font applied:', fontClass, 'for language:', lang);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    applyFont(newLanguage);
    console.log('Language changed to:', newLanguage);
  };

  useEffect(() => {
    // Apply initial font
    applyFont(language);
  }, [language]);

  const contextValue: LanguageContextType = {
    language,
    setLanguage: handleLanguageChange,
    translations: translations[language as keyof typeof translations] || translations.english,
    fontClass: languageFonts[language as keyof typeof languageFonts] || 'font-sans'
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
