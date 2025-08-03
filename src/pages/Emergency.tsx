import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Phone, MapPin, Navigation, Clock, Users, Truck, Activity } from 'lucide-react';

interface Facility {
  id: string;
  name: string;
  type: 'hospital' | 'phc' | 'chc';
  distance: number;
  phone: string;
  address: string;
  services: string[];
  availability: 'available' | 'limited' | 'full';
}

const Emergency: React.FC = () => {
  const [sosActivated, setSosActivated] = useState(false);
  const [, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showFacilities, setShowFacilities] = useState(false);

  const nearbyFacilities: Facility[] = [
    {
      id: '1',
      name: 'District Hospital',
      type: 'hospital',
      distance: 5.2,
      phone: '+91-9876543210',
      address: 'Main Road, District Center',
      services: ['NICU', 'Pediatric ICU', 'Emergency', 'Oxygen Support'],
      availability: 'available',
    },
    {
      id: '2',
      name: 'Primary Health Centre',
      type: 'phc',
      distance: 2.1,
      phone: '+91 92XXXXXX12',
      address: 'Village Center, Block Headquarters',
      services: ['Basic Care', 'Referral', 'First Aid'],
      availability: 'available',
    },
    {
      id: '3',
      name: 'Community Health Centre',
      type: 'chc',
      distance: 8.7,
      phone: '+91-9876543212',
      address: 'Sub-District Hospital Complex',
      services: ['Specialist Care', 'Laboratory', 'Radiology'],
      availability: 'limited',
    },
  ];

  const handleSOS = () => {
    setSosActivated(true);
    setShowFacilities(true);
    
    // Mock geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Use mock location
          setLocation({ lat: 28.6139, lng: 77.2090 });
        }
      );
    } else {
      setLocation({ lat: 28.6139, lng: 77.2090 });
    }

    // Auto-reset SOS after 30 seconds
    setTimeout(() => {
      setSosActivated(false);
    }, 30000);
  };

  const getFacilityIcon = (type: string) => {
    switch (type) {
      case 'hospital': return Activity;
      case 'phc': return Users;
      case 'chc': return Truck;
      default: return MapPin;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'limited': return 'text-yellow-600 bg-yellow-100';
      case 'full': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Emergency Support
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Immediate help for critical newborn care situations
          </p>
        </div>

        {/* SOS Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className={`relative inline-block ${sosActivated ? 'animate-pulse' : ''}`}>
            <button
              onClick={handleSOS}
              disabled={sosActivated}
              className={`w-40 h-40 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-200 transform hover:scale-105 shadow-2xl ${
                sosActivated
                  ? 'bg-gradient-to-r from-red-500 to-red-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600'
              }`}
            >
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 mx-auto mb-2" />
                <span>{sosActivated ? 'SOS ACTIVE' : 'SOS'}</span>
              </div>
            </button>
            
            {sosActivated && (
              <div className="absolute -inset-8 border-4 border-red-400 rounded-full animate-ping"></div>
            )}
          </div>
          
          <p className="mt-4 text-gray-600">
            {sosActivated 
              ? 'Emergency alert sent! Help is on the way.'
              : 'Tap for immediate emergency assistance'
            }
          </p>
        </motion.div>

        {/* Emergency Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <a
            href="tel:108"
            className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
          >
            <div className="bg-gradient-to-r from-red-200 to-red-300 p-4 rounded-full inline-block mb-4">
              <Phone className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Call Ambulance
            </h3>
            <p className="text-3xl font-bold text-red-600">108</p>
          </a>

          <button className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            <div className="bg-gradient-to-r from-blue-200 to-blue-300 p-4 rounded-full inline-block mb-4">
              <Navigation className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Find Nearest Hospital
            </h3>
            <p className="text-blue-600 font-medium">Navigate Now</p>
          </button>

          <button className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            <div className="bg-gradient-to-r from-green-200 to-green-300 p-4 rounded-full inline-block mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Connect Doctor
            </h3>
            <p className="text-green-600 font-medium">Video Call</p>
          </button>
        </motion.div>

        {/* Nearby Facilities */}
        {showFacilities && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Nearest Healthcare Facilities
            </h2>
            
            <div className="space-y-6">
              {nearbyFacilities.map((facility) => {
                const FacilityIcon = getFacilityIcon(facility.type);
                
                return (
                  <div
                    key={facility.id}
                    className="border border-pink-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-r from-pink-200 to-pink-300 p-3 rounded-full">
                          <FacilityIcon className="w-6 h-6 text-pink-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {facility.name}
                          </h3>
                          <p className="text-gray-600 mb-2">{facility.address}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="flex items-center space-x-1 text-gray-500">
                              <Navigation className="w-4 h-4" />
                              <span>{facility.distance} km away</span>
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(facility.availability)}`}>
                              {facility.availability}
                            </span>
                          </div>
                        </div>
                      </div>
                      <a
                        href={`tel:${facility.phone}`}
                        className="bg-gradient-to-r from-green-400 to-green-500 text-white p-3 rounded-full hover:from-green-500 hover:to-green-600 transition-all duration-200"
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Available Services:</h4>
                      <div className="flex flex-wrap gap-2">
                        {facility.services.map((service, index) => (
                          <span
                            key={index}
                            className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 bg-gradient-to-r from-blue-400 to-blue-500 text-white py-2 px-4 rounded-xl font-medium hover:from-blue-500 hover:to-blue-600 transition-all duration-200">
                        Get Directions
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-pink-400 to-pink-500 text-white py-2 px-4 rounded-xl font-medium hover:from-pink-500 hover:to-pink-600 transition-all duration-200">
                        Share Location
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Emergency Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Emergency Guidelines
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                When to Call Emergency (108)
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-1" />
                  <span>Baby stops breathing or turns blue</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-1" />
                  <span>Severe chest indrawing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-1" />
                  <span>High fever with lethargy</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-1" />
                  <span>Unable to feed or drink</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                While Waiting for Help
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 text-blue-500 mt-1" />
                  <span>Keep baby warm and comfortable</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 text-blue-500 mt-1" />
                  <span>Monitor breathing continuously</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 text-blue-500 mt-1" />
                  <span>Stay calm and reassure family</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 text-blue-500 mt-1" />
                  <span>Prepare for transportation</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Emergency;