import React, { useState, useEffect } from 'react';
import { Globe, Flag, Trophy, Users, BarChart3, MapPin, Star } from 'lucide-react';
import { FootballApi as footballApi } from '../services/api';

interface Country {
  country_id: string;
  country_name: string;
  country_logo: string;
}

interface CountryStats {
  country: Country;
  leagues: any[];
  teams: any[];
  totalMatches: number;
  topPlayers: any[];
}

export const CountryDashboard: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countryStats, setCountryStats] = useState<CountryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);

  // Featured countries with flags and colors
  const featuredCountries = [
    { id: '44', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: 'bg-blue-500' },
    { id: '6', name: 'Spain', flag: '🇪🇸', color: 'bg-red-500' },
    { id: '4', name: 'Germany', flag: '🇩🇪', color: 'bg-yellow-500' },
    { id: '5', name: 'Italy', flag: '🇮🇹', color: 'bg-green-500' },
    { id: '3', name: 'France', flag: '🇫🇷', color: 'bg-indigo-500' },
    { id: '2', name: 'Turkey', flag: '🇹🇷', color: 'bg-red-600' },
    { id: '12', name: 'Netherlands', flag: '🇳🇱', color: 'bg-orange-500' },
    { id: '15', name: 'Portugal', flag: '🇵🇹', color: 'bg-green-600' },
    { id: '21', name: 'Brazil', flag: '🇧🇷', color: 'bg-yellow-400' },
    { id: '22', name: 'Argentina', flag: '🇦🇷', color: 'bg-blue-400' },
    { id: '18', name: 'Russia', flag: '🇷🇺', color: 'bg-red-400' },
    { id: '19', name: 'Belgium', flag: '🇧🇪', color: 'bg-black' }
  ];

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const data = await footballApi.getCountries();
      setCountries(data);
      
      // Auto-select England as default
      const england = data.find(c => c.country_name === 'England') || data[0];
      if (england) {
        setSelectedCountry(england);
        fetchCountryStats(england);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
      // Use featured countries as fallback
      const mockCountries = featuredCountries.map(fc => ({
        country_id: fc.id,
        country_name: fc.name,
        country_logo: `https://via.placeholder.com/40x40/${fc.color.split('-')[1].toUpperCase()}/FFFFFF?text=${fc.flag}`
      }));
      setCountries(mockCountries);
      setSelectedCountry(mockCountries[0]);
      fetchCountryStats(mockCountries[0]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountryStats = async (country: Country) => {
    setStatsLoading(true);
    try {
      const [leagues, teams] = await Promise.all([
        footballApi.getLeaguesByCountry(country.country_id),
        country.country_id === '44' ? footballApi.getTeamsByLeague('152') : [] // Premier League for England
      ]);

      // Generate mock stats
      const stats: CountryStats = {
        country,
        leagues: leagues.slice(0, 10),
        teams: teams.slice(0, 8),
        totalMatches: Math.floor(Math.random() * 500) + 200,
        topPlayers: generateMockTopPlayers(country.country_name)
      };

      setCountryStats(stats);
    } catch (error) {
      console.error('Error fetching country stats:', error);
      // Generate complete mock data
      setCountryStats({
        country,
        leagues: generateMockLeagues(country.country_name),
        teams: generateMockTeams(country.country_name),
        totalMatches: Math.floor(Math.random() * 500) + 200,
        topPlayers: generateMockTopPlayers(country.country_name)
      });
    } finally {
      setStatsLoading(false);
    }
  };

  const generateMockLeagues = (countryName: string) => {
    const leagues = {
      'England': [
        { league_name: 'Premier League', league_logo: '', teams: 20 },
        { league_name: 'Championship', league_logo: '', teams: 24 },
        { league_name: 'League One', league_logo: '', teams: 24 },
        { league_name: 'FA Cup', league_logo: '', teams: 128 }
      ],
      'Spain': [
        { league_name: 'La Liga', league_logo: '', teams: 20 },
        { league_name: 'Segunda División', league_logo: '', teams: 22 },
        { league_name: 'Copa del Rey', league_logo: '', teams: 83 }
      ],
      'Germany': [
        { league_name: 'Bundesliga', league_logo: '', teams: 18 },
        { league_name: '2. Bundesliga', league_logo: '', teams: 18 },
        { league_name: 'DFB-Pokal', league_logo: '', teams: 64 }
      ],
      'Italy': [
        { league_name: 'Serie A', league_logo: '', teams: 20 },
        { league_name: 'Serie B', league_logo: '', teams: 20 },
        { league_name: 'Coppa Italia', league_logo: '', teams: 78 }
      ],
      'France': [
        { league_name: 'Ligue 1', league_logo: '', teams: 20 },
        { league_name: 'Ligue 2', league_logo: '', teams: 20 },
        { league_name: 'Coupe de France', league_logo: '', teams: 154 }
      ]
    };

    return leagues[countryName as keyof typeof leagues] || [
      { league_name: `${countryName} First Division`, league_logo: '', teams: 16 },
      { league_name: `${countryName} Cup`, league_logo: '', teams: 32 }
    ];
  };

  const generateMockTeams = (countryName: string) => {
    const teams = {
      'England': ['Manchester City', 'Arsenal', 'Liverpool', 'Chelsea', 'Manchester United', 'Tottenham', 'Newcastle', 'Brighton'],
      'Spain': ['Real Madrid', 'Barcelona', 'Atletico Madrid', 'Real Sociedad', 'Villarreal', 'Real Betis', 'Valencia', 'Sevilla'],
      'Germany': ['Bayern Munich', 'Borussia Dortmund', 'RB Leipzig', 'Union Berlin', 'SC Freiburg', 'Eintracht Frankfurt', 'Wolfsburg', 'Bayer Leverkusen'],
      'Italy': ['Napoli', 'AC Milan', 'Inter Milan', 'Juventus', 'AS Roma', 'Lazio', 'Atalanta', 'Fiorentina'],
      'France': ['Paris Saint-Germain', 'Lens', 'Marseille', 'Rennes', 'Monaco', 'Lille', 'Lyon', 'Nice']
    };

    const countryTeams = teams[countryName as keyof typeof teams] || [`${countryName} FC`, `${countryName} United`, `${countryName} City`];
    
    return countryTeams.map((name, index) => ({
      team_name: name,
      team_badge: `https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=${name.charAt(0)}`,
      founded: 1900 + Math.floor(Math.random() * 100),
      stadium: `${name} Stadium`,
      capacity: 30000 + Math.floor(Math.random() * 50000)
    }));
  };

  const generateMockTopPlayers = (countryName: string) => {
    const players = {
      'England': ['Harry Kane', 'Jude Bellingham', 'Phil Foden', 'Bukayo Saka', 'Declan Rice'],
      'Spain': ['Pedri', 'Gavi', 'Ferran Torres', 'Ansu Fati', 'Mikel Oyarzabal'],
      'Germany': ['Jamal Musiala', 'Florian Wirtz', 'Kai Havertz', 'Serge Gnabry', 'Joshua Kimmich'],
      'Italy': ['Federico Chiesa', 'Nicolo Barella', 'Alessandro Bastoni', 'Ciro Immobile', 'Lorenzo Insigne'],
      'France': ['Kylian Mbappe', 'Eduardo Camavinga', 'Aurelien Tchouameni', 'Christopher Nkunku', 'Kingsley Coman']
    };

    const countryPlayers = players[countryName as keyof typeof players] || [`${countryName} Star 1`, `${countryName} Star 2`];
    
    return countryPlayers.map((name, index) => ({
      player_name: name,
      team_name: generateMockTeams(countryName)[index % 3]?.team_name || 'Unknown',
      goals: Math.floor(Math.random() * 20) + 5,
      assists: Math.floor(Math.random() * 15) + 3,
      rating: (7.0 + Math.random() * 2).toFixed(1)
    }));
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    fetchCountryStats(country);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Globe className="h-6 w-6 mr-2 text-blue-600" />
          Country Football Overview
        </h2>
        
        {/* Featured Countries */}
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-2 mb-6">
          {featuredCountries.map((country) => {
            const countryData = countries.find(c => c.country_id === country.id) || {
              country_id: country.id,
              country_name: country.name,
              country_logo: ''
            };
            
            return (
              <button
                key={country.id}
                onClick={() => handleCountrySelect(countryData)}
                className={`p-3 rounded-lg text-center transition-all ${
                  selectedCountry?.country_id === country.id
                    ? `${country.color} text-white shadow-lg scale-105`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                }`}
              >
                <div className="text-lg mb-1">{country.flag}</div>
                <div className="text-xs font-medium">{country.name}</div>
              </button>
            );
          })}
        </div>

        {/* All Countries Dropdown */}
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or select from all countries:
          </label>
          <select
            value={selectedCountry?.country_id || ''}
            onChange={(e) => {
              const country = countries.find(c => c.country_id === e.target.value);
              if (country) handleCountrySelect(country);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a country...</option>
            {countries.map((country) => (
              <option key={country.country_id} value={country.country_id}>
                {country.country_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Country Stats */}
      {selectedCountry && countryStats && (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Leagues</p>
                  <p className="text-2xl font-bold text-blue-600">{countryStats.leagues.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Top Teams</p>
                  <p className="text-2xl font-bold text-green-600">{countryStats.teams.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Matches</p>
                  <p className="text-2xl font-bold text-purple-600">{countryStats.totalMatches}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Star Players</p>
                  <p className="text-2xl font-bold text-yellow-600">{countryStats.topPlayers.length}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Country Detail Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Leagues */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                Leagues in {selectedCountry.country_name}
              </h3>
              
              <div className="space-y-3">
                {countryStats.leagues.map((league, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{league.league_name}</p>
                        <p className="text-sm text-gray-600">{league.teams} teams</p>
                      </div>
                    </div>
                    <Flag className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Top Teams */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Top Teams
              </h3>
              
              <div className="space-y-3">
                {countryStats.teams.map((team, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-sm font-bold text-white">
                          {team.team_name?.charAt(0) || 'T'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{team.team_name}</p>
                        <p className="text-sm text-gray-600">Founded: {team.founded}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{team.stadium}</p>
                      <p className="text-xs text-gray-600">{team.capacity?.toLocaleString()} capacity</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Players */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-600" />
              Star Players from {selectedCountry.country_name}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {countryStats.topPlayers.map((player, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold">
                    {player.player_name.split(' ')[0].charAt(0)}{player.player_name.split(' ')[1]?.charAt(0) || ''}
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">{player.player_name}</h4>
                  <p className="text-xs text-gray-600 mb-2">{player.team_name}</p>
                  <div className="flex justify-center space-x-3 text-xs">
                    <span className="text-green-600 font-medium">{player.goals}G</span>
                    <span className="text-blue-600 font-medium">{player.assists}A</span>
                    <span className="text-purple-600 font-medium">{player.rating}★</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};