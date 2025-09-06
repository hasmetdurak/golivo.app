import { LiveScoreApi } from './core';
import { MatchesApi } from './endpoints/matches';
import { ComprehensiveDataService } from './aggregation/comprehensive';
import { cacheManager } from './cache/manager';
import { LiveScoreConfig } from './types/index';

// Configuration for LiveScore API
const API_CONFIG: LiveScoreConfig = {
  baseUrl: 'https://livescore-api.com',
  apiKey: 'SMevPY633lCgLc1u',
  apiSecret: 'Vaf4qt9QehMahbH9XVFNULQY7teSFfmB',
  timeout: 10000,
  retryAttempts: 3
};

/**
 * Enhanced Football API Service
 * Complete rewrite utilizing ALL LiveScore API capabilities
 */
class EnhancedFootballApi {
  private coreApi: LiveScoreApi;
  private matchesApi: MatchesApi;
  private comprehensiveService: ComprehensiveDataService;

  constructor() {
    this.coreApi = new LiveScoreApi(API_CONFIG);
    this.matchesApi = new MatchesApi(API_CONFIG);
    this.comprehensiveService = new ComprehensiveDataService(this.coreApi);
  }

  // === CORE API METHODS (Direct access to all endpoints) ===
  
  /**
   * Get live scores with advanced filtering
   */
  async getLiveMatches(params?: {
    country?: string;
    competition?: string;
    team?: string;
    enhanced?: boolean;
  }) {
    if (params?.enhanced) {
      return this.matchesApi.getEnhancedLiveMatches({
        ...params,
        includeEvents: true,
        includeStatistics: true
      });
    }
    return this.coreApi.getLiveScores(params);
  }

  /**
   * Get fixtures (scheduled matches)
   */
  async getFixtures(params?: {
    country?: string;
    competition?: string;
    team?: string;
    date?: string;
    from?: string;
    to?: string;
  }) {
    return this.coreApi.getFixtures(params);
  }

  /**
   * Get historical matches
   */
  async getHistoryMatches(params?: {
    country?: string;
    competition?: string;
    team?: string;
    date?: string;
    from?: string;
    to?: string;
  }) {
    return this.coreApi.getHistoryMatches(params);
  }

  /**
   * Get match events
   */
  async getMatchEvents(matchId: string) {
    return this.coreApi.getMatchEvents(matchId);
  }

  /**
   * Get match statistics
   */
  async getMatchStatistics(matchId: string) {
    return this.coreApi.getMatchStatistics(matchId);
  }

  /**
   * Get match lineups
   */
  async getMatchLineups(matchId: string) {
    return this.coreApi.getMatchLineups(matchId);
  }

  /**
   * Get match commentary
   */
  async getMatchCommentary(matchId: string) {
    return this.coreApi.getMatchCommentary(matchId);
  }

  /**
   * Get league standings
   */
  async getStandings(params: {
    competition?: string;
    group?: string;
    season?: string;
  }) {
    return this.coreApi.getStandings(params);
  }

  /**
   * Get top goalscorers
   */
  async getTopGoalscorers(params: {
    competition?: string;
    group?: string;
    season?: string;
  }) {
    return this.coreApi.getTopGoalscorers(params);
  }

  /**
   * Get competitions list
   */
  async getCompetitions(params?: {
    country?: string;
    federation?: string;
    tier?: string;
  }) {
    return this.coreApi.getCompetitions(params);
  }

  /**
   * Get teams list
   */
  async getTeams(params?: {
    country?: string;
    competition?: string;
    search?: string;
  }) {
    return this.coreApi.getTeams(params);
  }

  /**
   * Get head-to-head data
   */
  async getHeadToHead(team1Id: string, team2Id: string) {
    return this.coreApi.getHeadToHead(team1Id, team2Id);
  }

  /**
   * Get team's last matches
   */
  async getLastMatches(params: {
    team: string;
    count?: number;
    from?: string;
    to?: string;
  }) {
    return this.coreApi.getLastMatches(params);
  }

  /**
   * Get countries list
   */
  async getCountries() {
    return this.coreApi.getCountries();
  }

  /**
   * Get federations list
   */
  async getFederations() {
    return this.coreApi.getFederations();
  }

  // === ENHANCED METHODS (Advanced functionality) ===

  /**
   * Get comprehensive match data with all available information
   */
  async getComprehensiveMatchData(matchId: string) {
    return this.coreApi.getComprehensiveMatchData(matchId);
  }

  /**
   * Get today's complete schedule
   */
  async getTodaysSchedule() {
    return this.matchesApi.getTodaysSchedule();
  }

  /**
   * Get match timeline (events + commentary)
   */
  async getMatchTimeline(matchId: string) {
    return this.matchesApi.getMatchTimeline(matchId);
  }

  /**
   * Search matches with advanced filtering
   */
  async searchMatches(query: {
    team?: string;
    competition?: string;
    country?: string;
    dateFrom?: string;
    dateTo?: string;
    status?: 'live' | 'finished' | 'scheduled';
    minGoals?: number;
    maxGoals?: number;
  }) {
    return this.matchesApi.searchMatches(query);
  }

