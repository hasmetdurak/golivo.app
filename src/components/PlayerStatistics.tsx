import React, { useState, useEffect } from 'react';
import { User, Search, Trophy, Target, Activity, TrendingUp } from 'lucide-react';
import { FootballApi as footballApi } from '../services/api';

interface Player {
  player_key: number;
  player_id: string;
  player_image: string;
  player_name: string;
  player_number: string;
  player_country: string;
  player_type: 'Goalkeepers' | 'Defenders' | 'Midfielders' | 'Forwards';
  player_age: string;
  player_match_played: string;
  player_goals: string;
  player_assists: string;
  player_yellow_cards: string;
  player_red_cards: string;
  player_rating: string;
  player_shots_total: string;
  player_tackles: string;
  player_passes: string;
  player_passes_accuracy: string;
  team_name?: string;
}

interface TopScorer {
  player_place: string;
  player_name: string;
  team_name: string;
  goals: string;
  assists: string;
  matches: string;
}

export const PlayerStatistics: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [topScorers, setTopScorers] = useState<TopScorer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('search');

  const searchPlayer = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const data = await footballApi.searchPlayer(searchTerm);
      if (data.length > 0) setSelectedPlayer(data[0]);
      else setSelectedPlayer(generateMockPlayer(searchTerm));
    } catch (error) {
      setSelectedPlayer(generateMockPlayer(searchTerm));
    } finally {
      setLoading(false);
    }
  };

  const fetchTopScorers = async () => {
    setLoading(true);
    try {
      const data = await footballApi.getTopScorers('152');
      setTopScorers(data);
    } catch (error) {
      setTopScorers(generateMockTopScorers());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'topscorers') fetchTopScorers();
  }, [activeTab]);

  const generateMockPlayer = (name: string): Player => ({
    player_key: 1,
    player_id: '1',
    player_image: `https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=${name.charAt(0)}`,
    player_name: name,
    player_number: Math.floor(Math.random() * 50 + 1).toString(),
    player_country: 'England',
    player_type: ['Goalkeepers', 'Defenders', 'Midfielders', 'Forwards'][Math.floor(Math.random() * 4)] as any,
    player_age: (20 + Math.floor(Math.random() * 15)).toString(),
    player_match_played: Math.floor(Math.random() * 10 + 20).toString(),
    player_goals: Math.floor(Math.random() * 20).toString(),
    player_assists: Math.floor(Math.random() * 15).toString(),
    player_yellow_cards: Math.floor(Math.random() * 5).toString(),
    player_red_cards: Math.floor(Math.random() * 2).toString(),
    player_rating: (6.0 + Math.random() * 2).toFixed(1),
    player_shots_total: Math.floor(Math.random() * 50 + 20).toString(),
    player_tackles: Math.floor(Math.random() * 30).toString(),
    player_passes: Math.floor(Math.random() * 500 + 200).toString(),
    player_passes_accuracy: Math.floor(Math.random() * 200 + 100).toString(),
    team_name: 'Manchester City'
  });

  const generateMockTopScorers = (): TopScorer[] => [
    { player_place: '1', player_name: 'Erling Haaland', team_name: 'Manchester City', goals: '24', assists: '8', matches: '25' },
    { player_place: '2', player_name: 'Harry Kane', team_name: 'Bayern Munich', goals: '22', assists: '6', matches: '24' },
    { player_place: '3', player_name: 'Kylian Mbappé', team_name: 'PSG', goals: '21', assists: '10', matches: '23' },
    { player_place: '4', player_name: 'Mohamed Salah', team_name: 'Liverpool', goals: '18', assists: '12', matches: '26' },
    { player_place: '5', player_name: 'Lionel Messi', team_name: 'Inter Miami', goals: '16', assists: '15', matches: '22' }
  ];

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'Goalkeepers': return 'bg-yellow-100 text-yellow-800';
      case 'Defenders': return 'bg-blue-100 text-blue-800';
      case 'Midfielders': return 'bg-green-100 text-green-800';
      case 'Forwards': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <User className="h-6 w-6 mr-2 text-blue-600" />
          Oyuncu İstatistikleri
        </h2>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-4">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'search' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            <Search className="h-4 w-4 inline mr-2" />
            Oyuncu Ara
          </button>
          <button
            onClick={() => setActiveTab('topscorers')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'topscorers' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            <Trophy className="h-4 w-4 inline mr-2" />
            Gol Kralları
          </button>
        </div>

        {/* Search */}
        {activeTab === 'search' && (
          <div className="flex space-x-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchPlayer()}
              placeholder="Oyuncu adı girin... (örn: Messi, Ronaldo)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={searchPlayer}
              disabled={!searchTerm.trim() || loading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Player Profile */}
      {activeTab === 'search' && selectedPlayer && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="text-center mb-6">
              <img 
                src={selectedPlayer.player_image} 
                alt={selectedPlayer.player_name}
                className="h-24 w-24 mx-auto rounded-full mb-4"
                onError={(e) => {
                  e.currentTarget.src = `https://via.placeholder.com/96x96/3B82F6/FFFFFF?text=${selectedPlayer.player_name.charAt(0)}`;
                }}
              />
              <h3 className="text-xl font-bold text-gray-900">{selectedPlayer.player_name}</h3>
              <p className="text-gray-600">{selectedPlayer.team_name}</p>
              <div className={`inline-flex items-center px-3 py-1 mt-2 text-sm font-medium rounded-full ${getPositionColor(selectedPlayer.player_type)}`}>
                {selectedPlayer.player_type}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Forma No:</span>
                <span className="font-semibold">#{selectedPlayer.player_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Yaş:</span>
                <span className="font-semibold">{selectedPlayer.player_age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rating:</span>
                <span className="font-semibold text-purple-600">{selectedPlayer.player_rating}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2 text-red-600" />
              İstatistikler
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{selectedPlayer.player_goals}</p>
                <p className="text-xs text-gray-600">Gol</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{selectedPlayer.player_assists}</p>
                <p className="text-xs text-gray-600">Asist</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">{selectedPlayer.player_yellow_cards}</p>
                <p className="text-xs text-gray-600">Sarı Kart</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">{selectedPlayer.player_red_cards}</p>
                <p className="text-xs text-gray-600">Kırmızı Kart</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Scorers */}
      {activeTab === 'topscorers' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
              Gol Kralları
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sıra</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Oyuncu</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Gol</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Asist</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Maç</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topScorers.map((scorer, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{scorer.player_name}</div>
                        <div className="text-sm text-gray-500">{scorer.team_name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-green-600">{scorer.goals}</span>
                    </td>
                    <td className="px-6 py-4 text-center text-blue-600 font-medium">
                      {scorer.assists}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-900">
                      {scorer.matches}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};