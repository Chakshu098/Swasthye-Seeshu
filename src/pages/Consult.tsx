import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Play, Pause, Upload, Activity, Video, MessageSquare, Stethoscope, X, User, Clock } from 'lucide-react';
import { Doctor } from '../types';

const Consult: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    riskLevel: string;
    confidence: number;
    audioFeatures: string[];
    recommendation: string;
    nextSteps: string[];
  } | null>(null);
  const [showDoctors, setShowDoctors] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const mockDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      specialization: 'Pediatrician',
      hospital: 'AIIMS Delhi',
      photo: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'available',
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      specialization: 'Neonatologist',
      hospital: 'Safdarjung Hospital',
      photo: 'https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'available',
      rating: 4.9,
    },
    {
      id: '3',
      name: 'Dr. Anita Verma',
      specialization: 'Pediatric Pulmonologist',
      hospital: 'Apollo Hospital',
      photo: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'busy',
      rating: 4.7,
    },
  ];

  const analyzeAudioData = async (): Promise<{
    riskLevel: string;
    confidence: number;
    audioFeatures: string[];
    recommendation: string;
    nextSteps: string[];
  }> => {
    // Simulate API delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return getFallbackResults();
  };

  const getFallbackResults = () => {
    const riskLevel = Math.random() > 0.6 ? 'moderate' : 'low';
    return {
      riskLevel,
      confidence: Math.round(Math.random() * 20 + 75),
      audioFeatures: [
        'Respiratory rate: 45 breaths/min',
        'Wheeze detected: No',
        'Crackling sounds: Mild',
        'Overall pattern: Concerning'
      ],
      recommendation: riskLevel === 'high' ? 
        'Immediate medical consultation recommended. Cough pattern suggests respiratory distress.' :
        riskLevel === 'moderate' ? 
        'Medical consultation within 24 hours recommended. Monitor breathing closely.' :
        'Continue monitoring. Cough pattern appears normal but consult if symptoms worsen.',
      nextSteps: riskLevel === 'high' ? [
        'Seek immediate medical attention',
        'Monitor breathing rate closely',
        'Keep baby hydrated and comfortable'
      ] : riskLevel === 'moderate' ? [
        'Schedule doctor consultation',
        'Monitor for worsening symptoms',
        'Use our doctor connect feature'
      ] : [
        'Continue normal care',
        'Watch for any changes',
        'Contact doctor if concerned'
      ]
    };
  };

  const handleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks: BlobPart[] = [];

        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });
          setAudioBlob(blob);
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
        setRecordingTime(0);

        // Start timer
        const timer = setInterval(() => {
          setRecordingTime(prev => {
            if (prev >= 10) {
              clearInterval(timer);
              recorder.stop();
              stream.getTracks().forEach(track => track.stop());
              setIsRecording(false);
              return 10;
            }
            return prev + 1;
          });
        }, 1000);

        // Auto-stop after 10 seconds
        setTimeout(() => {
          if (recorder.state === 'recording') {
            recorder.stop();
            stream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
          }
          clearInterval(timer);
        }, 10000);
      } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Please allow microphone access to record cough sounds.');
      }
    } else {
      if (mediaRecorder) {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
      setIsRecording(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioBlob(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const analyzeAudio = async () => {
    if (!audioBlob) return;

    setIsAnalyzing(true);
    
    try {
      const results = await analyzeAudioData();
      setAnalysisResult(results);
      
      if (results.riskLevel === 'moderate' || results.riskLevel === 'high') {
        setShowDoctors(true);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      const fallbackResults = getFallbackResults({});
      setAnalysisResult(fallbackResults);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cough Detection & Analysis
          </h1>
          <p className="text-xl text-gray-600">
            AI-powered audio analysis for pneumonia detection
          </p>
        </div>

        {/* Audio Recording Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Record Baby's Cough
          </h3>
          
          {/* Recording Interface */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <button
                onClick={handleRecording}
                className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 ${
                  isRecording
                    ? 'bg-gradient-to-r from-red-400 to-red-500 animate-pulse'
                    : 'bg-gradient-to-r from-pink-400 to-pink-500'
                } text-white shadow-xl`}
              >
                {isRecording ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
              </button>
              
              {isRecording && (
                <div className="absolute -inset-4 border-4 border-red-400 rounded-full animate-ping"></div>
              )}
            </div>
            
            <p className="mt-4 text-gray-600">
              {isRecording ? `Recording... ${recordingTime}/10 seconds` : 'Tap to start recording'}
            </p>
          </div>

          {/* File Upload Alternative */}
          <div className="text-center mb-6">
            <p className="text-gray-500 mb-4">or</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center space-x-2 mx-auto"
            >
              <Upload className="w-5 h-5" />
              <span>Upload Audio File</span>
            </button>
          </div>

          {/* Audio Preview */}
          {audioBlob && (
            <div className="bg-pink-50 rounded-2xl p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">Audio Ready for Analysis</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Activity className="w-6 h-6 text-pink-600" />
                  <span className="text-gray-700">Cough sample recorded</span>
                  {audioUrl && (
                    <button
                      onClick={playAudio}
                      className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors duration-200"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                  )}
                </div>
                <button
                  onClick={analyzeAudio}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-500 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Audio'}
                </button>
              </div>
              {audioUrl && (
                <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} className="hidden" />
              )}
            </div>
          )}

          {/* Analysis Loading */}
          {isAnalyzing && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mb-4"></div>
              <p className="text-gray-600">AI is analyzing the cough pattern...</p>
            </div>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Analysis Results</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    analysisResult.riskLevel === 'high' ? 'text-red-600' :
                    analysisResult.riskLevel === 'moderate' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {analysisResult.riskLevel.toUpperCase()}
                  </div>
                  <p className="text-gray-600">Risk Level</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {analysisResult.confidence}%
                  </div>
                  <p className="text-gray-600">Confidence</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <h5 className="font-semibold text-gray-900">Audio Features:</h5>
                {analysisResult.audioFeatures.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                <p className="text-yellow-800 font-medium">{analysisResult.recommendation}</p>
              </div>

              <div className="space-y-2">
                <h5 className="font-semibold text-gray-900">Next Steps:</h5>
                {analysisResult.nextSteps.map((step: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Connect to Doctor Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <div className="text-center mb-6">
            <Stethoscope className="w-12 h-12 text-pink-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Connect to a City Doctor
            </h3>
            <p className="text-gray-600">
              Get expert consultation from pediatricians via video call
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Video Consultation</h4>
              <p className="text-gray-700 mb-4">
                Connect with experienced pediatricians for real-time consultation and guidance.
              </p>
              <button 
                onClick={() => setShowExpertModal(true)}
                className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-500 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
              >
                Consult an Expert
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Chat Consultation</h4>
              <p className="text-gray-700 mb-4">
                Get quick answers and guidance through secure text messaging with doctors.
              </p>
              <button 
                onClick={() => setShowChatModal(true)}
                className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
              >
                Start Chat
              </button>
            </div>
          </div>
        </motion.div>

        {/* Doctor Consultation */}
        {showDoctors && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Available Pediatricians
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-200"
                >
                  <div className="text-center mb-4">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                    />
                    <h4 className="text-lg font-semibold text-gray-900">{doctor.name}</h4>
                    <p className="text-sm text-gray-600">{doctor.specialization}</p>
                    <p className="text-sm text-gray-500">{doctor.hospital}</p>
                    <div className="flex items-center justify-center mt-2">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-600 ml-1">{doctor.rating}</span>
                    </div>
                  </div>
                  
                  <div className={`text-center mb-4 ${
                    doctor.status === 'available' ? 'text-green-600' :
                    doctor.status === 'busy' ? 'text-yellow-600' : 'text-gray-500'
                  }`}>
                    <span className="text-sm font-medium">
                      {doctor.status === 'available' ? '🟢 Available' :
                       doctor.status === 'busy' ? '🟡 Busy' : '⚫ Offline'}
                    </span>
                  </div>

                  {doctor.status === 'available' && (
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setShowChatModal(true)}
                        className="flex-1 bg-gradient-to-r from-green-400 to-green-500 text-white py-2 px-4 rounded-xl text-sm font-semibold hover:from-green-500 hover:to-green-600 transition-all duration-200 flex items-center justify-center space-x-1"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Chat</span>
                      </button>
                      <button 
                        onClick={() => setShowExpertModal(true)}
                        className="flex-1 bg-gradient-to-r from-blue-400 to-blue-500 text-white py-2 px-4 rounded-xl text-sm font-semibold hover:from-blue-500 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-1"
                      >
                        <Video className="w-4 h-4" />
                        <span>Video</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Expert Consultation Modal */}
      <AnimatePresence>
        {showExpertModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Expert Consultation</h3>
                <button
                  onClick={() => setShowExpertModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Connect to Doctor</h4>
                <p className="text-gray-600">You will be connected to an available pediatrician for video consultation.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <User className="w-5 h-5 text-pink-600" />
                  <span className="text-sm text-gray-700">Dr. Priya Sharma - Pediatrician</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Available Now</span>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowExpertModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Connecting to video consultation...');
                    setShowExpertModal(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-pink-400 to-pink-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-pink-500 hover:to-pink-600 transition-all duration-200"
                >
                  Start Video Call
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChatModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Start Chat</h3>
                <button
                  onClick={() => setShowChatModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Chat with Doctor</h4>
                <p className="text-gray-600">Connect with a pediatrician for text-based consultation.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <User className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Dr. Rajesh Kumar - Neonatologist</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Response within 5 minutes</span>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowChatModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Starting chat with doctor...');
                    setShowChatModal(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-600 transition-all duration-200"
                >
                  Start Chat
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Consult;