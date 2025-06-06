
interface MedicineDetail {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  price: string;
  instructions: string;
  sideEffects?: string[];
  medicineType: 'antibiotic' | 'painkiller' | 'antiviral' | 'chronic_management' | 'supplement';
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
    symptoms: ['high temperature', 'fever', 'temperature', 'hot body', 'chills', 'sweating', 'body temperature'],
    severity: 'moderate',
    medicines: [
      { 
        name: 'Paracetamol (Acetaminophen) 650mg', 
        dosage: '1-2 tablets', 
        frequency: 'Every 6-8 hours', 
        duration: '3-5 days or until fever subsides', 
        price: '₹25-40',
        instructions: 'Take with water after meals. Maximum 4g per day.',
        sideEffects: ['Liver damage with overdose', 'Nausea (rare)'],
        medicineType: 'painkiller'
      },
      { 
        name: 'Ibuprofen 400mg', 
        dosage: '1 tablet', 
        frequency: 'Every 8 hours', 
        duration: '3-5 days', 
        price: '₹35-50',
        instructions: 'Take with food to prevent stomach irritation',
        sideEffects: ['Stomach upset', 'Dizziness', 'Kidney issues with prolonged use'],
        medicineType: 'painkiller'
      },
      { 
        name: 'Azithromycin 500mg (if bacterial infection)', 
        dosage: '1 tablet', 
        frequency: 'Once daily', 
        duration: '3-5 days', 
        price: '₹120-180',
        instructions: 'Take on empty stomach. Complete the full course even if feeling better.',
        sideEffects: ['Nausea', 'Diarrhea', 'Stomach pain'],
        medicineType: 'antibiotic'
      }
    ],
    homeRemedies: ['Drink plenty of fluids (3-4 liters daily)', 'Rest in cool, well-ventilated room', 'Lukewarm sponging to reduce temperature', 'Light, easily digestible food'],
    warnings: ['Do not exceed recommended paracetamol dose', 'Avoid alcohol during treatment', 'Monitor temperature every 4 hours'],
    whenToSeeDoctor: ['Fever above 103°F (39.4°C)', 'Persistent fever for more than 3 days', 'Difficulty breathing', 'Severe headache with neck stiffness', 'Confusion or altered consciousness']
  },

  headache: {
    symptoms: ['headache', 'head pain', 'migraine', 'head ache', 'tension headache', 'throbbing pain'],
    severity: 'mild',
    medicines: [
      { 
        name: 'Sumatriptan 50mg (for Migraine)', 
        dosage: '1 tablet', 
        frequency: 'At onset of migraine (max 2 tablets in 24 hours)', 
        duration: 'As needed', 
        price: '₹120-200',
        instructions: 'Take at first sign of migraine. Do not use for tension headache.',
        sideEffects: ['Drowsiness', 'Chest tightness', 'Dizziness'],
        medicineType: 'painkiller'
      },
      { 
        name: 'Diclofenac Sodium 50mg', 
        dosage: '1 tablet', 
        frequency: 'Twice daily after meals', 
        duration: '2-3 days', 
        price: '₹30-45',
        instructions: 'Take with food. Effective for tension headaches and muscle pain.',
        sideEffects: ['Stomach irritation', 'Dizziness', 'Skin rash'],
        medicineType: 'painkiller'
      },
      { 
        name: 'Propranolol 40mg (for Migraine Prevention)', 
        dosage: '1 tablet', 
        frequency: 'Twice daily', 
        duration: 'Long-term as prescribed', 
        price: '₹25-40',
        instructions: 'For migraine prevention. Take regularly as prescribed by doctor.',
        sideEffects: ['Fatigue', 'Cold hands/feet', 'Slow heart rate'],
        medicineType: 'chronic_management'
      }
    ],
    homeRemedies: ['Apply cold compress for 15-20 minutes', 'Rest in dark, quiet room', 'Gentle head and neck massage', 'Stay well hydrated'],
    warnings: ['Avoid overuse of pain medications', 'Limit screen time during headache', 'Identify and avoid triggers'],
    whenToSeeDoctor: ['Sudden severe headache unlike any before', 'Headache with fever and neck stiffness', 'Vision changes or weakness', 'Persistent headaches increasing in frequency']
  },

  cough: {
    symptoms: ['cough', 'coughing', 'throat irritation', 'dry cough', 'wet cough', 'persistent cough', 'phlegm'],
    severity: 'mild',
    medicines: [
      { 
        name: 'Amoxicillin 500mg (for bacterial infection)', 
        dosage: '1 capsule', 
        frequency: '3 times daily', 
        duration: '7-10 days', 
        price: '₹80-120',
        instructions: 'Take with or without food. Complete full course even if symptoms improve.',
        sideEffects: ['Diarrhea', 'Nausea', 'Skin rash', 'Allergic reactions'],
        medicineType: 'antibiotic'
      },
      { 
        name: 'Dextromethorphan 15mg + Chlorpheniramine 4mg', 
        dosage: '10ml syrup', 
        frequency: '3 times daily', 
        duration: '5-7 days', 
        price: '₹95-130',
        instructions: 'For dry cough. Take after meals. May cause drowsiness.',
        sideEffects: ['Drowsiness', 'Dizziness', 'Dry mouth'],
        medicineType: 'painkiller'
      },
      { 
        name: 'Ambroxol 30mg + Guaifenesin 50mg', 
        dosage: '1 tablet', 
        frequency: '3 times daily', 
        duration: '5-7 days', 
        price: '₹75-100',
        instructions: 'For productive cough. Take with plenty of water.',
        sideEffects: ['Mild stomach discomfort', 'Nausea'],
        medicineType: 'painkiller'
      }
    ],
    homeRemedies: ['Honey with warm water (1 tsp honey in warm water)', 'Steam inhalation 2-3 times daily', 'Ginger tea with honey', 'Throat lozenges for irritation'],
    warnings: ['Complete antibiotic course if prescribed', 'Stay hydrated', 'Avoid cold drinks and ice cream'],
    whenToSeeDoctor: ['Blood in cough or sputum', 'Persistent cough for more than 2 weeks', 'High fever with cough', 'Difficulty breathing or chest pain']
  },

  diabetes: {
    symptoms: ['high blood sugar', 'diabetes', 'frequent urination', 'excessive thirst', 'fatigue', 'blurred vision'],
    severity: 'severe',
    medicines: [
      { 
        name: 'Metformin 500mg', 
        dosage: '1 tablet', 
        frequency: 'Twice daily with meals', 
        duration: 'Long-term as prescribed', 
        price: '₹45-70',
        instructions: 'Take with breakfast and dinner. Monitor blood sugar regularly.',
        sideEffects: ['Nausea', 'Diarrhea', 'Metallic taste', 'Vitamin B12 deficiency'],
        medicineType: 'chronic_management'
      },
      { 
        name: 'Glimepiride 2mg', 
        dosage: '1 tablet', 
        frequency: 'Once daily before breakfast', 
        duration: 'Long-term as prescribed', 
        price: '₹60-90',
        instructions: 'Take 30 minutes before breakfast. Monitor for hypoglycemia.',
        sideEffects: ['Hypoglycemia', 'Weight gain', 'Skin reactions'],
        medicineType: 'chronic_management'
      },
      { 
        name: 'Insulin Glargine (Long-acting)', 
        dosage: 'As per prescription', 
        frequency: 'Once daily at same time', 
        duration: 'Long-term', 
        price: '₹300-500/pen',
        instructions: 'Inject subcutaneously. Rotate injection sites. Store in refrigerator.',
        sideEffects: ['Hypoglycemia', 'Injection site reactions', 'Weight gain'],
        medicineType: 'chronic_management'
      }
    ],
    homeRemedies: ['Regular physical exercise (30 min daily)', 'Balanced diet with controlled carbs', 'Monitor blood sugar levels', 'Stress management techniques'],
    warnings: ['Never skip medications', 'Regular medical monitoring required', 'Always carry glucose tablets', 'Check feet daily for injuries'],
    whenToSeeDoctor: ['Blood sugar consistently above 250 mg/dL', 'Signs of diabetic ketoacidosis', 'Frequent episodes of hypoglycemia', 'Any diabetic complications']
  },

  hypertension: {
    symptoms: ['high blood pressure', 'hypertension', 'headache', 'dizziness', 'chest pain', 'shortness of breath'],
    severity: 'severe',
    medicines: [
      { 
        name: 'Amlodipine 5mg', 
        dosage: '1 tablet', 
        frequency: 'Once daily', 
        duration: 'Long-term as prescribed', 
        price: '₹25-40',
        instructions: 'Take at the same time daily. Can be taken with or without food.',
        sideEffects: ['Ankle swelling', 'Dizziness', 'Flushing', 'Fatigue'],
        medicineType: 'chronic_management'
      },
      { 
        name: 'Telmisartan 40mg', 
        dosage: '1 tablet', 
        frequency: 'Once daily', 
        duration: 'Long-term as prescribed', 
        price: '₹40-65',
        instructions: 'Take at same time daily. Monitor blood pressure regularly.',
        sideEffects: ['Dizziness', 'Back pain', 'Sinus congestion'],
        medicineType: 'chronic_management'
      },
      { 
        name: 'Hydrochlorothiazide 25mg', 
        dosage: '1 tablet', 
        frequency: 'Once daily in morning', 
        duration: 'Long-term as prescribed', 
        price: '₹20-35',
        instructions: 'Take in morning with food. Monitor potassium levels.',
        sideEffects: ['Frequent urination', 'Dehydration', 'Low potassium', 'Dizziness'],
        medicineType: 'chronic_management'
      }
    ],
    homeRemedies: ['Low sodium diet (less than 2g daily)', 'Regular aerobic exercise', 'Weight management', 'Limit alcohol consumption', 'Stress reduction techniques'],
    warnings: ['Never stop medications abruptly', 'Regular BP monitoring required', 'Maintain medication schedule', 'Report side effects to doctor'],
    whenToSeeDoctor: ['Blood pressure above 180/120 mmHg', 'Severe chest pain', 'Severe headache with vision problems', 'Difficulty breathing']
  },

  stomachPain: {
    symptoms: ['stomach pain', 'abdominal pain', 'stomach ache', 'gastric pain', 'acidity', 'indigestion'],
    severity: 'moderate',
    medicines: [
      { 
        name: 'Omeprazole 20mg', 
        dosage: '1 capsule', 
        frequency: 'Once daily before breakfast', 
        duration: '7-14 days', 
        price: '₹35-55',
        instructions: 'Take 30-60 minutes before meals. Do not crush or chew capsule.',
        sideEffects: ['Headache', 'Nausea', 'Diarrhea', 'Vitamin B12 deficiency with long-term use'],
        medicineType: 'painkiller'
      },
      { 
        name: 'Antacid (Aluminum Hydroxide + Magnesium Hydroxide)', 
        dosage: '10ml syrup or 2 tablets', 
        frequency: '3-4 times daily after meals', 
        duration: '3-5 days', 
        price: '₹25-40',
        instructions: 'Take 1-2 hours after meals. Shake syrup well before use.',
        sideEffects: ['Constipation', 'Diarrhea', 'Chalky taste'],
        medicineType: 'painkiller'
      },
      { 
        name: 'Dicyclomine 10mg', 
        dosage: '1 tablet', 
        frequency: '3 times daily before meals', 
        duration: '3-5 days', 
        price: '₹30-50',
        instructions: 'Take 30 minutes before meals for stomach cramps.',
        sideEffects: ['Drowsiness', 'Dry mouth', 'Blurred vision'],
        medicineType: 'painkiller'
      }
    ],
    homeRemedies: ['Drink plenty of water', 'Eat light, bland foods', 'Avoid spicy and oily foods', 'Ginger tea for nausea'],
    warnings: ['Avoid NSAIDs on empty stomach', 'Do not ignore severe abdominal pain', 'Maintain regular meal times'],
    whenToSeeDoctor: ['Severe persistent pain', 'Blood in vomit or stool', 'High fever with stomach pain', 'Signs of dehydration']
  }
};

export function findEnhancedMedicalCondition(symptoms: string): MedicalCondition | null {
  const lowerSymptoms = symptoms.toLowerCase();
  console.log('Searching for symptoms:', lowerSymptoms);
  
  for (const [condition, data] of Object.entries(enhancedMedicalDatabase)) {
    for (const symptom of data.symptoms) {
      if (lowerSymptoms.includes(symptom)) {
        console.log('Found matching condition:', condition);
        return data;
      }
    }
  }
  
  console.log('No specific condition found, returning general advice');
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
