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

// Country to flag emoji mapping
const COUNTRY_FLAGS: Record<string, string> = {
  'Turkey': '🇹🇷',
  'England': '🇬🇧',
  'Spain': '🇪🇸',
  'Germany': '🇩🇪',
  'Italy': '🇮🇹',
  'France': '🇫🇷',
  'Netherlands': '🇳🇱',
  'Portugal': '🇵🇹',
  'United States': '🇺🇸',
  'Brazil': '🇧🇷',
  'Argentina': '🇦🇷',
  'Saudi Arabia': '🇸🇦',
  'China': '🇨🇳',
  'Russia': '🇷🇺',
  'Ukraine': '🇺🇦',
  'Poland': '🇵🇱',
  'Belgium': '🇧🇪',
  'Austria': '🇦🇹',
  'Switzerland': '🇨🇭',
  'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'Czech Republic': '🇨🇿',
  'Croatia': '🇭🇷',
  'Serbia': '🇷🇸',
  'Greece': '🇬🇷',
  'Bulgaria': '🇧🇬',
  'Romania': '🇷🇴',
  'Slovenia': '🇸🇮',
  'Slovakia': '🇸🇰',
  'Hungary': '🇭🇺',
  'Estonia': '🇪🇪',
  'Latvia': '🇱🇻',
  'Lithuania': '🇱🇹',
  'Belarus': '🇧🇾',
  'Moldova': '🇲🇩',
  'Cyprus': '🇨🇾',
  'Malta': '🇲🇹',
  'Gibraltar': '🇬🇮',
  'Andorra': '🇦🇩',
  'San Marino': '🇸🇲',
  'Faroe Islands': '🇫🇴',
  'Luxembourg': '🇱🇺',
  'Norway': '🇳🇴',
  'Sweden': '🇸🇪',
  'Denmark': '🇩🇰',
  'Finland': '🇫🇮',
  'Iceland': '🇮🇸',
  'Ireland': '🇮🇪',
  'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'Northern Ireland': '🇬🇧',
  'Albania': '🇦🇱',
  'North Macedonia': '🇲🇰',
  'Kosovo': '🇽🇰',
  'Montenegro': '🇲🇪',
  'Bosnia and Herzegovina': '🇧🇦',
  'Georgia': '🇬🇪',
  'Armenia': '🇦🇲',
  'Azerbaijan': '🇦🇿',
  'Kazakhstan': '🇰🇿',
  'Uzbekistan': '🇺🇿',
  'Kyrgyzstan': '🇰🇬',
  'Tajikistan': '🇹🇯',
  'Turkmenistan': '🇹🇲',
  'Mongolia': '🇲🇳',
  'Japan': '🇯🇵',
  'South Korea': '🇰🇷',
  'North Korea': '🇰🇵',
  'Vietnam': '🇻🇳',
  'Thailand': '🇹🇭',
  'Cambodia': '🇰🇭',
  'Laos': '🇱🇦',
  'Myanmar': '🇲🇲',
  'Malaysia': '🇲🇾',
  'Singapore': '🇸🇬',
  'Indonesia': '🇮🇩',
  'Philippines': '🇵🇭',
  'Brunei': '🇧🇳',
  'East Timor': '🇹🇱',
  'India': '🇮🇳',
  'Pakistan': '🇵🇰',
  'Bangladesh': '🇧🇩',
  'Sri Lanka': '🇱🇰',
  'Nepal': '🇳🇵',
  'Bhutan': '🇧🇹',
  'Maldives': '🇲🇻',
  'Uruguay': '🇺🇾',
  'Chile': '🇨🇱',
  'Australia': '🇦🇺',
  'New Zealand': '🇳🇿',
  'Papua New Guinea': '🇵🇬',
  'Fiji': '🇫🇯',
  'Solomon Islands': '🇸🇧',
  'Vanuatu': '🇻🇺',
  'New Caledonia': '🇳🇨',
  'French Polynesia': '🇵🇫',
  'Samoa': '🇼🇸',
  'American Samoa': '🇦🇸',
  'Tonga': '🇹🇴',
  'Tuvalu': '🇹🇻',
  'Kiribati': '🇰🇮',
  'Nauru': '🇳🇷',
  'Palau': '🇵🇼',
  'Marshall Islands': '🇲🇭',
  'Micronesia': '🇫🇲',
  'Northern Mariana Islands': '🇲🇵',
  'Guam': '🇬🇺',
  'Cook Islands': '🇨🇰',
  'Niue': '🇳🇺',
  'Tokelau': '🇹🇰',
  'Wallis and Futuna': '🇼🇫',
  'Pitcairn Islands': '🇵🇳',
  'Easter Island': '🇨🇱',
  'Galápagos Islands': '🇪🇨'
};

