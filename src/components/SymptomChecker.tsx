
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Thermometer, Heart, Brain, Pill, Clock } from 'lucide-react';

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
  const [diagnosis, setDiagnosis] = useState(null);

  const commonSymptoms = [
    'Fever', 'Headache', 'Cough', 'Cold', 'Stomach Pain', 
    'Body Ache', 'Nausea', 'Dizziness', 'Chest Pain', 'Breathing Issues'
  ];

  const handleSymptomClick = (symptom: string) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.replace(symptom, '').replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, ''));
    } else {
      setSymptoms(symptoms ? `${symptoms}, ${symptom}` : symptom);
    }
  };

  const analyzeSyptoms = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockDiagnosis = {
        condition: "Common Cold with Mild Fever",
        severity: "Mild",
        confidence: "85%",
        remedies: [
          "Rest for 2-3 days",
          "Drink plenty of warm fluids",
          "Gargle with warm salt water",
          "Take steam inhalation 2-3 times daily"
        ],
        medicines: [
          {
            name: "Paracetamol 650mg",
            dosage: "1 tablet every 8 hours",
            duration: "3-5 days",
            instructions: "Take after meals with water"
          },
          {
            name: "Cetrizine 10mg",
            dosage: "1 tablet at bedtime",
            duration: "3 days",
            instructions: "Take with water before sleep"
          }
        ],
        warning: "Consult a doctor if symptoms worsen or persist beyond 5 days",
        followUp: "Schedule a follow-up if fever exceeds 102°F or breathing difficulties occur"
      };
      
      setDiagnosis(mockDiagnosis);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            AI Symptom Checker
          </CardTitle>
          <p className="text-gray-600">
            Describe your symptoms and get instant medical advice from our AI doctor
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
            disabled={!symptoms || !age || isAnalyzing}
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
                Get AI Diagnosis
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Diagnosis Results */}
      {diagnosis && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Heart className="w-5 h-5" />
              AI Diagnosis & Treatment Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Condition */}
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Probable Condition</h3>
              <p className="text-gray-800">{diagnosis.condition}</p>
              <div className="flex gap-4 mt-2">
                <Badge variant="outline">Severity: {diagnosis.severity}</Badge>
                <Badge variant="outline">Confidence: {diagnosis.confidence}</Badge>
              </div>
            </div>

            {/* Home Remedies */}
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                Home Remedies
              </h3>
              <ul className="space-y-2">
                {diagnosis.remedies.map((remedy, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>{remedy}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Medicines */}
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Pill className="w-4 h-4 text-blue-500" />
                Recommended Medicines
              </h3>
              <div className="space-y-3">
                {diagnosis.medicines.map((med, index) => (
                  <div key={index} className="border p-3 rounded-lg">
                    <h4 className="font-medium text-blue-800">{med.name}</h4>
                    <div className="grid md:grid-cols-3 gap-2 mt-2 text-sm">
                      <div><strong>Dosage:</strong> {med.dosage}</div>
                      <div><strong>Duration:</strong> {med.duration}</div>
                      <div><strong>Instructions:</strong> {med.instructions}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning & Follow-up */}
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
                  <p className="text-yellow-700 mb-2">{diagnosis.warning}</p>
                  <p className="text-yellow-700">{diagnosis.followUp}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button className="flex-1">
                <Pill className="w-4 h-4 mr-2" />
                Order Medicines
              </Button>
              <Button variant="outline" className="flex-1">
                <Clock className="w-4 h-4 mr-2" />
                Schedule Doctor Visit
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SymptomChecker;
