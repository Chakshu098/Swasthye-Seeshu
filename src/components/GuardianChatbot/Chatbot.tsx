import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../../types';


const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Hello! I\'m Guardian, your pneumonia care assistant. How can I help you today?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickActions = [
    { label: 'Start Assessment', action: 'assessment' },
    { label: 'Emergency Help', action: 'emergency' },
    { label: 'Doctor Connect', action: 'doctor' },
    { label: 'Symptoms Guide', action: 'symptoms' },
  ];

  const getAIResponse = async (message: string): Promise<string> => {
    // Simulate API delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerMessage = message.toLowerCase();
    
    // Fever and temperature related queries
    if (lowerMessage.includes('fever') || lowerMessage.includes('temperature') || lowerMessage.includes('hot')) {
      return 'Fever in newborns can be serious. Check if temperature is above 38°C (100.4°F). Look for fast breathing, poor feeding, or lethargy. Would you like to start a detailed assessment?';
    }
    
    // Breathing and respiratory issues
    if (lowerMessage.includes('breathing') || lowerMessage.includes('cough') || lowerMessage.includes('respiratory')) {
      return 'Fast breathing in newborns (>60 breaths/minute) can indicate pneumonia. I can help you record a cough sample for AI analysis. Would you like to proceed?';
    }
    
    // Emergency situations
    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('critical')) {
      return '🚨 If this is an emergency, please call 108 immediately or use our SOS feature. For immediate medical advice, I can connect you with an available doctor.';
    }
    
    // Assessment related
    if (lowerMessage.includes('assessment') || lowerMessage.includes('test') || lowerMessage.includes('check')) {
      return 'I can help you start a comprehensive assessment. This will check symptoms, vital signs, and risk factors. Would you like to begin the assessment now?';
    }
    
    // Doctor consultation
    if (lowerMessage.includes('doctor') || lowerMessage.includes('consult') || lowerMessage.includes('medical')) {
      return 'I can connect you with available pediatricians. Would you like to see available doctors or schedule a consultation?';
    }
    
    // Symptoms
    if (lowerMessage.includes('symptom') || lowerMessage.includes('sign')) {
      return 'Key pneumonia symptoms in newborns: fast breathing (>60/min), fever (>38°C), chest indrawing, poor feeding, lethargy, persistent cough, unusual crying. Any of these present?';
    }
    
    // General help
    if (lowerMessage.includes('help') || lowerMessage.includes('what') || lowerMessage.includes('how')) {
      return 'I\'m Guardian, your pneumonia care assistant. I can help with: symptom assessment, emergency guidance, doctor connections, and educational information. What do you need help with?';
    }
    
    // Default response
    return 'I understand your concern about newborn health. I can help you with pneumonia symptoms, start an assessment, or connect you with a doctor. What would you like to do?';
  };



  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(inputMessage);
      
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: aiResponse,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const fallbackResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: getFallbackResponse(inputMessage),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = async (action: string) => {
    let response = '';
    switch (action) {
      case 'assessment':
        response = 'I\'ll guide you through a quick pneumonia assessment. Please answer a few questions about the baby\'s symptoms.';
        break;
      case 'emergency':
        response = '🚨 Emergency protocols activated. Call 108 for ambulance or use our SOS feature for immediate help.';
        break;
      case 'doctor':
        response = 'I can connect you with available pediatricians. They can review symptoms and provide medical guidance.';
        break;
      case 'symptoms':
        response = 'Key pneumonia symptoms in newborns: Fast breathing (>60/min), fever, poor feeding, chest indrawing, and unusual crying.';
        break;
    }
    
    const botMessage: ChatMessage = {
      id: Date.now().toString(),
      message: response,
      isBot: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-8 h-8 mx-auto" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-pink-200 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-200 to-pink-300 p-4 rounded-t-2xl flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-pink-800">Guardian</h3>
                <p className="text-sm text-pink-700">Your Pneumonia Care Assistant</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-pink-700 hover:text-pink-900 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-pink-100 text-gray-800'
                        : 'bg-gradient-to-r from-pink-400 to-pink-500 text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-pink-100 text-gray-800 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="p-3 border-t border-pink-100">
              <div className="grid grid-cols-2 gap-2 mb-3">
                {quickActions.map((action) => (
                  <button
                    key={action.action}
                    onClick={() => handleQuickAction(action.action)}
                    disabled={isLoading}
                    className="text-xs bg-pink-50 text-pink-700 px-3 py-2 rounded-full hover:bg-pink-100 transition-colors duration-200 disabled:opacity-50"
                  >
                    {action.label}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about symptoms..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm disabled:opacity-50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-gradient-to-r from-pink-400 to-pink-500 text-white p-2 rounded-full hover:from-pink-500 hover:to-pink-600 transition-all duration-200 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;