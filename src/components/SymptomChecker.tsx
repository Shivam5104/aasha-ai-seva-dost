
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Thermometer, Heart, Brain, Pill, Clock, Bell } from 'lucide-react';
import { findEnhancedMedicalCondition, generateEnhancedMedicalResponse } from '@/utils/enhancedMedicalKnowledge';
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
    
    setTimeout(() => {
      const condition = findEnhancedMedicalCondition(symptoms);
      
      if (condition) {
        // Create a proper diagnosis object with all required fields
        const mockDiagnosis = {
          condition: symptoms.toLowerCase().includes('fever') ? "Fever and Associated Symptoms" :
                   symptoms.toLowerCase().includes('headache') ? "Tension Headache/Migraine" :
                   symptoms.toLowerCase().includes('cough') ? "Respiratory Tract Infection" :
                   symptoms.toLowerCase().includes('diabetes') ? "Diabetes Management" :
                   symptoms.toLowerCase().includes('blood pressure') || symptoms.toLowerCase().includes('hypertension') ? "Hypertension Management" : 
                   "Health Concern Requiring Medical Attention",
          severity: condition.severity.charAt(0).toUpperCase() + condition.severity.slice(1),
          confidence: "85%",
          remedies: condition.homeRemedies || ['Consult with healthcare professional', 'Rest and hydration', 'Monitor symptoms'],
          medicines: condition.medicines?.map(med => ({
            name: med.name,
            dosage: med.dosage,
            frequency: med.frequency,
            duration: med.duration,
            instructions: med.instructions,
            sideEffects: med.sideEffects || [],
            price: med.price
          })) || [],
          warning: condition.warnings?.join('. ') || 'Consult healthcare professional for proper diagnosis',
          followUp: condition.whenToSeeDoctor?.join('. ') || 'Schedule follow-up if symptoms persist',
          patientInfo: {
            age,
            gender,
            severity,
            duration
          }
        };
        
        console.log('Setting diagnosis:', mockDiagnosis);
        setDiagnosis(mockDiagnosis);
      } else {
        // Enhanced fallback with general health advice
        const fallbackDiagnosis = {
          condition: "Symptoms require professional medical evaluation",
          severity: "Unknown",
          confidence: "N/A",
          remedies: [
            "Consult with a healthcare professional for accurate diagnosis",
            "Monitor symptoms and note any changes",
            "Rest and maintain adequate hydration",
            "Avoid self-medication without professional guidance"
          ],
          medicines: [
            {
              name: "General Health Support",
              dosage: "As recommended by doctor",
              frequency: "As prescribed",
              duration: "As needed",
              instructions: "Please consult with our healthcare professionals for proper medication",
              sideEffects: [],
              price: "Varies"
            }
          ],
          warning: "These symptoms require proper medical evaluation for accurate diagnosis and treatment. Do not delay seeking professional medical care.",
          followUp: "Schedule a consultation with our qualified doctors for comprehensive evaluation and personalized treatment plan.",
          patientInfo: { age, gender, severity, duration }
        };
        
        console.log('Setting fallback diagnosis:', fallbackDiagnosis);
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
      times: ['09:00', '21:00'], // Default times
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      frequency: 'daily',
      instructions: medicine.instructions,
      isActive: true
    };

    // Save to localStorage (this would integrate with MedicationAlarm component)
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
            Enhanced AI Symptom Checker
          </CardTitle>
          <p className="text-gray-600">
            Get comprehensive medical advice with specific medicine recommendations and dosages
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
                Analyzing Symptoms...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Get Enhanced AI Diagnosis
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Enhanced Diagnosis Results */}
      {diagnosis && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Heart className="w-5 h-5" />
              Comprehensive Medical Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Condition & Patient Info */}
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Probable Condition</h3>
              <p className="text-gray-800 mb-3">{diagnosis.condition}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Badge variant="outline">Severity: {diagnosis.severity}</Badge>
                <Badge variant="outline">Confidence: {diagnosis.confidence}</Badge>
                {diagnosis.patientInfo.age && <Badge variant="outline">Age: {diagnosis.patientInfo.age}</Badge>}
                {diagnosis.patientInfo.duration && <Badge variant="outline">Duration: {diagnosis.patientInfo.duration}</Badge>}
              </div>
            </div>

            {/* Prescribed Medicines */}
            {diagnosis.medicines && diagnosis.medicines.length > 0 && (
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Pill className="w-4 h-4 text-blue-500" />
                  Prescribed Medicines & Dosages
                </h3>
                <div className="space-y-4">
                  {diagnosis.medicines.map((med: any, index: number) => (
                    <div key={index} className="border border-blue-200 p-4 rounded-lg bg-blue-50">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-blue-800 text-lg">{med.name}</h4>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setMedicationReminder(med)}
                          >
                            <Bell className="w-3 h-3 mr-1" />
                            Set Reminder
                          </Button>
                          <Badge variant="secondary">{med.price}</Badge>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <strong className="text-blue-700">Dosage:</strong> {med.dosage}
                        </div>
                        <div>
                          <strong className="text-blue-700">Frequency:</strong> {med.frequency}
                        </div>
                        <div>
                          <strong className="text-blue-700">Duration:</strong> {med.duration}
                        </div>
                        <div>
                          <strong className="text-blue-700">Instructions:</strong> {med.instructions}
                        </div>
                      </div>
                      
                      {med.sideEffects && med.sideEffects.length > 0 && (
                        <div className="mt-2">
                          <strong className="text-orange-700">Possible Side Effects:</strong>
                          <span className="text-orange-600 ml-2">{med.sideEffects.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Home Remedies */}
            {diagnosis.remedies && diagnosis.remedies.length > 0 && (
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  Home Remedies & Self Care
                </h3>
                <ul className="space-y-2">
                  {diagnosis.remedies.map((remedy: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{remedy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warning & Follow-up */}
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-2">Important Medical Notes</h4>
                  <p className="text-yellow-700 mb-2">{diagnosis.warning}</p>
                  <p className="text-yellow-700">{diagnosis.followUp}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="flex-1">
                <Pill className="w-4 h-4 mr-2" />
                Order All Medicines
              </Button>
              <Button variant="outline" className="flex-1">
                <Clock className="w-4 h-4 mr-2" />
                Schedule Doctor Visit
              </Button>
              <Button variant="outline" className="flex-1">
                <Bell className="w-4 h-4 mr-2" />
                Set All Reminders
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SymptomChecker;
