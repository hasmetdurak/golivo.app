// Comprehensive TypeScript interfaces for LiveScore API
// Based on complete API documentation research

export interface LiveScoreConfig {
  baseUrl: string;
  apiKey: string;
  apiSecret: string;
  timeout: number;
  retryAttempts: number;
}

// Base API Response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp?: string;
}

// Core Match Types
export interface Match {
  id: string;
  fixture_id?: string;
  competition: Competition;
  country: Country;
  home: Team;
  away: Team;
  scores: MatchScores;
  status: MatchStatus;
  time?: string;
  minute?: string;
  scheduled?: string;
  last_changed?: string;
  added?: string;
  location?: string;
  referee?: string;
  attendance?: number;
  odds?: MatchOdds;
  outcomes?: MatchOutcomes;
  urls?: MatchUrls;
  // Enriched data
  events?: MatchEvent[];
  statistics?: MatchStatistics;
  lineups?: MatchLineups;
  commentary?: MatchCommentary[];
}

export interface MatchScores {
  score?: string;
  ht_score?: string;
  ft_score?: string;
  et_score?: string;
  ps_score?: string;
}

export type MatchStatus = 'NOT STARTED' | 'IN PLAY' | 'HALF TIME BREAK' | 'FINISHED' | 'ADDED TIME' | 'POSTPONED' | 'CANCELLED' | 'ABANDONED';

export interface MatchOdds {
  pre?: {
    '1'?: number;
    'X'?: number;
    '2'?: number;
  };
  live?: {
    '1'?: number;
    'X'?: number;
    '2'?: number;
  };
}

export interface MatchOutcomes {
  half_time?: string;
  full_time?: string;
  extra_time?: string;
  penalty_shootout?: string;
}

export interface MatchUrls {
  events?: string;
  lineup?: string;
  statistics?: string;
  commentary?: string;
}

// Team Types
export interface Team {
  id: string;
  name: string;
  logo?: string;
  stadium?: string;
  country_id?: string;
  country?: string;
  short_name?: string;
  national?: boolean;
  founded?: number;
  venue_capacity?: number;
}

export interface TeamSquad {
  team: Team;
  players: Player[];
  formation?: string;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  shirt_number?: number;
  age?: number;
  nationality?: string;
  height?: string;
  weight?: string;
  foot?: 'left' | 'right' | 'both';
}

// Competition Types
export interface Competition {
  id: string;
  name: string;
  tier?: number;
  is_cup?: boolean;
  is_league?: boolean;
  has_groups?: boolean;
  national_teams_only?: boolean;
  country?: Country;
  federation?: Federation;
  logo?: string;
  season?: string;
}

export interface CompetitionGroup {
  id: string;
  name: string;
  competition_id: string;
  teams: Team[];
  standings?: StandingEntry[];
}

export interface StandingEntry {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
  form?: string;
  recent_results?: RecentResult[];
}

export interface RecentResult {
  match_id: string;
  opponent: Team;
  result: 'W' | 'D' | 'L';
  score: string;
  date: string;
  home: boolean;
}

// Geography Types
export interface Country {
  id: string;
  name: string;
  code?: string;
  flag?: string;
  is_real?: boolean;
  continent?: string;
}

export interface Federation {
  id: string;
  name: string;
  code?: string;
  logo?: string;
  countries?: Country[];
}

// Match Events Types
export interface MatchEvent {
  id: string;
  type: EventType;
  time: string;
  extra_time?: string;
  team: Team;
  player?: Player;
  assistant?: Player;
  related_player?: Player;
  coordinates?: EventCoordinates;
  description?: string;
}

export type EventType = 
  | 'goal' | 'own_goal' | 'penalty_goal' | 'missed_penalty'
  | 'yellow_card' | 'red_card' | 'second_yellow'
  | 'substitution' | 'substitution_in' | 'substitution_out'
  | 'corner' | 'offside' | 'free_kick' | 'throw_in'
  | 'kickoff' | 'half_time' | 'full_time'
  | 'injury_time' | 'extra_time' | 'penalty_shootout';

export interface EventCoordinates {
  x: number;
  y: number;
}

// Match Statistics Types
export interface MatchStatistics {
  home: TeamStatistics;
  away: TeamStatistics;
}

export interface TeamStatistics {
  possession?: number;
  shots_total?: number;
  shots_on_target?: number;
  shots_off_target?: number;
  shots_blocked?: number;
  corners?: number;
  offsides?: number;
  fouls?: number;
  yellow_cards?: number;
  red_cards?: number;
  passes_total?: number;
  passes_completed?: number;
  pass_accuracy?: number;
  attacks?: number;
  dangerous_attacks?: number;
  throw_ins?: number;
  goalkeeper_saves?: number;
  substitutions?: number;
  free_kicks?: number;
  goal_kicks?: number;
  penalties?: number;
}

