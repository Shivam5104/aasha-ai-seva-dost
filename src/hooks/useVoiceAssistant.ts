
import { useEffect, useRef, useState, useCallback } from "react";
import { ttsService } from "@/services/textToSpeech";

interface UseVoiceAssistantProps {
  language: string;
  getVoiceId: (staff: any) => string;
  selectedStaff: any;
  maleApiKey: string;
  femaleApiKey: string;
  setIsElevenLabsActive: (b: boolean) => void;
  setCallPhase: (phase: string) => void;
  endCall: () => void;
}

export const useVoiceAssistant = ({
  language,
  getVoiceId,
  selectedStaff,
  maleApiKey,
  femaleApiKey,
  setIsElevenLabsActive,
  setCallPhase,
  endCall,
}: UseVoiceAssistantProps) => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [userQuery, setUserQuery] = useState("");

  // 1. Initialize speech recognition with selected language.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      if (SpeechRecognitionAPI) {
        const recognitionInstance = new SpeechRecognitionAPI() as SpeechRecognition;
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;

        // Map app language to BCP-47 codes, fallback to English
        const langMap: Record<string, string> = {
          english: "en-IN", hindi: "hi-IN", marathi: "mr-IN",
          telugu: "te-IN", kannada: "kn-IN", bengali: "bn-IN",
          tamil: "ta-IN", gujarati: "gu-IN", punjabi: "pa-IN",
          odia: "or-IN", urdu: "ur-IN", assamese: "as-IN",
        };
        recognitionInstance.lang = langMap[language] || "en-IN";

        recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) {
            setUserQuery(finalTranscript);
            handleUserQuery(finalTranscript);
          }
        };

        recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
          setIsListening(false);
        };
        recognitionInstance.onend = () => setIsListening(false);

        setRecognition(recognitionInstance);
      }
    }
  }, [language]);

  // 2. TTS: Select correct API key and language
  const setApiKeyByGender = useCallback((staff: any) => {
    if (!staff) {
      ttsService.setApiKey('');
      setIsElevenLabsActive(false);
      return;
    }
    if (staff.gender === 'female' && femaleApiKey) {
      ttsService.setApiKey(femaleApiKey);
      setIsElevenLabsActive(true);
    } else if (staff.gender === 'male' && maleApiKey) {
      ttsService.setApiKey(maleApiKey);
      setIsElevenLabsActive(true);
    } else {
      ttsService.setApiKey('');
      setIsElevenLabsActive(false);
    }
  }, [femaleApiKey, maleApiKey, setIsElevenLabsActive]);

  // 3. Handle query: handle call logic and TTS
  const handleUserQuery = useCallback(async (query: string) => {
    const lowerQuery = query.toLowerCase();
    let response = '';
    if (
      lowerQuery.includes('hang up') || lowerQuery.includes('end call') || lowerQuery.includes('disconnect') ||
      lowerQuery.includes('bye') || lowerQuery.includes('goodbye') || lowerQuery.includes('thank you') ||
      lowerQuery.includes('धन्यवाद') || lowerQuery.includes('फोन रखना') || lowerQuery.includes('कॉल खत्म')
    ) {
      endCall();
      return;
    }
    // Main reply logic
    if (lowerQuery.includes('medicine') || lowerQuery.includes('tablet') || lowerQuery.includes('capsule')) {
      response = `I understand you need help with medicines. Let me connect you to our pharmacy specialist. They can help you with medicine availability, dosage instructions, and home delivery options. Please hold while I transfer your call.`;
    } else if (lowerQuery.includes('doctor') || lowerQuery.includes('appointment') || lowerQuery.includes('consultation')) {
      response = `You're looking for a doctor consultation. I can schedule an appointment for you with our available doctors. Would you prefer a video consultation or in-person visit? Please specify your preferred time and any specific medical concerns.`;
    } else if (lowerQuery.includes('emergency') || lowerQuery.includes('urgent') || lowerQuery.includes('pain')) {
      response = `This sounds like it might be urgent. I'm immediately connecting you to our emergency medical team. Please stay on the line and describe your symptoms clearly. If this is a life-threatening emergency, please also call 108.`;
    } else if (lowerQuery.includes('delivery') || lowerQuery.includes('order') || lowerQuery.includes('track')) {
      response = `I can help you with medicine delivery and order tracking. Let me check your recent orders and provide you with real-time delivery updates. May I have your order number or phone number to track your delivery?`;
    } else if (lowerQuery.includes('fever') || lowerQuery.includes('cold') || lowerQuery.includes('headache')) {
      response = `I understand you're experiencing ${lowerQuery.includes('fever') ? 'fever' : lowerQuery.includes('cold') ? 'cold symptoms' : 'headache'}. Let me connect you to our medical team who can provide proper guidance and recommend appropriate treatment. Please describe your symptoms in detail.`;
    } else {
      response = `Thank you for calling Aasha AI Seva. I've noted your query: "${query}". Let me connect you to the most appropriate medical professional who can assist you with this specific concern. Please hold while I find the right specialist for you.`;
    }
    // Choose correct TTS config for the chosen staff and language
    if (selectedStaff) {
      setApiKeyByGender(selectedStaff);
      const voiceId = getVoiceId(selectedStaff);
      // For supported languages, set the proper spoken language in ElevenLabs config (future: pass language if API supports)
      await ttsService.speak(response, voiceId);
    }
    setTimeout(() => {
      if (lowerQuery.includes('emergency') || lowerQuery.includes('urgent')) {
        setCallPhase('emergency');
      } else {
        setCallPhase('specialist_connecting');
      }
    }, 3000);
  }, [selectedStaff, setApiKeyByGender, getVoiceId, setCallPhase, endCall]);

  const startListening = () => { if (recognition) { setIsListening(true); recognition.start(); }};
  const stopListening = () => { if (recognition) { setIsListening(false); recognition.stop(); }};

  // Play welcome message
  const playWelcomeMessage = useCallback(async (staff: any) => {
    setApiKeyByGender(staff);
    const voiceId = getVoiceId(staff);
    await ttsService.speak(staff.welcomeMessage, voiceId);
  }, [setApiKeyByGender, getVoiceId]);

  return {
    recognition,
    isListening,
    setIsListening,
    userQuery,
    setUserQuery,
    handleUserQuery,
    playWelcomeMessage,
    startListening,
    stopListening,
  };
};
