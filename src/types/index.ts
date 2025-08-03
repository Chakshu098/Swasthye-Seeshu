export interface User {
  id: string;
  name: string;
  email: string;
  role: 'asha' | 'doctor' | 'guardian' | 'admin';
  phone?: string;
}

export interface Assessment {
  id: string;
  patientName: string;
  symptoms: {
    fever: boolean;
    fastBreathing: boolean;
    chestIndrawing: boolean;
    feedingDifficulty: boolean;
    lethargy: boolean;
    cough: boolean;
    unusualCrying: boolean;
  };
  breathingRate: number;
  temperature: number;
  riskLevel: 'low' | 'moderate' | 'high';
  recommendations: string[];
  createdAt: Date;
}

export interface AssessmentData {
  patientName: string;
  babyId?: string;
  symptoms: {
    fever: boolean;
    fastBreathing: boolean;
    chestIndrawing: boolean;
    feedingDifficulty: boolean;
    lethargy: boolean;
    cough: boolean;
    unusualCrying: boolean;
  };
  breathingRate: number;
  temperature: number;
  timestamp?: string;
}

export interface AIAssessmentResult {
  riskLevel: 'low' | 'moderate' | 'high';
  confidence: number;
  riskScore: number;
  keyFindings: string[];
  recommendations: string[];
  urgency: 'immediate' | 'within24hours' | 'monitor';
  explanation: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
  photo: string;
  status: 'available' | 'busy' | 'offline';
  rating: number;
}

export interface ChatMessage {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: Date;
}