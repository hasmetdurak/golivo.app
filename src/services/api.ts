const BASE_URL = 'https://apiv3.apifootball.com';
const API_KEY = '47746f324863a1c7321a4b137847eba9e647469c8eacced9ca6175bbbadf5c2d';

// League ID mappings for major leagues - updated with priority order
const LEAGUE_IDS = {
  // 1. Premier League (İngiltere)
  'Premier League': '152',
  'English Premier League': '152',
  
  // 2. La Liga (İspanya)
  'La Liga': '302',
  'Spanish La Liga': '302',
  
  // 3. Bundesliga (Almanya)
  'Bundesliga': '175',
  'German Bundesliga': '175',
  
  // 4. Serie A (İtalya)
  'Serie A': '207',
  'Italian Serie A': '207',
  
  // 5. Ligue 1 (Fransa)
  'Ligue 1': '168',
  'French Ligue 1': '168',
  
  // 6. Süper Lig (Türkiye)
  'Süper Lig': '322',
  'Turkish Super League': '322',
  'Super Lig': '322',
  
  // 7. Eredivisie (Hollanda)
  'Eredivisie': '137',
  'Dutch Eredivisie': '137',
  
  // 8. Primeira Liga (Portekiz)
  'Primeira Liga': '94',
  'Portuguese Primeira Liga': '94',
  
  // 9. Major League Soccer (ABD)
  'Major League Soccer': '253',
  'MLS': '253',
  
  // 10. Brasileirão (Brezilya)
  'Brasileirão': '71',
  'Brazilian Brasileirão': '71',
  
  // 11. Argentine Primera División
  'Argentine Primera División': '26',
  'Argentine Primera Division': '26',
  
  // 12. Saudi Pro League
  'Saudi Pro League': '350',
  
  // 13. Chinese Super League
  'Chinese Super League': '169',
  
  // 14. Champions League (Avrupa)
  'Champions League': '3',
  'UEFA Champions League': '3',
  
  // 15. Europa League (Avrupa)
  'Europa League': '4',
  'UEFA Europa League': '4',
  
  // 16. Conference League (Avrupa)
  'Conference League': '848',
  'UEFA Conference League': '848'
};

// League ID to proper league name mapping
const LEAGUE_ID_TO_NAME: Record<string, string> = {
  '3': 'UEFA Champions League',
  '152': 'English Premier League',
  '302': 'Spanish La Liga', 
  '207': 'Italian Serie A',
  '175': 'German Bundesliga',
  '56': 'Austrian Bundesliga',
  '168': 'French Ligue 1',
  '340': 'Turkish Super League',
  '344': 'Russian Premier League',
  '244': 'Dutch Eredivisie',
  '266': 'Portuguese Primeira Liga',
  '63': 'Belgian Pro League',
  '332': 'American MLS',
  '99': 'Brazilian Brasileirão',
  // Additional leagues with potential name conflicts
  '154': 'Scottish Premiership',
  '218': 'Swiss Super League',
  '181': 'Ukrainian Premier League',
  '268': 'Czech First League',
  '272': 'Croatian First League',
  '276': 'Serbian SuperLiga',
  '294': 'Greek Super League',
  '271': 'Bulgarian First League',
  '278': 'Romanian Liga 1',
  '279': 'Slovenian PrvaLiga',
  '284': 'Slovakian Super Liga',
  '285': 'Hungarian NB I',
  '286': 'Estonian Meistriliiga',
  '287': 'Latvian Virsliga',
  '288': 'Lithuanian A Lyga',
  '289': 'Belarusian Premier League',
  '290': 'Moldovan National Division',
  '134': 'Czech Republic First League',
  '262': 'Polish Ekstraklasa',
  '295': 'Cyprus First Division',
  '296': 'Malta Premier League',
  '297': 'Gibraltar National League',
  '298': 'Andorran First Division',
  '299': 'San Marino Championship',
  '300': 'Faroe Islands Premier League',
  '301': 'Luxembourg National Division'
};

interface ApiMatch {
  match_id: string;
  country_name: string;
  league_name: string;
  league_id?: string;
  match_date: string;
  match_status: string;
  match_time: string;
  match_hometeam_name: string;
  match_hometeam_score: string;
  match_awayteam_name: string;
  match_awayteam_score: string;
  team_home_badge: string;
  team_away_badge: string;
  league_logo: string;
  match_live: string;
  match_round?: string;
  match_referee?: string;
  match_venue?: string;
  match_ft_score?: string;
  match_et_score?: string;
  goalscorer?: Array<{
    time: string;
    home_scorer: string;
    away_scorer: string;
    score: string;
    home_assist?: string;
    away_assist?: string;
  }>;
  cards?: Array<{
    time: string;
    home_fault: string;
    away_fault: string;
    card: string;
  }>;
  substitutions?: Array<{
    time: string;
    substitution: string;
  }>;
  lineup?: {
    home?: {
      starting_lineups?: Array<{
        lineup_player: string;
        lineup_number: string;
        lineup_position: string;
      }>;
      substitutes?: Array<{
        lineup_player: string;
        lineup_number: string;
        lineup_position: string;
      }>;
    };
    away?: {
      starting_lineups?: Array<{
        lineup_player: string;
        lineup_number: string;
        lineup_position: string;
      }>;
      substitutes?: Array<{
        lineup_player: string;
        lineup_number: string;
        lineup_position: string;
      }>;
    };
  };
  statistics?: Array<{
    type: string;
    home: string;
    away: string;
  }>;
}

