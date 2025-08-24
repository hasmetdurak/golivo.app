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
  { code: 'en-IN', name: 'English (India)', nativeName: 'English (India)', subdomain: 'in' },
  // NEW 30 LANGUAGES FOR MAXIMUM GLOBAL REVENUE
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', subdomain: 'nl' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', subdomain: 'cs' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', subdomain: 'sk' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', subdomain: 'hu' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', subdomain: 'el' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', subdomain: 'ro' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', subdomain: 'bg' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', subdomain: 'sr' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', subdomain: 'hr' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', subdomain: 'uk' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', subdomain: 'bn' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', subdomain: 'ur', rtl: true },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', subdomain: 'ta' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', subdomain: 'te' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', subdomain: 'ml' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', subdomain: 'id' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', subdomain: 'ms' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', subdomain: 'th' },
  { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ', subdomain: 'km' },
  { code: 'my', name: 'Burmese', nativeName: 'မြန်မာ', subdomain: 'my' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', subdomain: 'ha' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', subdomain: 'yo' },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', subdomain: 'zu' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', subdomain: 'am' },
  { code: 'ak', name: 'Akan', nativeName: 'Akan', subdomain: 'ak' },
  { code: 'gn', name: 'Guarani', nativeName: 'Avañe\'ẽ', subdomain: 'gn' },
  { code: 'qu', name: 'Quechua', nativeName: 'Runa Simi', subdomain: 'qu' },
  { code: 'ay', name: 'Aymara', nativeName: 'Aymar Aru', subdomain: 'ay' },
  { code: 'arn', name: 'Mapudungun', nativeName: 'Mapudungun', subdomain: 'arn' },
  { code: 'nah', name: 'Nahuatl', nativeName: 'Nāhuatl', subdomain: 'nah' },
  // Additional European Languages  
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', subdomain: 'sv' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', subdomain: 'no' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', subdomain: 'fi' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', subdomain: 'et' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', subdomain: 'lv' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', subdomain: 'lt' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', subdomain: 'he', rtl: true },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', subdomain: 'ar', rtl: true },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', subdomain: 'az' },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული', subdomain: 'ka' },
  { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbek', subdomain: 'uz' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', subdomain: 'af' },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', subdomain: 'sq' },
  { code: 'mk', name: 'Macedonian', nativeName: 'Македонски', subdomain: 'mk' }
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
  },
  ko: {
    live: '라이브', finished: '종료', scheduled: '예정', matches: '경기', leagues: '리그',
    today: '오늘', homeTeam: '홈', awayTeam: '어웨이', halfTime: '하프타임',
    matchEvents: '경기 이벤트', matchDetails: '경기 상세', statistics: '경기 통계',
    close: '닫기', noMatches: '경기를 찾을 수 없습니다', checkLater: '나중에 업데이트를 확인하세요',
    liveMatch: '라이브', matchesCount: '경기', appTitle: '라이브 축구 스코어', todaysMatches: '오늘의 경기'
  },
  'zh-CN': {
    live: '直播', finished: '已结束', scheduled: '预定', matches: '比赛', leagues: '联赛',
    today: '今天', homeTeam: '主队', awayTeam: '客队', halfTime: '半场',
    matchEvents: '比赛事件', matchDetails: '比赛详情', statistics: '比赛统计',
    close: '关闭', noMatches: '未找到比赛', checkLater: '请稍后查看更新',
    liveMatch: '直播', matchesCount: '比赛', appTitle: '实时足球比分', todaysMatches: '今日比赛'
  },
  'zh-TW': {
    live: '直播', finished: '已結束', scheduled: '預定', matches: '比賽', leagues: '聯賽',
    today: '今天', homeTeam: '主隊', awayTeam: '客隊', halfTime: '半場',
    matchEvents: '比賽事件', matchDetails: '比賽詳情', statistics: '比賽統計',
    close: '關閉', noMatches: '未找到比賽', checkLater: '請稍後查看更新',
    liveMatch: '直播', matchesCount: '比賽', appTitle: '即時足球比分', todaysMatches: '今日比賽'
  },
  hi: {
    live: 'लाइव', finished: 'समाप्त', scheduled: 'निर्धारित', matches: 'मैच', leagues: 'लीग',
    today: 'आज', homeTeam: 'घरेलू', awayTeam: 'विजिटिंग', halfTime: 'हाफ टाइम',
    matchEvents: 'मैच इवेंट्स', matchDetails: 'मैच विवरण', statistics: 'मैच आंकड़े',
    close: 'बंद करें', noMatches: 'कोई मैच नहीं मिला', checkLater: 'अपडेट के लिए बाद में जांचें',
    liveMatch: 'लाइव', matchesCount: 'मैच', appTitle: 'लाइव फुटबॉल स्कोर', todaysMatches: 'आज के मैच'
  },
  pl: {
    live: 'NA ŻYWO', finished: 'Zakończone', scheduled: 'Zaplanowane', matches: 'MECZE', leagues: 'Ligi',
    today: 'Dzisiaj', homeTeam: 'Gospodarze', awayTeam: 'Goście', halfTime: 'Połowa',
    matchEvents: 'Wydarzenia Meczu', matchDetails: 'Szczegóły Meczu', statistics: 'Statystyki Meczu',
    close: 'Zamknij', noMatches: 'Nie znaleziono meczów', checkLater: 'Sprawdź ponownie później',
    liveMatch: 'NA ŻYWO', matchesCount: 'MECZE', appTitle: 'Wyniki Piłki Nożnej na Żywo', todaysMatches: 'Dzisiejsze Mecze'
  },
  fa: {
    live: 'زنده', finished: 'تمام شده', scheduled: 'برنامه ریزی شده', matches: 'مسابقات', leagues: 'لیگ ها',
    today: 'امروز', homeTeam: 'میزبان', awayTeam: 'مهمان', halfTime: 'نیمه اول',
    matchEvents: 'رویدادهای بازی', matchDetails: 'جزئیات بازی', statistics: 'آمار بازی',
    close: 'بستن', noMatches: 'مسابقه ای یافت نشد', checkLater: 'بعداً برای به روز رسانی بررسی کنید',
    liveMatch: 'زنده', matchesCount: 'مسابقات', appTitle: 'نتایج زنده فوتبال', todaysMatches: 'مسابقات امروز'
  },
  vi: {
    live: 'TRỰC TIẾP', finished: 'Kết thúc', scheduled: 'Đã lên lịch', matches: 'TRẬN ĐẤU', leagues: 'Giải đấu',
    today: 'Hôm nay', homeTeam: 'Chủ nhà', awayTeam: 'Khách', halfTime: 'Hiệp một',
    matchEvents: 'Sự kiện trận đấu', matchDetails: 'Chi tiết trận đấu', statistics: 'Thống kê trận đấu',
    close: 'Đóng', noMatches: 'Không tìm thấy trận đấu', checkLater: 'Kiểm tra lại sau để cập nhật',
    liveMatch: 'TRỰC TIẾP', matchesCount: 'TRẬN ĐẤU', appTitle: 'Tỷ số Bóng đá Trực tiếp', todaysMatches: 'Trận đấu hôm nay'
  },
  kk: {
    live: 'ТІКЕЛЕЙ ЭФИР', finished: 'Аяқталды', scheduled: 'Жоспарланған', matches: 'ОЙЫНДАР', leagues: 'Лигалар',
    today: 'Бүгін', homeTeam: 'Үй иесі', awayTeam: 'Қонақ', halfTime: 'Бірінші тайм',
    matchEvents: 'Ойын оқиғалары', matchDetails: 'Ойын мәліметтері', statistics: 'Ойын статистикасы',
    close: 'Жабу', noMatches: 'Ойындар табылмады', checkLater: 'Жаңартулар үшін кейінірек тексеріңіз',
    liveMatch: 'ТІКЕЛЕЙ ЭФИР', matchesCount: 'ОЙЫНДАР', appTitle: 'Тікелей Футбол Нәтижелері', todaysMatches: 'Бүгінгі Ойындар'
  },
  tl: {
    live: 'LIVE', finished: 'Tapos na', scheduled: 'Nakatakda', matches: 'LABAN', leagues: 'Liga',
    today: 'Ngayon', homeTeam: 'Home', awayTeam: 'Away', halfTime: 'Unang Half',
    matchEvents: 'Mga Pangyayari sa Laban', matchDetails: 'Detalye ng Laban', statistics: 'Estadistika ng Laban',
    close: 'Isara', noMatches: 'Walang Nahanap na Laban', checkLater: 'Bumalik mamaya para sa mga update',
    liveMatch: 'LIVE', matchesCount: 'LABAN', appTitle: 'Live Football Scores', todaysMatches: 'Mga Laban Ngayon'
  },
  sw: {
    live: 'MOJA KWA MOJA', finished: 'Imekwisha', scheduled: 'Imepangwa', matches: 'MECHI', leagues: 'Ligi',
    today: 'Leo', homeTeam: 'Nyumbani', awayTeam: 'Nje', halfTime: 'Nusu wa Kwanza',
    matchEvents: 'Matukio ya Mchezo', matchDetails: 'Maelezo ya Mchezo', statistics: 'Takwimu za Mchezo',
    close: 'Funga', noMatches: 'Hakuna Mechi Iliyopatikana', checkLater: 'Rudi baadaye kwa masasisho',
    liveMatch: 'MOJA KWA MOJA', matchesCount: 'MECHI', appTitle: 'Matokeo ya Mpira wa Miguu Moja kwa Moja', todaysMatches: 'Mechi za Leo'
  },
  'en-IN': {
    live: 'LIVE', finished: 'Finished', scheduled: 'Scheduled', matches: 'MATCHES', leagues: 'Leagues',
    today: 'Today', homeTeam: 'Home', awayTeam: 'Away', halfTime: 'Half Time',
    matchEvents: 'Match Events', matchDetails: 'Match Details', statistics: 'Match Statistics',
    close: 'Close', noMatches: 'No Matches Found', checkLater: 'Check back later for updates',
    liveMatch: 'LIVE', matchesCount: 'MATCHES', appTitle: 'Live Football Scores', todaysMatches: 'Today\'s Matches'
  },
  // NEW 30 LANGUAGES FOR MAXIMUM GLOBAL REVENUE - PART 1
  nl: {
    live: 'LIVE', finished: 'Afgelopen', scheduled: 'Gepland', matches: 'WEDSTRIJDEN', leagues: 'Competities',
    today: 'Vandaag', homeTeam: 'Thuis', awayTeam: 'Uit', halfTime: 'Rust',
    matchEvents: 'Wedstrijdgebeurtenissen', matchDetails: 'Wedstrijddetails', statistics: 'Wedstrijdstatistieken',
    close: 'Sluiten', noMatches: 'Geen wedstrijden gevonden', checkLater: 'Kom later terug voor updates',
    liveMatch: 'LIVE', matchesCount: 'WEDSTRIJDEN', appTitle: 'Live Voetbaluitslagen', todaysMatches: 'Wedstrijden van Vandaag'
  },
  cs: {
    live: 'ŽIVĚ', finished: 'Ukončené', scheduled: 'Naplánované', matches: 'ZÁPASY', leagues: 'Ligy',
    today: 'Dnes', homeTeam: 'Domácí', awayTeam: 'Hosté', halfTime: 'Poločas',
    matchEvents: 'Události zápasu', matchDetails: 'Detaily zápasu', statistics: 'Statistiky zápasu',
    close: 'Zavřít', noMatches: 'Žádné zápasy nenalezeny', checkLater: 'Vraťte se později pro aktualizace',
    liveMatch: 'ŽIVĚ', matchesCount: 'ZÁPASY', appTitle: 'Živé fotbalové výsledky', todaysMatches: 'Dnešní zápasy'
  },
  sk: {
    live: 'NAŽIVO', finished: 'Ukončené', scheduled: 'Naplánované', matches: 'ZÁPASY', leagues: 'Ligy',
    today: 'Dnes', homeTeam: 'Domáci', awayTeam: 'Hostia', halfTime: 'Polčas',
    matchEvents: 'Udalosti zápasu', matchDetails: 'Detaily zápasu', statistics: 'Štatistiky zápasu',
    close: 'Zavrieť', noMatches: 'Žiadne zápasy nenájdené', checkLater: 'Vráťte sa neskôr pre aktualizácie',
    liveMatch: 'NAŽIVO', matchesCount: 'ZÁPASY', appTitle: 'Živé futbalové výsledky', todaysMatches: 'Dnešné zápasy'
  },
  hu: {
    live: 'ÉLŐ', finished: 'Befejezett', scheduled: 'Tervezett', matches: 'MÉRKŐZÉSEK', leagues: 'Bajnokságok',
    today: 'Ma', homeTeam: 'Hazai', awayTeam: 'Vendég', halfTime: 'Félidő',
    matchEvents: 'Mérkőzés események', matchDetails: 'Mérkőzés részletek', statistics: 'Mérkőzés statisztikák',
    close: 'Bezár', noMatches: 'Nem találhatók mérkőzések', checkLater: 'Nézzen vissza később a frissítésekért',
    liveMatch: 'ÉLŐ', matchesCount: 'MÉRKŐZÉSEK', appTitle: 'Élő Futball Eredmények', todaysMatches: 'Mai Mérkőzések'
  },
  el: {
    live: 'ΖΩΝΤΑΝΑ', finished: 'Τελειωμένα', scheduled: 'Προγραμματισμένα', matches: 'ΑΓΩΝΕΣ', leagues: 'Πρωταθλήματα',
    today: 'Σήμερα', homeTeam: 'Γηπεδούχοι', awayTeam: 'Φιλοξενούμενοι', halfTime: 'Ημίχρονο',
    matchEvents: 'Γεγονότα αγώνα', matchDetails: 'Λεπτομέρειες αγώνα', statistics: 'Στατιστικά αγώνα',
    close: 'Κλείσιμο', noMatches: 'Δεν βρέθηκαν αγώνες', checkLater: 'Ελέγξτε ξανά αργότερα για ενημερώσεις',
    liveMatch: 'ΖΩΝΤΑΝΑ', matchesCount: 'ΑΓΩΝΕΣ', appTitle: 'Ζωντανά Αποτελέσματα Ποδοσφαίρου', todaysMatches: 'Σημερινοί Αγώνες'
  },
  ro: {
    live: 'LIVE', finished: 'Terminate', scheduled: 'Programate', matches: 'MECIURI', leagues: 'Campionate',
    today: 'Astăzi', homeTeam: 'Gazdă', awayTeam: 'Oaspete', halfTime: 'Pauză',
    matchEvents: 'Evenimente meci', matchDetails: 'Detalii meci', statistics: 'Statistici meci',
    close: 'Închide', noMatches: 'Nu s-au găsit meciuri', checkLater: 'Reveniți mai târziu pentru actualizări',
    liveMatch: 'LIVE', matchesCount: 'MECIURI', appTitle: 'Rezultate Fotbal Live', todaysMatches: 'Meciurile de Azi'
  },
  bg: {
    live: 'НА ЖИВО', finished: 'Приключени', scheduled: 'Планирани', matches: 'МАЧОВЕ', leagues: 'Лиги',
    today: 'Днес', homeTeam: 'Домакин', awayTeam: 'Гост', halfTime: 'Почивка',
    matchEvents: 'Събития от мача', matchDetails: 'Детайли за мача', statistics: 'Статистики на мача',
    close: 'Затвори', noMatches: 'Няма намерени мачове', checkLater: 'Проверете отново по-късно за актуализации',
    liveMatch: 'НА ЖИВО', matchesCount: 'МАЧОВЕ', appTitle: 'Резултати от Футбол на Живо', todaysMatches: 'Днешни Мачове'
  },
  sr: {
    live: 'UŽIVO', finished: 'Završene', scheduled: 'Planirane', matches: 'UTAKMICE', leagues: 'Lige',
    today: 'Danas', homeTeam: 'Domaći', awayTeam: 'Gosti', halfTime: 'Poluvreme',
    matchEvents: 'Događaji utakmice', matchDetails: 'Detalji utakmice', statistics: 'Statistike utakmice',
    close: 'Zatvori', noMatches: 'Nisu pronađene utakmice', checkLater: 'Vratite se kasnije za ažuriranja',
    liveMatch: 'UŽIVO', matchesCount: 'UTAKMICE', appTitle: 'Rezultati Fudbal Uživo', todaysMatches: 'Današnje Utakmice'
  },
  hr: {
    live: 'UŽIVO', finished: 'Završene', scheduled: 'Planirane', matches: 'UTAKMICE', leagues: 'Lige',
    today: 'Danas', homeTeam: 'Domaći', awayTeam: 'Gosti', halfTime: 'Poluvrijeme',
    matchEvents: 'Događaji utakmice', matchDetails: 'Detalji utakmice', statistics: 'Statistike utakmice',
    close: 'Zatvori', noMatches: 'Nisu pronađene utakmice', checkLater: 'Vratite se kasnije za ažuriranja',
    liveMatch: 'UŽIVO', matchesCount: 'UTAKMICE', appTitle: 'Rezultati Nogomet Uživo', todaysMatches: 'Današnje Utakmice'
  },
  uk: {
    live: 'НАЖИВО', finished: 'Завершені', scheduled: 'Заплановані', matches: 'МАТЧІ', leagues: 'Ліги',
    today: 'Сьогодні', homeTeam: 'Господарі', awayTeam: 'Гості', halfTime: 'Перерва',
    matchEvents: 'Події матчу', matchDetails: 'Деталі матчу', statistics: 'Статистика матчу',
    close: 'Закрити', noMatches: 'Матчі не знайдені', checkLater: 'Перевірте пізніше для оновлень',
    liveMatch: 'НАЖИВО', matchesCount: 'МАТЧІ', appTitle: 'Результати Футболу Наживо', todaysMatches: 'Сьогоднішні Матчі'
  },
  bn: {
    live: 'লাইভ', finished: 'সমাপ্ত', scheduled: 'নির্ধারিত', matches: 'ম্যাচ', leagues: 'লিগ',
    today: 'আজ', homeTeam: 'হোম', awayTeam: 'অ্যাওয়ে', halfTime: 'হাফ টাইম',
    matchEvents: 'ম্যাচ ইভেন্ট', matchDetails: 'ম্যাচ বিবরণ', statistics: 'ম্যাচ পরিসংখ্যান',
    close: 'বন্ধ', noMatches: 'কোন ম্যাচ পাওয়া যায়নি', checkLater: 'আপডেটের জন্য পরে চেক করুন',
    liveMatch: 'লাইভ', matchesCount: 'ম্যাচ', appTitle: 'লাইভ ফুটবল স্কোর', todaysMatches: 'আজকের ম্যাচ'
  },
  ur: {
    live: 'براہ راست', finished: 'ختم', scheduled: 'طے شدہ', matches: 'میچز', leagues: 'لیگز',
    today: 'آج', homeTeam: 'گھریلو', awayTeam: 'باہری', halfTime: 'ہاف ٹائم',
    matchEvents: 'میچ واقعات', matchDetails: 'میچ تفصیلات', statistics: 'میچ اعداد و شمار',
    close: 'بند', noMatches: 'کوئی میچ نہیں ملا', checkLater: 'اپ ڈیٹس کے لیے بعد میں چیک کریں',
    liveMatch: 'براہ راست', matchesCount: 'میچز', appTitle: 'لائیو فٹ بال اسکور', todaysMatches: 'آج کے میچز'
  },
  ta: {
    live: 'நேரடி', finished: 'முடிந்தது', scheduled: 'திட்டமிடப்பட்டது', matches: 'போட்டிகள்', leagues: 'லீக்குகள்',
    today: 'இன்று', homeTeam: 'சொந்த', awayTeam: 'வெளியூர்', halfTime: 'அரை நேரம்',
    matchEvents: 'போட்டி நிகழ்வுகள்', matchDetails: 'போட்டி விவரங்கள்', statistics: 'போட்டி புள்ளிவிவரங்கள்',
    close: 'மூடு', noMatches: 'போட்டிகள் இல்லை', checkLater: 'புதுப்பிப்புகளுக்கு பின்னர் சரிபார்க்கவும்',
    liveMatch: 'நேரடி', matchesCount: 'போட்டிகள்', appTitle: 'நேரடி கால்பந்து மதிப்பெண்கள்', todaysMatches: 'இன்றைய போட்டிகள்'
  },
  te: {
    live: 'ప్రత్యక్ష', finished: 'పూర్తయ్యాయి', scheduled: 'షెడ్యూల్ చేయబడినవి', matches: 'మ్యాచ్‌లు', leagues: 'లీగ్‌లు',
    today: 'ఈరోజు', homeTeam: 'హోమ్', awayTeam: 'అవే', halfTime: 'హాఫ్ టైమ్',
    matchEvents: 'మ్యాచ్ ఈవెంట్‌లు', matchDetails: 'మ్యాచ్ వివరాలు', statistics: 'మ్యాచ్ గణాంకాలు',
    close: 'మూసివేయండి', noMatches: 'మ్యాచ్‌లు కనుగొనబడలేదు', checkLater: 'అప్‌డేట్‌ల కోసం తర్వాత తనిఖీ చేయండి',
    liveMatch: 'ప్రత్యక్ష', matchesCount: 'మ్యాచ్‌లు', appTitle: 'ప్రత్యక్ష ఫుట్‌బాల్ స్కోర్‌లు', todaysMatches: 'నేటి మ్యాచ్‌లు'
  },
  ml: {
    live: 'തത്സമയം', finished: 'പൂർത്തിയായി', scheduled: 'ഷെഡ്യൂൾ ചെയ്തു', matches: 'മത്സരങ്ങൾ', leagues: 'ലീഗുകൾ',
    today: 'ഇന്ന്', homeTeam: 'ഹോം', awayTeam: 'അവേ', halfTime: 'ഹാഫ് ടൈം',
    matchEvents: 'മത്സര സംഭവങ്ങൾ', matchDetails: 'മത്സര വിശദാംശങ്ങൾ', statistics: 'മത്സര സ്ഥിതിവിവരക്കണക്കുകൾ',
    close: 'അടയ്ക്കുക', noMatches: 'മത്സരങ്ങളൊന്നും കണ്ടെത്തിയില്ല', checkLater: 'അപ്ഡേറ്റുകൾക്കായി പിന്നീട് പരിശോധിക്കുക',
    liveMatch: 'തത്സമയം', matchesCount: 'മത്സരങ്ങൾ', appTitle: 'തത്സമയ ഫുട്ബോൾ സ്കോറുകൾ', todaysMatches: 'ഇന്നത്തെ മത്സരങ്ങൾ'
  },
  id: { live: 'LANGSUNG', finished: 'Selesai', scheduled: 'Terjadwal', matches: 'PERTANDINGAN', leagues: 'Liga', today: 'Hari ini', homeTeam: 'Tuan Rumah', awayTeam: 'Tandang', halfTime: 'Babak Pertama', matchEvents: 'Peristiwa Pertandingan', matchDetails: 'Detail Pertandingan', statistics: 'Statistik Pertandingan', close: 'Tutup', noMatches: 'Tidak Ada Pertandingan Ditemukan', checkLater: 'Periksa kembali nanti untuk pembaruan', liveMatch: 'LANGSUNG', matchesCount: 'PERTANDINGAN', appTitle: 'Skor Sepak Bola Langsung', todaysMatches: 'Pertandingan Hari Ini' },
  ms: { live: 'LANGSUNG', finished: 'Tamat', scheduled: 'Dijadualkan', matches: 'PERLAWANAN', leagues: 'Liga', today: 'Hari ini', homeTeam: 'Tuan Rumah', awayTeam: 'Pelawat', halfTime: 'Separuh Masa', matchEvents: 'Peristiwa Perlawanan', matchDetails: 'Butiran Perlawanan', statistics: 'Statistik Perlawanan', close: 'Tutup', noMatches: 'Tiada Perlawanan Dijumpai', checkLater: 'Semak semula kemudian untuk kemaskini', liveMatch: 'LANGSUNG', matchesCount: 'PERLAWANAN', appTitle: 'Markah Bola Sepak Langsung', todaysMatches: 'Perlawanan Hari Ini' },
  th: { live: 'สด', finished: 'เสร็จสิ้น', scheduled: 'กำหนดการ', matches: 'การแข่งขัน', leagues: 'ลีก', today: 'วันนี้', homeTeam: 'เจ้าบ้าน', awayTeam: 'ทีมเยือน', halfTime: 'ครึ่งแรก', matchEvents: 'เหตุการณ์ในเกม', matchDetails: 'รายละเอียดการแข่งขัน', statistics: 'สถิติการแข่งขัน', close: 'ปิด', noMatches: 'ไม่พบการแข่งขัน', checkLater: 'กลับมาดูอัปเดตภายหลัง', liveMatch: 'สด', matchesCount: 'การแข่งขัน', appTitle: 'คะแนนฟุตบอลสด', todaysMatches: 'การแข่งขันวันนี้' },
  km: { live: 'ផ្ទាល់', finished: 'បានបញ្ចប់', scheduled: 'បានកំណត់ពេល', matches: 'ការប្រកួត', leagues: 'លីក', today: 'ថ្ងៃនេះ', homeTeam: 'ផ្ទះ', awayTeam: 'ភ្ញៀវ', halfTime: 'ពាក់កណ្តាលពេល', matchEvents: 'ព្រឹត្តិការណ៍ការប្រកួត', matchDetails: 'ពត៌មានលម្អិតការប្រកួត', statistics: 'ស្ថិតិការប្រកួត', close: 'បិទ', noMatches: 'រកមិនឃើញការប្រកួត', checkLater: 'ពិនិត្យមើលការធ្វើបច្ចុប្បន្នភាពនៅពេលក្រោយ', liveMatch: 'ផ្ទាល់', matchesCount: 'ការប្រកួត', appTitle: 'ពិន្ទុបាល់ទាត់ផ្ទាល់', todaysMatches: 'ការប្រកួតថ្ងៃនេះ' },
  my: { live: 'တိုက်ရိုက်', finished: 'ပြီးဆုံး', scheduled: 'စီစဉ်', matches: 'ပြေးပွဲများ', leagues: 'လိဂ်များ', today: 'ဒီနေ့', homeTeam: 'အိမ်ရှင်', awayTeam: 'ဧည့်သည်', halfTime: 'ပထမတစ်ဝက်', matchEvents: 'ပြေးပွဲအဖြစ်အပျက်များ', matchDetails: 'ပြေးပွဲအသေးစိတ်', statistics: 'ပြေးပွဲစာရင်းအင်း', close: 'ပိတ်', noMatches: 'ပြေးပွဲများမတွေ့ရှိ', checkLater: 'အချိန်မြှောက်မျှောက်တင်များအတွက်နောက်မှစစ်ဆေးပါ', liveMatch: 'တိုက်ရိုက်', matchesCount: 'ပြေးပွဲများ', appTitle: 'တိုက်ရိုက်ဘောလုံးရမှတ်များ', todaysMatches: 'ဒီနေ့ပြေးပွဲများ' },
  ha: { live: 'KAI TSAYE', finished: 'An gama', scheduled: 'An tsara', matches: 'WASANNI', leagues: 'Gasar', today: 'Yau', homeTeam: 'Gida', awayTeam: 'Baƙo', halfTime: 'Rabin lokaci', matchEvents: 'Abubuwan da suka faru', matchDetails: 'Cikakken bayani', statistics: 'Ƙididdiga', close: 'Rufe', noMatches: 'Babu wasan da aka samu', checkLater: 'Koma duba sabuntawa daga baya', liveMatch: 'KAI TSAYE', matchesCount: 'WASANNI', appTitle: 'Sakamako na Ƙwallon ƙafa kai tsaye', todaysMatches: 'Wasannin Yau' },
  yo: { live: 'LAAYE', finished: 'Ti pari', scheduled: 'Ti ṣeto', matches: 'AWỌN ERE', leagues: 'Awọn ajumọṣe', today: 'Loni', homeTeam: 'Ile', awayTeam: 'Alejo', halfTime: 'Akoko idaji', matchEvents: 'Awọn iṣẹlẹ ere', matchDetails: 'Awọn alaye ere', statistics: 'Awọn iṣiro ere', close: 'Pa', noMatches: 'Ko si ere ti a ri', checkLater: 'Pada wa lati wo awọn imudojuiwọn nigbamii', liveMatch: 'LAAYE', matchesCount: 'AWỌN ERE', appTitle: 'Awọn Dimeglio Bọọlu ẹsẹ Laaye', todaysMatches: 'Awọn ere Loni' },
  zu: { live: 'OKUPHILA', finished: 'Kuphele', scheduled: 'Kuhleliwe', matches: 'IMIDLALO', leagues: 'Amaligi', today: 'Namuhla', homeTeam: 'Ekhaya', awayTeam: 'Kude', halfTime: 'Ihaf etayimi', matchEvents: 'Izehlakalo zemdlalo', matchDetails: 'Imininingwane yemdlalo', statistics: 'Izibalo zemdlalo', close: 'Vala', noMatches: 'Ayikho imidlalo etholiwe', checkLater: 'Buya ubheke izibuyekezo kamuva', liveMatch: 'OKUPHILA', matchesCount: 'IMIDLALO', appTitle: 'Amaphuzu ebhola okuphila', todaysMatches: 'Imidlalo yanamuhla' },
  am: { live: 'ቀጥታ', finished: 'ተጠናቅሏል', scheduled: 'ተመድቧል', matches: 'ጨዋታዎች', leagues: 'ሊጎች', today: 'ዛሬ', homeTeam: 'ቤት', awayTeam: 'እንግዳ', halfTime: 'ግማሽ ጊዜ', matchEvents: 'የጨዋታ ክስተቶች', matchDetails: 'የጨዋታ ዝርዝሮች', statistics: 'የጨዋታ ስታትስቲክስ', close: 'ዝጋ', noMatches: 'ምንም ጨዋታዎች አልተገኙም', checkLater: 'ለመዘመን ቆይተው ይመለከቱ', liveMatch: 'ቀጥታ', matchesCount: 'ጨዋታዎች', appTitle: 'የቀጥታ እግር ኳስ ውጤቶች', todaysMatches: 'የዛሬ ጨዋታዎች' },
  ak: { live: 'SƐ ƐREKƆ', finished: 'Awie', scheduled: 'Wɔahyɛ', matches: 'AGORƆ', leagues: 'Leagues', today: 'Ɛnnɛ', homeTeam: 'Efie', awayTeam: 'Ɛhɔhoɔ', halfTime: 'Fa berɛ', matchEvents: 'Agorɔ nsɛm', matchDetails: 'Agorɔ ho nsɛm', statistics: 'Agorɔ akontaabu', close: 'To mu', noMatches: 'Wɔanhu agorɔ biara', checkLater: 'San bra hwɛ nnɛɛma foforɔ', liveMatch: 'SƐ ƐREKƆ', matchesCount: 'AGORƆ', appTitle: 'Ball Agorɔ Live Scores', todaysMatches: 'Ɛnnɛ Agorɔ' },
  gn: { live: 'KOÃGÃ', finished: 'Opambáma', scheduled: 'Ojeporãma', matches: 'ÑEMBOSAR̃AI', leagues: 'Liga-kuéra', today: 'Ko árape', homeTeam: 'Óga', awayTeam: 'Ohóva', halfTime: 'Mbytepyte', matchEvents: 'Ñembosar̃ai rembiasakue', matchDetails: 'Ñembosar̃ai marandu', statistics: 'Ñembosar̃ai estadística', close: 'Mboty', noMatches: 'Ndojejuhái ñembosar̃ai', checkLater: 'Ejujey uperire ñemoĩporã', liveMatch: 'KOÃGÃ', matchesCount: 'ÑEMBOSAR̃AI', appTitle: 'Mangapu Ñembosar̃ai en Vivo', todaysMatches: 'Ko árape Ñembosar̃ai' },
  qu: { live: 'KANI PACHAPI', finished: 'Tukusqa', scheduled: 'Churasqa', matches: 'PUKLLAYKUNA', leagues: 'Ligas', today: 'Kunan', homeTeam: 'Wasi', awayTeam: 'Watana', halfTime: 'Chaupi', matchEvents: 'Pukllaypa ruwayninkuna', matchDetails: 'Pukllaypa willaynin', statistics: 'Pukllaypa yupanakuna', close: 'Wichay', noMatches: 'Mana pukllaykuna tarisqa', checkLater: 'Qhipaman kutimuy musuqyaykunapaq', liveMatch: 'KANI PACHAPI', matchesCount: 'PUKLLAYKUNA', appTitle: 'Kani Pachapi Pukllay Chanin', todaysMatches: 'Kunanpa Pukllaykuna' },
  ay: { live: 'JICHHA', finished: 'Tukuta', scheduled: 'Wakicht\'ata', matches: 'ANATANAKA', leagues: 'Ligas', today: 'Jichha', homeTeam: 'Uta', awayTeam: 'Sariri', halfTime: 'Taypi', matchEvents: 'Anata lurawinaka', matchDetails: 'Anata yatiyawinaka', statistics: 'Anata jakhunaka', close: 'Jist\'aña', noMatches: 'Janiw anatanaka jikxataskiti', checkLater: 'Wasitat kutt\'aña machaqaru ukhamaraki', liveMatch: 'JICHHA', matchesCount: 'ANATANAKA', appTitle: 'Jichha Anata Chanin', todaysMatches: 'Jichhapa Anatanaka' },
  arn: { live: 'MÜLEY', finished: 'Afmatuy', scheduled: 'Dewmangen', matches: 'AWKAN', leagues: 'Liga', today: 'Fachiantü', homeTeam: 'Ruka', awayTeam: 'Weychafe', halfTime: 'Ragi', matchEvents: 'Awkan küme', matchDetails: 'Awkan kimün', statistics: 'Awkan yewün', close: 'Afmatun', noMatches: 'Kimnolu awkan', checkLater: 'Werken tripantu', liveMatch: 'MÜLEY', matchesCount: 'AWKAN', appTitle: 'Müley Paliwe Awkan', todaysMatches: 'Fachiantü Awkan' },
  nah: { live: 'AXKAN', finished: 'Tlami', scheduled: 'Mochihua', matches: 'OLLIN', leagues: 'Liga', today: 'Axkan', homeTeam: 'Kalli', awayTeam: 'Hualla', halfTime: 'Nepantla', matchEvents: 'Ollin tlakatl', matchDetails: 'Ollin tlakatiliztli', statistics: 'Ollin nepantla', close: 'Tzakua', noMatches: 'Amo katka ollin', checkLater: 'Okse tonali xiuhtli', liveMatch: 'AXKAN', matchesCount: 'OLLIN', appTitle: 'Axkan Tapayollin', todaysMatches: 'Axkan Tonali Ollin' },
  // Additional European Languages
  sv: { live: 'LIVE', finished: 'Avslutad', scheduled: 'Schemalagd', matches: 'MATCHER', leagues: 'Ligor', today: 'Idag', homeTeam: 'Hemma', awayTeam: 'Borta', halfTime: 'Halv tid', matchEvents: 'Matchhändelser', matchDetails: 'Matchdetaljer', statistics: 'Matchstatistik', close: 'Stäng', noMatches: 'Inga matcher hittades', checkLater: 'Kom tillbaka senare för uppdateringar', liveMatch: 'LIVE', matchesCount: 'MATCHER', appTitle: 'Live Fotbollsresultat', todaysMatches: 'Dagens Matcher' },
  no: { live: 'DIREKTE', finished: 'Ferdig', scheduled: 'Planlagt', matches: 'KAMPER', leagues: 'Ligaer', today: 'I dag', homeTeam: 'Hjemme', awayTeam: 'Borte', halfTime: 'Pause', matchEvents: 'Kamphendelser', matchDetails: 'Kampdetaljer', statistics: 'Kampstatistikk', close: 'Lukk', noMatches: 'Ingen kamper funnet', checkLater: 'Kom tilbake senere for oppdateringer', liveMatch: 'DIREKTE', matchesCount: 'KAMPER', appTitle: 'Live Fotballresultater', todaysMatches: 'Dagens Kamper' },
  fi: { live: 'SUORA', finished: 'Päättynyt', scheduled: 'Aikataulutettu', matches: 'OTTELUT', leagues: 'Liigat', today: 'Tänään', homeTeam: 'Koti', awayTeam: 'Vieras', halfTime: 'Puoliaika', matchEvents: 'Ottelutapahtumat', matchDetails: 'Ottelun yksityiskohdat', statistics: 'Ottelutilastot', close: 'Sulje', noMatches: 'Otteluita ei löytynyt', checkLater: 'Tarkista myöhemmin päivityksiä varten', liveMatch: 'SUORA', matchesCount: 'OTTELUT', appTitle: 'Suorat Jalkapallotulokset', todaysMatches: 'Tänään Ottelut' },
  et: { live: 'OTSE', finished: 'Lõppenud', scheduled: 'Planeeritud', matches: 'MÄNGUD', leagues: 'Liigad', today: 'Täna', homeTeam: 'Kodu', awayTeam: 'Võõras', halfTime: 'Poolaeg', matchEvents: 'Mängu sündmused', matchDetails: 'Mängu üksikasjad', statistics: 'Mängu statistika', close: 'Sulge', noMatches: 'Mänge ei leitud', checkLater: 'Tule hiljem tagasi uuenduste jaoks', liveMatch: 'OTSE', matchesCount: 'MÄNGUD', appTitle: 'Otse Jalgpalli Tulemused', todaysMatches: 'Tänased Mängud' },
  lv: { live: 'TIEŠRAIDE', finished: 'Pabeigts', scheduled: 'Iecīmēts', matches: 'SPĒLES', leagues: 'Līgas', today: 'Šodien', homeTeam: 'Mājas', awayTeam: 'Ciemos', halfTime: 'Puslaiks', matchEvents: 'Spēles notikumi', matchDetails: 'Spēles detaļas', statistics: 'Spēles statistika', close: 'Aizvērt', noMatches: 'Spēles nav atrastas', checkLater: 'Nāc atpakaļ vēlāk, lai iegūtu atjauninājumus', liveMatch: 'TIEŠRAIDE', matchesCount: 'SPĒLES', appTitle: 'Tiešraides Futbola Rezultāti', todaysMatches: 'Šodienas Spēles' },
  lt: { live: 'TIESIOGIAI', finished: 'Baigėsi', scheduled: 'Suplanuotas', matches: 'RUNGTYNĖS', leagues: 'Lygos', today: 'Šiandien', homeTeam: 'Namų', awayTeam: 'Svečių', halfTime: 'Kėlinys', matchEvents: 'Rungtynės įvykiai', matchDetails: 'Rungtynės detales', statistics: 'Rungtynės statistika', close: 'Uždaryti', noMatches: 'Rungtynės nerastos', checkLater: 'Grįžkite vėliau naujinimams', liveMatch: 'TIESIOGIAI', matchesCount: 'RUNGTYNĖS', appTitle: 'Tiesioginio Futbolo Rezultatai', todaysMatches: 'Šios Dienos Rungtynės' },
  he: { live: 'חי', finished: 'סיים', scheduled: 'מתוכנן', matches: 'משחקים', leagues: 'ליגות', today: 'היום', homeTeam: 'בית', awayTeam: 'חוץ', halfTime: 'מחצית', matchEvents: 'אירועי משחק', matchDetails: 'פרטי משחק', statistics: 'סטטיסטיקות משחק', close: 'סגור', noMatches: 'לא נמצאו משחקים', checkLater: 'בדוק שוב מאוחר יותר לעדכונים', liveMatch: 'חי', matchesCount: 'משחקים', appTitle: 'תוצאות כדורגל בזמן אמת', todaysMatches: 'משחקי היום' },
  ar: { live: 'مباشر', finished: 'انتهى', scheduled: 'مجدول', matches: 'مباريات', leagues: 'دوريات', today: 'اليوم', homeTeam: 'المضيف', awayTeam: 'الضيف', halfTime: 'الشوط الأول', matchEvents: 'أحداث المباراة', matchDetails: 'تفاصيل المباراة', statistics: 'إحصائيات المباراة', close: 'إغلاق', noMatches: 'لم يتم العثور على مباريات', checkLater: 'تحقق مرة أخرى لاحقاً للحصول على التحديثات', liveMatch: 'مباشر', matchesCount: 'مباريات', appTitle: 'نتائج كرة القدم المباشرة', todaysMatches: 'مباريات اليوم' },
  az: { live: 'CANLI', finished: 'Bitdi', scheduled: 'Planlaşdırılmış', matches: 'OYUӘLAR', leagues: 'Liqa', today: 'Bu gün', homeTeam: 'Ev sahibi', awayTeam: 'Qərib', halfTime: 'Yarım vaxt', matchEvents: 'Oyun hadisələri', matchDetails: 'Oyun detalları', statistics: 'Oyun statistikası', close: 'Bağla', noMatches: 'Heç bir oyun tapilmadi', checkLater: 'Yeniliklər üçün sonra yənidən yoxlayin', liveMatch: 'CANLI', matchesCount: 'OYUӘLAR', appTitle: 'Canlı Futbol Nəticələri', todaysMatches: 'Bu günkü Oyunlar' },
  ka: { live: 'პრიმი', finished: 'დასრულდა', scheduled: 'დაგეგმილი', matches: 'თამაშები', leagues: 'ლიგები', today: 'დღეს', homeTeam: 'სახლი', awayTeam: 'სტუმრი', halfTime: 'ნახევარი დრო', matchEvents: 'თამაშის მოვლენები', matchDetails: 'თამაშის დეტალები', statistics: 'თამაშის სტატისტიკა', close: 'დახურვა', noMatches: 'თამაშები ვერ იქნა', checkLater: 'განახლებისთვის მომავალ შემოწმეთ', liveMatch: 'პრიმი', matchesCount: 'თამაშები', appTitle: 'პრიმი ფეხბურთის შედეგები', todaysMatches: 'დღეს თამაშები' },
  uz: { live: 'JONLI', finished: 'Tugadi', scheduled: 'Rejalashtirilgan', matches: 'O\'YINLAR', leagues: 'Liga', today: 'Bugun', homeTeam: 'Uy egasi', awayTeam: 'Mehmon', halfTime: 'Yarim vaqt', matchEvents: 'O\'yin voqealari', matchDetails: 'O\'yin tafsilotlari', statistics: 'O\'yin statistikasi', close: 'Yopish', noMatches: 'O\'yinlar topilmadi', checkLater: 'Yangilanishlar uchun keyinroq tekshiring', liveMatch: 'JONLI', matchesCount: 'O\'YINLAR', appTitle: 'Jonli Futbol Natijalari', todaysMatches: 'Bugungi O\'yinlar' },
  af: { live: 'LEWENDIG', finished: 'Klaar', scheduled: 'Geskeduleer', matches: 'WEDSTRYDE', leagues: 'Ligas', today: 'Vandag', homeTeam: 'Tuis', awayTeam: 'Weg', halfTime: 'Rusbreek', matchEvents: 'Wedstrydgebeure', matchDetails: 'Wedstrydbesonderhede', statistics: 'Wedstrydstatistieke', close: 'Sluit', noMatches: 'Geen wedstryde gevind nie', checkLater: 'Kyk later vir opdaterings', liveMatch: 'LEWENDIG', matchesCount: 'WEDSTRYDE', appTitle: 'Lewendige Sokkertelling', todaysMatches: 'Vandag se Wedstryde' },
  sq: { live: 'LIVE', finished: 'Mbaruar', scheduled: 'I planifikuar', matches: 'NDESHJE', leagues: 'Liga', today: 'Sot', homeTeam: 'Vendês', awayTeam: 'Miqësor', halfTime: 'Gjysmë kohe', matchEvents: 'Ngjarjet e ndeshjes', matchDetails: 'Detajet e ndeshjes', statistics: 'Statistikat e ndeshjes', close: 'Mbyll', noMatches: 'Nuk u gjetën ndeshje', checkLater: 'Kontrolloni përsëri më vonë për përditesime', liveMatch: 'LIVE', matchesCount: 'NDESHJE', appTitle: 'Rezultatet e Futbollit në Kohë Reale', todaysMatches: 'Ndeshjet e Sotme' },
  mk: { live: 'ПРЕНОС', finished: 'Завршен', scheduled: 'Насловен', matches: 'НАТПРЕВАРИ', leagues: 'Лиги', today: 'Денес', homeTeam: 'Домаќин', awayTeam: 'Гостин', halfTime: 'Половина време', matchEvents: 'Настани од натпреварот', matchDetails: 'Детали од натпреварот', statistics: 'Статистики од натпреварот', close: 'Затвори', noMatches: 'Не се пронајдени натпревари', checkLater: 'Проверете подоцна за ажурирања', liveMatch: 'ПРЕНОС', matchesCount: 'НАТПРЕВАРИ', appTitle: 'Пренос Резултати од Фудбал', todaysMatches: 'Денешни Натпревари' }
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
  
  return 'en'; // Default to English for maximum global reach
};

// Get translations for current language
export const getTranslations = (lang?: string): Translations => {
  const currentLang = lang || getCurrentLanguage();
  return translations[currentLang] || translations.en;
};

// Generate subdomain URL for language
export const getLanguageUrl = (langCode: string): string => {
  const language = supportedLanguages.find(lang => lang.code === langCode);
  if (!language) return 'https://en.golivo.app';
  
  return `https://${language.subdomain}.golivo.app`;
};