import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Camera, Upload, User, LogIn, Phone, Mail, MapPin, Truck, Clock, Navigation } from 'lucide-react';
import { generateMedicalResponse } from '@/utils/medicalKnowledge';
import LocationPermission from './LocationPermission';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'prescription' | 'order_tracking' | 'location';
}

interface User {
  name: string;
  lastVisit?: Date;
  orderHistory?: any[];
}

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState('');
  const [showLocationServices, setShowLocationServices] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockOrders = [
    {
      id: 'ORD-2024-001',
      medicine: 'Paracetamol 500mg',
      status: 'Out for Delivery',
      partnerName: 'Rajesh Kumar',
      partnerPhone: '+91 98765-43210',
      estimatedTime: '15 minutes',
      currentLocation: 'Near City Hospital',
      trackingSteps: [
        { status: 'Order Placed', time: '10:00 AM', completed: true },
        { status: 'Pharmacy Confirmed', time: '10:15 AM', completed: true },
        { status: 'Out for Delivery', time: '11:30 AM', completed: true },
        { status: 'Delivered', time: 'Expected 12:00 PM', completed: false }
      ]
    }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: user 
        ? `Welcome back, ${user.name}! How are you feeling today? I'm here to help with your health questions, track your medicines, or assist with any concerns.`
        : 'Hello! I\'m your AI health assistant. I can help you with medical questions, track medicine deliveries, and provide health support. Please sign up to get personalized assistance.',
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [user]);

  const handleSignup = () => {
    if (userName.trim()) {
      const newUser: User = {
        name: userName.trim(),
        lastVisit: new Date(),
        orderHistory: mockOrders
      };
      setUser(newUser);
      setShowSignup(false);
      setUserName('');
    }
  };

  const addBotMessage = (text: string, type: 'text' | 'prescription' | 'order_tracking' | 'location' = 'text') => {
    const botMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      if (inputMessage.toLowerCase().includes('track') || inputMessage.toLowerCase().includes('order')) {
        if (user?.orderHistory?.length) {
          addBotMessage('Here are your current orders:', 'order_tracking');
        } else {
          addBotMessage('You don\'t have any active orders. Would you like to place an order for medicines?');
        }
      } else {
        // Use the new medical knowledge base
        const response = generateMedicalResponse(inputMessage);
        addBotMessage(response);
      }
    }, 1500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: `📷 Uploaded prescription: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'prescription'
      };

      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        addBotMessage(`I've analyzed your prescription "${file.name}". Here are my recommendations:

📋 **Prescription Analysis:**
- Medicine 1: Paracetamol 500mg - Take 1 tablet every 6 hours for fever
- Medicine 2: Amoxicillin 250mg - Take 1 capsule twice daily for 7 days for infection
- Medicine 3: Vitamin D3 - Take 1 tablet weekly for vitamin deficiency

💊 **Availability & Pricing:**
- Paracetamol 500mg (10 tablets) - ₹25 ✅ In Stock
- Amoxicillin 250mg (10 capsules) - ₹120 ✅ In Stock  
- Vitamin D3 (4 tablets) - ₹80 ✅ In Stock

📦 **Delivery Details:**
- Estimated delivery: 2-3 hours
- Total medicine cost: ₹225
- Delivery charges: ₹20
- **Total: ₹245**

⚠️ **Important Instructions:**
- Take Amoxicillin with food to avoid stomach upset
- Complete the full antibiotic course even if you feel better
- Avoid alcohol during treatment
- Take Paracetamol only when fever is above 100°F

