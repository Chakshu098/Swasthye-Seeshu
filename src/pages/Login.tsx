import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from '../components/Layout/Logo';

const Login: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('guardian');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { login, signup } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signup({ name, email: emailOrPhone, password, role: role as 'asha' | 'doctor' | 'guardian' | 'admin', phone });
      } else {
        await login(emailOrPhone, password, role);
      }
      navigate('/');
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const isEmail = (value: string) => {
    return value.includes('@');
  };

  const handleEmailOrPhoneChange = (value: string) => {
    setEmailOrPhone(value);
    // If it's an email, clear the phone field in signup
    if (isEmail(value) && isSignup) {
      setPhone('');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/80 to-pink-300/60 z-10"></div>
        <img
          src="https://images.pexels.com/photos/1556706/pexels-photo-1556706.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Mother with newborn"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h2 className="text-4xl font-bold mb-4">Protecting Every Breath</h2>
            <p className="text-xl opacity-90">Early detection saves lives</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-md w-full space-y-8">
          {/* Logo and Title */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Logo size="lg" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('login.title')}</h1>
            <p className="text-gray-600">{t('login.subtitle')}</p>
          </div>

          {/* Language Toggle */}
          <div className="text-center pt-4 border-t border-pink-100">
            <div className="flex justify-center space-x-4">
              {['english', 'hindi', 'bengali', 'tamil'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang as 'english' | 'hindi' | 'bengali' | 'tamil')}
                  className={`text-sm transition-colors duration-200 ${
                    language === lang
                      ? 'text-pink-600 font-semibold'
                      : 'text-gray-600 hover:text-pink-600'
                  }`}
                >
                  {lang === 'english' ? 'English' :
                   lang === 'hindi' ? 'हिंदी' :
                   lang === 'bengali' ? 'বাংলা' :
                   'தமிழ்'}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
              >
                <option value="guardian">{t('login.role.guardian')}</option>
                <option value="asha">{t('login.role.asha')}</option>
                <option value="doctor">{t('login.role.doctor')}</option>
                <option value="admin">{t('login.role.admin')}</option>
              </select>
            </div>

            {/* Name (for signup) */}
            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('login.fullName')}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder={t('login.fullNamePlaceholder')}
                />
              </div>
            )}

            {/* Email or Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('login.emailOrPhone')}
              </label>
              <input
                type={isEmail(emailOrPhone) ? 'email' : 'tel'}
                value={emailOrPhone}
                onChange={(e) => handleEmailOrPhoneChange(e.target.value)}
                required
                className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder={t('login.emailOrPhonePlaceholder')}
              />
            </div>

            {/* Phone (for signup, only if email is entered) */}
            {isSignup && isEmail(emailOrPhone) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('login.phoneNumber')}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder={t('login.phoneNumberPlaceholder')}
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('login.password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 pr-12"
                  placeholder={t('login.passwordPlaceholder')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-pink-500 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {isSignup ? t('login.createAccount') : t('login.signIn')}
            </button>

            {/* Toggle between login/signup */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-pink-600 hover:text-pink-800 transition-colors duration-200"
              >
                {isSignup 
                  ? t('login.alreadyHaveAccount')
                  : t('login.needAccount')
                }
              </button>
            </div>

            {/* Forgot Password */}
            {!isSignup && (
              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-600 hover:text-pink-600 transition-colors duration-200"
                >
                  {t('login.forgotPassword')}
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;