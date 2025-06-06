
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
  },
  telugu: {
    welcome: 'ఆశా AI సేవకు స్వాగతం',
    health_companion: 'మీ ఆరోగ్య సహచరుడు',
    sign_in: 'సైన్ ఇన్',
    symptom_checker: 'AI లక్షణ తనిఖీ',
    medicine_delivery: 'ఔషధ పంపిణీ',
    doctor_appointment: 'వైద్య నియామకం'
  },
  kannada: {
    welcome: 'ಆಶಾ AI ಸೇವೆಗೆ ಸ್ವಾಗತ',
    health_companion: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ಸಹಚರ',
    sign_in: 'ಸೈನ್ ಇನ್',
    symptom_checker: 'AI ಲಕ್ಷಣ ಪರೀಕ್ಷಕ',
    medicine_delivery: 'ಔಷಧ ವಿತರಣೆ',
    doctor_appointment: 'ವೈದ್ಯ ನೇಮಕಾತಿ'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('english');

  const applyFontToDocument = (fontClass: string) => {
    console.log('Applying font class:', fontClass);
    
    // Remove existing dynamic font styles
    const existingStyle = document.getElementById('dynamic-font-style');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    // Get font family
    const fontFamily = getFontFamily(fontClass);
    
    // Create comprehensive style injection
    const style = document.createElement('style');
    style.id = 'dynamic-font-style';
    style.textContent = `
      html, body, #root {
        font-family: ${fontFamily} !important;
      }
      *, *::before, *::after {
        font-family: ${fontFamily} !important;
      }
      .${fontClass}, .${fontClass} * {
        font-family: ${fontFamily} !important;
      }
    `;
    
    document.head.appendChild(style);
    
    // Also apply classes to document elements
    document.documentElement.className = document.documentElement.className.replace(/font-\w+/g, '') + ' ' + fontClass;
    document.body.className = document.body.className.replace(/font-\w+/g, '') + ' ' + fontClass;
  };

  const getFontFamily = (fontClass: string): string => {
    const fontMap: Record<string, string> = {
      'font-hindi': "'Noto Sans Devanagari', 'Arial Unicode MS', sans-serif",
      'font-telugu': "'Noto Sans Telugu', 'Gautami', sans-serif", 
      'font-kannada': "'Noto Sans Kannada', 'Tunga', sans-serif",
      'font-odia': "'Noto Sans Oriya', 'Kalinga', sans-serif",
      'font-gujarati': "'Noto Sans Gujarati', 'Shruti', sans-serif",
      'font-punjabi': "'Noto Sans Gurmukhi', 'Raavi', sans-serif",
      'font-bengali': "'Noto Sans Bengali', 'Vrinda', sans-serif",
      'font-tamil': "'Noto Sans Tamil', 'Latha', sans-serif",
      'font-malayalam': "'Noto Sans Malayalam', 'Kartika', sans-serif",
      'font-urdu': "'Noto Nastaliq Urdu', 'Aleem', sans-serif",
      'font-sans': "system-ui, -apple-system, sans-serif"
    };
    return fontMap[fontClass] || "system-ui, -apple-system, sans-serif";
  };

  const handleLanguageChange = (newLanguage: string) => {
    console.log('Language changing to:', newLanguage);
    setLanguage(newLanguage);
    
    const fontClass = languageFonts[newLanguage as keyof typeof languageFonts] || 'font-sans';
    console.log('Applying font class:', fontClass);
    
    // Force immediate font application
    setTimeout(() => {
      applyFontToDocument(fontClass);
    }, 100);
  };

  useEffect(() => {
    const fontClass = languageFonts[language as keyof typeof languageFonts] || 'font-sans';
    applyFontToDocument(fontClass);
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
