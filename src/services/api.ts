const API_KEY = '47746f324863a1c7321a4b137847eba9e647469c8eacced9ca6175bbbadf5c2d';
const BASE_URL = 'https://apiv3.apifootball.com';

export class FootballApi {
  private static async fetchData(endpoint: string, params: Record<string, string> = {}) {
    const url = new URL(BASE_URL);
    url.searchParams.append('APIkey', API_KEY);
    url.searchParams.append('action', endpoint);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  static async getLiveMatches(leagueId?: string) {
    const params: Record<string, string> = {};
    if (leagueId && leagueId !== 'all') {
      params.league_id = leagueId;
    }
    
    try {
      const data = await this.fetchData('get_live_odds_commnets', params);
      return this.transformLiveMatches(data);
    } catch (error) {
      console.error('Error fetching live matches:', error);
      return [];
    }
  }

  static async getOdds(from: string, to: string, matchId?: string) {
    const params: Record<string, string> = { from, to };
    if (matchId) {
      params.match_id = matchId;
    }
    
    return this.fetchData('get_odds', params);
  }

  static async getPredictions(from: string, to: string, leagueId?: string) {
    const params: Record<string, string> = { from, to };
    if (leagueId) {
      params.league_id = leagueId;
    }
    
    return this.fetchData('get_predictions', params);
  }

  static async getTopScorers(leagueId: string) {
    return this.fetchData('get_topscorers', { league_id: leagueId });
  }

  static async getH2H(firstTeamId: string, secondTeamId: string) {
    return this.fetchData('get_H2H', {
      firstTeamId,
      secondTeamId
    });
  }

  private static transformLiveMatches(data: any) {
    if (!data || typeof data !== 'object') return [];
    
    return Object.values(data).map((match: any) => ({
      id: match.match_id,
      league: match.league_name,
      status: match.match_status === '1' ? 'live' : 'finished',
      minute: match.match_status,
      homeTeam: {
        name: match.match_hometeam_name,
        logo: `https://via.placeholder.com/32x32/8B5CF6/FFFFFF?text=${match.match_hometeam_name?.charAt(0) || '?'}`
      },
      awayTeam: {
        name: match.match_awayteam_name,
        logo: `https://via.placeholder.com/32x32/A78BFA/FFFFFF?text=${match.match_awayteam_name?.charAt(0) || '?'}`
      },
      homeScore: parseInt(match.match_hometeam_score) || 0,
      awayScore: parseInt(match.match_awayteam_score) || 0,
      events: match.live_comments?.slice(0, 5).map((comment: any) => ({
        type: 'Comment',
        minute: comment.time?.split(':')[0] || '0',
        description: comment.text
      })) || []
    }));
  }
}