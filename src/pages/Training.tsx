import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, CheckCircle, Lock, Clock, Video, FileText } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  locked: boolean;
  type: 'video' | 'pdf' | 'quiz';
  badge?: string;
  videoUrl?: string;
  resources?: string[];
}

const Training: React.FC = () => {

  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [userProgress, setUserProgress] = useState(60); // Mock progress percentage
  const [completedModules, setCompletedModules] = useState<string[]>(['1', '2']);

  const modules: Module[] = [
    {
      id: '1',
      title: 'Pneumonia: Causes, Symptoms, Diagnosis & Treatments',
      description: 'Comprehensive overview of pneumonia including causes, symptoms, diagnosis, and treatment options',
      duration: '12 min',
      difficulty: 'Beginner',
      completed: true,
      locked: false,
      type: 'video',
      badge: 'Foundation',
      videoUrl: 'https://www.youtube.com/embed/vp8FXgcunfE',
      resources: ['Pneumonia Basics Guide.pdf', 'Symptom Checklist.pdf', 'Emergency Protocols.pdf']
    },
    {
      id: '2',
      title: 'Pneumonia – Causes, Symptoms, Diagnosis, Treatment, Pathology',
      description: 'In-depth medical explanation of pneumonia pathology and clinical presentation',
      duration: '15 min',
      difficulty: 'Beginner',
      completed: true,
      locked: false,
      type: 'video',
      badge: 'Observer',
      videoUrl: 'https://www.youtube.com/embed/IAQp2Zuqevc',
      resources: ['Symptom Recognition Guide.pdf', 'Visual Assessment Tools.pdf', 'Case Studies.pdf']
    },
    {
      id: '3',
      title: 'Pneumonia: Everything You Need To Know',
      description: 'Complete guide covering all aspects of pneumonia for healthcare workers',
      duration: '18 min',
      difficulty: 'Intermediate',
      completed: false,
      locked: false,
      type: 'video',
      videoUrl: 'https://www.youtube.com/embed/rVL-0KpoqP4',
      resources: ['Assessment Protocol.pdf', 'AI Platform Guide.pdf', 'Practice Scenarios.pdf']
    },
    {
      id: '4',
      title: 'Pneumonia Early Warning Signs to NEVER Ignore',
      description: 'Critical early warning signs and symptoms that require immediate attention',
      duration: '10 min',
      difficulty: 'Intermediate',
      completed: false,
      locked: false,
      type: 'video',
      videoUrl: 'https://www.youtube.com/embed/SjsbYp1V3LI',
      resources: ['Emergency Response Guide.pdf', 'Contact Directory.pdf', 'Transportation Protocols.pdf']
    },
    {
      id: '5',
      title: 'Pneumonia | Overview',
      description: 'Medical overview of pneumonia for healthcare professionals',
      duration: '8 min',
      difficulty: 'Advanced',
      completed: false,
      locked: false,
      type: 'video',
      badge: 'Life Saver',
      videoUrl: 'https://www.youtube.com/embed/lzyUVVOqyS0',
      resources: ['CPR Manual.pdf', 'Practice Guidelines.pdf', 'Certification Requirements.pdf']
    },
    {
      id: '6',
      title: 'Community Engagement',
      description: 'Building trust and educating families about pneumonia prevention',
      duration: '22 min',
      difficulty: 'Intermediate',
      completed: false,
      locked: true,
      type: 'video',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      resources: ['Community Outreach Guide.pdf', 'Communication Strategies.pdf', 'Cultural Sensitivity.pdf']
    },
    {
      id: '7',
      title: 'Knowledge Assessment',
      description: 'Test your understanding and earn your certification',
      duration: '45 min',
      difficulty: 'Advanced',
      completed: false,
      locked: true,
      type: 'quiz',
      badge: 'Certified ASHA',
      resources: ['Study Guide.pdf', 'Practice Tests.pdf', 'Certification Process.pdf']
    }
  ];

  const badges = [
    { name: 'Foundation', earned: true, color: 'from-blue-400 to-blue-600' },
    { name: 'Observer', earned: true, color: 'from-green-400 to-green-600' },
    { name: 'Practitioner', earned: false, color: 'from-yellow-400 to-yellow-600' },
    { name: 'Life Saver', earned: false, color: 'from-red-400 to-red-600' },
    { name: 'Certified ASHA', earned: false, color: 'from-purple-400 to-purple-600' }
  ];

  const handleModuleClick = (module: Module) => {
    if (!module.locked) {
      setSelectedModule(module);
    }
  };

  const handleMarkComplete = (moduleId: string) => {
    setCompletedModules(prev => [...prev, moduleId]);
    setUserProgress(prev => Math.min(100, prev + 14)); // 100% / 7 modules ≈ 14%
    setSelectedModule(null);
  };

  const handleDownloadResource = (resourceName: string) => {
    // Create a dummy download link
    const link = document.createElement('a');
    link.href = '#';
    link.download = resourceName;
    link.click();
    alert(`Downloading ${resourceName}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ASHA Training Hub
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Comprehensive training for newborn pneumonia care
          </p>
          

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress & Badges Sidebar */}
          <div className="lg:col-span-1">
            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-xl p-6 mb-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Progress</h3>
              <div className="relative">
                <div className="w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#FFE4E1"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${userProgress * 2.51} 251`}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F472B6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{userProgress}%</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-600">{completedModules.length} of 7 modules completed</p>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Badges</h3>
              <div className="space-y-3">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-xl ${
                      badge.earned ? 'bg-gradient-to-r from-pink-50 to-pink-100' : 'bg-gray-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      badge.earned 
                        ? `bg-gradient-to-r ${badge.color}` 
                        : 'bg-gray-300'
                    }`}>
                      {badge.earned ? (
                        <Award className="w-5 h-5 text-white" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                    <span className={`font-medium ${
                      badge.earned ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {badge.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {!selectedModule ? (
              /* Modules Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {modules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleModuleClick(module)}
                    className={`bg-white rounded-3xl shadow-xl p-6 transition-all duration-200 ${
                      module.locked 
                        ? 'opacity-60 cursor-not-allowed' 
                        : 'hover:shadow-2xl hover:-translate-y-2 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-2xl ${
                        module.locked 
                          ? 'bg-gray-200' 
                          : 'bg-gradient-to-r from-pink-200 to-pink-300'
                      }`}>
                        {module.type === 'video' ? (
                          <Video className={`w-6 h-6 ${module.locked ? 'text-gray-500' : 'text-pink-600'}`} />
                        ) : module.type === 'pdf' ? (
                          <FileText className={`w-6 h-6 ${module.locked ? 'text-gray-500' : 'text-pink-600'}`} />
                        ) : (
                          <Award className={`w-6 h-6 ${module.locked ? 'text-gray-500' : 'text-pink-600'}`} />
                        )}
                      </div>
                      {completedModules.includes(module.id) && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                      {module.locked && (
                        <Lock className="w-6 h-6 text-gray-400" />
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {module.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {module.description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{module.duration}</span>
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          module.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          module.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {module.difficulty}
                        </span>
                      </div>
                      {module.badge && !module.locked && (
                        <span className="text-xs text-pink-600 font-medium">
                          🏆 {module.badge}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Module Detail View */
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl p-8"
              >
                <button
                  onClick={() => setSelectedModule(null)}
                  className="text-pink-600 hover:text-pink-800 mb-6 transition-colors duration-200"
                >
                  ← Back to Modules
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {selectedModule.title}
                </h2>
                
                <div className="flex items-center space-x-4 mb-6">
                  <span className="flex items-center space-x-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{selectedModule.duration}</span>
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedModule.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    selectedModule.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedModule.difficulty}
                  </span>
                </div>

                {/* Video Player */}
                {selectedModule.videoUrl && (
                  <div className="bg-gray-900 rounded-2xl aspect-video mb-6 overflow-hidden">
                    <iframe
                      src={selectedModule.videoUrl}
                      title={selectedModule.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                <div className="bg-pink-50 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Module Description</h3>
                  <p className="text-gray-700 mb-4">{selectedModule.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Learning Objectives:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Identify key pneumonia symptoms in newborns</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Understand when to escalate to medical professionals</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Practice assessment techniques</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Download Resources */}
                {selectedModule.resources && (
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Download Resources</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedModule.resources.map((resource, index) => (
                        <button
                          key={index}
                          onClick={() => handleDownloadResource(resource)}
                          className="flex items-center space-x-3 p-3 bg-white rounded-xl hover:bg-pink-50 transition-colors duration-200 text-left"
                        >
                          <Download className="w-5 h-5 text-pink-600" />
                          <span className="text-sm text-gray-700">{resource}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <button 
                    onClick={() => handleMarkComplete(selectedModule.id)}
                    disabled={completedModules.includes(selectedModule.id)}
                    className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-500 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
                  >
                    {completedModules.includes(selectedModule.id) ? 'Completed' : 'Mark as Complete'}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'ASHAs Trained', value: '300+' },
            { label: 'Modules Available', value: '7' },
            { label: 'Badges to Earn', value: '5' },
            { label: 'Average Rating', value: '4.8' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="bg-gradient-to-r from-pink-200 to-pink-300 p-3 rounded-full inline-block mb-3">
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Training;