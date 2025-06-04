
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Camera, Send, MapPin, Clock, User, Bot, Upload, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  prescription?: string;
}

interface OrderStatus {
  orderId: string;
  medicines: string[];
  deliveryPartner: string;
  partnerPhone: string;
  currentLocation: string;
  estimatedTime: number;
  status: 'preparing' | 'picked_up' | 'on_the_way' | 'delivered';
}

const AIChatbot: React.FC = () => {
  const { selectedLanguage, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userHistory, setUserHistory] = useState<any>(null);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>({
    orderId: 'ORD-2024-001',
    medicines: ['Paracetamol 650mg', 'Cetrizine 10mg'],
    deliveryPartner: 'Raj Kumar',
    partnerPhone: '+91 98765 43210',
    currentLocation: '2.3 km from your location',
    estimatedTime: 15,
    status: 'on_the_way'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: '1',
      type: 'bot',
      content: getWelcomeMessage(),
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [selectedLanguage]);

  const getWelcomeMessage = () => {
    const welcomeMessages = {
      english: "Hello! I'm your AI health assistant. How can I help you today? I can track your medicine orders, analyze prescriptions, and provide health advice.",
      hindi: "नमस्ते! मैं आपका AI स्वास्थ्य सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं? मैं आपकी दवाओं के ऑर्डर ट्रैक कर सकता हूं, प्रिस्क्रिप्शन का विश्लेषण कर सकता हूं और स्वास्थ्य सलाह दे सकता हूं।",
      marathi: "नमस्कार! मी तुमचा AI आरोग्य सहाय्यक आहे। आज मी तुमची कशी मदत करू शकतो? मी तुमच्या औषधांचे ऑर्डर ट्रॅक करू शकतो, प्रिस्क्रिप्शनचे विश्लेषण करू शकतो आणि आरोग्य सल्ला देऊ शकतो।",
      gujarati: "નમસ્તે! હું તમારો AI આરોગ્య સહાયક છું. આજે હું તમારી કેવી રીતે મદદ કરી શકું? હું તમારી દવાઓના ઓર્ડર ટ્રૅક કરી શકું છું, પ્રિસ્ક્રિપ્શનનું વિશ્લેષણ કરી શકું છું અને આરોગ્ય સલાહ આપી શકું છું।"
    };
    return welcomeMessages[selectedLanguage] || welcomeMessages.english;
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('order') || lowerMessage.includes('track') || lowerMessage.includes('delivery')) {
      return getOrderTrackingResponse();
    }
    
    if (lowerMessage.includes('feeling') || lowerMessage.includes('better') || lowerMessage.includes('health')) {
      return getHealthCheckResponse();
    }
    
    if (lowerMessage.includes('medicine') || lowerMessage.includes('prescription')) {
      return getMedicineResponse();
    }
    
    if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('contact')) {
      return getCustomerSupportResponse();
    }
    
    return getGeneralResponse();
  };

  const getOrderTrackingResponse = () => {
    const responses = {
      english: `Your order ${orderStatus.orderId} is ${orderStatus.status}. Delivery partner ${orderStatus.deliveryPartner} (${orderStatus.partnerPhone}) is ${orderStatus.currentLocation} and will reach you in approximately ${orderStatus.estimatedTime} minutes.`,
      hindi: `आपका ऑर्डर ${orderStatus.orderId} ${orderStatus.status} है। डिलीवरी पार्टनर ${orderStatus.deliveryPartner} (${orderStatus.partnerPhone}) ${orderStatus.currentLocation} है और लगभग ${orderStatus.estimatedTime} मिनट में आपके पास पहुंचेगा।`,
      marathi: `तुमचा ऑर्डर ${orderStatus.orderId} ${orderStatus.status} आहे। डिलिव्हरी पार्टनर ${orderStatus.deliveryPartner} (${orderStatus.partnerPhone}) ${orderStatus.currentLocation} आहे आणि अंदाजे ${orderStatus.estimatedTime} मिनिटांत तुमच्याकडे पोहोचेल।`,
      gujarati: `તમારો ઓર્ડર ${orderStatus.orderId} ${orderStatus.status} છે। ડિલિવરી પાર્ટનર ${orderStatus.deliveryPartner} (${orderStatus.partnerPhone}) ${orderStatus.currentLocation} છે અને લગભગ ${orderStatus.estimatedTime} મિનિટમાં તમારી પાસે પહોંચશે।`
    };
    return responses[selectedLanguage] || responses.english;
  };

  const getHealthCheckResponse = () => {
    const responses = {
      english: "I hope you're feeling better since our last conversation! How are your symptoms today? If you need any medical advice or want to order medicines, I'm here to help.",
      hindi: "मुझे उम्मीद है कि आप हमारी पिछली बातचीत के बाद से बेहतर महसूस कर रहे हैं! आज आपके लक्षण कैसे हैं? यदि आपको कोई चिकित्सा सलाह चाहिए या दवाएं ऑर्डर करना चाहते हैं, तो मैं यहां मदद के लिए हूं।",
      marathi: "आमच्या शेवटच्या संभाषणानंतर तुम्ही बरे वाटत आहात अशी माझी आशा आहे! आज तुमची लक्षणे कशी आहेत? तुम्हाला काही वैद्यकीय सल्ला हवा असल्यास किंवा औषधे ऑर्डर करायची असतील तर मी मदतीसाठी येथे आहे।",
      gujarati: "મને આશા છે કે તમે અમારી છેલ્લી વાતચીત પછીથી વધુ સારું અનુભવી રહ્યા છો! આજે તમારા લક્ષણો કેવા છે? જો તમને કોઈ તબીબી સલાહ જોઈએ અથવા દવાઓ ઓર્ડર કરવી હોય, તો હું મદદ માટે અહીં છું."
    };
    return responses[selectedLanguage] || responses.english;
  };

  const getMedicineResponse = () => {
    const responses = {
      english: "I can help you with medicine information, dosage instructions, and ordering. You can also upload your prescription using the camera button for detailed analysis.",
      hindi: "मैं आपको दवा की जानकारी, खुराक निर्देश और ऑर्डरिंग में मदद कर सकता हूं। विस्तृत विश्लेषण के लिए आप कैमरा बटन का उपयोग करके अपना प्रिस्क्रिप्शन भी अपलोड कर सकते हैं।",
      marathi: "मी तुम्हाला औषधाची माहिती, डोस सूचना आणि ऑर्डरिंगमध्ये मदत करू शकतो। तपशीलवार विश्लेषणासाठी तुम्ही कॅमेरा बटन वापरून तुमचे प्रिस्क्रिप्शन अपलोड करू शकता।",
      gujarati: "હું તમને દવાની માહિતી, ડોઝની સૂચનાઓ અને ઓર્ડરિંગમાં મદદ કરી શકું છું. વિગતવાર વિશ્લેષણ માટે તમે કૅમેરા બટનનો ઉપયોગ કરીને તમારું પ્રિસ્ક્રિપ્શન અપલોડ પણ કરી શકો છો."
    };
    return responses[selectedLanguage] || responses.english;
  };

  const getCustomerSupportResponse = () => {
    const responses = {
      english: "For additional support, you can contact us at:\n📞 Customer Care: +91 1800-123-4567\n✉️ Email: support@aashaaiseva.com\nOur team is available 24/7 to assist you.",
      hindi: "अतिरिक्त सहायता के लिए, आप हमसे संपर्क कर सकते हैं:\n📞 ग्राहक सेवा: +91 1800-123-4567\n✉️ ईमेल: support@aashaaiseva.com\nहमारी टीम आपकी सहायता के लिए 24/7 उपलब्ध है।",
      marathi: "अतिरिक्त सहाय्यासाठी, तुम्ही आमच्याशी संपर्क साधू शकता:\n📞 ग्राहक सेवा: +91 1800-123-4567\n✉️ ईमेल: support@aashaaiseva.com\nआमची टीम तुमच्या सहाय्यासाठी 24/7 उपलब्ध आहे।",
      gujarati: "વધારાના સપોર્ટ માટે, તમે અમારો સંપર્ક કરી શકો છો:\n📞 ગ્રાહક સેવા: +91 1800-123-4567\n✉️ ઇમેઇલ: support@aashaaiseva.com\nઅમારી ટીમ તમારી સહાયતા માટે 24/7 ઉપલબ્ધ છે."
    };
    return responses[selectedLanguage] || responses.english;
  };

  const getGeneralResponse = () => {
    const responses = {
      english: "I'm here to help with your health needs. You can ask me about symptoms, medicines, order tracking, or upload prescriptions for analysis.",
      hindi: "मैं आपकी स्वास्थ्य आवश्यकताओं में मदद के लिए यहां हूं। आप मुझसे लक्षणों, दवाओं, ऑर्डर ट्रैकिंग के बारे में पूछ सकते हैं या विश्लेषण के लिए प्रिस्क्रिप्शन अपलोड कर सकते हैं।",
      marathi: "मी तुमच्या आरोग्य गरजांमध्ये मदत करण्यासाठी येथे आहे। तुम्ही माझ्याकडे लक्षणे, औषधे, ऑर्डर ट्रॅकिंग बद्दल विचारू शकता किंवा विश्लेषणासाठी प्रिस्क्रिप्शन अपलोड करू शकता।",
      gujarati: "હું તમારી આરોગ્ય જરૂરિયાતોમાં મદદ કરવા માટે અહીં છું. તમે મને લક્ષણો, દવાઓ, ઓર્ડર ટ્રૅકિંગ વિશે પૂછી શકો છો અથવા વિશ્લેષણ માટે પ્રિસ્ક્રિપ્શન અપલોડ કરી શકો છો."
    };
    return responses[selectedLanguage] || responses.english;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePrescriptionUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const prescriptionMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: 'Prescription uploaded for analysis',
        timestamp: new Date(),
        prescription: URL.createObjectURL(file)
      };

      setMessages(prev => [...prev, prescriptionMessage]);
      setIsTyping(true);

      setTimeout(() => {
        const analysisResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: "I've analyzed your prescription. Based on the medications listed, I recommend:\n\n1. Take Paracetamol 650mg twice daily after meals\n2. Cetrizine 10mg once before bedtime\n3. Continue for 5 days\n\nWould you like me to help you order these medicines?",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, analysisResponse]);
        setIsTyping(false);
      }, 2000);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600" />
          AI Health Assistant
        </CardTitle>
        
        {/* Order Tracking Widget */}
        <div className="bg-green-50 p-3 rounded-lg mt-2">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">Live Order Tracking</span>
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <div>Order: {orderStatus.orderId}</div>
            <div>Partner: {orderStatus.deliveryPartner}</div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Arriving in {orderStatus.estimatedTime} mins</span>
            </div>
          </div>
        </div>

        {/* Customer Support */}
        <div className="bg-blue-50 p-3 rounded-lg mt-2">
          <div className="text-xs space-y-1">
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-blue-600" />
              <span>+91 1800-123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3 text-blue-600" />
              <span>support@aashaaiseva.com</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4 mb-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.type === 'bot' && (
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="w-4 h-4" />
                      <span className="text-xs opacity-70">AI Assistant</span>
                    </div>
                  )}
                  
                  {message.prescription && (
                    <div className="mb-2">
                      <img 
                        src={message.prescription} 
                        alt="Prescription" 
                        className="max-w-full h-32 object-cover rounded"
                      />
                    </div>
                  )}
                  
                  <div className="whitespace-pre-line text-sm">
                    {message.content}
                  </div>
                  
                  <div className={`text-xs mt-1 opacity-70`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePrescriptionUpload}
            accept="image/*"
            className="hidden"
          />
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="w-4 h-4" />
          </Button>
          
          <Button onClick={handleSendMessage} size="sm">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatbot;
