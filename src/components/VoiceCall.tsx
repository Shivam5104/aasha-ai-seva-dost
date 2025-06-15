import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, PhoneCall, Mic, MicOff, Volume2, Clock, User, MapPin, HelpCircle } from 'lucide-react';
import { ttsService } from '@/services/textToSpeech';

interface VoiceCallProps {
  language: string;
}

const VoiceCall: React.FC<VoiceCallProps> = ({ language }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callType, setCallType] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [supportRequest, setSupportRequest] = useState(null);
  const [callPhase, setCallPhase] = useState('welcome');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  // Updated Voice IDs including the new ones you specified
  const voiceIds = {
    female: {
      'Dr. Priya Sharma': 'broqrJkktxd1CclKTudW', // Your specified female voice
      'Nurse Sunita': '9BWtsMINqrJLrRacOk9x', // Aria
    },
    male: {
      'Dr. Rajesh Kumar': 'eyVoIoi3vo6sJoHOKgAc', // Your specified male voice
      'Dr. Amit Patel': 'eyVoIoi3vo6sJoHOKgAc', // Same voice ID for both male doctors
    }
  };

  // Track timeouts/intervals for cleanup
  const timeouts = React.useRef<NodeJS.Timeout[]>([]);
  const callInterval = React.useRef<NodeJS.Timeout | null>(null);

  // Initialize speech recognition with proper type handling
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      
      if (SpeechRecognitionAPI) {
        const recognitionInstance = new SpeechRecognitionAPI() as SpeechRecognition;
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

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
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognitionInstance);
      }
    }
  }, [language]);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  };

  const handleUserQuery = async (query: string) => {
    const lowerQuery = query.toLowerCase();
    let response = '';

    // Check if user wants to hang up the call - END INSTANTLY
    if (lowerQuery.includes('hang up') || lowerQuery.includes('end call') || lowerQuery.includes('disconnect') || 
        lowerQuery.includes('bye') || lowerQuery.includes('goodbye') || lowerQuery.includes('thank you') ||
        lowerQuery.includes('धन्यवाद') || lowerQuery.includes('फोन रखना') || lowerQuery.includes('कॉल खत्म')) {
      
      // End the call immediately without any delay
      endCall();
      return;
    }

    // Intelligent response based on user query
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

    // Play the intelligent response
    if (selectedStaff) {
      const voiceId = selectedStaff.gender === 'female' 
        ? voiceIds.female[selectedStaff.name as keyof typeof voiceIds.female]
        : voiceIds.male[selectedStaff.name as keyof typeof voiceIds.male];
      
      await ttsService.speak(response, voiceId);
    }

    // Update call phase based on query
    setTimeout(() => {
      if (lowerQuery.includes('emergency') || lowerQuery.includes('urgent')) {
        setCallPhase('emergency');
      } else {
        setCallPhase('specialist_connecting');
      }
    }, 3000);
  };

  const supportTypes = [
    {
      id: 'medical',
      title: 'Medical Consultation',
      description: 'Speak with AI doctor about symptoms',
      icon: '🩺',
      languages: ['Hindi', 'English', 'Marathi', 'Telugu']
    },
    {
      id: 'medicine',
      title: 'Medicine Delivery',
      description: 'Order medicines via voice call',
      icon: '💊',
      languages: ['Hindi', 'English', 'Bengali', 'Tamil']
    },
    {
      id: 'emergency',
      title: 'Emergency Support',
      description: 'Urgent medical assistance',
      icon: '🚨',
      languages: ['All Languages Supported']
    }
  ];

  const availableOperators = [
    {
      name: 'Dr. Priya Sharma',
      languages: ['Hindi', 'English', 'Punjabi'],
      specialty: 'Internal Medicine',
      status: 'Available',
      rating: '4.8',
      gender: 'female',
      welcomeMessage: 'Welcome to Aasha AI Seva! My name is Dr. Priya Sharma. I am here to listen to your health concerns and provide you with the best possible care. Please tell me how I can help you today.'
    },
    {
      name: 'Dr. Rajesh Kumar',
      languages: ['Hindi', 'English', 'Bhojpuri'],
      specialty: 'General Medicine',
      status: 'Available',
      rating: '4.9',
      gender: 'male',
      welcomeMessage: 'Namaste! Welcome to Aasha AI Seva! I am Dr. Rajesh Kumar. I am ready to listen to your health queries and provide you with expert medical guidance. Please share your concerns with me.'
    },
    {
      name: 'Nurse Sunita',
      languages: ['Marathi', 'Hindi', 'English'],
      specialty: 'Patient Care',
      status: 'Busy',
      rating: '4.7',
      gender: 'female',
      welcomeMessage: 'Hello! Welcome to Aasha AI Seva! I am Nurse Sunita. I am here to help you with your healthcare needs and answer any questions you may have. How can I assist you today?'
    },
    {
      name: 'Dr. Amit Patel',
      languages: ['Gujarati', 'Hindi', 'English'],
      specialty: 'Internal Medicine',
      status: 'Available',
      rating: '4.6',
      gender: 'male',
      welcomeMessage: 'Welcome to Aasha AI Seva! I am Dr. Amit Patel. I am committed to providing you with quality healthcare support. Please tell me about your health concerns so I can help you better.'
    }
  ];

  const playWelcomeMessage = async (staff: any) => {
    if (apiKey) {
      ttsService.setApiKey(apiKey);
    }
    
    const voiceId = staff.gender === 'female' 
      ? voiceIds.female[staff.name as keyof typeof voiceIds.female]
      : voiceIds.male[staff.name as keyof typeof voiceIds.male];
    
    await ttsService.speak(staff.welcomeMessage, voiceId);
  };

  const playMenuOptions = async () => {
    const menuMessage = "Thank you for sharing your concern. I am now ready to listen to your detailed query. Please speak clearly and tell me exactly what health issue you are facing so I can provide you with the most appropriate assistance.";
    await ttsService.speak(menuMessage, selectedStaff ? 
      (selectedStaff.gender === 'female' 
        ? voiceIds.female[selectedStaff.name as keyof typeof voiceIds.female]
        : voiceIds.male[selectedStaff.name as keyof typeof voiceIds.male]
      ) : 'broqrJkktxd1CclKTudW'
    );
  };

  const startCall = (type: string, staff?: any) => {
    setCallType(type);
    setSelectedStaff(staff);
    setIsCallActive(true);
    setCallPhase('welcome');

    // Play welcome message
    if (staff) {
      const timeout1 = setTimeout(() => playWelcomeMessage(staff), 1000);
      timeouts.current.push(timeout1);
    }

    // Move to listening phase
    const timeout2 = setTimeout(() => {
      setCallPhase('listening');
      if (staff) {
        const t3 = setTimeout(() => playMenuOptions(), 500);
        const t4 = setTimeout(() => startListening(), 3000);
        timeouts.current.push(t3, t4);
      }
    }, 6000);
    timeouts.current.push(timeout2);

    // Start call timer
    callInterval.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    const timeout3 = setTimeout(() => {
      setSupportRequest({
        requestId: `REQ-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        type: type,
        status: 'Processing',
        estimatedResponse: '15-30 minutes',
        assignedTo: staff ? staff.name : 'Medical Team'
      });
    }, 3000);
    timeouts.current.push(timeout3);
  };

  const endCall = () => {
    // Instantly clear all timers and intervals
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    if (callInterval.current) {
      clearInterval(callInterval.current);
      callInterval.current = null;
    }

    // Stop any speech synthesis/TTS immediately
    ttsService.stop();
    // Stop speech recognition if active
    if (recognition) recognition.stop();

    // Reset all states instantly for instant hang up
    setIsCallActive(false);
    setCallDuration(0);
    setCallPhase('welcome');
    setUserQuery('');
    setIsListening(false);
    setSupportRequest(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isCallActive) {
    return (
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <PhoneCall className="w-5 h-5" />
            Voice Call Active - AI Assistant Listening
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Call Info */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold">{selectedStaff?.name || 'Aasha AI Seva'}</h3>
            <p className="text-gray-600">{selectedStaff?.specialty || 'Health Assistant'}</p>
            <div className="flex justify-center items-center gap-2 mt-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-mono text-lg">{formatTime(callDuration)}</span>
            </div>
          </div>

          {/* Call Phase Display */}
          {callPhase === 'welcome' && (
            <div className="bg-white p-4 rounded-lg">
              <div className="text-center">
                <h4 className="font-medium text-green-800 mb-2">🔊 Welcome Message</h4>
                <p className="text-sm text-gray-700 italic">
                  "{selectedStaff?.welcomeMessage || 'Welcome to Aasha AI Seva! How may I help you today?'}"
                </p>
              </div>
            </div>
          )}

          {callPhase === 'listening' && (
            <div className="bg-white p-4 rounded-lg">
              <div className="text-center mb-4">
                <h4 className="font-medium text-blue-800 mb-2">🔊 AI Assistant Ready to Listen</h4>
                <p className="text-sm text-gray-600 mb-4">I'm ready to hear your health concerns. Please speak clearly:</p>
                <p className="text-xs text-gray-500 mb-4">Say "hang up", "end call", or "goodbye" to end the conversation</p>
              </div>
              
              <div className="text-center">
                <Button 
                  variant={isListening ? "destructive" : "default"}
                  onClick={isListening ? stopListening : startListening}
                  className="mb-4"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  {isListening ? 'Stop Speaking' : 'Start Speaking'}
                </Button>
                
                {isListening && (
                  <div className="flex justify-center items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-600 text-sm">Listening...</span>
                  </div>
                )}
                
                {userQuery && (
                  <div className="bg-gray-50 p-3 rounded-lg mt-4">
                    <h5 className="font-medium text-gray-700 mb-1">You said:</h5>
                    <p className="text-sm text-gray-600 italic">"{userQuery}"</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {callPhase === 'emergency' && (
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <div className="animate-pulse">
                <h4 className="font-medium text-red-800 mb-2">🚨 Emergency Protocol Activated</h4>
                <p className="text-sm text-red-600">Connecting to emergency medical team immediately...</p>
              </div>
            </div>
          )}

          {callPhase === 'specialist_connecting' && (
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="animate-pulse">
                <h4 className="font-medium text-green-800 mb-2">🔄 Connecting to Specialist</h4>
                <p className="text-sm text-green-600">Based on your query, connecting you to the right medical expert...</p>
              </div>
            </div>
          )}

          {/* Call Controls */}
          <div className="flex justify-center gap-4">
            <Button
              variant={isMuted ? "destructive" : "outline"}
              size="lg"
              className="rounded-full w-16 h-16"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>
            
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full w-16 h-16"
              onClick={endCall}
            >
              <Phone className="w-6 h-6" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-16 h-16"
            >
              <Volume2 className="w-6 h-6" />
            </Button>
          </div>

          {/* Support Request Created */}
          {supportRequest && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Support Request Created</h4>
              <div className="space-y-1 text-sm">
                <div><strong>Request ID:</strong> {supportRequest.requestId}</div>
                <div><strong>Type:</strong> {supportRequest.type}</div>
                <div><strong>Assigned to:</strong> {supportRequest.assignedTo}</div>
                <div><strong>Response Time:</strong> {supportRequest.estimatedResponse}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-purple-600" />
            AI Voice Support - Speak Your Query
          </CardTitle>
          <p className="text-gray-600">
            Call our AI medical support team that can understand and respond to your voice queries in real-time. Just speak your health concerns naturally.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* ElevenLabs API Key Input */}
          {!apiKey && (
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-yellow-800">Premium Voice Experience</h4>
                  <p className="text-sm text-yellow-600">
                    Add your ElevenLabs API key for high-quality AI voices that can understand and respond to your queries
                  </p>
                  {showApiKeyInput ? (
                    <div className="flex gap-2">
                      <input
                        type="password"
                        placeholder="Enter ElevenLabs API key"
                        className="flex-1 px-3 py-2 border rounded-lg"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                      <Button onClick={() => {
                        if (apiKey) {
                          ttsService.setApiKey(apiKey);
                          setShowApiKeyInput(false);
                        }
                      }}>
                        Save
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      onClick={() => setShowApiKeyInput(true)}
                      size="sm"
                    >
                      Add API Key
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Voice Query Feature Highlight */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-4">
              <div className="text-center">
                <h4 className="font-medium text-purple-800 mb-2">🎤 New: Voice Query Support</h4>
                <p className="text-sm text-purple-600 mb-3">
                  Our AI assistants can now listen to your health concerns and provide intelligent responses based on what you say.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2 rounded">
                    <strong>Say:</strong> "I have fever"<br/>
                    <em>AI responds with fever care</em>
                  </div>
                  <div className="bg-white p-2 rounded">
                    <strong>Say:</strong> "Need medicine delivery"<br/>
                    <em>Connects to pharmacy</em>
                  </div>
                </div>
                <div className="bg-white p-2 rounded mt-2">
                  <strong>Say:</strong> "Goodbye" or "Hang up"<br/>
                  <em>To end the call</em>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Medical Staff */}
          <div>
            <h3 className="font-semibold text-lg mb-4">AI Voice Assistants (Enhanced Voices)</h3>
            <div className="space-y-3">
              {availableOperators.map((operator, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 ${operator.gender === 'female' ? 'bg-pink-100' : 'bg-blue-100'} rounded-full flex items-center justify-center`}>
                          <User className={`w-6 h-6 ${operator.gender === 'female' ? 'text-pink-600' : 'text-blue-600'}`} />
                        </div>
                        <div>
                          <h4 className="font-medium flex items-center gap-2">
                            {operator.name}
                            <Badge variant="outline" className="text-xs">
                              {operator.gender === 'female' ? '♀️' : '♂️'} AI Voice
                            </Badge>
                          </h4>
                          <p className="text-sm text-gray-600">{operator.specialty}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs">⭐ {operator.rating}</span>
                            <div className="flex gap-1">
                              {operator.languages.map((lang, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {lang}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={operator.status === 'Available' ? "default" : "secondary"}
                          className={operator.status === 'Available' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {operator.status}
                        </Badge>
                        {operator.status === 'Available' && (
                          <Button 
                            size="sm" 
                            className="mt-2"
                            onClick={() => startCall('voice_query', operator)}
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            Call & Speak
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-orange-800 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Medicine Delivery Helpline
                  </h4>
                  <p className="text-sm text-orange-600">Direct support for medicine delivery queries</p>
                  <p className="text-sm font-medium text-orange-800 mt-1">📞 +91 98765-43210</p>
                </div>
                <Button 
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => window.open('tel:+919876543210', '_self')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-red-800">Emergency Medical Support</h4>
                  <p className="text-sm text-red-600">24/7 emergency assistance available</p>
                </div>
                <Button 
                  variant="destructive" 
                  size="lg"
                  onClick={() => window.open('tel:108', '_self')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceCall;
