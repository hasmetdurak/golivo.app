import React, { useState, useEffect } from 'react';
import { Users, MapPin, Calendar, Trophy, Target, Activity, TrendingUp, Award, User } from 'lucide-react';
import { FootballApi as footballApi } from '../services/api';

interface TeamDetails {
  team_key: string;
  team_name: string;
  team_country: string;
  team_founded: string;
  team_badge: string;
  venue: {
    venue_name: string;
    venue_address: string;
    venue_city: string;
    venue_capacity: string;
    venue_surface: string;
  };
  players: Player[];
  coaches: Coach[];
}

interface Player {
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

interface Coach {
  coach_name: string;
  coach_country: string;
  coach_age: string;
}

export const TeamDashboard: React.FC = () => {
  const [teams, setTeams] = useState<TeamDetails[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState('152'); // Premier League

  const majorLeagues = [
    { id: '152', name: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { id: '302', name: 'La Liga', flag: '🇪🇸' },
    { id: '175', name: 'Bundesliga', flag: '🇩🇪' },
    { id: '207', name: 'Serie A', flag: '🇮🇹' },
    { id: '168', name: 'Ligue 1', flag: '🇫🇷' },
    { id: '340', name: 'Süper Lig', flag: '🇹🇷' }
  ];

  useEffect(() => {
    fetchTeams();
  }, [selectedLeague]);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const data = await footballApi.getTeamsByLeague(selectedLeague);
      setTeams(data);
      if (data.length > 0) {
        setSelectedTeam(data[0]);
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
      setTeams(generateMockTeams());
      setSelectedTeam(generateMockTeams()[0]);
    } finally {
      setLoading(false);
    }
  };

  const generateMockTeams = (): TeamDetails[] => {
    const teamNames = [
      'Manchester City', 'Arsenal', 'Liverpool', 'Manchester United', 'Newcastle',
      'Brighton', 'Aston Villa', 'Tottenham', 'Chelsea', 'Fulham'
    ];

    return teamNames.map((name, index) => ({
      team_key: (index + 1).toString(),
      team_name: name,
      team_country: 'England',
      team_founded: (1880 + Math.floor(Math.random() * 100)).toString(),
      team_badge: `https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=${name.charAt(0)}`,
      venue: {
        venue_name: `${name} Stadium`,
        venue_address: 'Stadium Road',
        venue_city: 'Manchester',
        venue_capacity: (30000 + Math.floor(Math.random() * 50000)).toString(),
        venue_surface: 'grass'
      },
      players: generateMockPlayers(),
      coaches: [{
        coach_name: 'Pep Guardiola',
        coach_country: 'Spain',
        coach_age: '52'
      }]
    }));
  };

  const generateMockPlayers = (): Player[] => {
    const positions = ['Goalkeepers', 'Defenders', 'Midfielders', 'Forwards'] as const;
    const names = [
      'Kevin De Bruyne', 'Erling Haaland', 'Bernardo Silva', 'Ruben Dias', 'Kyle Walker',
      'John Stones', 'Rodri', 'Jack Grealish', 'Phil Foden', 'Ederson',
      'Josko Gvardiol', 'Jeremy Doku', 'Nathan Ake', 'Julian Alvarez', 'Mateo Kovacic'
    ];

    return names.map((name, index) => ({
      player_key: index + 1,
      player_name: name,
      player_number: (index + 1).toString(),
      player_country: 'England',
      player_type: positions[index % 4],
      player_age: (20 + Math.floor(Math.random() * 15)).toString(),
      player_goals: Math.floor(Math.random() * 20).toString(),
      player_assists: Math.floor(Math.random() * 15).toString(),
      player_yellow_cards: Math.floor(Math.random() * 5).toString(),
      player_red_cards: Math.floor(Math.random() * 2).toString(),
      player_rating: (6.0 + Math.random() * 2).toFixed(1),
      player_image: `https://via.placeholder.com/60x60/3B82F6/FFFFFF?text=${name.split(' ')[0].charAt(0)}${name.split(' ')[1]?.charAt(0) || ''}`,
      player_injured: Math.random() > 0.9 ? 'Yes' : 'No',
      player_is_captain: index === 0 ? '1' : '0'
    }));
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'Goalkeepers': return 'bg-yellow-100 text-yellow-800';
      case 'Defenders': return 'bg-blue-100 text-blue-800';
      case 'Midfielders': return 'bg-green-100 text-green-800';
      case 'Forwards': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPositionIcon = (position: string) => {
    switch (position) {
      case 'Goalkeepers': return '🥅';
      case 'Defenders': return '🛡️';
      case 'Midfielders': return '⚽';
      case 'Forwards': return '🎯';
      default: return '👤';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* League and Team Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Users className="h-6 w-6 mr-2 text-blue-600" />
          Takım Merkezi
        </h2>
        
        {/* League Selection */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
          {majorLeagues.map((league) => (
            <button
              key={league.id}
              onClick={() => setSelectedLeague(league.id)}
              className={`p-3 rounded-lg text-xs font-medium transition-all ${
                selectedLeague === league.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="text-sm mb-1">{league.flag}</div>
              <div className="truncate">{league.name}</div>
            </button>
          ))}
        </div>

        {/* Team Selection */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {teams.slice(0, 10).map((team) => (
            <button
              key={team.team_key}
              onClick={() => setSelectedTeam(team)}
              className={`p-3 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                selectedTeam?.team_key === team.team_key
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <img 
                src={team.team_badge} 
                alt={team.team_name}
                className="h-6 w-6 rounded-full"
                onError={(e) => {
                  e.currentTarget.src = `https://via.placeholder.com/24x24/3B82F6/FFFFFF?text=${team.team_name.charAt(0)}`;
                }}
              />
              <span className="truncate">{team.team_name}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedTeam && (
        <>
          {/* Team Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Team Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="text-center mb-6">
                <img 
                  src={selectedTeam.team_badge} 
                  alt={selectedTeam.team_name}
                  className="h-20 w-20 mx-auto rounded-full mb-4"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=${selectedTeam.team_name.charAt(0)}`;
                  }}
                />
                <h3 className="text-xl font-bold text-gray-900">{selectedTeam.team_name}</h3>
                <p className="text-gray-600">{selectedTeam.team_country}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">Kuruluş:</span>
                  <span className="ml-auto font-medium">{selectedTeam.team_founded}</span>
                </div>
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">Teknik Direktör:</span>
                  <span className="ml-auto font-medium">{selectedTeam.coaches[0]?.coach_name || 'Belirtilmemiş'}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">Oyuncu Sayısı:</span>
                  <span className="ml-auto font-medium">{selectedTeam.players.length}</span>
                </div>
              </div>
            </div>

            {/* Stadium Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-600" />
                Stadyum Bilgileri
              </h4>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Stadyum Adı</p>
                  <p className="font-medium">{selectedTeam.venue.venue_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Şehir</p>
                  <p className="font-medium">{selectedTeam.venue.venue_city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kapasite</p>
                  <p className="font-medium">{parseInt(selectedTeam.venue.venue_capacity).toLocaleString()} kişi</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Zemin</p>
                  <p className="font-medium capitalize">{selectedTeam.venue.venue_surface}</p>
                </div>
              </div>
            </div>

            {/* Team Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-purple-600" />
                Takım İstatistikleri
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Target className="h-6 w-6 mx-auto text-green-600 mb-2" />
                  <p className="text-2xl font-bold text-green-600">
                    {selectedTeam.players.reduce((sum, p) => sum + parseInt(p.player_goals || '0'), 0)}
                  </p>
                  <p className="text-xs text-gray-600">Toplam Gol</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                  <p className="text-2xl font-bold text-blue-600">
                    {selectedTeam.players.reduce((sum, p) => sum + parseInt(p.player_assists || '0'), 0)}
                  </p>
                  <p className="text-xs text-gray-600">Toplam Asist</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="w-6 h-6 mx-auto bg-yellow-400 rounded-full mb-2"></div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {selectedTeam.players.reduce((sum, p) => sum + parseInt(p.player_yellow_cards || '0'), 0)}
                  </p>
                  <p className="text-xs text-gray-600">Sarı Kart</p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="w-6 h-6 mx-auto bg-red-500 rounded-full mb-2"></div>
                  <p className="text-2xl font-bold text-red-600">
                    {selectedTeam.players.reduce((sum, p) => sum + parseInt(p.player_red_cards || '0'), 0)}
                  </p>
                  <p className="text-xs text-gray-600">Kırmızı Kart</p>
                </div>
              </div>
            </div>
          </div>

          {/* Players List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-600" />
              Oyuncu Kadrosu ({selectedTeam.players.length} oyuncu)
            </h4>
            
            {/* Position Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              {['Tümü', 'Goalkeepers', 'Defenders', 'Midfielders', 'Forwards'].map((pos) => (
                <button
                  key={pos}
                  className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {pos === 'Tümü' ? 'Tümü' : getPositionIcon(pos)} {pos === 'Tümü' ? '' : pos.slice(0, -1)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedTeam.players.map((player) => (
                <div key={player.player_key} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="relative">
                      <img 
                        src={player.player_image} 
                        alt={player.player_name}
                        className="h-12 w-12 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = `https://via.placeholder.com/48x48/3B82F6/FFFFFF?text=${player.player_name.split(' ')[0].charAt(0)}${player.player_name.split(' ')[1]?.charAt(0) || ''}`;
                        }}
                      />
                      {player.player_is_captain === '1' && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">C</span>
                        </div>
                      )}
                      {player.player_injured === 'Yes' && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">!</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{player.player_name}</h5>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-blue-600">#{player.player_number}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPositionColor(player.player_type)}`}>
                          {getPositionIcon(player.player_type)} {player.player_type.slice(0, -1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-xs text-gray-600">Gol</p>
                      <p className="font-semibold text-green-600">{player.player_goals}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Asist</p>
                      <p className="font-semibold text-blue-600">{player.player_assists}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Rating</p>
                      <p className="font-semibold text-purple-600">{player.player_rating}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Yaş</p>
                      <p className="font-semibold text-gray-600">{player.player_age}</p>
                    </div>
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