import React, { useState, useEffect } from 'react';
import { FootballApi } from '../services/api';
import { TeamDetails } from '../types';

export const TeamDashboard: React.FC = () => {
  const [teams, setTeams] = useState<TeamDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState('152');
  const [searchTerm, setSearchTerm] = useState('');

  const topLeagues = [
    { id: '152', name: 'Premier League', country: 'England' },
    { id: '302', name: 'La Liga', country: 'Spain' },
    { id: '175', name: 'Bundesliga', country: 'Germany' },
    { id: '207', name: 'Serie A', country: 'Italy' },
    { id: '168', name: 'Ligue 1', country: 'France' },
    { id: '322', name: 'Süper Lig', country: 'Turkey' }
  ];

  useEffect(() => {
    fetchTeams();
  }, [selectedLeague]);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const data = await FootballApi.getTeamsByLeague(selectedLeague);
      setTeams(data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTeams = teams.filter(team =>
    team.team_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mr-3 flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          Takımlar
        </h2>

        {/* League Selector */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {topLeagues.map((league) => (
            <button
              key={league.id}
              onClick={() => setSelectedLeague(league.id)}
              className={`p-3 rounded-xl border transition-all duration-200 ${
                selectedLeague === league.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg'
                  : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="text-sm font-medium">{league.name}</div>
              <div className={`text-xs ${selectedLeague === league.id ? 'text-blue-100' : 'text-gray-500'}`}>
                {league.country}
              </div>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Takım ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTeams.map((team) => (
          <div key={team.team_key} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">
                  {team.team_name?.charAt(0) || 'T'}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{team.team_name}</h3>
              <p className="text-sm text-gray-600 mb-4">{team.team_country}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-gray-500">Kuruluş</div>
                  <div className="font-semibold text-gray-900">{team.team_founded || 'N/A'}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-gray-500">Stadyum</div>
                  <div className="font-semibold text-gray-900">{team.venue_name || 'N/A'}</div>
                </div>
              </div>

              {team.players && team.players.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500 mb-2">Önemli Oyuncular</div>
                  <div className="flex flex-wrap gap-1">
                    {team.players.slice(0, 3).map((player, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {player.player_name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
          </div>
          <p className="text-gray-500">Takım bulunamadı</p>
        </div>
      )}
    </div>
  );
};