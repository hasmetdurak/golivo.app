const BASE_URL = 'https://apiv3.apifootball.com';
const API_KEY = '47746f324863a1c7321a4b137847eba9e647469c8eacced9ca6175bbbadf5c2d';

// League ID mappings for major leagues
const LEAGUE_IDS = {
  'Premier League': '152',
  'Champions League': '3',
  'La Liga': '302',
  'Serie A': '207',
  'Bundesliga': '175',
  'Ligue 1': '168',
  'Turkish Super League': '340',
  'Russian Premier League': '344',
  'English Premier League': '152'
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
  '262': 'Polish Ekstraklasa',
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
    const isLive = apiMatch.match_live === '1' || (apiMatch.match_status && apiMatch.match_status.includes("'"));
    let status = 'scheduled';
    let minute = undefined;
    
    if (isLive) {
      status = 'live';
      if (apiMatch.match_status && apiMatch.match_status.includes("'")) {
        minute = apiMatch.match_status;
      }
    } else if (apiMatch.match_status === 'Finished') {
      status = 'finished';
    }

    // Smart league detection based on league_id, country + league name
    let detectedLeague = apiMatch.league_name || 'Unknown League';
    const country = apiMatch.country_name?.toLowerCase() || '';
    const leagueName = apiMatch.league_name?.toLowerCase() || '';
    
    // First try: Direct league ID mapping (most reliable)
    const leagueId = apiMatch.league_id || '';
    if (leagueId && LEAGUE_ID_TO_NAME[leagueId]) {
      detectedLeague = LEAGUE_ID_TO_NAME[leagueId];
      console.log(`League ID Match: ID=${leagueId} -> ${detectedLeague}`);
    } else {
      // Fallback: Country-specific league mapping to prevent misclassification
      if (country.includes('russia') || country.includes('rusya')) {
        if (leagueName.includes('premier')) {
          detectedLeague = 'Russian Premier League';
        }
      } else if (country.includes('england') || country.includes('ingiltere')) {
        if (leagueName.includes('premier')) {
          detectedLeague = 'English Premier League';
        }
      } else if (country.includes('spain') || country.includes('İspanya')) {
        if (leagueName.includes('la liga') || leagueName.includes('liga')) {
          detectedLeague = 'Spanish La Liga';
        }
      } else if (country.includes('germany') || country.includes('almanya')) {
        if (leagueName.includes('bundesliga')) {
          detectedLeague = 'German Bundesliga';
        }
      } else if (country.includes('austria') || country.includes('avusturya')) {
        if (leagueName.includes('bundesliga')) {
          detectedLeague = 'Austrian Bundesliga';
        }
      } else if (country.includes('italy') || country.includes('italya')) {
        if (leagueName.includes('serie')) {
          detectedLeague = 'Italian Serie A';
        }
      } else if (country.includes('france') || country.includes('fransa')) {
        if (leagueName.includes('ligue')) {
          detectedLeague = 'French Ligue 1';
        }
      } else if (country.includes('turkey') || country.includes('türkiye')) {
        if (leagueName.includes('super') || leagueName.includes('süper')) {
          detectedLeague = 'Turkish Super League';
        }
      }
      console.log(`Country Match: Country="${country}" + League="${leagueName}" -> ${detectedLeague}`);
    }
    
    // Final debug log for league detection
    console.log(`🏆 League Detection Result:`);
    console.log(`   📍 Country: "${apiMatch.country_name}"`);
    console.log(`   🆔 League ID: "${leagueId}"`);
    console.log(`   📝 Original: "${apiMatch.league_name}"`);
    console.log(`   ✅ Detected: "${detectedLeague}"`);
    console.log(`   🏠 Home: ${apiMatch.match_hometeam_name} vs 🚪 Away: ${apiMatch.match_awayteam_name}`);
    console.log(`---`);
    // Combine all events (goals, cards, substitutions)
    const events: Array<{
      type: 'Goal' | 'Yellow Card' | 'Red Card' | 'Substitution';
      minute: string;
      player: string;
      team: 'home' | 'away';
      icon?: string;
      assist?: string;
    }> = [];

    // Add goals
    if (apiMatch.goalscorer) {
      apiMatch.goalscorer.forEach(goal => {
        if (goal.home_scorer) {
          events.push({
            type: 'Goal',
            minute: goal.time,
            player: goal.home_scorer,
            team: 'home',
            icon: '⚽',
            assist: goal.home_assist || undefined
          });
        }
        if (goal.away_scorer) {
          events.push({
            type: 'Goal',
            minute: goal.time,
            player: goal.away_scorer,
            team: 'away',
            icon: '⚽',
            assist: goal.away_assist || undefined
          });
        }
      });
    }

    // Add cards
    if (apiMatch.cards) {
      apiMatch.cards.forEach(card => {
        const cardType = card.card === 'yellow card' ? 'Yellow Card' : 'Red Card';
        const cardIcon = card.card === 'yellow card' ? '🟨' : '🟥';
        
        if (card.home_fault) {
          events.push({
            type: cardType,
            minute: card.time,
            player: card.home_fault,
            team: 'home',
            icon: cardIcon
          });
        }
        if (card.away_fault) {
          events.push({
            type: cardType,
            minute: card.time,
            player: card.away_fault,
            team: 'away',
            icon: cardIcon
          });
        }
      });
    }

    // Sort events by minute
    events.sort((a, b) => {
      const minuteA = parseInt(a.minute.replace("'", ""));
      const minuteB = parseInt(b.minute.replace("'", ""));
      return minuteA - minuteB;
    });

    // Process statistics
    const processedStats = apiMatch.statistics?.map(stat => ({
      type: stat.type,
      home: stat.home,
      away: stat.away,
      homePercent: parseFloat(stat.home) || 0,
      awayPercent: parseFloat(stat.away) || 0
    })) || [];

    // Process lineup
    const processedLineup = {
      home: apiMatch.lineup?.home ? {
        starting11: apiMatch.lineup.home.starting_lineups?.map(player => ({
          name: player.lineup_player,
          number: player.lineup_number,
          position: player.lineup_position
        })) || [],
        substitutes: apiMatch.lineup.home.substitutes?.map(player => ({
          name: player.lineup_player,
          number: player.lineup_number,
          position: player.lineup_position
        })) || []
      } : undefined,
      away: apiMatch.lineup?.away ? {
        starting11: apiMatch.lineup.away.starting_lineups?.map(player => ({
          name: player.lineup_player,
          number: player.lineup_number,
          position: player.lineup_position
        })) || [],
        substitutes: apiMatch.lineup.away.substitutes?.map(player => ({
          name: player.lineup_player,
          number: player.lineup_number,
          position: player.lineup_position
        })) || []
      } : undefined
    };

    // Calculate half-time score from ft_score if available
    let halftimeScore = undefined;
    if (apiMatch.match_ft_score) {
      const ftScores = apiMatch.match_ft_score.split('-');
      if (ftScores.length === 2) {
        halftimeScore = {
          home: Math.floor(parseInt(ftScores[0]) / 2),
          away: Math.floor(parseInt(ftScores[1]) / 2)
        };
      }
    }

    return {
      id: apiMatch.match_id,
      league: detectedLeague,
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
      halftimeScore,
      events,
      statistics: processedStats,
      lineup: processedLineup
    };
  } catch (error) {
    console.error('Error transforming match:', error, apiMatch);
    return null as any;
  }
};

