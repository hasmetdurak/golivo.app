import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { supportedLanguages } from '../i18n';

interface Go35HeaderProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
}

export const Go35Header: React.FC<Go35HeaderProps> = ({ currentView = 'scores', onViewChange }) => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { currentLang } = useTranslation();

  const getCurrentLanguageDisplay = () => {
    const language = supportedLanguages.find(lang => lang.code === currentLang);
    return language?.code.toUpperCase() || 'EN';
  };

  const getCurrentLanguageFlag = () => {
    const flagMap: { [key: string]: string } = {
      'en': '🇺🇸',
      'tr': '🇹🇷',
      'de': '🇩🇪',
      'es': '🇪🇸',
      'fr': '🇫🇷',
      'it': '🇮🇹',
      'pt': '🇵🇹',
      'ru': '🇷🇺',
      'ar': '🇸🇦',
    };
    return flagMap[currentLang] || '🇺🇸';
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                G
              </div>
              <span className="text-xl font-bold text-gray-900">GoLivo</span>
            </a>
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onViewChange?.('scores')}
              className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                currentView === 'scores' ? 'text-gray-900' : 'text-gray-600'
              }`}
            >
              Scores
            </button>
            <button
              onClick={() => onViewChange?.('news')}
              className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                currentView === 'news' ? 'text-gray-900' : 'text-gray-600'
              }`}
            >
              News
            </button>
            <button
              onClick={() => onViewChange?.('analysis')}
              className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                currentView === 'analysis' ? 'text-gray-900' : 'text-gray-600'
              }`}
            >
              Analysis
            </button>
            <button
              onClick={() => onViewChange?.('contact')}
              className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                currentView === 'contact' ? 'text-gray-900' : 'text-gray-600'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm">{getCurrentLanguageFlag()}</span>
              <span className="text-sm font-medium text-gray-700">{getCurrentLanguageDisplay()}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            
            {isLanguageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  {supportedLanguages.slice(0, 6).map((language) => {
                    const flagMap: { [key: string]: string } = {
                      'en': '🇺🇸',
                      'tr': '🇹🇷',
                      'de': '🇩🇪',
                      'es': '🇪🇸',
                      'fr': '🇫🇷',
                      'it': '🇮🇹',
                    };
                    return (
                      <button
                        key={language.code}
                        onClick={() => {
                          setIsLanguageDropdownOpen(false);
                          window.location.reload();
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <span>{flagMap[language.code] || '🌍'}</span>
                        <span>{language.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};