import { LiveScoreApi } from '../core';
import { Match, MatchEvent, MatchStatistics, MatchLineups, MatchCommentary, ComprehensiveMatchData, LiveScoreConfig } from '../types/index';
import { cacheManager, CacheStrategies } from '../cache/manager';

/**
 * Specialized Matches API Service
 * Handles all match-related endpoints with advanced data enrichment
 */
export class MatchesApi extends LiveScoreApi {
  
  constructor(config: LiveScoreConfig) {
    super(config);
  }
  
  /**
   * Get enhanced live matches with comprehensive data
   */
  async getEnhancedLiveMatches(params: {
    country?: string;
    competition?: string;
    team?: string;
    includeEvents?: boolean;
    includeStatistics?: boolean;
    includeLineups?: boolean;
    includeCommentary?: boolean;
  } = {}): Promise<ComprehensiveMatchData[]> {
    const {
      includeEvents = true,
      includeStatistics = true,
      includeLineups = false, // Expensive, opt-in
      includeCommentary = false, // Expensive, opt-in
      ...matchParams
    } = params;

    // Get basic live matches
    const matches = await this.getLiveScores(matchParams);
    
    if (matches.length === 0) {
      return [];
    }

    console.log(`🔥 Enriching ${matches.length} live matches...`);

    // Enrich matches with additional data in parallel
    const enrichedMatches = await Promise.all(
      matches.map(async (match) => {
        const [events, statistics, lineups, commentary] = await Promise.all([
          includeEvents ? this.getMatchEvents(match.id).catch(() => []) : Promise.resolve([]),
          includeStatistics ? this.getMatchStatistics(match.id).catch(() => ({ home: {}, away: {} } as MatchStatistics)) : Promise.resolve({ home: {}, away: {} } as MatchStatistics),
          includeLineups ? this.getMatchLineups(match.id).catch(() => ({ home: { team: match.home, starting_eleven: [], substitutes: [] }, away: { team: match.away, starting_eleven: [], substitutes: [] } } as MatchLineups)) : Promise.resolve({ home: { team: match.home, starting_eleven: [], substitutes: [] }, away: { team: match.away, starting_eleven: [], substitutes: [] } } as MatchLineups),
          includeCommentary ? this.getMatchCommentary(match.id).catch(() => []) : Promise.resolve([])
        ]);

        return {
          match,
          events,
          statistics,
          lineups,
          commentary
        } as ComprehensiveMatchData;
      })
    );

    console.log(`✨ Successfully enriched ${enrichedMatches.length} matches`);
    return enrichedMatches;
  }

  /**
   * Get matches by status with smart caching
   */
  async getMatchesByStatus(status: 'live' | 'finished' | 'scheduled', params: {
    country?: string;
    competition?: string;
    team?: string;
    date?: string;
    from?: string;
    to?: string;
    limit?: number;
  } = {}): Promise<Match[]> {
    const { limit = 50, ...apiParams } = params;

    let matches: Match[] = [];

    switch (status) {
      case 'live':
        matches = await this.getLiveScores(apiParams);
        break;
      case 'scheduled':
        matches = await this.getFixtures(apiParams);
        break;
      case 'finished':
        matches = await this.getHistoryMatches(apiParams);
        break;
    }

    // Apply limit and sorting
    return matches
      .sort((a, b) => {
        // Sort by scheduled time for upcoming, by start time for others
        const timeA = new Date(a.scheduled || a.time || '').getTime();
        const timeB = new Date(b.scheduled || b.time || '').getTime();
        return status === 'scheduled' ? timeA - timeB : timeB - timeA;
      })
      .slice(0, limit);
  }

