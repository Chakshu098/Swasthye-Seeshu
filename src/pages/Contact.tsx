import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, AlertTriangle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'guardian',
    subject: '',
    message: '',
    urgent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact & Emergency Support
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get immediate help for emergencies or reach out for support and information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      I am a
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                    >
                      <option value="guardian">Guardian (Parent/Caregiver)</option>
                      <option value="asha">ASHA Worker</option>
                      <option value="doctor">Doctor</option>
                      <option value="admin">Administrator</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                    placeholder="Brief subject of your message"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                    placeholder="Describe your question or concern..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="urgent"
                    checked={formData.urgent}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                  />
                  <label className="ml-3 text-gray-700">
                    This is urgent and requires immediate attention
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-pink-500 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right Side Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 h-full">
              <div className="relative h-full">
                <img
                  src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Healthcare workers helping families"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-400/30 to-transparent rounded-2xl"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">We're Here to Help</h3>
                  <p className="text-white/90 mb-4">
                    Our team of healthcare professionals is ready to assist you with any questions or concerns about newborn care.
                  </p>
                  
                  {/* Emergency Contact */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-300" />
                      <span className="font-semibold">Emergency Contact</span>
                    </div>
                    <a
                      href="tel:+9192XXXXXX12"
                      className="text-xl font-bold hover:text-red-200 transition-colors duration-200"
                    >
                      +91 92XXXXXX12
                    </a>
                    <p className="text-sm text-white/80">24/7 Emergency Support</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;