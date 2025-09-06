import { LiveScoreApi } from '../core';
import { MatchesApi } from '../endpoints/matches';
import { 
  Match, 
  Competition, 
  Team, 
  Country, 
  TopScorer,
  StandingEntry,
  MatchAnalytics,
  ComprehensiveMatchData,
  LiveScoreConfig
} from '../types/index';
import { cacheManager, CacheStrategies } from '../cache/manager';

/**
 * Comprehensive Data Aggregation Service
 * Orchestrates data extraction from all available API endpoints
 */
export class ComprehensiveDataService {
  private api: LiveScoreApi;
  private matchesApi: MatchesApi;

  constructor(api: LiveScoreApi) {
    this.api = api;
    // Access the config property properly
    const config = (api as any).config as LiveScoreConfig;
    this.matchesApi = new MatchesApi(config);
  }

  /**
   * Extract ALL available data with maximum efficiency
   */
  async extractMaximumData(): Promise<{
    matches: ComprehensiveMatchData[];
    competitions: Competition[];
    teams: Team[];
    countries: Country[];
    topScorers: TopScorer[];
    standings: Record<string, StandingEntry[]>;
    analytics: MatchAnalytics;
    metadata: {
      totalDataPoints: number;
      extractionTime: number;
      coverage: {
        matchesWithEvents: number;
        matchesWithStatistics: number;
        matchesWithLineups: number;
        matchesWithCommentary: number;
      };
      apiCallsUsed: number;
      cacheHitRate: number;
    };
    extractedAt: string;
  }> {
    const startTime = performance.now();
    const cacheKey = 'maximum_data_extraction';
    
    // Check cache first (2-minute cache for this expensive operation)
    const cached = cacheManager.get<{matches: ComprehensiveMatchData[]; competitions: Competition[]; teams: Team[]; countries: Country[]; topScorers: TopScorer[]; standings: Record<string, StandingEntry[]>; analytics: MatchAnalytics; metadata: any; extractedAt: string;}>(cacheKey, CacheStrategies.COMPREHENSIVE);
    if (cached) {
      console.log('💾 Using cached maximum data extraction');
      return cached;
    }

    console.log('🚀 Starting MAXIMUM data extraction from LiveScore API...');
    
    try {
      // Phase 1: Get basic data structures
      console.log('📊 Phase 1: Extracting basic data structures...');
      const [competitions, countries, federations] = await Promise.all([
        this.api.getCompetitions().catch(() => []),
        this.api.getCountries().catch(() => []),
        this.api.getFederations().catch(() => [])
      ]);

      console.log(`✅ Found ${competitions.length} competitions, ${countries.length} countries, ${federations.length} federations`);

      // Phase 2: Get comprehensive match data
      console.log('🔥 Phase 2: Extracting comprehensive match data...');
      const matches = await this.matchesApi.getMatchesWithFullData(30); // Get top 30 matches with full data

      // Phase 3: Get teams data
      console.log('👥 Phase 3: Extracting teams data...');
      const teamsFromMatches = new Set<Team>();
      matches.forEach(matchData => {
        teamsFromMatches.add(matchData.match.home);
        teamsFromMatches.add(matchData.match.away);
      });
      const teams = Array.from(teamsFromMatches);

      // Phase 4: Get standings and scorers for major competitions
      console.log('🏆 Phase 4: Extracting standings and top scorers...');
      const majorCompetitions = competitions
        .filter(c => c.tier <= 2)
        .slice(0, 8); // Top 8 competitions to avoid rate limits

      const [standingsResults, topScorersResults] = await Promise.all([
        Promise.all(
          majorCompetitions.map(comp =>
            this.api.getStandings({ competition: comp.id })
              .then(standings => [comp.id, standings] as const)
              .catch(() => [comp.id, []] as const)
          )
        ),
        Promise.all(
          majorCompetitions.map(comp =>
            this.api.getTopGoalscorers({ competition: comp.id }).catch(() => [])
          )
        )
      ]);

      const standings = Object.fromEntries(standingsResults);
      const topScorers = topScorersResults.flat();

      console.log(`✅ Got standings for ${Object.keys(standings).length} competitions, ${topScorers.length} top scorers`);

      // Phase 5: Generate comprehensive analytics
      console.log('📈 Phase 5: Generating comprehensive analytics...');
      const analytics = this.generateAdvancedAnalytics(matches, competitions, countries);

      // Phase 6: Calculate metadata
      const extractionTime = performance.now() - startTime;
      const coverage = this.calculateDataCoverage(matches);
      const performanceStats = this.api.getPerformanceStats();

      const result = {
        matches,
        competitions,
        teams,
        countries,
        topScorers,
        standings,
        analytics,
        metadata: {
          totalDataPoints: this.calculateTotalDataPoints(matches, competitions, teams, countries, topScorers, standings),
          extractionTime,
          coverage,
          apiCallsUsed: performanceStats.totalRequests,
          cacheHitRate: performanceStats.cacheHitRate
        },
        extractedAt: new Date().toISOString()
      };

      // Cache the comprehensive result
      cacheManager.set(cacheKey, result, CacheStrategies.COMPREHENSIVE);

      console.log(`✨ MAXIMUM data extraction completed in ${(extractionTime / 1000).toFixed(2)}s`);
      console.log(`📊 Total data points: ${result.metadata.totalDataPoints}`);
      console.log(`🎯 Cache hit rate: ${(result.metadata.cacheHitRate * 100).toFixed(1)}%`);

      return result;

    } catch (error) {
      console.error('❌ Maximum data extraction failed:', error);
      throw error;
    }
  }

