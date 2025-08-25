// Geo-location based automatic subdomain redirect system
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
  
  // Tamil
  // Uses India mapping
  
  // Telugu
  // Uses India mapping
  
  // Malayalam
  // Uses India mapping
  
  // Khmer
  'KH': 'km',
  
  // Burmese
  'MM': 'my',
  
  // Hausa (Nigeria için spesifik)
  'NG': 'ha',
  
  // Niger için Hausa da mümkün ama French öncelikli
  'NE': 'ha',
  
  // Yoruba
  // Uses Nigeria mapping
  
  // Zulu
  // Uses South Africa mapping
  
  // Amharic
  'ET': 'am',
  
  // Akan
  // Uses Ghana mapping
  
  // Quechua
  'PE': 'qu',
  
  // Aymara
  // Uses Bolivia mapping
  
  // Guarani
  'PY': 'gn',
  
  // Mapudungun
  'CL': 'arn',
  
  // Nahuatl
  'MX': 'nah'
};

// Get user's country code via IP geolocation
export const getUserCountry = async (): Promise<string | null> => {
  try {
    // Try multiple geolocation services for reliability
    const services = [
      'https://ipapi.co/country_code/',
      'https://api.country.is/',
      'https://ipinfo.io/country',
      'https://api.ipgeolocation.io/ipgeo?apiKey=free'
    ];
    
    for (const service of services) {
      try {
        const response = await fetch(service);
        const data = await response.text();
        const countryCode = data.trim().toUpperCase();
        
        if (countryCode && countryCode.length === 2) {
          return countryCode;
        }
      } catch (error) {
        console.warn(`Geolocation service failed: ${service}`, error);
        continue;
      }
    }
    
    return null;
  } catch (error) {
    console.error('All geolocation services failed:', error);
    return null;
  }
};

// Get language code from country
export const getLanguageFromCountry = (countryCode: string): string => {
  const mappedLang = countryToLanguage[countryCode.toUpperCase()];
  
  // Handle special cases for subdomain mapping
  if (mappedLang === 'in') return 'en-IN';
  if (mappedLang === 'zh-CN') return 'zh-CN';
  if (mappedLang === 'zh-TW') return 'zh-TW';
  
  return mappedLang || 'en'; // Default to English
};

// Check if redirect is needed
export const shouldRedirect = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const hostname = window.location.hostname;
  const isMainDomain = hostname === 'golivo.app' || hostname === 'www.golivo.app' || hostname === 'golivo.netlify.app';
  
  return isMainDomain;
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

// Perform redirect to appropriate subdomain
export const redirectToSubdomain = async (): Promise<void> => {
  if (!shouldRedirect()) return;
  
  // Googlebot SEO safety: Always redirect Googlebot to English version
  if (isGooglebot()) {
    const targetUrl = `https://en.golivo.app` + window.location.pathname + window.location.search;
    console.log(`Redirecting Googlebot to English version: ${targetUrl}`);
    window.location.href = targetUrl;
    return;
  }
  
  try {
    const countryCode = await getUserCountry();
    if (!countryCode) {
      // Default to Turkish if geolocation fails
      window.location.href = 'https://tr.golivo.app' + window.location.pathname + window.location.search;
      return;
    }
    
    const languageCode = getLanguageFromCountry(countryCode);
    const language = supportedLanguages.find(lang => lang.code === languageCode);
    
    if (language) {
      const targetUrl = `https://${language.subdomain}.golivo.app` + window.location.pathname + window.location.search;
      console.log(`Redirecting user from ${countryCode} to ${targetUrl}`);
      window.location.href = targetUrl;
    } else {
      // Fallback to English
      window.location.href = 'https://en.golivo.app' + window.location.pathname + window.location.search;
    }
  } catch (error) {
    console.error('Redirect failed:', error);
    // Fallback to Turkish
    window.location.href = 'https://tr.golivo.app' + window.location.pathname + window.location.search;
  }
};

// Initialize geo-redirect on app load
export const initGeoRedirect = (): void => {
  // Only run in browser and on main domain
  if (typeof window !== 'undefined' && shouldRedirect()) {
    // Add small delay to prevent too aggressive redirects
    setTimeout(() => {
      redirectToSubdomain();
    }, 100);
  }
};