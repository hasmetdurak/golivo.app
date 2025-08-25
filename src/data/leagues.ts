export const leagues = [
  // 1. Premier League (İngiltere) – Dünyada en çok izlenen, en değerli yayın hakları
  {
    id: '152',
    name: 'Premier League',
    country: 'England',
    logo: 'https://logos-world.net/wp-content/uploads/2020/06/Premier-League-Logo.png',
    priority: 1,
    description: 'Dünyada en çok izlenen, en değerli yayın hakları'
  },
  
  // 2. La Liga (İspanya) – Real Madrid & Barcelona sayesinde global takipçi
  {
    id: '302',
    name: 'La Liga',
    country: 'Spain', 
    logo: 'https://logoeps.com/wp-content/uploads/2013/03/la-liga-vector-logo.png',
    priority: 2,
    description: 'Real Madrid & Barcelona sayesinde global takipçi'
  },
  
  // 3. Bundesliga (Almanya) – Bayern ve Borussia Dortmund'un etkisi
  {
    id: '175',
    name: 'Bundesliga',
    country: 'Germany',
    logo: 'https://logoeps.com/wp-content/uploads/2013/09/bundesliga-vector-logo.png',
    priority: 3,
    description: 'Bayern ve Borussia Dortmund\'un etkisi'
  },
  
  // 4. Serie A (İtalya) – Juventus, Milan, Inter gibi devler
  {
    id: '207',
    name: 'Serie A',
    country: 'Italy',
    logo: 'https://logoeps.com/wp-content/uploads/2013/03/serie-a-vector-logo.png',
    priority: 4,
    description: 'Juventus, Milan, Inter gibi devler'
  },
  
  // 5. Ligue 1 (Fransa) – PSG sayesinde global kitle kazandı
  {
    id: '168',
    name: 'Ligue 1',
    country: 'France',
    logo: 'https://logoeps.com/wp-content/uploads/2013/03/ligue-1-vector-logo.png',
    priority: 5,
    description: 'PSG sayesinde global kitle kazandı'
  },
  
  // 6. Süper Lig (Türkiye) – Diaspora + bahis ilgisiyle öne çıkıyor
  {
    id: '322',
    name: 'Süper Lig',
    country: 'Turkey',
    logo: 'https://logoeps.com/wp-content/uploads/2014/11/super-lig-vector-logo.png',
    priority: 6,
    description: 'Diaspora + bahis ilgisiyle öne çıkıyor'
  },
  
  // 7. Eredivisie (Hollanda) – Ajax gibi markalarla
  {
    id: '137',
    name: 'Eredivisie',
    country: 'Netherlands',
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Eredivisie_nieuw_logo_2017.png',
    priority: 7,
    description: 'Ajax gibi markalarla'
  },
  
  // 8. Primeira Liga (Portekiz) – Benfica, Porto, Sporting
  {
    id: '94',
    name: 'Primeira Liga',
    country: 'Portugal',
    logo: 'https://upload.wikimedia.org/wikipedia/en/8/8a/Primeira_Liga_logo.png',
    priority: 8,
    description: 'Benfica, Porto, Sporting'
  },
  
  // 9. Major League Soccer (ABD) – Messi sonrası yükselişte
  {
    id: '253',
    name: 'Major League Soccer',
    country: 'USA',
    logo: 'https://upload.wikimedia.org/wikipedia/en/a/a3/Major_League_Soccer_logo.svg',
    priority: 9,
    description: 'Messi sonrası yükselişte'
  },
  
  // 10. Brasileirão (Brezilya) – Futbolcu kaynağı olarak popüler
  {
    id: '71',
    name: 'Brasileirão',
    country: 'Brazil',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/42/Campeonato_Brasileiro_S%C3%A9rie_A_logo.png',
    priority: 10,
    description: 'Futbolcu kaynağı olarak popüler'
  },
  
  // 11. Argentine Primera División – Boca, River Plate etkisi
  {
    id: '26',
    name: 'Argentine Primera División',
    country: 'Argentina',
    logo: 'https://upload.wikimedia.org/wikipedia/en/1/1a/Primera_Divisi%C3%B3n_Logo.png',
    priority: 11,
    description: 'Boca, River Plate etkisi'
  },
  
  // 12. Saudi Pro League (Suudi Arabistan) – Yeni transferler sayesinde hype
  {
    id: '350',
    name: 'Saudi Pro League',
    country: 'Saudi Arabia',
    logo: 'https://upload.wikimedia.org/wikipedia/en/8/8a/Saudi_Professional_League_logo.png',
    priority: 12,
    description: 'Yeni transferler sayesinde hype'
  },
  
  // 13. Chinese Super League
  {
    id: '169',
    name: 'Chinese Super League',
    country: 'China',
    logo: 'https://upload.wikimedia.org/wikipedia/en/8/8a/Chinese_Super_League_logo.png',
    priority: 13,
    description: 'Asya\'nın önemli liglerinden'
  },
  
  // 14. Champions League (Avrupa) – En prestijli kulüp turnuvası
  {
    id: '3',
    name: 'Champions League',
    country: 'Europe',
    logo: 'https://logoeps.com/wp-content/uploads/2013/03/uefa-champions-league-vector-logo.png',
    priority: 14,
    description: 'En prestijli kulüp turnuvası'
  },
  
  // 15. Europa League (Avrupa) – İkinci seviye Avrupa turnuvası
  {
    id: '4',
    name: 'Europa League',
    country: 'Europe',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/05/UEFA_Europa_League_logo.svg',
    priority: 15,
    description: 'İkinci seviye Avrupa turnuvası'
  },
  
  // 16. Conference League (Avrupa) – Üçüncü seviye Avrupa turnuvası
  {
    id: '848',
    name: 'Conference League',
    country: 'Europe',
    logo: 'https://upload.wikimedia.org/wikipedia/en/1/1b/UEFA_Conference_League_logo.svg',
    priority: 16,
    description: 'Üçüncü seviye Avrupa turnuvası'
  }
];

// Ligleri öncelik sırasına göre sırala
export const sortedLeagues = [...leagues].sort((a, b) => a.priority - b.priority);

// Öncelikli ligler (ilk 10)
export const priorityLeagues = sortedLeagues.slice(0, 10);

// Tüm ligler
export const allLeagues = sortedLeagues;