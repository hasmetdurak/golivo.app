// League utility functions for formatting and displaying league information

export interface LeagueMapping {
  [key: string]: {
    country: string;
    displayName: string;
    logo: string;
  };
}

// Comprehensive league mappings with country information
export const leagueMappings: LeagueMapping = {
  // English Leagues
  'Premier League': {
    country: 'England',
    displayName: 'England Premier League',
    logo: 'https://logos.football/img/brands/premier-league.png'
  },
  'Championship': {
    country: 'England', 
    displayName: 'England Championship',
    logo: 'https://logos.football/img/brands/premier-league.png'
  },
  
  // Spanish Leagues
  'La Liga': {
    country: 'Spain',
    displayName: 'Spain La Liga',
    logo: 'https://logos.football/img/brands/laliga-santander.png'
  },
  'Segunda División': {
    country: 'Spain',
    displayName: 'Spain Segunda División',
    logo: 'https://logos.football/img/brands/laliga-santander.png'
  },
  
  // German Leagues  
  'Bundesliga': {
    country: 'Germany',
    displayName: 'Germany Bundesliga',
    logo: 'https://logos.football/img/brands/bundesliga.png'
  },
  '2. Bundesliga': {
    country: 'Germany',
    displayName: 'Germany 2. Bundesliga', 
    logo: 'https://logos.football/img/brands/bundesliga.png'
  },
  
  // Italian Leagues
  'Serie A': {
    country: 'Italy',
    displayName: 'Italy Serie A',
    logo: 'https://logos.football/img/brands/serie-a.png'
  },
  'Serie B': {
    country: 'Italy',
    displayName: 'Italy Serie B',
    logo: 'https://logos.football/img/brands/serie-a.png'
  },
  
  // French Leagues
  'Ligue 1': {
    country: 'France', 
    displayName: 'France Ligue 1',
    logo: 'https://logos.football/img/brands/ligue-1.png'
  },
  'Ligue 2': {
    country: 'France',
    displayName: 'France Ligue 2',
    logo: 'https://logos.football/img/brands/ligue-1.png'
  },
  
  // Turkish Leagues
  'Süper Lig': {
    country: 'Turkey',
    displayName: 'Turkey Süper Lig',
    logo: 'https://logos.football/img/brands/super-lig.png'
  },
  'Super Lig': {
    country: 'Turkey',
    displayName: 'Turkey Super Lig',
    logo: 'https://logos.football/img/brands/super-lig.png'
  },
  'Trendyol Süper Lig': {
    country: 'Turkey',
    displayName: 'Turkey Trendyol Süper Lig',
    logo: 'https://logos.football/img/brands/super-lig.png'
  },
  
  // Portuguese Leagues
  'Primeira Liga': {
    country: 'Portugal',
    displayName: 'Portugal Primeira Liga',
    logo: 'https://logos.football/img/brands/primeira-liga.png'
  },
  
  // Dutch Leagues
  'Eredivisie': {
    country: 'Netherlands',
    displayName: 'Netherlands Eredivisie', 
    logo: 'https://logos.football/img/brands/eredivisie.png'
  },
  
  // Brazilian Leagues
  'Brasileirão': {
    country: 'Brazil',
    displayName: 'Brazil Brasileirão',
    logo: 'https://logos.football/img/brands/brasileiro-serie-a.png'
  },
  'Brazilian Serie A': {
    country: 'Brazil',
    displayName: 'Brazil Serie A',
    logo: 'https://logos.football/img/brands/brasileiro-serie-a.png'
  },
  
  // Argentine Leagues
  'Argentine Primera División': {
    country: 'Argentina',
    displayName: 'Argentina Primera División',
    logo: 'https://logos.football/img/brands/primera-division.png'
  },
  
  // American Leagues
  'Major League Soccer': {
    country: 'USA',
    displayName: 'USA Major League Soccer',
    logo: 'https://logos.football/img/brands/mls.png'
  },
  'MLS': {
    country: 'USA', 
    displayName: 'USA MLS',
    logo: 'https://logos.football/img/brands/mls.png'
  },
  
  // Saudi Arabian Leagues
  'Saudi Pro League': {
    country: 'Saudi Arabia',
    displayName: 'Saudi Arabia Pro League',
    logo: 'https://logos.football/img/brands/saudi-pro-league.png'
  },
  
  // Chinese Leagues
  'Chinese Super League': {
    country: 'China',
    displayName: 'China Super League',
    logo: 'https://logos.football/img/brands/chinese-super-league.png'
  },
  
  // European Competitions
  'Champions League': {
    country: 'Europe',
    displayName: 'UEFA Champions League',
    logo: 'https://logos.football/img/brands/uefa-champions-league.png'
  },
  'UEFA Champions League': {
    country: 'Europe',
    displayName: 'UEFA Champions League', 
    logo: 'https://logos.football/img/brands/uefa-champions-league.png'
  },
  'Europa League': {
    country: 'Europe',
    displayName: 'UEFA Europa League',
    logo: 'https://logos.football/img/brands/uefa-europa-league.png'
  },
  'UEFA Europa League': {
    country: 'Europe',
    displayName: 'UEFA Europa League',
    logo: 'https://logos.football/img/brands/uefa-europa-league.png'
  },
  'Conference League': {
    country: 'Europe',
    displayName: 'UEFA Conference League',
    logo: 'https://logos.football/img/brands/uefa-europa-conference-league.png'
  },
  'UEFA Conference League': {
    country: 'Europe',
    displayName: 'UEFA Conference League',
    logo: 'https://logos.football/img/brands/uefa-europa-conference-league.png'
  }
};

