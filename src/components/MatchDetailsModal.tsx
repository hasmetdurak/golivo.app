import React, { useState, useEffect } from 'react';
import { FootballApi } from '../services/api';
import { X, Calendar, MapPin, User, Clock, Trophy, Activity, Target, Users, TrendingUp } from 'lucide-react';

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
  
  // Güvenlik kontrolü - match yoksa modal'ı açma
  if (!isOpen || !match || typeof match !== 'object') {
    return null;
  }

  // Başlayacak maçlar için head-to-head ve takım istatistiklerini yükle
  useEffect(() => {
    if (match && match.status === 'scheduled') {
      loadMatchPreviewData();
    }
  }, [match]);

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
  const safeMatch = match && typeof match === 'object' ? match : {};
  const homeTeam = safeMatch.homeTeam && typeof safeMatch.homeTeam === 'object' ? safeMatch.homeTeam : { name: 'Ev Sahibi', logo: '' };
  const awayTeam = safeMatch.awayTeam && typeof safeMatch.awayTeam === 'object' ? safeMatch.awayTeam : { name: 'Deplasman', logo: '' };
  const status = safeMatch.status || 'scheduled';
  const minute = safeMatch.minute || '';
  const time = safeMatch.time || '00:00';
  const venue = safeMatch.venue || 'Bilinmeyen Stadyum';
  const referee = safeMatch.referee || 'Bilinmeyen Hakem';
  const league = safeMatch.league || 'Bilinmeyen Lig';
  const homeScore = typeof safeMatch.homeScore === 'number' ? safeMatch.homeScore : 0;
  const awayScore = typeof safeMatch.awayScore === 'number' ? safeMatch.awayScore : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Maç Detayları</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-6 mt-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Match Info */}
        <div className="p-6">
          {/* Teams and Score */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 flex-1">
              <img 
                src={homeTeam.logo || 'https://via.placeholder.com/60x60/3B82F6/FFFFFF?text=H'} 
                alt={homeTeam.name}
                className="w-12 h-12 object-contain rounded-lg bg-gray-100 p-1"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/60x60/3B82F6/FFFFFF?text=H';
                }}
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{homeTeam.name}</h3>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 px-6">
              <div className="text-3xl font-bold text-gray-900">{homeScore}</div>
              <div className="text-2xl font-medium text-gray-400">:</div>
              <div className="text-3xl font-bold text-gray-900">{awayScore}</div>
            </div>
            
            <div className="flex items-center space-x-4 flex-1 justify-end">
              <div className="text-right">
                <h3 className="text-lg font-semibold text-gray-900">{awayTeam.name}</h3>
              </div>
              <img 
                src={awayTeam.logo || 'https://via.placeholder.com/60x60/3B82F6/FFFFFF?text=A'} 
                alt={awayTeam.name}
                className="w-12 h-12 object-contain rounded-lg bg-gray-100 p-1"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/60x60/3B82F6/FFFFFF?text=A';
                }}
              />
            </div>
          </div>

          {/* Match Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Trophy className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Lig</span>
              </div>
              <p className="text-gray-900">{league}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Durum</span>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                {getStatusText(status, minute)}
              </span>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Saat</span>
              </div>
              <p className="text-gray-900">{time}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Stadyum</span>
              </div>
              <p className="text-gray-900">{venue}</p>
            </div>
          </div>

          {/* Loading State */}
          {isLoadingH2H && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Veriler yükleniyor...</p>
            </div>
          )}

          {/* Head to Head */}
          {!isLoadingH2H && headToHeadData.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Son Karşılaşmalar
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  {headToHeadData.slice(0, 5).map((h2h, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{h2h.date}</span>
                      <span className="text-gray-900">{h2h.result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Team Stats */}
          {(homeTeamStats || awayTeamStats) && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Takım İstatistikleri
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {homeTeamStats && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{homeTeam.name}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Form:</span>
                        <span className="text-gray-900">{homeTeamStats.form || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gol Ortalaması:</span>
                        <span className="text-gray-900">{homeTeamStats.avgGoals || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {awayTeamStats && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{awayTeam.name}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Form:</span>
                        <span className="text-gray-900">{awayTeamStats.form || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gol Ortalaması:</span>
                        <span className="text-gray-900">{awayTeamStats.avgGoals || 'N/A'}</span>
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
  );
};