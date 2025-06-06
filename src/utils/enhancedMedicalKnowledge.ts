
interface MedicineDetail {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  price: string;
  instructions: string;
  sideEffects?: string[];
}

interface MedicalCondition {
  symptoms: string[];
  medicines: MedicineDetail[];
  homeRemedies: string[];
  warnings: string[];
  whenToSeeDoctor: string[];
  severity: 'mild' | 'moderate' | 'severe';
}

export const enhancedMedicalDatabase: Record<string, MedicalCondition> = {
  fever: {
    symptoms: ['high temperature', 'fever', 'temperature', 'hot body', 'chills', 'sweating'],
    severity: 'moderate',
    medicines: [
      { 
        name: 'Paracetamol 500mg', 
        dosage: '1 tablet', 
        frequency: 'Every 6 hours', 
        duration: '3-5 days', 
        price: '₹25',
        instructions: 'Take with water after meals',
        sideEffects: ['Nausea', 'Skin rash (rare)']
      },
      { 
        name: 'Ibuprofen 400mg', 
        dosage: '1 tablet', 
        frequency: 'Every 8 hours', 
        duration: '3-5 days', 
        price: '₹35',
        instructions: 'Take with food to avoid stomach upset',
        sideEffects: ['Stomach pain', 'Dizziness']
      },
      { 
        name: 'Aspirin 325mg', 
        dosage: '1 tablet', 
        frequency: 'Every 6 hours', 
        duration: '3-5 days', 
        price: '₹20',
        instructions: 'Not for children under 16. Take with food',
        sideEffects: ['Stomach irritation', 'Bleeding (rare)']
      }
    ],
    homeRemedies: ['Drink plenty of fluids', 'Rest in cool environment', 'Lukewarm sponging', 'Light clothing'],
    warnings: ['Do not exceed 4g paracetamol per day', 'Avoid alcohol', 'Monitor temperature regularly'],
    whenToSeeDoctor: ['Fever above 103°F (39.4°C)', 'Persistent for more than 3 days', 'Difficulty breathing', 'Severe headache', 'Confusion']
  },

  headache: {
    symptoms: ['headache', 'head pain', 'migraine', 'head ache', 'tension headache'],
    severity: 'mild',
    medicines: [
      { 
        name: 'Sumatriptan 50mg', 
        dosage: '1 tablet', 
        frequency: 'As needed (max 2/day)', 
        duration: 'Single dose', 
        price: '₹120',
        instructions: 'For migraine only. Take at onset',
        sideEffects: ['Drowsiness', 'Chest tightness']
      },
      { 
        name: 'Rizatriptan 10mg', 
        dosage: '1 tablet', 
        frequency: 'As needed', 
        duration: 'Single dose', 
        price: '₹150',
        instructions: 'For severe migraine',
        sideEffects: ['Dizziness', 'Fatigue']
      },
      { 
        name: 'Acetaminophen 650mg', 
        dosage: '1-2 tablets', 
        frequency: 'Every 6 hours', 
        duration: '2-3 days', 
        price: '₹30',
        instructions: 'For tension headache',
        sideEffects: ['Liver damage with overdose']
      }
    ],
    homeRemedies: ['Apply cold/warm compress', 'Rest in dark room', 'Gentle head massage', 'Stay hydrated'],
    warnings: ['Avoid overuse of pain medication', 'Limit screen time'],
    whenToSeeDoctor: ['Sudden severe headache', 'Headache with fever and stiff neck', 'Vision changes', 'Weakness']
  },

  cough: {
    symptoms: ['cough', 'coughing', 'throat irritation', 'dry cough', 'wet cough', 'persistent cough'],
    severity: 'mild',
    medicines: [
      { 
        name: 'Dextromethorphan 15mg', 
        dosage: '15ml syrup', 
        frequency: '3 times daily', 
        duration: '5-7 days', 
        price: '₹95',
        instructions: 'For dry cough. Take with water',
        sideEffects: ['Drowsiness', 'Dizziness']
      },
      { 
        name: 'Guaifenesin 100mg', 
        dosage: '10ml syrup', 
        frequency: '4 times daily', 
        duration: '5-7 days', 
        price: '₹85',
        instructions: 'For productive cough. Drink plenty of water',
        sideEffects: ['Nausea', 'Stomach upset']
      },
      { 
        name: 'Ambroxol 30mg', 
        dosage: '1 tablet', 
        frequency: '3 times daily', 
        duration: '5-7 days', 
        price: '₹75',
        instructions: 'Take after meals',
        sideEffects: ['Mild stomach discomfort']
      }
    ],
    homeRemedies: ['Honey with warm water', 'Steam inhalation', 'Ginger tea', 'Throat lozenges'],
    warnings: ['Avoid suppressants for productive cough', 'Stay hydrated'],
    whenToSeeDoctor: ['Blood in cough', 'Persistent for more than 2 weeks', 'High fever', 'Difficulty breathing']
  },

  diabetes: {
    symptoms: ['high blood sugar', 'diabetes', 'frequent urination', 'excessive thirst', 'fatigue'],
    severity: 'severe',
    medicines: [
      { 
        name: 'Metformin 500mg', 
        dosage: '1 tablet', 
        frequency: 'Twice daily', 
        duration: 'Long-term', 
        price: '₹45',
        instructions: 'Take with meals to reduce stomach upset',
        sideEffects: ['Nausea', 'Diarrhea', 'Metallic taste']
      },
      { 
        name: 'Glipizide 5mg', 
        dosage: '1 tablet', 
        frequency: 'Once daily before breakfast', 
        duration: 'Long-term', 
        price: '₹60',
        instructions: 'Monitor blood sugar regularly',
        sideEffects: ['Hypoglycemia', 'Weight gain']
      },
      { 
        name: 'Insulin (if prescribed)', 
        dosage: 'As per doctor', 
        frequency: 'As prescribed', 
        duration: 'Long-term', 
        price: '₹300-500/vial',
        instructions: 'Proper injection technique required',
        sideEffects: ['Hypoglycemia', 'Injection site reactions']
      }
    ],
    homeRemedies: ['Regular exercise', 'Balanced diet', 'Monitor blood sugar', 'Stress management'],
    warnings: ['Never stop medication abruptly', 'Regular medical monitoring required'],
    whenToSeeDoctor: ['Blood sugar above 250 mg/dL', 'Symptoms of ketoacidosis', 'Frequent hypoglycemia']
  },

  hypertension: {
    symptoms: ['high blood pressure', 'hypertension', 'headache', 'dizziness', 'chest pain'],
    severity: 'severe',
    medicines: [
      { 
        name: 'Amlodipine 5mg', 
        dosage: '1 tablet', 
        frequency: 'Once daily', 
        duration: 'Long-term', 
        price: '₹25',
        instructions: 'Take at same time daily',
        sideEffects: ['Ankle swelling', 'Dizziness', 'Flushing']
      },
      { 
        name: 'Lisinopril 10mg', 
        dosage: '1 tablet', 
        frequency: 'Once daily', 
        duration: 'Long-term', 
        price: '₹40',
        instructions: 'Monitor blood pressure regularly',
        sideEffects: ['Dry cough', 'Dizziness', 'Fatigue']
      },
      { 
        name: 'Hydrochlorothiazide 25mg', 
        dosage: '1 tablet', 
        frequency: 'Once daily in morning', 
        duration: 'Long-term', 
        price: '₹20',
        instructions: 'Take with food, monitor potassium levels',
        sideEffects: ['Frequent urination', 'Dehydration', 'Low potassium']
      }
    ],
    homeRemedies: ['Low sodium diet', 'Regular exercise', 'Weight management', 'Stress reduction'],
    warnings: ['Never stop medication without consulting doctor', 'Regular BP monitoring required'],
    whenToSeeDoctor: ['BP above 180/120', 'Chest pain', 'Severe headache', 'Vision problems']
  }
};

