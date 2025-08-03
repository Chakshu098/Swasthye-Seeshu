import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Chatbot from './components/GuardianChatbot/Chatbot';
import Home from './pages/Home';
import Login from './pages/Login';
import Assessment from './pages/Assessment';
import Consult from './pages/Consult';
import Training from './pages/Training';
import About from './pages/About';
import Contact from './pages/Contact';
import Emergency from './pages/Emergency';
import BabyID from './pages/BabyID';

function App() {
  return (
    <DarkModeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <Header />
              <main>
                            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/consult" element={<Consult />} />
              <Route path="/training" element={<Training />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/baby-id" element={<BabyID />} />
            </Routes>
              </main>
              <Footer />
              <Chatbot />
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </DarkModeProvider>
  );
}

export default App;