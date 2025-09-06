import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { supportedLanguages, Language } from '../i18n';

interface Go35HeaderProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
}

export const Go35Header: React.FC<Go35HeaderProps> = ({ currentView = 'scores', onViewChange }) => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { currentLang } = useTranslation();

  const getCurrentLanguageDisplay = () => {
    const language = supportedLanguages.find(lang => lang.code === currentLang);
    return language?.nativeName || 'English';
  };

  const getLanguageCode = (langCode: string) => {
    // Custom mappings for special cases
    const codeMap: { [key: string]: string } = {
      'zh-CN': 'CN',
      'zh-TW': 'TW',
      'en-IN': 'IN'
    };
    
    if (codeMap[langCode]) {
      return codeMap[langCode];
    }
    
    // For standard language codes, take first 2 characters and uppercase
    return langCode.slice(0, 2).toUpperCase();
  };

  const getCurrentLanguageFlag = () => {
    return getLanguageCode(currentLang);
  };

  const handleLanguageChange = (languageCode: string, subdomain: string) => {
    setIsLanguageDropdownOpen(false);
    
    // Save language preference to localStorage
    localStorage.setItem('golivo-language', languageCode);
    
    const currentDomain = window.location.hostname;
    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;
    
    // Development environment check
    if (currentDomain.includes('localhost') || currentDomain.includes('127.0.0.1')) {
      // For development, use URL parameter instead of subdomain
      const url = new URL(window.location.href);
      url.searchParams.set('lang', languageCode);
      window.location.href = url.toString();
      return;
    }
    
    // Production environment - use subdomain routing
    const baseDomain = currentDomain.includes('golivo.app') ? 'golivo.app' : 'golivo.app';
    const newUrl = `https://${subdomain}.${baseDomain}${currentPath}${currentSearch}`;
    
    console.log('🌍 Redirecting to:', newUrl);
    window.location.href = newUrl;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img 
                src="/golivo-logo.svg" 
                alt="GoLivo Logo" 
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = 'flex';
                  }
                }}
              />
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg" style={{display: 'none'}}>
                ⚽
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">GoLivo</span>
                <span className="text-xs text-gray-500 -mt-1">Live Football Scores</span>
              </div>
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
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <div className="w-8 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-white">{getCurrentLanguageFlag()}</span>
              </div>
              <span className="text-sm font-medium text-gray-700">{getCurrentLanguageDisplay()}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            
            {isLanguageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
                <div className="py-2">
                  {supportedLanguages.map((language) => {
                    return (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code, language.subdomain)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3 ${
                          currentLang === language.code ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                        }`}
                      >
                        <div className="w-8 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center shadow-sm">
                          <span className="text-xs font-bold text-white">{getLanguageCode(language.code)}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-700 flex-1">
                          {language.nativeName}
                        </span>
                        {currentLang === language.code && (
                          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
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