// Deprecated - use StandingsTeam instead
interface TeamStanding {
  country_name: string;
  league_id: string;
  league_name: string;
  team_id: string;
  team_name: string;
  team_badge: string;
  overall_league_position: string;
  overall_league_payed: string;
  overall_league_W: string;
  overall_league_D: string;
  overall_league_L: string;
  overall_league_GF: string;
  overall_league_GA: string;
  overall_league_PTS: string;
}

interface PlayerStats {
  player_key: string;
  player_name: string;
  player_number: string;
  player_country: string;
  player_type: string;
  player_age: string;
  player_match_played: string;
  player_goals: string;
  player_yellow_cards: string;
  player_red_cards: string;
  team_name: string;
  team_key: string;
}

interface LeagueInfo {
  league_id: string;
  league_name: string;
  league_season: string;
  league_logo: string;
  country_name: string;
  country_logo: string;
}

// New comprehensive interfaces for API expansion
interface Country {
  country_id: string;
  country_name: string;
  country_logo: string;
}

interface TeamDetails {
  team_key: string;
  team_name: string;
  team_country: string;
  team_founded: string;
  team_badge: string;
  venue: {
    venue_name: string;
    venue_address: string;
    venue_city: string;
    venue_capacity: string;
    venue_surface: string;
  };
  players: Player[];
  coaches: Coach[];
}

interface Player {
  player_key: number;
  player_id: string;
  player_image: string;
  player_name: string;
  player_number: string;
  player_country: string;
  player_type: 'Goalkeepers' | 'Defenders' | 'Midfielders' | 'Forwards';
  player_age: string;
  player_match_played: string;
  player_goals: string;
  player_yellow_cards: string;
  player_red_cards: string;
  player_injured: 'Yes' | 'No';
  player_substitute_out: string;
  player_substitutes_on_bench: string;
  player_assists: string;
  player_birthdate: string;
  player_is_captain: string;
  player_shots_total: string;
  player_goals_conceded: string;
  player_fouls_committed: string;
  player_tackles: string;
  player_blocks: string;
  player_crosses_total: string;
  player_interceptions: string;
  player_clearances: string;
  player_dispossesed: string;
  player_saves: string;
  player_inside_box_saves: string;
  player_duels_total: string;
  player_duels_won: string;
  player_dribble_attempts: string;
  player_dribble_succ: string;
  player_pen_comm: string;
  player_pen_won: string;
  player_pen_scored: string;
  player_pen_missed: string;
  player_passes: string;
  player_passes_accuracy: string;
  player_key_passes: string;
  player_woordworks: string;
  player_rating: string;
  player_minutes?: string;
  team_name?: string;
  team_key?: string;
}

interface Coach {
  coach_name: string;
  coach_country: string;
  coach_age: string;
}

interface StandingsTeam {
  country_name: string;
  league_id: string;
  league_name: string;
  team_id: string;
  team_name: string;
  team_badge: string;
  overall_league_position: string;
  overall_league_payed: string;
  overall_league_W: string;
  overall_league_D: string;
  overall_league_L: string;
  overall_league_GF: string;
  overall_league_GA: string;
  overall_league_PTS: string;
  home_league_position?: string;
  home_league_payed?: string;
  home_league_W?: string;
  home_league_D?: string;
  home_league_L?: string;
  home_league_GF?: string;
  home_league_GA?: string;
  home_league_PTS?: string;
  away_league_position?: string;
  away_league_payed?: string;
  away_league_W?: string;
  away_league_D?: string;
  away_league_L?: string;
  away_league_GF?: string;
  away_league_GA?: string;
  away_league_PTS?: string;
}

interface TopScorer {
  player_place: string;
  player_name: string;
  player_key: string;
  team_name: string;
  team_key: string;
  goals: string;
  assists: string;
  penalty_goals: string;
  matches: string;
}

interface MatchPrediction {
  match_id: string;
  prob_HW: string;
  prob_D: string;
  prob_AW: string;
  prob_HW_D: string;
  prob_AW_D: string;
  prob_O: string;
  prob_U: string;
}

interface Injury {
  player_id: string;
  player_name: string;
  player_image: string;
  player_position: string;
  team_name: string;
  team_id: string;
  injury_reason: string;
  injury_date: string;
  injury_date_end: string;
}

interface Transfer {
  transfer_date: string;
  type: string;
  player_name: string;
  team_from: string;
  team_to: string;
  transfer_amount: string;
}

