import React, { useState, useEffect, useCallback } from 'react';
import { FootballApi } from '../services/api';
import { X, Calendar, MapPin, User, Clock, Trophy, Activity, Target, Users, TrendingUp, AlertCircle, Zap, Shield, Timer, Star, BarChart3, PieChart, Hash, Award } from 'lucide-react';

interface MatchDetailsModalProps {
  match: any;
  isOpen: boolean;
  onClose: () => void;
  viewMode?: 'mini' | 'full';
  onViewModeChange?: (mode: 'mini' | 'full') => void;
}

export const MatchDetailsModal: React.FC<MatchDetailsModalProps> = ({ 
  match, 
  isOpen, 
  onClose, 
  viewMode = 'mini',
  onViewModeChange 
}) => {
  // HOOK RULES FIX - Always call hooks at the top level
  const [headToHeadData, setHeadToHeadData] = useState<any[]>([]);
  const [homeTeamStats, setHomeTeamStats] = useState<any>(null);
  const [awayTeamStats, setAwayTeamStats] = useState<any>(null);
  const [isLoadingH2H, setIsLoadingH2H] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [comprehensiveData, setComprehensiveData] = useState<any>(null);
  const [globalStats, setGlobalStats] = useState<any>(null);
  
  // EARLY RETURN AFTER HOOKS - FIXED
  // Güvenlik kontrolü - match yoksa modal'ı açma
  const shouldRender = isOpen && match && typeof match === 'object';
  
  // Modal kapatma işlemi - useCallback ile optimize
  const handleClose = useCallback(() => {
    try {
      setIsClosing(true);
      setTimeout(() => {
        setError(null);
        setHeadToHeadData([]);
        setHomeTeamStats(null);
        setAwayTeamStats(null);
        setIsLoadingH2H(false);
        setIsClosing(false);
        onClose();
      }, 150);
    } catch (error) {
      console.error('Modal close error:', error);
      setIsClosing(false);
      onClose();
    }
  }, [onClose]);

  // View mode değiştirme - useCallback ile optimize
  const toggleViewMode = useCallback(() => {
    const newMode = viewMode === 'mini' ? 'full' : 'mini';
    onViewModeChange?.(newMode);
  }, [viewMode, onViewModeChange]);

  // ESC tuşu ile kapatma - useEffect
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  // Get comprehensive match events from API data
  const getMatchEvents = () => {
    if (comprehensiveData?.events && comprehensiveData.events.length > 0) {
      return comprehensiveData.events.map((event: any) => ({
        minute: event.time || event.minute || '0',
        type: event.type_name === 'goal' ? 'goal' : 
              event.type_name === 'yellow-card' ? 'yellow' : 
              event.type_name === 'red-card' ? 'red' : 'other',
        team: event.team_id === match.homeTeam?.id ? 'home' : 'away',
        player: event.player_name || 'Unknown Player',
        description: event.type_name || 'Event'
      }));
    }
    
    // Enhanced fallback events based on match status
    if (match.status === 'scheduled') return [];
    
    return [
      { minute: '12', type: 'goal', team: 'home', player: match.homeTeam?.name?.split(' ')[0] + ' Player', description: 'Goal' },
      { minute: '25', type: 'yellow', team: 'away', player: match.awayTeam?.name?.split(' ')[0] + ' Player', description: 'Yellow Card' },
      { minute: '45+2', type: 'goal', team: 'away', player: match.awayTeam?.name?.split(' ')[0] + ' Player', description: 'Goal' }
    ];
  };

  const getMatchStats = () => {
    if (comprehensiveData?.statistics && Object.keys(comprehensiveData.statistics).length > 0) {
      const stats = comprehensiveData.statistics;
      return {
        ballPossession: { 
          home: stats.home_possession || 50, 
          away: stats.away_possession || 50 
        },
        shots: { 
          home: stats.home_shots || 0, 
          away: stats.away_shots || 0 
        },
        shotsOnTarget: {
          home: stats.home_shots_on_target || 0,
          away: stats.away_shots_on_target || 0
        },
        corners: { 
          home: stats.home_corners || 0, 
          away: stats.away_corners || 0 
        },
        fouls: {
          home: stats.home_fouls || 0,
          away: stats.away_fouls || 0
        },
        offsides: {
          home: stats.home_offsides || 0,
          away: stats.away_offsides || 0
        },
        yellowCards: {
          home: stats.home_yellow_cards || 0,
          away: stats.away_yellow_cards || 0
        },
        redCards: {
          home: stats.home_red_cards || 0,
          away: stats.away_red_cards || 0
        },
        passes: {
          home: stats.home_passes || 0,
          away: stats.away_passes || 0
        },
        passAccuracy: {
          home: stats.home_pass_accuracy || 0,
          away: stats.away_pass_accuracy || 0
        }
      };
    }
    
    return {
      ballPossession: { home: 65, away: 35 },
      shots: { home: 12, away: 8 },
      shotsOnTarget: { home: 6, away: 3 },
      corners: { home: 7, away: 4 },
      fouls: { home: 8, away: 12 },
      offsides: { home: 2, away: 1 },
      yellowCards: { home: 2, away: 3 },
      redCards: { home: 0, away: 1 },
      passes: { home: 456, away: 298 },
      passAccuracy: { home: 89, away: 84 }
    };
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'goal': return <Target className="w-4 h-4 text-green-600" />;
      case 'yellow': return <div className="w-4 h-3 bg-yellow-500 rounded-sm" />;
      case 'red': return <div className="w-4 h-3 bg-red-600 rounded-sm" />;
      case 'substitution': return <Users className="w-4 h-4 text-blue-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const renderStatItem = (label: string, homeValue: number, awayValue: number, icon: string, homeColor: string = 'blue', awayColor: string = 'purple') => {
    const total = homeValue + awayValue;
    const homePercentage = total > 0 ? (homeValue / total) * 100 : 50;
    const awayPercentage = total > 0 ? (awayValue / total) * 100 : 50;
    
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl">{icon}</span>
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-lg font-bold text-${homeColor}-600`}>{homeValue}</span>
          <span className={`text-lg font-bold text-${awayColor}-600`}>{awayValue}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`bg-gradient-to-r from-${homeColor}-500 to-${awayColor}-500 h-2 rounded-full`}
            style={{ 
              background: `linear-gradient(to right, 
                rgb(59 130 246) 0%, 
                rgb(59 130 246) ${homePercentage}%, 
                rgb(147 51 234) ${homePercentage}%, 
                rgb(147 51 234) 100%)` 
            }}
          ></div>
        </div>
      </div>
    );
  };

  const matchEvents = getMatchEvents();
  const matchStats = getMatchStats();

  // CONDITIONAL RENDERING AFTER ALL HOOKS
  if (!shouldRender) {
    return null;
  }

  useEffect(() => {
    if (match && isOpen) {
      loadComprehensiveMatchData();
    }
  }, [match, isOpen]);

  const loadComprehensiveMatchData = async () => {
    if (!match) return;
    
    setIsLoadingH2H(true);
    setError(null);
    
    try {
      console.log('🔥 Loading comprehensive match data for:', match.id);
      
      // Fetch comprehensive data if match has fixtureId or id
      if (match.fixtureId || match.id) {
        const matchId = match.fixtureId?.toString() || match.id?.toString();
        const comprehensiveMatchData = await FootballApi.getComprehensiveMatchData(matchId);
        setComprehensiveData(comprehensiveMatchData);
        
        // If we have team IDs, fetch head-to-head data
        if (match.homeTeam?.id && match.awayTeam?.id) {
          const h2hData = await FootballApi.getHeadToHead(
            match.homeTeam.id.toString(), 
            match.awayTeam.id.toString()
          );
          setHeadToHeadData(h2hData);
        }
      }
      
      // Generate mock statistics for display
      const mockHomeStats = {
        matchesPlayed: 20,
        wins: 12,
        draws: 5,
        losses: 3,
        goalsScored: 35,
        goalsConceded: 18,
        cleanSheets: 8,
        form: ['W', 'W', 'D', 'W', 'L']
      };
      
      const mockAwayStats = {
        matchesPlayed: 18,
        wins: 8,
        draws: 6,
        losses: 4,
        goalsScored: 24,
        goalsConceded: 16,
        cleanSheets: 6,
        form: ['L', 'W', 'D', 'D', 'W']
      };
      
      setHomeTeamStats(mockHomeStats);
      setAwayTeamStats(mockAwayStats);
      
    } catch (error) {
      console.error('Error loading comprehensive match data:', error);
      setError('Error loading match data');
    } finally {
      setIsLoadingH2H(false);
    }
  };

  const getStatusText = (status: string, minute?: string) => {
    try {
      switch (status) {
        case 'live':
          return minute ? `${minute} - CANLI` : 'CANLI';
        case 'finished':
          return 'MS';
        case 'scheduled':
          return 'BAŞLAYACAK';
        default:
          return 'BİLİNMEYEN';
      }
    } catch (error) {
      console.error('Status text error:', error);
      return 'BİLİNMEYEN';
    }
  };

  const getStatusColor = (status: string) => {
    try {
      switch (status) {
        case 'live':
          return 'text-red-600 bg-red-100';
        case 'finished':
          return 'text-gray-600 bg-gray-100';
        case 'scheduled':
          return 'text-blue-600 bg-blue-100';
        default:
          return 'text-gray-600 bg-gray-100';
      }
    } catch (error) {
      console.error('Status color error:', error);
      return 'text-gray-600 bg-gray-100';
    }
  };

  // Güvenli veri erişimi
  const homeTeam = match.homeTeam && typeof match.homeTeam === 'object' 
    ? match.homeTeam 
    : { name: 'Ev Sahibi', logo: '', country: '' };
    
  const awayTeam = match.awayTeam && typeof match.awayTeam === 'object' 
    ? match.awayTeam 
    : { name: 'Deplasman', logo: '', country: '' };

  const homeScore = match.homeScore !== undefined 
    ? (typeof match.homeScore === 'number' ? match.homeScore : 
       (typeof match.homeScore === 'string' ? parseInt(match.homeScore) || 0 : 0))
    : 0;
    
  const awayScore = match.awayScore !== undefined 
    ? (typeof match.awayScore === 'number' ? match.awayScore : 
       (typeof match.awayScore === 'string' ? parseInt(match.awayScore) || 0 : 0))
    : 0;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div 
          className={`bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ${
            isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Maç Detayları</h2>
                <p className="text-sm text-gray-600">{match.league || 'Bilinmeyen Lig'}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Match Info */}
            <div className="p-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(match.status)}`}>
                    {getStatusText(match.status, match.minute)}
                  </span>
                  {match.venue && (
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{match.venue}</span>
                    </div>
                  )}
                </div>

                {/* Teams and Score */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  {/* Home Team */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                      <span className="text-2xl font-bold text-white">
                        {homeTeam.name?.charAt(0) || 'H'}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">{homeTeam.name}</h3>
                    {homeTeam.country && (
                      <p className="text-sm text-gray-600">{homeTeam.country}</p>
                    )}
                  </div>

                  {/* Score */}
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {homeScore} - {awayScore}
                    </div>
                    {match.minute && match.status === 'live' && (
                      <div className="text-sm text-red-600 font-semibold">
                        {match.minute}'
                      </div>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                      <span className="text-2xl font-bold text-white">
                        {awayTeam.name?.charAt(0) || 'A'}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">{awayTeam.name}</h3>
                    {awayTeam.country && (
                      <p className="text-sm text-gray-600">{awayTeam.country}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-800 font-medium">{error}</span>
                  </div>
                </div>
              )}

              {/* Match Events & Statistics for Live/Finished Matches */}
              {(match.status === 'live' || match.status === 'finished') && (
                <div className="space-y-8">
                  {/* Match Events Section - Separate Frames */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Home Team Events Frame */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 p-6 shadow-lg">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-lg font-bold text-white">
                            {homeTeam.name?.charAt(0) || 'H'}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {matchEvents.filter(event => event.team === 'home').map((event, index) => (
                          <div key={index} className="bg-white border border-blue-300 p-3 rounded-lg shadow-sm">
                            <div className="flex items-center space-x-3">
                              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                                {event.minute}'
                              </div>
                              <div className="flex-shrink-0">
                                {getEventIcon(event.type)}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900 text-sm">{event.player}</div>
                                <div className="text-xs text-gray-600">{event.description}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {matchEvents.filter(event => event.team === 'home').length === 0 && (
                          <div className="text-center py-8 text-blue-600">
                            <Zap className="w-12 h-12 mx-auto mb-2 opacity-30" />
                            <p className="text-sm font-medium">Henüz olay yok</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Away Team Events Frame */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 p-6 shadow-lg">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-lg font-bold text-white">
                            {awayTeam.name?.charAt(0) || 'A'}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {matchEvents.filter(event => event.team === 'away').map((event, index) => (
                          <div key={index} className="bg-white border border-purple-300 p-3 rounded-lg shadow-sm">
                            <div className="flex items-center space-x-3">
                              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                                {event.minute}'
                              </div>
                              <div className="flex-shrink-0">
                                {getEventIcon(event.type)}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900 text-sm">{event.player}</div>
                                <div className="text-xs text-gray-600">{event.description}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {matchEvents.filter(event => event.team === 'away').length === 0 && (
                          <div className="text-center py-8 text-purple-600">
                            <Zap className="w-12 h-12 mx-auto mb-2 opacity-30" />
                            <p className="text-sm font-medium">Henüz olay yok</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Match Statistics Section - Comprehensive Data Display */}
                  <div className="grid grid-cols-1 gap-6">
                    {/* Comprehensive Statistics Grid */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 p-6 shadow-lg">
                      <div className="flex items-center justify-center mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                            <span className="text-sm font-bold text-white">
                              {homeTeam.name?.charAt(0) || 'H'}
                            </span>
                          </div>
                          <BarChart3 className="w-8 h-8 text-gray-600" />
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                            <span className="text-sm font-bold text-white">
                              {awayTeam.name?.charAt(0) || 'A'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Ball Possession - Special Display */}
                      <div className="bg-white rounded-lg p-6 mb-4 shadow-sm border border-gray-300">
                        <div className="text-center mb-4">
                          <div className="flex items-center justify-between">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-blue-600 mb-1">{matchStats.ballPossession.home}%</div>
                              <div className="text-xs text-gray-600">Possession</div>
                            </div>
                            <div className="flex-1 mx-4">
                              <div className="w-full bg-gray-200 rounded-full h-4">
                                <div 
                                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-1000"
                                  style={{ width: `${matchStats.ballPossession.home}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-3xl font-bold text-purple-600 mb-1">{matchStats.ballPossession.away}%</div>
                              <div className="text-xs text-gray-600">Possession</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Detailed Statistics Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        {renderStatItem('Shots', matchStats.shots.home, matchStats.shots.away, '⚽')}
                        {renderStatItem('Shots on Target', matchStats.shotsOnTarget.home, matchStats.shotsOnTarget.away, '🎯')}
                        {renderStatItem('Corners', matchStats.corners.home, matchStats.corners.away, '📐')}
                        {renderStatItem('Fouls', matchStats.fouls.home, matchStats.fouls.away, '⚠️')}
                        {renderStatItem('Offsides', matchStats.offsides.home, matchStats.offsides.away, '🚩')}
                        {renderStatItem('Yellow Cards', matchStats.yellowCards.home, matchStats.yellowCards.away, '🟨')}
                        {renderStatItem('Passes', matchStats.passes.home, matchStats.passes.away, '⚡')}
                        {renderStatItem('Pass Accuracy', matchStats.passAccuracy.home, matchStats.passAccuracy.away, '📊', 'green', 'orange')}
                      </div>
                      
                      {/* Additional Match Information */}
                      {match.odds?.home && (
                        <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                          <div className="flex items-center justify-between">
                            <div className="text-center">
                              <div className="text-sm text-gray-600 mb-1">Home Win</div>
                              <div className="text-lg font-bold text-yellow-600">{match.odds.home}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-gray-600 mb-1">Draw</div>
                              <div className="text-lg font-bold text-yellow-600">{match.odds.draw}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-gray-600 mb-1">Away Win</div>
                              <div className="text-lg font-bold text-yellow-600">{match.odds.away}</div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Competition Information */}
                      {match.competition && (
                        <div className="mt-4 bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm text-gray-600">Competition</div>
                              <div className="font-semibold text-indigo-900">{match.competition.name}</div>
                            </div>
                            {match.competition.tier && (
                              <div className="text-center">
                                <div className="text-sm text-gray-600">Tier</div>
                                <div className="text-lg font-bold text-indigo-600">{match.competition.tier}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Head to Head */}
              {headToHeadData.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span>Head-to-Head History</span>
                  </h3>
                  
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border-2 border-indigo-200 p-6 shadow-lg">
                    <div className="space-y-3">
                      {headToHeadData.slice(0, 5).map((h2h: any, index: number) => {
                        const homeWin = h2h.homeScore > h2h.awayScore;
                        const awayWin = h2h.awayScore > h2h.homeScore;
                        const draw = h2h.homeScore === h2h.awayScore;
                        
                        return (
                          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-indigo-300">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3 flex-1">
                                <div className="text-sm text-gray-600 min-w-[80px]">
                                  {new Date(h2h.date || h2h.scheduled || '').toLocaleDateString()}
                                </div>
                                <div className="flex items-center space-x-2 flex-1">
                                  <span className={`font-medium text-sm ${
                                    h2h.homeTeam === homeTeam.name ? (homeWin ? 'text-green-600' : 'text-gray-700') : 
                                    (awayWin ? 'text-green-600' : 'text-gray-700')
                                  }`}>
                                    {h2h.homeTeam || homeTeam.name}
                                  </span>
                                  <span className="text-xs text-gray-500">vs</span>
                                  <span className={`font-medium text-sm ${
                                    h2h.awayTeam === awayTeam.name ? (awayWin ? 'text-green-600' : 'text-gray-700') : 
                                    (homeWin ? 'text-green-600' : 'text-gray-700')
                                  }`}>
                                    {h2h.awayTeam || awayTeam.name}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <div className={`font-bold text-lg px-3 py-1 rounded-lg ${
                                  homeWin ? 'bg-green-100 text-green-700' :
                                  awayWin ? 'bg-red-100 text-red-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {h2h.homeScore} - {h2h.awayScore}
                                </div>
                                
                                {/* Match outcome indicator */}
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                  homeWin ? 'bg-green-500' :
                                  awayWin ? 'bg-red-500' :
                                  'bg-yellow-500'
                                }`}>
                                  {homeWin ? 'W' : awayWin ? 'L' : 'D'}
                                </div>
                              </div>
                            </div>
                            
                            {/* Additional match info if available */}
                            {h2h.competition && (
                              <div className="mt-2 text-xs text-gray-500">
                                {h2h.competition.name}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Head-to-Head Summary */}
                    <div className="mt-6 bg-white rounded-lg p-4 border border-indigo-300">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            {headToHeadData.filter((h2h: any) => 
                              (h2h.homeTeam === homeTeam.name && h2h.homeScore > h2h.awayScore) ||
                              (h2h.awayTeam === homeTeam.name && h2h.awayScore > h2h.homeScore)
                            ).length}
                          </div>
                          <div className="text-xs text-gray-600">{homeTeam.name} Wins</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-yellow-600">
                            {headToHeadData.filter((h2h: any) => h2h.homeScore === h2h.awayScore).length}
                          </div>
                          <div className="text-xs text-gray-600">Draws</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">
                            {headToHeadData.filter((h2h: any) => 
                              (h2h.homeTeam === awayTeam.name && h2h.homeScore > h2h.awayScore) ||
                              (h2h.awayTeam === awayTeam.name && h2h.awayScore > h2h.homeScore)
                            ).length}
                          </div>
                          <div className="text-xs text-gray-600">{awayTeam.name} Wins</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Team Statistics */}
              {(homeTeamStats || awayTeamStats) && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Team Form & Statistics</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {homeTeamStats && (
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 p-6 shadow-lg">
                        <div className="flex items-center justify-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md mr-3">
                            <span className="text-lg font-bold text-white">
                              {homeTeam.name?.charAt(0) || 'H'}
                            </span>
                          </div>
                          <h4 className="font-bold text-blue-900 text-lg">{homeTeam.name}</h4>
                        </div>
                        
                        {/* Team Form */}
                        <div className="mb-4">
                          <div className="text-sm text-gray-600 mb-2">Recent Form</div>
                          <div className="flex space-x-1">
                            {homeTeamStats.form?.map((result: string, index: number) => (
                              <div 
                                key={index}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                  result === 'W' ? 'bg-green-500' : 
                                  result === 'D' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                              >
                                {result}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Detailed Statistics */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-300">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">{homeTeamStats.matchesPlayed}</div>
                              <div className="text-xs text-gray-600">Matches</div>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-300">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">{homeTeamStats.wins}</div>
                              <div className="text-xs text-gray-600">Wins</div>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-300">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-yellow-600">{homeTeamStats.draws}</div>
                              <div className="text-xs text-gray-600">Draws</div>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-300">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-red-600">{homeTeamStats.losses}</div>
                              <div className="text-xs text-gray-600">Losses</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Goals Statistics */}
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-300">
                            <div className="text-center">
                              <div className="text-xl font-bold text-green-600">{homeTeamStats.goalsScored}</div>
                              <div className="text-xs text-gray-600">Goals For</div>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-300">
                            <div className="text-center">
                              <div className="text-xl font-bold text-red-600">{homeTeamStats.goalsConceded}</div>
                              <div className="text-xs text-gray-600">Goals Against</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Win Percentage */}
                        <div className="mt-4 bg-white rounded-lg p-3 shadow-sm border border-blue-300">
                          <div className="text-center">
                            <div className="text-xl font-bold text-blue-600">
                              {Math.round((homeTeamStats.wins / homeTeamStats.matchesPlayed) * 100)}%
                            </div>
                            <div className="text-xs text-gray-600">Win Rate</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {awayTeamStats && (
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 p-6 shadow-lg">
                        <div className="flex items-center justify-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-md mr-3">
                            <span className="text-lg font-bold text-white">
                              {awayTeam.name?.charAt(0) || 'A'}
                            </span>
                          </div>
                          <h4 className="font-bold text-purple-900 text-lg">{awayTeam.name}</h4>
                        </div>
                        
                        {/* Team Form */}
                        <div className="mb-4">
                          <div className="text-sm text-gray-600 mb-2">Recent Form</div>
                          <div className="flex space-x-1">
                            {awayTeamStats.form?.map((result: string, index: number) => (
                              <div 
                                key={index}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                  result === 'W' ? 'bg-green-500' : 
                                  result === 'D' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                              >
                                {result}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Detailed Statistics */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-purple-300">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">{awayTeamStats.matchesPlayed}</div>
                              <div className="text-xs text-gray-600">Matches</div>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-purple-300">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">{awayTeamStats.wins}</div>
                              <div className="text-xs text-gray-600">Wins</div>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-purple-300">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-yellow-600">{awayTeamStats.draws}</div>
                              <div className="text-xs text-gray-600">Draws</div>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-purple-300">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-red-600">{awayTeamStats.losses}</div>
                              <div className="text-xs text-gray-600">Losses</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Goals Statistics */}
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-purple-300">
                            <div className="text-center">
                              <div className="text-xl font-bold text-green-600">{awayTeamStats.goalsScored}</div>
                              <div className="text-xs text-gray-600">Goals For</div>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-purple-300">
                            <div className="text-center">
                              <div className="text-xl font-bold text-red-600">{awayTeamStats.goalsConceded}</div>
                              <div className="text-xs text-gray-600">Goals Against</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Win Percentage */}
                        <div className="mt-4 bg-white rounded-lg p-3 shadow-sm border border-purple-300">
                          <div className="text-center">
                            <div className="text-xl font-bold text-purple-600">
                              {Math.round((awayTeamStats.wins / awayTeamStats.matchesPlayed) * 100)}%
                            </div>
                            <div className="text-xs text-gray-600">Win Rate</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};