/**
 * Get formatted league display name with country prefix
 */
export const getFormattedLeagueName = (leagueName: string, leagueCountry?: string): string => {
  // First check if we have a specific mapping
  if (leagueMappings[leagueName]) {
    return leagueMappings[leagueName].displayName;
  }
  
  // If we have country information, use it
  if (leagueCountry && leagueCountry !== 'Unknown') {
    return `${leagueCountry} ${leagueName}`;
  }
  
  // Try to extract country from existing name patterns
  const patterns = [
    { regex: /^(Premier League|Championship)$/i, country: 'England' },
    { regex: /^(La Liga|Segunda División)$/i, country: 'Spain' },
    { regex: /^(Bundesliga|2\. Bundesliga)$/i, country: 'Germany' },
    { regex: /^(Serie A|Serie B)$/i, country: 'Italy' },
    { regex: /^(Ligue 1|Ligue 2)$/i, country: 'France' },
    { regex: /^(Süper Lig|Super Lig)$/i, country: 'Turkey' },
    { regex: /^(Eredivisie)$/i, country: 'Netherlands' },
    { regex: /^(Primeira Liga)$/i, country: 'Portugal' }
  ];
  
  for (const pattern of patterns) {
    if (pattern.regex.test(leagueName)) {
      return `${pattern.country} ${leagueName}`;
    }
  }
  
  // Fall back to original name
  return leagueName;
};

/**
 * Get league logo URL
 */
export const getLeagueLogo = (leagueName: string): string => {
  if (leagueMappings[leagueName]) {
    return leagueMappings[leagueName].logo;
  }
  
  // Fallback to default logo
  return '/placeholder-logo.svg';
};

/**
 * Get country information for a league
 */
export const getLeagueCountry = (leagueName: string): string => {
  if (leagueMappings[leagueName]) {
    return leagueMappings[leagueName].country;
  }
  
  return 'Unknown';
};

/**
 * Get flag emoji for country
 */
export const getCountryFlag = (country: string): string => {
  const flagMap: { [key: string]: string } = {
    'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Spain': '🇪🇸',
    'Germany': '🇩🇪', 
    'Italy': '🇮🇹',
    'France': '🇫🇷',
    'Turkey': '🇹🇷',
    'Netherlands': '🇳🇱',
    'Portugal': '🇵🇹',
    'Brazil': '🇧🇷',
    'Argentina': '🇦🇷',
    'USA': '🇺🇸',
    'Saudi Arabia': '🇸🇦',
    'China': '🇨🇳',
    'Europe': '🇪🇺'
  };
  
  return flagMap[country] || '🌍';
};