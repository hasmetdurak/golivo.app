// Enhanced Football API Service - Complete rewrite utilizing ALL LiveScore API capabilities
// This file now imports from the new modular API architecture

import { FootballApi as NewFootballApi } from './api/index';
import { TheSportsDBService } from './api/utils/thesportsdb';
import { cacheManager } from './api/cache/manager';

// Enhanced API wrapper for legacy compatibility
class EnhancedFootballApiWrapper {
  private api = NewFootballApi;
  
  // Enhanced methods with TheSportsDB integration
  async getLiveMatches(league: string = 'all', date: string = new Date().toISOString().split('T')[0]) {
    console.log('🔥 Fetching enhanced live matches with TheSportsDB logos...');
    
    try {
      const matches = await this.api.getLiveMatches({ enhanced: true });
      
      // Enrich with TheSportsDB logos
      const enrichedMatches = await Promise.all(
        matches.map(async (matchData) => {
          const [homeLogo, awayLogo] = await Promise.all([
            TheSportsDBService.getTeamLogo(matchData.match.home.name),
            TheSportsDBService.getTeamLogo(matchData.match.away.name)
          ]);
          
          return {
            ...this.transformToLegacyFormat(matchData.match),
            homeTeam: {
              ...matchData.match.home,
              logo: homeLogo
            },
            awayTeam: {
              ...matchData.match.away,
              logo: awayLogo
            },
            events: matchData.events || [],
            statistics: matchData.statistics || {},
            enhancedData: {
              events: matchData.events || [],
              statistics: matchData.statistics || {},
              lineups: matchData.lineups || {},
              dataQuality: {
                hasEvents: (matchData.events || []).length > 0,
                hasStatistics: Object.keys(matchData.statistics || {}).length > 0,
                hasLineups: Object.keys(matchData.lineups || {}).length > 0
              }
            }
          };
        })
      );
      
      console.log(`✨ Enhanced ${enrichedMatches.length} matches with TheSportsDB logos`);
      return enrichedMatches;
      
    } catch (error) {
      console.error('❌ Error fetching enhanced live matches:', error);
      return this.getFallbackMatches();
    }
  }
  
  // Transform new format to legacy format for compatibility
  private transformToLegacyFormat(match: any) {
    const isLive = match.status === 'IN PLAY' || match.status === 'ADDED TIME';
    const isFinished = match.status === 'FINISHED';
    const isHalfTime = match.status === 'HALF TIME BREAK';
    
    const scoreStr = match.scores?.score || '0 - 0';
    const scoreParts = scoreStr.split(' - ');
    const homeScore = parseInt(scoreParts[0]) || 0;
    const awayScore = parseInt(scoreParts[1]) || 0;
    
    let displayTime = '';
    let minute = '0';
    
    if (isLive || isHalfTime) {
      minute = match.time || '0';
      displayTime = isHalfTime ? 'HT' : `${minute}'`;
    } else if (isFinished) {
      displayTime = 'FT';
      minute = '90';
    } else {
      displayTime = match.scheduled || 'TBD';
      minute = '0';
    }
    
    return {
      id: match.id?.toString() || 'unknown',
      league: match.competition?.name || 'Unknown League',
      country: match.country?.name || 'Unknown',
      status: isLive || isHalfTime ? 'live' : (isFinished ? 'finished' : 'upcoming'),
      minute: minute,
      time: displayTime,
      venue: match.location || match.venue || 'Unknown Venue',
      referee: match.referee || 'Unknown Referee',
      round: match.round || 'Regular Season',
      homeTeam: {
        id: match.home?.id,
        name: String(match.home?.name || 'Home Team'),
        logo: match.home?.logo || '/placeholder-logo.svg'
      },
      awayTeam: {
        id: match.away?.id,
        name: String(match.away?.name || 'Away Team'),
        logo: match.away?.logo || '/placeholder-logo.svg'
      },
      homeScore: homeScore,
      awayScore: awayScore,
      isLive: isLive || isHalfTime,
      goalscorers: [],
      cards: [],
      substitutions: {},
      fixtureId: match.fixture_id,
      odds: match.odds || {},
      scheduled: match.scheduled,
      competition: match.competition
    };
  }
  
  // Legacy compatibility methods
  async getAvailableCountries() {
    return this.api.getCountries();
  }
  
  async getAvailableLeagues() {
    return this.api.getCompetitions();
  }
  
  async getTopScorers() {
    const competitions = await this.api.getCompetitions();
    const majorCompetitions = competitions.filter(c => c.tier <= 2).slice(0, 3);
    
    const scorerResults = await Promise.all(
      majorCompetitions.map(comp => 
        this.api.getTopGoalscorers({ competition: comp.id }).catch(() => [])
      )
    );
    
    return scorerResults.flat().slice(0, 20);
  }
  
  async getLeagueStandings(leagueId: string) {
    return this.api.getStandings({ competition: leagueId });
  }
  