  /**
   * Get today's complete match schedule
   */
  async getTodaysSchedule(): Promise<{
    live: Match[];
    finished: Match[];
    upcoming: Match[];
    totalMatches: number;
  }> {
    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `todays_schedule_${today}`;
    
    const cached = cacheManager.get<{live: Match[]; finished: Match[]; upcoming: Match[]; totalMatches: number;}>(cacheKey, CacheStrategies.LIVE_DATA);
    if (cached) {
      return cached;
    }

    try {
      const [liveMatches, finishedMatches, upcomingMatches] = await Promise.all([
        this.getLiveScores({ date: today }),
        this.getHistoryMatches({ date: today }),
        this.getFixtures({ date: today })
      ]);

      const result = {
        live: liveMatches,
        finished: finishedMatches,
        upcoming: upcomingMatches,
        totalMatches: liveMatches.length + finishedMatches.length + upcomingMatches.length
      };

      cacheManager.set(cacheKey, result, CacheStrategies.LIVE_DATA);
      return result;

    } catch (error) {
      console.error('Error fetching today\'s schedule:', error);
      throw error;
    }
  }

  /**
   * Get match timeline (events + commentary combined)
   */
  async getMatchTimeline(matchId: string): Promise<{
    events: MatchEvent[];
    commentary: MatchCommentary[];
    timeline: Array<MatchEvent | MatchCommentary>;
  }> {
    const cacheKey = `match_timeline_${matchId}`;
    const cached = cacheManager.get<{events: MatchEvent[]; commentary: MatchCommentary[]; timeline: Array<MatchEvent | MatchCommentary>;}>(cacheKey, CacheStrategies.EVENTS);
    
    if (cached) {
      return cached;
    }

    try {
      const [events, commentary] = await Promise.all([
        this.getMatchEvents(matchId),
        this.getMatchCommentary(matchId)
      ]);

      // Combine and sort by time
      const timeline = [...events, ...commentary].sort((a, b) => {
        const timeA = parseInt(a.time) || 0;
        const timeB = parseInt(b.time) || 0;
        return timeA - timeB;
      });

      const result = { events, commentary, timeline };
      cacheManager.set(cacheKey, result, CacheStrategies.EVENTS);
      
      return result;

    } catch (error) {
      console.error(`Error fetching match timeline for ${matchId}:`, error);
      throw error;
    }
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
    hasEvents?: boolean;
    hasStatistics?: boolean;
    minGoals?: number;
    maxGoals?: number;
  }): Promise<Match[]> {
    const {
      team,
      competition,
      country,
      dateFrom,
      dateTo,
      status,
      hasEvents,
      hasStatistics,
      minGoals,
      maxGoals
    } = query;

    // Get matches based on status
    let matches: Match[] = [];
    
    if (status) {
      matches = await this.getMatchesByStatus(status, {
        team,
        competition,
        country,
        from: dateFrom,
        to: dateTo
      });
    } else {
      // Get all types
      const [live, finished, scheduled] = await Promise.all([
        this.getMatchesByStatus('live', { team, competition, country }),
        this.getMatchesByStatus('finished', { team, competition, country, from: dateFrom, to: dateTo }),
        this.getMatchesByStatus('scheduled', { team, competition, country, from: dateFrom, to: dateTo })
      ]);
      matches = [...live, ...finished, ...scheduled];
    }

    // Apply additional filters
    return matches.filter(match => {
      // Goals filter
      if (minGoals !== undefined || maxGoals !== undefined) {
        const totalGoals = (match.scores?.score || '0 - 0')
          .split(' - ')
          .reduce((sum, score) => sum + parseInt(score) || 0, 0);
        
        if (minGoals !== undefined && totalGoals < minGoals) return false;
        if (maxGoals !== undefined && totalGoals > maxGoals) return false;
      }

      // Data availability filters (would need enrichment)
      if (hasEvents !== undefined || hasStatistics !== undefined) {
        // These would require additional API calls to check
        // For now, return true (could be enhanced with parallel enrichment)
      }

      return true;
    });
  }

  /**
   * Get match predictions data
   */
  async getMatchPredictions(matchId: string): Promise<{
    headToHead?: any;
    recentForm: {
      home: Match[];
      away: Match[];
    };
    statistics?: MatchStatistics;
    analysis: {
      favoriteTeam: 'home' | 'away' | 'draw';
      confidence: number;
      factors: string[];
    };
  }> {
    const cacheKey = `match_predictions_${matchId}`;
    const cached = cacheManager.get<{headToHead?: any; recentForm: {home: Match[]; away: Match[];}; statistics?: MatchStatistics; analysis: {favoriteTeam: 'home' | 'away' | 'draw'; confidence: number; factors: string[];};}>(cacheKey, CacheStrategies.COMPREHENSIVE);
    
    if (cached) {
      return cached;
    }

    try {
      // Get the match details first
      const liveMatches = await this.getLiveScores();
      const match = liveMatches.find(m => m.id === matchId);
      
      if (!match) {
        throw new Error(`Match ${matchId} not found`);
      }

      // Get prediction data in parallel
      const [headToHead, homeForm, awayForm, statistics] = await Promise.all([
        this.getHeadToHead(match.home.id, match.away.id).catch(() => null),
        this.getLastMatches({ team: match.home.id, count: 5 }).catch(() => []),
        this.getLastMatches({ team: match.away.id, count: 5 }).catch(() => []),
        this.getMatchStatistics(matchId).catch(() => null)
      ]);

      // Simple prediction analysis
      const homeWins = homeForm.filter(m => 
        (m.home.id === match.home.id && m.scores.score && m.scores.score.split(' - ')[0] > m.scores.score.split(' - ')[1]) ||
        (m.away.id === match.home.id && m.scores.score && m.scores.score.split(' - ')[1] > m.scores.score.split(' - ')[0])
      ).length;

      const awayWins = awayForm.filter(m => 
        (m.home.id === match.away.id && m.scores.score && m.scores.score.split(' - ')[0] > m.scores.score.split(' - ')[1]) ||
        (m.away.id === match.away.id && m.scores.score && m.scores.score.split(' - ')[1] > m.scores.score.split(' - ')[0])
      ).length;

      const favoriteTeam = homeWins > awayWins ? 'home' : awayWins > homeWins ? 'away' : 'draw';
      const confidence = Math.abs(homeWins - awayWins) / 5; // Simple confidence calculation

      const result = {
        headToHead,
        recentForm: {
          home: homeForm,
          away: awayForm
        },
        statistics,
        analysis: {
          favoriteTeam,
          confidence,
          factors: [
            `Home recent form: ${homeWins}/5 wins`,
            `Away recent form: ${awayWins}/5 wins`,
            headToHead ? `H2H: ${headToHead.summary.team1_wins}-${headToHead.summary.team2_wins}-${headToHead.summary.draws}` : 'No H2H data'
          ]
        }
      };

      cacheManager.set(cacheKey, result, CacheStrategies.COMPREHENSIVE);
      return result;

    } catch (error) {
      console.error(`Error fetching match predictions for ${matchId}:`, error);
      throw error;
    }
  }

  /**
   * Get matches with maximum data extraction
   */
  async getMatchesWithFullData(limit: number = 20): Promise<ComprehensiveMatchData[]> {
    console.log(`🚀 Extracting maximum data for ${limit} matches...`);

    // Get live matches first (highest priority)
    const liveMatches = await this.getLiveScores();
    
    // If not enough live matches, get recent finished matches
    let allMatches = liveMatches;
    if (allMatches.length < limit) {
      const finishedMatches = await this.getHistoryMatches({
        date: new Date().toISOString().split('T')[0]
      });
      allMatches = [...liveMatches, ...finishedMatches];
    }

    // Take the specified limit
    const selectedMatches = allMatches.slice(0, limit);

    // Enrich all matches with full data
    return this.getEnhancedLiveMatches({
      includeEvents: true,
      includeStatistics: true,
      includeLineups: true,
      includeCommentary: true
    });
  }
}