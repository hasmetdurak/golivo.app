// Core data models for Live Football Score Website
// Based on design requirements for purple-themed football platform

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: 'scheduled' | 'live' | 'halftime' | 'finished';
  minute?: number;
  league: League;
  date: Date;
  events: MatchEvent[];
  statistics: MatchStatistics;
  venue?: string;
  referee?: string;
  time?: string;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  country: string;
}

export interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
  priority: number; // For popular leagues ordering
}

export interface MatchEvent {
  id: string;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution';
  minute: number;
  player: string;
  team: 'home' | 'away';
  description: string;
}

export interface MatchStatistics {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  yellowCards: { home: number; away: number };
  redCards: { home: number; away: number };
}

// Business Logic Types
export interface MatchService {
  getLiveMatches(): Promise<Match[]>;
  getMatchesByDate(date: Date): Promise<Match[]>;
  getMatchDetails(matchId: string): Promise<Match>;
}

// UI Component Props
export interface MatchCardProps {
  match: Match;
  isLive: boolean;
  onClick: () => void;
}

export interface LeagueFrameProps {
  league: League;
  matches: Match[];
  expanded: boolean;
  onToggle: () => void;
}

export interface HeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  activeSection: 'scores' | 'news' | 'analyses' | 'contact';
}

// Affiliate Integration Types
export interface AffiliateLink {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  description: string;
  priority: number;
}

export interface AffiliateBanner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  backgroundColor: string;
  textColor: string;
  affiliateLinks: AffiliateLink[];
}

// Legacy types for backward compatibility

export interface TeamStanding {
  team_id: string;
  team_name: string;
  team_badge: string;
  team_key: string;
  overall_league_position: string;
  overall_league_payed: string;
  overall_league_W: string;
  overall_league_D: string;
  overall_league_L: string;
  overall_league_GF: string;
  overall_league_GA: string;
  overall_league_PTS: string;
}

export interface StandingsTeam {
  team_id: string;
  team_name: string;
  team_badge: string;
  team_key: string;
  overall_league_position: string;
  overall_league_payed: string;
  overall_league_W: string;
  overall_league_D: string;
  overall_league_L: string;
  overall_league_GF: string;
  overall_league_GA: string;
  overall_league_PTS: string;
}

export interface TeamDetails {
  team_key: string;
  team_name: string;
  team_country: string;
  team_founded: string;
  team_badge: string;
  venue_name?: string;
  players?: Player[];
  coaches?: Coach[];
}

export interface Player {
  player_key: number;
  player_name: string;
  player_number: string;
  player_country: string;
  player_type: 'Goalkeepers' | 'Defenders' | 'Midfielders' | 'Forwards';
  player_age: string;
  player_goals: string;
  player_assists: string;
  player_yellow_cards: string;
  player_red_cards: string;
  player_rating: string;
  player_image: string;
  player_injured: 'Yes' | 'No';
  player_is_captain: string;
}

export interface Coach {
  coach_name: string;
  coach_country: string;
  coach_age: string;
}

export interface LeagueInfo {
  league_id: string;
  league_name: string;
  country_id: string;
  country_name: string;
}

export interface Country {
  country_id: string;
  country_name: string;
  country_logo: string;
}

export interface TopScorer {
  player_key: string;
  player_name: string;
  team_name: string;
  goals: string;
  assists: string;
}

export interface MatchPrediction {
  match_id: string;
  prediction: string;
  confidence: string;
}

export interface Injury {
  player_key: string;
  player_name: string;
  team_name: string;
  injury_type: string;
  injury_date: string;
}

export interface Transfer {
  player_key: string;
  player_name: string;
  from_team: string;
  to_team: string;
  transfer_date: string;
  transfer_type: string;
}
