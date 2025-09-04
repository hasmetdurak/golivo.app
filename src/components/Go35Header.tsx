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

  // Priority-ordered languages (English default, then major languages)
  const getPriorityOrderedLanguages = () => {
    const priorityOrder = [
      'en',      // 🇺🇸 English (Default/Official)
      'es',      // 🇪🇸 Spanish
      'pt',      // 🇵🇹 Portuguese  
      'fr',      // 🇫🇷 French
      'ru',      // 🇷🇺 Russian
      'ar',      // 🇸🇦 Arabic
      'zh-CN',   // 🇨🇳 Chinese (Simplified)
      'zh-TW',   // 🇹🇼 Chinese (Traditional)
      'de',      // 🇩🇪 German
      'it',      // 🇮🇹 Italian
      'ja',      // 🇯🇵 Japanese
      'ko',      // 🇰🇷 Korean
      'hi',      // 🇮🇳 Hindi
      'tr',      // 🇹🇷 Turkish
      'pl',      // 🇵🇱 Polish
      'nl',      // 🇳🇱 Dutch
      'sv',      // 🇸🇪 Swedish
      'no',      // 🇳🇴 Norwegian
      'fi',      // 🇫🇮 Finnish
      'da',      // 🇩🇰 Danish
      'cs',      // 🇨🇿 Czech
      'sk',      // 🇸🇰 Slovak
      'hu',      // 🇭🇺 Hungarian
      'el',      // 🇬🇷 Greek
      'ro',      // 🇷🇴 Romanian
      'bg',      // 🇧🇬 Bulgarian
      'hr',      // 🇭🇷 Croatian
      'sr',      // 🇷🇸 Serbian
      'uk',      // 🇺🇦 Ukrainian
      'he',      // 🇮🇱 Hebrew
      'fa',      // 🇮🇷 Persian
      'ur',      // 🇵🇰 Urdu
      'bn',      // 🇧🇩 Bengali
      'ta',      // 🇮🇳 Tamil
      'te',      // 🇮🇳 Telugu
      'ml',      // 🇮🇳 Malayalam
      'th',      // 🇹🇭 Thai
      'vi',      // 🇻🇳 Vietnamese
      'id',      // 🇮🇩 Indonesian
      'ms',      // 🇲🇾 Malay
      'tl',      // 🇵🇭 Filipino
      'kk',      // 🇰🇿 Kazakh
      'uz',      // 🇺🇿 Uzbek
      'az',      // 🇦🇿 Azerbaijani
      'ka',      // 🇬🇪 Georgian
      'sw',      // 🇰🇪 Swahili
      'ha',      // 🇳🇬 Hausa
      'yo',      // 🇳🇬 Yoruba
      'zu',      // 🇿🇦 Zulu
      'af',      // 🇿🇦 Afrikaans
      'am',      // 🇪🇹 Amharic
      'ak',      // 🇬🇭 Akan
      'gn',      // 🇵🇾 Guarani
      'qu',      // 🇵🇪 Quechua
      'ay',      // 🇧🇴 Aymara
      'arn',     // 🇨🇱 Mapudungun
      'nah',     // 🇲🇽 Nahuatl
      'km',      // 🇰🇭 Khmer
      'my',      // 🇲🇲 Burmese
      'et',      // 🇪🇪 Estonian
      'lv',      // 🇱🇻 Latvian
      'lt',      // 🇱🇹 Lithuanian
      'sq',      // 🇦🇱 Albanian
      'mk',      // 🇲🇰 Macedonian
      'in'       // 🇮🇳 English (India)
    ];

    const orderedLanguages = [];
    
    // Add languages in priority order
    priorityOrder.forEach(code => {
      const lang = supportedLanguages.find(l => l.code === code);
      if (lang) orderedLanguages.push(lang);
    });
    
    // Add any remaining languages not in priority list
    supportedLanguages.forEach(lang => {
      if (!priorityOrder.includes(lang.code)) {
        orderedLanguages.push(lang);
      }
    });
    
    return orderedLanguages;
  };

  const getCurrentLanguageDisplay = () => {
    const language = supportedLanguages.find(lang => lang.code === currentLang);
    return language?.code.toUpperCase() || 'EN';
  };

  const getCurrentLanguageFlag = () => {
    const flagMap: { [key: string]: string } = {
      'en': '🇺🇸', 'es': '🇪🇸', 'pt': '🇵🇹', 'fr': '🇫🇷', 'ru': '🇷🇺', 'ar': '🇸🇦',
      'zh-CN': '🇨🇳', 'zh-TW': '🇹🇼', 'de': '🇩🇪', 'it': '🇮🇹', 'ja': '🇯🇵', 'ko': '🇰🇷',
      'hi': '🇮🇳', 'tr': '🇹🇷', 'pl': '🇵🇱', 'nl': '🇳🇱', 'sv': '🇸🇪', 'no': '🇳🇴',
      'fi': '🇫🇮', 'da': '🇩🇰', 'cs': '🇨🇿', 'sk': '🇸🇰', 'hu': '🇭🇺', 'el': '🇬🇷',
      'ro': '🇷🇴', 'bg': '🇧🇬', 'hr': '🇭🇷', 'sr': '🇷🇸', 'uk': '🇺🇦', 'he': '🇮🇱',
      'fa': '🇮🇷', 'ur': '🇵🇰', 'bn': '🇧🇩', 'ta': '🇮🇳', 'te': '🇮🇳', 'ml': '🇮🇳',
      'th': '🇹🇭', 'vi': '🇻🇳', 'id': '🇮🇩', 'ms': '🇲🇾', 'tl': '🇵🇭', 'kk': '🇰🇿',
      'uz': '🇺🇿', 'az': '🇦🇿', 'ka': '🇬🇪', 'sw': '🇰🇪', 'ha': '🇳🇬', 'yo': '🇳🇬',
      'zu': '🇿🇦', 'af': '🇿🇦', 'am': '🇪🇹', 'ak': '🇬🇭', 'gn': '🇵🇾', 'qu': '🇵🇪',
      'ay': '🇧🇴', 'arn': '🇨🇱', 'nah': '🇲🇽', 'km': '🇰🇭', 'my': '🇲🇲', 'et': '🇪🇪',
      'lv': '🇱🇻', 'lt': '🇱🇹', 'sq': '🇦🇱', 'mk': '🇲🇰', 'in': '🇮🇳'
    };
    return flagMap[currentLang] || '🇺🇸';
  };

  const handleLanguageChange = (languageCode: string, subdomain: string) => {
    setIsLanguageDropdownOpen(false);
    // Redirect to subdomain
    const currentDomain = window.location.hostname;
    const baseDomain = currentDomain.includes('golivo.app') ? 'golivo.app' : 'localhost:5173';
    const newUrl = `https://${subdomain}.${baseDomain}${window.location.pathname}`;
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
                  e.currentTarget.nextElementSibling.style.display = 'flex';
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

          {/* Priority-Ordered Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <span className="text-lg">{getCurrentLanguageFlag()}</span>
              <span className="text-sm font-medium text-gray-700">{getCurrentLanguageDisplay()}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            
            {isLanguageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                <div className="p-3">
                  <div className="text-xs font-semibold text-gray-500 px-3 py-2 mb-2 bg-gray-50 rounded-lg">
                    🌍 Choose Language ({getPriorityOrderedLanguages().length} languages available)
                  </div>
                  
                  {/* Official/Default Language */}
                  <div className="mb-3">
                    <div className="text-xs font-medium text-blue-600 px-2 py-1 mb-1">🏆 Official Language</div>
                    {getPriorityOrderedLanguages().slice(0, 1).map((language) => {
                      const flagMap: { [key: string]: string } = {
                        'en': '🇺🇸', 'es': '🇪🇸', 'pt': '🇵🇹', 'fr': '🇫🇷', 'ru': '🇷🇺', 'ar': '🇸🇦',
                        'zh-CN': '🇨🇳', 'zh-TW': '🇹🇼', 'de': '🇩🇪', 'it': '🇮🇹', 'ja': '🇯🇵', 'ko': '🇰🇷',
                        'hi': '🇮🇳', 'tr': '🇹🇷', 'pl': '🇵🇱', 'nl': '🇳🇱', 'sv': '🇸🇪', 'no': '🇳🇴',
                        'fi': '🇫🇮', 'da': '🇩🇰', 'cs': '🇨🇿', 'sk': '🇸🇰', 'hu': '🇭🇺', 'el': '🇬🇷',
                        'ro': '🇷🇴', 'bg': '🇧🇬', 'hr': '🇭🇷', 'sr': '🇷🇸', 'uk': '🇺🇦', 'he': '🇮🇱',
                        'fa': '🇮🇷', 'ur': '🇵🇰', 'bn': '🇧🇩', 'ta': '🇮🇳', 'te': '🇮🇳', 'ml': '🇮🇳',
                        'th': '🇹🇭', 'vi': '🇻🇳', 'id': '🇮🇩', 'ms': '🇲🇾', 'tl': '🇵🇭', 'kk': '🇰🇿',
                        'uz': '🇺🇿', 'az': '🇦🇿', 'ka': '🇬🇪', 'sw': '🇰🇪', 'ha': '🇳🇬', 'yo': '🇳🇬',
                        'zu': '🇿🇦', 'af': '🇿🇦', 'am': '🇪🇹', 'ak': '🇬🇭', 'gn': '🇵🇾', 'qu': '🇵🇪',
                        'ay': '🇧🇴', 'arn': '🇨🇱', 'nah': '🇲🇽', 'km': '🇰🇭', 'my': '🇲🇲', 'et': '🇪🇪',
                        'lv': '🇱🇻', 'lt': '🇱🇹', 'sq': '🇦🇱', 'mk': '🇲🇰', 'in': '🇮🇳'
                      };
                      return (
                        <button
                          key={language.code}
                          onClick={() => handleLanguageChange(language.code, language.subdomain)}
                          className={`flex items-center space-x-3 w-full px-3 py-3 text-left text-sm rounded-lg transition-all duration-200 ${
                            currentLang === language.code 
                              ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200 shadow-sm' 
                              : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm'
                          }`}
                          title={`${language.nativeName} - ${language.subdomain}.golivo.app`}
                        >
                          <span className="text-lg">{flagMap[language.code] || '🌍'}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{language.nativeName}</div>
                            <div className="text-xs text-blue-600 truncate font-medium">{language.subdomain}.golivo.app</div>
                          </div>
                          {currentLang === language.code && <span className="text-blue-600">✓</span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Major Languages */}
                  <div className="mb-3">
                    <div className="text-xs font-medium text-purple-600 px-2 py-1 mb-1">🌟 Major Languages</div>
                    <div className="grid grid-cols-1 gap-1">
                      {getPriorityOrderedLanguages().slice(1, 13).map((language) => {
                        const flagMap: { [key: string]: string } = {
                          'en': '🇺🇸', 'es': '🇪🇸', 'pt': '🇵🇹', 'fr': '🇫🇷', 'ru': '🇷🇺', 'ar': '🇸🇦',
                          'zh-CN': '🇨🇳', 'zh-TW': '🇹🇼', 'de': '🇩🇪', 'it': '🇮🇹', 'ja': '🇯🇵', 'ko': '🇰🇷',
                          'hi': '🇮🇳', 'tr': '🇹🇷', 'pl': '🇵🇱', 'nl': '🇳🇱', 'sv': '🇸🇪', 'no': '🇳🇴',
                          'fi': '🇫🇮', 'da': '🇩🇰', 'cs': '🇨🇿', 'sk': '🇸🇰', 'hu': '🇭🇺', 'el': '🇬🇷',
                          'ro': '🇷🇴', 'bg': '🇧🇬', 'hr': '🇭🇷', 'sr': '🇷🇸', 'uk': '🇺🇦', 'he': '🇮🇱',
                          'fa': '🇮🇷', 'ur': '🇵🇰', 'bn': '🇧🇩', 'ta': '🇮🇳', 'te': '🇮🇳', 'ml': '🇮🇳',
                          'th': '🇹🇭', 'vi': '🇻🇳', 'id': '🇮🇩', 'ms': '🇲🇾', 'tl': '🇵🇭', 'kk': '🇰🇿',
                          'uz': '🇺🇿', 'az': '🇦🇿', 'ka': '🇬🇪', 'sw': '🇰🇪', 'ha': '🇳🇬', 'yo': '🇳🇬',
                          'zu': '🇿🇦', 'af': '🇿🇦', 'am': '🇪🇹', 'ak': '🇬🇭', 'gn': '🇵🇾', 'qu': '🇵🇪',
                          'ay': '🇧🇴', 'arn': '🇨🇱', 'nah': '🇲🇽', 'km': '🇰🇭', 'my': '🇲🇲', 'et': '🇪🇪',
                          'lv': '🇱🇻', 'lt': '🇱🇹', 'sq': '🇦🇱', 'mk': '🇲🇰', 'in': '🇮🇳'
                        };
                        return (
                          <button
                            key={language.code}
                            onClick={() => handleLanguageChange(language.code, language.subdomain)}
                            className={`flex items-center space-x-3 w-full px-3 py-2 text-left text-sm rounded-lg transition-all duration-200 ${
                              currentLang === language.code 
                                ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200 shadow-sm' 
                                : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm'
                            }`}
                            title={`${language.nativeName} - ${language.subdomain}.golivo.app`}
                          >
                            <span className="text-base">{flagMap[language.code] || '🌍'}</span>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{language.nativeName}</div>
                              <div className="text-xs text-gray-500 truncate">{language.subdomain}.golivo.app</div>
                            </div>
                            {currentLang === language.code && <span className="text-blue-600">✓</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* All Other Languages */}
                  <div>
                    <div className="text-xs font-medium text-gray-600 px-2 py-1 mb-1">🌍 All Languages</div>
                    <div className="grid grid-cols-2 gap-1">
                      {getPriorityOrderedLanguages().slice(13).map((language) => {
                        const flagMap: { [key: string]: string } = {
                          'en': '🇺🇸', 'es': '🇪🇸', 'pt': '🇵🇹', 'fr': '🇫🇷', 'ru': '🇷🇺', 'ar': '🇸🇦',
                          'zh-CN': '🇨🇳', 'zh-TW': '🇹🇼', 'de': '🇩🇪', 'it': '🇮🇹', 'ja': '🇯🇵', 'ko': '🇰🇷',
                          'hi': '🇮🇳', 'tr': '🇹🇷', 'pl': '🇵🇱', 'nl': '🇳🇱', 'sv': '🇸🇪', 'no': '🇳🇴',
                          'fi': '🇫🇮', 'da': '🇩🇰', 'cs': '🇨🇿', 'sk': '🇸🇰', 'hu': '🇭🇺', 'el': '🇬🇷',
                          'ro': '🇷🇴', 'bg': '🇧🇬', 'hr': '🇭🇷', 'sr': '🇷🇸', 'uk': '🇺🇦', 'he': '🇮🇱',
                          'fa': '🇮🇷', 'ur': '🇵🇰', 'bn': '🇧🇩', 'ta': '🇮🇳', 'te': '🇮🇳', 'ml': '🇮🇳',
                          'th': '🇹🇭', 'vi': '🇻🇳', 'id': '🇮🇩', 'ms': '🇲🇾', 'tl': '🇵🇭', 'kk': '🇰🇿',
                          'uz': '🇺🇿', 'az': '🇦🇿', 'ka': '🇬🇪', 'sw': '🇰🇪', 'ha': '🇳🇬', 'yo': '🇳🇬',
                          'zu': '🇿🇦', 'af': '🇿🇦', 'am': '🇪🇹', 'ak': '🇬🇭', 'gn': '🇵🇾', 'qu': '🇵🇪',
                          'ay': '🇧🇴', 'arn': '🇨🇱', 'nah': '🇲🇽', 'km': '🇰🇭', 'my': '🇲🇲', 'et': '🇪🇪',
                          'lv': '🇱🇻', 'lt': '🇱🇹', 'sq': '🇦🇱', 'mk': '🇲🇰', 'in': '🇮🇳'
                        };
                        return (
                          <button
                            key={language.code}
                            onClick={() => handleLanguageChange(language.code, language.subdomain)}
                            className={`flex items-center space-x-2 w-full px-2 py-2 text-left text-xs rounded-md transition-all duration-200 ${
                              currentLang === language.code 
                                ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200' 
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                            title={`${language.nativeName} - ${language.subdomain}.golivo.app`}
                          >
                            <span className="text-sm">{flagMap[language.code] || '🌍'}</span>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate text-xs">{language.nativeName}</div>
                              <div className="text-xs text-gray-500 truncate">{language.subdomain}.golivo.app</div>
                            </div>
                            {currentLang === language.code && <span className="text-blue-600 text-xs">✓</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};