
interface MedicalCondition {
  symptoms: string[];
  medicines: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    price: string;
  }[];
  homeRemedies: string[];
  warnings: string[];
  whenToSeeDoctor: string[];
}

export const medicalDatabase: Record<string, MedicalCondition> = {
  fever: {
    symptoms: ['high temperature', 'fever', 'temperature', 'hot body', 'chills'],
    medicines: [
      { name: 'Paracetamol 500mg', dosage: '1 tablet', frequency: 'Every 6 hours', duration: '3 days', price: '₹25' },
      { name: 'Crocin 650mg', dosage: '1 tablet', frequency: 'Every 8 hours', duration: '3 days', price: '₹30' },
      { name: 'Dolo 650mg', dosage: '1 tablet', frequency: 'Every 6-8 hours', duration: '3 days', price: '₹28' }
    ],
    homeRemedies: ['Drink plenty of water', 'Take rest', 'Use cold compress', 'Lukewarm sponging'],
    warnings: ['Do not exceed 4 tablets per day', 'Avoid alcohol'],
    whenToSeeDoctor: ['Fever above 103°F', 'Persistent for more than 3 days', 'Difficulty breathing', 'Severe headache']
  },
  
  headache: {
    symptoms: ['headache', 'head pain', 'migraine', 'head ache'],
    medicines: [
      { name: 'Aspirin 325mg', dosage: '1-2 tablets', frequency: 'Every 4-6 hours', duration: '2-3 days', price: '₹15' },
      { name: 'Ibuprofen 400mg', dosage: '1 tablet', frequency: 'Every 6-8 hours', duration: '2-3 days', price: '₹35' },
      { name: 'Sumo 325mg', dosage: '1 tablet', frequency: 'Every 6 hours', duration: '2-3 days', price: '₹20' }
    ],
    homeRemedies: ['Apply cold/hot compress', 'Rest in dark room', 'Stay hydrated', 'Gentle head massage'],
    warnings: ['Avoid empty stomach for aspirin', 'Do not exceed recommended dose'],
    whenToSeeDoctor: ['Sudden severe headache', 'Headache with fever and stiff neck', 'Vision changes', 'Weakness or numbness']
  },

  cough: {
    symptoms: ['cough', 'coughing', 'throat irritation', 'dry cough', 'wet cough'],
    medicines: [
      { name: 'Benadryl Cough Syrup', dosage: '10ml', frequency: '3 times daily', duration: '5-7 days', price: '₹85' },
      { name: 'Ascoril Syrup', dosage: '10ml', frequency: '3 times daily', duration: '5-7 days', price: '₹90' },
      { name: 'Honitus Syrup', dosage: '10ml', frequency: '3 times daily', duration: '5-7 days', price: '₹75' }
    ],
    homeRemedies: ['Honey with warm water', 'Steam inhalation', 'Ginger tea', 'Turmeric milk'],
    warnings: ['Avoid cold drinks', 'Do not suppress productive cough'],
    whenToSeeDoctor: ['Blood in cough', 'Persistent for more than 2 weeks', 'High fever with cough', 'Difficulty breathing']
  },

  cold: {
    symptoms: ['cold', 'runny nose', 'nasal congestion', 'sneezing', 'blocked nose'],
    medicines: [
      { name: 'Cetrizine 10mg', dosage: '1 tablet', frequency: 'Once daily', duration: '5-7 days', price: '₹40' },
      { name: 'Sinarest Tablet', dosage: '1 tablet', frequency: 'Twice daily', duration: '5 days', price: '₹55' },
      { name: 'D-Cold Total', dosage: '1 tablet', frequency: 'Twice daily', duration: '5 days', price: '₹50' }
    ],
    homeRemedies: ['Steam inhalation', 'Warm salt water gargling', 'Drink warm fluids', 'Rest'],
    warnings: ['Avoid driving if drowsy', 'Do not exceed dose'],
    whenToSeeDoctor: ['Symptoms persist beyond 10 days', 'High fever', 'Severe throat pain', 'Ear pain']
  },

  acidity: {
    symptoms: ['acidity', 'heartburn', 'acid reflux', 'stomach burn', 'chest burn'],
    medicines: [
      { name: 'Omeprazole 20mg', dosage: '1 capsule', frequency: 'Before breakfast', duration: '7-14 days', price: '₹65' },
      { name: 'Pantoprazole 40mg', dosage: '1 tablet', frequency: 'Before breakfast', duration: '7-14 days', price: '₹70' },
      { name: 'ENO Powder', dosage: '1 sachet', frequency: 'When needed', duration: 'As required', price: '₹25' }
    ],
    homeRemedies: ['Drink buttermilk', 'Eat banana', 'Avoid spicy food', 'Small frequent meals'],
    warnings: ['Take on empty stomach', 'Avoid citrus fruits'],
    whenToSeeDoctor: ['Severe chest pain', 'Difficulty swallowing', 'Blood in vomit', 'Weight loss']
  },

  diarrhea: {
    symptoms: ['diarrhea', 'loose motions', 'stomach upset', 'loose stools', 'frequent stools'],
    medicines: [
      { name: 'ORS Powder', dosage: '1 sachet in 200ml water', frequency: 'After each loose stool', duration: 'Till recovery', price: '₹15' },
      { name: 'Loperamide 2mg', dosage: '1 tablet', frequency: 'After loose stool', duration: '2-3 days', price: '₹45' },
      { name: 'Econorm Sachet', dosage: '1 sachet', frequency: 'Twice daily', duration: '5 days', price: '₹120' }
    ],
    homeRemedies: ['Drink plenty of fluids', 'BRAT diet (Banana, Rice, Apple, Toast)', 'Coconut water', 'Avoid dairy'],
    warnings: ['Do not stop abruptly', 'Maintain hydration'],
    whenToSeeDoctor: ['Blood in stool', 'High fever', 'Severe dehydration', 'Persistent for more than 3 days']
  }
};

export function findMedicalCondition(symptoms: string): MedicalCondition | null {
  const lowerSymptoms = symptoms.toLowerCase();
  
  for (const [condition, data] of Object.entries(medicalDatabase)) {
    for (const symptom of data.symptoms) {
      if (lowerSymptoms.includes(symptom)) {
        return data;
      }
    }
  }
  return null;
}

export function generateMedicalResponse(userMessage: string): string {
  const condition = findMedicalCondition(userMessage);
  
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
    `• ${med.name} - ${med.dosage} ${med.frequency} (${med.duration}) - ${med.price}`
  ).join('\n');

  const homeRemedies = condition.homeRemedies.map(remedy => `• ${remedy}`).join('\n');
  const warnings = condition.warnings.map(warning => `• ${warning}`).join('\n');
  const doctorWhen = condition.whenToSeeDoctor.map(when => `• ${when}`).join('\n');

  return `**Recommended Treatment:**

💊 **Medicines:**
${medicines}

🏠 **Home Remedies:**
${homeRemedies}

⚠️ **Important Warnings:**
${warnings}

🚨 **See a doctor immediately if:**
${doctorWhen}

💡 **Note:** This is general guidance. For personalized treatment, consult our doctors.

Would you like me to arrange delivery for these medicines?`;
}
