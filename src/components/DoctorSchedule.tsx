import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, MapPin, Video, Phone, CheckCircle } from 'lucide-react';

interface DoctorScheduleProps {
  language: string;
}

const DoctorSchedule: React.FC<DoctorScheduleProps> = ({ language }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [consultationType, setConsultationType] = useState('clinic');
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  const doctors = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      specialty: 'General Medicine',
      experience: '12 years',
      rating: '4.8',
      languages: ['Hindi', 'English', 'Punjabi'],
      fee: '₹500',
      available: true,
      nextSlot: '2:30 PM Today'
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      specialty: 'Internal Medicine',
      experience: '15 years',
      rating: '4.9',
      languages: ['Hindi', 'English', 'Bhojpuri'],
      fee: '₹600',
      available: true,
      nextSlot: '4:00 PM Today'
    },
    {
      id: '3',
      name: 'Dr. Meera Patel',
      specialty: 'Pediatrics',
      experience: '10 years',
      rating: '4.7',
      languages: ['Gujarati', 'Hindi', 'English'],
      fee: '₹450',
      available: false,
      nextSlot: 'Tomorrow 10:00 AM'
    }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
  ];

  const consultationTypes = [
    { id: 'clinic', label: 'Clinic Visit', icon: <MapPin className="w-4 h-4" />, price: '₹0' },
    { id: 'video', label: 'Video Call', icon: <Video className="w-4 h-4" />, price: '₹50' },
    { id: 'home', label: 'Home Visit', icon: <User className="w-4 h-4" />, price: '₹200' }
  ];

  const bookAppointment = () => {
    setAppointmentBooked(true);
  };

  if (appointmentBooked) {
    return (
      <Card className="bg-green-50 border-green-200 dark:bg-green-900 dark:border-green-700">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-300 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Appointment Confirmed!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white dark:bg-green-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Appointment Details</h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-100">
              <div><strong>Appointment ID:</strong> APT-{Math.random().toString(36).substr(2, 8).toUpperCase()}</div>
              <div><strong>Doctor:</strong> {doctors.find(d => d.id === selectedDoctor)?.name}</div>
              <div><strong>Date & Time:</strong> {selectedDate} at {selectedTime}</div>
              <div><strong>Type:</strong> {consultationTypes.find(t => t.id === consultationType)?.label}</div>
              <div><strong>Fee:</strong> ₹100</div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Before Your Appointment</h4>
            <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-200">
              <li>• Prepare a list of your symptoms and questions</li>
              <li>• Bring any previous medical reports or prescriptions</li>
              <li>• Arrive 15 minutes early for clinic visits</li>
              <li>• Keep your phone charged for video consultations</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1">
              <Calendar className="w-4 h-4 mr-2" />
              Add to Calendar
            </Button>
            <Button variant="outline" className="flex-1">
              <Phone className="w-4 h-4 mr-2" />
              Call Doctor's Clinic
            </Button>
          </div>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setAppointmentBooked(false)}
          >
            Book Another Appointment
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto px-2 sm:px-0">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Calendar className="w-5 h-5 text-orange-600" />
            Schedule Doctor Appointment
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300">
            Book same-day or scheduled consultations with qualified doctors in your area
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Patient Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patientName" className="dark:text-gray-200">Patient Name</Label>
              <Input
                id="patientName"
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber" className="dark:text-gray-200">Phone Number</Label>
              <Input
                id="phoneNumber"
                placeholder="+91 XXXXX XXXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
              />
            </div>
          </div>

          {/* Consultation Type */}
          <div>
            <Label className="text-base font-medium dark:text-gray-200">Consultation Type</Label>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
              {consultationTypes.map((type) => (
                <Card 
                  key={type.id}
                  className={`cursor-pointer border-2 transition-all ${
                    consultationType === type.id ? 'border-orange-500 bg-orange-50 dark:bg-orange-900' : 'border-gray-200 dark:border-gray-700 dark:bg-gray-900'
                  }`}
                  onClick={() => setConsultationType(type.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex justify-center mb-2">{type.icon}</div>
                    <h4 className="font-medium text-sm dark:text-gray-100">{type.label}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{type.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Doctor Selection - Revamped UI */}
          <div>
            <Label className="text-base font-medium dark:text-gray-200">Select Doctor</Label>
            <div className="relative">
              <div className="space-y-3 mt-2">
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="flex items-stretch gap-3">
                    {/* Doctor Card */}
                    <div
                      className={`flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-md border transition
                        ${selectedDoctor === doctor.id ? 'border-orange-500 ring-2 ring-orange-400 dark:ring-orange-500' : 'border-gray-200 dark:border-gray-700'} 
                        ${!doctor.available ? 'opacity-70' : ''}
                        p-4 flex gap-3 items-center`}
                      style={{ minWidth: 0 }}
                      onClick={() => doctor.available && setSelectedDoctor(doctor.id)}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                        <User className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-gray-900 dark:text-gray-100 text-base">{doctor.name}</div>
                        <div className="text-xs text-gray-700 dark:text-gray-300">{doctor.specialty}</div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs flex items-center gap-1"><span role="img" aria-label="star">⭐</span> {doctor.rating}</span>
                          <span className="text-xs text-gray-500">{doctor.experience}</span>
                          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{doctor.fee}</span>
                        </div>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {doctor.languages.map((lang, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
                            >
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Status Tag (vertical alignment) */}
                    <div className="flex flex-col items-center min-w-[66px] justify-center">
                      <span
                        className={`
                          px-2 py-0.5 rounded-full text-xs font-semibold
                          ${doctor.available ?
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border border-green-300 dark:border-green-700'
                          :
                            'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                          }
                        `}
                      >
                        {doctor.available ? 'Available' : 'Busy'}
                      </span>
                      <span className="text-[10px] text-gray-400 mt-1 text-center whitespace-nowrap">
                        Next: <br />{doctor.nextSlot}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="dark:text-gray-200">Preferred Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
              />
            </div>
            <div>
              <Label className="dark:text-gray-200">Available Time Slots</Label>
              <div className="grid grid-cols-2 xs:grid-cols-3 gap-2 mt-2 max-h-32 overflow-y-auto">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    className="text-xs"
                    onClick={() => setSelectedTime(time)}
                    disabled={!selectedDate}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Book Appointment Button */}
          <Button 
            onClick={bookAppointment}
            disabled={!selectedDate || !selectedTime || !selectedDoctor || !patientName || !phoneNumber}
            className="w-full"
            size="lg"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Appointment - ₹100
          </Button>
        </CardContent>
      </Card>

      {/* Same Day Availability */}
      <Card className="bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-800 dark:text-blue-300 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Same Day Appointments Available
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700 dark:text-blue-200 mb-4">
            Emergency consultations and same-day checkups available. Our doctors can see you within 2-4 hours.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-200">2-4 Hours</div>
              <div className="text-sm text-blue-800 dark:text-blue-100">Same Day Appointment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-200">15+ Mins</div>
              <div className="text-sm text-blue-800 dark:text-blue-100">Video Consultation</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorSchedule;