  /**
   * Get live data stream with real-time updates
   */
  async getLiveDataStream(): Promise<{
    liveMatches: ComprehensiveMatchData[];
    liveEvents: any[];
    liveStatistics: any[];
    updateInterval: number;
    lastUpdate: string;
  }> {
    const cacheKey = 'live_data_stream';
    
    // Very short cache for live data (15 seconds)
    const cached = cacheManager.get<{liveMatches: ComprehensiveMatchData[]; liveEvents: any[]; liveStatistics: any[]; updateInterval: number; lastUpdate: string;}>(cacheKey, CacheStrategies.LIVE_DATA);
    if (cached) {
      return cached;
    }

    console.log('📡 Extracting live data stream...');

    try {
      // Get enhanced live matches with all data
      const liveMatches = await this.matchesApi.getEnhancedLiveMatches({
        includeEvents: true,
        includeStatistics: true,
        includeLineups: false, // Skip lineups for live stream to reduce latency
        includeCommentary: true
      });

      // Extract live events and statistics separately for faster updates
      const liveEvents = liveMatches.flatMap(match => 
        match.events.map(event => ({
          ...event,
          matchId: match.match.id,
          homeTeam: match.match.home.name,
          awayTeam: match.match.away.name
        }))
      );

      const liveStatistics = liveMatches.map(match => ({
        matchId: match.match.id,
        homeTeam: match.match.home.name,
        awayTeam: match.match.away.name,
        statistics: match.statistics
      }));

      const result = {
        liveMatches,
        liveEvents,
        liveStatistics,
        updateInterval: 15000, // 15 seconds for live data
        lastUpdate: new Date().toISOString()
      };

      // Cache for 15 seconds
      cacheManager.set(cacheKey, result, CacheStrategies.LIVE_DATA);

      return result;

    } catch (error) {
      console.error('❌ Live data stream extraction failed:', error);
      throw error;
    }
  }

