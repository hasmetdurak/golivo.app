import { 
  LiveScoreConfig, 
  ApiResponse, 
  Match, 
  Competition, 
  Team, 
  Country, 
  Federation,
  MatchEvent,
  MatchStatistics,
  MatchLineups,
  MatchCommentary,
  StandingEntry,
  TopScorer,
  HeadToHeadData,
  CompetitionGroup,
  TeamSquad,
  ApiError,
  PerformanceMetrics
} from './types/index';
import { cacheManager, CacheStrategies } from './cache/manager';

/**
 * Core LiveScore API Service
 * Implements all available endpoints with intelligent caching and error handling
 */
export class LiveScoreApi {
  private config: LiveScoreConfig;
  private performanceMetrics: PerformanceMetrics[] = [];
  
  constructor(config: LiveScoreConfig) {
    this.config = config;
  }

  /**
   * Make authenticated API request with caching and error handling
   */
  private async request<T>(
    endpoint: string, 
    params: Record<string, any> = {},
    cacheStrategy: string = CacheStrategies.LIVE_DATA
  ): Promise<T> {
    const startTime = performance.now();
    const cacheKey = cacheManager.generateKey(endpoint, params);
    
    // Try cache first
    const cached = cacheManager.get<T>(cacheKey, cacheStrategy);
    if (cached) {
      this.recordPerformance(endpoint, performance.now() - startTime, true, true);
      return cached;
    }

    try {
      // Build URL with parameters
      const url = new URL(endpoint, this.config.baseUrl);
      url.searchParams.append('key', this.config.apiKey);
      url.searchParams.append('secret', this.config.apiSecret);
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });

      console.log(`🌐 API Request: ${url.pathname}${url.search}`);

