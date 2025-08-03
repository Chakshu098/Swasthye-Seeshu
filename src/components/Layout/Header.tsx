import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDarkMode } from '../../contexts/DarkModeContext';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo size="sm" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">Swasthye Seeshu</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200">
              Home
            </Link>
            <Link to="/assessment" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200">
              Assessment
            </Link>
            <Link to="/consult" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200">
              Consult
            </Link>
            <Link to="/training" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200">
              Training
            </Link>
            <Link to="/baby-id" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200">
              Baby ID
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200">
              Contact
            </Link>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-pink-200 to-pink-300 text-pink-700 px-4 py-2 rounded-full hover:from-pink-300 hover:to-pink-400 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-pink-200 to-pink-300 text-pink-700 px-6 py-2 rounded-full hover:from-pink-300 hover:to-pink-400 transition-all duration-200 transform hover:scale-105"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-pink-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-pink-100 dark:border-gray-700">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/assessment" 
                className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Assessment
              </Link>
              <Link 
                to="/consult" 
                className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Consult
              </Link>
              <Link 
                to="/training" 
                className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Training
              </Link>
              <Link 
                to="/baby-id" 
                className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Baby ID
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Dark Mode Toggle for Mobile */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200 py-2"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-5 h-5" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
              
              {user ? (
                <div className="pt-4 border-t border-pink-100">
                  <div className="flex items-center space-x-2 py-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-gray-700 hover:text-pink-500 transition-colors duration-200 py-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-gradient-to-r from-pink-200 to-pink-300 text-pink-700 px-4 py-2 rounded-full hover:from-pink-300 hover:to-pink-400 transition-all duration-200 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;