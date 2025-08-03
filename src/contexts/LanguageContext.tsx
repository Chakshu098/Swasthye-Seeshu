import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'english' | 'hindi' | 'bengali' | 'tamil';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  english: {
    'login.title': 'Swasthye Seeshu',
    'login.subtitle': 'Care for Every Breath',
    'login.emailOrPhone': 'Email or Phone',
    'login.emailOrPhonePlaceholder': 'Enter your email or phone number',
    'login.password': 'Password',
    'login.passwordPlaceholder': 'Enter your password',
    'login.signIn': 'Sign In',
    'login.signUp': 'Sign Up',
    'login.createAccount': 'Create Account',
    'login.alreadyHaveAccount': 'Already have an account? Sign In',
    'login.needAccount': 'Need an account? Sign Up',
    'login.forgotPassword': 'Forgot your password?',
    'login.fullName': 'Full Name',
    'login.fullNamePlaceholder': 'Enter your full name',
    'login.phoneNumber': 'Phone Number',
    'login.phoneNumberPlaceholder': 'Enter your phone number',
    'login.role.guardian': 'Guardian (Parent/Caregiver)',
    'login.role.asha': 'ASHA Worker',
    'login.role.doctor': 'Doctor',
    'login.role.admin': 'Administrator',
  },
  hindi: {
    'login.title': 'स्वास्थ्य शिशु',
    'login.subtitle': 'हर सांस की देखभाल',
    'login.emailOrPhone': 'ईमेल या फोन',
    'login.emailOrPhonePlaceholder': 'अपना ईमेल या फोन नंबर दर्ज करें',
    'login.password': 'पासवर्ड',
    'login.passwordPlaceholder': 'अपना पासवर्ड दर्ज करें',
    'login.signIn': 'साइन इन करें',
    'login.signUp': 'साइन अप करें',
    'login.createAccount': 'खाता बनाएं',
    'login.alreadyHaveAccount': 'पहले से खाता है? साइन इन करें',
    'login.needAccount': 'खाता चाहिए? साइन अप करें',
    'login.forgotPassword': 'पासवर्ड भूल गए?',
    'login.fullName': 'पूरा नाम',
    'login.fullNamePlaceholder': 'अपना पूरा नाम दर्ज करें',
    'login.phoneNumber': 'फोन नंबर',
    'login.phoneNumberPlaceholder': 'अपना फोन नंबर दर्ज करें',
    'login.role.guardian': 'अभिभावक (माता-पिता/देखभालकर्ता)',
    'login.role.asha': 'आशा कार्यकर्ता',
    'login.role.doctor': 'डॉक्टर',
    'login.role.admin': 'प्रशासक',
  },
  bengali: {
    'login.title': 'স্বাস্থ্য শিশু',
    'login.subtitle': 'প্রতিটি শ্বাসের যত্ন',
    'login.emailOrPhone': 'ইমেইল বা ফোন',
    'login.emailOrPhonePlaceholder': 'আপনার ইমেইল বা ফোন নম্বর লিখুন',
    'login.password': 'পাসওয়ার্ড',
    'login.passwordPlaceholder': 'আপনার পাসওয়ার্ড লিখুন',
    'login.signIn': 'সাইন ইন করুন',
    'login.signUp': 'সাইন আপ করুন',
    'login.createAccount': 'অ্যাকাউন্ট তৈরি করুন',
    'login.alreadyHaveAccount': 'ইতিমধ্যে অ্যাকাউন্ট আছে? সাইন ইন করুন',
    'login.needAccount': 'অ্যাকাউন্ট দরকার? সাইন আপ করুন',
    'login.forgotPassword': 'পাসওয়ার্ড ভুলে গেছেন?',
    'login.fullName': 'পূর্ণ নাম',
    'login.fullNamePlaceholder': 'আপনার পূর্ণ নাম লিখুন',
    'login.phoneNumber': 'ফোন নম্বর',
    'login.phoneNumberPlaceholder': 'আপনার ফোন নম্বর লিখুন',
    'login.role.guardian': 'অভিভাবক (পিতা-মাতা/যত্নশীল)',
    'login.role.asha': 'আশা কর্মী',
    'login.role.doctor': 'ডাক্তার',
    'login.role.admin': 'প্রশাসক',
  },
  tamil: {
    'login.title': 'சுகாதார குழந்தை',
    'login.subtitle': 'ஒவ்வொரு மூச்சுக்கும் பராமரிப்பு',
    'login.emailOrPhone': 'மின்னஞ்சல் அல்லது தொலைபேசி',
    'login.emailOrPhonePlaceholder': 'உங்கள் மின்னஞ்சல் அல்லது தொலைபேசி எண்ணை உள்ளிடவும்',
    'login.password': 'கடவுச்சொல்',
    'login.passwordPlaceholder': 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
    'login.signIn': 'உள்நுழையவும்',
    'login.signUp': 'பதிவு செய்யவும்',
    'login.createAccount': 'கணக்கை உருவாக்கவும்',
    'login.alreadyHaveAccount': 'ஏற்கனவே கணக்கு உள்ளதா? உள்நுழையவும்',
    'login.needAccount': 'கணக்கு தேவையா? பதிவு செய்யவும்',
    'login.forgotPassword': 'கடவுச்சொல்லை மறந்துவிட்டீர்களா?',
    'login.fullName': 'முழு பெயர்',
    'login.fullNamePlaceholder': 'உங்கள் முழு பெயரை உள்ளிடவும்',
    'login.phoneNumber': 'தொலைபேசி எண்',
    'login.phoneNumberPlaceholder': 'உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்',
    'login.role.guardian': 'பாதுகாவலர் (பெற்றோர்/பராமரிப்பாளர்)',
    'login.role.asha': 'ஆஷா பணியாளர்',
    'login.role.doctor': 'மருத்துவர்',
    'login.role.admin': 'நிர்வாகி',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('english');

  const t = (key: string): string => {
    return translations[language][key] || translations.english[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 