export function findEnhancedMedicalCondition(symptoms: string): MedicalCondition | null {
  const lowerSymptoms = symptoms.toLowerCase();
  
  for (const [condition, data] of Object.entries(enhancedMedicalDatabase)) {
    for (const symptom of data.symptoms) {
      if (lowerSymptoms.includes(symptom)) {
        return data;
      }
    }
  }
  return null;
}

export function generateEnhancedMedicalResponse(userMessage: string): string {
  const condition = findEnhancedMedicalCondition(userMessage);
  
  if (!condition) {
    return `I understand your concern. For an accurate diagnosis and treatment, I recommend consulting with our doctors.

🩺 **Available Services:**
- Online doctor consultation
- Medicine delivery
- Health monitoring
- Emergency assistance

📞 **Emergency:** Call 108
💊 **Medicine Order:** +91 98765-43210

Would you like to schedule a consultation or order general medicines?`;
  }

  const medicines = condition.medicines.map(med => 
    `• **${med.name}**
   - Dosage: ${med.dosage} ${med.frequency} (${med.duration})
   - Price: ${med.price}
   - Instructions: ${med.instructions}
   - Side Effects: ${med.sideEffects?.join(', ') || 'Generally well tolerated'}`
  ).join('\n\n');

  const homeRemedies = condition.homeRemedies.map(remedy => `• ${remedy}`).join('\n');
  const warnings = condition.warnings.map(warning => `• ${warning}`).join('\n');
  const doctorWhen = condition.whenToSeeDoctor.map(when => `• ${when}`).join('\n');

  return `**Recommended Treatment Plan:**

💊 **Prescribed Medicines:**
${medicines}

🏠 **Home Remedies:**
${homeRemedies}

⚠️ **Important Warnings:**
${warnings}

🚨 **Consult Doctor Immediately If:**
${doctorWhen}

📊 **Condition Severity:** ${condition.severity.toUpperCase()}

💡 **Note:** This is general guidance based on symptoms. For personalized treatment and proper diagnosis, consult our qualified doctors.

Would you like me to:
1. Set medication reminders for these medicines?
2. Schedule a doctor consultation?
3. Arrange medicine delivery?`;
}