// Get country flag emoji
export const getCountryFlag = (countryName: string): string => {
  return COUNTRY_FLAGS[countryName] || '🏳️';
};

// Güvenli API çağrısı fonksiyonu
const safeApiCall = async (endpoint: string, params: Record<string, any> = {}) => {
  try {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    url.searchParams.append('APIkey', API_KEY);
    
    // Parametreleri ekle
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, value.toString());
      }
    });

    console.log(`🌐 API Call: ${endpoint}`, params);
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // API hata kontrolü
    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error(`❌ API Error (${endpoint}):`, error);
    throw error;
  }
};

// Maç verilerini normalize et
const normalizeMatchData = (apiMatch: any) => {
  try {
    return {
      id: apiMatch.match_id || '',
      league: apiMatch.league_name || 'Bilinmeyen Lig',
      country: apiMatch.country_name || '',
      date: apiMatch.match_date || '',
      time: apiMatch.match_time || '',
      status: apiMatch.match_status || 'scheduled',
      minute: apiMatch.match_live || '',
      venue: apiMatch.match_venue || '',
      referee: apiMatch.match_referee || '',
      homeTeam: {
        name: apiMatch.match_hometeam_name || 'Ev Sahibi',
        logo: apiMatch.team_home_badge || '',
        country: apiMatch.country_name || '',
        score: parseInt(apiMatch.match_hometeam_score) || 0
      },
      awayTeam: {
        name: apiMatch.match_awayteam_name || 'Deplasman',
        logo: apiMatch.team_away_badge || '',
        country: apiMatch.country_name || '',
        score: parseInt(apiMatch.match_awayteam_score) || 0
      },
      homeScore: parseInt(apiMatch.match_hometeam_score) || 0,
      awayScore: parseInt(apiMatch.match_awayteam_score) || 0,
      goalscorer: apiMatch.goalscorer || [],
      cards: apiMatch.cards || [],
      substitutions: apiMatch.substitutions || [],
      lineup: apiMatch.lineup || {},
      statistics: apiMatch.statistics || []
    };
  } catch (error) {
    console.error('Match data normalization error:', error);
    return null;
  }
};

<<<<<<< HEAD
export class FootballApi {
  // Canlı maçları getir
  static async getLiveMatches(leagueId: string = 'all', date: string = '') {
=======
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
>>>>>>> 9b5d802
    try {
      const params: any = {};
      if (leagueId !== 'all') {
        params.league_id = leagueId;
      }
      if (date) {
        params.date = date;
      }

      const data = await safeApiCall('', params);
      
      if (!Array.isArray(data)) {
        console.warn('API returned non-array data:', data);
        return [];
      }

      return data
        .map(normalizeMatchData)
        .filter(match => match !== null);
    } catch (error) {
      console.error('Error fetching live matches:', error);
      return [];
    }
  }

