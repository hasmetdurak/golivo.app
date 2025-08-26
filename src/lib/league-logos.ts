export const leagueLogos: Record<string, string> = {
  // English Leagues
  "Premier League": "/leagues/premier-league.png",
  Championship: "/leagues/premier-league.png",
  "League One": "/leagues/premier-league.png",

  // Spanish Leagues
  "La Liga": "/leagues/la-liga.png",
  "Segunda División": "/leagues/la-liga.png",
  LaLiga: "/leagues/la-liga.png",

  // Italian Leagues
  "Serie A": "/leagues/serie-a.png",
  "Serie B": "/leagues/serie-a.png",

  // German Leagues
  Bundesliga: "/leagues/bundesliga.png",
  "2. Bundesliga": "/leagues/bundesliga.png",

  // French Leagues
  "Ligue 1": "/leagues/ligue-1.png",
  "Ligue 2": "/leagues/ligue-1.png",

  // European Competitions
  "UEFA Champions League": "/leagues/champions-league.png",
  "Champions League": "/leagues/champions-league.png",
  "UEFA Europa League": "/leagues/europa-league.png",
  "Europa League": "/leagues/europa-league.png",

  // Other major leagues
  Eredivisie: "/leagues/premier-league.png",
  "Primeira Liga": "/leagues/la-liga.png",
  "Scottish Premiership": "/leagues/premier-league.png",
  MLS: "/leagues/premier-league.png",
  "Brazilian Serie A": "/leagues/serie-a.png",
  "Argentine Primera División": "/leagues/la-liga.png",
}

export function getLeagueLogo(leagueName: string): string | undefined {
  // Try exact match first
  if (leagueLogos[leagueName]) {
    return leagueLogos[leagueName]
  }

  // Try partial matches for variations
  const normalizedName = leagueName.toLowerCase()
  for (const [key, logo] of Object.entries(leagueLogos)) {
    if (normalizedName.includes(key.toLowerCase()) || key.toLowerCase().includes(normalizedName)) {
      return logo
    }
  }

  return undefined
}