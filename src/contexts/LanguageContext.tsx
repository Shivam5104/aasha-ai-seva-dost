
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  english: {
    // Header
    appTitle: "AI Doctor",
    appSubtitle: "Healthcare Made Simple",
    profile: "Profile",
    
    // Hero Section
    heroTitle: "AI Doctor - Your Health Assistant",
    heroDescription: "Get instant medical advice, order medicines, and connect with doctors in your native language. Supporting rural and urban communities across India.",
    available24_7: "24/7 Available",
    languages15: "15+ Languages",
    sameDayDelivery: "Same Day Delivery",
    voiceSupport: "Voice Support",
    
    // Features
    aiConsultation: "AI Doctor Consultation",
    aiConsultationDesc: "Get instant medical advice based on your symptoms",
    medicineDelivery: "Medicine Delivery",
    medicineDeliveryDesc: "Order prescribed medicines with same-day delivery",
    voiceSupportTitle: "Voice Support",
    voiceSupportDesc: "Call in your native language for assistance",
    doctorAppointments: "Doctor Appointments",
    doctorAppointmentsDesc: "Schedule same-day consultations with doctors",
    
    // Navigation
    home: "Home",
    symptomChecker: "Symptom Checker",
    schedule: "Doctor Schedule",
    
    // Emergency
    emergencyServices: "Emergency Services",
    emergencyDesc: "For medical emergencies, please call 108 (National Ambulance Service) or visit the nearest hospital immediately.",
    callEmergency: "Call Emergency (108)",
    findHospital: "Find Nearest Hospital",
    
    // Statistics
    consultations: "Consultations",
    avgDelivery: "Avg Delivery",
    
    // Footer
    footerText: "AI Doctor - Serving communities across India",
    footerContact: "Emergency: 108 | Customer Support: 1800-XXX-XXXX"
  },
  hindi: {
    // Header
    appTitle: "एआई डॉक्टर",
    appSubtitle: "स्वास्थ्य सेवा आसान बनाई",
    profile: "प्रोफाइल",
    
    // Hero Section
    heroTitle: "एआई डॉक्टर - आपका स्वास्थ्य सहायक",
    heroDescription: "अपनी मातृभाषा में तुरंत चिकित्सा सलाह, दवाइयों का ऑर्डर और डॉक्टरों से जुड़ें। भारत के ग्रामीण और शहरी समुदायों की सेवा।",
    available24_7: "24/7 उपलब्ध",
    languages15: "15+ भाषाएं",
    sameDayDelivery: "उसी दिन डिलीवरी",
    voiceSupport: "आवाज़ सहायता",
    
    // Features
    aiConsultation: "एआई डॉक्टर परामर्श",
    aiConsultationDesc: "आपके लक्षणों के आधार पर तुरंत चिकित्सा सलाह पाएं",
    medicineDelivery: "दवा डिलीवरी",
    medicineDeliveryDesc: "निर्धारित दवाइयों का उसी दिन डिलीवरी के साथ ऑर्डर करें",
    voiceSupportTitle: "आवाज़ सहायता",
    voiceSupportDesc: "अपनी मातृभाषा में सहायता के लिए कॉल करें",
    doctorAppointments: "डॉक्टर अपॉइंटमेंट",
    doctorAppointmentsDesc: "उसी दिन डॉक्टरों के साथ परामर्श का समय निर्धारित करें",
    
    // Navigation
    home: "होम",
    symptomChecker: "लक्षण जांच",
    schedule: "डॉक्टर शेड्यूल",
    
    // Emergency
    emergencyServices: "आपातकालीन सेवाएं",
    emergencyDesc: "चिकित्सा आपातकाल के लिए, कृपया 108 (राष्ट्रीय एम्बुलेंस सेवा) पर कॉल करें या तुरंत निकटतम अस्पताल जाएं।",
    callEmergency: "आपातकाल कॉल (108)",
    findHospital: "निकटतम अस्पताल खोजें",
    
    // Statistics
    consultations: "परामर्श",
    avgDelivery: "औसत डिलीवरी",
    
    // Footer
    footerText: "एआई डॉक्टर - भारत भर के समुदायों की सेवा",
    footerContact: "आपातकाल: 108 | ग्राहक सहायता: 1800-XXX-XXXX"
  },
  marathi: {
    // Header
    appTitle: "एआय डॉक्टर",
    appSubtitle: "आरोग्य सेवा सोपी केली",
    profile: "प्रोफाइल",
    
    // Hero Section
    heroTitle: "एआय डॉक्टर - तुमचा आरोग्य सहाय्यक",
    heroDescription: "तुमच्या मातृभाषेत तात्काळ वैद्यकीय सल्ला, औषधांचे ऑर्डर आणि डॉक्टरांशी संपर्क साधा। भारतातील ग्रामीण आणि शहरी समुदायांची सेवा.",
    available24_7: "24/7 उपलब्ध",
    languages15: "15+ भाषा",
    sameDayDelivery: "त्याच दिवशी डिलिव्हरी",
    voiceSupport: "आवाज सहाय्य",
    
    // Features
    aiConsultation: "एआय डॉक्टर सल्लामसलत",
    aiConsultationDesc: "तुमच्या लक्षणांच्या आधारे तात्काळ वैद्यकीय सल्ला मिळवा",
    medicineDelivery: "औषध डिलिव्हरी",
    medicineDeliveryDesc: "निर्धारित औषधांचे त्याच दिवशी डिलिव्हरीसह ऑर्डर करा",
    voiceSupportTitle: "आवाज सहाय्य",
    voiceSupportDesc: "तुमच्या मातृभाषेत मदतीसाठी कॉल करा",
    doctorAppointments: "डॉक्टर भेटी",
    doctorAppointmentsDesc: "त्याच दिवशी डॉक्टरांसोबत सल्लामसलतीची वेळ ठरवा",
    
    // Navigation
    home: "होम",
    symptomChecker: "लक्षण तपासणी",
    schedule: "डॉक्टर वेळापत्रक",
    
    // Emergency
    emergencyServices: "आपत्कालीन सेवा",
    emergencyDesc: "वैद्यकीय आपत्कालीन परिस्थितीसाठी, कृपया 108 (राष्ट्रीय रुग्णवाहिका सेवा) वर कॉल करा किंवा तात्काळ जवळच्या रुग्णालयात जा.",
    callEmergency: "आपत्कालीन कॉल (108)",
    findHospital: "जवळचे रुग्णालय शोधा",
    
    // Statistics
    consultations: "सल्लामसलत",
    avgDelivery: "सरासरी डिलिव्हरी",
    
    // Footer
    footerText: "एआय डॉक्टर - संपूर्ण भारतातील समुदायांची सेवा",
    footerContact: "आपत्कालीन: 108 | ग्राहक सहाय्य: 1800-XXX-XXXX"
  },
  telugu: {
    // Header
    appTitle: "AI డాక్టర్",
    appSubtitle: "ఆరోగ్య సేవలు సులభం చేసింది",
    profile: "ప్రొఫైల్",
    
    // Hero Section
    heroTitle: "AI డాక్టర్ - మీ ఆరోగ్య సహాయకుడు",
    heroDescription: "మీ మాతృభాషలో తక్షణ వైద్య సలహా, మందుల ఆర్డర్ మరియు వైద్యులతో కనెక్ట్ అవ్వండి. భారతదేశంలోని గ్రామీణ మరియు పట్టణ సమాజాలకు సేవలు అందిస్తోంది.",
    available24_7: "24/7 అందుబాటులో",
    languages15: "15+ భాషలు",
    sameDayDelivery: "అదే రోజు డెలివరీ",
    voiceSupport: "వాయిస్ సపోర్ట్",
    
    // Features
    aiConsultation: "AI డాక్టర్ సంప్రదింపులు",
    aiConsultationDesc: "మీ లక్షణాల ఆధారంగా తక్షణ వైద్య సలహా పొందండి",
    medicineDelivery: "మందుల డెలివరీ",
    medicineDeliveryDesc: "సూచించిన మందులను అదే రోజు డెలివరీతో ఆర్డర్ చేయండి",
    voiceSupportTitle: "వాయిస్ సపోర్ట్",
    voiceSupportDesc: "మీ మాతృభాషలో సహాయం కోసం కాల్ చేయండి",
    doctorAppointments: "డాక్టర్ అపాయింట్మెంట్లు",
    doctorAppointmentsDesc: "అదే రోజు వైద్యులతో సంప్రదింపుల కోసం షెడ్యూల్ చేసుకోండి",
    
    // Navigation
    home: "హోమ్",
    symptomChecker: "లక్షణ పరీక్ష",
    schedule: "డాక్టర్ షెడ్యూల్",
    
    // Emergency
    emergencyServices: "అత్యవసర సేవలు",
    emergencyDesc: "వైద్య అత్యవసర పరిస్థితుల కోసం, దయచేసి 108 (జాతీయ అంబులెన్స్ సేవ)కు కాల్ చేయండి లేదా వెంటనే సమీప ఆసుపత్రికి వెళ్లండి.",
    callEmergency: "అత్యవసర కాల్ (108)",
    findHospital: "సమీప ఆసుపత్రిని కనుగొనండి",
    
    // Statistics
    consultations: "సంప్రదింపులు",
    avgDelivery: "సగటు డెలివరీ",
    
    // Footer
    footerText: "AI డాక్టర్ - భారతదేశం అంతటా సమాజాలకు సేవలు",
    footerContact: "అత్యవసరం: 108 | కస్టమర్ సపోర్ట్: 1800-XXX-XXXX"
  },
  gujarati: {
    // Header
    appTitle: "AI ડૉક્ટર",
    appSubtitle: "આરોગ્ય સેવા સરળ બનાવી",
    profile: "પ્રોફાઇલ",
    
    // Hero Section
    heroTitle: "AI ડૉક્ટર - તમારા આરોગ્યના સહાયક",
    heroDescription: "તમારી માતૃભાષામાં તાત્કાલિક તબીબી સલાહ, દવાઓના ઓર્ડર અને ડૉક્ટરો સાથે જોડાણ કરો. ભારતના ગ્રામીણ અને શહેરી સમુદાયોની સેવા કરે છે.",
    available24_7: "24/7 ઉપલબ્ધ",
    languages15: "15+ ભાષાઓ",
    sameDayDelivery: "તે જ દિવસે ડિલિવરી",
    voiceSupport: "વોઇસ સપોર્ટ",
    
    // Features
    aiConsultation: "AI ડૉક્ટર સલાહ",
    aiConsultationDesc: "તમારા લક્ષણોના આધારે તાત્કાલિક તબીબી સલાહ મેળવો",
    medicineDelivery: "દવા ડિલિવરી",
    medicineDeliveryDesc: "નિર્ધારિત દવાઓ તે જ દિવસે ડિલિવરી સાથે ઓર્ડર કરો",
    voiceSupportTitle: "વોઇસ સપોર્ટ",
    voiceSupportDesc: "તમારી માતૃભાષામાં મદદ માટે કૉલ કરો",
    doctorAppointments: "ડૉક્ટર મુલાકાત",
    doctorAppointmentsDesc: "તે જ દિવસે ડૉક્ટરો સાથે સલાહ માટે સમય નક્કી કરો",
    
    // Navigation
    home: "હોમ",
    symptomChecker: "લક્ષણ તપાસ",
    schedule: "ડૉક્ટર શેડ્યૂલ",
    
    // Emergency
    emergencyServices: "કટોકટીની સેવાઓ",
    emergencyDesc: "તબીબી કટોકટી માટે, કૃપા કરીને 108 (નેશનલ એમ્બ્યુલન્સ સર્વિસ)પર કૉલ કરો અથવા તાત્કાલિક નજીકની હોસ્પિટલમાં જાઓ.",
    callEmergency: "કટોકટી કૉલ (108)",
    findHospital: "નજીકની હોસ્પિટલ શોધો",
    
    // Statistics
    consultations: "સલાહ",
    avgDelivery: "સરેરાશ ડિલિવરી",
    
    // Footer
    footerText: "AI ડૉક્ટર - સમગ્ર ભારતના સમુદાયોની સેવા",
    footerContact: "કટોકટી: 108 | કસ્ટમર સપોર્ટ: 1800-XXX-XXXX"
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const t = (key: string): string => {
    const languageData = translations[selectedLanguage as keyof typeof translations] || translations.english;
    return languageData[key as keyof typeof languageData] || key;
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
