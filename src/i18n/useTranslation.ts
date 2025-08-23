import { useEffect, useState } from 'react';
import { getCurrentLanguage, getTranslations, type Translations } from './index';

export const useTranslation = () => {
  const [currentLang, setCurrentLang] = useState<string>('tr');
  const [t, setT] = useState<Translations>(getTranslations('tr'));

  useEffect(() => {
    const lang = getCurrentLanguage();
    setCurrentLang(lang);
    setT(getTranslations(lang));
  }, []);

  return { t, currentLang };
};