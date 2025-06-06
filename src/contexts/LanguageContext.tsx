
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
    sign_in: 'Sign In'
  },
  hindi: {
    welcome: 'आशा AI सेवा में आपका स्वागत है',
    health_companion: 'आपका स्वास्थ्य साथी',
    sign_in: 'साइन इन करें'
  },
  marathi: {
    welcome: 'आशा AI सेवामध्ये तुमचे स्वागत',
    health_companion: 'तुमचा आरोग्य साथी',
    sign_in: 'साइन इन करा'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('english');

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    console.log('Language changed to:', newLanguage);
    
    // Apply font changes to document
    const fontClass = languageFonts[newLanguage as keyof typeof languageFonts] || 'font-sans';
    document.documentElement.className = document.documentElement.className.replace(/font-\w+/g, '') + ' ' + fontClass;
  };

  useEffect(() => {
    // Apply initial font
    const fontClass = languageFonts[language as keyof typeof languageFonts] || 'font-sans';
    document.documentElement.className = document.documentElement.className.replace(/font-\w+/g, '') + ' ' + fontClass;
  }, []);

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
