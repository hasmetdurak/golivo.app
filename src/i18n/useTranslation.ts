import { useEffect, useState } from 'react';
import { getCurrentLanguage, getTranslations, type Translations } from './index';

export const useTranslation = () => {
  const [currentLang, setCurrentLang] = useState<string>('en');
  const [t, setT] = useState<Translations>(getTranslations('en'));

  useEffect(() => {
    const updateLanguage = () => {
      const lang = getCurrentLanguage();
      console.log('🌍 Current subdomain language detected:', lang);
      setCurrentLang(lang);
      setT(getTranslations(lang));
    };

    // Initial language detection
    updateLanguage();

    // Listen for URL changes (for SPA navigation)
    const handleLocationChange = () => {
      updateLanguage();
    };

    // Add event listeners for navigation
    window.addEventListener('popstate', handleLocationChange);
    
    // Use a less aggressive approach for detecting URL changes
    // Instead of overriding pushState/replaceState, we'll use a MutationObserver
    // to detect when the URL changes
    let lastUrl = location.href;
    const observer = new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        handleLocationChange();
      }
    });
    
    observer.observe(document, { subtree: true, childList: true });

    // Check periodically for URL changes as a fallback
    const interval = setInterval(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        handleLocationChange();
      }
    }, 1000);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return { t, currentLang };
};