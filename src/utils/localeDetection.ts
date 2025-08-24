// src/utils/localeDetection.ts
// =======================================================
// GOLIVO • Browser-Compatible Locale Detection
// Adapted from Next.js patterns for Vite/React
// =======================================================

import { supportedLanguages } from '../i18n/index';

/**
 * Detect best locale from browser's language preferences
 * Browser-compatible alternative to Next.js Negotiator
 */
export function getLocaleFromBrowser(): string {
  if (typeof navigator === 'undefined') {
    return 'en'; // SSR fallback
  }

  // Get user's language preferences
  const languages = navigator.languages || [navigator.language || 'en'];
  const supportedCodes = supportedLanguages.map(l => l.code);
  
  // Find best match using simple preference order
  for (const lang of languages) {
    // Handle full locale codes like 'en-US' -> 'en'
    const code = lang.split('-')[0].toLowerCase();
    
    if (supportedCodes.includes(code)) {
      return code;
    }
    
    // Check exact match including region
    if (supportedCodes.includes(lang.toLowerCase())) {
      return lang.toLowerCase();
    }
  }
  
  return 'en'; // Default fallback
}

/**
 * Extract locale from URL pathname
 * Examples: '/tr/leagues' -> 'tr', '/betting-sites' -> 'en' 
 */
export function getLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  const supportedCodes = supportedLanguages.map(l => l.code);
  
  return supportedCodes.includes(firstSegment) ? firstSegment : 'en';
}

/**
 * Determine if current URL contains a locale prefix
 */
export function hasLocalePrefix(pathname: string): boolean {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  const supportedCodes = supportedLanguages.map(l => l.code);
  
  return supportedCodes.includes(firstSegment);
}

/**
 * Remove locale prefix from pathname
 * Examples: '/tr/leagues' -> '/leagues', '/en/betting-sites' -> '/betting-sites'
 */
export function removeLocalePrefix(pathname: string): string {
  if (!hasLocalePrefix(pathname)) {
    return pathname;
  }
  
  const segments = pathname.split('/').filter(Boolean);
  segments.shift(); // Remove first segment (locale)
  return '/' + segments.join('/');
}

/**
 * Add locale prefix to pathname
 * Examples: ('/leagues', 'tr') -> '/tr/leagues'
 */
export function addLocalePrefix(pathname: string, locale: string): string {
  const cleanPath = removeLocalePrefix(pathname);
  return `/${locale}${cleanPath}`;
}

/**
 * Negotiate best locale from Accept-Language header (for SSR/API)
 * Browser-compatible implementation
 */
export function negotiateLocale(acceptLanguage?: string): string {
  if (!acceptLanguage) {
    return getLocaleFromBrowser();
  }
  
  // Parse Accept-Language header: "en-US,en;q=0.9,tr;q=0.8"
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q = 'q=1'] = lang.trim().split(';');
      const quality = parseFloat(q.split('=')[1] || '1');
      return { code: code.split('-')[0].toLowerCase(), quality };
    })
    .sort((a, b) => b.quality - a.quality);
  
  const supportedCodes = supportedLanguages.map(l => l.code);
  
  for (const { code } of languages) {
    if (supportedCodes.includes(code)) {
      return code;
    }
  }
  
  return 'en';
}

/**
 * Get language configuration by code
 */
export function getLanguageConfig(code: string) {
  return supportedLanguages.find(l => l.code === code) || supportedLanguages.find(l => l.code === 'en');
}

/**
 * Check if a locale is supported
 */
export function isLocaleSupported(locale: string): boolean {
  const supportedCodes = supportedLanguages.map(l => l.code);
  return supportedCodes.includes(locale);
}

/**
 * Get subdomain for a given locale
 * Examples: 'tr' -> 'tr', 'en' -> 'www'
 */
export function getSubdomainForLocale(locale: string): string {
  const lang = getLanguageConfig(locale);
  return lang?.subdomain || 'www';
}

/**
 * Build full URL with proper subdomain for locale
 */
export function buildLocalizedURL(pathname: string, locale: string, domain: string = 'golivo.app'): string {
  const subdomain = getSubdomainForLocale(locale);
  const cleanPath = removeLocalePrefix(pathname);
  return `https://${subdomain}.${domain}${cleanPath}`;
}

/**
 * Get all supported locale codes
 */
export function getSupportedLocales(): string[] {
  return supportedLanguages.map(l => l.code);
}

/**
 * React hook for locale detection and management
 */
export function useLocaleDetection() {
  const currentLocale = getLocaleFromPath(window.location.pathname) || getLocaleFromBrowser();
  const currentLanguage = getLanguageConfig(currentLocale);
  
  const switchLocale = (newLocale: string) => {
    if (!isLocaleSupported(newLocale)) {
      console.warn(`Locale ${newLocale} is not supported`);
      return;
    }
    
    const newURL = buildLocalizedURL(window.location.pathname, newLocale);
    window.location.href = newURL;
  };
  
  return {
    currentLocale,
    currentLanguage,
    switchLocale,
    isSupported: isLocaleSupported,
    getSupportedLocales,
  };
}

/**
 * Locale detection middleware for React Router
 */
export function createLocaleMiddleware() {
  return (pathname: string) => {
    const detectedLocale = getLocaleFromBrowser();
    
    // If no locale prefix and it's not the default locale, redirect
    if (!hasLocalePrefix(pathname) && detectedLocale !== 'en') {
      return addLocalePrefix(pathname, detectedLocale);
    }
    
    return pathname;
  };
}