  /**
   * Get competition-focused data extraction
   */
  async getCompetitionData(competitionId: string): Promise<{
    competition: Competition;
    matches: ComprehensiveMatchData[];
    standings: StandingEntry[];
    topScorers: TopScorer[];
    teams: Team[];
    groups: any[];
    analytics: any;
  }> {
    const cacheKey = `competition_data_${competitionId}`;
    const cached = cacheManager.get<{competition: Competition; matches: ComprehensiveMatchData[]; standings: StandingEntry[]; topScorers: TopScorer[]; teams: Team[]; groups: any[]; analytics: any;}>(cacheKey, CacheStrategies.STANDINGS);
    
    if (cached) {
      return cached;
    }

    console.log(`🏆 Extracting comprehensive data for competition ${competitionId}...`);

    try {
      // Get basic competition info
      const competitions = await this.api.getCompetitions();
      const competition = competitions.find(c => c.id === competitionId);
      
      if (!competition) {
        throw new Error(`Competition ${competitionId} not found`);
      }

      // Get all competition-related data in parallel
      const [
        matches,
        standings,
        topScorers,
        teams
      ] = await Promise.all([
        this.matchesApi.getEnhancedLiveMatches({ 
          competition: competitionId,
          includeEvents: true,
          includeStatistics: true
        }),
        this.api.getStandings({ competition: competitionId }).catch(() => []),
        this.api.getTopGoalscorers({ competition: competitionId }).catch(() => []),
        this.api.getTeams({ competition: competitionId }).catch(() => [])
      ]);

      const groups: any[] = []; // Placeholder for groups data

      // Generate competition-specific analytics
      const analytics = {
        totalMatches: matches.length,
        totalTeams: teams.length,
        totalGroups: groups.length,
        avgGoalsPerMatch: matches.reduce((sum, m) => {
          const score = m.match.scores?.score || '0 - 0';
          const goals = score.split(' - ').reduce((s, g) => s + parseInt(g) || 0, 0);
          return sum + goals;
        }, 0) / matches.length,
        topScorer: topScorers[0] || null,
        leader: standings[0] || null
      };

      const result = {
        competition,
        matches,
        standings,
        topScorers,
        teams,
        groups,
        analytics
      };

      cacheManager.set(cacheKey, result, CacheStrategies.STANDINGS);
      return result;

    } catch (error) {
      console.error(`❌ Competition data extraction failed for ${competitionId}:`, error);
      throw error;
    }
  }

  /**
   * Get team-focused data extraction
   */
  async getTeamData(teamId: string): Promise<{
    team: Team;
    recentMatches: ComprehensiveMatchData[];
    upcomingMatches: Match[];
    headToHeadData: any[];
    seasonStats: any;
    analytics: any;
  }> {
    const cacheKey = `team_data_${teamId}`;
    const cached = cacheManager.get<{team: Team; recentMatches: ComprehensiveMatchData[]; upcomingMatches: Match[]; headToHeadData: any[]; seasonStats: any; analytics: any;}>(cacheKey, CacheStrategies.HISTORY);
    
    if (cached) {
      return cached;
    }

    console.log(`👥 Extracting comprehensive data for team ${teamId}...`);

    try {
      // Get team info and related data
      const [
        teams,
        recentMatches,
        upcomingMatches
      ] = await Promise.all([
        this.api.getTeams().then(teams => teams.find(t => t.id === teamId)),
        this.api.getLastMatches({ team: teamId, count: 10 }),
        this.api.getFixtures({ team: teamId })
      ]);

      if (!teams) {
        throw new Error(`Team ${teamId} not found`);
      }

      // Enrich recent matches
      const enrichedRecentMatches = await Promise.all(
        recentMatches.slice(0, 5).map(async (match) => {
          const comprehensive = await this.api.getComprehensiveMatchData(match.id).catch(() => null);
          return comprehensive || {
            match,
            events: [],
            statistics: { home: {}, away: {} },
            lineups: { home: { team: match.home, starting_eleven: [], substitutes: [] }, away: { team: match.away, starting_eleven: [], substitutes: [] } },
            commentary: []
          };
        })
      );

      // Calculate season stats
      const seasonStats = this.calculateTeamSeasonStats(recentMatches, teamId);

      const result = {
        team: teams,
        recentMatches: enrichedRecentMatches,
        upcomingMatches,
        headToHeadData: [],
        seasonStats,
        analytics: {
          recentForm: this.calculateRecentForm(recentMatches, teamId),
          homeVsAway: this.calculateHomeAwayStats(recentMatches, teamId),
          goalStats: this.calculateGoalStats(recentMatches, teamId)
        }
      };

      cacheManager.set(cacheKey, result, CacheStrategies.HISTORY);
      return result;

    } catch (error) {
      console.error(`❌ Team data extraction failed for ${teamId}:`, error);
      throw error;
    }
  }

