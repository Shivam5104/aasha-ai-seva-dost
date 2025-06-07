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
    ai_health_assistant: 'AI Health Assistant',
    smart_medicine_management: 'Smart Medicine Management',
    doctor_appointments: 'Doctor Appointments',
    voice_consultation: 'Voice Consultation',
    emergency_services: 'Emergency Services',
    secure_private: 'Secure & Private',
    instant_medical_advice: 'Get instant medical advice and symptom analysis with specific medicine recommendations',
    order_medicines: 'Order medicines with prescription scanning, set reminders, and track medication history',
    schedule_consultations: 'Schedule consultations with certified doctors and maintain your medical history',
    talk_to_experts: 'Talk to healthcare experts in your preferred language with real-time translation',
    find_nearby_hospitals: 'Find nearby hospitals and emergency contact assistance with location tracking',
    health_data_encrypted: 'Your health data is encrypted, securely stored, and HIPAA compliant',
    location_services: 'Location Services',
    enable_location: 'Enable location to find nearby hospitals and emergency services',
    enable_location_btn: 'Enable Location',
    getting_location: 'Getting Location...',
    location_enabled: 'Location Enabled',
    find_hospitals: 'Find Hospitals',
    hide_hospitals: 'Hide',
    emergency_services_24: '24/7 Emergency Medical Assistance',
    call_108: 'Call 108',
    nearby_hospitals: 'Nearby Hospitals',
    call: 'Call',
    km_away: 'km away',
    mins: 'mins',
    describe_symptoms: 'Describe your symptoms',
    analyze_symptoms: 'Analyze Symptoms',
    analyzing: 'Analyzing...',
    possible_conditions: 'Possible Conditions',
    recommended_medicines: 'Recommended Medicines',
    dosage: 'Dosage',
    frequency: 'Frequency',
    duration: 'Duration',
    instructions: 'Instructions',
    side_effects: 'Side Effects',
    price: 'Price',
    welcome_back: 'Welcome back! Your personalized healthcare dashboard is ready.',
    ai_powered_healthcare: 'AI-powered healthcare with 24/7 medical assistance, medicine delivery, and expert consultations in your preferred language.'
  },
  hindi: {
    welcome: 'आशा AI सेवा में आपका स्वागत है',
    health_companion: 'आपका स्वास्थ्य साथी',
    sign_in: 'साइन इन करें',
    symptom_checker: 'AI लक्षण जांचकर्ता',
    medicine_delivery: 'दवा वितरण',
    doctor_appointment: 'डॉक्टर की नियुक्ति',
    ai_health_assistant: 'AI स्वास्थ्य सहायक',
    smart_medicine_management: 'स्मार्ट दवा प्रबंधन',
    doctor_appointments: 'डॉक्टर की नियुक्तियां',
    voice_consultation: 'आवाज परामर्श',
    emergency_services: 'आपातकालीन सेवाएं',
    secure_private: 'सुरक्षित और निजी',
    instant_medical_advice: 'विशिष्ट दवा सिफारिशों के साथ तत्काल चिकित्सा सलाह और लक्षण विश्लेषण प्राप्त करें',
    order_medicines: 'प्रिस्क्रिप्शन स्कैनिंग के साथ दवाओं का ऑर्डर करें, रिमाइंडर सेट करें, और दवा इतिहास ट्रैक करें',
    schedule_consultations: 'प्रमाणित डॉक्टरों के साथ परामर्श शेड्यूल करें और अपना चिकित्सा इतिहास बनाए रखें',
    talk_to_experts: 'रियल-टाइम अनुवाद के साथ अपनी पसंदीदा भाषा में स्वास्थ्य विशेषज्ञों से बात करें',
    find_nearby_hospitals: 'स्थान ट्रैकिंग के साथ आस-पास के अस्पताल और आपातकालीन संपर्क सहायता खोजें',
    health_data_encrypted: 'आपका स्वास्थ्य डेटा एन्क्रिप्टेड, सुरक्षित रूप से संग्रहीत और HIPAA अनुपालित है',
    location_services: 'स्थान सेवाएं',
    enable_location: 'आस-पास के अस्पतालों और आपातकालीन सेवाओं को खोजने के लिए स्थान सक्षम करें',
    enable_location_btn: 'स्थान सक्षम करें',
    getting_location: 'स्थान प्राप्त कर रहे हैं...',
    location_enabled: 'स्थान सक्षम',
    find_hospitals: 'अस्पताल खोजें',
    hide_hospitals: 'छुपाएं',
    emergency_services_24: '24/7 आपातकालीन चिकित्सा सहायता',
    call_108: '108 पर कॉल करें',
    nearby_hospitals: 'आस-पास के अस्पताल',
    call: 'कॉल करें',
    km_away: 'किमी दूर',
    mins: 'मिनट',
    describe_symptoms: 'अपने लक्षणों का वर्णन करें',
    analyze_symptoms: 'लक्षणों का विश्लेषण करें',
    analyzing: 'विश्लेषण कर रहे हैं...',
    possible_conditions: 'संभावित स्थितियां',
    recommended_medicines: 'सुझाई गई दवाएं',
    dosage: 'खुराक',
    frequency: 'आवृत्ति',
    duration: 'अवधि',
    instructions: 'निर्देश',
    side_effects: 'साइड इफेक्ट्स',
    price: 'कीमत',
    welcome_back: 'वापसी पर स्वागत! आपका व्यक्तिगत स्वास्थ्य डैशबोर्ड तैयार है।',
    ai_powered_healthcare: 'आपकी पसंदीदा भाषा में 24/7 चिकित्सा सहायता, दवा वितरण और विशेषज्ञ परामर्श के साथ AI-संचालित स्वास्थ्य सेवा।'
  },
  kannada: {
    welcome: 'ಆಶಾ AI ಸೇವೆಗೆ ಸ್ವಾಗತ',
    health_companion: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ಸಹಚರ',
    sign_in: 'ಸೈನ್ ಇನ್',
    symptom_checker: 'AI ಲಕ್ಷಣ ಪರೀಕ್ಷಕ',
    medicine_delivery: 'ಔಷಧ ವಿತರಣೆ',
    doctor_appointment: 'ವೈದ್ಯ ನೇಮಕಾತಿ',
    ai_health_assistant: 'AI ಆರೋಗ್ಯ ಸಹಾಯಕ',
    smart_medicine_management: 'ಸ್ಮಾರ್ಟ್ ಔಷಧ ನಿರ್ವಹಣೆ',
    doctor_appointments: 'ವೈದ್ಯ ನೇಮಕಾತಿಗಳು',
    voice_consultation: 'ಧ್ವನಿ ಸಮಾಲೋಚನೆ',
    emergency_services: 'ತುರ್ತು ಸೇವೆಗಳು',
    secure_private: 'ಸುರಕ್ಷಿತ ಮತ್ತು ಖಾಸಗಿ',
    instant_medical_advice: 'ನಿರ್ದಿಷ್ಟ ಔಷಧ ಶಿಫಾರಸುಗಳೊಂದಿಗೆ ತತ್ಕ್ಷಣ ವೈದ್ಯಕೀಯ ಸಲಹೆ ಮತ್ತು ಲಕ್ಷಣ ವಿಶ್ಲೇಷಣೆ ಪಡೆಯಿರಿ',
    order_medicines: 'ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಸ್ಕ್ಯಾನಿಂಗ್‌ನೊಂದಿಗೆ ಔಷಧಗಳನ್ನು ಆರ್ಡರ್ ಮಾಡಿ, ಜ್ಞಾಪನೆಗಳನ್ನು ಹೊಂದಿಸಿ ಮತ್ತು ಔಷಧ ಇತಿಹಾಸವನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    schedule_consultations: 'ಪ್ರಮಾಣೀಕೃತ ವೈದ್ಯರೊಂದಿಗೆ ಸಮಾಲೋಚನೆಗಳನ್ನು ನಿಗದಿಪಡಿಸಿ ಮತ್ತು ನಿಮ್ಮ ವೈದ್ಯಕೀಯ ಇತಿಹಾಸವನ್ನು ನಿರ್ವಹಿಸಿ',
    talk_to_experts: 'ನೈಜ-ಸಮಯದ ಅನುವಾದದೊಂದಿಗೆ ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯಲ್ಲಿ ಆರೋಗ್ಯ ತಜ್ಞರೊಂದಿಗೆ ಮಾತನಾಡಿ',
    find_nearby_hospitals: 'ಸ್ಥಳ ಟ್ರ್ಯಾಕಿಂಗ್‌ನೊಂದಿಗೆ ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳು ಮತ್ತು ತುರ್ತು ಸಂಪರ್ಕ ಸಹಾಯವನ್ನು ಹುಡುಕಿ',
    health_data_encrypted: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ಡೇಟಾ ಎನ್‌ಕ್ರಿಪ್ಟ್ ಮಾಡಲಾಗಿದೆ, ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ ಮತ್ತು HIPAA ಅನುಸಾರವಾಗಿದೆ',
    location_services: 'ಸ್ಥಳ ಸೇವೆಗಳು',
    enable_location: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳು ಮತ್ತು ತುರ್ತು ಸೇವೆಗಳನ್ನು ಹುಡುಕಲು ಸ್ಥಳವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ',
    enable_location_btn: 'ಸ್ಥಳವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ',
    getting_location: 'ಸ್ಥಳವನ್ನು ಪಡೆಯುತ್ತಿದ್ದೇವೆ...',
    location_enabled: 'ಸ್ಥಳ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ',
    find_hospitals: 'ಆಸ್ಪತ್ರೆಗಳನ್ನು ಹುಡುಕಿ',
    hide_hospitals: 'ಮರೆಮಾಡಿ',
    emergency_services_24: '24/7 ತುರ್ತು ವೈದ್ಯಕೀಯ ಸಹಾಯ',
    call_108: '108 ಗೆ ಕರೆ ಮಾಡಿ',
    nearby_hospitals: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳು',
    call: 'ಕರೆ ಮಾಡಿ',
    km_away: 'ಕಿಮೀ ದೂರ',
    mins: 'ನಿಮಿಷಗಳು',
    describe_symptoms: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ',
    analyze_symptoms: 'ಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
    analyzing: 'ವಿಶ್ಲೇಷಿಸುತ್ತಿದ್ದೇವೆ...',
    possible_conditions: 'ಸಂಭವನೀಯ ಪರಿಸ್ಥಿತಿಗಳು',
    recommended_medicines: 'ಶಿಫಾರಸು ಮಾಡಿದ ಔಷಧಗಳು',
    dosage: 'ಪ್ರಮಾಣ',
    frequency: 'ಆವರ್ತನೆ',
    duration: 'ಅವಧಿ',
    instructions: 'ಸೂಚನೆಗಳು',
    side_effects: 'ಅಡ್ಡ ಪರಿಣಾಮಗಳು',
    price: 'ಬೆಲೆ',
    welcome_back: 'ಮರಳಿ ಸ್ವಾಗತ! ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಆರೋಗ್ಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಸಿದ್ಧವಾಗಿದೆ।',
    ai_powered_healthcare: 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯಲ್ಲಿ 24/7 ವೈದ್ಯಕೀಯ ಸಹಾಯ, ಔಷಧ ವಿತರಣೆ ಮತ್ತು ತಜ್ಞ ಸಮಾಲೋಚನೆಗಳೊಂದಿಗೆ AI-ಚಾಲಿತ ಆರೋಗ್ಯ ಸೇವೆ।'
  },
  telugu: {
    welcome: 'ఆశా AI సేవకు స్వాగతం',
    health_companion: 'మీ ఆరోగ్య సహచరుడు',
    sign_in: 'సైన్ ఇన్',
    symptom_checker: 'AI లక్షణ తనిఖీ',
    medicine_delivery: 'ఔషధ పంపిణీ',
    doctor_appointment: 'వైద్య నియామకం',
    ai_health_assistant: 'AI ఆరోగ్య సహాయకుడు',
    smart_medicine_management: 'స్మార్ట్ ఔషధ నిర్వహణ',
    doctor_appointments: 'వైద్య నియామకాలు',
    voice_consultation: 'వాయిస్ కన్సల్టేషన్',
    emergency_services: 'అత్యవసర సేవలు',
    secure_private: 'సురక్షిత మరియు ప్రైవేట్',
    instant_medical_advice: 'నిర్దిష్ట ఔషధ సిఫారసులతో తక్షణ వైద్య సలహా మరియు లక్షణ విశ్లేషణ పొందండి',
    order_medicines: 'ప్రిస్క్రిప్షన్ స్కానింగ్‌తో ఔషధాలను ఆర్డర్ చేయండి, రిమైండర్లు సెట్ చేయండి మరియు ఔషధ చరిత్రను ట్రాక్ చేయండి',
    schedule_consultations: 'ప్రమాణిత వైద్యులతో కన్సల్టేషన్లు షెడ్యూల్ చేయండి మరియు మీ వైద్య చరిత్రను నిర్వహించండి',
    talk_to_experts: 'రియల్-టైమ్ అనువాదంతో మీ ప్రాధాన్య భాషలో ఆరోగ్య నిపుణులతో మాట్లాడండి',
    find_nearby_hospitals: 'లొకేషన్ ట్రాకింగ్‌తో సమీపంలోని ఆసుపత్రులు మరియు అత్యవసర సంప్రదింపు సహాయాన్ని కనుగొనండి',
    health_data_encrypted: 'మీ ఆరోగ్య డేటా ఎన్‌క్రిప్ట్ చేయబడింది, సురక్షితంగా నిల్వ చేయబడింది మరియు HIPAA కంప్లైంట్',
    location_services: 'లొకేషన్ సేవలు',
    enable_location: 'సమీపంలోని ఆసుపత్రులు మరియు అత్యవసర సేవలను కనుగొనడానికి లొకేషన్‌ను ప్రారంభించండి',
    enable_location_btn: 'లొకేషన్‌ను ప్రారంభించండి',
    getting_location: 'లొకేషన్ పొందుతున్నాం...',
    location_enabled: 'లొకేషన్ ప్రారంభించబడింది',
    find_hospitals: 'ఆసుపత్రులు కనుగొనండి',
    hide_hospitals: 'దాచు',
    emergency_services_24: '24/7 అత్యవసర వైద్య సహాయం',
    call_108: '108కు కాల్ చేయండి',
    nearby_hospitals: 'సమీపంలోని ఆసుపత్రులు',
    call: 'కాల్ చేయండి',
    km_away: 'కిమీ దూరంలో',
    mins: 'నిమిషాలు',
    describe_symptoms: 'మీ లక్షణాలను వివరించండి',
    analyze_symptoms: 'లక్షణాలను విశ్లేషించండి',
    analyzing: 'విశ్లేషిస్తున్నాం...',
    possible_conditions: 'సాధ్యమైన పరిస్థితులు',
    recommended_medicines: 'సిఫారసు చేసిన ఔషధాలు',
    dosage: 'మోతాదు',
    frequency: 'ఫ్రీక్వెన్సీ',
    duration: 'వ్యవధి',
    instructions: 'సూచనలు',
    side_effects: 'దుష్ప్రభావాలు',
    price: 'ధర',
    welcome_back: 'తిరిగి స్వాగతం! మీ వ్యక్తిగత ఆరోగ్య డ్యాష్‌బోర్డ్ సిద్ధంగా ఉంది।',
    ai_powered_healthcare: 'మీ ప్రాధాన్య భాషలో 24/7 వైద్య సహాయం, ఔషధ పంపిణీ మరియు నిపుణుల కన్సల్టేషన్లతో AI-శక్తితో కూడిన ఆరోగ్య సేవ।'
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
