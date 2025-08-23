import React from 'react';
import { X, Clock, Trophy, Target, Calendar, MapPin, Users, BarChart3, User } from 'lucide-react';

interface MatchDetailsModalProps {
  match: any;
  isOpen: boolean;
  onClose: () => void;
}

export const MatchDetailsModal: React.FC<MatchDetailsModalProps> = ({ match, isOpen, onClose }) => {
  if (!isOpen || !match) return null;

  const getStatusText = (status: string, minute?: string) => {
    switch (status) {
      case 'live':
        return minute ? `🔴 CANLI - ${minute}` : '🔴 CANLI';
      case 'finished':
        return '⚪ Bitti';
      case 'scheduled':
        return '🕒 Planlandı';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-500';
      case 'finished':
        return 'bg-gray-500';
      case 'scheduled':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Trophy className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Maç Detayları</h2>
                <p className="text-sm text-gray-500">
                  {match.country?.replace(/🏴󠁧󠁢󠁥󠁮󠁧󠁿|🇪🇸|🇩🇪|🇮🇹|🇫🇷|🇳🇱|🇵🇹|🇧🇪|🇹🇷|🇷🇺|🇺🇸|🇧🇷|🇦🇷|🇲🇽|🇸🇦|🇪🇺/g, '').trim()} {match.league}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Match Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">{match.time}</span>
                {match.round && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm font-medium text-gray-600">{match.round}. Hafta</span>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-4">
                {match.venue && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">{match.venue}</span>
                  </div>
                )}
                {match.referee && (
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">{match.referee}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Teams & Score */}
            <div className="flex items-center justify-between space-x-4">
              {/* Home Team */}
              <div className="flex items-center space-x-4 flex-1">
                <img 
                  src={match.homeTeam.logo} 
                  alt={match.homeTeam.name}
                  className="w-16 h-16 object-contain rounded-xl bg-white shadow-sm p-2"
                />
                <div className="text-right">
                  <h3 className="text-lg font-bold text-gray-900">{match.homeTeam.name}</h3>
                  <p className="text-sm text-gray-500">Ev Sahibi</p>
                </div>
              </div>

              {/* Score */}
              <div className="flex flex-col items-center space-y-2 px-6">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl font-bold text-gray-900">{match.homeScore}</div>
                  <div className="text-2xl font-bold text-gray-400">:</div>
                  <div className="text-4xl font-bold text-gray-900">{match.awayScore}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(match.status)}`}>
                  {getStatusText(match.status, match.minute)}
                </div>
              </div>

              {/* Away Team */}
              <div className="flex items-center space-x-4 flex-1">
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">{match.awayTeam.name}</h3>
                  <p className="text-sm text-gray-500">Misafir</p>
                </div>
                <img 
                  src={match.awayTeam.logo} 
                  alt={match.awayTeam.name}
                  className="w-16 h-16 object-contain rounded-xl bg-white shadow-sm p-2"
                />
              </div>
            </div>
          </div>

          {/* Match Events */}
          {match.events && match.events.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Maç Olayları</h3>
              </div>
              
              {/* Events split by team */}
              <div className="grid grid-cols-2 gap-6">
                {/* Home Team Events */}
                <div>
                  <h4 className="text-md font-semibold text-blue-600 mb-3 flex items-center space-x-2">
                    <span>🏠</span>
                    <span>Ev Sahibi</span>
                  </h4>
                  <div className="space-y-2">
                    {match.events.filter((event: any) => event.team === 'home').map((event: any, index: number) => (
                      <div key={index} className={`flex items-center space-x-3 p-2 rounded-lg ${
                        event.type === 'Goal' 
                          ? 'bg-green-50 border border-green-200'
                          : event.type === 'Yellow Card'
                          ? 'bg-yellow-50 border border-yellow-200'
                          : event.type === 'Red Card'
                          ? 'bg-red-50 border border-red-200'
                          : 'bg-gray-50 border border-gray-200'
                      }`}>
                        <span className="text-xs font-bold text-gray-700 w-8">{event.minute}</span>
                        <span className="text-sm">{event.icon}</span>
                        <span className="text-sm font-medium text-gray-700 flex-1">{event.player}</span>
                      </div>
                    ))}
                    {match.events.filter((event: any) => event.team === 'home').length === 0 && (
                      <p className="text-sm text-gray-500 italic">Olay yok</p>
                    )}
                  </div>
                </div>
                
                {/* Away Team Events */}
                <div>
                  <h4 className="text-md font-semibold text-purple-600 mb-3 flex items-center space-x-2">
                    <span>🚪</span>
                    <span>Deplasman</span>
                  </h4>
                  <div className="space-y-2">
                    {match.events.filter((event: any) => event.team === 'away').map((event: any, index: number) => (
                      <div key={index} className={`flex items-center space-x-3 p-2 rounded-lg ${
                        event.type === 'Goal' 
                          ? 'bg-green-50 border border-green-200'
                          : event.type === 'Yellow Card'
                          ? 'bg-yellow-50 border border-yellow-200'
                          : event.type === 'Red Card'
                          ? 'bg-red-50 border border-red-200'
                          : 'bg-gray-50 border border-gray-200'
                      }`}>
                        <span className="text-xs font-bold text-gray-700 w-8">{event.minute}</span>
                        <span className="text-sm">{event.icon}</span>
                        <span className="text-sm font-medium text-gray-700 flex-1">{event.player}</span>
                      </div>
                    ))}
                    {match.events.filter((event: any) => event.team === 'away').length === 0 && (
                      <p className="text-sm text-gray-500 italic">Olay yok</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Match Statistics */}
          {match.statistics && match.statistics.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Maç İstatistikleri</h3>
              </div>
              
              <div className="space-y-4">
                {match.statistics.map((stat: any, index: number) => {
                  const homeValue = parseFloat(stat.home) || 0;
                  const awayValue = parseFloat(stat.away) || 0;
                  const total = homeValue + awayValue;
                  const homePercent = total > 0 ? (homeValue / total) * 100 : 50;
                  const awayPercent = 100 - homePercent;
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-blue-600">{stat.home}</span>
                        <span className="text-sm font-semibold text-gray-700">{stat.type}</span>
                        <span className="text-sm font-medium text-purple-600">{stat.away}</span>
                      </div>
                      <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-500" 
                          style={{ width: `${homePercent}%` }}
                        ></div>
                        <div 
                          className="bg-purple-500" 
                          style={{ width: `${awayPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Half Time Score */}
          {match.halftimeScore && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-center space-x-4">
                <span className="text-sm font-medium text-gray-600">Yarı Zaman:</span>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-800">{match.halftimeScore.home}</span>
                  <span className="text-gray-400">-</span>
                  <span className="text-lg font-bold text-gray-800">{match.halftimeScore.away}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};