// Match Lineups Types
export interface MatchLineups {
  home: TeamLineup;
  away: TeamLineup;
}

export interface TeamLineup {
  team: Team;
  formation?: string;
  starting_eleven: LineupPlayer[];
  substitutes: LineupPlayer[];
  coach?: Coach;
}

export interface LineupPlayer {
  player: Player;
  position: string;
  shirt_number: number;
  is_captain?: boolean;
}

export interface Coach {
  id: string;
  name: string;
  nationality?: string;
  age?: number;
}

// Commentary Types
export interface MatchCommentary {
  time: string;
  extra_time?: string;
  type: CommentaryType;
  text: string;
  team?: Team;
  player?: Player;
  coordinates?: EventCoordinates;
}

export type CommentaryType = 
  | 'text' | 'goal' | 'card' | 'substitution' 
  | 'half_time' | 'full_time' | 'kickoff'
  | 'corner' | 'free_kick' | 'penalty' | 'offside';

// Top Scorers Types
export interface TopScorer {
  player: Player;
  team: Team;
  competition: Competition;
  goals: number;
  assists?: number;
  played: number;
  minutes?: number;
  penalties?: number;
  yellow_cards?: number;
  red_cards?: number;
}

// Head to Head Types
export interface HeadToHeadData {
  team1: Team;
  team2: Team;
  matches: Match[];
  summary: H2HSummary;
}

export interface H2HSummary {
  total_matches: number;
  team1_wins: number;
  team2_wins: number;
  draws: number;
  team1_goals: number;
  team2_goals: number;
  last_matches: RecentH2HMatch[];
}

export interface RecentH2HMatch {
  match: Match;
  result: 'W' | 'D' | 'L'; // From team1 perspective
  team1_goals: number;
  team2_goals: number;
}

// Cache Types
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  key: string;
}

export interface CacheStrategy {
  duration: number; // in milliseconds
  maxSize?: number;
  persistToDisk?: boolean;
}

// Aggregated Data Types
export interface ComprehensiveMatchData {
  match: Match;
  events: MatchEvent[];
  statistics: MatchStatistics;
  lineups: MatchLineups;
  commentary: MatchCommentary[];
  headToHead?: HeadToHeadData;
  recentForm?: {
    home: RecentResult[];
    away: RecentResult[];
  };
}

export interface DataQuality {
  hasEvents: boolean;
  hasStatistics: boolean;
  hasLineups: boolean;
  hasCommentary: boolean;
  completeness: number; // 0-1 scale
}

// Analytics Types
export interface MatchAnalytics {
  overview: AnalyticsOverview;
  leagues: LeagueAnalytics;
  geography: GeographyAnalytics;
  timing: TimingAnalytics;
  quality: QualityAnalytics;
}

export interface AnalyticsOverview {
  totalMatches: number;
  liveMatches: number;
  finishedMatches: number;
  upcomingMatches: number;
  totalGoals: number;
  avgGoalsPerMatch: number;
  dataCompleteness: number;
}

export interface LeagueAnalytics {
  totalLeagues: number;
  distribution: Record<string, LeagueStats>;
  topLeaguesByMatches: [string, LeagueStats][];
}

export interface LeagueStats {
  total: number;
  live: number;
  finished: number;
  upcoming: number;
  goals: number;
  avgGoalsPerMatch: number;
}

export interface GeographyAnalytics {
  totalCountries: number;
  distribution: Record<string, number>;
  topCountriesByMatches: [string, number][];
}

export interface TimingAnalytics {
  timeSlots: Record<string, number>;
  peakTime: string;
  currentActivity: number;
}

export interface QualityAnalytics {
  matchesWithEvents: number;
  matchesWithStatistics: number;
  matchesWithLineups: number;
  matchesWithCommentary: number;
  dataRichness: {
    events: string;
    statistics: string;
    lineups: string;
    commentary: string;
  };
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  endpoint?: string;
  timestamp: string;
}

// Performance Monitoring Types
export interface PerformanceMetrics {
  endpoint: string;
  responseTime: number;
  success: boolean;
  cacheHit: boolean;
  dataSize: number;
  timestamp: number;
}

// Bulk Operations Types
export interface BulkRequest {
  id: string;
  endpoint: string;
  params: Record<string, any>;
  priority: number;
}

export interface BulkResponse<T> {
  requests: BulkRequest[];
  responses: (T | ApiError)[];
  summary: {
    total: number;
    successful: number;
    failed: number;
    totalTime: number;
  };
}