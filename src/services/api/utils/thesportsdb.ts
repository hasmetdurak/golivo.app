import { cacheManager, CacheStrategies } from '../cache/manager';
import { Team } from '../types';

/**
 * TheSportsDB Integration Service
 * Provides high-quality team and league logos
 */
export class TheSportsDBService {
  private static readonly BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';
  private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  /**
   * Get team logo from TheSportsDB
   */
  static async getTeamLogo(teamName: string): Promise<string> {
    const cacheKey = `thesportsdb_team_logo_${teamName.toLowerCase()}`;
    
    // Check cache first
    const cached = cacheManager.get<string>(cacheKey, CacheStrategies.TEAMS);
    if (cached) {
      return cached;
    }

    try {
      const searchUrl = `${this.BASE_URL}/searchteams.php?t=${encodeURIComponent(teamName)}`;
      const response = await fetch(searchUrl);
      
      if (!response.ok) {
        throw new Error(`TheSportsDB request failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.teams && data.teams.length > 0) {
        const team = data.teams[0];
        const logoUrl = team.strTeamBadge || team.strTeamLogo || '/placeholder-logo.svg';
        
        // Cache the result
        cacheManager.set(cacheKey, logoUrl, CacheStrategies.TEAMS);
        
        console.log(`🎯 Found logo for ${teamName}: ${logoUrl}`);
        return logoUrl;
      }
      
      return '/placeholder-logo.svg';
    } catch (error) {
      console.warn(`Failed to fetch logo for ${teamName}:`, error);
      return '/placeholder-logo.svg';
    }
  }

  /**
   * Get league logo from TheSportsDB
   */
  static async getLeagueLogo(leagueName: string): Promise<string> {
    const cacheKey = `thesportsdb_league_logo_${leagueName.toLowerCase()}`;
    
    // Check cache first
    const cached = cacheManager.get<string>(cacheKey, CacheStrategies.TEAMS);
    if (cached) {
      return cached;
    }

    try {
      // Map league names to TheSportsDB search terms
      const leagueMapping: { [key: string]: string } = {
        'Premier League': 'English Premier League',
        'England Premier League': 'English Premier League',
        'La Liga': 'Spanish La Liga',
        'Spain La Liga': 'Spanish La Liga',
        'Serie A': 'Italian Serie A',
        'Italy Serie A': 'Italian Serie A',
        'Bundesliga': 'German Bundesliga',
        'Germany Bundesliga': 'German Bundesliga',
        'Ligue 1': 'French Ligue 1',
        'France Ligue 1': 'French Ligue 1',
        'Süper Lig': 'Turkish Super League',
        'Turkey Süper Lig': 'Turkish Super League',
        'Super Lig': 'Turkish Super League',
        'Champions League': 'UEFA Champions League',
        'Europa League': 'UEFA Europa League'
      };
      
      const searchTerm = leagueMapping[leagueName] || leagueName;
      const searchUrl = `${this.BASE_URL}/search_all_leagues.php?l=${encodeURIComponent(searchTerm)}`;
      const response = await fetch(searchUrl);
      
      if (!response.ok) {
        throw new Error(`TheSportsDB league search failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.leagues && data.leagues.length > 0) {
        const league = data.leagues[0];
        const logoUrl = league.strBadge || league.strLogo || '/placeholder-logo.svg';
        
        // Cache the result
        cacheManager.set(cacheKey, logoUrl, CacheStrategies.TEAMS);
        
        console.log(`🏆 Found logo for ${leagueName}: ${logoUrl}`);
        return logoUrl;
      }
      
      return '/placeholder-logo.svg';
    } catch (error) {
      console.warn(`Failed to fetch league logo for ${leagueName}:`, error);
      return '/placeholder-logo.svg';
    }
  }

  /**
   * Get detailed team information by ID
   */
  static async getTeamById(teamId: string): Promise<any> {
    const cacheKey = `thesportsdb_team_${teamId}`;
    
    // Check cache first
    const cached = cacheManager.get(cacheKey, CacheStrategies.TEAMS);
    if (cached) {
      return cached;
    }

    try {
      const url = `${this.BASE_URL}/lookupteam.php?id=${teamId}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`TheSportsDB lookup failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.teams && data.teams.length > 0) {
        const team = data.teams[0];
        const result = {
          id: team.idTeam,
          name: team.strTeam,
          logo: team.strTeamBadge || team.strTeamLogo,
          stadium: team.strStadium,
          country: team.strCountry,
          league: team.strLeague,
          website: team.strWebsite,
          description: team.strDescriptionEN,
          founded: team.intFormedYear,
          stadiumCapacity: team.intStadiumCapacity
        };
        
        // Cache the result
        cacheManager.set(cacheKey, result, CacheStrategies.TEAMS);
        
        return result;
      }
      
      return null;
    } catch (error) {
      console.error(`Error fetching team by ID ${teamId}:`, error);
      return null;
    }
  }

