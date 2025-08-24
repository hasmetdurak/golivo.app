import React, { useState, useEffect } from 'react';
import { X, Clock, Trophy, Target, Calendar, MapPin, Users, BarChart3, User, TrendingUp, Award } from 'lucide-react';
import { FootballApi } from '../services/api';

interface MatchDetailsModalProps {
  match: any;
  isOpen: boolean;
  onClose: () => void;
}

export const MatchDetailsModal: React.FC<MatchDetailsModalProps> = ({ match, isOpen, onClose }) => {
  const [headToHeadData, setHeadToHeadData] = useState<any[]>([]);
  const [homeTeamStats, setHomeTeamStats] = useState<any>(null);
  const [awayTeamStats, setAwayTeamStats] = useState<any>(null);
  const [isLoadingH2H, setIsLoadingH2H] = useState(false);
  
  if (!isOpen || !match) return null;

  // Başlayacak maçlar için head-to-head ve takım istatistiklerini yükle
  useEffect(() => {
    if (match && match.status === 'scheduled') {
      loadMatchPreviewData();
    }
  }, [match]);

  const loadMatchPreviewData = async () => {
    if (!match || match.status !== 'scheduled') return;
    
    setIsLoadingH2H(true);
    try {
      // Head-to-head verilerini yükle
      try {
        const h2hData = await FootballApi.getHeadToHead(match.homeTeam.name, match.awayTeam.name);
        setHeadToHeadData(h2hData || []);
      } catch (error) {
        console.error('Error loading H2H data:', error);
        setHeadToHeadData([]);
      }
      
      // Takım istatistiklerini yükle
      try {
        const [homeStats, awayStats] = await Promise.all([
          FootballApi.getTeamStats(match.homeTeam.name).catch(() => null),
          FootballApi.getTeamStats(match.awayTeam.name).catch(() => null)
        ]);
        
        setHomeTeamStats(homeStats);
        setAwayTeamStats(awayStats);
      } catch (error) {
        console.error('Error loading team stats:', error);
        setHomeTeamStats(null);
        setAwayTeamStats(null);
      }
    } catch (error) {
      console.error('Error loading match preview data:', error);
      setHeadToHeadData([]);
      setHomeTeamStats(null);
      setAwayTeamStats(null);
    } finally {
      setIsLoadingH2H(false);
    }
  };

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

          {/* Match Statistics - Sadece canlı ve biten maçlar için */}
          {(match.status === 'live' || match.status === 'finished') && match.statistics && match.statistics.length > 0 && (
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

          {/* Başlayacak Maçlar için Öncanı - Head-to-Head & Team Stats */}
          {match.status === 'scheduled' && (
            <div className="space-y-6">
              {/* Takım Performansı */}
              {(homeTeamStats && awayTeamStats) && (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Takım Performansı</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Ev Sahibi Takım */}
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center space-x-3 mb-4">
                        <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-8 h-8 rounded" />
                        <div>
                          <h4 className="font-semibold text-gray-900">{match.homeTeam.name}</h4>
                          <p className="text-sm text-gray-500">Ev Sahibi</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Lig Sıralaması:</span>
                          <span className="font-semibold text-blue-600">#{homeTeamStats.position}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Puan:</span>
                          <span className="font-semibold">{homeTeamStats.points}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Son 5 Maç:</span>
                          <div className="flex space-x-1">
                            {homeTeamStats.form.map((result: string, idx: number) => (
                              <span 
                                key={idx}
                                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white ${
                                  result === 'W' ? 'bg-green-500' : 
                                  result === 'D' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                              >
                                {result}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Gol Ortalaması:</span>
                          <span className="font-semibold">{(homeTeamStats.goalsFor / homeTeamStats.played).toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Deplasman Takımı */}
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center space-x-3 mb-4">
                        <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-8 h-8 rounded" />
                        <div>
                          <h4 className="font-semibold text-gray-900">{match.awayTeam.name}</h4>
                          <p className="text-sm text-gray-500">Deplasman</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Lig Sıralaması:</span>
                          <span className="font-semibold text-purple-600">#{awayTeamStats.position}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Puan:</span>
                          <span className="font-semibold">{awayTeamStats.points}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Son 5 Maç:</span>
                          <div className="flex space-x-1">
                            {awayTeamStats.form.map((result: string, idx: number) => (
                              <span 
                                key={idx}
                                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white ${
                                  result === 'W' ? 'bg-green-500' : 
                                  result === 'D' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                              >
                                {result}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Gol Ortalaması:</span>
                          <span className="font-semibold">{(awayTeamStats.goalsFor / awayTeamStats.played).toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Head-to-Head Karşılaşma Geçmişi */}
              {headToHeadData.length > 0 && (
                <div className="bg-gradient-to-br from-green-50 to-yellow-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Award className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Karşılaşma Geçmişi</h3>
                    <span className="text-sm text-gray-500">(Son {headToHeadData.length} Maç)</span>
                  </div>
                  
                  <div className="space-y-3">
                    {headToHeadData.map((h2hMatch: any, index: number) => {
                      const isHomeWin = h2hMatch.homeScore > h2hMatch.awayScore;
                      const isAwayWin = h2hMatch.awayScore > h2hMatch.homeScore;
                      const isDraw = h2hMatch.homeScore === h2hMatch.awayScore;
                      
                      return (
                        <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="text-sm text-gray-500">{h2hMatch.league}</div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              isHomeWin ? 'bg-blue-100 text-blue-700' :
                              isAwayWin ? 'bg-purple-100 text-purple-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {isDraw ? 'Berabere' : isHomeWin ? 'Ev Sahibi Galibi' : 'Deplasman Galibi'}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-3">
                              <img src={h2hMatch.homeTeam.logo} alt={h2hMatch.homeTeam.name} className="w-6 h-6" />
                              <span className="text-sm font-medium">{h2hMatch.homeTeam.name}</span>
                            </div>
                            
                            <div className="flex items-center space-x-3 px-4">
                              <span className={`text-lg font-bold ${
                                isHomeWin ? 'text-blue-600' : isDraw ? 'text-gray-600' : 'text-gray-400'
                              }`}>
                                {h2hMatch.homeScore}
                              </span>
                              <span className="text-gray-400">-</span>
                              <span className={`text-lg font-bold ${
                                isAwayWin ? 'text-purple-600' : isDraw ? 'text-gray-600' : 'text-gray-400'
                              }`}>
                                {h2hMatch.awayScore}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-medium">{h2hMatch.awayTeam.name}</span>
                              <img src={h2hMatch.awayTeam.logo} alt={h2hMatch.awayTeam.name} className="w-6 h-6" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* H2H Özeti */}
                  <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Karşılaşma Özeti</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-blue-600">
                          {headToHeadData.filter(m => m.homeTeam.name === match.homeTeam.name ? m.homeScore > m.awayScore : m.awayScore > m.homeScore).length}
                        </div>
                        <div className="text-xs text-gray-500">{match.homeTeam.name} Galibiyet</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-600">
                          {headToHeadData.filter(m => m.homeScore === m.awayScore).length}
                        </div>
                        <div className="text-xs text-gray-500">Beraberlik</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-600">
                          {headToHeadData.filter(m => m.homeTeam.name === match.awayTeam.name ? m.homeScore > m.awayScore : m.awayScore > m.homeScore).length}
                        </div>
                        <div className="text-xs text-gray-500">{match.awayTeam.name} Galibiyet</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Yükleniyor durumu */}
              {isLoadingH2H && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Maç önizlemesi yükleniyor...</p>
                </div>
              )}
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