interface Match {
  id: string;
  league: string;
  country?: string;
  status: string;
  minute?: string;
  time: string;
  venue?: string;
  referee?: string;
  round?: string;
  homeTeam: {
    name: string;
    logo: string;
    formation?: string;
  };
  awayTeam: {
    name: string;
    logo: string;
    formation?: string;
  };
  homeScore: number;
  awayScore: number;
  halftimeScore?: {
    home: number;
    away: number;
  };
  events?: Array<{
    type: 'Goal' | 'Yellow Card' | 'Red Card' | 'Substitution';
    minute: string;
    player: string;
    team: 'home' | 'away';
    icon?: string;
    assist?: string;
  }>;
  statistics?: Array<{
    type: string;
    home: string;
    away: string;
    homePercent?: number;
    awayPercent?: number;
  }>;
  lineup?: {
    home?: {
      formation?: string;
      starting11?: Array<{
        name: string;
        number: string;
        position: string;
      }>;
      substitutes?: Array<{
        name: string;
        number: string;
        position: string;
      }>;
    };
    away?: {
      formation?: string;
      starting11?: Array<{
        name: string;
        number: string;
        position: string;
      }>;
      substitutes?: Array<{
        name: string;
        number: string;
        position: string;
      }>;
    };
  };
}

const transformApiMatch = (apiMatch: ApiMatch): Match => {
  try {
    // Durum ve dakika belirleme - daha kapsamlı
    let status: 'live' | 'finished' | 'scheduled' = 'scheduled';
    let minute: string | undefined = undefined;
    
    console.log('🔍 Maç durumu analizi:', {
      match_live: apiMatch.match_live,
      match_status: apiMatch.match_status,
      match_time: apiMatch.match_time
    });
    
    // Canlı maç kontrolü - daha kapsamlı
    if (apiMatch.match_live === '1' || 
        (apiMatch.match_status && apiMatch.match_status.toLowerCase().includes('live')) ||
        (apiMatch.match_status && apiMatch.match_status.includes("'"))) {
      status = 'live';
      
      // Dakika bilgisini çıkar
      if (apiMatch.match_status && apiMatch.match_status.includes("'")) {
        // "67'" formatından dakikayı çıkar
        const minuteMatch = apiMatch.match_status.match(/(\d+)'/);
        if (minuteMatch) {
          minute = minuteMatch[1] + "'";
        } else {
          minute = apiMatch.match_status;
        }
      } else if (apiMatch.match_status && apiMatch.match_status.includes('min')) {
        // "67 min" formatından dakikayı çıkar
        const minuteMatch = apiMatch.match_status.match(/(\d+)\s*min/);
        if (minuteMatch) {
          minute = minuteMatch[1] + "'";
        }
      }
    } else if (apiMatch.match_status && 
               (apiMatch.match_status.toLowerCase().includes('finished') ||
                apiMatch.match_status.toLowerCase().includes('ft') ||
                apiMatch.match_status.toLowerCase().includes('ended'))) {
      status = 'finished';
      
      // Bitiş durumu için de dakika bilgisi olabilir
      if (apiMatch.match_status.includes("'")) {
        const minuteMatch = apiMatch.match_status.match(/(\d+)'/);
        if (minuteMatch) {
          minute = minuteMatch[1] + "'";
        }
      }
    }
    
    console.log('✅ Dönüştürülen durum:', { status, minute });

    return {
      id: apiMatch.match_id || 'unknown',
      league: apiMatch.league_name || 'Unknown League',
      country: apiMatch.country_name || 'Unknown',
      status,
      minute,
      time: apiMatch.match_time || '00:00',
      venue: apiMatch.match_venue,
      referee: apiMatch.match_referee,
      round: apiMatch.match_round,
      homeTeam: {
        name: apiMatch.match_hometeam_name || 'Home Team',
        logo: apiMatch.team_home_badge || 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=H'
      },
      awayTeam: {
        name: apiMatch.match_awayteam_name || 'Away Team',
        logo: apiMatch.team_away_badge || 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=A'
      },
      homeScore: parseInt(apiMatch.match_hometeam_score) || 0,
      awayScore: parseInt(apiMatch.match_awayteam_score) || 0,
      halftimeScore: undefined,
      events: [],
      statistics: [],
      lineup: undefined
    };
  } catch (error) {
    console.error('Maç dönüşüm hatası:', error);
    // Güvenli fallback
    return {
      id: 'error',
      league: 'Error League',
      country: 'Error Country',
      status: 'scheduled',
      minute: undefined,
      time: '00:00',
      venue: undefined,
      referee: undefined,
      round: undefined,
      homeTeam: {
        name: 'Error Team',
        logo: 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=E'
      },
      awayTeam: {
        name: 'Error Team',
        logo: 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=E'
      },
      homeScore: 0,
      awayScore: 0,
      halftimeScore: undefined,
      events: [],
      statistics: [],
      lineup: undefined
    };
  }
};

// Demo veriler - daha kapsamlı ve çeşitli
const getDemoMatches = (): Match[] => {
  console.log('🎭 Returning demo matches as fallback');
  return [
    {
      id: '1',
      league: 'English Premier League',
      country: 'ENGLAND PREMIER LEAGUE',
      status: 'live',
      minute: "67'",
      time: '15:00',
      homeTeam: {
        name: 'Manchester City',
        logo: 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=MC'
      },
      awayTeam: {
        name: 'Liverpool',
        logo: 'https://via.placeholder.com/40x40/FF0000/FFFFFF?text=LIV'
      },
      homeScore: 2,
      awayScore: 1,
      events: [
        {
          type: 'Goal' as const,
          minute: "23'",
          player: 'Haaland',
          team: 'home' as const,
          icon: '⚽'
        },
        {
          type: 'Yellow Card' as const,
          minute: "34'",
          player: 'Van Dijk',
          team: 'away' as const,
          icon: '🟨'
        },
        {
          type: 'Goal' as const,
          minute: "51'",
          player: 'Salah',
          team: 'away' as const,
          icon: '⚽'
        },
        {
          type: 'Goal' as const,
          minute: "65'",
          player: 'De Bruyne',
          team: 'home' as const,
          icon: '⚽'
        }
      ],
      statistics: [
        { type: 'Topa Sahip Olma', home: '65', away: '35', homePercent: 65, awayPercent: 35 },
        { type: 'Şutlar', home: '12', away: '8', homePercent: 60, awayPercent: 40 },
        { type: 'İsabetli Şutlar', home: '5', away: '3', homePercent: 62.5, awayPercent: 37.5 }
      ]
    },
    {
      id: '2',
      league: 'La Liga',
      country: 'SPAIN LA LIGA',
      status: 'live',
      minute: "23'",
      time: '16:30',
      homeTeam: {
        name: 'Real Madrid',
        logo: 'https://via.placeholder.com/40x40/FFFFFF/000000?text=RM'
      },
      awayTeam: {
        name: 'Barcelona',
        logo: 'https://via.placeholder.com/40x40/FF0000/FFFFFF?text=FCB'
      },
      homeScore: 1,
      awayScore: 0,
      events: [
        {
          type: 'Goal' as const,
          minute: "18'",
          player: 'Bellingham',
          team: 'home' as const,
          icon: '⚽'
        }
      ],
      statistics: [
        { type: 'Topa Sahip Olma', home: '45', away: '55', homePercent: 45, awayPercent: 55 },
        { type: 'Şutlar', home: '6', away: '4', homePercent: 60, awayPercent: 40 }
      ]
    },
    {
      id: '3',
      league: 'Bundesliga',
      country: 'GERMANY BUNDESLIGA',
      status: 'finished',
      minute: "90'",
      time: '14:00',
      homeTeam: {
        name: 'Bayern Munich',
        logo: 'https://via.placeholder.com/40x40/FF0000/FFFFFF?text=BAY'
      },
      awayTeam: {
        name: 'Borussia Dortmund',
        logo: 'https://via.placeholder.com/40x40/FFFF00/000000?text=BVB'
      },
      homeScore: 3,
      awayScore: 1,
      events: [
        {
          type: 'Goal' as const,
          minute: "12'",
          player: 'Kane',
          team: 'home' as const,
          icon: '⚽'
        },
        {
          type: 'Goal' as const,
          minute: "34'",
          player: 'Sane',
          team: 'home' as const,
          icon: '⚽'
        },
        {
          type: 'Goal' as const,
          minute: "67'",
          player: 'Reus',
          team: 'away' as const,
          icon: '⚽'
        },
        {
          type: 'Goal' as const,
          minute: "89'",
          player: 'Musiala',
          team: 'home' as const,
          icon: '⚽'
        }
      ],
      statistics: [
        { type: 'Topa Sahip Olma', home: '58', away: '42', homePercent: 58, awayPercent: 42 },
        { type: 'Şutlar', home: '15', away: '8', homePercent: 65, awayPercent: 35 }
      ]
    },
    {
      id: '4',
      league: 'Serie A',
      country: 'ITALY SERIE A',
      status: 'scheduled',
      time: '20:45',
      homeTeam: {
        name: 'Inter Milan',
        logo: 'https://via.placeholder.com/40x40/0000FF/FFFFFF?text=INT'
      },
      awayTeam: {
        name: 'AC Milan',
        logo: 'https://via.placeholder.com/40x40/FF0000/FFFFFF?text=ACM'
      },
      homeScore: 0,
      awayScore: 0,
      events: [],
      statistics: []
    },
    {
      id: '5',
      league: 'Ligue 1',
      country: 'FRANCE LIGUE 1',
      status: 'live',
      minute: "45'",
      time: '17:00',
      homeTeam: {
        name: 'PSG',
        logo: 'https://via.placeholder.com/40x40/0000FF/FFFFFF?text=PSG'
      },
      awayTeam: {
        name: 'Marseille',
        logo: 'https://via.placeholder.com/40x40/0000FF/FFFFFF?text=MAR'
      },
      homeScore: 2,
      awayScore: 0,
      events: [
        {
          type: 'Goal' as const,
          minute: "23'",
          player: 'Mbappe',
          team: 'home' as const,
          icon: '⚽'
        },
        {
          type: 'Goal' as const,
          minute: "41'",
          player: 'Dembele',
          team: 'home' as const,
          icon: '⚽'
        }
      ],
      statistics: [
        { type: 'Topa Sahip Olma', home: '62', away: '38', homePercent: 62, awayPercent: 38 },
        { type: 'Şutlar', home: '9', away: '3', homePercent: 75, awayPercent: 25 }
      ]
    }
  ];
};

// Error handling wrapper for API calls
const safeApiCall = async <T>(apiCall: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    console.error('API call failed, using fallback:', error);
    return fallback;
  }
};

export const FootballApi = {
  async getLiveMatches(league: string = 'all', date: string = new Date().toISOString().split('T')[0]): Promise<any[]> {
    try {
      console.log(`⚽ Fetching matches for ${league} on ${date}`);
      
      // Use 'all' to get matches from all leagues
      const url = `${BASE_URL}/?action=get_events&from=${date}&to=${date}&APIkey=${API_KEY}`;
      
      console.log('🌍 API Request URL:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📥 Raw API Response:', data.length, 'matches');
      
      // Handle case where API returns an error object instead of array
      if (!Array.isArray(data)) {
        console.error('❌ API did not return an array:', data);
        return [];
      }
      
      // Transform API data to our format
      const transformedMatches = data.map((match: any) => ({
        id: match.match_id,
        league: match.league_name || 'Unknown League',
        country: match.country_name,
        status: this.getMatchStatus(match),
        minute: match.match_live === '1' ? match.match_time : undefined,
        time: match.match_time,
        venue: match.match_venue,
        referee: match.match_referee,
        round: match.match_round,
        homeTeam: {
          name: match.match_hometeam_name,
          logo: match.team_home_badge
        },
        awayTeam: {
          name: match.match_awayteam_name,
          logo: match.team_away_badge
        },
        homeScore: match.match_hometeam_score !== '' ? parseInt(match.match_hometeam_score) : undefined,
        awayScore: match.match_awayteam_score !== '' ? parseInt(match.match_awayteam_score) : undefined,
        isLive: match.match_live === '1',
        goalscorers: match.goalscorer || [],
        cards: match.cards || [],
        statistics: match.statistics || []
      }));
      
      console.log('✅ Transformed matches:', transformedMatches.length);
      return transformedMatches;
    } catch (error) {
      console.error('❌ Error fetching live matches:', error);
      // Return empty array instead of throwing to prevent app crashes
      return [];
    }
  },

  async getLiveMatchesOnly(): Promise<Match[]> {
    try {
      const url = `${BASE_URL}/?action=get_events&match_live=1&APIkey=${API_KEY}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data: ApiMatch[] = await response.json();
      
      if (!Array.isArray(data)) {
        return [];
      }
      
      return data.map(transformApiMatch);
      
    } catch (error) {
      console.error('Error fetching live matches:', error);
      return [];
    }
  },

  // Lig tablosunu çek
  async getLeagueStandings(leagueId: string): Promise<TeamStanding[]> {
    try {
      const url = `${BASE_URL}/?action=get_standings&league_id=${leagueId}&APIkey=${API_KEY}`;
      console.log('Fetching standings:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data: TeamStanding[] = await response.json();
      console.log('Standings data:', data);
      
      if (!Array.isArray(data)) {
        return [];
      }
      
      return data.sort((a, b) => parseInt(a.overall_league_position) - parseInt(b.overall_league_position));
      
    } catch (error) {
      console.error('Error fetching standings:', error);
      return [];
    }
  },

  // Detaylı maç bilgilerini çek (lineup, statistics dahil)
  async getMatchDetails(matchId: string): Promise<Match | null> {
    try {
      const url = `${BASE_URL}/?action=get_events&match_id=${matchId}&APIkey=${API_KEY}`;
      console.log('Fetching match details:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data: ApiMatch[] = await response.json();
      
      if (!Array.isArray(data) || data.length === 0) {
        return null;
      }
      
      return transformApiMatch(data[0]);
      
    } catch (error) {
      console.error('Error fetching match details:', error);
      return null;
    }
  },

  // Tüm ligleri çek
  async getAvailableLeagues(): Promise<LeagueInfo[]> {
    try {
      const url = `${BASE_URL}/?action=get_leagues&APIkey=${API_KEY}`;
      console.log('Fetching leagues:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data: LeagueInfo[] = await response.json();
      console.log('Leagues data:', data);
      
      if (!Array.isArray(data)) {
        return [];
      }
      
      return data;
      
    } catch (error) {
      console.error('Error fetching leagues:', error);
      return [];
    }
  },

  // Head-to-Head (Karşılaşma Geçmişi) - İki takım arasındaki geçmiş maçları getir
  async getHeadToHead(team1: string, team2: string): Promise<Match[]> {
    try {
      // API'de H2H endpoint'i yok olabilir, bu durumda fallback data döneriz
      const url = `${BASE_URL}/?action=get_H2H&firstTeam=${encodeURIComponent(team1)}&secondTeam=${encodeURIComponent(team2)}&APIkey=${API_KEY}`;
      console.log('Fetching head-to-head:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
        console.warn('H2H API not available, returning mock data');
        return this.getMockHeadToHead(team1, team2);
      }
      
      const data: ApiMatch[] = await response.json();
      
      if (!Array.isArray(data)) {
        return this.getMockHeadToHead(team1, team2);
      }
      
      return data.map(transformApiMatch).filter(Boolean);
      
    } catch (error) {
      console.error('Error fetching head-to-head:', error);
      return this.getMockHeadToHead(team1, team2);
    }
  },

  // Mock Head-to-Head verisi - API kullanılamadığında fallback
  getMockHeadToHead(team1: string, team2: string): Match[] {
    const today = new Date();
    const mockMatches: Match[] = [
      {
        id: 'h2h-1',
        league: 'Premier League',
        country: 'England',
        status: 'finished',
        time: '15:00',
        venue: 'Stadium',
        homeTeam: {
          name: team1,
          logo: 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=H'
        },
        awayTeam: {
          name: team2,
          logo: 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=A'
        },
        homeScore: 2,
        awayScore: 1,
        halftimeScore: { home: 1, away: 0 },
        events: [
          { type: 'Goal', minute: "25'", player: 'Oyuncu A', team: 'home', icon: '⚽' },
          { type: 'Goal', minute: "67'", player: 'Oyuncu B', team: 'away', icon: '⚽' },
          { type: 'Goal', minute: "85'", player: 'Oyuncu C', team: 'home', icon: '⚽' }
        ],
        statistics: [
          { type: 'Topa Sahip Olma', home: '58', away: '42', homePercent: 58, awayPercent: 42 },
          { type: 'Şutlar', home: '12', away: '8', homePercent: 60, awayPercent: 40 },
          { type: 'İsabetli Şutlar', home: '5', away: '3', homePercent: 62.5, awayPercent: 37.5 }
        ]
      },
      {
        id: 'h2h-2',
        league: 'Premier League',
        country: 'England',
        status: 'finished',
        time: '17:30',
        venue: 'Stadium',
        homeTeam: {
          name: team2,
          logo: 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=A'
        },
        awayTeam: {
          name: team1,
          logo: 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=H'
        },
        homeScore: 0,
        awayScore: 3,
        halftimeScore: { home: 0, away: 2 },
        events: [
          { type: 'Goal', minute: "12'", player: 'Oyuncu D', team: 'away', icon: '⚽' },
          { type: 'Goal', minute: "34'", player: 'Oyuncu E', team: 'away', icon: '⚽' },
          { type: 'Goal', minute: "78'", player: 'Oyuncu F', team: 'away', icon: '⚽' }
        ],
        statistics: [
          { type: 'Topa Sahip Olma', home: '35', away: '65', homePercent: 35, awayPercent: 65 },
          { type: 'Şutlar', home: '6', away: '15', homePercent: 28.6, awayPercent: 71.4 },
          { type: 'İsabetli Şutlar', home: '2', away: '8', homePercent: 20, awayPercent: 80 }
        ]
      },
      {
        id: 'h2h-3',
        league: 'Premier League',
        country: 'England',
        status: 'finished',
        time: '20:00',
        venue: 'Stadium',
        homeTeam: {
          name: team1,
          logo: 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=H'
        },
        awayTeam: {
          name: team2,
          logo: 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=A'
        },
        homeScore: 1,
        awayScore: 1,
        halftimeScore: { home: 0, away: 1 },
        events: [
          { type: 'Goal', minute: "28'", player: 'Oyuncu G', team: 'away', icon: '⚽' },
          { type: 'Goal', minute: "71'", player: 'Oyuncu H', team: 'home', icon: '⚽' }
        ],
        statistics: [
          { type: 'Topa Sahip Olma', home: '50', away: '50', homePercent: 50, awayPercent: 50 },
          { type: 'Şutlar', home: '10', away: '9', homePercent: 52.6, awayPercent: 47.4 },
          { type: 'İsabetli Şutlar', home: '4', away: '4', homePercent: 50, awayPercent: 50 }
        ]
      }
    ];
    
    return mockMatches.slice(0, 5); // Son 5 karşılaşma
  },

  // Takım performans istatistiklerini getir
  async getTeamStats(teamName: string, leagueId?: string): Promise<any> {
    try {
      // Mock team stats - API'den gelene kadar
      return {
        form: ['W', 'W', 'D', 'L', 'W'], // Son 5 maçın sonuçları
        position: Math.floor(Math.random() * 20) + 1,
        points: Math.floor(Math.random() * 50) + 20,
        played: Math.floor(Math.random() * 10) + 15,
        won: Math.floor(Math.random() * 15) + 5,
        drawn: Math.floor(Math.random() * 5) + 2,
        lost: Math.floor(Math.random() * 8) + 1,
        goalsFor: Math.floor(Math.random() * 30) + 15,
        goalsAgainst: Math.floor(Math.random() * 20) + 5,
        cleanSheets: Math.floor(Math.random() * 8) + 2,
        avgPossession: Math.floor(Math.random() * 30) + 45
      };
    } catch (error) {
      console.error('Error fetching team stats:', error);
      return null;
    }
  },

  // ==============================================
  // NEW COMPREHENSIVE API FUNCTIONS FOR MAXIMUM UTILIZATION
  // ==============================================

  // 1. Ülkeleri getir - Global coverage için
  async getCountries(): Promise<Country[]> {
    try {
      const url = `${BASE_URL}/?action=get_countries&APIkey=${API_KEY}`;
      console.log('Fetching countries:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Countries API Error: ${response.status}`);
      }
      
      const data: Country[] = await response.json();
      console.log('Countries data received:', data.length, 'countries');
      
      if (!Array.isArray(data)) {
        return [];
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      // Fallback mock data
      return [
        { country_id: '44', country_name: 'England', country_logo: 'https://apiv3.apifootball.com/badges/logo_country/44_england.png' },
        { country_id: '6', country_name: 'Spain', country_logo: 'https://apiv3.apifootball.com/badges/logo_country/6_spain.png' },
        { country_id: '4', country_name: 'Germany', country_logo: 'https://apiv3.apifootball.com/badges/logo_country/4_germany.png' },
        { country_id: '5', country_name: 'Italy', country_logo: 'https://apiv3.apifootball.com/badges/logo_country/5_italy.png' },
        { country_id: '3', country_name: 'France', country_logo: 'https://apiv3.apifootball.com/badges/logo_country/3_france.png' }
      ];
    }
  },

  // 2. Belirli ülkenin liglerini getir
  async getLeaguesByCountry(countryId: string): Promise<LeagueInfo[]> {
    try {
      const url = `${BASE_URL}/?action=get_leagues&country_id=${countryId}&APIkey=${API_KEY}`;
      console.log('Fetching leagues for country:', countryId);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Leagues API Error: ${response.status}`);
      }
      
      const data: LeagueInfo[] = await response.json();
      
      if (!Array.isArray(data)) {
        return [];
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching leagues by country:', error);
      return [];
    }
  },

  // 3. Takım detaylarını getir (oyuncular, venue, koç dahil)
  async getTeamDetails(teamId: string): Promise<TeamDetails | null> {
    try {
      const url = `${BASE_URL}/?action=get_teams&team_id=${teamId}&APIkey=${API_KEY}`;
      console.log('Fetching team details:', teamId);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Team API Error: ${response.status}`);
      }
      
      const data: TeamDetails[] = await response.json();
      
      if (!Array.isArray(data) || data.length === 0) {
        return null;
      }
      
      return data[0];
    } catch (error) {
      console.error('Error fetching team details:', error);
      return null;
    }
  },

  // 4. Lig takımlarını getir
  async getTeamsByLeague(leagueId: string): Promise<TeamDetails[]> {
    try {
      const url = `${BASE_URL}/?action=get_teams&league_id=${leagueId}&APIkey=${API_KEY}`;
      console.log('Fetching teams for league:', leagueId);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Teams API Error: ${response.status}`);
      }
      
      const data: TeamDetails[] = await response.json();
      
      if (!Array.isArray(data)) {
        return [];
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching teams by league:', error);
      return [];
    }
  },

  // 5. Oyuncu detaylarını getir
  async getPlayerDetails(playerId: string): Promise<Player | null> {
    try {
      const url = `${BASE_URL}/?action=get_players&player_id=${playerId}&APIkey=${API_KEY}`;
      console.log('Fetching player details:', playerId);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Player API Error: ${response.status}`);
      }
      
      const data: Player[] = await response.json();
      
      if (!Array.isArray(data) || data.length === 0) {
        return null;
      }
      
      return data[0];
    } catch (error) {
      console.error('Error fetching player details:', error);
      return null;
    }
  },

  // 6. Oyuncu araması (isimle)
  async searchPlayer(playerName: string): Promise<Player[]> {
    try {
      const url = `${BASE_URL}/?action=get_players&player_name=${encodeURIComponent(playerName)}&APIkey=${API_KEY}`;
      console.log('Searching player:', playerName);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Player Search API Error: ${response.status}`);
      }
      
      const data: Player[] = await response.json();
      
      if (!Array.isArray(data)) {
        return [];
      }
      
      return data;
    } catch (error) {
      console.error('Error searching player:', error);
      return [];
    }
  },

  // 7. Lig sıralamasını getir
  async getStandings(leagueId: string): Promise<StandingsTeam[]> {
    try {
      const url = `${BASE_URL}/?action=get_standings&league_id=${leagueId}&APIkey=${API_KEY}`;
      console.log('Fetching standings for league:', leagueId);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Standings API Error: ${response.status}`);
      }
      
      const data: StandingsTeam[] = await response.json();
      
      if (!Array.isArray(data)) {
        return [];
      }
      
      return data.sort((a, b) => parseInt(a.overall_league_position) - parseInt(b.overall_league_position));
    } catch (error) {
      console.error('Error fetching standings:', error);
      return [];
    }
  },

  // 8. Gol kralları listesi
  async getTopScorers(leagueId: string): Promise<TopScorer[]> {
    try {
      const url = `${BASE_URL}/?action=get_topscorers&league_id=${leagueId}&APIkey=${API_KEY}`;
      console.log('Fetching top scorers for league:', leagueId);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Top Scorers API Error: ${response.status}`);
      }
      
      const data: TopScorer[] = await response.json();
      
      if (!Array.isArray(data)) {
        return [];
      }
      
      return data.sort((a, b) => parseInt(b.goals) - parseInt(a.goals));
    } catch (error) {
      console.error('Error fetching top scorers:', error);
      return [];
    }
  },

  // 9. Maç tahminleri
  async getMatchPredictions(matchId: string): Promise<MatchPrediction | null> {
    try {
      const url = `${BASE_URL}/?action=get_predictions&match_id=${matchId}&APIkey=${API_KEY}`;
      console.log('Fetching predictions for match:', matchId);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Predictions API Error: ${response.status}`);
      }
      
      const data: MatchPrediction[] = await response.json();
      
      if (!Array.isArray(data) || data.length === 0) {
        return null;
      }
      
      return data[0];
    } catch (error) {
      console.error('Error fetching match predictions:', error);
      return null;
    }
  },

  // 10. Sakatlıklar
  async getInjuries(leagueId?: string): Promise<Injury[]> {
    try {
      let url = `${BASE_URL}/?action=get_injuries&APIkey=${API_KEY}`;
      if (leagueId) {
        url += `&league_id=${leagueId}`;
      }
      console.log('Fetching injuries:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Injuries API Error: ${response.status}`);
      }
      
      const data: Injury[] = await response.json();
      
      if (!Array.isArray(data)) {
        return [];
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching injuries:', error);
      return [];
    }
  },

  // 11. Transferler
  async getTransfers(teamId?: string): Promise<Transfer[]> {
    try {
      let url = `${BASE_URL}/?action=get_transfers&APIkey=${API_KEY}`;
      if (teamId) {
        url += `&team_id=${teamId}`;
      }
      console.log('Fetching transfers:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Transfers API Error: ${response.status}`);
      }
      
      const data: Transfer[] = await response.json();
      
      if (!Array.isArray(data)) {
        return [];
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching transfers:', error);
      return [];
    }
  },

  // 12. Belirli tarih aralığında maçları getir
  async getMatchesByDate(fromDate: string, toDate: string, leagueId?: string): Promise<Match[]> {
    try {
      let url = `${BASE_URL}/?action=get_events&from=${fromDate}&to=${toDate}&APIkey=${API_KEY}`;
      if (leagueId) {
        url += `&league_id=${leagueId}`;
      }
      console.log('Fetching matches by date range:', fromDate, 'to', toDate);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Matches API Error: ${response.status}`);
      }
      
      const data: ApiMatch[] = await response.json();
      
      if (!Array.isArray(data)) {
        return [];
      }
      
      return data.map(transformApiMatch).filter(Boolean);
    } catch (error) {
      console.error('Error fetching matches by date:', error);
      return [];
    }
  },

  // 14. Fikstür - Takımın gelecek maçları
  async getTeamFixtures(teamId: string, numberOfMatches: number = 10): Promise<Match[]> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);
      const future = futureDate.toISOString().split('T')[0];
      
      const url = `${BASE_URL}/?action=get_events&from=${today}&to=${future}&team_id=${teamId}&APIkey=${API_KEY}`;
      console.log('Fetching team fixtures:', teamId);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Team Fixtures API Error: ${response.status}`);
      }
      
      const data: ApiMatch[] = await response.json();
      
      if (!Array.isArray(data)) {
        return [];
      }
      
      return data.map(transformApiMatch).filter(Boolean).slice(0, numberOfMatches);
    } catch (error) {
      console.error('Error fetching team fixtures:', error);
      return [];
    }
  },

  // 15. Comprehensive data fetcher - Bir lig için tüm verileri getir
  async getComprehensiveLeagueData(leagueId: string) {
    try {
      console.log('🏆 Fetching comprehensive league data for:', leagueId);
      
      const [standings, topScorers, teams, todayMatches] = await Promise.all([
        this.getStandings(leagueId),
        this.getTopScorers(leagueId),
        this.getTeamsByLeague(leagueId),
        this.getLiveMatches('all')
      ]);
      
      const leagueMatches = todayMatches.filter((match: Match) => 
        match.league && LEAGUE_ID_TO_NAME[leagueId] && 
        match.league.includes(LEAGUE_ID_TO_NAME[leagueId].split(' ')[0])
      );
      
      return {
        leagueId,
        standings,
        topScorers,
        teams,
        matches: leagueMatches,
        stats: {
          totalTeams: teams.length,
          totalPlayers: teams.reduce((acc: number, team: TeamDetails) => acc + (team.players?.length || 0), 0),
          totalMatches: leagueMatches.length,
          liveMatches: leagueMatches.filter((m: Match) => m.status === 'live').length
        }
      };
    } catch (error) {
      console.error('Error fetching comprehensive league data:', error);
      return null;
    }
  }
};