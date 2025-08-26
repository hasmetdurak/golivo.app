import { NextResponse } from "next/server"

const API_KEY = "47746f324863a1c7321a4b137847eba9e647469c8eacced9ca6175bbbadf5c2d"
const BASE_URL = "https://apiv3.apifootball.com"

// Dinamik öncelik sistemi - güne göre değişen lig sıralaması
function getPriorityLeagues() {
  const today = new Date()
  const dayOfWeek = today.getDay() // 0=Pazar, 1=Pazartesi, 2=Salı, 3=Çarşamba, 4=Perşembe, 5=Cuma, 6=Cumartesi
  
  // Salı (2), Çarşamba (3), Perşembe (4) günleri UEFA ligleri öncelikli
  if (dayOfWeek === 2 || dayOfWeek === 3 || dayOfWeek === 4) {
    return [
      { id: "3", name: "UEFA Champions League", country: "Europe", priority: 1 },
      { id: "4", name: "UEFA Europa League", country: "Europe", priority: 2 },
      { id: "683", name: "UEFA Conference League", country: "Europe", priority: 3 },
      { id: "152", name: "Premier League", country: "England", priority: 4 },
      { id: "302", name: "La Liga", country: "Spain", priority: 5 },
      { id: "175", name: "Bundesliga", country: "Germany", priority: 6 },
      { id: "207", name: "Serie A", country: "Italy", priority: 7 },
      { id: "266", name: "Primeira Liga", country: "Portugal", priority: 8 },
      { id: "322", name: "Süper Lig", country: "Turkey", priority: 9 },
      { id: "168", name: "Ligue 1", country: "France", priority: 10 },
      { id: "244", name: "Eredivisie", country: "Netherlands", priority: 11 },
      { id: "63", name: "First Division A", country: "Belgium", priority: 12 },
    ]
  } else {
    // Diğer günler: Premier League, La Liga, Bundesliga, Serie A, Primeira Liga, Süper Lig öncelikli
    return [
      { id: "152", name: "Premier League", country: "England", priority: 1 },
      { id: "302", name: "La Liga", country: "Spain", priority: 2 },
      { id: "175", name: "Bundesliga", country: "Germany", priority: 3 },
      { id: "207", name: "Serie A", country: "Italy", priority: 4 },
      { id: "266", name: "Primeira Liga", country: "Portugal", priority: 5 },
      { id: "322", name: "Süper Lig", country: "Turkey", priority: 6 },
      { id: "3", name: "UEFA Champions League", country: "Europe", priority: 7 },
      { id: "4", name: "UEFA Europa League", country: "Europe", priority: 8 },
      { id: "683", name: "UEFA Conference League", country: "Europe", priority: 9 },
      { id: "168", name: "Ligue 1", country: "France", priority: 10 },
      { id: "244", name: "Eredivisie", country: "Netherlands", priority: 11 },
      { id: "63", name: "First Division A", country: "Belgium", priority: 12 },
    ]
  }
}