  /**
   * Enrich team data with TheSportsDB information
   */
  static async enrichTeamData(team: Team): Promise<Team> {
    try {
      const logo = await this.getTeamLogo(team.name);
      return {
        ...team,
        logo: logo !== '/placeholder-logo.svg' ? logo : team.logo
      };
    } catch (error) {
      console.warn(`Failed to enrich team data for ${team.name}:`, error);
      return team;
    }
  }

  /**
   * Batch enrich multiple teams
   */
  static async enrichTeams(teams: Team[]): Promise<Team[]> {
    console.log(`🚀 Enriching ${teams.length} teams with TheSportsDB logos...`);
    
    const enrichedTeams = await Promise.all(
      teams.map(team => this.enrichTeamData(team))
    );
    
    console.log(`✨ Successfully enriched ${enrichedTeams.length} teams`);
    return enrichedTeams;
  }

  /**
   * Search for teams by name
   */
  static async searchTeams(teamName: string): Promise<any[]> {
    try {
      const searchUrl = `${this.BASE_URL}/searchteams.php?t=${encodeURIComponent(teamName)}`;
      const response = await fetch(searchUrl);
      
      if (!response.ok) {
        throw new Error(`TheSportsDB search failed: ${response.status}`);
      }
      
      const data = await response.json();
      return data.teams || [];
    } catch (error) {
      console.error(`Error searching teams for ${teamName}:`, error);
      return [];
    }
  }

  /**
   * Get player information
   */
  static async getPlayer(playerId: string): Promise<any> {
    const cacheKey = `thesportsdb_player_${playerId}`;
    
    // Check cache first
    const cached = cacheManager.get(cacheKey, CacheStrategies.TEAMS);
    if (cached) {
      return cached;
    }

    try {
      const url = `${this.BASE_URL}/lookupplayer.php?id=${playerId}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`TheSportsDB player lookup failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.players && data.players.length > 0) {
        const player = data.players[0];
        const result = {
          id: player.idPlayer,
          name: player.strPlayer,
          position: player.strPosition,
          nationality: player.strNationality,
          team: player.strTeam,
          height: player.strHeight,
          weight: player.strWeight,
          birthDate: player.dateBorn,
          description: player.strDescriptionEN,
          photo: player.strThumb
        };
        
        // Cache the result
        cacheManager.set(cacheKey, result, CacheStrategies.TEAMS);
        
        return result;
      }
      
      return null;
    } catch (error) {
      console.error(`Error fetching player by ID ${playerId}:`, error);
      return null;
    }
  }

  /**
   * Get team's next 5 events
   */
  static async getTeamNextEvents(teamId: string): Promise<any[]> {
    try {
      const url = `${this.BASE_URL}/eventsnext.php?id=${teamId}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`TheSportsDB events failed: ${response.status}`);
      }
      
      const data = await response.json();
      return data.events || [];
    } catch (error) {
      console.error(`Error fetching next events for team ${teamId}:`, error);
      return [];
    }
  }

  /**
   * Get team's last 5 events
   */
  static async getTeamLastEvents(teamId: string): Promise<any[]> {
    try {
      const url = `${this.BASE_URL}/eventslast.php?id=${teamId}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`TheSportsDB events failed: ${response.status}`);
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error(`Error fetching last events for team ${teamId}:`, error);
      return [];
    }
  }
}