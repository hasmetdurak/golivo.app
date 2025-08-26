const BASE_URL = 'https://apiv3.apifootball.com';
const API_KEY = '47746f324863a1c7321a4b137847eba9e647469c8eacced9ca6175bbbadf5c2d';

// League ID mappings for major leagues
const LEAGUE_IDS = {
  'Premier League': '152',
  'English Premier League': '152',
  'La Liga': '302',
  'Spanish La Liga': '302',
  'Bundesliga': '175',
  'German Bundesliga': '175',
  'Serie A': '207',
  'Italian Serie A': '207',
  'Ligue 1': '168',
  'French Ligue 1': '168',
  'Süper Lig': '322',
  'Turkish Super League': '322',
  'Super Lig': '322',
  'Eredivisie': '137',
  'Dutch Eredivisie': '137',
  'Primeira Liga': '94',
  'Portuguese Primeira Liga': '94',
  'Major League Soccer': '253',
  'MLS': '253',
  'Brasileirão': '71',
  'Brazilian Brasileirão': '71',
  'Argentine Primera División': '26',
  'Argentine Primera Division': '26',
  'Saudi Pro League': '350',
  'Chinese Super League': '169',
  'Champions League': '3',
  'UEFA Champions League': '3',
  'Europa League': '4',
  'UEFA Europa League': '4',
  'Conference League': '848',
  'UEFA Conference League': '848'
};

// Demo matches for fallback
const getDemoMatches = () => {
  return [
    {
      id: '1',
      league: 'English Premier League',
      country: 'ENGLAND',
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
      awayScore: 1
    },
    {
      id: '2',
      league: 'La Liga',
      country: 'SPAIN',
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
      awayScore: 0
    },
    {
      id: '3',
      league: 'Bundesliga',
      country: 'GERMANY',
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
      awayScore: 1
    }
  ];
};

export const FootballApi = {
  async getLiveMatches(league: string = 'all', date: string = new Date().toISOString().split('T')[0]): Promise<any[]> {
    try {
      console.log(`⚽ Fetching matches for ${league} on ${date}`);
      
      const url = `${BASE_URL}/?action=get_events&from=${date}&to=${date}&APIkey=${API_KEY}`;
      console.log('🌍 API Request URL:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📥 Raw API Response:', data.length, 'matches');
      
      if (!Array.isArray(data)) {
        console.error('❌ API did not return an array:', data);
        return getDemoMatches();
      }
      
      // Transform API data to our format
      const transformedMatches = data.map((match: any) => ({
        id: match.match_id || match.id || 'unknown',
        league: match.league_name || match.league || 'Unknown League',
        country: match.country_name || match.country || 'Unknown',
        status: this.getMatchStatus(match),
        minute: match.match_live === '1' ? match.match_time : undefined,
        time: match.match_time || '00:00',
        venue: match.match_venue,
        referee: match.match_referee,
        round: match.match_round,
        homeTeam: {
          name: match.match_hometeam_name || match.homeTeam?.name || 'Home Team',
          logo: match.team_home_badge || match.homeTeam?.logo || 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=H'
        },
        awayTeam: {
          name: match.match_awayteam_name || match.awayTeam?.name || 'Away Team',
          logo: match.team_away_badge || match.awayTeam?.logo || 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=A'
        },
        homeScore: match.match_hometeam_score !== '' ? parseInt(match.match_hometeam_score) : (match.homeScore || 0),
        awayScore: match.match_awayteam_score !== '' ? parseInt(match.match_awayteam_score) : (match.awayScore || 0),
        isLive: match.match_live === '1' || match.status === 'live',
        goalscorers: match.goalscorer || [],
        cards: match.cards || [],
        statistics: match.statistics || []
      }));
      
      console.log('✅ Transformed matches:', transformedMatches.length);
      return transformedMatches;
    } catch (error) {
      console.error('❌ Error fetching live matches:', error);
      console.log('🎭 Returning demo matches as fallback');
      return getDemoMatches();
    }
  },

  getMatchStatus(match: any): string {
    if (match.match_live === '1' || match.status === 'live') {
      return 'live';
    } else if (match.match_status && match.match_status.toLowerCase().includes('finished')) {
      return 'finished';
    } else {
      return 'scheduled';
    }
  },

  async getLeagueStandings(leagueId: string): Promise<any[]> {
    try {
      const url = `${BASE_URL}/?action=get_standings&league_id=${leagueId}&APIkey=${API_KEY}`;
      console.log('Fetching standings:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Standings data:', data);
      
      if (!Array.isArray(data)) {
        return [];
      }
      
      return data.sort((a: any, b: any) => parseInt(a.overall_league_position) - parseInt(b.overall_league_position));
      
    } catch (error) {
      console.error('Error fetching standings:', error);
      return [];
    }
  },

  async getAvailableLeagues(): Promise<any[]> {
    try {
      const url = `${BASE_URL}/?action=get_leagues&APIkey=${API_KEY}`;
      console.log('Fetching leagues:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
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