      const response = await fetch(url.toString(), {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'GoLivo-Football-App/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json() as ApiResponse<T>;
      
      if (!data.success) {
        throw new Error(data.error || data.message || 'API request failed');
      }

      // Cache successful response
      cacheManager.set(cacheKey, data.data, cacheStrategy);
      
      this.recordPerformance(endpoint, performance.now() - startTime, true, false);
      return data.data;

    } catch (error) {
      this.recordPerformance(endpoint, performance.now() - startTime, false, false);
      console.error(`❌ API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // === BULK MATCHES ENDPOINTS ===

  /**
   * Get live scores with enhanced filtering
   */
  async getLiveScores(params: {
    country?: string;
    competition?: string;
    competitions?: string;
    team?: string;
    date?: string;
  } = {}): Promise<Match[]> {
    return this.request<Match[]>(
      '/api-client/matches/live.json',
      params,
      CacheStrategies.LIVE_DATA
    );
  }

  /**
   * Get scheduled fixtures
   */
  async getFixtures(params: {
    country?: string;
    competition?: string;
    competitions?: string;
    team?: string;
    date?: string;
    from?: string;
    to?: string;
  } = {}): Promise<Match[]> {
    return this.request<Match[]>(
      '/api-client/fixtures/matches.json',
      params,
      CacheStrategies.HISTORY
    );
  }

  /**
   * Get historical matches
   */
  async getHistoryMatches(params: {
    country?: string;
    competition?: string;
    competitions?: string;
    team?: string;
    date?: string;
    from?: string;
    to?: string;
  } = {}): Promise<Match[]> {
    return this.request<Match[]>(
      '/api-client/scores/history.json',
      params,
      CacheStrategies.HISTORY
    );
  }

  // === SINGLE MATCH ENDPOINTS ===

  /**
   * Get match events
   */
  async getMatchEvents(matchId: string): Promise<MatchEvent[]> {
    return this.request<MatchEvent[]>(
      '/api-client/scores/events.json',
      { id: matchId },
      CacheStrategies.EVENTS
    );
  }

  /**
   * Get match statistics
   */
  async getMatchStatistics(matchId: string): Promise<MatchStatistics> {
    return this.request<MatchStatistics>(
      '/api-client/matches/stats.json',
      { match_id: matchId },
      CacheStrategies.STATISTICS
    );
  }

  /**
   * Get match lineups
   */
  async getMatchLineups(matchId: string): Promise<MatchLineups> {
    return this.request<MatchLineups>(
      '/api-client/matches/lineups.json',
      { match_id: matchId },
      CacheStrategies.LINEUPS
    );
  }

  /**
   * Get match commentary
   */
  async getMatchCommentary(matchId: string): Promise<MatchCommentary[]> {
    return this.request<MatchCommentary[]>(
      '/api-client/scores/commentary.json',
      { id: matchId },
      CacheStrategies.COMMENTARY
    );
  }

  // === COMPETITIONS ENDPOINTS ===

  /**
   * Get competition standings
   */
  async getStandings(params: {
    competition?: string;
    group?: string;
    season?: string;
  }): Promise<StandingEntry[]> {
    return this.request<StandingEntry[]>(
      '/api-client/competitions/standings.json',
      params,
      CacheStrategies.STANDINGS
    );
  }

  /**
   * Get top goalscorers
   */
  async getTopGoalscorers(params: {
    competition?: string;
    group?: string;
    season?: string;
  }): Promise<TopScorer[]> {
    return this.request<TopScorer[]>(
      '/api-client/competitions/goalscorers.json',
      params,
      CacheStrategies.STANDINGS
    );
  }

  /**
   * Get list of competitions
   */
  async getCompetitions(params: {
    country?: string;
    federation?: string;
    tier?: string;
    is_cup?: boolean;
    is_league?: boolean;
  } = {}): Promise<Competition[]> {
    return this.request<Competition[]>(
      '/api-client/competitions/list.json',
      params,
      CacheStrategies.TEAMS
    );
  }

  /**
   * Get list of teams
   */
  async getTeams(params: {
    country?: string;
    competition?: string;
    search?: string;
  } = {}): Promise<Team[]> {
    return this.request<Team[]>(
      '/api-client/teams/list.json',
      params,
      CacheStrategies.TEAMS
    );
  }

  /**
   * Get head-to-head comparison
   */
  async getHeadToHead(team1Id: string, team2Id: string): Promise<HeadToHeadData> {
    return this.request<HeadToHeadData>(
      '/api-client/teams/head2head.json',
      { team1_id: team1Id, team2_id: team2Id },
      CacheStrategies.HISTORY
    );
  }

  /**
   * Get team's last matches
   */
  async getLastMatches(params: {
    team: string;
    count?: number;
    from?: string;
    to?: string;
  }): Promise<Match[]> {
    return this.request<Match[]>(
      '/api-client/teams/last-matches.json',
      params,
      CacheStrategies.HISTORY
    );
  }

  // === GEOGRAPHY ENDPOINTS ===

  /**
   * Get list of countries
   */
  async getCountries(): Promise<Country[]> {
    return this.request<Country[]>(
      '/api-client/countries/list.json',
      {},
      CacheStrategies.GEOGRAPHY
    );
  }

  /**
   * Get list of federations
   */
  async getFederations(): Promise<Federation[]> {
    return this.request<Federation[]>(
      '/api-client/federations/list.json',
      {},
      CacheStrategies.GEOGRAPHY
    );
  }

  // === UTILITY METHODS ===

  /**
   * Get comprehensive data for a specific match
   */
  async getComprehensiveMatchData(matchId: string): Promise<{
    match: Match;
    events: MatchEvent[];
    statistics: MatchStatistics;
    lineups: MatchLineups;
    commentary: MatchCommentary[];
  }> {
    const cacheKey = `comprehensive_match_${matchId}`;
    const cached = cacheManager.get<{
      match: Match;
      events: MatchEvent[];
      statistics: MatchStatistics;
      lineups: MatchLineups;
      commentary: MatchCommentary[];
    }>(cacheKey, CacheStrategies.COMPREHENSIVE);
    
    if (cached) {
      return cached;
    }

    try {
      // Get basic match data first
      const liveMatches = await this.getLiveScores();
      const match = liveMatches.find(m => m.id === matchId);
      
      if (!match) {
        throw new Error(`Match ${matchId} not found`);
      }

      // Fetch all detailed data in parallel
      const [events, statistics, lineups, commentary] = await Promise.all([
        this.getMatchEvents(matchId).catch(() => []),
        this.getMatchStatistics(matchId).catch(() => ({ home: {}, away: {} } as MatchStatistics)),
        this.getMatchLineups(matchId).catch(() => ({ home: { team: match.home, starting_eleven: [], substitutes: [] }, away: { team: match.away, starting_eleven: [], substitutes: [] } } as MatchLineups)),
        this.getMatchCommentary(matchId).catch(() => [])
      ]);

      const result = {
        match,
        events,
        statistics,
        lineups,
        commentary
      };

      cacheManager.set(cacheKey, result, CacheStrategies.COMPREHENSIVE);
      return result;

    } catch (error) {
      console.error(`Error fetching comprehensive match data for ${matchId}:`, error);
      throw error;
    }
  }

  /**
   * Get all available data for maximum extraction
   */
  async getAllAvailableData(): Promise<{
    liveMatches: Match[];
    fixtures: Match[];
    competitions: Competition[];
    countries: Country[];
    federations: Federation[];
    topScorers: TopScorer[];
    standings: Record<string, StandingEntry[]>;
    extractedAt: string;
  }> {
    const cacheKey = 'all_available_data';
    const cached = cacheManager.get<{
      liveMatches: Match[];
      fixtures: Match[];
      competitions: Competition[];
      countries: Country[];
      federations: Federation[];
      topScorers: TopScorer[];
      standings: Record<string, StandingEntry[]>;
      extractedAt: string;
    }>(cacheKey, CacheStrategies.COMPREHENSIVE);
    
    if (cached) {
      return cached;
    }

    try {
      console.log('🚀 Extracting ALL available data from LiveScore API...');

      // Get basic data in parallel
      const [
        liveMatches,
        competitions,
        countries,
        federations
      ] = await Promise.all([
        this.getLiveScores().catch(() => []),
        this.getCompetitions().catch(() => []),
        this.getCountries().catch(() => []),
        this.getFederations().catch(() => [])
      ]);

      // Get fixtures for popular competitions
      const popularCompetitions = competitions
        .filter(c => c.tier !== undefined && c.tier <= 2) // Top tier competitions
        .slice(0, 10); // Limit to avoid rate limits

      const fixtures = await Promise.all(
        popularCompetitions.map(comp => 
          this.getFixtures({ competition: comp.id }).catch(() => [])
        )
      ).then(results => results.flat());

      // Get top scorers and standings for major competitions
      const [topScorersResults, standingsResults] = await Promise.all([
        Promise.all(
          popularCompetitions.slice(0, 5).map(comp =>
            this.getTopGoalscorers({ competition: comp.id }).catch(() => [])
          )
        ),
        Promise.all(
          popularCompetitions.slice(0, 5).map(comp =>
            this.getStandings({ competition: comp.id }).catch(() => [])
          )
        )
      ]);

      const topScorers = topScorersResults.flat();
      const standings = Object.fromEntries(
        popularCompetitions.slice(0, 5).map((comp, idx) => [
          comp.id,
          standingsResults[idx] || []
        ])
      );

      const result = {
        liveMatches,
        fixtures,
        competitions,
        countries,
        federations,
        topScorers,
        standings,
        extractedAt: new Date().toISOString()
      };

      cacheManager.set(cacheKey, result, CacheStrategies.COMPREHENSIVE);
      console.log('✨ All available data extracted and cached');
      
      return result;

    } catch (error) {
      console.error('❌ Error extracting all available data:', error);
      throw error;
    }
  }

  /**
   * Record performance metrics
   */
  private recordPerformance(
    endpoint: string,
    responseTime: number,
    success: boolean,
    cacheHit: boolean
  ): void {
    this.performanceMetrics.push({
      endpoint,
      responseTime,
      success,
      cacheHit,
      dataSize: 0, // Could be calculated if needed
      timestamp: Date.now()
    });

    // Keep only last 1000 metrics
    if (this.performanceMetrics.length > 1000) {
      this.performanceMetrics = this.performanceMetrics.slice(-1000);
    }
  }

  /**
   * Get performance statistics
   */
  getPerformanceStats() {
    const totalRequests = this.performanceMetrics.length;
    const successfulRequests = this.performanceMetrics.filter(m => m.success).length;
    const cacheHits = this.performanceMetrics.filter(m => m.cacheHit).length;
    const avgResponseTime = this.performanceMetrics.reduce((sum, m) => sum + m.responseTime, 0) / totalRequests;

    return {
      totalRequests,
      successRate: totalRequests > 0 ? successfulRequests / totalRequests : 0,
      cacheHitRate: totalRequests > 0 ? cacheHits / totalRequests : 0,
      avgResponseTime
    };
  }

  /**
   * Clear all caches
   */
  clearCache(): void {
    cacheManager.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return cacheManager.getStats();
  }
}