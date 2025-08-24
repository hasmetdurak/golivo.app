import React, { useState } from 'react';
import { supportedLanguages } from '../i18n';

interface LanguageSelectorProps {
  currentLang: string;
  onLanguageChange: (langCode: string) => void;
}

// Popular languages sorted by usage (English first, then by global usage)
const popularLanguages = [
  'en', 'es', 'pt', 'fr', 'de', 'it', 'zh-CN', 'ja', 'ru', 'ar',
  'hi', 'ko', 'tr', 'nl', 'pl', 'sv', 'no', 'da', 'fi', 'cs',
  'sk', 'hu', 'ro', 'bg', 'el', 'th', 'vi', 'id', 'ms', 'fa',
  'he', 'ur', 'bn', 'ta', 'te', 'ml', 'ka', 'hy', 'az', 'kk',
  'uz', 'tk', 'ky', 'tg', 'mn', 'ps', 'ku', 'sd', 'bal', 'ug',
  'zh-TW', 'yue', 'nan', 'ko', 'ja', 'vi', 'th', 'id', 'ms', 'tl',
  'sw', 'ha', 'yo', 'am', 'om', 'so', 'ti', 'rw', 'ln', 'kg',
  'ak', 'ee', 'bm', 'ff', 'wo', 'sn', 'ny', 'to', 'sm', 'haw'
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  currentLang, 
  onLanguageChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get language objects sorted by popularity
  const sortedLanguages = [...supportedLanguages].sort((a, b) => {
    const indexA = popularLanguages.indexOf(a.code);
    const indexB = popularLanguages.indexOf(b.code);
    
    // If both languages are in our popularity list, sort by that
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    
    // If only one is in the popularity list, it comes first
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    
    // If neither is in the popularity list, sort alphabetically
    return a.name.localeCompare(b.name);
  });

  const currentLanguage = supportedLanguages.find(lang => lang.code === currentLang) || supportedLanguages[0];

  const handleLanguageChange = (langCode: string) => {
    setIsOpen(false);
    // Redirect to the appropriate subdomain
    const language = supportedLanguages.find(lang => lang.code === langCode);
    if (language) {
      const newUrl = `https://${language.subdomain}.golivo.app${window.location.pathname}${window.location.search}`;
      window.location.href = newUrl;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200 hover:bg-white transition-colors shadow-sm"
      >
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage?.nativeName || 'English'}
        </span>
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
          <div className="py-2">
            {sortedLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3 ${
                  currentLang === language.code ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
              >
                <span className="text-sm font-medium text-gray-700 flex-1">
                  {language.nativeName}
                </span>
                {/* Country code badge */}
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  {language.subdomain.toUpperCase()}
                </span>
                {currentLang === language.code && (
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};