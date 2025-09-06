import React, { useState, useEffect } from 'react';
import { FootballApi } from '../services/api';
import { StandingsTeam } from '../types';

interface LeagueStandingsProps {
  leagueId?: string;
}

export const LeagueStandings: React.FC<LeagueStandingsProps> = ({ leagueId = '152' }) => {
  const [standings, setStandings] = useState<StandingsTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState(leagueId);

  const topLeagues = [
    { id: '152', name: 'Premier League', country: 'England' },
    { id: '302', name: 'La Liga', country: 'Spain' },
    { id: '175', name: 'Bundesliga', country: 'Germany' },
    { id: '207', name: 'Serie A', country: 'Italy' },
    { id: '168', name: 'Ligue 1', country: 'France' },
    { id: '322', name: 'Süper Lig', country: 'Turkey' }
  ];

  useEffect(() => {
    fetchStandings();
  }, [selectedLeague]);

  const fetchStandings = async () => {
    try {
      setLoading(true);
      const data = await FootballApi.getStandings(selectedLeague);
      setStandings(data);
    } catch (error) {
      console.error('Error fetching standings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPositionColor = (position: number) => {
    if (position <= 4) return 'bg-green-100 text-green-800 border-green-200';
    if (position <= 6) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (position >= 18) return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* League Selector */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg mr-3 flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          Lig Sıralaması
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {topLeagues.map((league) => (
            <button
              key={league.id}
              onClick={() => setSelectedLeague(league.id)}
              className={`p-3 rounded-xl border transition-all duration-200 ${
                selectedLeague === league.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent shadow-lg'
                  : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md'
              }`}
            >
              <div className="text-sm font-medium">{league.name}</div>
              <div className={`text-xs ${selectedLeague === league.id ? 'text-purple-100' : 'text-gray-500'}`}>
                {league.country}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Standings Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poz</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Takım</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">O</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">G</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">B</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">M</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">AG</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">YG</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Averaj</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Puan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {standings.map((team, index) => (
                <tr key={team.team_id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPositionColor(parseInt(team.overall_league_position))}`}>
                      {team.overall_league_position}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 shadow-sm">
                        <span className="text-sm font-bold text-white">
                          {team.team_name?.charAt(0) || 'T'}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{team.team_name}</div>
                        <div className="text-sm text-gray-500">{team.team_key}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {team.overall_league_payed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {team.overall_league_W}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {team.overall_league_D}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {team.overall_league_L}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {team.overall_league_GF}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {team.overall_league_GA}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {parseInt(team.overall_league_GF) - parseInt(team.overall_league_GA)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {team.overall_league_PTS}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};