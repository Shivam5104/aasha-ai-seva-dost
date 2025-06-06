
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Calendar, User, Heart, Pill, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';

interface MedicalRecord {
  id: string;
  date: string;
  type: 'consultation' | 'prescription' | 'lab_report' | 'diagnosis' | 'surgery' | 'vaccination';
  title: string;
  description: string;
  doctor: string;
  hospital: string;
  medications?: string[];
  attachments?: string[];
  followUp?: string;
}

interface VitalSigns {
  date: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  weight: string;
  bloodSugar?: string;
}

export function MedicalHistory() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [vitals, setVitals] = useState<VitalSigns[]>([]);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [showAddVitals, setShowAddVitals] = useState(false);
  const [activeTab, setActiveTab] = useState<'records' | 'vitals'>('records');
  
  const [newRecord, setNewRecord] = useState({
    type: 'consultation' as const,
    title: '',
    description: '',
    doctor: '',
    hospital: '',
    medications: '',
    followUp: ''
  });

  const [newVitals, setNewVitals] = useState({
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    weight: '',
    bloodSugar: ''
  });

  useEffect(() => {
    // Load data from localStorage
    const savedRecords = localStorage.getItem('medicalRecords');
    const savedVitals = localStorage.getItem('vitalSigns');
    
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
    if (savedVitals) {
      setVitals(JSON.parse(savedVitals));
    }
  }, []);

  useEffect(() => {
    // Save records to localStorage
    localStorage.setItem('medicalRecords', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    // Save vitals to localStorage
    localStorage.setItem('vitalSigns', JSON.stringify(vitals));
  }, [vitals]);

  const addRecord = () => {
    if (!newRecord.title || !newRecord.description) {
      toast.error('Please fill in required fields');
      return;
    }

    const record: MedicalRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      ...newRecord,
      medications: newRecord.medications ? newRecord.medications.split(',').map(m => m.trim()) : []
    };

    setRecords(prev => [record, ...prev]);
    setNewRecord({
      type: 'consultation',
      title: '',
      description: '',
      doctor: '',
      hospital: '',
      medications: '',
      followUp: ''
    });
    setShowAddRecord(false);
    toast.success('Medical record added successfully');
  };

  const addVitalSigns = () => {
    if (!newVitals.bloodPressure && !newVitals.heartRate && !newVitals.temperature && !newVitals.weight) {
      toast.error('Please fill in at least one vital sign');
      return;
    }

    const vital: VitalSigns = {
      date: new Date().toISOString().split('T')[0],
      ...newVitals
    };

    setVitals(prev => [vital, ...prev]);
    setNewVitals({
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      weight: '',
      bloodSugar: ''
    });
    setShowAddVitals(false);
    toast.success('Vital signs recorded successfully');
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(record => record.id !== id));
    toast.success('Medical record deleted');
  };

  const deleteVital = (index: number) => {
    setVitals(prev => prev.filter((_, i) => i !== index));
    toast.success('Vital signs deleted');
  };

  const getTypeColor = (type: string) => {
    const colors = {
      consultation: 'bg-blue-100 text-blue-800',
      prescription: 'bg-green-100 text-green-800',
      lab_report: 'bg-purple-100 text-purple-800',
      diagnosis: 'bg-red-100 text-red-800',
      surgery: 'bg-orange-100 text-orange-800',
      vaccination: 'bg-teal-100 text-teal-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Medical History & Records
        </CardTitle>
        
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'records' ? 'default' : 'outline'}
            onClick={() => setActiveTab('records')}
          >
            Medical Records
          </Button>
          <Button
            variant={activeTab === 'vitals' ? 'default' : 'outline'}
            onClick={() => setActiveTab('vitals')}
          >
            Vital Signs
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {activeTab === 'records' && (
          <>
            <Button onClick={() => setShowAddRecord(true)} className="w-fit">
              <Plus className="w-4 h-4 mr-2" />
              Add Medical Record
            </Button>

            {showAddRecord && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="recordType">Type *</Label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={newRecord.type}
                        onChange={(e) => setNewRecord(prev => ({...prev, type: e.target.value as any}))}
                      >
                        <option value="consultation">Consultation</option>
                        <option value="prescription">Prescription</option>
                        <option value="lab_report">Lab Report</option>
                        <option value="diagnosis">Diagnosis</option>
                        <option value="surgery">Surgery</option>
                        <option value="vaccination">Vaccination</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="recordTitle">Title *</Label>
                      <Input
                        id="recordTitle"
                        value={newRecord.title}
                        onChange={(e) => setNewRecord(prev => ({...prev, title: e.target.value}))}
                        placeholder="e.g., Regular checkup"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="recordDescription">Description *</Label>
                    <Textarea
                      id="recordDescription"
                      value={newRecord.description}
                      onChange={(e) => setNewRecord(prev => ({...prev, description: e.target.value}))}
                      placeholder="Detailed description of the consultation/treatment..."
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="doctor">Doctor Name</Label>
                      <Input
                        id="doctor"
                        value={newRecord.doctor}
                        onChange={(e) => setNewRecord(prev => ({...prev, doctor: e.target.value}))}
                        placeholder="Dr. Smith"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hospital">Hospital/Clinic</Label>
                      <Input
                        id="hospital"
                        value={newRecord.hospital}
                        onChange={(e) => setNewRecord(prev => ({...prev, hospital: e.target.value}))}
                        placeholder="City Hospital"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="medications">Medications (comma separated)</Label>
                    <Input
                      id="medications"
                      value={newRecord.medications}
                      onChange={(e) => setNewRecord(prev => ({...prev, medications: e.target.value}))}
                      placeholder="Paracetamol 500mg, Amoxicillin 250mg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="followUp">Follow-up Instructions</Label>
                    <Input
                      id="followUp"
                      value={newRecord.followUp}
                      onChange={(e) => setNewRecord(prev => ({...prev, followUp: e.target.value}))}
                      placeholder="Next visit in 2 weeks"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={addRecord}>
                      <FileText className="w-4 h-4 mr-2" />
                      Add Record
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddRecord(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Medical Records List */}
            <div className="space-y-3">
              {records.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No medical records found</p>
              ) : (
                records.map(record => (
                  <Card key={record.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(record.type)}>
                            {record.type.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {record.date}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteRecord(record.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <h4 className="font-medium mb-2">{record.title}</h4>
                      <p className="text-gray-700 mb-3">{record.description}</p>
                      
                      {(record.doctor || record.hospital) && (
                        <div className="flex items-center gap-4 mb-2 text-sm text-gray-600">
                          {record.doctor && (
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              Dr. {record.doctor}
                            </span>
                          )}
                          {record.hospital && (
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {record.hospital}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {record.medications && record.medications.length > 0 && (
                        <div className="mb-2">
                          <span className="text-sm font-medium flex items-center gap-1">
                            <Pill className="w-3 h-3" />
                            Medications:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {record.medications.map((med, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {med}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {record.followUp && (
                        <p className="text-sm text-blue-600">
                          <strong>Follow-up:</strong> {record.followUp}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </>
        )}

        {activeTab === 'vitals' && (
          <>
            <Button onClick={() => setShowAddVitals(true)} className="w-fit">
              <Plus className="w-4 h-4 mr-2" />
              Record Vital Signs
            </Button>

            {showAddVitals && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                      <Input
                        id="bloodPressure"
                        value={newVitals.bloodPressure}
                        onChange={(e) => setNewVitals(prev => ({...prev, bloodPressure: e.target.value}))}
                        placeholder="120/80"
                      />
                    </div>
                    <div>
                      <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                      <Input
                        id="heartRate"
                        value={newVitals.heartRate}
                        onChange={(e) => setNewVitals(prev => ({...prev, heartRate: e.target.value}))}
                        placeholder="72"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="temperature">Temperature (°F)</Label>
                      <Input
                        id="temperature"
                        value={newVitals.temperature}
                        onChange={(e) => setNewVitals(prev => ({...prev, temperature: e.target.value}))}
                        placeholder="98.6"
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        value={newVitals.weight}
                        onChange={(e) => setNewVitals(prev => ({...prev, weight: e.target.value}))}
                        placeholder="70"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
                      <Input
                        id="bloodSugar"
                        value={newVitals.bloodSugar}
                        onChange={(e) => setNewVitals(prev => ({...prev, bloodSugar: e.target.value}))}
                        placeholder="100"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={addVitalSigns}>
                      <Heart className="w-4 h-4 mr-2" />
                      Record Vitals
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddVitals(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Vital Signs List */}
            <div className="space-y-3">
              {vitals.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No vital signs recorded</p>
              ) : (
                vitals.map((vital, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {vital.date}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteVital(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        {vital.bloodPressure && (
                          <div>
                            <span className="font-medium">Blood Pressure:</span>
                            <br />
                            {vital.bloodPressure} mmHg
                          </div>
                        )}
                        {vital.heartRate && (
                          <div>
                            <span className="font-medium">Heart Rate:</span>
                            <br />
                            {vital.heartRate} bpm
                          </div>
                        )}
                        {vital.temperature && (
                          <div>
                            <span className="font-medium">Temperature:</span>
                            <br />
                            {vital.temperature}°F
                          </div>
                        )}
                        {vital.weight && (
                          <div>
                            <span className="font-medium">Weight:</span>
                            <br />
                            {vital.weight} kg
                          </div>
                        )}
                        {vital.bloodSugar && (
                          <div>
                            <span className="font-medium">Blood Sugar:</span>
                            <br />
                            {vital.bloodSugar} mg/dL
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