  /**
   * Get match predictions and analysis
   */
  async getMatchPredictions(matchId: string) {
    return this.matchesApi.getMatchPredictions(matchId);
  }

  /**
   * Get live data stream for real-time updates
   */
  async getLiveDataStream() {
    return this.comprehensiveService.getLiveDataStream();
  }

  /**
   * Get comprehensive competition data
   */
  async getCompetitionData(competitionId: string) {
    return this.comprehensiveService.getCompetitionData(competitionId);
  }

  /**
   * Get comprehensive team data
   */
  async getTeamData(teamId: string) {
    return this.comprehensiveService.getTeamData(teamId);
  }

  // === MAXIMUM DATA EXTRACTION ===

  /**
   * Extract ALL available data with maximum efficiency
   * This is the main method for comprehensive data extraction
   */
  async getComprehensiveAllData() {
    return this.comprehensiveService.extractMaximumData();
  }

  /**
   * Get all available data (legacy method name for compatibility)
   */
  async getAllAvailableData() {
    return this.coreApi.getAllAvailableData();
  }

  // === UTILITY METHODS ===

  /**
   * Get performance statistics
   */
  getPerformanceStats() {
    return this.coreApi.getPerformanceStats();
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return this.coreApi.getCacheStats();
  }

  /**
   * Clear all caches
   */
  clearCache() {
    this.coreApi.clearCache();
  }

  /**
   * Invalidate specific cache category
   */
  invalidateCache(category: string) {
    return cacheManager.invalidateCategory(category);
  }

  // === LEGACY COMPATIBILITY METHODS ===
  // These methods maintain compatibility with existing components

  /**
   * Legacy method for getting available countries
   */
  async getAvailableCountries() {
    return this.getCountries();
  }

  /**
   * Legacy method for getting available leagues
   */
  async getAvailableLeagues() {
    return this.getCompetitions();
  }

  /**
   * Legacy method for getting league standings
   */
  async getLeagueStandings(leagueId: string) {
    return this.getStandings({ competition: leagueId });
  }

  /**
   * Transform matches for legacy compatibility
   */
  private transformMatchesForLegacy(matches: any[]) {
    return matches.map(match => ({
      id: match.id,
      league: match.competition?.name || match.league,
      country: match.country?.name || match.country,
      status: this.mapStatusToLegacy(match.status),
      minute: match.time || match.minute,
      time: match.time,
      venue: match.location || match.venue,
      referee: match.referee || 'Unknown',
      round: match.round || 'Regular Season',
      homeTeam: {
        name: match.home?.name || match.homeTeam?.name,
        logo: match.home?.logo || match.homeTeam?.logo
      },
      awayTeam: {
        name: match.away?.name || match.awayTeam?.name,
        logo: match.away?.logo || match.awayTeam?.logo
      },
      homeScore: this.extractScore(match.scores?.score || match.score, 'home'),
      awayScore: this.extractScore(match.scores?.score || match.score, 'away'),
      isLive: match.status === 'IN PLAY' || match.status === 'ADDED TIME',
      goalscorers: match.events?.filter((e: any) => e.type === 'goal') || [],
      cards: match.events?.filter((e: any) => e.type.includes('card')) || [],
      substitutions: {}
    }));
  }

  private mapStatusToLegacy(status: string): string {
    const statusMap: { [key: string]: string } = {
      'IN PLAY': 'live',
      'ADDED TIME': 'live',
      'HALF TIME BREAK': 'live',
      'FINISHED': 'finished',
      'NOT STARTED': 'upcoming'
    };
    return statusMap[status] || 'upcoming';
  }

  private extractScore(scoreString: string, side: 'home' | 'away'): number {
    if (!scoreString) return 0;
    const parts = scoreString.split(' - ');
    if (parts.length !== 2) return 0;
    const score = parseInt(parts[side === 'home' ? 0 : 1]);
    return isNaN(score) ? 0 : score;
  }

  /**
   * Fallback data for compatibility
   */
  getFallbackComprehensiveData() {
    return {
      matches: [],
      leagues: [],
      countries: [],
      topScorers: [],
      standings: [],
      analytics: {
        overview: {
          totalMatches: 0,
          liveMatches: 0,
          finishedMatches: 0,
          upcomingMatches: 0,
          totalGoals: 0,
          avgGoalsPerMatch: 0,
          dataCompleteness: 0
        },
        leagues: { totalLeagues: 0, distribution: {}, topLeaguesByMatches: [] },
        geography: { totalCountries: 0, distribution: {}, topCountriesByMatches: [] },
        timing: { timeSlots: {}, peakTime: '', currentActivity: 0 },
        quality: {
          matchesWithEvents: 0,
          matchesWithStatistics: 0,
          matchesWithLineups: 0,
          dataRichness: { events: '0', statistics: '0', lineups: '0' }
        }
      },
      totalDataPoints: { matches: 0, leagues: 0, countries: 0, topScorers: 0 },
      extractedAt: new Date().toISOString()
    };
  }
}

// Create and export the enhanced API instance
export const FootballApi = new EnhancedFootballApi();

// Export types for use in components
export * from './types';

// Export cache manager for advanced usage
export { cacheManager };

// Default export for compatibility
export default FootballApi;