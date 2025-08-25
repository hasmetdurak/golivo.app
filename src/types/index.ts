export interface Match {
  id: string;
  league: string;
  country: string;
  status: 'live' | 'finished' | 'scheduled';
  time: string;
  venue: string;
  homeTeam: {
    name: string;
    logo: string;
    formation?: string;
    country?: string;
  };
  awayTeam: {
    name: string;
    logo: string;
    formation?: string;
    country?: string;
  };
  homeScore: number;
  awayScore: number;
  halftimeScore: {
    home: number;
    away: number;
  };
  events: MatchEvent[];
  statistics: MatchStatistic[];
  minute?: string;
  referee?: string;
}

export interface MatchEvent {
  type: string;
  minute: string;
  player: string;
  team: 'home' | 'away';
  icon: string;
}

export interface MatchStatistic {
  type: string;
  home: string;
  away: string;
  homePercent: number;
  awayPercent: number;
}

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
