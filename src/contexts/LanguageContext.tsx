
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
    heroDescription: "మీ మాతృభాషలో తక్షణ వైద్య సలహా, మందుల ఆర్డర్ మరియు వైద్యులతో కనెక్ట్ అవ్వండి। భారతదేశంలోని గ్రామీణ మరియు పట్టణ సమాజాలకు సేవలు అందిస్తోంది.",
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
  },
  kannada: {
    // Header
    appTitle: "AI ವೈದ್ಯ",
    appSubtitle: "ಆರೋಗ್ಯ ಸೇವೆ ಸರಳವಾಗಿ",
    profile: "ಪ್ರೊಫೈಲ್",
    
    // Hero Section
    heroTitle: "AI ವೈದ್ಯ - ನಿಮ್ಮ ಆರೋಗ್ಯ ಸಹಾಯಕ",
    heroDescription: "ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಸಲಹೆ, ಔಷಧಿಗಳ ಆರ್ಡರ್ ಮತ್ತು ವೈದ್ಯರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ. ಭಾರತದ ಗ್ರಾಮೀಣ ಮತ್ತು ನಗರ ಸಮುದಾಯಗಳಿಗೆ ಸೇವೆ ಸಲ್ಲಿಸುತ್ತದೆ.",
    available24_7: "24/7 ಲಭ್ಯ",
    languages15: "15+ ಭಾಷೆಗಳು",
    sameDayDelivery: "ಅದೇ ದಿನ ವಿತರಣೆ",
    voiceSupport: "ಧ್ವನಿ ಬೆಂಬಲ",
    
    // Features
    aiConsultation: "AI ವೈದ್ಯ ಸಮಾಲೋಚನೆ",
    aiConsultationDesc: "ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳ ಆಧಾರದ ಮೇಲೆ ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಸಲಹೆ ಪಡೆಯಿರಿ",
    medicineDelivery: "ಔಷಧಿ ವಿತರಣೆ",
    medicineDeliveryDesc: "ಸೂಚಿಸಿದ ಔಷಧಿಗಳನ್ನು ಅದೇ ದಿನ ವಿತರಣೆಯೊಂದಿಗೆ ಆರ್ಡರ್ ಮಾಡಿ",
    voiceSupportTitle: "ಧ್ವನಿ ಬೆಂಬಲ",
    voiceSupportDesc: "ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಸಹಾಯಕ್ಕಾಗಿ ಕರೆ ಮಾಡಿ",
    doctorAppointments: "ವೈದ್ಯ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು",
    doctorAppointmentsDesc: "ಅದೇ ದಿನ ವೈದ್ಯರೊಂದಿಗೆ ಸಮಾಲೋಚನೆಗೆ ವೇಳಾಪಟ್ಟಿ ಮಾಡಿ",
    
    // Navigation
    home: "ಮುಖ್ಯ",
    symptomChecker: "ರೋಗಲಕ್ಷಣ ಪರೀಕ್ಷೆ",
    schedule: "ವೈದ್ಯ ವೇಳಾಪಟ್ಟಿ",
    
    // Emergency
    emergencyServices: "ತುರ್ತು ಸೇವೆಗಳು",
    emergencyDesc: "ವೈದ್ಯಕೀಯ ತುರ್ತುಸ್ಥಿತಿಗಳಿಗಾಗಿ, ದಯವಿಟ್ಟು 108 (ರಾಷ್ಟ್ರೀಯ ಆಂಬ್ಯುಲೆನ್ಸ್ ಸೇವೆ) ಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ ತಕ್ಷಣ ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗೆ ಭೇಟಿ ನೀಡಿ.",
    callEmergency: "ತುರ್ತು ಕರೆ (108)",
    findHospital: "ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಹುಡುಕಿ",
    
    // Statistics
    consultations: "ಸಮಾಲೋಚನೆಗಳು",
    avgDelivery: "ಸರಾಸರಿ ವಿತರಣೆ",
    
    // Footer
    footerText: "AI ವೈದ್ಯ - ಭಾರತದಾದ್ಯಂತ ಸಮುದಾಯಗಳಿಗೆ ಸೇವೆ ಸಲ್ಲಿಸುತ್ತದೆ",
    footerContact: "ತುರ್ತುಸ್ಥಿತಿ: 108 | ಗ್ರಾಹಕ ಬೆಂಬಲ: 1800-XXX-XXXX"
  },
  bhojpuri: {
    // Header
    appTitle: "AI डॉक्टर",
    appSubtitle: "स्वास्थ्य सेवा सहज",
    profile: "प्रोफाइल",
    
    // Hero Section
    heroTitle: "AI डॉक्टर - राउर स्वास्थ्य सहायक",
    heroDescription: "अपना मातृभाषा में तुरंत चिकित्सा सलाह, दवाई के ऑर्डर आ डॉक्टर सब से जुड़ीं। भारत के गांव आ शहर के समुदाय सब के सेवा।",
    available24_7: "24/7 उपलब्ध",
    languages15: "15+ भाषा सब",
    sameDayDelivery: "ओही दिन डिलीवरी",
    voiceSupport: "आवाज़ सहारा",
    
    // Features
    aiConsultation: "AI डॉक्टर सलाह",
    aiConsultationDesc: "राउर लक्षण के हिसाब से तुरंत चिकित्सा सलाह पावीं",
    medicineDelivery: "दवाई डिलीवरी",
    medicineDeliveryDesc: "दिहल दवाई सब के ओही दिन डिलीवरी के साथ ऑर्डर करीं",
    voiceSupportTitle: "आवाज़ सहारा",
    voiceSupportDesc: "अपना मातृभाषा में मदद खातिर फोन करीं",
    doctorAppointments: "डॉक्टर अपॉइंटमेंट",
    doctorAppointmentsDesc: "ओही दिन डॉक्टर सब से सलाह खातिर समय तय करीं",
    
    // Navigation
    home: "घर",
    symptomChecker: "लक्षण जांच",
    schedule: "डॉक्टर समय सारणी",
    
    // Emergency
    emergencyServices: "आपातकालीन सेवा सब",
    emergencyDesc: "चिकित्सा आपातकाल खातिर, कृपया 108 (राष्ट्रीय एम्बुलेंस सेवा) पर फोन करीं या तुरंत नजदीक के अस्पताल जाईं।",
    callEmergency: "आपातकाल फोन (108)",
    findHospital: "नजदीक के अस्पताल खोजीं",
    
    // Statistics
    consultations: "सलाह सब",
    avgDelivery: "औसत डिलीवरी",
    
    // Footer
    footerText: "AI डॉक्टर - पूरा भारत के समुदाय सब के सेवा",
    footerContact: "आपातकाल: 108 | ग्राहक सहायता: 1800-XXX-XXXX"
  },
  kashmiri: {
    // Header
    appTitle: "AI ڈاکٹر",
    appSubtitle: "صحت سیوا آسان",
    profile: "پروفائل",
    
    // Hero Section
    heroTitle: "AI ڈاکٹر - تمہارا صحت مددگار",
    heroDescription: "پننِ ماتری زبانہِ منز فوری طبی مشورہ، دواہ آرڈر تہ ڈاکٹرن سٕتی رابطہ کریو۔ ہندوستانک دیہاتی تہ شہری برادرین خدمت۔",
    available24_7: "24/7 دستیاب",
    languages15: "15+ زبانہ",
    sameDayDelivery: "امیہ دوہہ ڈیلیوری",
    voiceSupport: "آواز سپورٹ",
    
    // Features
    aiConsultation: "AI ڈاکٹر مشورہ",
    aiConsultationDesc: "پننہ علامتن ہندِ بنیادس پیٹھ فوری طبی مشورہ حاصل کریو",
    medicineDelivery: "دوا ڈیلیوری",
    medicineDeliveryDesc: "تجویز کردہ دواہ امیہ دوہہ ڈیلیوری سٕتی آرڈر کریو",
    voiceSupportTitle: "آواز سپورٹ",
    voiceSupportDesc: "پننِ ماتری زبانہِ منز مددس باپت کال کریو",
    doctorAppointments: "ڈاکٹر اپائنٹمنٹ",
    doctorAppointmentsDesc: "امیہ دوہہ ڈاکٹرن سٕتی مشورس باپت وقت طے کریو",
    
    // Navigation
    home: "گٔر",
    symptomChecker: "علامت جانچ",
    schedule: "ڈاکٹر شیڈول",
    
    // Emergency
    emergencyServices: "ایمرجنسی خدمات",
    emergencyDesc: "طبی ایمرجنسی باپت، مہربانی کٔرِتھ 108 (نیشنل ایمبولنس سروس) پیٹھ کال کریو یا فوری طور پیٹھ نزدیکی ہسپتالس گژھیو۔",
    callEmergency: "ایمرجنسی کال (108)",
    findHospital: "نزدیکی ہسپتال تلاش کریو",
    
    // Statistics
    consultations: "مشورہ",
    avgDelivery: "اوسط ڈیلیوری",
    
    // Footer
    footerText: "AI ڈاکٹر - پورِ ہندوستانس منز برادرین خدمت",
    footerContact: "ایمرجنسی: 108 | کسٹمر سپورٹ: 1800-XXX-XXXX"
  },
  odia: {
    // Header
    appTitle: "AI ଡାକ୍ତର",
    appSubtitle: "ସ୍ୱାସ୍ଥ୍ୟ ସେବା ସହଜ ହେଲା",
    profile: "ପ୍ରୋଫାଇଲ",
    
    // Hero Section
    heroTitle: "AI ଡାକ୍ତର - ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ",
    heroDescription: "ଆପଣଙ୍କ ମାତୃଭାଷାରେ ତୁରନ୍ତ ଚିକିତ୍ସା ପରାମର୍ଶ, ଔଷଧ ଅର୍ଡର ଏବଂ ଡାକ୍ତରମାନଙ୍କ ସହିତ ସଂଯୋଗ କରନ୍ତୁ। ଭାରତର ଗ୍ରାମୀଣ ଏବଂ ସହରାଞ୍ଚଳ ସମ୍ପ୍ରଦାୟଗୁଡିକୁ ସେବା ପ୍ରଦାନ କରୁଛି।",
    available24_7: "24/7 ଉପଲବ୍ଧ",
    languages15: "15+ ଭାଷା",
    sameDayDelivery: "ସେହି ଦିନ ବିତରଣ",
    voiceSupport: "ଭଏସ ସପୋର୍ଟ",
    
    // Features
    aiConsultation: "AI ଡାକ୍ତର ପରାମର୍ଶ",
    aiConsultationDesc: "ଆପଣଙ୍କ ଲକ୍ଷଣ ଆଧାରରେ ତୁରନ୍ତ ଚିକିତ୍ସା ପରାମର୍ଶ ପାଆନ୍ତୁ",
    medicineDelivery: "ଔଷଧ ବିତରଣ",
    medicineDeliveryDesc: "ନିର୍ଦ୍ଦେଶିତ ଔଷଧଗୁଡିକ ସେହି ଦିନ ବିତରଣ ସହିତ ଅର୍ଡର କରନ୍ତୁ",
    voiceSupportTitle: "ଭଏସ ସପୋର୍ଟ",
    voiceSupportDesc: "ଆପଣଙ୍କ ମାତୃଭାଷାରେ ସହାୟତା ପାଇଁ କଲ କରନ୍ତୁ",
    doctorAppointments: "ଡାକ୍ତର ନିଯୁକ୍ତି",
    doctorAppointmentsDesc: "ସେହି ଦିନ ଡାକ୍ତରମାନଙ୍କ ସହିତ ପରାମର୍ଶ ପାଇଁ ସମୟ ନିର୍ଦ୍ଧାରଣ କରନ୍ତୁ",
    
    // Navigation
    home: "ଘର",
    symptomChecker: "ଲକ୍ଷଣ ଯାଞ୍ଚ",
    schedule: "ଡାକ୍ତର ସୂଚୀ",
    
    // Emergency
    emergencyServices: "ଜରୁରୀକାଳୀନ ସେବା",
    emergencyDesc: "ଚିକିତ୍ସା ଜରୁରୀକାଳୀନ ପରିସ୍ଥିତି ପାଇଁ, ଦୟାକରି 108 (ଜାତୀୟ ଆମ୍ବୁଲାନ୍ସ ସେବା)କୁ କଲ କରନ୍ତୁ କିମ୍ବା ତୁରନ୍ତ ନିକଟତମ ହସ୍ପିଟାଲକୁ ଯାଆନ୍ତୁ।",
    callEmergency: "ଜରୁରୀକାଳୀନ କଲ (108)",
    findHospital: "ନିକଟତମ ହସ୍ପିଟାଲ ଖୋଜନ୍ତୁ",
    
    // Statistics
    consultations: "ପରାମର୍ଶ",
    avgDelivery: "ଗଢ଼ ବିତରଣ",
    
    // Footer
    footerText: "AI ଡାକ୍ତର - ସମଗ୍ର ଭାରତର ସମ୍ପ୍ରଦାୟଗୁଡିକୁ ସେବା",
    footerContact: "ଜରୁରୀକାଳୀନ: 108 | ଗ୍ରାହକ ସହାୟତା: 1800-XXX-XXXX"
  },
  punjabi: {
    // Header
    appTitle: "AI ਡਾਕਟਰ",
    appSubtitle: "ਸਿਹਤ ਸੇਵਾ ਆਸਾਨ ਬਣਾਈ",
    profile: "ਪ੍ਰੋਫਾਈਲ",
    
    // Hero Section
    heroTitle: "AI ਡਾਕਟਰ - ਤੁਹਾਡਾ ਸਿਹਤ ਸਹਾਇਕ",
    heroDescription: "ਆਪਣੀ ਮਾਤ੍ਰੀ ਭਾਸ਼ਾ ਵਿੱਚ ਤੁਰੰਤ ਡਾਕਟਰੀ ਸਲਾਹ, ਦਵਾਈਆਂ ਦਾ ਆਰਡਰ ਅਤੇ ਡਾਕਟਰਾਂ ਨਾਲ ਜੁੜੋ। ਭਾਰਤ ਦੇ ਪਿੰਡਾਂ ਅਤੇ ਸ਼ਹਿਰਾਂ ਦੇ ਭਾਈਚਾਰਿਆਂ ਦੀ ਸੇਵਾ।",
    available24_7: "24/7 ਉਪਲਬਧ",
    languages15: "15+ ਭਾਸ਼ਾਵਾਂ",
    sameDayDelivery: "ਉਸੇ ਦਿਨ ਡਿਲੀਵਰੀ",
    voiceSupport: "ਆਵਾਜ਼ ਸਹਾਇਤਾ",
    
    // Features
    aiConsultation: "AI ਡਾਕਟਰ ਸਲਾਹ",
    aiConsultationDesc: "ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਤੁਰੰਤ ਡਾਕਟਰੀ ਸਲਾਹ ਪ੍ਰਾਪਤ ਕਰੋ",
    medicineDelivery: "ਦਵਾਈ ਡਿਲੀਵਰੀ",
    medicineDeliveryDesc: "ਸੁਝਾਈਆਂ ਦਵਾਈਆਂ ਨੂੰ ਉਸੇ ਦਿਨ ਡਿਲੀਵਰੀ ਨਾਲ ਆਰਡਰ ਕਰੋ",
    voiceSupportTitle: "ਆਵਾਜ਼ ਸਹਾਇਤਾ",
    voiceSupportDesc: "ਆਪਣੀ ਮਾਤ੍ਰੀ ਭਾਸ਼ਾ ਵਿੱਚ ਮਦਦ ਲਈ ਕਾਲ ਕਰੋ",
    doctorAppointments: "ਡਾਕਟਰ ਮੁਲਾਕਾਤਾਂ",
    doctorAppointmentsDesc: "ਉਸੇ ਦਿਨ ਡਾਕਟਰਾਂ ਨਾਲ ਸਲਾਹ ਲਈ ਸਮਾਂ ਨਿਰਧਾਰਿਤ ਕਰੋ",
    
    // Navigation
    home: "ਘਰ",
    symptomChecker: "ਲੱਛਣ ਜਾਂਚ",
    schedule: "ਡਾਕਟਰ ਸ਼ੈਡਿਊਲ",
    
    // Emergency
    emergencyServices: "ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ",
    emergencyDesc: "ਡਾਕਟਰੀ ਐਮਰਜੈਂਸੀ ਲਈ, ਕਿਰਪਾ ਕਰਕੇ 108 (ਰਾਸ਼ਟਰੀ ਐਂਬੂਲੈਂਸ ਸੇਵਾ) ਨੂੰ ਕਾਲ ਕਰੋ ਜਾਂ ਤੁਰੰਤ ਨਜ਼ਦੀਕੀ ਹਸਪਤਾਲ ਜਾਓ।",
    callEmergency: "ਐਮਰਜੈਂਸੀ ਕਾਲ (108)",
    findHospital: "ਨਜ਼ਦੀਕੀ ਹਸਪਤਾਲ ਲੱਭੋ",
    
    // Statistics
    consultations: "ਸਲਾਹਾਂ",
    avgDelivery: "ਔਸਤ ਡਿਲੀਵਰੀ",
    
    // Footer
    footerText: "AI ਡਾਕਟਰ - ਪੂਰੇ ਭਾਰਤ ਦੇ ਭਾਈਚਾਰਿਆਂ ਦੀ ਸੇਵਾ",
    footerContact: "ਐਮਰਜੈਂਸੀ: 108 | ਗਾਹਕ ਸਹਾਇਤਾ: 1800-XXX-XXXX"
  },
  bengali: {
    // Header
    appTitle: "AI ডাক্তার",
    appSubtitle: "স্বাস্থ্য সেবা সহজ হলো",
    profile: "প্রোফাইল",
    
    // Hero Section
    heroTitle: "AI ডাক্তার - আপনার স্বাস্থ্য সহায়ক",
    heroDescription: "আপনার মাতৃভাষায় তাৎক্ষণিক চিকিৎসা পরামর্শ, ওষুধের অর্ডার এবং ডাক্তারদের সাথে যোগাযোগ করুন। ভারতের গ্রামীণ ও শহুরে সম্প্রদায়ের সেবা করছে।",
    available24_7: "24/7 উপলব্ধ",
    languages15: "15+ ভাষা",
    sameDayDelivery: "একই দিনে ডেলিভারি",
    voiceSupport: "ভয়েস সাপোর্ট",
    
    // Features
    aiConsultation: "AI ডাক্তার পরামর্শ",
    aiConsultationDesc: "আপনার লক্ষণের উপর ভিত্তি করে তাৎক্ষণিক চিকিৎসা পরামর্শ পান",
    medicineDelivery: "ওষুধ ডেলিভারি",
    medicineDeliveryDesc: "নির্ধারিত ওষুধগুলো একই দিনে ডেলিভারি সহ অর্ডার করুন",
    voiceSupportTitle: "ভয়েস সাপোর্ট",
    voiceSupportDesc: "আপনার মাতৃভাষায় সাহায্যের জন্য কল করুন",
    doctorAppointments: "ডাক্তার অ্যাপয়েন্টমেন্ট",
    doctorAppointmentsDesc: "একই দিনে ডাক্তারদের সাথে পরামর্শের জন্য সময় নির্ধারণ করুন",
    
    // Navigation
    home: "হোম",
    symptomChecker: "লক্ষণ পরীক্ষা",
    schedule: "ডাক্তার সূচি",
    
    // Emergency
    emergencyServices: "জরুরি সেবা",
    emergencyDesc: "চিকিৎসা জরুরি অবস্থার জন্য, অনুগ্রহ করে 108 (জাতীয় অ্যাম্বুলেন্স সেবা)তে কল করুন অথবা তাৎক্ষণিক নিকটতম হাসপাতালে যান।",
    callEmergency: "জরুরি কল (108)",
    findHospital: "নিকটতম হাসপাতাল খুঁজুন",
    
    // Statistics
    consultations: "পরামর্শ",
    avgDelivery: "গড় ডেলিভারি",
    
    // Footer
    footerText: "AI ডাক্তার - সমগ্র ভারতের সম্প্রদায়ের সেবা",
    footerContact: "জরুরি: 108 | গ্রাহক সাপোর্ট: 1800-XXX-XXXX"
  },
  tamil: {
    // Header
    appTitle: "AI மருத்துவர்",
    appSubtitle: "சுகாதார சேவை எளிமையாக்கப்பட்டது",
    profile: "சுயவிவரம்",
    
    // Hero Section
    heroTitle: "AI மருத்துவர் - உங்கள் சுகாதார உதவியாளர்",
    heroDescription: "உங்கள் தாய்மொழியில் உடனடி மருத்துவ ஆலோசனை, மருந்து ஆர்டர் மற்றும் மருத்துவர்களுடன் இணைக்கவும். இந்தியாவின் கிராமப்புற மற்றும் நகர்ப்புற சமூகங்களுக்கு சேவை செய்கிறது.",
    available24_7: "24/7 கிடைக்கும்",
    languages15: "15+ மொழிகள்",
    sameDayDelivery: "அன்றே டெலிவரி",
    voiceSupport: "குரல் ஆதரவு",
    
    // Features
    aiConsultation: "AI மருத்துவர் ஆலோசனை",
    aiConsultationDesc: "உங்கள் அறிகுறிகளின் அடிப்படையில் உடனடி மருத்துவ ஆலோசனை பெறுங்கள்",
    medicineDelivery: "மருந்து டெலிவரி",
    medicineDeliveryDesc: "பரிந்துரைக்கப்பட்ட மருந்துகளை அன்றே டெலிவரியுடன் ஆர்டர் செய்யுங்கள்",
    voiceSupportTitle: "குரல் ஆதரவு",
    voiceSupportDesc: "உங்கள் தாய்மொழியில் உதவிக்காக அழைக்கவும்",
    doctorAppointments: "மருத்துவர் சந்திப்புகள்",
    doctorAppointmentsDesc: "அன்றே மருத்துவர்களுடன் ஆலோசனைக்கு நேரம் ஒதுக்குங்கள்",
    
    // Navigation
    home: "முகப்பு",
    symptomChecker: "அறிகுறி சோதனை",
    schedule: "மருத்துவர் அட்டவணை",
    
    // Emergency
    emergencyServices: "அவசர சேவைகள்",
    emergencyDesc: "மருத்துவ அவசரநிலைகளுக்கு, தயவுசெய்து 108 (தேசிய ஆம்புலன்ஸ் சேவை)க்கு அழைக்கவும் அல்லது உடனடியாக அருகிலுள்ள மருத்துவமனைக்குச் செல்லவும்.",
    callEmergency: "அவசர அழைப்பு (108)",
    findHospital: "அருகிலுள்ள மருத்துவமனையைக் கண்டறியவும்",
    
    // Statistics
    consultations: "ஆலோசனைகள்",
    avgDelivery: "சராசரி டெலிவரி",
    
    // Footer
    footerText: "AI மருத்துவர் - இந்தியா முழுவதும் சமூகங்களுக்கு சேவை",
    footerContact: "அவசரம்: 108 | வாடிக்கையாளர் ஆதரவு: 1800-XXX-XXXX"
  },
  malayalam: {
    // Header
    appTitle: "AI ഡോക്ടർ",
    appSubtitle: "ആരോഗ്യ സേവനം ലളിതമാക്കി",
    profile: "പ്രൊഫൈൽ",
    
    // Hero Section
    heroTitle: "AI ഡോക്ടർ - നിങ്ങളുടെ ആരോഗ്യ സഹായി",
    heroDescription: "നിങ്ങളുടെ മാതൃഭാഷയിൽ തത്ക്ഷണം മെഡിക്കൽ ഉപദേശം, മരുന്ന് ഓർഡർ ചെയ്യുക, ഡോക്ടർമാരുമായി ബന്ധപ്പെടുക. ഇന്ത്യയിലെ ഗ്രാമീണ, നഗര സമൂഹങ്ങളെ സേവിക്കുന്നു.",
    available24_7: "24/7 ലഭ്യമാണ്",
    languages15: "15+ ഭാഷകൾ",
    sameDayDelivery: "അന്നേ ദിവസം ഡെലിവറി",
    voiceSupport: "വോയ്സ് സപ്പോർട്ട്",
    
    // Features
    aiConsultation: "AI ഡോക്ടർ കൺസൾട്ടേഷൻ",
    aiConsultationDesc: "നിങ്ങളുടെ ലക്ഷണങ്ങളെ അടിസ്ഥാനമാക്കി തത്ക്ഷണം മെഡിക്കൽ ഉപദേശം നേടുക",
    medicineDelivery: "മരുന്ന് ഡെലിവറി",
    medicineDeliveryDesc: "നിർദ്ദേശിച്ച മരുന്നുകൾ അന്നേ ദിവസം ഡെലിവറിയോടെ ഓർഡർ ചെയ്യുക",
    voiceSupportTitle: "വോയ്സ് സപ്പോർട്ട്",
    voiceSupportDesc: "നിങ്ങളുടെ മാതൃഭാഷയിൽ സഹായത്തിനായി കോൾ ചെയ്യുക",
    doctorAppointments: "ഡോക്ടർ അപ്പോയിന്റ്മെന്റുകൾ",
    doctorAppointmentsDesc: "അന്നേ ദിവസം ഡോക്ടർമാരുമായി കൺസൾട്ടേഷനുകൾക്കായി ഷെഡ്യൂൾ ചെയ്യുക",
    
    // Navigation
    home: "ഹോം",
    symptomChecker: "ലക്ഷണ പരിശോധന",
    schedule: "ഡോക്ടർ ഷെഡ്യൂൾ",
    
    // Emergency
    emergencyServices: "അടിയന്തര സേവനങ്ങൾ",
    emergencyDesc: "മെഡിക്കൽ അടിയന്തരാവസ്ഥകൾക്കായി, ദയവായി 108 (നാഷണൽ ആംബുലൻസ് സേവനം) ലേക്ക് കോൾ ചെയ്യുക അല്ലെങ്കിൽ ഉടനടി അടുത്തുള്ള ആശുപത്രിയിൽ പോകുക.",
    callEmergency: "അടിയന്തര കോൾ (108)",
    findHospital: "അടുത്തുള്ള ആശുപത്രി കണ്ടെത്തുക",
    
    // Statistics
    consultations: "കൺസൾട്ടേഷനുകൾ",
    avgDelivery: "ശരാശരി ഡെലിവറി",
    
    // Footer
    footerText: "AI ഡോക്ടർ - ഇന്ത്യയിലുടനീളമുള്ള സമൂഹങ്ങളെ സേവിക്കുന്നു",
    footerContact: "അടിയന്തരാവസ്ഥ: 108 | കസ്റ്റമർ സപ്പോർട്ട്: 1800-XXX-XXXX"
  },
  assamese: {
    // Header
    appTitle: "AI চিকিৎসক",
    appSubtitle: "স্বাস্থ্য সেৱা সহজ কৰা হৈছে",
    profile: "প্ৰ'ফাইল",
    
    // Hero Section
    heroTitle: "AI চিকিৎসক - আপোনাৰ স্বাস্থ্য সহায়ক",
    heroDescription: "আপোনাৰ মাতৃভাষাত তৎক্ষণাৎ চিকিৎসা পৰামৰ্শ, ঔষধৰ অৰ্ডাৰ আৰু চিকিৎসকসকলৰ লগত সংযোগ কৰক। ভাৰতৰ গ্ৰাম্য আৰু চহৰীয়া সমাজসমূহৰ সেৱা কৰি আছে।",
    available24_7: "24/7 উপলব্ধ",
    languages15: "15+ ভাষা",
    sameDayDelivery: "একেদিনাই ডেলিভাৰী",
    voiceSupport: "ভয়েস সাপোৰ্ট",
    
    // Features
    aiConsultation: "AI চিকিৎসক পৰামৰ্শ",
    aiConsultationDesc: "আপোনাৰ লক্ষণৰ ভিত্তিত তৎক্ষণাৎ চিকিৎসা পৰামৰ্শ লাভ কৰক",
    medicineDelivery: "ঔষধ ডেলিভাৰী",
    medicineDeliveryDesc: "নিৰ্ধাৰিত ঔষধসমূহ একেদিনাই ডেলিভাৰীৰ সৈতে অৰ্ডাৰ কৰক",
    voiceSupportTitle: "ভয়েস সাপোৰ্ট",
    voiceSupportDesc: "আপোনাৰ মাতৃভাষাত সহায়তাৰ বাবে কল কৰক",
    doctorAppointments: "চিকিৎসক সাক্ষাৎ",
    doctorAppointmentsDesc: "একেদিনাই চিকিৎসকসকলৰ লগত পৰামৰ্শৰ বাবে সময় নিৰ্ধাৰণ কৰক",
    
    // Navigation
    home: "ঘৰ",
    symptomChecker: "লক্ষণ পৰীক্ষা",
    schedule: "চিকিৎসক সূচী",
    
    // Emergency
    emergencyServices: "জৰুৰী সেৱা",
    emergencyDesc: "চিকিৎসা জৰুৰী অৱস্থাৰ বাবে, অনুগ্ৰহ কৰি 108 (ৰাষ্ট্ৰীয় এম্বুলেন্স সেৱা)ত কল কৰক বা তৎক্ষণাৎ নিকটতম চিকিৎসালয়লৈ যাওক।",
    callEmergency: "জৰুৰী কল (108)",
    findHospital: "নিকটতম চিকিৎসালয় বিচাৰক",
    
    // Statistics
    consultations: "পৰামৰ্শ",
    avgDelivery: "গড় ডেলিভাৰী",
    
    // Footer
    footerText: "AI চিকিৎসক - সমগ্ৰ ভাৰতৰ সমাজসমূহৰ সেৱা",
    footerContact: "জৰুৰী: 108 | গ্ৰাহক সহায়তা: 1800-XXX-XXXX"
  },
  urdu: {
    // Header
    appTitle: "AI ڈاکٹر",
    appSubtitle: "صحت کی خدمات آسان بنائیں",
    profile: "پروفائل",
    
    // Hero Section
    heroTitle: "AI ڈاکٹر - آپ کا صحت کا مددگار",
    heroDescription: "اپنی مادری زبان میں فوری طبی مشورہ، دوائیوں کا آرڈر اور ڈاکٹروں سے رابطہ کریں۔ ہندوستان کی دیہاتی اور شہری کمیونٹیز کی خدمت کر رہا ہے۔",
    available24_7: "24/7 دستیاب",
    languages15: "15+ زبانیں",
    sameDayDelivery: "اسی دن ڈیلیوری",
    voiceSupport: "آواز کی سہولت",
    
    // Features
    aiConsultation: "AI ڈاکٹر مشاورت",
    aiConsultationDesc: "اپنی علامات کی بنیاد پر فوری طبی مشورہ حاصل کریں",
    medicineDelivery: "دوا کی ڈیلیوری",
    medicineDeliveryDesc: "تجویز کردہ دوائیں اسی دن ڈیلیوری کے ساتھ آرڈر کریں",
    voiceSupportTitle: "آواز کی سہولت",
    voiceSupportDesc: "اپنی مادری زبان میں مدد کے لیے کال کریں",
    doctorAppointments: "ڈاکٹر کی ملاقات",
    doctorAppointmentsDesc: "اسی دن ڈاکٹروں کے ساتھ مشاورت کے لیے وقت طے کریں",
    
    // Navigation
    home: "گھر",
    symptomChecker: "علامات کی جانچ",
    schedule: "ڈاکٹر کا شیڈول",
    
    // Emergency
    emergencyServices: "ہنگامی خدمات",
    emergencyDesc: "طبی ہنگامی صورتحال کے لیے، براہ کرم 108 (قومی ایمبولینس سروس) پر کال کریں یا فوری طور پر قریبی ہسپتال جائیں۔",
    callEmergency: "ہنگامی کال (108)",
    findHospital: "قریبی ہسپتال تلاش کریں",
    
    // Statistics
    consultations: "مشاورت",
    avgDelivery: "اوسط ڈیلیوری",
    
    // Footer
    footerText: "AI ڈاکٹر - پورے ہندوستان میں کمیونٹیز کی خدمت",
    footerContact: "ہنگامی: 108 | کسٹمر سپورٹ: 1800-XXX-XXXX"
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
