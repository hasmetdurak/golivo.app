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
  'Turkish Super League': '340'
};

interface ApiMatch {
  match_id: string;
  country_name: string;
  league_name: string;
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
    type: string;
    minute: string;
    player: string;
  }>;
}

const transformApiMatch = (apiMatch: ApiMatch): Match => {
  const isLive = apiMatch.match_live === '1' || apiMatch.match_status.includes("'");
  let status = 'scheduled';
  let minute = undefined;
  
  if (isLive) {
    status = 'live';
    if (apiMatch.match_status.includes("'")) {
      minute = apiMatch.match_status;
    }
  } else if (apiMatch.match_status === 'Finished') {
    status = 'finished';
  }

  const events = apiMatch.goalscorer?.map(goal => ({
    type: 'Goal',
    minute: goal.time,
    player: goal.home_scorer || goal.away_scorer
  })) || [];

  return {
    id: apiMatch.match_id,
    league: apiMatch.league_name,
    country: apiMatch.country_name,
    status,
    minute,
    time: apiMatch.match_time,
    homeTeam: {
      name: apiMatch.match_hometeam_name,
      logo: apiMatch.team_home_badge || 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=?'
    },
    awayTeam: {
      name: apiMatch.match_awayteam_name,
      logo: apiMatch.team_away_badge || 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=?'
    },
    homeScore: parseInt(apiMatch.match_hometeam_score) || 0,
    awayScore: parseInt(apiMatch.match_awayteam_score) || 0,
    events
  };
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
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data: ApiMatch[] = await response.json();
      
      if (!Array.isArray(data)) {
        console.warn('API returned non-array data, using fallback');
        return [];
      }
      
      return data.map(transformApiMatch);
      
    } catch (error) {
      console.error('Error fetching matches:', error);
      // Return empty array on error, MatchList will use mock data as fallback
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
  }
};