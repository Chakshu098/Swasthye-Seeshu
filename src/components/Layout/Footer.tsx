import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-t from-pink-100 to-white dark:from-gray-800 dark:to-gray-900 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Logo size="sm" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">Swasthye Seeshu</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              Care for Every Breath - Supporting rural healthcare through early pneumonia detection 
              and AI-powered assistance for newborn care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-pink-400 hover:text-pink-600 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-pink-400 hover:text-pink-600 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-pink-400 hover:text-pink-600 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/assessment" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200">
                  Start Assessment
                </a>
              </li>
              <li>
                <a href="/consult" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200">
                  Consult Doctor
                </a>
              </li>
              <li>
                <a href="/training" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200">
                  ASHA Training
                </a>
              </li>
              <li>
                <a href="/emergency" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200">
                  Emergency Support
                </a>
              </li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Emergency</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-pink-500" />
                <span className="text-gray-600 dark:text-gray-300">Ambulance: 108</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-pink-500" />
                <span className="text-gray-600 dark:text-gray-300">PHC: +91 92XXXXXX12</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-pink-500" />
                <span className="text-gray-600 dark:text-gray-300">care@swasthyeseeshu.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-pink-500" />
                <span className="text-gray-600 dark:text-gray-300">Delhi, India</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-pink-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            &copy; 2025 Swasthye Seeshu. All rights reserved. Saving lives through early detection.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;