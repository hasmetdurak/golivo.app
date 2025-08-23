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
  { code: 'nah', name: 'Nahuatl', nativeName: 'Nāhuatl', subdomain: 'nah' }
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
  }
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