Would you like me to place this order for home delivery?`, 'prescription');
      }, 2000);
    }
  };

  return (
    <div className="h-full flex flex-col w-full max-w-2xl mx-auto px-2 sm:px-0">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-gray-900 dark:text-white">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            AI Health Assistant
            {user && (
              <Badge variant="secondary" className="ml-2 dark:bg-gray-700 dark:text-gray-100">
                {user.name}
              </Badge>
            )}
          </CardTitle>
          {!user && (
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setShowSignup(!showSignup)}
              >
                <LogIn className="w-3 h-3 mr-1" />
                Sign Up
              </Button>
            </div>
          )}
        </CardHeader>

        {/* Signup Form */}
        {showSignup && !user && (
          <CardContent className="py-2">
            <div className="flex gap-2">
              <Input
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSignup()}
                className="dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
              />
              <Button size="sm" onClick={handleSignup}>
                Sign Up
              </Button>
            </div>
          </CardContent>
        )}

        <CardContent className="flex-1 flex flex-col p-4 bg-white dark:bg-gray-900 rounded-b-2xl sm:rounded-b-lg overflow-x-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 px-1">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80vw] sm:max-w-[80%] p-3 rounded-lg break-words ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                }`}>
                  <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                  
                  {/* Order Tracking Display */}
                  {message.type === 'order_tracking' && user?.orderHistory?.length && (
                    <div className="mt-3 space-y-3">
                      {mockOrders.map((order) => (
                        <div key={order.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-800 dark:text-white">Order #{order.id}</h4>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">{order.status}</Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-100">
                            <div><strong>Medicine:</strong> {order.medicine}</div>
                            <div className="flex items-center gap-2">
                              <Truck className="w-4 h-4 text-blue-600" />
                              <span><strong>Delivery Partner:</strong> {order.partnerName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-green-600" />
                              <span>{order.partnerPhone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-orange-600" />
                              <span><strong>ETA:</strong> {order.estimatedTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Navigation className="w-4 h-4 text-purple-600" />
                              <span><strong>Current Location:</strong> {order.currentLocation}</span>
                            </div>
                          </div>

                          {/* Real-time Tracking Steps */}
                          <div className="mt-3 space-y-1">
                            {order.trackingSteps.map((step, idx) => (
                              <div key={idx} className={`flex items-center gap-2 text-xs ${
                                step.completed ? 'text-green-600 dark:text-green-300' : 'text-gray-500 dark:text-gray-400'
                              }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                  step.completed ? 'bg-green-500 dark:bg-green-300' : 'bg-gray-300 dark:bg-gray-700'
                                }`}></div>
                                <span>{step.status} - {step.time}</span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                            <Button size="sm" className="w-full">
                              <Phone className="w-3 h-3 mr-1" />
                              Call Delivery Partner
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Location Services Toggle */}
          <div className="mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLocationServices(!showLocationServices)}
              className="w-full"
            >
              <MapPin className="w-4 h-4 mr-2" />
              {showLocationServices ? 'Hide' : 'Show'} Location Services
            </Button>
          </div>

          {/* Location Services */}
          {showLocationServices && (
            <div className="mb-4">
              <LocationPermission />
            </div>
          )}

          {/* Input Area */}
          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*,.pdf"
              className="hidden"
            />
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="px-3"
            >
              <Camera className="w-4 h-4" />
            </Button>
            
            <Input
              placeholder="Ask about symptoms, medicines, or health..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
            />
            
            <Button onClick={handleSendMessage} size="sm" disabled={!inputMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Customer Support - Fixed Layout */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="flex items-center gap-2 mb-3">
              <Phone className="w-4 h-4 text-blue-600" />
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 text-sm">24/7 Customer Support</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-600 dark:text-gray-200">Call us:</span>
                  <a href="tel:+911800123567" className="text-sm font-medium text-green-700 dark:text-green-200 hover:text-green-800">
                    +91 1800-123-4567
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-600 dark:text-gray-200">Email us:</span>
                  <a href="mailto:support@aashaaiseva.com" className="text-sm font-medium text-blue-700 dark:text-blue-200 hover:text-blue-800">
                    support@aashaaiseva.com
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-blue-200 dark:border-blue-700">
              <p className="text-xs text-gray-600 dark:text-gray-200">Available in Hindi, English, and 15+ regional languages</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChatbot;
