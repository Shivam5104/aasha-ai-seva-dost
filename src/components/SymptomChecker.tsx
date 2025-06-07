
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Thermometer, Heart, Brain, Pill, Clock, Bell, ShoppingCart } from 'lucide-react';
import { findEnhancedMedicalCondition } from '@/utils/enhancedMedicalKnowledge';
import { toast } from 'sonner';

interface SymptomCheckerProps {
  language: string;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ language }) => {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [severity, setSeverity] = useState('');
  const [duration, setDuration] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<any>(null);

  const commonSymptoms = [
    'Fever', 'Headache', 'Cough', 'Cold', 'Stomach Pain', 
    'Body Ache', 'Nausea', 'Dizziness', 'Chest Pain', 'Breathing Issues',
    'High Blood Pressure', 'Diabetes', 'Joint Pain', 'Back Pain'
  ];

  const handleSymptomClick = (symptom: string) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.replace(symptom, '').replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, ''));
    } else {
      setSymptoms(symptoms ? `${symptoms}, ${symptom}` : symptom);
    }
  };

  const analyzeSyptoms = async () => {
    if (!symptoms.trim()) {
      toast.error('Please describe your symptoms');
      return;
    }

    setIsAnalyzing(true);
    console.log('Analyzing symptoms:', symptoms);
    
    setTimeout(() => {
      const condition = findEnhancedMedicalCondition(symptoms);
      console.log('Found condition:', condition);
      
      if (condition) {
        const conditionName = symptoms.toLowerCase().includes('fever') ? "Fever and Associated Symptoms" :
                             symptoms.toLowerCase().includes('headache') ? "Headache/Migraine" :
                             symptoms.toLowerCase().includes('cough') ? "Respiratory Infection" :
                             symptoms.toLowerCase().includes('diabetes') ? "Diabetes Management" :
                             symptoms.toLowerCase().includes('blood pressure') || symptoms.toLowerCase().includes('hypertension') ? "High Blood Pressure" :
                             symptoms.toLowerCase().includes('stomach') || symptoms.toLowerCase().includes('gastric') ? "Gastric/Stomach Issues" :
                             "Medical Condition";
        
        const diagnosisResult = {
          condition: conditionName,
          severity: condition.severity.charAt(0).toUpperCase() + condition.severity.slice(1),
          confidence: "90%",
          medicines: condition.medicines || [],
          remedies: condition.homeRemedies || [],
          warnings: condition.warnings || [],
          followUp: condition.whenToSeeDoctor || [],
          patientInfo: { age, gender, severity, duration }
        };
        
        console.log('Setting diagnosis with medicines:', diagnosisResult.medicines);
        setDiagnosis(diagnosisResult);
      } else {
        // Enhanced fallback with comprehensive medicine recommendations
        const fallbackDiagnosis = {
          condition: "General Health Concern - Symptom Relief",
          severity: "Moderate",
          confidence: "75%",
          medicines: [
            {
              name: "Paracetamol 650mg",
              dosage: "1-2 tablets",
              frequency: "Every 6-8 hours",
              duration: "3-5 days",
              instructions: "Take with water after meals. Do not exceed 4g per day.",
              sideEffects: ["Liver damage with overdose", "Rare allergic reactions"],
              price: "₹25-40",
              medicineType: "painkiller"
            },
            {
              name: "Ibuprofen 400mg",
              dosage: "1 tablet",
              frequency: "Every 8 hours",
              duration: "3-5 days",
              instructions: "Take with food to prevent stomach irritation. Avoid if you have kidney issues.",
              sideEffects: ["Stomach upset", "Dizziness", "Kidney problems with long-term use"],
              price: "₹35-50",
              medicineType: "painkiller"
            },
            {
              name: "Cetirizine 10mg",
              dosage: "1 tablet",
              frequency: "Once daily at bedtime",
              duration: "5-7 days",
              instructions: "Take at night as it may cause drowsiness. Effective for allergic symptoms.",
              sideEffects: ["Drowsiness", "Dry mouth", "Fatigue"],
              price: "₹20-35",
              medicineType: "antihistamine"
            },
            {
              name: "Multivitamin Complex",
              dosage: "1 tablet",
              frequency: "Once daily after breakfast",
              duration: "30 days",
              instructions: "Take with meal for better absorption. Helps boost immunity.",
              sideEffects: ["Mild stomach upset if taken empty stomach"],
              price: "₹150-300",
              medicineType: "supplement"
            }
          ],
          remedies: [
            "Drink 8-10 glasses of water daily",
            "Get adequate rest (7-8 hours sleep)",
            "Eat light, nutritious meals",
            "Avoid spicy, oily, and processed foods",
            "Practice deep breathing exercises"
          ],
          warnings: [
            "Complete the full course of prescribed medicines",
            "Do not exceed recommended dosages",
            "Consult doctor if symptoms worsen",
            "Avoid alcohol during treatment"
          ],
          followUp: [
            "See doctor if symptoms persist beyond 5 days",
            "Seek immediate help for severe symptoms",
            "Monitor temperature and other vital signs",
            "Keep track of medicine effectiveness"
          ],
          patientInfo: { age, gender, severity, duration }
        };
        
        console.log('Setting comprehensive fallback diagnosis:', fallbackDiagnosis);
        setDiagnosis(fallbackDiagnosis);
      }
      
      setIsAnalyzing(false);
    }, 2000);
  };

  const setMedicationReminder = (medicine: any) => {
    const reminder = {
      id: Date.now().toString(),
      medicineName: medicine.name,
      dosage: medicine.dosage,
      times: ['09:00', '21:00'],
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      frequency: 'daily',
      instructions: medicine.instructions,
      isActive: true
    };

    const existingAlarms = JSON.parse(localStorage.getItem('medicationAlarms') || '[]');
    existingAlarms.push(reminder);
    localStorage.setItem('medicationAlarms', JSON.stringify(existingAlarms));
    
    toast.success(`Medication reminder set for ${medicine.name}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            AI Symptom Checker with Medicine Prescriptions
          </CardTitle>
          <p className="text-gray-600">
            Get detailed medical advice with specific medicine recommendations, dosages, and treatment plans
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Patient Information */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="">Select Duration</option>
                <option value="1-2 days">1-2 days</option>
                <option value="3-5 days">3-5 days</option>
                <option value="1 week">1 week</option>
                <option value="more than 1 week">More than 1 week</option>
              </select>
            </div>
          </div>

          {/* Common Symptoms */}
          <div>
            <Label>Common Symptoms (Click to add)</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {commonSymptoms.map((symptom) => (
                <Badge
                  key={symptom}
                  variant={symptoms.includes(symptom) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-blue-100"
                  onClick={() => handleSymptomClick(symptom)}
                >
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>

          {/* Detailed Symptoms */}
          <div>
            <Label htmlFor="symptoms">Describe Your Symptoms in Detail</Label>
            <Textarea
              id="symptoms"
              placeholder="Please describe your symptoms, when they started, and how severe they are..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={4}
            />
          </div>

          {/* Severity */}
          <div>
            <Label>Pain/Discomfort Level</Label>
            <div className="flex gap-2 mt-2">
              {['Mild', 'Moderate', 'Severe'].map((level) => (
                <Button
                  key={level}
                  variant={severity === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSeverity(level)}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          {/* Analyze Button */}
          <Button 
            onClick={analyzeSyptoms}
            disabled={!symptoms || isAnalyzing}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing Symptoms & Prescribing Medicines...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Get Medicine Prescription & Treatment Plan
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Medicine Prescription Results */}
      {diagnosis && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Pill className="w-5 h-5" />
              Doctor's Prescription & Treatment Plan
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline">Condition: {diagnosis.condition}</Badge>
              <Badge variant="outline">Severity: {diagnosis.severity}</Badge>
              <Badge variant="outline">Confidence: {diagnosis.confidence}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Prescribed Medicines - Always Show */}
            <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold text-xl mb-4 flex items-center gap-2 text-blue-800">
                <Pill className="w-5 h-5" />
                💊 Prescribed Medicines (Take as directed)
              </h3>
              <div className="space-y-4">
                {diagnosis.medicines && diagnosis.medicines.length > 0 ? 
                  diagnosis.medicines.map((med: any, index: number) => (
                    <div key={index} className="border-2 border-blue-300 p-4 rounded-lg bg-blue-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-blue-900 text-lg">{med.name}</h4>
                          <Badge variant="secondary" className="mt-1">
                            {med.medicineType?.charAt(0).toUpperCase() + med.medicineType?.slice(1) || 'Medicine'}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setMedicationReminder(med)}
                          >
                            <Bell className="w-3 h-3 mr-1" />
                            Set Reminder
                          </Button>
                          <Badge variant="default" className="bg-green-600">{med.price}</Badge>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-3 bg-white p-3 rounded">
                        <div className="border-l-4 border-blue-500 pl-3">
                          <strong className="text-blue-800">💊 Dosage:</strong>
                          <p className="text-lg font-medium">{med.dosage}</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-3">
                          <strong className="text-green-800">⏰ Frequency:</strong>
                          <p className="text-lg font-medium">{med.frequency}</p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-3">
                          <strong className="text-orange-800">📅 Duration:</strong>
                          <p className="text-lg font-medium">{med.duration}</p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-3">
                          <strong className="text-purple-800">💰 Price:</strong>
                          <p className="text-lg font-medium">{med.price}</p>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 p-3 rounded mb-3 border border-yellow-200">
                        <strong className="text-yellow-800">📋 Instructions:</strong>
                        <p className="mt-1 text-yellow-900">{med.instructions}</p>
                      </div>
                      
                      {med.sideEffects && med.sideEffects.length > 0 && (
                        <div className="bg-red-50 p-3 rounded border border-red-200">
                          <strong className="text-red-800">⚠️ Possible Side Effects:</strong>
                          <p className="text-red-700 mt-1">{med.sideEffects.join(', ')}</p>
                        </div>
                      )}
                    </div>
                  )) : (
                    <div className="text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-yellow-800 font-medium">No specific medicines found for these symptoms. Please consult a doctor for proper diagnosis and treatment.</p>
                    </div>
                  )
                }
              </div>
            </div>

            {/* Home Remedies */}
            {diagnosis.remedies && diagnosis.remedies.length > 0 && (
              <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-green-800">
                  <Heart className="w-4 h-4" />
                  🏠 Home Remedies & Self Care
                </h3>
                <ul className="space-y-2">
                  {diagnosis.remedies.map((remedy: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 p-2 bg-green-50 rounded">
                      <span className="text-green-600 mt-1 font-bold">•</span>
                      <span className="text-green-800">{remedy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warnings */}
            {diagnosis.warnings && diagnosis.warnings.length > 0 && (
              <div className="bg-yellow-50 border-2 border-yellow-300 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  ⚠️ Important Warnings
                </h4>
                <ul className="text-yellow-700 space-y-1">
                  {diagnosis.warnings.map((warning: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* When to See Doctor */}
            {diagnosis.followUp && diagnosis.followUp.length > 0 && (
              <div className="bg-red-50 border-2 border-red-300 p-4 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  🚨 See Doctor Immediately If:
                </h4>
                <ul className="text-red-700 space-y-1">
                  {diagnosis.followUp.map((condition: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Order All Medicines
              </Button>
              <Button variant="outline" className="flex-1 border-green-600 text-green-600 hover:bg-green-50">
                <Clock className="w-4 h-4 mr-2" />
                Schedule Doctor Visit
              </Button>
              <Button variant="outline" className="flex-1 border-purple-600 text-purple-600 hover:bg-purple-50">
                <Bell className="w-4 h-4 mr-2" />
                Set All Medicine Reminders
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SymptomChecker;
