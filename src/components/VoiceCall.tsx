import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, PhoneCall, Mic, MicOff, Volume2, Clock, User, MapPin, HelpCircle } from 'lucide-react';
import { ttsService } from '@/services/textToSpeech';
import VoiceOperatorCard from './VoiceOperatorCard';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';

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
  const [isElevenLabsActive, setIsElevenLabsActive] = useState(false);
  const [maleApiKey, setMaleApiKey] = useState('');
  const [femaleApiKey, setFemaleApiKey] = useState('');
  const [inputMaleApiKey, setInputMaleApiKey] = useState('');
  const [inputFemaleApiKey, setInputFemaleApiKey] = useState('');
  const isCallActiveRef = React.useRef(false);

  // Automatically set male API key on mount if blank
  React.useEffect(() => {
    const defaultMaleKey = 'sk_df0d04ba0513406a1ddf25e897b0efb7ec503161bab4a6c8';
    if (!maleApiKey) {
      setMaleApiKey(defaultMaleKey);
    }
  }, [maleApiKey]);

  // Set all female doctors to broqrJkktxd1CclKTudW, and Sunita to Aria
  const voiceIds = {
    female: {
      'Dr. Priya Sharma': 'broqrJkktxd1CclKTudW', // Broqr female
      'Nurse Sunita': '9BWtsMINqrJLrRacOk9x',     // Aria female (distinct from broqr)
      // Add any other female doctors here as needed
    },
    male: {
      'Dr. Rajesh Kumar': 'eyVoIoi3vo6sJoHOKgAc',
      'Dr. Amit Patel': 'eyVoIoi3vo6sJoHOKgAc',
    }
  };

  // Track timeouts/intervals for cleanup
  const timeouts = React.useRef<NodeJS.Timeout[]>([]);
  const callInterval = React.useRef<NodeJS.Timeout | null>(null);

  // Helper to resolve and log voiceId & source
  const getVoiceId = (staff: any) => {
    let voiceId = 'broqrJkktxd1CclKTudW';
    if (staff?.gender === 'female') {
      voiceId = voiceIds.female[staff.name as keyof typeof voiceIds.female] || 'broqrJkktxd1CclKTudW';
    } else if (staff?.gender === 'male') {
      voiceId = voiceIds.male[staff.name as keyof typeof voiceIds.male] || 'eyVoIoi3vo6sJoHOKgAc';
    }
    console.log(`[TTS Debug] Using voiceId: ${voiceId} for staff: ${staff?.name}`);
    return voiceId;
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
    if (!isCallActiveRef.current) return;
    setApiKeyByGender(staff);
    const voiceId = getVoiceId(staff);
    let apiKeyUsed = '';
    if (staff.gender === 'female') {
      apiKeyUsed = femaleApiKey;
    } else if (staff.gender === 'male') {
      apiKeyUsed = maleApiKey;
    }
    console.log(
      `[TTS Debug] API Key set: ${Boolean(apiKeyUsed)}. Will use ${apiKeyUsed ? 'ElevenLabs' : 'Browser'} TTS.`
    );
    try {
      await ttsService.speak(staff.welcomeMessage, voiceId);
    } catch (e) {
      // Catch stopped call
      return;
    }
  };

  const playMenuOptions = async () => {
    if (!isCallActiveRef.current) return;
    const menuMessage = "Thank you for sharing your concern. I am now ready to listen to your detailed query. Please speak clearly and tell me exactly what health issue you are facing so I can provide you with the most appropriate assistance.";
    try {
      await ttsService.speak(
        menuMessage,
        selectedStaff
          ? (selectedStaff.gender === 'female'
              ? voiceIds.female[selectedStaff.name as keyof typeof voiceIds.female]
              : voiceIds.male[selectedStaff.name as keyof typeof voiceIds.male])
          : 'broqrJkktxd1CclKTudW'
      );
    } catch (e) {
      // catch stopped call
      return;
    }
  };

  const startCall = (type: string, staff?: any) => {
    setCallType(type);
    setSelectedStaff(staff);
    setIsCallActive(true);
    isCallActiveRef.current = true;  // --- guard value ---
    setCallPhase('welcome');
    // Play welcome message
    if (staff) {
      const timeout1 = setTimeout(() => {
        // GUARD: only run if call is still active
        if (!isCallActiveRef.current) return;
        playWelcomeMessage(staff);
      }, 1000);
      timeouts.current.push(timeout1);
    }
    // Move to listening phase
    const timeout2 = setTimeout(() => {
      if (!isCallActiveRef.current) return;
      setCallPhase('listening');
      if (staff) {
        const t3 = setTimeout(() => { if (isCallActiveRef.current) playMenuOptions(); }, 500);
        const t4 = setTimeout(() => { if (isCallActiveRef.current) startListening(); }, 3000);
        timeouts.current.push(t3, t4);
      }
    }, 6000);
    timeouts.current.push(timeout2);

    // Start call timer as before
    callInterval.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    const timeout3 = setTimeout(() => {
      if (!isCallActiveRef.current) return;
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
    isCallActiveRef.current = false; // --- block deferred TTS ---
    // Stop any speech synthesis/TTS immediately
    ttsService.stop();
    // Extra browser TTS cancel for full safety (in rare cases, browser queue gets stuck)
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
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

  // Adjusted TTS key selection
  const setApiKeyByGender = (staff: any) => {
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
  };

  // Refactor: use the new hook for speech/TTS & voice selection
  const {
    recognition,
    isListening,
    setIsListening,
    userQuery,
    setUserQuery,
    handleUserQuery,
    startListening,
    stopListening
  } = useVoiceAssistant({
    language,
    getVoiceId,
    selectedStaff,
    maleApiKey,
    femaleApiKey,
    setIsElevenLabsActive,
    setCallPhase,
    endCall,
  });

  // Helper: Is ElevenLabs TTS available for the current selected staff?
  const isElevenLabsAvailableForCurrentStaff = React.useMemo(() => {
    if (!isCallActive || !selectedStaff) return false;
    if (selectedStaff.gender === 'female') {
      return Boolean(femaleApiKey);
    } else if (selectedStaff.gender === 'male') {
      return Boolean(maleApiKey);
    }
    return false;
  }, [isCallActive, selectedStaff, maleApiKey, femaleApiKey]);

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
    <div className="space-y-6 w-full max-w-2xl mx-auto px-2 sm:px-0">
      {/* Show warning only if active call & NOT using ElevenLabs for this operator */}
      {isCallActive && !isElevenLabsAvailableForCurrentStaff && (
        <div className="bg-yellow-200 border-l-4 border-yellow-500 p-3 rounded mb-3 text-yellow-900 text-sm">
          <b>Notice:</b> You are hearing your browser's built-in TTS voice (not ElevenLabs). Please add and save your ElevenLabs API Keys below for authentic AI voice effects.
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-purple-600" />
            AI Voice Support - Speak Your Query
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300">
            Call our AI medical support team that can understand and respond to your voice queries in real-time. Just speak your health concerns naturally.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Voice Query Feature Highlight */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 dark:from-violet-900 dark:to-blue-900 dark:border-purple-700">
            <CardContent className="p-4">
              <div className="text-center">
                <h4 className="font-medium text-purple-900 dark:text-purple-200 mb-2">🎤 New: Voice Query Support</h4>
                <p className="text-sm text-purple-700 dark:text-purple-100 mb-3">
                  Our AI assistants can now listen to your health concerns and provide intelligent responses based on what you say.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-white dark:bg-purple-800 p-2 rounded text-gray-700 dark:text-white">
                    <strong>Say:</strong> "I have fever"<br/>
                    <em className="text-gray-600 dark:text-gray-200">AI responds with fever care</em>
                  </div>
                  <div className="bg-white dark:bg-blue-800 p-2 rounded text-gray-700 dark:text-white">
                    <strong>Say:</strong> "Need medicine delivery"<br/>
                    <em className="text-gray-600 dark:text-gray-200">Connects to pharmacy</em>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 text-gray-700 dark:text-gray-100">
                  <strong>Say:</strong> "Goodbye" or "Hang up"<br/>
                  <em className="text-gray-600 dark:text-gray-200">To end the call</em>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Medical Staff */}
          <div>
            <h3 className="font-semibold text-lg mb-4 dark:text-white">AI Voice Assistants (Enhanced Voices)</h3>
            <div className="space-y-3">
              {availableOperators.map((operator, index) => (
                <VoiceOperatorCard key={index} operator={operator} onStartCall={startCall} />
              ))}
            </div>
          </div>
        
          {/* Medicine Delivery Helpline */}
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

          {/* Emergency Medical Support */}
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
