
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Bell, Plus, Trash2, Clock, Pill } from 'lucide-react';
import { toast } from 'sonner';

interface MedicationAlarm {
  id: string;
  medicineName: string;
  dosage: string;
  times: string[];
  startDate: string;
  endDate: string;
  frequency: string;
  instructions: string;
  isActive: boolean;
}

export function MedicationAlarm() {
  const [alarms, setAlarms] = useState<MedicationAlarm[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAlarm, setNewAlarm] = useState({
    medicineName: '',
    dosage: '',
    times: [''],
    startDate: '',
    endDate: '',
    frequency: 'daily',
    instructions: ''
  });

  useEffect(() => {
    // Load alarms from localStorage
    const savedAlarms = localStorage.getItem('medicationAlarms');
    if (savedAlarms) {
      setAlarms(JSON.parse(savedAlarms));
    }

    // Set up notification checking
    const interval = setInterval(checkForAlarms, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Save alarms to localStorage whenever alarms change
    localStorage.setItem('medicationAlarms', JSON.stringify(alarms));
  }, [alarms]);

  const checkForAlarms = () => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
    const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD format

    alarms.forEach(alarm => {
      if (alarm.isActive && 
          currentDate >= alarm.startDate && 
          currentDate <= alarm.endDate &&
          alarm.times.includes(currentTime)) {
        
        // Show notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(`Time for ${alarm.medicineName}`, {
            body: `Take ${alarm.dosage}. ${alarm.instructions}`,
            icon: '/favicon.ico'
          });
        }
        
        // Show toast notification
        toast.success(`Medication Reminder: Time for ${alarm.medicineName}`, {
          description: `Take ${alarm.dosage}. ${alarm.instructions}`,
          duration: 10000
        });
      }
    });
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        toast.success('Notifications enabled for medication reminders');
      }
    }
  };

  const addTimeSlot = () => {
    setNewAlarm(prev => ({
      ...prev,
      times: [...prev.times, '']
    }));
  };

  const updateTimeSlot = (index: number, time: string) => {
    setNewAlarm(prev => ({
      ...prev,
      times: prev.times.map((t, i) => i === index ? time : t)
    }));
  };

  const removeTimeSlot = (index: number) => {
    setNewAlarm(prev => ({
      ...prev,
      times: prev.times.filter((_, i) => i !== index)
    }));
  };

  const addAlarm = () => {
    if (!newAlarm.medicineName || !newAlarm.dosage || !newAlarm.startDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const alarm: MedicationAlarm = {
      id: Date.now().toString(),
      ...newAlarm,
      times: newAlarm.times.filter(time => time !== ''),
      isActive: true
    };

    setAlarms(prev => [...prev, alarm]);
    setNewAlarm({
      medicineName: '',
      dosage: '',
      times: [''],
      startDate: '',
      endDate: '',
      frequency: 'daily',
      instructions: ''
    });
    setShowAddForm(false);
    toast.success('Medication alarm added successfully');
    requestNotificationPermission();
  };

  const toggleAlarm = (id: string) => {
    setAlarms(prev => prev.map(alarm => 
      alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm
    ));
  };

  const deleteAlarm = (id: string) => {
    setAlarms(prev => prev.filter(alarm => alarm.id !== id));
    toast.success('Medication alarm deleted');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          Medication Alarms & Reminders
        </CardTitle>
        <Button onClick={() => setShowAddForm(true)} className="w-fit">
          <Plus className="w-4 h-4 mr-2" />
          Add Medication Alarm
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAddForm && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="medicineName">Medicine Name *</Label>
                  <Input
                    id="medicineName"
                    value={newAlarm.medicineName}
                    onChange={(e) => setNewAlarm(prev => ({...prev, medicineName: e.target.value}))}
                    placeholder="e.g., Paracetamol 500mg"
                  />
                </div>
                <div>
                  <Label htmlFor="dosage">Dosage *</Label>
                  <Input
                    id="dosage"
                    value={newAlarm.dosage}
                    onChange={(e) => setNewAlarm(prev => ({...prev, dosage: e.target.value}))}
                    placeholder="e.g., 1 tablet"
                  />
                </div>
              </div>

              <div>
                <Label>Reminder Times</Label>
                {newAlarm.times.map((time, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => updateTimeSlot(index, e.target.value)}
                    />
                    {newAlarm.times.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeTimeSlot(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addTimeSlot}
                  className="mt-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Time
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newAlarm.startDate}
                    onChange={(e) => setNewAlarm(prev => ({...prev, startDate: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newAlarm.endDate}
                    onChange={(e) => setNewAlarm(prev => ({...prev, endDate: e.target.value}))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="instructions">Instructions</Label>
                <Input
                  id="instructions"
                  value={newAlarm.instructions}
                  onChange={(e) => setNewAlarm(prev => ({...prev, instructions: e.target.value}))}
                  placeholder="e.g., Take with food"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={addAlarm}>
                  <Bell className="w-4 h-4 mr-2" />
                  Set Alarm
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Alarms */}
        <div className="space-y-3">
          {alarms.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No medication alarms set</p>
          ) : (
            alarms.map(alarm => (
              <Card key={alarm.id} className={`${alarm.isActive ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Pill className="w-4 h-4 text-blue-600" />
                        <h4 className="font-medium">{alarm.medicineName}</h4>
                        <Badge variant={alarm.isActive ? "default" : "secondary"}>
                          {alarm.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">Dosage: {alarm.dosage}</p>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-3 h-3" />
                        <span className="text-sm">Times: {alarm.times.join(', ')}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {alarm.startDate} to {alarm.endDate || 'Ongoing'}
                      </p>
                      {alarm.instructions && (
                        <p className="text-sm text-blue-600 mt-1">{alarm.instructions}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAlarm(alarm.id)}
                      >
                        {alarm.isActive ? 'Pause' : 'Resume'}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteAlarm(alarm.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
