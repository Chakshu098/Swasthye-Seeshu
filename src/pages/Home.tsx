import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroImages = [
    {
      url: 'https://images.pexels.com/photos/1556706/pexels-photo-1556706.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Mother & Newborn Care',
    },
    {
      url: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'ASHA Workers in Action',
    },
    {
      url: 'https://images.pexels.com/photos/7579319/pexels-photo-7579319.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Doctor Consultation',
    },
    {
      url: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Emergency Support',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const timelineData = [
    {
      year: '2020',
      title: 'Project Initiation',
      description: 'Started with a vision to reduce newborn pneumonia mortality in rural India',
      achievements: ['Research phase began', 'Partnered with AIIMS Delhi', 'Identified target communities'],
      color: 'from-blue-400 to-blue-600'
    },
    {
      year: '2021',
      title: 'Technology Development',
      description: 'Developed AI-powered cough detection and assessment tools',
      achievements: ['AI model training', 'Mobile app development', 'First field trials'],
      color: 'from-green-400 to-green-600'
    },
    {
      year: '2022',
      title: 'Community Training',
      description: 'Launched comprehensive training programs for ASHA workers',
      achievements: ['300+ ASHA workers trained', '25 villages covered', 'First 1000+ screenings'],
      color: 'from-purple-400 to-purple-600'
    },
    {
      year: '2023',
      title: 'Scale & Impact',
      description: 'Expanded reach and achieved significant health outcomes',
      achievements: ['50+ lives saved', '500+ ASHA workers active', '5000+ families served'],
      color: 'from-pink-400 to-pink-600'
    },
    {
      year: '2024',
      title: 'Future Vision',
      description: 'Continuing to expand and improve our impact',
      achievements: ['National expansion plans', 'Advanced AI features', 'Partnership development'],
      color: 'from-orange-400 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Continuous Background Transition */}
      <section className="relative h-screen overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/70 to-pink-600/50"></div>
          </div>
        ))}
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Early Pneumonia Detection & Care
              <span className="block text-pink-200">for Every Newborn</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 opacity-90"
            >
              AI-powered healthcare support for rural communities
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/assessment"
                className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-pink-50 transform hover:scale-105 transition-all duration-200 shadow-xl"
              >
                Start Assessment
              </Link>
              <Link
                to="/consult"
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-xl"
              >
                Consult Doctor
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Timeline Impact Section */}
      <section className="py-16 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transforming rural healthcare through technology and training
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-pink-200 to-pink-400 h-full"></div>
            
            <div className="space-y-8">
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-pink-400 rounded-full z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-200">
                      <div className={`bg-gradient-to-r ${item.color} text-white px-4 py-2 rounded-full inline-block mb-4 text-sm font-semibold`}>
                        {item.year}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {item.description}
                      </p>
                      <ul className="space-y-2">
                        {item.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-200 to-pink-300">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-900 mb-6">
            Ready to Save Lives?
          </h2>
          <p className="text-xl text-pink-800 mb-8 opacity-90">
            Join thousands of healthcare workers using AI to detect pneumonia early
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/assessment"
              className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-pink-50 transform hover:scale-105 transition-all duration-200 shadow-xl"
            >
              Start Assessment Now
            </Link>
            <Link
              to="/training"
              className="bg-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-pink-700 transform hover:scale-105 transition-all duration-200 shadow-xl"
            >
              Begin Training
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;