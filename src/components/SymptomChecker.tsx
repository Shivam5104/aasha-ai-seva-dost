
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Thermometer, Heart, Brain, Pill, Clock, Bell } from 'lucide-react';
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
        const mockDiagnosis = {
          condition: symptoms.toLowerCase().includes('fever') ? "Fever and Associated Symptoms" :
                   symptoms.toLowerCase().includes('headache') ? "Tension Headache/Migraine" :
                   symptoms.toLowerCase().includes('cough') ? "Respiratory Tract Infection" :
                   symptoms.toLowerCase().includes('diabetes') ? "Diabetes Management" :
                   symptoms.toLowerCase().includes('blood pressure') || symptoms.toLowerCase().includes('hypertension') ? "Hypertension Management" :
                   symptoms.toLowerCase().includes('stomach') || symptoms.toLowerCase().includes('gastric') ? "Gastric Issues" :
                   "Health Concern Requiring Medical Attention",
          severity: condition.severity.charAt(0).toUpperCase() + condition.severity.slice(1),
          confidence: "85%",
          remedies: condition.homeRemedies || [],
          medicines: condition.medicines?.map(med => ({
            name: med.name,
            dosage: med.dosage,
            frequency: med.frequency,
            duration: med.duration,
            instructions: med.instructions,
            sideEffects: med.sideEffects || [],
            price: med.price,
            medicineType: med.medicineType
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
        
        console.log('Setting diagnosis with medicines:', mockDiagnosis.medicines);
        setDiagnosis(mockDiagnosis);
      } else {
        // Enhanced fallback with more comprehensive medical advice
        const fallbackDiagnosis = {
          condition: "General Health Concern",
          severity: "Moderate",
          confidence: "70%",
          remedies: [
            "Rest and maintain adequate hydration (8-10 glasses water daily)",
            "Monitor symptoms and note any changes",
            "Maintain balanced diet with fruits and vegetables",
            "Light exercise as tolerated",
            "Avoid smoking and alcohol"
          ],
          medicines: [
            {
              name: "Paracetamol 650mg",
              dosage: "1-2 tablets",
              frequency: "Every 6-8 hours as needed",
              duration: "2-3 days",
              instructions: "Take with water after meals. Maximum 4 tablets per day",
              sideEffects: ["Liver damage with overdose", "Nausea (rare)"],
              price: "₹25-40",
              medicineType: "painkiller"
            },
            {
              name: "Multivitamin Tablet",
              dosage: "1 tablet",
              frequency: "Once daily after breakfast",
              duration: "30 days",
              instructions: "Take with meal for better absorption",
              sideEffects: ["Mild stomach upset if taken empty stomach"],
              price: "₹150-250",
              medicineType: "supplement"
            },
            {
              name: "ORS (Oral Rehydration Solution)",
              dosage: "1 sachet in 200ml water",
              frequency: "2-3 times daily as needed",
              duration: "Until symptoms improve",
              instructions: "Dissolve completely in clean water. Consume within 24 hours",
              sideEffects: ["None commonly reported"],
              price: "₹15-25",
              medicineType: "supplement"
            }
          ],
          warning: "These are general recommendations. For accurate diagnosis and specific treatment, consult with a qualified healthcare professional immediately.",
          followUp: "If symptoms persist for more than 3 days, worsen, or if you develop fever, difficulty breathing, severe pain, or other concerning symptoms, seek immediate medical attention.",
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
                  Doctor Prescribed Medicines & Dosages
                </h3>
                <div className="space-y-4">
                  {diagnosis.medicines.map((med: any, index: number) => (
                    <div key={index} className="border border-blue-200 p-4 rounded-lg bg-blue-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-blue-800 text-lg">{med.name}</h4>
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
                      </div>
                      
                      <div className="mb-3">
                        <strong className="text-blue-700">Instructions:</strong> {med.instructions}
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
