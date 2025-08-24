import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Trophy, Target, Shield, Activity } from 'lucide-react';
import { FootballApi as footballApi } from '../services/api';

interface StandingsTeam {
  country_name: string;
  league_id: string;
  league_name: string;
  team_id: string;
  team_name: string;
  team_badge: string;
  overall_league_position: string;
  overall_league_payed: string;
  overall_league_W: string;
  overall_league_D: string;
  overall_league_L: string;
  overall_league_GF: string;
  overall_league_GA: string;
  overall_league_PTS: string;
}

interface LeagueStandingsProps {
  selectedLeague?: string;
}

export const LeagueStandings: React.FC<LeagueStandingsProps> = ({ selectedLeague }) => {
  const [standings, setStandings] = useState<StandingsTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeagueId, setSelectedLeagueId] = useState('152'); // Default to Premier League
  const [availableLeagues, setAvailableLeagues] = useState<any[]>([]);

  // Major leagues for quick selection
  const majorLeagues = [
    { id: '152', name: 'English Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: 'bg-blue-500' },
    { id: '302', name: 'Spanish La Liga', flag: '🇪🇸', color: 'bg-red-500' },
    { id: '175', name: 'German Bundesliga', flag: '🇩🇪', color: 'bg-yellow-500' },
    { id: '207', name: 'Italian Serie A', flag: '🇮🇹', color: 'bg-green-500' },
    { id: '168', name: 'French Ligue 1', flag: '🇫🇷', color: 'bg-indigo-500' },
    { id: '3', name: 'UEFA Champions League', flag: '🏆', color: 'bg-purple-500' },
    { id: '340', name: 'Turkish Super League', flag: '🇹🇷', color: 'bg-red-600' },
    { id: '344', name: 'Russian Premier League', flag: '🇷🇺', color: 'bg-cyan-500' }
  ];

  useEffect(() => {
    if (selectedLeague) {
      setSelectedLeagueId(selectedLeague);
    }
  }, [selectedLeague]);

  useEffect(() => {
    fetchStandings();
    fetchAvailableLeagues();
  }, [selectedLeagueId]);

  const fetchStandings = async () => {
    setLoading(true);
    try {
      const data = await footballApi.getStandings(selectedLeagueId);
      setStandings(data);
    } catch (error) {
      console.error('Error fetching standings:', error);
      // Mock data fallback
      setStandings(generateMockStandings());
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableLeagues = async () => {
    try {
      const leagues = await footballApi.getAvailableLeagues();
      setAvailableLeagues(leagues.slice(0, 20)); // Limit to top 20 leagues
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };

  const generateMockStandings = (): StandingsTeam[] => {
    const teams = [
      'Manchester City', 'Arsenal', 'Manchester United', 'Newcastle United', 'Liverpool',
      'Brighton', 'Aston Villa', 'Tottenham', 'Brentford', 'Fulham',
      'Crystal Palace', 'Chelsea', 'Wolves', 'West Ham', 'Leeds United',
      'Everton', 'Nottingham Forest', 'Leicester City', 'Bournemouth', 'Southampton'
    ];

    return teams.map((team, index) => {
      const played = 20 + Math.floor(Math.random() * 10);
      const won = Math.floor(Math.random() * (played - 5)) + 5;
      const lost = Math.floor(Math.random() * (played - won));
      const drawn = played - won - lost;
      const goalsFor = won * 2 + drawn * 1 + Math.floor(Math.random() * 20);
      const goalsAgainst = lost * 2 + drawn * 1 + Math.floor(Math.random() * 15);
      const points = won * 3 + drawn;

      return {
        country_name: 'England',
        league_id: '152',
        league_name: 'Premier League',
        team_id: (index + 1).toString(),
        team_name: team,
        team_badge: `https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=${team.charAt(0)}`,
        overall_league_position: (index + 1).toString(),
        overall_league_payed: played.toString(),
        overall_league_W: won.toString(),
        overall_league_D: drawn.toString(),
        overall_league_L: lost.toString(),
        overall_league_GF: goalsFor.toString(),
        overall_league_GA: goalsAgainst.toString(),
        overall_league_PTS: points.toString()
      };
    }).sort((a, b) => parseInt(b.overall_league_PTS) - parseInt(a.overall_league_PTS));
  };

  const getPositionChange = (position: number) => {
    const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
    if (change > 0) return <TrendingUp className="h-3 w-3 text-green-500" />;
    if (change < 0) return <TrendingDown className="h-3 w-3 text-red-500" />;
    return <Minus className="h-3 w-3 text-gray-400" />;
  };

  const getPositionColor = (position: number) => {
    if (position <= 4) return 'text-green-600 bg-green-50'; // Champions League
    if (position <= 6) return 'text-blue-600 bg-blue-50'; // Europa League
    if (position >= 18) return 'text-red-600 bg-red-50'; // Relegation
    return 'text-gray-600 bg-gray-50';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex space-x-4">
              <div className="h-12 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* League Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Trophy className="h-6 w-6 mr-2 text-yellow-600" />
          Lig Puan Durumu
        </h2>
        
        {/* Major Leagues Quick Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-4">
          {majorLeagues.map((league) => (
            <button
              key={league.id}
              onClick={() => setSelectedLeagueId(league.id)}
              className={`p-3 rounded-lg text-xs font-medium transition-all ${
                selectedLeagueId === league.id
                  ? `${league.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="text-sm mb-1">{league.flag}</div>
              <div className="truncate">{league.name.split(' ')[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Standings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">
            {majorLeagues.find(l => l.id === selectedLeagueId)?.name || 'League Standings'}
          </h3>
          <p className="text-gray-600 text-sm">Son güncellenme: {new Date().toLocaleDateString('tr-TR')}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sıra</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Takım</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">O</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">G</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">B</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">M</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">AG</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">YG</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">AV</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">P</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Form</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {standings.map((team, index) => {
                const position = parseInt(team.overall_league_position);
                const goalDifference = parseInt(team.overall_league_GF) - parseInt(team.overall_league_GA);
                
                return (
                  <tr key={team.team_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${getPositionColor(position)}`}>
                          {position}
                        </div>
                        {getPositionChange(position)}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={team.team_badge} 
                          alt={team.team_name}
                          className="h-8 w-8 rounded-full"
                          onError={(e) => {
                            e.currentTarget.src = `https://via.placeholder.com/32x32/3B82F6/FFFFFF?text=${team.team_name.charAt(0)}`;
                          }}
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{team.team_name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                      {team.overall_league_payed}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-green-600 font-medium">
                      {team.overall_league_W}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                      {team.overall_league_D}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-red-600">
                      {team.overall_league_L}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                      {team.overall_league_GF}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                      {team.overall_league_GA}
                    </td>
                    <td className={`px-4 py-4 whitespace-nowrap text-center text-sm font-medium ${
                      goalDifference > 0 ? 'text-green-600' : goalDifference < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {goalDifference > 0 ? '+' : ''}{goalDifference}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-bold text-gray-900">
                      {team.overall_league_PTS}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-1">
                        {['W', 'W', 'D', 'L', 'W'].map((result, i) => (
                          <div 
                            key={i}
                            className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white ${
                              result === 'W' ? 'bg-green-500' : result === 'D' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
              <span className="text-gray-600">Şampiyonlar Ligi (1-4)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
              <span className="text-gray-600">Avrupa Ligi (5-6)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-50 border border-red-200 rounded"></div>
              <span className="text-gray-600">Küme Düşme (18-20)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};