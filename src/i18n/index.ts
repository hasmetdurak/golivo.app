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
  },
  pt: {
    live: 'AO VIVO', finished: 'Terminado', scheduled: 'Agendado', matches: 'JOGOS', leagues: 'Ligas',
    today: 'Hoje', homeTeam: 'Casa', awayTeam: 'Fora', halfTime: 'Meio Tempo',
    matchEvents: 'Eventos da Partida', matchDetails: 'Detalhes da Partida', statistics: 'Estatísticas da Partida',
    close: 'Fechar', noMatches: 'Nenhuma partida encontrada', checkLater: 'Volte mais tarde para atualizações',
    liveMatch: 'AO VIVO', matchesCount: 'JOGOS', appTitle: 'Resultados de Futebol ao Vivo', todaysMatches: 'Jogos de Hoje'
  },
  fr: {
    live: 'EN DIRECT', finished: 'Terminé', scheduled: 'Programmé', matches: 'MATCHS', leagues: 'Ligues',
    today: 'Aujourd\'hui', homeTeam: 'Domicile', awayTeam: 'Extérieur', halfTime: 'Mi-temps',
    matchEvents: 'Événements du Match', matchDetails: 'Détails du Match', statistics: 'Statistiques du Match',
    close: 'Fermer', noMatches: 'Aucun match trouvé', checkLater: 'Revenez plus tard pour les mises à jour',
    liveMatch: 'EN DIRECT', matchesCount: 'MATCHS', appTitle: 'Scores de Football en Direct', todaysMatches: 'Matchs d\'Aujourd\'hui'
  },
  it: {
    live: 'LIVE', finished: 'Finito', scheduled: 'Programmato', matches: 'PARTITE', leagues: 'Campionati',
    today: 'Oggi', homeTeam: 'Casa', awayTeam: 'Trasferta', halfTime: 'Primo Tempo',
    matchEvents: 'Eventi della Partita', matchDetails: 'Dettagli della Partita', statistics: 'Statistiche della Partita',
    close: 'Chiudi', noMatches: 'Nessuna partita trovata', checkLater: 'Torna più tardi per gli aggiornamenti',
    liveMatch: 'LIVE', matchesCount: 'PARTITE', appTitle: 'Risultati Calcio in Diretta', todaysMatches: 'Partite di Oggi'
  },
  ja: {
    live: 'ライブ', finished: '終了', scheduled: '予定', matches: '試合', leagues: 'リーグ',
    today: '今日', homeTeam: 'ホーム', awayTeam: 'アウェイ', halfTime: 'ハーフタイム',
    matchEvents: '試合イベント', matchDetails: '試合詳細', statistics: '試合統計',
    close: '閉じる', noMatches: '試合が見つかりません', checkLater: '後でアップデートを確認してください',
    liveMatch: 'ライブ', matchesCount: '試合', appTitle: 'ライブサッカースコア', todaysMatches: '今日の試合'
  },
  ru: {
    live: 'ПРЯМОЙ ЭФИР', finished: 'Завершен', scheduled: 'Запланирован', matches: 'МАТЧИ', leagues: 'Лиги',
    today: 'Сегодня', homeTeam: 'Дома', awayTeam: 'В гостях', halfTime: 'Перерыв',
    matchEvents: 'События матча', matchDetails: 'Детали матча', statistics: 'Статистика матча',
    close: 'Закрыть', noMatches: 'Матчи не найдены', checkLater: 'Проверьте обновления позже',
    liveMatch: 'ПРЯМОЙ ЭФИР', matchesCount: 'МАТЧИ', appTitle: 'Футбольные результаты онлайн', todaysMatches: 'Сегодняшние матчи'
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