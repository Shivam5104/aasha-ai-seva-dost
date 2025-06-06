
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
  hindi: 'font-hindi',
  marathi: 'font-hindi', 
  telugu: 'font-telugu',
  kannada: 'font-kannada',
  bhojpuri: 'font-hindi',
  kashmiri: 'font-hindi',
  odia: 'font-odia',
  gujarati: 'font-gujarati',
  punjabi: 'font-punjabi',
  bengali: 'font-bengali',
  tamil: 'font-tamil',
  malayalam: 'font-malayalam',
  assamese: 'font-bengali',
  urdu: 'font-urdu'
};

// Add Google Fonts link dynamically
const addGoogleFonts = () => {
  const existingLink = document.getElementById('google-fonts');
  if (!existingLink) {
    const link = document.createElement('link');
    link.id = 'google-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&family=Noto+Sans+Telugu:wght@400;700&family=Noto+Sans+Kannada:wght@400;700&family=Noto+Sans+Oriya:wght@400;700&family=Noto+Sans+Gujarati:wght@400;700&family=Noto+Sans+Gurmukhi:wght@400;700&family=Noto+Sans+Bengali:wght@400;700&family=Noto+Sans+Tamil:wght@400;700&family=Noto+Sans+Malayalam:wght@400;700&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap';
    document.head.appendChild(link);
  }
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
    
    // Add Google Fonts
    addGoogleFonts();
    
    // Remove all existing font classes
    document.documentElement.classList.remove(
      'font-sans', 'font-serif', 'font-mono', 
      'font-hindi', 'font-telugu', 'font-kannada', 'font-odia',
      'font-gujarati', 'font-punjabi', 'font-bengali', 'font-tamil',
      'font-malayalam', 'font-urdu'
    );
    
    // Add the new font class
    document.documentElement.classList.add(fontClass);
    
    // Also apply to body for better coverage
    document.body.classList.remove(
      'font-sans', 'font-serif', 'font-mono',
      'font-hindi', 'font-telugu', 'font-kannada', 'font-odia',
      'font-gujarati', 'font-punjabi', 'font-bengali', 'font-tamil',
      'font-malayalam', 'font-urdu'
    );
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
