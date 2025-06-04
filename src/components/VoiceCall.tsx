
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, PhoneCall, Mic, MicOff, Volume2, Clock, User, MapPin } from 'lucide-react';

interface VoiceCallProps {
  language: string;
}

const VoiceCall: React.FC<VoiceCallProps> = ({ language }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callType, setCallType] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [supportRequest, setSupportRequest] = useState(null);

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
      specialty: 'General Medicine',
      status: 'Available',
      rating: '4.8'
    },
    {
      name: 'Dr. Rajesh Kumar',
      languages: ['Hindi', 'English', 'Bhojpuri'],
      specialty: 'Emergency Care',
      status: 'Available',
      rating: '4.9'
    },
    {
      name: 'Nurse Sunita',
      languages: ['Marathi', 'Hindi', 'English'],
      specialty: 'Patient Care',
      status: 'Busy',
      rating: '4.7'
    }
  ];

  const startCall = (type: string) => {
    setCallType(type);
    setIsCallActive(true);
    
    // Simulate call connection
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Auto-create support request
    setTimeout(() => {
      setSupportRequest({
        requestId: `REQ-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        type: type,
        status: 'Processing',
        estimatedResponse: '15-30 minutes',
        assignedTo: 'Medical Team'
      });
    }, 3000);
  };

  const endCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
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
            Voice Call Active
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Call Info */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold">Dr. Priya Sharma</h3>
            <p className="text-gray-600">General Medicine Specialist</p>
            <div className="flex justify-center items-center gap-2 mt-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-mono text-lg">{formatTime(callDuration)}</span>
            </div>
          </div>

          {/* Call Status */}
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Call Status</span>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
            </div>
            <p className="text-sm text-gray-600">
              AI is transcribing your conversation in real-time and will provide recommendations.
            </p>
          </div>

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
                <div><strong>Status:</strong> {supportRequest.status}</div>
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
            Voice Support in Your Language
          </CardTitle>
          <p className="text-gray-600">
            Call our medical support team in your preferred language. Perfect for rural areas or when typing is difficult.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick Call Options */}
          <div className="grid md:grid-cols-3 gap-4">
            {supportTypes.map((type) => (
              <Card 
                key={type.id}
                className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-purple-200"
                onClick={() => startCall(type.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-3">{type.icon}</div>
                  <h3 className="font-semibold mb-2">{type.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                  <div className="space-y-1">
                    {type.languages.map((lang, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs mr-1">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full mt-3" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Available Operators */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Available Medical Staff</h3>
            <div className="space-y-3">
              {availableOperators.map((operator, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{operator.name}</h4>
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
                            onClick={() => startCall('direct')}
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How it Works */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-lg">How Voice Support Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-1">Call</h4>
                  <p className="text-sm text-gray-600">Make a voice call in your language</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Mic className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-medium mb-1">Describe</h4>
                  <p className="text-sm text-gray-600">Explain your symptoms or needs</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium mb-1">AI Analysis</h4>
                  <p className="text-sm text-gray-600">AI provides recommendations</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="font-medium mb-1">Delivery</h4>
                  <p className="text-sm text-gray-600">Medicine delivered to your location</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Call */}
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-red-800">Emergency Medical Support</h4>
                  <p className="text-sm text-red-600">24/7 emergency assistance available</p>
                </div>
                <Button variant="destructive" size="lg">
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
