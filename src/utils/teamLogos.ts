// Official team logo URLs from verified sources
export const getOfficialTeamLogo = (teamName: string): string => {
  const normalizedName = teamName.toLowerCase().trim();
  
  // Premier League teams
  const premierLeagueLogos: { [key: string]: string } = {
    'arsenal': 'https://logos.football/img/brands/arsenal-fc.png',
    'aston villa': 'https://logos.football/img/brands/aston-villa-fc.png',
    'bournemouth': 'https://logos.football/img/brands/afc-bournemouth.png',
    'brentford': 'https://logos.football/img/brands/brentford-fc.png',
    'brighton': 'https://logos.football/img/brands/brighton-hove-albion-fc.png',
    'brighton & hove albion': 'https://logos.football/img/brands/brighton-hove-albion-fc.png',
    'burnley': 'https://logos.football/img/brands/burnley-fc.png',
    'chelsea': 'https://logos.football/img/brands/chelsea-fc.png',
    'crystal palace': 'https://logos.football/img/brands/crystal-palace-fc.png',
    'everton': 'https://logos.football/img/brands/everton-fc.png',
    'fulham': 'https://logos.football/img/brands/fulham-fc.png',
    'liverpool': 'https://logos.football/img/brands/liverpool-fc.png',
    'luton town': 'https://logos.football/img/brands/luton-town-fc.png',
    'manchester city': 'https://logos.football/img/brands/manchester-city-fc.png',
    'manchester united': 'https://logos.football/img/brands/manchester-united-fc.png',
    'newcastle united': 'https://logos.football/img/brands/newcastle-united-fc.png',
    'nottingham forest': 'https://logos.football/img/brands/nottingham-forest-fc.png',
    'sheffield united': 'https://logos.football/img/brands/sheffield-united-fc.png',
    'tottenham': 'https://logos.football/img/brands/tottenham-hotspur-fc.png',
    'tottenham hotspur': 'https://logos.football/img/brands/tottenham-hotspur-fc.png',
    'west ham united': 'https://logos.football/img/brands/west-ham-united-fc.png',
    'wolverhampton wanderers': 'https://logos.football/img/brands/wolverhampton-wanderers-fc.png',
    'wolves': 'https://logos.football/img/brands/wolverhampton-wanderers-fc.png'
  };

  // La Liga teams
  const laLigaLogos: { [key: string]: string } = {
    'real madrid': 'https://logos.football/img/brands/real-madrid-cf.png',
    'barcelona': 'https://logos.football/img/brands/fc-barcelona.png',
    'fc barcelona': 'https://logos.football/img/brands/fc-barcelona.png',
    'atletico madrid': 'https://logos.football/img/brands/atletico-madrid.png',
    'sevilla': 'https://logos.football/img/brands/sevilla-fc.png',
    'valencia': 'https://logos.football/img/brands/valencia-cf.png',
    'villarreal': 'https://logos.football/img/brands/villarreal-cf.png',
    'real sociedad': 'https://logos.football/img/brands/real-sociedad.png',
    'athletic bilbao': 'https://logos.football/img/brands/athletic-club.png',
    'real betis': 'https://logos.football/img/brands/real-betis.png',
    'celta vigo': 'https://logos.football/img/brands/rc-celta-de-vigo.png',
    'espanyol': 'https://logos.football/img/brands/rcd-espanyol.png',
    'getafe': 'https://logos.football/img/brands/getafe-cf.png',
    'granada': 'https://logos.football/img/brands/granada-cf.png',
    'levante': 'https://logos.football/img/brands/levante-ud.png',
    'mallorca': 'https://logos.football/img/brands/rcd-mallorca.png',
    'osasuna': 'https://logos.football/img/brands/ca-osasuna.png',
    'rayo vallecano': 'https://logos.football/img/brands/rayo-vallecano.png',
    'cadiz': 'https://logos.football/img/brands/cadiz-cf.png',
    'elche': 'https://logos.football/img/brands/elche-cf.png'
  };

  // Serie A teams
  const serieALogos: { [key: string]: string } = {
    'juventus': 'https://logos.football/img/brands/juventus-fc.png',
    'ac milan': 'https://logos.football/img/brands/ac-milan.png',
    'milan': 'https://logos.football/img/brands/ac-milan.png',
    'inter milan': 'https://logos.football/img/brands/fc-internazionale-milano.png',
    'inter': 'https://logos.football/img/brands/fc-internazionale-milano.png',
    'napoli': 'https://logos.football/img/brands/ssc-napoli.png',
    'roma': 'https://logos.football/img/brands/as-roma.png',
    'as roma': 'https://logos.football/img/brands/as-roma.png',
    'lazio': 'https://logos.football/img/brands/ss-lazio.png',
    'ss lazio': 'https://logos.football/img/brands/ss-lazio.png',
    'atalanta': 'https://logos.football/img/brands/atalanta-bc.png',
    'fiorentina': 'https://logos.football/img/brands/acf-fiorentina.png',
    'torino': 'https://logos.football/img/brands/torino-fc.png',
    'bologna': 'https://logos.football/img/brands/bologna-fc.png',
    'sampdoria': 'https://logos.football/img/brands/uc-sampdoria.png',
    'genoa': 'https://logos.football/img/brands/genoa-cfc.png',
    'cagliari': 'https://logos.football/img/brands/cagliari-calcio.png',
    'sassuolo': 'https://logos.football/img/brands/us-sassuolo-calcio.png',
    'udinese': 'https://logos.football/img/brands/udinese-calcio.png',
    'verona': 'https://logos.football/img/brands/hellas-verona-fc.png',
    'spezia': 'https://logos.football/img/brands/spezia-calcio.png',
    'venezia': 'https://logos.football/img/brands/venezia-fc.png',
    'empoli': 'https://logos.football/img/brands/empoli-fc.png',
    'salernitana': 'https://logos.football/img/brands/us-salernitana.png'
  };

  // Bundesliga teams
  const bundesligaLogos: { [key: string]: string } = {
    'bayern munich': 'https://logos.football/img/brands/fc-bayern-munchen.png',
    'fc bayern munich': 'https://logos.football/img/brands/fc-bayern-munchen.png',
    'borussia dortmund': 'https://logos.football/img/brands/borussia-dortmund.png',
    'bvb': 'https://logos.football/img/brands/borussia-dortmund.png',
    'rb leipzig': 'https://logos.football/img/brands/rb-leipzig.png',
    'bayer leverkusen': 'https://logos.football/img/brands/bayer-04-leverkusen.png',
    'borussia monchengladbach': 'https://logos.football/img/brands/borussia-monchengladbach.png',
    'eintracht frankfurt': 'https://logos.football/img/brands/eintracht-frankfurt.png',
    'wolfsburg': 'https://logos.football/img/brands/vfl-wolfsburg.png',
    'vfl wolfsburg': 'https://logos.football/img/brands/vfl-wolfsburg.png',
    'union berlin': 'https://logos.football/img/brands/1-fc-union-berlin.png',
    'fc koln': 'https://logos.football/img/brands/1-fc-koln.png',
    'hoffenheim': 'https://logos.football/img/brands/tsg-hoffenheim.png',
    'mainz': 'https://logos.football/img/brands/1-fsv-mainz-05.png',
    'hertha berlin': 'https://logos.football/img/brands/hertha-bsc.png',
    'vfb stuttgart': 'https://logos.football/img/brands/vfb-stuttgart.png',
    'werder bremen': 'https://logos.football/img/brands/sv-werder-bremen.png',
    'schalke 04': 'https://logos.football/img/brands/fc-schalke-04.png',
    'freiburg': 'https://logos.football/img/brands/sc-freiburg.png',
    'augsburg': 'https://logos.football/img/brands/fc-augsburg.png'
  };

  // Turkish Super League teams
  const superLigLogos: { [key: string]: string } = {
    'galatasaray': 'https://logos.football/img/brands/galatasaray-sk.png',
    'fenerbahce': 'https://logos.football/img/brands/fenerbahce-sk.png',
    'fenerbahçe': 'https://logos.football/img/brands/fenerbahce-sk.png',
    'besiktas': 'https://logos.football/img/brands/besiktas-jk.png',
    'beşiktaş': 'https://logos.football/img/brands/besiktas-jk.png',
    'trabzonspor': 'https://logos.football/img/brands/trabzonspor.png',
    'basaksehir': 'https://logos.football/img/brands/istanbul-basaksehir-fk.png',
    'başakşehir': 'https://logos.football/img/brands/istanbul-basaksehir-fk.png',
    'sivasspor': 'https://logos.football/img/brands/demir-grup-sivasspor.png',
    'antalyaspor': 'https://logos.football/img/brands/antalyaspor.png',
    'konyaspor': 'https://logos.football/img/brands/konyaspor.png',
    'alanyaspor': 'https://logos.football/img/brands/alanyaspor.png',
    'gaziantep fk': 'https://logos.football/img/brands/gaziantep-fk.png',
    'kayserispor': 'https://logos.football/img/brands/kayserispor.png',
    'rizespor': 'https://logos.football/img/brands/caykur-rizespor.png',
    'yeni malatyaspor': 'https://logos.football/img/brands/yeni-malatyaspor.png',
    'goztepe': 'https://logos.football/img/brands/goztepe-sk.png',
    'göztepe': 'https://logos.football/img/brands/goztepe-sk.png',
    'denizlispor': 'https://logos.football/img/brands/denizlispor.png',
    'kasimpasa': 'https://logos.football/img/brands/kasimpasa-sk.png',
    'kasımpaşa': 'https://logos.football/img/brands/kasimpasa-sk.png'
  };

  // Ligue 1 teams
  const ligue1Logos: { [key: string]: string } = {
    'paris saint-germain': 'https://logos.football/img/brands/paris-saint-germain-fc.png',
    'psg': 'https://logos.football/img/brands/paris-saint-germain-fc.png',
    'marseille': 'https://logos.football/img/brands/olympique-de-marseille.png',
    'olympique marseille': 'https://logos.football/img/brands/olympique-de-marseille.png',
    'lyon': 'https://logos.football/img/brands/olympique-lyonnais.png',
    'olympique lyon': 'https://logos.football/img/brands/olympique-lyonnais.png',
    'lille': 'https://logos.football/img/brands/lille-osc.png',
    'monaco': 'https://logos.football/img/brands/as-monaco-fc.png',
    'as monaco': 'https://logos.football/img/brands/as-monaco-fc.png',
    'nice': 'https://logos.football/img/brands/ogc-nice.png',
    'rennes': 'https://logos.football/img/brands/stade-rennais-fc.png',
    'montpellier': 'https://logos.football/img/brands/montpellier-hsc.png',
    'strasbourg': 'https://logos.football/img/brands/rc-strasbourg-alsace.png',
    'nantes': 'https://logos.football/img/brands/fc-nantes.png',
    'reims': 'https://logos.football/img/brands/stade-de-reims.png',
    'lens': 'https://logos.football/img/brands/rc-lens.png',
    'angers': 'https://logos.football/img/brands/angers-sco.png',
    'brest': 'https://logos.football/img/brands/stade-brestois-29.png',
    'metz': 'https://logos.football/img/brands/fc-metz.png',
    'saint-etienne': 'https://logos.football/img/brands/as-saint-etienne.png',
    'bordeaux': 'https://logos.football/img/brands/fc-girondins-de-bordeaux.png'
  };

  // Combine all leagues
  const allLogos = {
    ...premierLeagueLogos,
    ...laLigaLogos,
    ...serieALogos,
    ...bundesligaLogos,
    ...superLigLogos,
    ...ligue1Logos
  };

  // Try to find exact match first
  if (allLogos[normalizedName]) {
    return allLogos[normalizedName];
  }

  // Try partial matches
  for (const [key, logo] of Object.entries(allLogos)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return logo;
    }
  }

  // Fallback to placeholder
  return '/placeholder-logo.svg';
};

