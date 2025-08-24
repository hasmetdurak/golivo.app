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
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function() {
      originalPushState.apply(history, arguments as any);
      setTimeout(handleLocationChange, 0);
    };

    history.replaceState = function() {
      originalReplaceState.apply(history, arguments as any);
      setTimeout(handleLocationChange, 0);
    };

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  return { t, currentLang };
};