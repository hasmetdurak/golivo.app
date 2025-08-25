// Geo-location based automatic subdomain redirect system - DISABLED
import { supportedLanguages } from '../i18n/index';

// Language mapping by country codes (ISO 3166-1 alpha-2)
const countryToLanguage: Record<string, string> = {
  // Turkish
  'TR': 'tr',
  
  // English
  'US': 'en', 'GB': 'en', 'AU': 'en', 'NZ': 'en', 'IE': 'en',
  'ZA': 'en', 'GH': 'en', 'UG': 'en',
  
  // English (India)
  'IN': 'in', 'LK': 'in',
  
  // German  
  'DE': 'de', 'AT': 'de', 'LI': 'de',
  
  // Spanish
  'ES': 'es', 'AR': 'es', 'CO': 'es', 'VE': 'es', 
  'GT': 'es', 'CU': 'es', 'DO': 'es',
  'HN': 'es', 'SV': 'es', 'NI': 'es', 'CR': 'es', 'PA': 'es',
  'UY': 'es', 'GQ': 'es',
  
  // Portuguese
  'PT': 'pt', 'BR': 'pt', 'AO': 'pt', 'MZ': 'pt', 'GW': 'pt', 'CV': 'pt',
  'ST': 'pt', 'TL': 'pt',
  
  // French
  'FR': 'fr', 'BE': 'fr', 'LU': 'fr', 'MC': 'fr',
  'SN': 'fr', 'ML': 'fr', 'BF': 'fr', 'CI': 'fr', 'GN': 'fr',
  'TD': 'fr', 'CF': 'fr', 'CM': 'fr', 'GA': 'fr', 'CG': 'fr',
  'DJ': 'fr', 'KM': 'fr', 'MG': 'fr', 'SC': 'fr', 'VU': 'fr', 'NC': 'fr',
  'PF': 'fr', 'WF': 'fr',
  
  // Italian
  'IT': 'it', 'SM': 'it', 'VA': 'it',
  
  // Japanese
  'JP': 'ja',
  
  // Korean
  'KR': 'ko', 'KP': 'ko',
  
  // Chinese (Simplified)
  'CN': 'zh-CN', 'SG': 'zh-CN',
  
  // Chinese (Traditional)
  'TW': 'zh-TW', 'HK': 'zh-TW', 'MO': 'zh-TW',
  
  // Russian
  'RU': 'ru', 'BY': 'ru', 'KG': 'ru', 'TJ': 'ru',
  'TM': 'ru', 'AM': 'ru', 'MD': 'ru',
  
  // Polish
  'PL': 'pl',
  
  // Persian/Farsi
  'IR': 'fa', 'AF': 'fa',
  
  // Vietnamese
  'VN': 'vi',
  
  // Kazakh
  'KZ': 'kk',
  
  // Filipino/Tagalog
  'PH': 'tl',
  
  // Swahili
  'TZ': 'sw', 'KE': 'sw', 'RW': 'sw', 'BI': 'sw',
  
  // Arabic
  'SA': 'ar', 'AE': 'ar', 'QA': 'ar', 'KW': 'ar', 'BH': 'ar', 'OM': 'ar',
  'JO': 'ar', 'LB': 'ar', 'SY': 'ar', 'IQ': 'ar', 'YE': 'ar', 'LY': 'ar',
  'EG': 'ar', 'SD': 'ar', 'MA': 'ar', 'TN': 'ar', 'DZ': 'ar', 'MR': 'ar',
  
  // Indonesian
  'ID': 'id',
  
  // Thai
  'TH': 'th',
  
  // Bengali
  'BD': 'bn',
  
  // Urdu
  'PK': 'ur',
  
  // Dutch
  'NL': 'nl', 'SR': 'nl',
  
  // Swedish
  'SE': 'sv',
  
  // Norwegian
  'NO': 'no',
  
  // Finnish
  'FI': 'fi',
  
  // Czech
  'CZ': 'cs',
  
  // Romanian
  'RO': 'ro',
  
  // Greek
  'GR': 'el', 'CY': 'el',
  
  // Hungarian
  'HU': 'hu',
  
  // Bulgarian
  'BG': 'bg',
  
  // Serbian
  'RS': 'sr', 'ME': 'sr', 'BA': 'sr',
  
  // Croatian
  'HR': 'hr',
  
  // Slovak
  'SK': 'sk',
  
  // Estonian
  'EE': 'et',
  
  // Latvian
  'LV': 'lv',
  
  // Lithuanian
  'LT': 'lt',
  
  // Hebrew
  'IL': 'he',
  
  // Malay
  'MY': 'ms', 'BN': 'ms',
  
  // Azerbaijani
  'AZ': 'az',
  
  // Georgian
  'GE': 'ka',
  
  // Ukrainian
  'UA': 'uk',
  
  // Uzbek
  'UZ': 'uz',
  
  // Khmer
  'KH': 'km',
  
  // Burmese
  'MM': 'my',
  
  // Hausa (Nigeria için spesifik)
  'NG': 'ha',
  
  // Niger için Hausa da mümkün ama French öncelikli
  'NE': 'ha',
  
  // Amharic
  'ET': 'am',
  
  // Quechua
  'PE': 'qu',
  
  // Guarani
  'PY': 'gn',
  
  // Mapudungun
  'CL': 'arn',
  
  // Nahuatl
  'MX': 'nah'
};

// Get user's country code via IP geolocation - DISABLED
export const getUserCountry = async (): Promise<string | null> => {
  // GeoIP completely disabled
  return null;
};

// Get language code from country - DISABLED
export const getLanguageFromCountry = (countryCode: string): string => {
  return 'en'; // Always default to English
};

// Check if redirect is needed - DISABLED
export const shouldRedirect = (): boolean => {
  // GeoIP redirect completely disabled
  return false;
};

// Get current subdomain language
export const getCurrentSubdomain = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  
  if (parts.length >= 2) {
    const subdomain = parts[0];
    const language = supportedLanguages.find(lang => lang.subdomain === subdomain);
    if (language) {
      return language.code;
    }
  }
  
  return null;
};

// Check if user agent is Googlebot
export const isGooglebot = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  return userAgent.includes('googlebot');
};

// Perform redirect to appropriate subdomain - DISABLED
export const redirectToSubdomain = async (): Promise<void> => {
  // GeoIP redirect completely disabled
  return;
};

// Initialize geo-redirect on app load - DISABLED
export const initGeoRedirect = (): void => {
  // GeoIP redirect completely disabled
  console.log('🌍 GeoIP redirect disabled - using manual language selection');
};

// Save user's manual language selection
export const saveUserLanguage = (languageCode: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('golivo-language', languageCode);
    console.log('🌍 User language saved:', languageCode);
  }
};

// Get user's saved language
export const getUserLanguage = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('golivo-language');
  }
  return null;
};