  // Belirli bir maçın detaylarını getir
  static async getMatchDetails(matchId: string) {
    try {
      const data = await safeApiCall('', { match_id: matchId });
      
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Match not found');
      }

      return normalizeMatchData(data[0]);
    } catch (error) {
      console.error('Error fetching match details:', error);
      throw error;
    }
  }

  // Head-to-head verilerini getir
  static async getHeadToHead(team1: string, team2: string) {
    try {
      const data = await safeApiCall('', { 
        h2h: `${team1};${team2}`,
        from: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0]
      });

      if (!Array.isArray(data)) {
        return [];
      }

      return data.map(match => ({
        date: match.match_date,
        homeTeam: match.match_hometeam_name,
        awayTeam: match.match_awayteam_name,
        homeScore: match.match_hometeam_score,
        awayScore: match.match_awayteam_score,
        result: `${match.match_hometeam_score} - ${match.match_awayteam_score}`
      }));
    } catch (error) {
      console.error('Error fetching head-to-head data:', error);
      return [];
    }
  }

  // Takım istatistiklerini getir
  static async getTeamStats(teamName: string) {
    try {
      const data = await safeApiCall('', { 
        team: teamName,
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0]
      });

      if (!Array.isArray(data)) {
        return null;
      }

      const teamMatches = data.filter(match => 
        match.match_hometeam_name === teamName || match.match_awayteam_name === teamName
      );

      const stats = {
        matchesPlayed: teamMatches.length,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0
      };

      teamMatches.forEach(match => {
        const isHome = match.match_hometeam_name === teamName;
        const teamScore = isHome ? parseInt(match.match_hometeam_score) : parseInt(match.match_awayteam_score);
        const opponentScore = isHome ? parseInt(match.match_awayteam_score) : parseInt(match.match_hometeam_score);

        if (teamScore > opponentScore) {
          stats.wins++;
        } else if (teamScore === opponentScore) {
          stats.draws++;
        } else {
          stats.losses++;
        }

        stats.goalsFor += teamScore;
        stats.goalsAgainst += opponentScore;
      });

      return stats;
    } catch (error) {
      console.error('Error fetching team stats:', error);
      return null;
    }
  }

  // Lig sıralamasını getir
  static async getLeagueStandings(leagueId: string) {
    try {
      const data = await safeApiCall('', { league_id: leagueId });
      
      if (!Array.isArray(data)) {
        return [];
      }

      return data.map(team => ({
        position: parseInt(team.overall_league_position),
        team: team.team_name,
        logo: team.team_badge,
        played: parseInt(team.overall_league_payed),
        won: parseInt(team.overall_league_W),
        drawn: parseInt(team.overall_league_D),
        lost: parseInt(team.overall_league_L),
        goalsFor: parseInt(team.overall_league_GF),
        goalsAgainst: parseInt(team.overall_league_GA),
        points: parseInt(team.overall_league_PTS)
      }));
    } catch (error) {
      console.error('Error fetching league standings:', error);
      return [];
    }
  }

  // Oyuncu istatistiklerini getir
  static async getPlayerStats(leagueId: string) {
    try {
      const data = await safeApiCall('', { league_id: leagueId });
      
      if (!Array.isArray(data)) {
        return [];
      }

      return data.map(player => ({
        name: player.player_name,
        team: player.team_name,
        position: player.player_type,
        goals: parseInt(player.player_goals),
        assists: parseInt(player.player_assists) || 0,
        matches: parseInt(player.player_match_played),
        yellowCards: parseInt(player.player_yellow_cards),
        redCards: parseInt(player.player_red_cards)
      }));
    } catch (error) {
      console.error('Error fetching player stats:', error);
      return [];
    }
  }

  // Takım detaylarını getir
  static async getTeamDetails(teamId: string) {
    try {
      const data = await safeApiCall('', { team_id: teamId });
      
      if (!Array.isArray(data) || data.length === 0) {
        return null;
      }

      return data[0];
    } catch (error) {
      console.error('Error fetching team details:', error);
      return null;
    }
  }

  // Ülke listesini getir
  static async getCountries() {
    try {
      const data = await safeApiCall('countries');
      
      if (!Array.isArray(data)) {
        return [];
      }

      return data.map(country => ({
        id: country.country_id,
        name: country.country_name,
        logo: country.country_logo
      }));
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [];
    }
  }

  // Lig listesini getir
  static async getLeagues(countryId?: string) {
    try {
      const params: any = {};
      if (countryId) {
        params.country_id = countryId;
      }

      const data = await safeApiCall('leagues', params);
      
      if (!Array.isArray(data)) {
        return [];
      }

      return data.map(league => ({
        id: league.league_id,
        name: league.league_name,
        logo: league.league_logo,
        country: league.country_name,
        season: league.league_season
      }));
    } catch (error) {
      console.error('Error fetching leagues:', error);
      return [];
    }
  }

  // Takım listesini getir
  static async getTeams(leagueId: string) {
    try {
      const data = await safeApiCall('', { league_id: leagueId });
      
      if (!Array.isArray(data)) {
        return [];
      }

      const teams = new Map();
      
      data.forEach(match => {
        if (match.match_hometeam_name && !teams.has(match.match_hometeam_name)) {
          teams.set(match.match_hometeam_name, {
            name: match.match_hometeam_name,
            logo: match.team_home_badge,
            country: match.country_name
          });
        }
        if (match.match_awayteam_name && !teams.has(match.match_awayteam_name)) {
          teams.set(match.match_awayteam_name, {
            name: match.match_awayteam_name,
            logo: match.team_away_badge,
            country: match.country_name
          });
        }
      });

      return Array.from(teams.values());
    } catch (error) {
      console.error('Error fetching teams:', error);
      return [];
    }
  }
}