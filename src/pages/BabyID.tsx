import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Wifi, Baby, Weight, Phone, FileText, Syringe, Heart, TrendingUp, Clock } from 'lucide-react';

interface BabyProfile {
  id: string;
  name: string;
  age: number; // in days
  weight: number;
  height: number;
  photo?: string;
  parentName: string;
  parentContact: string;
  address: string;
  bloodGroup: string;
  birthDate: string;
  assessments: AssessmentRecord[];
  vaccinations: VaccinationRecord[];
  consultations: ConsultationRecord[];
  followUps: FollowUpRecord[];
  vitals: VitalSigns[];
  growthData: GrowthRecord[];
  emergencyContacts: EmergencyContact[];
}

interface AssessmentRecord {
  id: string;
  date: string;
  symptoms: string[];
  aiRiskLevel: 'low' | 'medium' | 'high';
  notes: string;
  doctorName?: string;
  hospital?: string;
  treatment?: string;
  followUpDate?: string;
}

interface VaccinationRecord {
  id: string;
  name: string;
  date: string;
  status: 'completed' | 'upcoming' | 'overdue';
  dueDate?: string;
  batchNumber?: string;
  administeredBy?: string;
  nextDueDate?: string;
}

interface ConsultationRecord {
  id: string;
  date: string;
  doctorName: string;
  specialization: string;
  hospital: string;
  prescription: string;
  diagnosis: string;
  notes: string;
  followUpDate?: string;
  medications: Medication[];
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface FollowUpRecord {
  id: string;
  type: 'asha_visit' | 'doctor_followup' | 'emergency' | 'vaccination' | 'growth_monitoring';
  date: string;
  description: string;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
}

interface VitalSigns {
  date: string;
  temperature: number;
  heartRate: number;
  breathingRate: number;
  weight: number;
  height: number;
  oxygenSaturation?: number;
  bloodPressure?: string;
}

interface GrowthRecord {
  date: string;
  weight: number;
  height: number;
  headCircumference: number;
  percentile: {
    weight: number;
    height: number;
    headCircumference: number;
  };
}

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

const BabyID: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedBaby, setScannedBaby] = useState<BabyProfile | null>(null);
  const [reportView, setReportView] = useState<'summary' | 'detailed' | 'print'>('summary');

  // Mock comprehensive baby data
  const mockBabyData: BabyProfile = {
    id: 'BABY001',
    name: 'Aarav Kumar',
    age: 45,
    weight: 3.2,
    height: 52,
    photo: '/api/placeholder/150/150',
    parentName: 'Priya Kumar',
    parentContact: '+91 9876543210',
    address: 'Village: Ramgarh, Block: Alwar, District: Alwar, Rajasthan',
    bloodGroup: 'O+',
    birthDate: '2024-01-01',
    assessments: [
      {
        id: 'ASS001',
        date: '2024-01-15',
        symptoms: ['Cough', 'Fever', 'Difficulty breathing', 'Chest indrawing'],
        aiRiskLevel: 'high',
        notes: 'Severe pneumonia symptoms detected. Immediate hospitalization required.',
        doctorName: 'Dr. Rajesh Kumar',
        hospital: 'District Hospital, Alwar',
        treatment: 'IV antibiotics, oxygen therapy',
        followUpDate: '2024-01-18'
      },
      {
        id: 'ASS002',
        date: '2024-01-10',
        symptoms: ['Mild cough', 'Slight fever'],
        aiRiskLevel: 'low',
        notes: 'Mild respiratory symptoms. Monitor for worsening.',
        doctorName: 'ASHA Worker - Sunita Devi',
        hospital: 'Primary Health Centre, Ramgarh'
      },
      {
        id: 'ASS003',
        date: '2024-01-05',
        symptoms: ['Normal breathing', 'Good feeding'],
        aiRiskLevel: 'low',
        notes: 'Healthy newborn assessment. All parameters normal.',
        doctorName: 'Dr. Meena Sharma',
        hospital: 'Community Health Centre, Alwar'
      }
    ],
    vaccinations: [
      {
        id: 'VAC001',
        name: 'BCG',
        date: '2024-01-05',
        status: 'completed',
        batchNumber: 'BCG-2024-001',
        administeredBy: 'Dr. Meena Sharma'
      },
      {
        id: 'VAC002',
        name: 'OPV-0',
        date: '2024-01-05',
        status: 'completed',
        batchNumber: 'OPV-2024-001',
        administeredBy: 'Dr. Meena Sharma'
      },
      {
        id: 'VAC003',
        name: 'Hepatitis B',
        date: '2024-01-05',
        status: 'completed',
        batchNumber: 'HepB-2024-001',
        administeredBy: 'Dr. Meena Sharma'
      },
      {
        id: 'VAC004',
        name: 'DPT-1',
        date: '2024-02-15',
        status: 'upcoming',
        dueDate: '2024-02-15',
        nextDueDate: '2024-02-15'
      },
      {
        id: 'VAC005',
        name: 'OPV-1',
        date: '2024-02-15',
        status: 'upcoming',
        dueDate: '2024-02-15',
        nextDueDate: '2024-02-15'
      }
    ],
    consultations: [
      {
        id: 'CON001',
        date: '2024-01-15',
        doctorName: 'Dr. Rajesh Kumar',
        specialization: 'Pediatrician',
        hospital: 'District Hospital, Alwar',
        prescription: 'Amoxicillin 125mg twice daily for 5 days, Paracetamol 60mg as needed',
        diagnosis: 'Severe Pneumonia',
        notes: 'Patient admitted with severe respiratory distress. Chest X-ray shows bilateral infiltrates. Started on IV antibiotics and oxygen therapy. Monitor oxygen saturation closely.',
        followUpDate: '2024-01-18',
        medications: [
          {
            name: 'Amoxicillin',
            dosage: '125mg',
            frequency: 'Twice daily',
            duration: '5 days',
            instructions: 'Take with food'
          },
          {
            name: 'Paracetamol',
            dosage: '60mg',
            frequency: 'As needed for fever',
            duration: 'Until fever subsides',
            instructions: 'Take when temperature > 38°C'
          }
        ]
      },
      {
        id: 'CON002',
        date: '2024-01-10',
        doctorName: 'Dr. Meena Sharma',
        specialization: 'General Physician',
        hospital: 'Community Health Centre, Alwar',
        prescription: 'Saline nasal drops, Steam inhalation',
        diagnosis: 'Mild Upper Respiratory Tract Infection',
        notes: 'Mild symptoms. Conservative treatment advised. Monitor for worsening.',
        medications: [
          {
            name: 'Saline Nasal Drops',
            dosage: '2 drops',
            frequency: '3 times daily',
            duration: '3 days',
            instructions: 'Apply in each nostril'
          }
        ]
      }
    ],
    followUps: [
      {
        id: 'FU001',
        type: 'doctor_followup',
        date: '2024-01-18',
        description: 'Follow-up for pneumonia treatment',
        status: 'pending',
        priority: 'high',
        assignedTo: 'Dr. Rajesh Kumar'
      },
      {
        id: 'FU002',
        type: 'asha_visit',
        date: '2024-01-20',
        description: 'ASHA follow-up visit for pneumonia recovery',
        status: 'pending',
        priority: 'medium',
        assignedTo: 'ASHA Worker - Sunita Devi'
      },
      {
        id: 'FU003',
        type: 'vaccination',
        date: '2024-02-15',
        description: 'DPT-1 and OPV-1 vaccination due',
        status: 'pending',
        priority: 'medium',
        assignedTo: 'Dr. Meena Sharma'
      },
      {
        id: 'FU004',
        type: 'growth_monitoring',
        date: '2024-02-01',
        description: 'Monthly growth monitoring',
        status: 'pending',
        priority: 'low',
        assignedTo: 'ASHA Worker - Sunita Devi'
      }
    ],
    vitals: [
      {
        date: '2024-01-15',
        temperature: 39.2,
        heartRate: 140,
        breathingRate: 65,
        weight: 3.2,
        height: 52,
        oxygenSaturation: 88,
        bloodPressure: '80/50'
      },
      {
        date: '2024-01-10',
        temperature: 37.8,
        heartRate: 120,
        breathingRate: 45,
        weight: 3.1,
        height: 51.5,
        oxygenSaturation: 95
      },
      {
        date: '2024-01-05',
        temperature: 36.8,
        heartRate: 110,
        breathingRate: 40,
        weight: 3.0,
        height: 51,
        oxygenSaturation: 98
      }
    ],
    growthData: [
      {
        date: '2024-01-01',
        weight: 2.8,
        height: 50,
        headCircumference: 34,
        percentile: { weight: 25, height: 30, headCircumference: 35 }
      },
      {
        date: '2024-01-15',
        weight: 3.2,
        height: 52,
        headCircumference: 35,
        percentile: { weight: 30, height: 35, headCircumference: 40 }
      }
    ],
    emergencyContacts: [
      {
        name: 'Priya Kumar',
        relationship: 'Mother',
        phone: '+91 9876543210',
        isPrimary: true
      },
      {
        name: 'Rajesh Kumar',
        relationship: 'Father',
        phone: '+91 9876543211',
        isPrimary: false
      },
      {
        name: 'ASHA Worker - Sunita Devi',
        relationship: 'ASHA Worker',
        phone: '+91 9876543212',
        isPrimary: false
      }
    ]
  };

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setScannedBaby(mockBabyData);
      setIsScanning(false);
    }, 2000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - birth.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Baby ID Medical Report System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Scan QR code or tap NFC to access comprehensive baby health records
          </p>
        </div>

        {!scannedBaby ? (
          /* Scanning Interface */
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <div className="text-center">
                <div className="mb-6">
                  <Baby className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Scan Baby ID
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Use QR code or NFC to access comprehensive medical records
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={handleScan}
                    disabled={isScanning}
                    className="flex flex-col items-center p-4 rounded-xl border-2 border-pink-200 hover:border-pink-300 transition-colors duration-200"
                  >
                    <QrCode className="w-8 h-8 text-pink-500 mb-2" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">QR Code</span>
                  </button>
                  <button
                    onClick={handleScan}
                    disabled={isScanning}
                    className="flex flex-col items-center p-4 rounded-xl border-2 border-pink-200 hover:border-pink-300 transition-colors duration-200"
                  >
                    <Wifi className="w-8 h-8 text-pink-500 mb-2" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">NFC</span>
                  </button>
                </div>

                {isScanning && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="mb-4"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full mx-auto flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-pink-600 font-medium mt-2">Scanning...</p>
                  </motion.div>
                )}

                <button
                  onClick={handleScan}
                  disabled={isScanning}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-105 ${
                    isScanning
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700'
                  }`}
                >
                  {isScanning ? 'Scanning...' : 'Start Scan'}
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Medical Report Interface */
          <div className="space-y-6">
            {/* Report Header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                    <Baby className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {scannedBaby.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Baby ID: {scannedBaby.id} | Age: {calculateAge(scannedBaby.birthDate)} days
                    </p>
                    <p className="text-sm text-gray-500">
                      Last Updated: {formatDate(new Date().toISOString())}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setReportView('summary')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      reportView === 'summary'
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Summary
                  </button>
                  <button
                    onClick={() => setReportView('detailed')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      reportView === 'detailed'
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Detailed
                  </button>
                  <button
                    onClick={() => setReportView('print')}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    Print Report
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Weight className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Weight</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{scannedBaby.weight} kg</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Height</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{scannedBaby.height} cm</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Blood Group</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{scannedBaby.bloodGroup}</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-orange-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Assessments</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{scannedBaby.assessments.length}</p>
                </div>
              </div>
            </div>

            {reportView === 'summary' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Assessments */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Recent Assessments
                  </h3>
                  <div className="space-y-4">
                    {scannedBaby.assessments.slice(0, 3).map((assessment) => (
                      <div key={assessment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {formatDate(assessment.date)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(assessment.aiRiskLevel)}`}>
                            {assessment.aiRiskLevel.toUpperCase()} RISK
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          Symptoms: {assessment.symptoms.join(', ')}
                        </p>
                        {assessment.doctorName && (
                          <p className="text-xs text-gray-500">
                            By: {assessment.doctorName} - {assessment.hospital}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Follow-ups */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Upcoming Follow-ups
                  </h3>
                  <div className="space-y-4">
                    {scannedBaby.followUps.filter(f => f.status === 'pending').slice(0, 3).map((followUp) => (
                      <div key={followUp.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {formatDate(followUp.date)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(followUp.priority)}`}>
                            {followUp.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {followUp.description}
                        </p>
                        {followUp.assignedTo && (
                          <p className="text-xs text-gray-500">
                            Assigned to: {followUp.assignedTo}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vaccination Status */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Syringe className="w-5 h-5 mr-2" />
                    Vaccination Status
                  </h3>
                  <div className="space-y-4">
                    {scannedBaby.vaccinations.slice(0, 3).map((vaccination) => (
                      <div key={vaccination.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{vaccination.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {vaccination.status === 'completed' ? 'Completed' : 'Due'}: {formatDate(vaccination.date)}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vaccination.status)}`}>
                            {vaccination.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emergency Contacts */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Emergency Contacts
                  </h3>
                  <div className="space-y-4">
                    {scannedBaby.emergencyContacts.map((contact, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{contact.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{contact.relationship}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{contact.phone}</p>
                          </div>
                          {contact.isPrimary && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                              PRIMARY
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {reportView === 'detailed' && (
              <div className="space-y-6">
                {/* Patient Information */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Patient Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Basic Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Name:</span>
                          <span className="font-medium">{scannedBaby.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Baby ID:</span>
                          <span className="font-medium">{scannedBaby.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Birth Date:</span>
                          <span className="font-medium">{formatDate(scannedBaby.birthDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Age:</span>
                          <span className="font-medium">{calculateAge(scannedBaby.birthDate)} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Blood Group:</span>
                          <span className="font-medium">{scannedBaby.bloodGroup}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Parent Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Mother:</span>
                          <span className="font-medium">{scannedBaby.parentName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Contact:</span>
                          <span className="font-medium">{scannedBaby.parentContact}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Address:</span>
                          <span className="font-medium text-right">{scannedBaby.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vital Signs History */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Vital Signs History</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-2">Date</th>
                          <th className="text-left py-2">Temp (°C)</th>
                          <th className="text-left py-2">Heart Rate</th>
                          <th className="text-left py-2">Breathing</th>
                          <th className="text-left py-2">Weight (kg)</th>
                          <th className="text-left py-2">O2 Sat (%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scannedBaby.vitals.map((vital, index) => (
                          <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                            <td className="py-2">{formatDate(vital.date)}</td>
                            <td className="py-2">{vital.temperature}</td>
                            <td className="py-2">{vital.heartRate}</td>
                            <td className="py-2">{vital.breathingRate}</td>
                            <td className="py-2">{vital.weight}</td>
                            <td className="py-2">{vital.oxygenSaturation || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Complete Assessment History */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Complete Assessment History</h3>
                  <div className="space-y-4">
                    {scannedBaby.assessments.map((assessment) => (
                      <div key={assessment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              Assessment on {formatDate(assessment.date)}
                            </h4>
                            {assessment.doctorName && (
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                By: {assessment.doctorName} - {assessment.hospital}
                              </p>
                            )}
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(assessment.aiRiskLevel)}`}>
                            {assessment.aiRiskLevel.toUpperCase()} RISK
                          </span>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            <strong>Symptoms:</strong> {assessment.symptoms.join(', ')}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            <strong>Notes:</strong> {assessment.notes}
                          </p>
                        </div>
                        {assessment.treatment && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                              <strong>Treatment:</strong> {assessment.treatment}
                            </p>
                          </div>
                        )}
                        {assessment.followUpDate && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                            <strong>Follow-up:</strong> {formatDate(assessment.followUpDate)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Complete Vaccination Record */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Complete Vaccination Record</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-2">Vaccine</th>
                          <th className="text-left py-2">Date</th>
                          <th className="text-left py-2">Status</th>
                          <th className="text-left py-2">Batch No.</th>
                          <th className="text-left py-2">Administered By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scannedBaby.vaccinations.map((vaccination) => (
                          <tr key={vaccination.id} className="border-b border-gray-100 dark:border-gray-700">
                            <td className="py-2 font-medium">{vaccination.name}</td>
                            <td className="py-2">{formatDate(vaccination.date)}</td>
                            <td className="py-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vaccination.status)}`}>
                                {vaccination.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-2">{vaccination.batchNumber || '-'}</td>
                            <td className="py-2">{vaccination.administeredBy || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Complete Consultation History */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Complete Consultation History</h3>
                  <div className="space-y-4">
                    {scannedBaby.consultations.map((consultation) => (
                      <div key={consultation.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              Consultation on {formatDate(consultation.date)}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {consultation.doctorName} - {consultation.specialization}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {consultation.hospital}
                            </p>
                          </div>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            <strong>Diagnosis:</strong> {consultation.diagnosis}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            <strong>Prescription:</strong> {consultation.prescription}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            <strong>Notes:</strong> {consultation.notes}
                          </p>
                        </div>
                        {consultation.medications.length > 0 && (
                          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">Medications:</p>
                            {consultation.medications.map((med, index) => (
                              <div key={index} className="text-sm text-yellow-700 dark:text-yellow-300 mb-1">
                                <strong>{med.name}</strong> - {med.dosage} {med.frequency} for {med.duration}
                                {med.instructions && ` (${med.instructions})`}
                              </div>
                            ))}
                          </div>
                        )}
                        {consultation.followUpDate && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                            <strong>Follow-up:</strong> {formatDate(consultation.followUpDate)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {reportView === 'print' && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Medical Report</h2>
                  <p className="text-gray-600">Generated on {formatDate(new Date().toISOString())}</p>
                </div>
                {/* Print-friendly content would go here */}
                <div className="text-center">
                  <p className="text-gray-600">Print functionality would generate a comprehensive medical report</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BabyID; 