// Alternative API-based logo fetcher (backup)
export const getTeamLogoFromAPI = (teamName: string): string => {
  // ESPN or other sports API logo URLs
  const teamSlug = teamName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  return `https://a.espncdn.com/i/teamlogos/soccer/500/${teamSlug}.png`;
};

// Get official league logos
export const getOfficialLeagueLogo = (leagueName: string): string => {
  const normalizedName = leagueName.toLowerCase().trim();
  
  const leagueLogos: { [key: string]: string } = {
    'premier league': 'https://logos.football/img/brands/premier-league.png',
    'english premier league': 'https://logos.football/img/brands/premier-league.png',
    'la liga': 'https://logos.football/img/brands/laliga-santander.png',
    'spanish la liga': 'https://logos.football/img/brands/laliga-santander.png',
    'serie a': 'https://logos.football/img/brands/serie-a.png',
    'italian serie a': 'https://logos.football/img/brands/serie-a.png',
    'bundesliga': 'https://logos.football/img/brands/bundesliga.png',
    'german bundesliga': 'https://logos.football/img/brands/bundesliga.png',
    'ligue 1': 'https://logos.football/img/brands/ligue-1.png',
    'french ligue 1': 'https://logos.football/img/brands/ligue-1.png',
    'süper lig': 'https://logos.football/img/brands/super-lig.png',
    'turkish super league': 'https://logos.football/img/brands/super-lig.png',
    'super lig': 'https://logos.football/img/brands/super-lig.png',
    'champions league': 'https://logos.football/img/brands/uefa-champions-league.png',
    'uefa champions league': 'https://logos.football/img/brands/uefa-champions-league.png',
    'europa league': 'https://logos.football/img/brands/uefa-europa-league.png',
    'uefa europa league': 'https://logos.football/img/brands/uefa-europa-league.png',
    'conference league': 'https://logos.football/img/brands/uefa-europa-conference-league.png',
    'uefa conference league': 'https://logos.football/img/brands/uefa-europa-conference-league.png'
  };

  return leagueLogos[normalizedName] || '/placeholder-logo.svg';
};