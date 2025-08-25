import React, { useState, useEffect, useCallback } from 'react';
import { FootballApi } from '../services/api';
import { X, Calendar, MapPin, User, Clock, Trophy, Activity, Target, Users, TrendingUp, AlertCircle } from 'lucide-react';

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
  const [error, setError] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  
  // Güvenlik kontrolü - match yoksa modal'ı açma
  if (!isOpen || !match || typeof match !== 'object') {
    return null;
  }

  // Modal kapatma işlemi - güvenli şekilde
  const handleClose = useCallback(() => {
    try {
      setIsClosing(true);
      // Kısa bir gecikme ile modal'ı kapat - animasyon için
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
      console.error('Modal kapatma hatası:', error);
      // Hata durumunda zorla kapat
      setIsClosing(false);
      onClose();
    }
  }, [onClose]);

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Body scroll'unu engelle
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  // Başlayacak maçlar için head-to-head ve takım istatistiklerini yükle
  useEffect(() => {
    if (match && match.status === 'scheduled' && isOpen) {
      loadMatchPreviewData();
    }
  }, [match, isOpen]);

  const loadMatchPreviewData = async () => {
    if (!match || match.status !== 'scheduled') return;
    
    setIsLoadingH2H(true);
    setError(null);
    
    try {
      // Head-to-head verilerini yükle - güvenli şekilde
      try {
        const h2hData = await FootballApi.getHeadToHead(match.homeTeam?.name || '', match.awayTeam?.name || '');
        setHeadToHeadData(Array.isArray(h2hData) ? h2hData : []);
      } catch (error) {
        console.error('Error loading H2H data:', error);
        setHeadToHeadData([]);
      }
      
      // Takım istatistiklerini yükle - güvenli şekilde
      try {
        const [homeStats, awayStats] = await Promise.all([
          FootballApi.getTeamStats(match.homeTeam?.name || '').catch(() => null),
          FootballApi.getTeamStats(match.awayTeam?.name || '').catch(() => null)
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
      setError('Veri yüklenirken hata oluştu');
      setHeadToHeadData([]);
      setHomeTeamStats(null);
      setAwayTeamStats(null);
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
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                      {homeTeam.logo ? (
                        <img 
                          src={homeTeam.logo} 
                          alt={homeTeam.name}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-2xl font-bold text-gray-600">
                          {homeTeam.name?.charAt(0) || 'H'}
                        </span>
                      )}
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
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                      {awayTeam.logo ? (
                        <img 
                          src={awayTeam.logo} 
                          alt={awayTeam.name}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-2xl font-bold text-gray-600">
                          {awayTeam.name?.charAt(0) || 'D'}
                        </span>
                      )}
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

              {/* Head to Head */}
              {match.status === 'scheduled' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span>Son Karşılaşmalar</span>
                  </h3>
                  
                  {isLoadingH2H ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="text-gray-600 mt-2">Veriler yükleniyor...</p>
                    </div>
                  ) : headToHeadData.length > 0 ? (
                    <div className="space-y-3">
                      {headToHeadData.slice(0, 5).map((h2h, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-gray-600">{h2h.date}</span>
                              <span className="font-medium">{h2h.homeTeam}</span>
                            </div>
                            <span className="font-bold text-lg">{h2h.homeScore} - {h2h.awayScore}</span>
                            <span className="font-medium">{h2h.awayTeam}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>Karşılaşma geçmişi bulunamadı</p>
                    </div>
                  )}
                </div>
              )}

              {/* Team Statistics */}
              {(homeTeamStats || awayTeamStats) && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Takım İstatistikleri</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {homeTeamStats && (
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-3">{homeTeam.name} İstatistikleri</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Oynanan Maç:</span>
                            <span className="font-medium">{homeTeamStats.matchesPlayed || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Galibiyet:</span>
                            <span className="font-medium text-green-600">{homeTeamStats.wins || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Beraberlik:</span>
                            <span className="font-medium text-yellow-600">{homeTeamStats.draws || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Mağlubiyet:</span>
                            <span className="font-medium text-red-600">{homeTeamStats.losses || 0}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {awayTeamStats && (
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-900 mb-3">{awayTeam.name} İstatistikleri</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Oynanan Maç:</span>
                            <span className="font-medium">{awayTeamStats.matchesPlayed || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Galibiyet:</span>
                            <span className="font-medium text-green-600">{awayTeamStats.wins || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Beraberlik:</span>
                            <span className="font-medium text-yellow-600">{awayTeamStats.draws || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Mağlubiyet:</span>
                            <span className="font-medium text-red-600">{awayTeamStats.losses || 0}</span>
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