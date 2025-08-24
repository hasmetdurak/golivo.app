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

    // Initial load
    updateLanguage();
    
    // Listen for URL changes (in case of programmatic navigation)
    const handleLocationChange = () => {
      setTimeout(updateLanguage, 100);
    };
    
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const changeLanguage = (langCode: string) => {
    console.log('🌍 Manually changing language to:', langCode);
    setCurrentLang(langCode);
    setT(getTranslations(langCode));
  };

  return { t, currentLang, changeLanguage };
};