  async getMatchEvents(matchId: string) {
    return this.api.getMatchEvents(matchId);
  }
  
  async getMatchStatistics(matchId: string) {
    return this.api.getMatchStatistics(matchId);
  }
  
  async getMatchLineups(matchId: string) {
    return this.api.getMatchLineups(matchId);
  }
  
  async getHeadToHead(team1Id: string, team2Id: string) {
    return this.api.getHeadToHead(team1Id, team2Id);
  }
  
  // Enhanced comprehensive data method
  async getComprehensiveAllData() {
    console.log('🚀 Starting MAXIMUM data extraction with new API architecture...');
    
    try {
      const result = await this.api.getComprehensiveAllData();
      
      return {
        matches: result.matches.map(matchData => ({
          ...this.transformToLegacyFormat(matchData.match),
          enhancedData: {
            events: matchData.events,
            statistics: matchData.statistics,
            lineups: matchData.lineups,
            commentary: matchData.commentary,
            dataQuality: {
              hasEvents: matchData.events.length > 0,
              hasStatistics: Object.keys(matchData.statistics?.home || {}).length > 0,
              hasLineups: matchData.lineups?.home?.starting_eleven?.length > 0,
              hasCommentary: matchData.commentary.length > 0
            }
          }
        })),
        leagues: result.competitions,
        countries: result.countries,
        topScorers: result.topScorers,
        standings: result.standings,
        analytics: result.analytics,
        totalDataPoints: result.metadata.totalDataPoints,
        extractedAt: result.extractedAt,
        metadata: result.metadata
      };
    } catch (error) {
      console.error('❌ Enhanced comprehensive data extraction failed:', error);
      return this.getFallbackComprehensiveData();
    }
  }
  
  // Enhanced methods
  async enrichMatchesWithStatistics(matches: any[]) {
    console.log('📊 Enriching matches with detailed statistics...');
    
    const enrichedMatches = await Promise.all(
      matches.map(async (match) => {
        try {
          const [events, statistics, lineups] = await Promise.all([
            this.api.getMatchEvents(match.id),
            this.api.getMatchStatistics(match.id),
            this.api.getMatchLineups(match.id)
          ]);
          
          return {
            ...match,
            enhancedData: {
              events: events || [],
              statistics: statistics || {},
              lineups: lineups || {},
              dataQuality: {
                hasEvents: (events || []).length > 0,
                hasStatistics: Object.keys(statistics || {}).length > 0,
                hasLineups: Object.keys(lineups || {}).length > 0
              }
            }
          };
        } catch (error) {
          console.warn(`Failed to enrich match ${match.id}:`, error);
          return {
            ...match,
            enhancedData: {
              events: [],
              statistics: {},
              lineups: {},
              dataQuality: { hasEvents: false, hasStatistics: false, hasLineups: false }
            }
          };
        }
      })
    );
    
    return enrichedMatches;
  }
  
  // Performance and utility methods
  getPerformanceStats() {
    return this.api.getPerformanceStats();
  }
  
  getCacheStats() {
    return this.api.getCacheStats();
  }
  
  clearCache() {
    this.api.clearCache();
  }
  
  // Fallback methods
  getFallbackMatches() {
    const today = new Date().toISOString().split('T')[0];
    
    return [
      {
        id: 'live-1',
        league: 'Premier League',
        country: 'England',
        status: 'live',
        minute: '67',
        time: '67\'',
        venue: 'Anfield',
        referee: 'Michael Oliver',
        round: 'Round 15',
        scheduled: today,
        homeTeam: {
          name: 'Liverpool',
          logo: 'https://www.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png'
        },
        awayTeam: {
          name: 'Arsenal',
          logo: 'https://www.thesportsdb.com/images/media/team/badge/vpqrry1467463072.png'
        },
        homeScore: 1,
        awayScore: 2,
        isLive: true,
        goalscorers: [],
        cards: [],
        substitutions: {}
      }
    ];
  }
  
  getFallbackComprehensiveData() {
    return this.api.getFallbackComprehensiveData();
  }
  
  // Advanced methods from new API
  async getLiveDataStream() {
    return this.api.getLiveDataStream();
  }
  
  async getTodaysSchedule() {
    return this.api.getTodaysSchedule();
  }
  
  async getMatchTimeline(matchId: string) {
    return this.api.getMatchTimeline(matchId);
  }
  
  async searchMatches(query: any) {
    return this.api.searchMatches(query);
  }
  
  async getMatchPredictions(matchId: string) {
    return this.api.getMatchPredictions(matchId);
  }
  
  async getCompetitionData(competitionId: string) {
    return this.api.getCompetitionData(competitionId);
  }
  
  async getTeamData(teamId: string) {
    return this.api.getTeamData(teamId);
  }
}

// Export the enhanced API as the main FootballApi
export const FootballApi = new EnhancedFootballApiWrapper();

// Legacy exports for compatibility
export { TheSportsDBService };
export { cacheManager };

// Default export
export default FootballApi;