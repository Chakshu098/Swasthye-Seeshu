import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'ASHAs Trained', value: '300+', color: 'from-blue-400 to-blue-600' },
    { label: 'Newborns Screened', value: '1,000+', color: 'from-pink-400 to-pink-600' },
    { label: 'Lives Saved', value: '50+', color: 'from-green-400 to-green-600' },
    { label: 'Villages Reached', value: '25', color: 'from-purple-400 to-purple-600' },
  ];

  const features = [
    {
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms analyze cough patterns and symptoms to detect pneumonia early.',
    },
    {
      title: 'Community Training',
      description: 'Comprehensive training programs for ASHA workers to identify and respond to pneumonia cases.',
    },
    {
      title: 'Emergency Support',
      description: 'Instant SOS features and connections to nearest healthcare facilities for critical cases.',
    },
    {
      title: 'Multilingual Access',
      description: 'Platform available in Hindi and regional languages to serve diverse rural communities.',
    },
  ];

  const team = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Chief Medical Officer',
      photo: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Pediatrician with 15+ years in rural healthcare',
    },
    {
      name: 'Rajesh Kumar',
      role: 'AI Research Lead',
      photo: 'https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'PhD in Machine Learning, healthcare AI specialist',
    },
    {
      name: 'Anita Verma',
      role: 'Community Outreach Director',
      photo: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Former ASHA worker, rural health advocate',
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    {
      url: 'https://images.pexels.com/photos/1556706/pexels-photo-1556706.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Mother & Newborn Care',
      subtitle: 'Protecting every breath from the start'
    },
    {
      url: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'ASHA Workers in Action',
      subtitle: 'Community healthcare heroes'
    },
    {
      url: 'https://images.pexels.com/photos/7579319/pexels-photo-7579319.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Doctor Consultation',
      subtitle: 'Expert medical guidance'
    },
    {
      url: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Emergency Support',
      subtitle: '24/7 life-saving assistance'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen">
      {/* Full Screen Hero Section with Continuous Image Transitions */}
      <section className="relative h-screen overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
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
              Saving Lives Through
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-white">
                Early Detection
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 opacity-90"
            >
              Swasthye Seeshu combines artificial intelligence with community healthcare to detect 
              newborn pneumonia early and connect rural families with life-saving medical care.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-pink-50 transform hover:scale-105 transition-all duration-200 shadow-xl">
                Learn More
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-pink-600 transform hover:scale-105 transition-all duration-200">
                Get Started
              </button>
            </motion.div>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Content Section with Background */}
      <section className="bg-gradient-to-b from-pink-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Impact Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Mission Section */}
          <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Our Mission
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Every year, pneumonia claims the lives of thousands of newborns in rural India. 
                    Many of these deaths are preventable with early detection and proper care.
                  </p>
                  <p className="text-lg text-gray-700 mb-6">
                    Swasthye Seeshu bridges the gap between advanced medical technology and 
                    grassroots healthcare, empowering ASHA workers and families with AI-powered 
                    tools for early pneumonia detection.
                  </p>
                  <div className="bg-gradient-to-r from-pink-100 to-pink-200 p-6 rounded-2xl">
                    <Target className="w-8 h-8 text-pink-600 mb-3" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Goal</h3>
                    <p className="text-gray-700">
                      Reduce newborn pneumonia mortality by 50% in rural communities through 
                      technology-enabled early detection and care coordination.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <img
                    src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="ASHA workers helping families"
                    className="rounded-3xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-400/20 to-transparent rounded-3xl"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We're Making a Difference
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform combines cutting-edge technology with human care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="bg-gradient-to-r from-pink-200 to-pink-300 p-4 rounded-2xl inline-block mb-6">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded"></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-700">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Dedicated professionals working to save newborn lives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-pink-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-200 to-pink-300">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-900 mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-pink-800 mb-8 opacity-90">
            Together, we can ensure every newborn has access to life-saving pneumonia care
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-pink-50 transform hover:scale-105 transition-all duration-200 shadow-xl">
              Become a Partner
            </button>
            <button className="bg-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-pink-700 transform hover:scale-105 transition-all duration-200 shadow-xl">
              Support Our Work
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;