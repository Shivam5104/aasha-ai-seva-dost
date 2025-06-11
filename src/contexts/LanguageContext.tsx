
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
    doctor_appointment: 'Doctor Appointment',
    medication_alarms: 'Medication Alarms',
    medical_history: 'Medical History',
    voice_support: 'Voice Support',
    ai_assistant: 'AI Assistant',
    
    // Page description
    page_description: 'AI-powered healthcare with 24/7 medical assistance, medicine delivery, and expert consultations in your preferred language.',
    welcome_back: 'Welcome back! Your personalized healthcare dashboard is ready.',
    
    // Feature cards
    ai_health_assistant: 'AI Health Assistant',
    ai_health_description: 'Get instant medical advice and symptom analysis with specific medicine recommendations',
    
    smart_medicine_management: 'Smart Medicine Management',
    smart_medicine_description: 'Order medicines with prescription scanning, set reminders, and track medication history',
    
    doctor_appointments: 'Doctor Appointments',
    doctor_appointments_description: 'Schedule consultations with certified doctors and maintain your medical history',
    
    voice_consultation: 'Voice Consultation',
    voice_consultation_description: 'Talk to healthcare experts in your preferred language with real-time translation',
    
    emergency_services: 'Emergency Services',
    emergency_services_description: 'Find nearby hospitals and emergency contact assistance with location tracking',
    
    secure_private: 'Secure & Private',
    secure_private_description: 'Your health data is encrypted, securely stored, and HIPAA compliant',
    
    // Tab labels
    symptoms: 'Symptoms',
    medicine: 'Medicine',
    doctor: 'Doctor',
    alarms: 'Alarms',
    history: 'History',
    voice: 'Voice',
    ai_chat: 'AI Chat'
  },
  hindi: {
    welcome: 'आशा AI सेवा में आपका स्वागत है',
    health_companion: 'आपका स्वास्थ्य साथी',
    sign_in: 'साइन इन करें',
    symptom_checker: 'AI लक्षण जांचकर्ता',
    medicine_delivery: 'दवा वितरण',
    doctor_appointment: 'डॉक्टर की नियुक्ति',
    medication_alarms: 'दवा अलार्म',
    medical_history: 'चिकित्सा इतिहास',
    voice_support: 'आवाज सहायता',
    ai_assistant: 'AI सहायक',
    
    page_description: '24/7 चिकित्सा सहायता, दवा वितरण, और आपकी पसंदीदा भाषा में विशेषज्ञ परामर्श के साथ AI-संचालित स्वास्थ्य सेवा।',
    welcome_back: 'वापसी पर स्वागत है! आपका व्यक्तिगत स्वास्थ्य डैशबोर्ड तैयार है।',
    
    ai_health_assistant: 'AI स्वास्थ्य सहायक',
    ai_health_description: 'विशिष्ट दवा सिफारिशों के साथ तत्काल चिकित्सा सलाह और लक्षण विश्लेषण प्राप्त करें',
    
    smart_medicine_management: 'स्मार्ट दवा प्रबंधन',
    smart_medicine_description: 'प्रिस्क्रिप्शन स्कैनिंग के साथ दवाएं ऑर्डर करें, रिमाइंडर सेट करें, और दवा इतिहास ट्रैक करें',
    
    doctor_appointments: 'डॉक्टर की नियुक्तियां',
    doctor_appointments_description: 'प्रमाणित डॉक्टरों के साथ परामर्श निर्धारित करें और अपना चिकित्सा इतिहास बनाए रखें',
    
    voice_consultation: 'आवाज परामर्श',
    वoice_consultation_description: 'रीयल-टाइम अनुवाद के साथ अपनी पसंदीदा भाषा में स्वास्थ्य विशेषज्ञों से बात करें',
    
    emergency_services: 'आपातकालीन सेवाएं',
    emergency_services_description: 'स्थान ट्रैकिंग के साथ नजदीकी अस्पताल और आपातकालीन संपर्क सहायता खोजें',
    
    secure_private: 'सुरक्षित और निजी',
    secure_private_description: 'आपका स्वास्थ्य डेटा एन्क्रिप्टेड, सुरक्षित रूप से संग्रहीत, और HIPAA अनुपालित है',
    
    symptoms: 'लक्षण',
    medicine: 'दवा',
    doctor: 'डॉक्टर',
    alarms: 'अलार्म',
    history: 'इतिहास',
    voice: 'आवाज',
    ai_chat: 'AI चैट'
  },
  marathi: {
    welcome: 'आशा AI सेवामध्ये तुमचे स्वागत',
    health_companion: 'तुमचा आरोग्य साथी',
    sign_in: 'साइन इन करा',
    symptom_checker: 'AI लक्षण तपासणी',
    medicine_delivery: 'औषध वितरण',
    doctor_appointment: 'डॉक्टरांची भेट',
    medication_alarms: 'औषध अलार्म',
    medical_history: 'वैद्यकीय इतिहास',
    voice_support: 'आवाज समर्थन',
    ai_assistant: 'AI सहाय्यक',
    
    page_description: '24/7 वैद्यकीय सहाय्य, औषध वितरण, आणि तुमच्या पसंतीच्या भाषेत तज्ञ सल्ला यासह AI-चालित आरोग्य सेवा।',
    welcome_back: 'परतीच्या वेळी स्वागत! तुमचा वैयक्तिक आरोग्य डॅशबोर्ड तयार आहे।',
    
    ai_health_assistant: 'AI आरोग्य सहाय्यक',
    ai_health_description: 'विशिष्ट औषध शिफारसींसह तत्काळ वैद्यकीय सल्ला आणि लक्षण विश्लेषण मिळवा',
    
    smart_medicine_management: 'स्मार्ट औषध व्यवस्थापन',
    smart_medicine_description: 'प्रिस्क्रिप्शन स्कॅनिंगसह औषधे ऑर्डर करा, रिमाइंडर सेट करा, आणि औषध इतिहास ट्रॅक करा',
    
    doctor_appointments: 'डॉक्टरांच्या भेटी',
    doctor_appointments_description: 'प्रमाणित डॉक्टरांसोबत सल्लामसलत निर्धारित करा आणि तुमचा वैद्यकीय इतिहास राखा',
    
    voice_consultation: 'आवाज सल्ला',
    voice_consultation_description: 'रिअल-टाइम भाषांतरासह तुमच्या पसंतीच्या भाषेत आरोग्य तज्ञांशी बोला',
    
    emergency_services: 'आपत्कालीन सेवा',
    emergency_services_description: 'स्थान ट्रॅकिंगसह जवळपासची रुग्णालये आणि आपत्कालीन संपर्क सहाय्य शोधा',
    
    secure_private: 'सुरक्षित आणि खाजगी',
    secure_private_description: 'तुमचा आरोग्य डेटा एन्क्रिप्टेड, सुरक्षितपणे संग्रहीत आणि HIPAA अनुपालित आहे',
    
    symptoms: 'लक्षणे',
    medicine: 'औषध',
    doctor: 'डॉक्टर',
    alarms: 'अलार्म',
    history: 'इतिहास',
    voice: 'आवाज',
    ai_chat: 'AI चॅट'
  },
  telugu: {
    welcome: 'ఆశా AI సేవకు స్వాగతం',
    health_companion: 'మీ ఆరోగ్య సహచరుడు',
    sign_in: 'సైన్ ఇన్',
    symptom_checker: 'AI లక్షణ తనిఖీ',
    medicine_delivery: 'ఔషధ పంపిణీ',
    doctor_appointment: 'వైద్య నియామకం',
    medication_alarms: 'ఔషధ అలారములు',
    medical_history: 'వైద్య చరిత్ర',
    voice_support: 'వాయిస్ సపోర్ట్',
    ai_assistant: 'AI సహాయకుడు',
    
    page_description: '24/7 వైద్య సహాయం, ఔషధ పంపిణీ, మరియు మీ ఇష్టపడే భాషలో నిపుణుల సలహాలతో AI-శక్తితో కూడిన ఆరోగ్య సేవ।',
    welcome_back: 'తిరిగి స్వాగతం! మీ వ్యక్తిగత ఆరోగ్య డాష్‌బోర్డ్ సిద్ధంగా ఉంది।',
    
    ai_health_assistant: 'AI ఆరోగ్య సహాయకుడు',
    ai_health_description: 'నిర్దిష్ట ఔషధ సిఫార్సులతో తక్షణ వైద్య సలహా మరియు లక్షణ విశ్లేషణ పొందండి',
    
    smart_medicine_management: 'స్మార్ట్ ఔషధ నిర్వహణ',
    smart_medicine_description: 'ప్రిస్క్రిప్షన్ స్కానింగ్‌తో ఔషధాలను ఆర్డర్ చేయండి, రిమైండర్‌లు సెట్ చేయండి, మరియు ఔషధ చరిత్రను ట్రాక్ చేయండి',
    
    doctor_appointments: 'వైద్య నియామకాలు',
    doctor_appointments_description: 'ధృవీకరించబడిన వైద్యులతో సంప్రదింపులను షెడ్యూల్ చేయండి మరియు మీ వైద్య చరిత్రను నిర్వహించండి',
    
    voice_consultation: 'వాయిస్ సంప్రదింపు',
    voice_consultation_description: 'రియల్-టైమ్ అనువాదంతో మీ ఇష్టపడే భాషలో ఆరోగ్య నిపుణులతో మాట్లాడండి',
    
    emergency_services: 'అత్యవసర సేవలు',
    emergency_services_description: 'లొకేషన్ ట్రాకింగ్‌తో సమీపంలోని ఆసుపత్రులు మరియు అత్యవసర సంప్రదింపు సహాయం కనుగొనండి',
    
    secure_private: 'సురక్షిత మరియు ప్రైవేట్',
    secure_private_description: 'మీ ఆరోగ్య డేటా ఎన్క్రిప్ట్ చేయబడింది, సురక్షితంగా నిల్వ చేయబడింది మరియు HIPAA అనుకూలంగా ఉంది',
    
    symptoms: 'లక్షణాలు',
    medicine: 'ఔషధం',
    doctor: 'వైద్యుడు',
    alarms: 'అలారములు',
    history: 'చరిత్ర',
    voice: 'వాయిస్',
    ai_chat: 'AI చాట్'
  },
  kannada: {
    welcome: 'ಆಶಾ AI ಸೇವೆಗೆ ಸ್ವಾಗತ',
    health_companion: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ಸಹಚರ',
    sign_in: 'ಸೈನ್ ಇನ್',
    symptom_checker: 'AI ಲಕ್ಷಣ ಪರೀಕ್ಷಕ',
    medicine_delivery: 'ಔಷಧ ವಿತರಣೆ',
    doctor_appointment: 'ವೈದ್ಯ ನೇಮಕಾತಿ',
    medication_alarms: 'ಔಷಧ ಅಲಾರಮ್‌ಗಳು',
    medical_history: 'ವೈದ್ಯಕೀಯ ಇತಿಹಾಸ',
    voice_support: 'ಧ್ವನಿ ಬೆಂಬಲ',
    ai_assistant: 'AI ಸಹಾಯಕ',
    
    page_description: '24/7 ವೈದ್ಯಕೀಯ ಸಹಾಯ, ಔಷಧ ವಿತರಣೆ, ಮತ್ತು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯಲ್ಲಿ ತಜ್ಞರ ಸಲಹೆಗಳೊಂದಿಗೆ AI-ಚಾಲಿತ ಆರೋಗ್ಯ ಸೇವೆ।',
    welcome_back: 'ಮರಳಿ ಸ್ವಾಗತ! ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಆರೋಗ್ಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಸಿದ್ಧವಾಗಿದೆ।',
    
    ai_health_assistant: 'AI ಆರೋಗ್ಯ ಸಹಾಯಕ',
    ai_health_description: 'ನಿರ್ದಿಷ್ಟ ಔಷಧ ಶಿಫಾರಸುಗಳೊಂದಿಗೆ ತ್ವರಿತ ವೈದ್ಯಕೀಯ ಸಲಹೆ ಮತ್ತು ಲಕ್ಷಣ ವಿಶ್ಲೇಷಣೆ ಪಡೆಯಿರಿ',
    
    smart_medicine_management: 'ಸ್ಮಾರ್ಟ್ ಔಷಧ ನಿರ್ವಹಣೆ',
    smart_medicine_description: 'ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಸ್ಕ್ಯಾನಿಂಗ್‌ನೊಂದಿಗೆ ಔಷಧಗಳನ್ನು ಆರ್ಡರ್ ಮಾಡಿ, ರಿಮೈಂಡರ್‌ಗಳನ್ನು ಹೊಂದಿಸಿ, ಮತ್ತು ಔಷಧ ಇತಿಹಾಸವನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    
    doctor_appointments: 'ವೈದ್ಯ ನೇಮಕಾತಿಗಳು',
    doctor_appointments_description: 'ಪ್ರಮಾಣೀಕೃತ ವೈದ್ಯರೊಂದಿಗೆ ಸಮಾಲೋಚನೆಗಳನ್ನು ಶೆಡ್ಯೂಲ್ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ವೈದ್ಯಕೀಯ ಇತಿಹಾಸವನ್ನು ನಿರ್ವಹಿಸಿ',
    
    voice_consultation: 'ಧ್ವನಿ ಸಮಾಲೋಚನೆ',
    voice_consultation_description: 'ರಿಯಲ್-ಟೈಮ್ ಅನುವಾದದೊಂದಿಗೆ ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯಲ್ಲಿ ಆರೋಗ್ಯ ತಜ್ಞರೊಂದಿಗೆ ಮಾತನಾಡಿ',
    
    emergency_services: 'ತುರ್ತು ಸೇವೆಗಳು',
    emergency_services_description: 'ಸ್ಥಳ ಟ್ರ್ಯಾಕಿಂಗ್‌ನೊಂದಿಗೆ ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳು ಮತ್ತು ತುರ್ತು ಸಂಪರ್ಕ ಸಹಾಯವನ್ನು ಹುಡುಕಿ',
    
    secure_private: 'ಸುರಕ್ಷಿತ ಮತ್ತು ಖಾಸಗಿ',
    secure_private_description: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ಡೇಟಾ ಎನ್‌ಕ್ರಿಪ್ಟ್ ಮಾಡಲಾಗಿದೆ, ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ ಮತ್ತು HIPAA ಅನುಸರಣೆಯಲ್ಲಿದೆ',
    
    symptoms: 'ಲಕ್ಷಣಗಳು',
    medicine: 'ಔಷಧ',
    doctor: 'ವೈದ್ಯ',
    alarms: 'ಅಲಾರಮ್‌ಗಳು',
    history: 'ಇತಿಹಾಸ',
    voice: 'ಧ್ವನಿ',
    ai_chat: 'AI ಚಾಟ್'
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
