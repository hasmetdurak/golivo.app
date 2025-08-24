import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { supportedLanguages, getLanguageUrl, type Language } from '../i18n/index';

interface LanguageSelectorProps {
  currentLang: string;
  onLanguageChange?: (langCode: string) => void;
}

// Country flag emojis for popular languages
const getFlagEmoji = (langCode: string): string => {
  const flagMap: Record<string, string> = {
    'tr': '🇹🇷', 'en': '🇬🇧', 'de': '🇩🇪', 'es': '🇪🇸', 'pt': '🇵🇹', 
    'fr': '🇫🇷', 'it': '🇮🇹', 'ja': '🇯🇵', 'ko': '🇰🇷', 'zh-CN': '🇨🇳',
    'zh-TW': '🇹🇼', 'hi': '🇮🇳', 'ru': '🇷🇺', 'pl': '🇵🇱', 'fa': '🇮🇷',
    'vi': '🇻🇳', 'kk': '🇰🇿', 'tl': '🇵🇭', 'sw': '🇹🇿', 'en-IN': '🇮🇳',
    'nl': '🇳🇱', 'cs': '🇨🇿', 'sk': '🇸🇰', 'hu': '🇭🇺', 'el': '🇬🇷',
    'ro': '🇷🇴', 'bg': '🇧🇬', 'sr': '🇷🇸', 'hr': '🇭🇷', 'uk': '🇺🇦',
    'bn': '🇧🇩', 'ur': '🇵🇰', 'ta': '🇮🇳', 'te': '🇮🇳', 'ml': '🇮🇳',
    'id': '🇮🇩', 'ms': '🇲🇾', 'th': '🇹🇭', 'km': '🇰🇭', 'my': '🇲🇲',
    'ha': '🇳🇬', 'yo': '🇳🇬', 'zu': '🇿🇦', 'am': '🇪🇹', 'ak': '🇬🇭',
    'gn': '🇵🇾', 'qu': '🇵🇪', 'ay': '🇧🇴', 'arn': '🇨🇱', 'nah': '🇲🇽',
    'sv': '🇸🇪', 'no': '🇳🇴', 'fi': '🇫🇮', 'et': '🇪🇪', 'lv': '🇱🇻',
    'lt': '🇱🇹', 'he': '🇮🇱', 'ar': '🇸🇦', 'az': '🇦🇿', 'ka': '🇬🇪',
    'uz': '🇺🇿', 'af': '🇿🇦', 'sq': '🇦🇱', 'mk': '🇲🇰'
  };
  
  return flagMap[langCode] || '🌍';
};

// Get most popular languages for quick access
const getPopularLanguages = (): Language[] => {
  const popularCodes = ['tr', 'en', 'de', 'es', 'pt', 'fr', 'it', 'ja', 'ru', 'ar', 'zh-CN', 'hi'];
  return supportedLanguages.filter(lang => popularCodes.includes(lang.code));
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  currentLang, 
  onLanguageChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage = supportedLanguages.find(lang => lang.code === currentLang);
  const popularLanguages = getPopularLanguages();
  const otherLanguages = supportedLanguages.filter(lang => 
    !popularLanguages.some(pop => pop.code === lang.code)
  );

  const handleLanguageSelect = (langCode: string) => {
    console.log('🌍 Language selected:', langCode);
    
    // If onLanguageChange is provided, use it (for manual changes)
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
    
    // Always redirect to the appropriate subdomain
    const targetUrl = getLanguageUrl(langCode);
    const currentPath = window.location.pathname + window.location.search;
    const fullUrl = targetUrl + currentPath;
    
    console.log('🌍 Redirecting to:', fullUrl);
    window.location.href = fullUrl;
    
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Current Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        title={`Current: ${currentLanguage?.nativeName || 'English'}`}
      >
        <span className="text-lg">{getFlagEmoji(currentLang)}</span>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {currentLanguage?.code.toUpperCase() || 'EN'}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Dil Seçin / Select Language</h3>
              </div>
              <p className="text-xs text-gray-600 mt-1">Site otomatik olarak seçilen subdomaine yönlendirilecek</p>
            </div>

            {/* Popular Languages */}
            <div className="p-3">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                🔥 Popüler Diller / Popular
              </h4>
              <div className="grid grid-cols-2 gap-1">
                {popularLanguages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    className={`flex items-center space-x-2 p-2 rounded-lg text-left hover:bg-gray-100 transition-colors ${
                      currentLang === language.code ? 'bg-blue-50 border border-blue-200' : ''
                    }`}
                  >
                    <span className="text-base">{getFlagEmoji(language.code)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {language.nativeName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {language.subdomain}.golivo.app
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Other Languages */}
            <div className="p-3 border-t border-gray-100">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                🌍 Diğer Diller / Other Languages
              </h4>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {otherLanguages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    className={`w-full flex items-center space-x-2 p-2 rounded-lg text-left hover:bg-gray-100 transition-colors ${
                      currentLang === language.code ? 'bg-blue-50 border border-blue-200' : ''
                    }`}
                  >
                    <span className="text-sm">{getFlagEmoji(language.code)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {language.nativeName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {language.name} • {language.subdomain}.golivo.app
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
              <p className="text-xs text-gray-600 text-center">
                50+ dil desteği ile global futbol deneyimi
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};