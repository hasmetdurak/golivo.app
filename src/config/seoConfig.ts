// seoConfig.ts

type SEOConfig = {
  title: string;
  description: string;
  keywords: string;
  locale: string;
};

export const seoConfig: Record<string, SEOConfig> = {
  tr: {
    title: "Canlı Skorlar - Futbol, Basketbol, Tenis | Golivo",
    description: "Golivo ile Türkiye için canlı skorlar, maç istatistikleri, lig tabloları ve anlık güncellemeler.",
    keywords: "canlı skor, Türkiye futbol, Süper Lig skor, bahis oranları, maç istatistikleri",
    locale: "tr_TR",
  },
  en: {
    title: "Live Scores - Football, Basketball, Tennis | Golivo",
    description: "Golivo provides real-time live scores, stats, and results for football, basketball, tennis, and more worldwide.",
    keywords: "live scores, football scores, basketball scores, tennis live, betting stats",
    locale: "en_US",
  },
  in: {
    title: "Live Scores India - Football, Cricket, Basketball | Golivo",
    description: "Golivo India brings live scores, stats and updates for cricket, football, basketball and more.",
    keywords: "cricket live, football India, IPL scores, betting stats",
    locale: "en_IN",
  },
  de: {
    title: "Live Ergebnisse - Fußball, Basketball, Tennis | Golivo",
    description: "Golivo bietet aktuelle Live-Ergebnisse, Matchstatistiken und Tabellen für Fußball, Basketball, Tennis und mehr.",
    keywords: "Live Ergebnisse, Bundesliga, Fußball heute, Wettquoten, Spielstatistik",
    locale: "de_DE",
  },
  es: {
    title: "Marcadores en Vivo - Fútbol, Baloncesto, Tenis | Golivo",
    description: "Golivo te trae resultados en vivo, estadísticas y clasificaciones de fútbol, baloncesto, tenis y más.",
    keywords: "resultados en vivo, fútbol hoy, LaLiga, apuestas deportivas, estadísticas",
    locale: "es_ES",
  },
  pt: {
    title: "Placar ao Vivo - Futebol, Basquete, Tênis | Golivo",
    description: "Golivo traz resultados ao vivo, estatísticas e classificações para futebol, basquete, tênis e muito mais.",
    keywords: "placar ao vivo, futebol hoje, Brasileirão, apostas esportivas, estatísticas",
    locale: "pt_BR",
  },
  fr: {
    title: "Scores en Direct - Football, Basket, Tennis | Golivo",
    description: "Golivo propose des scores en direct, statistiques et classements pour le football, le basket, le tennis et plus.",
    keywords: "scores en direct, Ligue 1, paris sportifs, résultats football, statistiques",
    locale: "fr_FR",
  },
  it: {
    title: "Risultati Live - Calcio, Basket, Tennis | Golivo",
    description: "Golivo offre risultati in tempo reale, classifiche e statistiche per calcio, basket, tennis e molto altro.",
    keywords: "risultati live, Serie A, calcio oggi, quote scommesse, statistiche partite",
    locale: "it_IT",
  },
  ru: {
    title: "Онлайн Счета - Футбол, Баскетбол, Теннис | Golivo",
    description: "Golivo предлагает онлайн результаты, статистику и таблицы для футбола, баскетбола, тенниса и многого другого.",
    keywords: "онлайн счета, футбол сегодня, Лига чемпионов, ставки, статистика",
    locale: "ru_RU",
  },
  ja: {
    title: "ライブスコア - サッカー、バスケ、テニス | Golivo",
    description: "Golivoはサッカー、バスケットボール、テニスなどのライブスコアと統計をリアルタイムで提供します。",
    keywords: "ライブスコア, サッカー, Jリーグ, テニス, 試合結果",
    locale: "ja_JP",
  },
  ko: {
    title: "실시간 스코어 - 축구, 농구, 테니스 | Golivo",
    description: "Golivo는 축구, 농구, 테니스의 실시간 점수와 경기 통계를 제공합니다.",
    keywords: "실시간 점수, 축구, K리그, 스포츠 베팅, 경기 통계",
    locale: "ko_KR",
  },
  cn: {
    title: "实时比分 - 足球, 篮球, 网球 | Golivo",
    description: "Golivo 提供足球、篮球、网球等赛事的实时比分和统计数据。",
    keywords: "实时比分, 足球比分, 篮球, 网球, 投注统计",
    locale: "zh_CN",
  },
  tw: {
    title: "即時比分 - 足球, 籃球, 網球 | Golivo",
    description: "Golivo 提供足球、籃球、網球等比賽的即時比分和統計資料。",
    keywords: "即時比分, 足球比分, 籃球, 網球, 體育博彩",
    locale: "zh_TW",
  },
  hi: {
    title: "लाइव स्कोर - फुटबॉल, बास्केटबॉल, टेनिस | Golivo",
    description: "Golivo फुटबॉल, बास्केटबॉल, टेनिस और अन्य खेलों के लाइव स्कोर और आँकड़े प्रदान करता है।",
    keywords: "लाइव स्कोर, फुटबॉल, टेनिस, बास्केटबॉल, सट्टेबाजी",
    locale: "hi_IN",
  },
  pl: {
    title: "Wyniki Na Żywo - Piłka Nożna, Koszykówka, Tenis | Golivo",
    description: "Golivo dostarcza wyniki na żywo, statystyki i tabele piłkarskie, koszykarskie, tenisowe i więcej.",
    keywords: "wyniki na żywo, piłka nożna, Ekstraklasa, zakłady, statystyki",
    locale: "pl_PL",
  },
  fa: {
    title: "نتایج زنده - فوتبال، بسکتبال، تنیس | Golivo",
    description: "Golivo نتایج زنده، آمار و جدول‌های فوتبال، بسکتبال، تنیس و بیشتر را ارائه می‌دهد.",
    keywords: "نتایج زنده, فوتبال, شرط بندی, بسکتبال, آمار",
    locale: "fa_IR",
  },
  vi: {
    title: "Tỷ Số Trực Tuyến - Bóng Đá, Bóng Rổ, Quần Vợt | Golivo",
    description: "Golivo cung cấp tỷ số trực tuyến, thống kê và bảng xếp hạng bóng đá, bóng rổ, quần vợt và nhiều môn khác.",
    keywords: "tỷ số trực tuyến, bóng đá, cá cược thể thao, thống kê",
    locale: "vi_VN",
  },
  kk: {
    title: "Онлайн Нәтижелер - Футбол, Баскетбол, Теннис | Golivo",
    description: "Golivo футбол, баскетбол, теннис және басқа спорт түрлері бойынша онлайн нәтижелер мен статистиканы ұсынады.",
    keywords: "онлайн нәтижелер, футбол, спорттық бәс тігу, статистика",
    locale: "kk_KZ",
  },
  tl: {
    title: "Live Scores - Football, Basketball, Tennis | Golivo PH",
    description: "Golivo Philippines live scores, stats and standings for football, basketball, tennis and more.",
    keywords: "live scores, PBA, football Philippines, betting stats",
    locale: "tl_PH",
  },
  sw: {
    title: "Matokeo Mubashara - Soka, Kikapu, Tenisi | Golivo",
    description: "Golivo inakuletea matokeo mubashara, takwimu na msimamo wa ligi kwa soka, kikapu, tenisi na zaidi.",
    keywords: "matokeo mubashara, soka leo, beti za michezo, takwimu",
    locale: "sw_KE",
  },

  // 🌍 Additional 30+ Languages
  ar: { 
    title: "النتائج المباشرة - كرة القدم، كرة السلة، التنس | Golivo", 
    description: "نتائج مباشرة وإحصائيات من جميع البطولات العالمية.", 
    keywords: "كرة القدم, نتائج مباشرة, مراهنات, إحصائيات", 
    locale: "ar_SA" 
  },
  id: { 
    title: "Skor Langsung - Sepak Bola, Basket, Tenis | Golivo", 
    description: "Skor langsung, statistik dan klasemen untuk semua liga besar.", 
    keywords: "skor langsung, sepak bola, taruhan olahraga", 
    locale: "id_ID" 
  },
  th: { 
    title: "ผลบอลสด - ฟุตบอล, บาส, เทนนิส | Golivo", 
    description: "อัปเดตผลบอลสดและสถิติการแข่งขันแบบเรียลไทม์.", 
    keywords: "ผลบอลสด, พนันกีฬา, สถิติฟุตบอล", 
    locale: "th_TH" 
  },
  bn: { 
    title: "লাইভ স্কোর - ফুটবল, বাস্কেটবল, টেনিস | Golivo", 
    description: "লাইভ স্কোর এবং ম্যাচ পরিসংখ্যান।", 
    keywords: "লাইভ স্কোর, ফুটবল, ক্রিকেট, টেনিস", 
    locale: "bn_BD" 
  },
  ur: { 
    title: "لائیو اسکور - فٹبال، باسکٹ بال، ٹینس | Golivo", 
    description: "فٹبال اور دیگر کھیلوں کے لائیو اسکورز۔", 
    keywords: "لائیو اسکور, بیٹنگ, کھیل", 
    locale: "ur_PK" 
  },
  nl: { 
    title: "Live Scores - Voetbal, Basketbal, Tennis | Golivo", 
    description: "Live scores en statistieken voor alle competities.", 
    keywords: "live scores, Eredivisie, sportweddenschappen", 
    locale: "nl_NL" 
  },
  sv: { 
    title: "Livescore - Fotboll, Basket, Tennis | Golivo", 
    description: "Livescore och statistik i realtid.", 
    keywords: "livescore, fotboll, betting", 
    locale: "sv_SE" 
  },
  no: { 
    title: "Live Resultater - Fotball, Basketball, Tennis | Golivo", 
    description: "Oppdaterte live resultater og statistikker.", 
    keywords: "live resultater, fotboll, odds", 
    locale: "no_NO" 
  },
  fi: { 
    title: "Live Tulokset - Jalkapallo, Koripallo, Tennis | Golivo", 
    description: "Tulokset ja tilastot reaaliajassa.", 
    keywords: "live tulokset, jalkapallo, vedonlyönti", 
    locale: "fi_FI" 
  },
  cs: { 
    title: "Živé Skóre - Fotbal, Basketbal, Tenis | Golivo", 
    description: "Živé výsledky a statistiky.", 
    keywords: "živé skóre, fotbal, sázení", 
    locale: "cs_CZ" 
  },
  ro: { 
    title: "Scoruri Live - Fotbal, Baschet, Tenis | Golivo", 
    description: "Scoruri live și statistici actualizate.", 
    keywords: "scoruri live, pariuri sportive", 
    locale: "ro_RO" 
  },
  el: { 
    title: "Ζωντανά Σκορ - Ποδόσφαιρο, Μπάσκετ, Τένις | Golivo", 
    description: "Ζωντανά σκορ και στατιστικά.", 
    keywords: "ζωντανά σκορ, στοίχημα", 
    locale: "el_GR" 
  },
  hu: { 
    title: "Élő Eredmények - Foci, Kosárlabda, Tenisz | Golivo", 
    description: "Élő eredmények és statisztikák.", 
    keywords: "élő eredmények, sportfogadás", 
    locale: "hu_HU" 
  },
  bg: { 
    title: "На Живо Резултати - Футбол, Баскетбол, Тенис | Golivo", 
    description: "Резултати на живо и статистики.", 
    keywords: "резултати на живо, футбол, залагания", 
    locale: "bg_BG" 
  },
  sr: { 
    title: "Uživo Rezultati - Fudbal, Košarka, Tenis | Golivo", 
    description: "Rezultati uživo i statistike.", 
    keywords: "uživo rezultati, fudbal, klađenje", 
    locale: "sr_RS" 
  },
  hr: { 
    title: "Rezultati Uživo - Nogomet, Košarka, Tenis | Golivo", 
    description: "Rezultati i statistike u stvarnom vremenu.", 
    keywords: "rezultati uživo, klađenje", 
    locale: "hr_HR" 
  },
  sk: { 
    title: "Live Výsledky - Futbal, Basketbal, Tenis | Golivo", 
    description: "Výsledky a štatistiky v reálnom čase.", 
    keywords: "live výsledky, stávky", 
    locale: "sk_SK" 
  },
  et: { 
    title: "Live Tulemused - Jalgpall, Korvpall, Tennis | Golivo", 
    description: "Reaalajas tulemused ja statistika.", 
    keywords: "live tulemused, spordiennustus", 
    locale: "et_EE" 
  },
  lv: { 
    title: "Tiešraides Rezultāti - Futbols, Basketbols, Teniss | Golivo", 
    description: "Tiešraides rezultāti un statistika.", 
    keywords: "tiešraides, sports, totalizators", 
    locale: "lv_LV" 
  },
  lt: { 
    title: "Tiesioginiai Rezultatai - Futbolas, Krepšinis, Tenisas | Golivo", 
    description: "Tiesioginiai rezultatai ir statistika.", 
    keywords: "tiesioginiai rezultatai, lažybos", 
    locale: "lt_LT" 
  },
  he: { 
    title: "תוצאות חיות - כדורגל, כדורסל, טניס | Golivo", 
    description: "תוצאות חיות וסטטיסטיקות בזמן אמת.", 
    keywords: "תוצאות חיות, הימורים", 
    locale: "he_IL" 
  },
  ms: { 
    title: "Skor Langsung - Bola Sepak, Bola Keranjang, Tenis | Golivo", 
    description: "Skor langsung dan statistik.", 
    keywords: "skor langsung, pertaruhan", 
    locale: "ms_MY" 
  },
  az: { 
    title: "Canlı Nəticələr - Futbol, Basketbol, Tennis | Golivo", 
    description: "Canlı nəticələr və statistika.", 
    keywords: "canlı nəticələr, futbol, mərclər", 
    locale: "az_AZ" 
  },
  ka: { 
    title: "ცოცხალი შედეგები - ფეხბურთი, კალათბურთი, ჩოგბურთი | Golivo", 
    description: "ცოცხალი შედეგები და სტატისტიკა.", 
    keywords: "ცოცხალი შედეგები, ფსონები", 
    locale: "ka_GE" 
  },
  uk: { 
    title: "Живі Результати - Футбол, Баскетбол, Теніс | Golivo", 
    description: "Живі результати та статистика.", 
    keywords: "живі результати, футбол, ставки", 
    locale: "uk_UA" 
  },
  uz: { 
    title: "Jonli Natijalar - Futbol, Basketbol, Tennis | Golivo", 
    description: "Jonli natijalar va statistika.", 
    keywords: "jonli natijalar, futbol, tikish", 
    locale: "uz_UZ" 
  },
  am: { 
    title: "ቀጥታ ውጤቶች - እግር ኳስ, ቅርጸ ኳስ, ተንሲ | Golivo", 
    description: "ቀጥታ ውጤቶች እና ስታቲስቲክስ.", 
    keywords: "ቀጥታ ውጤቶች, ጨዋታ, ትንበያ", 
    locale: "am_ET" 
  },
  ha: { 
    title: "Sakamakon Kai Tsaye - Kwallon Kafa, Kwando, Tennis | Golivo", 
    description: "Sakamakon wasanni kai tsaye da kididdiga.", 
    keywords: "sakamakon kai tsaye, caca", 
    locale: "ha_NG" 
  },
  yo: { 
    title: "Awọn Abajade Ifiwe - Bọọlu, Bọọlu afẹsẹgba, Tẹnis | Golivo", 
    description: "Awọn abajade ifiwe ati awọn iṣiro.", 
    keywords: "abawọle ifiwe, idije, tẹtẹ", 
    locale: "yo_NG" 
  },
  af: { 
    title: "Lewendige Tellings - Sokker, Basketbal, Tennis | Golivo", 
    description: "Lewendige tellings en statistieke.", 
    keywords: "lewendige tellings, weddenskappe", 
    locale: "af_ZA" 
  },
  sq: { 
    title: "Rezultatet Live - Futboll, Basketboll, Tenis | Golivo", 
    description: "Rezultate live dhe statistika.", 
    keywords: "rezultate live, bastet sportive", 
    locale: "sq_AL" 
  },
  mk: { 
    title: "Резултати во Живо - Фудбал, Кошарка, Тенис | Golivo", 
    description: "Резултати во живо и статистики.", 
    keywords: "резултати во живо, спортски обложување", 
    locale: "mk_MK" 
  },
  
  // Indigenous American Languages
  qu: {
    title: "Kani Pachapi Chanin - Pukllaykunamanta | Golivo",
    description: "Pukllaypa chanin manta, yupaykunamanta Golivomanta.",
    keywords: "kani pachapi, pukllay, chanin",
    locale: "qu_PE"
  },
  ay: {
    title: "Jichha Anata Chanin - Anatañataki | Golivo",
    description: "Anatañataki chanin manta, jakhunakampi Golivotan.",
    keywords: "jichha, anata, chanin",
    locale: "ay_BO"
  },
  gn: {
    title: "Koãgã Ñembosar'ái Chanin - Ñembosar'ái | Golivo",
    description: "Ñembosar'ái chanin ha estadística Golivoguive.",
    keywords: "koãgã, ñembosar'ái, chanin",
    locale: "gn_PY"
  },
  arn: {
    title: "Müley Awkan Chanin - Awkanmanta | Golivo",
    description: "Awkan chanin ka yewün Golivomeu.",
    keywords: "müley, awkan, chanin",
    locale: "arn_CL"
  },
  nah: {
    title: "Axkan Ollin Chanin - Ollinmanta | Golivo",
    description: "Ollin chanin ihuan nepantla Golivopan.",
    keywords: "axkan, ollin, chanin",
    locale: "nah_MX"
  },

  // Additional Asian Languages
  ta: {
    title: "நேரடி கால்பந்து மதிப்பெண்கள் - கால்பந்து, கூடைப்பந்து, டென்னிஸ் | Golivo",
    description: "கால்பந்து, கூடைப்பந்து, டென்னிஸ் போட்டிகளின் நேரடி மதிப்பெண்கள் மற்றும் புள்ளிவிவரங்கள்.",
    keywords: "நேரடி மதிப்பெண்கள், கால்பந்து, கூடைப்பந்து, டென்னிஸ்",
    locale: "ta_IN"
  },
  te: {
    title: "ప్రత్యక్ష స్కోర్లు - ఫుట్బాల్, బాస్కెట్‌బాల్, టెన్నిస్ | Golivo",
    description: "ఫుట్బాల్, బాస్కెట్‌బాల్, టెన్నిస్ మరియు ఇతర క్రీడల ప్రత్యక్ష స్కోర్లు మరియు గణాంకాలు.",
    keywords: "ప్రత్యక్ష స్కోర్లు, ఫుట్బాల్, బాస్కెట్‌బాల్, టెన్నిస్",
    locale: "te_IN"
  },
  ml: {
    title: "തത്സമയ സ്കോറുകൾ - ഫുട്ബോൾ, ബാസ്കറ്റ്ബോൾ, ടെന്നീസ് | Golivo",
    description: "ഫുട്ബോൾ, ബാസ്കറ്റ്ബോൾ, ടെന്നീസ് എന്നിവയുടെ തത്സമയ സ്കോറുകളും സ്ഥിതിവിവരക്കണക്കുകളും.",
    keywords: "തത്സമയ സ്കോറുകൾ, ഫുട്ബോൾ, ബാസ്കറ്റ്ബോൾ, ടെന്നീസ്",
    locale: "ml_IN"
  },
  km: {
    title: "ពិន្ទុផ្ទាល់ - បាល់ទាត់, បាល់ទះ, តេនីស | Golivo",
    description: "ពិន្ទុផ្ទាល់ និងស្ថិតិសម្រាប់ការប្រកួតបាល់ទាត់ បាល់ទះ តេនីស។",
    keywords: "ពិន្ទុផ្ទាល់, បាល់ទាត់, បាល់ទះ, តេនីស",
    locale: "km_KH"
  },
  my: {
    title: "တိုက်ရိုက် ပွဲမှာများ - ဘောလုံး, ဘတ်စကတ်ဘော, တင်းနစ် | Golivo",
    description: "ဘောလုံး၊ ဘတ်စကတ်ဘော၊ တင်းနစ်နှင့် အခြားအားကစားများ၏ တိုက်ရိုက်ပွဲမှာများနှင့် စာရင်းအင်းများ။",
    keywords: "တိုက်ရိုက်ပွဲမှာများ, ဘောလုံး, ဘတ်စကတ်ဘော, တင်းနစ်",
    locale: "my_MM"
  },

  // Additional African Languages  
  zu: {
    title: "Amaphuzu okuphila - Ibhola, I-basketball, I-tennis | Golivo",
    description: "Amaphuzu okuphila nezibalo zemidlalo yebhola, i-basketball, i-tennis nokuningi.",
    keywords: "amaphuzu okuphila, ibhola, i-basketball, i-tennis",
    locale: "zu_ZA"
  },
  ak: {
    title: "Sɛ Ɛrekɔ Ball Agorɔ Live Scores | Golivo",
    description: "Ball agorɔ live scores ne akontaabu fi Golivo.",
    keywords: "sɛ ɛrekɔ, ball agorɔ, live scores",
    locale: "ak_GH"
  }
};

// Helper function to get SEO config for a specific language
export const getSEOConfig = (langCode: string): SEOConfig => {
  return seoConfig[langCode] || seoConfig.en; // Fallback to English
};

// Helper function to get all supported language codes for SEO
export const getSupportedSEOLanguages = (): string[] => {
  return Object.keys(seoConfig);
};