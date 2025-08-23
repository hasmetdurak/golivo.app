// Multi-language support system for golivo.app
// Supports 20 languages with geo-IP based subdomain routing

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  subdomain: string;
  rtl?: boolean;
}

export const supportedLanguages: Language[] = [
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', subdomain: 'tr' },
  { code: 'en', name: 'English', nativeName: 'English', subdomain: 'en' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', subdomain: 'de' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', subdomain: 'es' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', subdomain: 'pt' },
  { code: 'fr', name: 'French', nativeName: 'Français', subdomain: 'fr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', subdomain: 'it' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', subdomain: 'ja' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', subdomain: 'ko' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文', subdomain: 'cn' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', subdomain: 'tw' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', subdomain: 'hi' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', subdomain: 'ru' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', subdomain: 'pl' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', subdomain: 'fa', rtl: true },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', subdomain: 'vi' },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақша', subdomain: 'kk' },
  { code: 'tl', name: 'Filipino', nativeName: 'Filipino', subdomain: 'tl' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', subdomain: 'sw' },
  { code: 'en-IN', name: 'English (India)', nativeName: 'English (India)', subdomain: 'in' }
];

export interface Translations {
  live: string;
  finished: string;
  scheduled: string;
  matches: string;
  leagues: string;
  today: string;
  homeTeam: string;
  awayTeam: string;
  halfTime: string;
  matchEvents: string;
  matchDetails: string;
  statistics: string;
  close: string;
  noMatches: string;
  checkLater: string;
  liveMatch: string;
  matchesCount: string;
  appTitle: string;
  todaysMatches: string;
}

export const translations: Record<string, Translations> = {
  tr: {
    live: 'CANLI', finished: 'Bitti', scheduled: 'Planlandı', matches: 'MAÇ', leagues: 'Lig',
    today: 'Bugün', homeTeam: 'Ev Sahibi', awayTeam: 'Deplasman', halfTime: 'Yarı Zaman',
    matchEvents: 'Maç Olayları', matchDetails: 'Maç Detayları', statistics: 'Maç İstatistikleri',
    close: 'Kapat', noMatches: 'Maç Bulunamadı', checkLater: 'Güncellemeler için daha sonra kontrol edin',
    liveMatch: 'CANLI', matchesCount: 'MAÇ', appTitle: 'Canlı Futbol Skorları', todaysMatches: 'Bugünkü Karşılaşmalar'
  },
  en: {
    live: 'LIVE', finished: 'Finished', scheduled: 'Scheduled', matches: 'MATCHES', leagues: 'Leagues',
    today: 'Today', homeTeam: 'Home', awayTeam: 'Away', halfTime: 'Half Time',
    matchEvents: 'Match Events', matchDetails: 'Match Details', statistics: 'Match Statistics',
    close: 'Close', noMatches: 'No Matches Found', checkLater: 'Check back later for updates',
    liveMatch: 'LIVE', matchesCount: 'MATCHES', appTitle: 'Live Football Scores', todaysMatches: 'Today\'s Matches'
  },
  de: {
    live: 'LIVE', finished: 'Beendet', scheduled: 'Geplant', matches: 'SPIELE', leagues: 'Ligen',
    today: 'Heute', homeTeam: 'Heim', awayTeam: 'Auswärts', halfTime: 'Halbzeit',
    matchEvents: 'Spielereignisse', matchDetails: 'Spieldetails', statistics: 'Spielstatistiken',
    close: 'Schließen', noMatches: 'Keine Spiele gefunden', checkLater: 'Später nach Updates suchen',
    liveMatch: 'LIVE', matchesCount: 'SPIELE', appTitle: 'Live Fußball Ergebnisse', todaysMatches: 'Heutige Spiele'
  },
  es: {
    live: 'EN VIVO', finished: 'Terminado', scheduled: 'Programado', matches: 'PARTIDOS', leagues: 'Ligas',
    today: 'Hoy', homeTeam: 'Local', awayTeam: 'Visitante', halfTime: 'Medio Tiempo',
    matchEvents: 'Eventos del Partido', matchDetails: 'Detalles del Partido', statistics: 'Estadísticas del Partido',
    close: 'Cerrar', noMatches: 'No se encontraron partidos', checkLater: 'Vuelve más tarde para actualizaciones',
    liveMatch: 'EN VIVO', matchesCount: 'PARTIDOS', appTitle: 'Resultados de Fútbol en Vivo', todaysMatches: 'Partidos de Hoy'
  }
  // Diğer diller benzer şekilde eklenecek...
};

// Get current language from subdomain
export const getCurrentLanguage = (): string => {
  if (typeof window === 'undefined') return 'tr';
  
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  
  if (parts.length >= 2) {
    const subdomain = parts[0];
    const language = supportedLanguages.find(lang => lang.subdomain === subdomain);
    if (language) return language.code;
  }
  
  return 'tr'; // Default to Turkish
};

// Get translations for current language
export const getTranslations = (lang?: string): Translations => {
  const currentLang = lang || getCurrentLanguage();
  return translations[currentLang] || translations.tr;
};

// Generate subdomain URL for language
export const getLanguageUrl = (langCode: string): string => {
  const language = supportedLanguages.find(lang => lang.code === langCode);
  if (!language) return 'https://tr.golivo.app';
  
  return `https://${language.subdomain}.golivo.app`;
};