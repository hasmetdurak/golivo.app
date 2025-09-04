import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { supportedLanguages } from '../i18n';
import { BarChart3, TrendingUp } from 'lucide-react';

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


## 🎯 Patron, Mükemmel! Go35.vercel.app Sitesini Referans Alıyorum!

### 🔍 **Referans Site Analizi:**

**Go35.vercel.app'den gördüğüm özellikler:** <mcreference link="https://go35.vercel.app/" index="0">0</mcreference>
- 🟣 **GoLivo** branding
- ⚽ **Scores** bölümü
- 📰 **News** bölümü  
- 📊 **Analysis** bölümü
- 📞 **Contact Us** bölümü
- 🎨 Modern, temiz tasarım

### 🚀 **Sitenizi Aynı Şekilde Düzenliyorum:**

**1. Header Navigation Güncelleme:**
```typescript
import React from 'react';
import { BarChart3, Newspaper, Phone } from 'lucide-react';

interface Go35HeaderProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
}

export const Go35Header: React.FC<Go35HeaderProps> = ({ currentView = 'scores', onViewChange }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* GoLivo Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">GoLivo</h1>
              <p className="text-xs text-gray-500">Live Football Scores</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => onViewChange?.('scores')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentView === 'scores'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Scores
            </button>
            <button
              onClick={() => onViewChange?.('news')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                currentView === 'news'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>News</span>
            </button>
            <button
              onClick={() => onViewChange?.('analysis')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                currentView === 'analysis'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analysis</span>
            </button>
            <button
              onClick={() => onViewChange?.('contact')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                currentView === 'contact'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Contact Us</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};