export const FootballApi = {
  async getLiveMatches(selectedLeague: string = 'all'): Promise<Match[]> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      let url = `${BASE_URL}/?action=get_events&from=${today}&to=${tomorrow}&APIkey=${API_KEY}`;
      
      // Add specific league filter if not 'all'
      if (selectedLeague !== 'all' && LEAGUE_IDS[selectedLeague as keyof typeof LEAGUE_IDS]) {
        url += `&league_id=${LEAGUE_IDS[selectedLeague as keyof typeof LEAGUE_IDS]}`;
      }
      
      console.log('🔥 API İsteği:', url);
      console.log('📅 Tarih aralığı:', today, 'dan', tomorrow, 'a kadar');
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data: ApiMatch[] = await response.json();
      console.log('📊 API Yanıtı:', data.length, 'maç bulundu');
      console.log('🎯 İlk 3 maç örneği:', data.slice(0, 3));
      
      if (!Array.isArray(data)) {
        console.warn('⚠️ API array olmayan veri döndürdü:', data);
        return [];
      }
      
      const transformedMatches = data.map(transformApiMatch).filter(match => match !== null);
      console.log('✅ Dönüştürülen maçlar:', transformedMatches.length);
      
      return transformedMatches;
      
    } catch (error) {
      console.error('❌ Maç çekme hatası:', error);
      console.error('📍 API URL:', url);
      console.error('🔍 Hata detayı:', error instanceof Error ? error.message : 'Bilinmeyen hata');
      
      // İnternet bağlantısı kontrol et
      if (!navigator.onLine) {
        console.error('🌐 İnternet bağlantısı yok!');
      }
      
      // Return demo data with Turkish messages
      console.log('🎭 Demo veriler yükleniyor...');
      // Return some demo data so site isn't completely empty
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
          league: 'Spanish La Liga',
          country: 'SPAIN LA LIGA',
          status: 'finished',
          time: '18:00',
          venue: 'Camp Nou',
          referee: 'Carlos del Cerro',
          round: '3',
          homeTeam: {
            name: 'Barcelona',
            logo: 'https://via.placeholder.com/40x40/004D98/FFFFFF?text=BAR'
          },
          awayTeam: {
            name: 'Real Madrid',
            logo: 'https://via.placeholder.com/40x40/FFFFFF/000000?text=RM'
          },
          homeScore: 3,
          awayScore: 2,
          halftimeScore: { home: 1, away: 1 },
          events: [
            {
              type: 'Goal' as const,
              minute: "12'",
              player: 'Lewandowski',
              team: 'home' as const,
              icon: '⚽'
            },
            {
              type: 'Goal' as const,
              minute: "28'",
              player: 'Benzema',
              team: 'away' as const,
              icon: '⚽'
            },
            {
              type: 'Red Card' as const,
              minute: "45'",
              player: 'Casemiro',
              team: 'away' as const,
              icon: '🟥'
            },
            {
              type: 'Goal' as const,
              minute: "67'",
              player: 'Pedri',
              team: 'home' as const,
              icon: '⚽'
            },
            {
              type: 'Goal' as const,
              minute: "78'",
              player: 'Ansu Fati',
              team: 'home' as const,
              icon: '⚽'
            },
            {
              type: 'Goal' as const,
              minute: "89'",
              player: 'Vinicius',
              team: 'away' as const,
              icon: '⚽'
            }
          ],
          statistics: [
            { type: 'Topa Sahip Olma', home: '58', away: '42', homePercent: 58, awayPercent: 42 },
            { type: 'Şutlar', home: '15', away: '9', homePercent: 62.5, awayPercent: 37.5 },
            { type: 'Kornerler', home: '7', away: '3', homePercent: 70, awayPercent: 30 }
          ]
        },
        {
          id: '3',
          league: 'German Bundesliga',
          country: 'GERMANY BUNDESLIGA',
          status: 'scheduled',
          time: '20:30',
          venue: 'Allianz Arena',
          round: '2',
          homeTeam: {
            name: 'Bayern Munich',
            logo: 'https://via.placeholder.com/40x40/FF0000/FFFFFF?text=FCB'
          },
          awayTeam: {
            name: 'Borussia Dortmund',
            logo: 'https://via.placeholder.com/40x40/FFFF00/000000?text=BVB'
          },
          homeScore: 0,
          awayScore: 0,
          events: []
        }
      ];
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

  // Oyuncu istatistiklerini çek
  async getTopScorers(leagueId: string): Promise<PlayerStats[]> {
    try {
      const url = `${BASE_URL}/?action=get_topscorers&league_id=${leagueId}&APIkey=${API_KEY}`;
      console.log('Fetching top scorers:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data: PlayerStats[] = await response.json();
      console.log('Top scorers data:', data);
      
      if (!Array.isArray(data)) {
        return [];
      }
      
      return data.sort((a, b) => parseInt(b.player_goals) - parseInt(a.player_goals));
      
    } catch (error) {
      console.error('Error fetching top scorers:', error);
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
  }
};