import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock, Thermometer, Activity, QrCode, Wifi, Baby } from 'lucide-react';
import { AssessmentData, AIAssessmentResult } from '../types';

const AssessmentPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [patientName, setPatientName] = useState('');
  const [babyId, setBabyId] = useState<string | null>(null);
  const [isScanningBaby, setIsScanningBaby] = useState(false);
  const [symptoms, setSymptoms] = useState({
    fever: false,
    fastBreathing: false,
    chestIndrawing: false,
    feedingDifficulty: false,
    lethargy: false,
    cough: false,
    unusualCrying: false,
  });
  const [breathingRate, setBreathingRate] = useState(40);
  const [temperature, setTemperature] = useState(37.0);
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResults, setAiResults] = useState<AIAssessmentResult | null>(null);

  const steps = [
    'Baby ID Scan',
    'Patient Information',
    'Vital Signs',
    'Symptoms Check',
    'Risk Assessment'
  ];

  const analyzeAssessment = async (assessmentData: AssessmentData): Promise<AIAssessmentResult> => {
    // Simulate API delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return getFallbackResults(assessmentData);
  };

  const getFallbackResults = (assessmentData: AssessmentData): AIAssessmentResult => {
    let riskScore = 0;
    
    if (assessmentData.symptoms.fever) riskScore += 2;
    if (assessmentData.symptoms.fastBreathing || assessmentData.breathingRate > 60) riskScore += 3;
    if (assessmentData.symptoms.chestIndrawing) riskScore += 3;
    if (assessmentData.symptoms.feedingDifficulty) riskScore += 2;
    if (assessmentData.symptoms.lethargy) riskScore += 2;
    if (assessmentData.symptoms.cough) riskScore += 1;
    if (assessmentData.temperature > 38.0) riskScore += 2;

    let riskLevel = 'low';
    if (riskScore >= 6) riskLevel = 'high';
    else if (riskScore >= 3) riskLevel = 'moderate';

    return {
      riskLevel,
      confidence: 85,
      riskScore,
      keyFindings: [
        `Temperature: ${assessmentData.temperature}°C`,
        `Breathing rate: ${assessmentData.breathingRate}/min`,
        `Symptoms present: ${Object.values(assessmentData.symptoms).filter(Boolean).length}`
      ],
      recommendations: riskLevel === 'high' ? [
        'Immediate medical attention required',
        'Visit nearest PHC or hospital immediately',
        'Call emergency services if breathing difficulty worsens',
        'Do not delay seeking professional care'
      ] : riskLevel === 'moderate' ? [
        'Consult with a healthcare provider within 24 hours',
        'Monitor breathing rate closely',
        'Ensure proper feeding and hydration',
        'Use our doctor consultation feature'
      ] : [
        'Continue normal care and monitoring',
        'Watch for any worsening symptoms',
        'Maintain proper hygiene and feeding',
        'Schedule routine check-up as planned'
      ],
      urgency: riskLevel === 'high' ? 'immediate' : riskLevel === 'moderate' ? 'within24hours' : 'monitor',
      explanation: `Assessment shows ${riskLevel} risk level based on symptoms and vital signs.`
    };
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'from-red-400 to-red-600';
      case 'moderate': return 'from-yellow-400 to-orange-500';
      case 'low': return 'from-green-400 to-green-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const handleBabyScan = () => {
    setIsScanningBaby(true);
    // Simulate scanning process
    setTimeout(() => {
      setBabyId('BABY001');
      setIsScanningBaby(false);
      setPatientName('Aarav Kumar'); // Auto-fill from scanned baby
      nextStep();
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    
    const assessmentData = {
      patientName,
      babyId,
      temperature,
      breathingRate,
      symptoms,
      timestamp: new Date().toISOString()
    };

    try {
      const results = await analyzeAssessment(assessmentData);
      setAiResults(results);
      setShowResults(true);
    } catch (error) {
      console.error('Assessment analysis error:', error);
      const fallbackResults = getFallbackResults(assessmentData);
      setAiResults(fallbackResults);
      setShowResults(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSymptomChange = (symptom: keyof typeof symptoms, value: boolean) => {
    setSymptoms(prev => ({ ...prev, [symptom]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (showResults && aiResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <div className={`bg-gradient-to-r ${getRiskColor(aiResults.riskLevel)} p-6 rounded-full inline-block mb-4`}>
                {aiResults.riskLevel === 'high' ? (
                  <AlertTriangle className="w-12 h-12 text-white" />
                ) : aiResults.riskLevel === 'moderate' ? (
                  <Clock className="w-12 h-12 text-white" />
                ) : (
                  <CheckCircle className="w-12 h-12 text-white" />
                )}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                AI Assessment Complete
              </h2>
              <p className="text-gray-600">for {patientName}</p>
            </div>

            <div className="mb-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Risk Level: <span className={`text-transparent bg-clip-text bg-gradient-to-r ${getRiskColor(aiResults.riskLevel).replace('from-', 'from-').replace('to-', 'to-')}`}>
                    {aiResults.riskLevel.toUpperCase()}
                  </span>
                </h3>
                <p className="text-gray-600">Confidence: {aiResults.confidence}%</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  AI Analysis
                </h4>
                <p className="text-gray-700 mb-4">{aiResults.explanation}</p>
                
                <div className="mb-4">
                  <h5 className="font-medium text-gray-900 mb-2">Key Findings:</h5>
                  <ul className="space-y-1">
                    {aiResults.keyFindings.map((finding: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Recommendations:</h5>
                  <ul className="space-y-2">
                    {aiResults.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {aiResults.riskLevel !== 'low' && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-500 hover:to-pink-600 transition-all duration-200 transform hover:scale-105">
                    Connect to Doctor
                  </button>
                  <button className="bg-gradient-to-r from-red-400 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-500 hover:to-red-600 transition-all duration-200 transform hover:scale-105">
                    Emergency SOS
                  </button>
                </div>
              )}
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentStep(0);
                  setPatientName('');
                  setSymptoms({
                    fever: false,
                    fastBreathing: false,
                    chestIndrawing: false,
                    feedingDifficulty: false,
                    lethargy: false,
                    cough: false,
                    unusualCrying: false,
                  });
                  setAiResults(null);
                }}
                className="text-pink-600 hover:text-pink-800 transition-colors duration-200"
              >
                Start New Assessment
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Pneumonia Risk Assessment
          </h1>
          <p className="text-xl text-gray-600">
            Advanced AI analysis for early detection and accurate results
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex-1 text-center ${
                  index <= currentStep ? 'text-pink-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-semibold ${
                    index <= currentStep
                      ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-sm font-medium">{step}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-pink-400 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Assessment Form */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          {currentStep === 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Baby ID Scan</h3>
              <div className="text-center space-y-6">
                <div className="mb-6">
                  <Baby className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Scan Baby QR Code or NFC
                  </h4>
                  <p className="text-gray-600 mb-6">
                    Scan the baby's QR code or tap NFC to automatically load their health records
                  </p>
                </div>

                {babyId ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <div>
                        <h5 className="font-medium text-green-900">Baby ID Scanned Successfully</h5>
                        <p className="text-sm text-green-700">ID: {babyId} - {patientName}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      onClick={handleBabyScan}
                      disabled={isScanningBaby}
                      className="flex flex-col items-center p-6 rounded-xl border-2 border-pink-200 hover:border-pink-300 transition-colors duration-200"
                    >
                      <QrCode className="w-8 h-8 text-pink-500 mb-2" />
                      <span className="text-sm font-medium text-gray-700">QR Code</span>
                    </button>
                    <button
                      onClick={handleBabyScan}
                      disabled={isScanningBaby}
                      className="flex flex-col items-center p-6 rounded-xl border-2 border-pink-200 hover:border-pink-300 transition-colors duration-200"
                    >
                      <Wifi className="w-8 h-8 text-pink-500 mb-2" />
                      <span className="text-sm font-medium text-gray-700">NFC</span>
                    </button>
                  </div>
                )}

                {isScanningBaby && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="mb-4"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full mx-auto flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-pink-600 font-medium mt-2">Scanning Baby ID...</p>
                  </motion.div>
                )}

                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-4">
                    Or manually enter baby information
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Baby's Name
                    </label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                      placeholder="Enter baby's name"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Patient Information</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Baby's Name
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                    placeholder="Enter baby's name"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Vital Signs</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Thermometer className="w-4 h-4 inline mr-2" />
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    step="0.1"
                    min="35"
                    max="42"
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Activity className="w-4 h-4 inline mr-2" />
                    Breathing Rate (breaths per minute)
                  </label>
                  <input
                    type="range"
                    value={breathingRate}
                    onChange={(e) => setBreathingRate(parseInt(e.target.value))}
                    min="20"
                    max="100"
                    className="w-full"
                  />
                  <div className="text-center mt-2">
                    <span className={`text-lg font-semibold ${breathingRate > 60 ? 'text-red-600' : 'text-green-600'}`}>
                      {breathingRate} breaths/min
                    </span>
                    {breathingRate > 60 && (
                      <p className="text-sm text-red-600 mt-1">⚠️ Fast breathing detected</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Symptoms Check</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries({
                  fever: 'Fever (feels hot)',
                  fastBreathing: 'Fast breathing',
                  chestIndrawing: 'Chest indrawing',
                  feedingDifficulty: 'Feeding difficulty',
                  lethargy: 'Lethargy/drowsiness',
                  cough: 'Persistent cough',
                  unusualCrying: 'Unusual crying',
                }).map(([key, label]) => (
                  <label
                    key={key}
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      symptoms[key as keyof typeof symptoms]
                        ? 'border-pink-400 bg-pink-50'
                        : 'border-gray-200 bg-white hover:border-pink-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={symptoms[key as keyof typeof symptoms]}
                      onChange={(e) => handleSymptomChange(key as keyof typeof symptoms, e.target.checked)}
                      className="w-5 h-5 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                    />
                    <span className="ml-3 text-gray-900 font-medium">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Review Assessment</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Patient: {patientName}</h4>
                  {babyId && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="text-sm text-blue-700">Baby ID: {babyId}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-600">Temperature:</span>
                      <span className="block text-lg font-semibold">{temperature}°C</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Breathing Rate:</span>
                      <span className="block text-lg font-semibold">{breathingRate}/min</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 block mb-2">Symptoms Present:</span>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(symptoms).filter(([, value]) => value).map(([key]) => (
                        <span
                          key={key}
                          className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm"
                        >
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-3 border border-pink-300 text-pink-600 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              disabled={isAnalyzing}
              className="px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-xl font-semibold hover:from-pink-500 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
            >
              {isAnalyzing ? 'Analyzing...' : currentStep === steps.length - 1 ? 'Complete Assessment' : 'Next'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AssessmentPage;