  /**
   * Generate advanced analytics from comprehensive data
   */
  private generateAdvancedAnalytics(
    matches: ComprehensiveMatchData[],
    competitions: Competition[],
    countries: Country[]
  ): MatchAnalytics {
    const allMatches = matches.map(m => m.match);
    
    // Basic overview
    const liveMatches = allMatches.filter(m => m.status === 'IN PLAY' || m.status === 'ADDED TIME');
    const finishedMatches = allMatches.filter(m => m.status === 'FINISHED');
    const upcomingMatches = allMatches.filter(m => m.status === 'NOT STARTED');

    const totalGoals = finishedMatches.reduce((sum, match) => {
      const score = match.scores?.score || '0 - 0';
      return sum + score.split(' - ').reduce((s, g) => s + (parseInt(g) || 0), 0);
    }, 0);

    // League distribution
    const leagueStats = allMatches.reduce((acc, match) => {
      const league = match.competition?.name || 'Unknown';
      if (!acc[league]) {
        acc[league] = { total: 0, live: 0, finished: 0, upcoming: 0, goals: 0, avgGoalsPerMatch: 0 };
      }
      acc[league].total++;
      if (liveMatches.includes(match)) acc[league].live++;
      if (finishedMatches.includes(match)) {
        acc[league].finished++;
        const score = match.scores?.score || '0 - 0';
        acc[league].goals += score.split(' - ').reduce((s, g) => s + (parseInt(g) || 0), 0);
      }
      if (upcomingMatches.includes(match)) acc[league].upcoming++;
      acc[league].avgGoalsPerMatch = acc[league].finished > 0 ? acc[league].goals / acc[league].finished : 0;
      return acc;
    }, {} as Record<string, any>);

    // Geography distribution
    const countryStats = allMatches.reduce((acc, match) => {
      const country = match.country?.name || 'Unknown';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Data quality metrics
    const matchesWithEvents = matches.filter(m => m.events.length > 0).length;
    const matchesWithStatistics = matches.filter(m => 
      Object.keys(m.statistics?.home || {}).length > 0
    ).length;
    const matchesWithLineups = matches.filter(m => 
      m.lineups?.home?.starting_eleven?.length > 0
    ).length;
    const matchesWithCommentary = matches.filter(m => m.commentary.length > 0).length;

    return {
      overview: {
        totalMatches: allMatches.length,
        liveMatches: liveMatches.length,
        finishedMatches: finishedMatches.length,
        upcomingMatches: upcomingMatches.length,
        totalGoals,
        avgGoalsPerMatch: finishedMatches.length > 0 ? totalGoals / finishedMatches.length : 0,
        dataCompleteness: matchesWithEvents / allMatches.length
      },
      leagues: {
        totalLeagues: Object.keys(leagueStats).length,
        distribution: leagueStats,
        topLeaguesByMatches: Object.entries(leagueStats)
          .sort(([,a], [,b]) => b.total - a.total)
          .slice(0, 10)
      },
      geography: {
        totalCountries: Object.keys(countryStats).length,
        distribution: countryStats,
        topCountriesByMatches: Object.entries(countryStats)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 10)
      },
      timing: {
        timeSlots: {
          morning: 0, // Would need proper time analysis
          afternoon: 0,
          evening: 0,
          night: 0
        },
        peakTime: 'evening',
        currentActivity: liveMatches.length
      },
      quality: {
        matchesWithEvents,
        matchesWithStatistics,
        matchesWithLineups,
        matchesWithCommentary,
        dataRichness: {
          events: ((matchesWithEvents / allMatches.length) * 100).toFixed(1),
          statistics: ((matchesWithStatistics / allMatches.length) * 100).toFixed(1),
          lineups: ((matchesWithLineups / allMatches.length) * 100).toFixed(1),
          commentary: ((matchesWithCommentary / allMatches.length) * 100).toFixed(1)
        }
      }
    };
  }

  /**
   * Calculate data coverage metrics
   */
  private calculateDataCoverage(matches: ComprehensiveMatchData[]) {
    return {
      matchesWithEvents: matches.filter(m => m.events.length > 0).length,
      matchesWithStatistics: matches.filter(m => Object.keys(m.statistics?.home || {}).length > 0).length,
      matchesWithLineups: matches.filter(m => m.lineups?.home?.starting_eleven?.length > 0).length,
      matchesWithCommentary: matches.filter(m => m.commentary.length > 0).length
    };
  }

  /**
   * Calculate total data points extracted
   */
  private calculateTotalDataPoints(
    matches: ComprehensiveMatchData[],
    competitions: Competition[],
    teams: Team[],
    countries: Country[],
    topScorers: TopScorer[],
    standings: Record<string, StandingEntry[]>
  ): number {
    const matchDataPoints = matches.reduce((sum, match) => {
      return sum + 
        1 + // match itself
        match.events.length +
        (Object.keys(match.statistics?.home || {}).length + Object.keys(match.statistics?.away || {}).length) +
        (match.lineups?.home?.starting_eleven?.length || 0) +
        (match.lineups?.away?.starting_eleven?.length || 0) +
        match.commentary.length;
    }, 0);

    const standingsDataPoints = Object.values(standings).reduce((sum, league) => sum + league.length, 0);

    return matchDataPoints + competitions.length + teams.length + countries.length + topScorers.length + standingsDataPoints;
  }

  // Helper methods for team analytics
  private calculateTeamSeasonStats(matches: Match[], teamId: string) {
    const teamMatches = matches.filter(m => m.home.id === teamId || m.away.id === teamId);
    let wins = 0, draws = 0, losses = 0, goalsFor = 0, goalsAgainst = 0;

    teamMatches.forEach(match => {
      const score = match.scores?.score || '0 - 0';
      const [homeScore, awayScore] = score.split(' - ').map(s => parseInt(s) || 0);
      
      const isHome = match.home.id === teamId;
      const teamScore = isHome ? homeScore : awayScore;
      const opponentScore = isHome ? awayScore : homeScore;

      goalsFor += teamScore;
      goalsAgainst += opponentScore;

      if (teamScore > opponentScore) wins++;
      else if (teamScore === opponentScore) draws++;
      else losses++;
    });

    return {
      played: teamMatches.length,
      wins, draws, losses,
      goalsFor, goalsAgainst,
      goalDifference: goalsFor - goalsAgainst,
      points: wins * 3 + draws
    };
  }

  private calculateRecentForm(matches: Match[], teamId: string) {
    return matches
      .filter(m => m.home.id === teamId || m.away.id === teamId)
      .slice(-5)
      .map(match => {
        const score = match.scores?.score || '0 - 0';
        const [homeScore, awayScore] = score.split(' - ').map(s => parseInt(s) || 0);
        const isHome = match.home.id === teamId;
        const teamScore = isHome ? homeScore : awayScore;
        const opponentScore = isHome ? awayScore : homeScore;

        if (teamScore > opponentScore) return 'W';
        if (teamScore === opponentScore) return 'D';
        return 'L';
      });
  }

  private calculateHomeAwayStats(matches: Match[], teamId: string) {
    const homeMatches = matches.filter(m => m.home.id === teamId);
    const awayMatches = matches.filter(m => m.away.id === teamId);

    return {
      home: this.calculateTeamSeasonStats(homeMatches, teamId),
      away: this.calculateTeamSeasonStats(awayMatches, teamId)
    };
  }

  private calculateGoalStats(matches: Match[], teamId: string) {
    const teamMatches = matches.filter(m => m.home.id === teamId || m.away.id === teamId);
    const goals = teamMatches.map(match => {
      const score = match.scores?.score || '0 - 0';
      const [homeScore, awayScore] = score.split(' - ').map(s => parseInt(s) || 0);
      return match.home.id === teamId ? homeScore : awayScore;
    });

    return {
      totalGoals: goals.reduce((sum, g) => sum + g, 0),
      avgGoalsPerMatch: goals.length > 0 ? goals.reduce((sum, g) => sum + g, 0) / goals.length : 0,
      highestScoringMatch: Math.max(...goals),
      cleanSheets: goals.filter(g => g === 0).length
    };
  }
}