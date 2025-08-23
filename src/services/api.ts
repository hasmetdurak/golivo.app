const API_KEY = '47746f324863a1c7321a4b137847eba9e647469c8eacced9ca6175bbbadf5c2d';
const BASE_URL = 'https://apiv3.apifootball.com';

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
  goalscorer?: Array<{
    time: string;
    home_scorer: string;
    away_scorer: string;
    score: string;
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
}

interface Match {
  id: string;
  league: string;
  country?: string;
  status: string;
  minute?: string;
  time: string;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  homeScore: number;
  awayScore: number;
  events?: Array<{
    type: 'Goal' | 'Yellow Card' | 'Red Card' | 'Substitution';
    minute: string;
    player: string;
    team: 'home' | 'away';
    icon?: string;
  }>;
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
            icon: '⚽'
          });
        }
        if (goal.away_scorer) {
          events.push({
            type: 'Goal',
            minute: goal.time,
            player: goal.away_scorer,
            team: 'away',
            icon: '⚽'
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

    return {
      id: apiMatch.match_id,
      league: detectedLeague,
      country: apiMatch.country_name || 'Unknown',
      status,
      minute,
      time: apiMatch.match_time || '00:00',
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
      events
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
      
      console.log('Fetching from API:', url);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data: ApiMatch[] = await response.json();
      console.log('API Response:', data);
      
      if (!Array.isArray(data)) {
        console.warn('API returned non-array data:', data);
        return [];
      }
      
      const transformedMatches = data.map(transformApiMatch).filter(match => match !== null);
      console.log('Transformed matches:', transformedMatches);
      
      return transformedMatches;
      
    } catch (error) {
      console.error('Error fetching matches:', error);
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
          ]
        },
        {
          id: '2',
          league: 'Spanish La Liga',
          country: 'SPAIN LA LIGA',
          status: 'finished',
          time: '18:00',
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
          ]
        },
        {
          id: '3',
          league: 'Russian Premier League',
          country: 'RUSSIA PREMIER LEAGUE',
          status: 'finished',
          time: '14:00',
          homeTeam: {
            name: 'Rubin Kazan',
            logo: 'https://via.placeholder.com/40x40/00FF00/FFFFFF?text=RK'
          },
          awayTeam: {
            name: 'Spartak Moscow',
            logo: 'https://via.placeholder.com/40x40/FF0000/FFFFFF?text=SM'
          },
          homeScore: 0,
          awayScore: 2,
          events: [
            {
              type: 'Yellow Card' as const,
              minute: "35'",
              player: 'Jocic',
              team: 'home' as const,
              icon: '🟨'
            },
            {
              type: 'Goal' as const,
              minute: "57'",
              player: 'Solari',
              team: 'away' as const,
              icon: '⚽'
            },
            {
              type: 'Goal' as const,
              minute: "73'",
              player: 'Martins',
              team: 'away' as const,
              icon: '⚽'
            }
          ]
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
  }
};