async function safeJsonParse(response: Response) {
  try {
    const text = await response.text()
    // Clean up common JSON issues
    const cleanedText = text
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
      .replace(/\\"/g, '\\"') // Ensure quotes are properly escaped
      .replace(/"\s*:\s*"([^"]*)"([^,}\]]*)/g, '": "$1$2"') // Fix unescaped quotes in values

    return JSON.parse(cleanedText)
  } catch (error) {
    console.error("JSON parsing failed:", error)
    return null
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const PRIORITY_LEAGUES = getPriorityLeagues()
  const selectedLeagues = searchParams.get("leagues")?.split(",") || PRIORITY_LEAGUES.map(l => l.id)
  
  try {
    console.log("[GoLivo] Fetching matches from API for leagues:", selectedLeagues)

    // Tüm seçili ligler için paralel istekler
    const leaguePromises = selectedLeagues.map(leagueId => 
      fetch(`${BASE_URL}/?action=get_events&from=2024-01-01&to=2024-12-31&league_id=${leagueId}&APIkey=${API_KEY}`)
    )

    const responses = await Promise.all(leaguePromises)
    const leagueData = await Promise.all(responses.map(response => safeJsonParse(response)))

    console.log("[GoLivo] API responses received, transforming data...")

    const transformMatches = (matches: any[], leagueName: string) => {
      if (!matches || matches.length === 0 || matches === null) return []

      return matches.slice(0, 8).map((match: any) => ({
        id: match.match_id,
        homeTeam: match.match_hometeam_name,
        awayTeam: match.match_awayteam_name,
        homeScore: match.match_hometeam_score ? Number.parseInt(match.match_hometeam_score) : undefined,
        awayScore: match.match_awayteam_score ? Number.parseInt(match.match_awayteam_score) : undefined,
        isLive: match.match_live === "1",
        minute: match.match_status ? Number.parseInt(match.match_status) : undefined,
        status: match.match_live === "1" ? "live" : match.match_status === "Finished" ? "finished" : "upcoming",
        time: match.match_time,
        homeLogo: match.team_home_badge,
        awayLogo: match.team_away_badge,
        leagueId: match.league_id,
      }))
    }

    const matchesByLeague: { [key: string]: any[] } = {}

    // Öncelik sırasına göre ligleri sırala
    const sortedLeagues = selectedLeagues
      .map(leagueId => PRIORITY_LEAGUES.find(l => l.id === leagueId))
      .filter(Boolean)
      .sort((a, b) => (a?.priority || 999) - (b?.priority || 999))

    sortedLeagues.forEach((league, index) => {
      if (!league) return
      
      const leagueIndex = selectedLeagues.indexOf(league.id)
      if (leagueIndex === -1) return
      
      const matches = transformMatches(leagueData[leagueIndex], league.name)
      
      if (matches.length > 0) {
        matchesByLeague[league.name] = matches
      }
    })

    console.log("[GoLivo] Data transformation complete")
    return NextResponse.json(matchesByLeague)
  } catch (error) {
    console.error("[GoLivo] API Error:", error)

    // Dinamik fallback data - güne göre sıralı
    const today = new Date()
    const dayOfWeek = today.getDay()
    const isUEFADay = dayOfWeek === 2 || dayOfWeek === 3 || dayOfWeek === 4

    const fallbackData = isUEFADay ? {
      "UEFA Champions League": [
        {
          id: "5",
          homeTeam: "Bayern Munich",
          awayTeam: "Paris Saint-Germain",
          status: "upcoming" as const,
          time: "21:00",
          homeLogo: "/bayern-munich-logo.png",
          awayLogo: "/psg-logo.png",
        },
      ],
      "UEFA Europa League": [
        {
          id: "6",
          homeTeam: "Arsenal",
          awayTeam: "Sevilla",
          homeScore: 1,
          awayScore: 0,
          isLive: true,
          minute: 67,
          status: "live" as const,
          homeLogo: "/arsenal-logo.png",
          awayLogo: "/sevilla-logo.png",
        },
      ],
      "Premier League": [
        {
          id: "3",
          homeTeam: "Manchester City",
          awayTeam: "Liverpool",
          homeScore: 2,
          awayScore: 1,
          status: "finished" as const,
          homeLogo: "/manchester-city-logo.png",
          awayLogo: "/liverpool-logo.png",
        },
      ],
    } : {
      "Premier League": [
        {
          id: "3",
          homeTeam: "Manchester City",
          awayTeam: "Arsenal",
          homeScore: 2,
          awayScore: 1,
          isLive: true,
          minute: 78,
          status: "live" as const,
          homeLogo: "/manchester-city-logo.png",
          awayLogo: "/arsenal-logo.png",
        },
      ],
      "La Liga": [
        {
          id: "4",
          homeTeam: "Real Madrid",
          awayTeam: "Barcelona",
          homeScore: 0,
          awayScore: 0,
          isLive: true,
          minute: 23,
          status: "live" as const,
          homeLogo: "/real-madrid-crest.png",
          awayLogo: "/barcelona-crest.png",
        },
      ],
      "Süper Lig": [
        {
          id: "1",
          homeTeam: "Galatasaray",
          awayTeam: "Fenerbahçe",
          homeScore: 2,
          awayScore: 1,
          status: "finished" as const,
          homeLogo: "/galatasaray-logo.png",
          awayLogo: "/fenerbahce-logo.png",
        },
      ],
    }

    return NextResponse.json(fallbackData)
  }
}
