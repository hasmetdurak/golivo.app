import React, { useState } from 'react';
import { Trophy, Calendar, ChevronLeft, ChevronRight, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { supportedLanguages, getCurrentLanguage, getLanguageUrl } from '../i18n';

interface NewHeaderProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  currentView?: string;
  onViewChange?: (view: string) => void;
}

export function NewHeader({ selectedDate, onDateChange, currentView = 'scores', onViewChange }: NewHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const changeDate = (days: number) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + days);
    onDateChange(currentDate.toISOString().split('T')[0]);
  };

  const goToToday = () => {
    onDateChange(new Date().toISOString().split('T')[0]);
  };

  const languages = supportedLanguages;
  const currentLang = languages.find((lang: any) => lang.code === currentLanguage) || languages[0];

  const handleLanguageChange = (lang: any) => {
    setCurrentLanguage(lang.code);
    const targetUrl = getLanguageUrl(lang.code);
    window.location.href = targetUrl;
  };

  return (
    <>
      {/* Modern Header - Referans tasarıma uygun */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-sm"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-gray-900">
                  GoLivo
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => onViewChange?.('scores')}
                className={`text-sm font-medium transition-colors duration-200 py-2 ${
                  currentView === 'scores' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Scores
              </button>
              <button 
                onClick={() => onViewChange?.('news')}
                className={`text-sm font-medium transition-colors duration-200 py-2 ${
                  currentView === 'news' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                News
              </button>
              <button 
                onClick={() => onViewChange?.('analysis')}
                className={`text-sm font-medium transition-colors duration-200 py-2 ${
                  currentView === 'analysis' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Analysis
              </button>
              <button 
                onClick={() => onViewChange?.('contact')}
                className={`text-sm font-medium transition-colors duration-200 py-2 ${
                  currentView === 'contact' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Contact Us
              </button>
            </nav>

            {/* Right Section - Language + Mobile Menu */}
            <div className="flex items-center space-x-4">
              
              {/* Language Selector */}
              <div className="hidden sm:block">
                <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <Globe className="h-4 w-4" />
                  <span>{currentLang.code.toUpperCase()}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <nav className="px-4 py-6 space-y-4">
              <button 
                onClick={() => { onViewChange?.('scores'); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left py-3 px-4 text-base font-medium rounded-lg transition-colors ${
                  currentView === 'scores' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Scores
              </button>
              <button 
                onClick={() => { onViewChange?.('news'); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left py-3 px-4 text-base font-medium rounded-lg transition-colors ${
                  currentView === 'news' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                News
              </button>
              <button 
                onClick={() => { onViewChange?.('analysis'); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left py-3 px-4 text-base font-medium rounded-lg transition-colors ${
                  currentView === 'analysis' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Analysis
              </button>
              <button 
                onClick={() => { onViewChange?.('contact'); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left py-3 px-4 text-base font-medium rounded-lg transition-colors ${
                  currentView === 'contact' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Contact Us
              </button>
              
              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-gray-200">
                <button className="flex items-center space-x-2 w-full px-4 py-3 text-base font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <Globe className="h-5 w-5" />
                  <span>{currentLang.code.toUpperCase()}</span>
                  <ChevronDown className="h-5 w-5 ml-auto" />
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Date Navigation - Sadece scores view'da göster */}
      {currentView === 'scores' && (
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <button
                onClick={() => changeDate(-1)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <div className="text-center">
                <button
                  onClick={goToToday}
                  className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
                >
                  {formatDate(selectedDate)}
                </button>
              </div>
              
              <button
                onClick={() => changeDate(1)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}