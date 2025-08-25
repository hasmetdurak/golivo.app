import React from 'react';
import { getCountryFlag } from '../services/api';

interface MatchCardProps {
  match: any;
  onClick?: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = React.memo(({ match, onClick }) => {
  // Güvenli veri erişimi - daha sağlam hata önleyici
  if (!match || typeof match !== 'object') {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-4 text-center text-gray-500">
        Geçersiz maç verisi
      </div>
    );
  }

  // Temel veriler - hata önleyici erişim
  const homeTeam = match.homeTeam && typeof match.homeTeam === 'object' 
    ? match.homeTeam 
    : { name: 'Home Team', logo: '', country: '' };
    
  const awayTeam = match.awayTeam && typeof match.awayTeam === 'object' 
    ? match.awayTeam 
    : { name: 'Away Team', logo: '', country: '' };
  
  // Durum kontrolü - varsayılan değerlerle
  const status = match.status && typeof match.status === 'string' 
    ? match.status 
    : 'scheduled';
    
  const isLive = status === 'live';
  const isFinished = status === 'finished';
  const isScheduled = status === 'scheduled';
  
  // Dakika bilgisini güvenli şekilde al
  const minuteInfo = match.minute && typeof match.minute === 'string' 
    ? match.minute 
    : null;
  
  // Skor bilgilerini güvenli şekilde al - sayıya çevirme hatası önleyici
  const homeScore = match.homeScore !== undefined 
    ? (typeof match.homeScore === 'number' ? match.homeScore : 
       (typeof match.homeScore === 'string' ? parseInt(match.homeScore) || 0 : 0))
    : 0;
    
  const awayScore = match.awayScore !== undefined 
    ? (typeof match.awayScore === 'number' ? match.awayScore : 
       (typeof match.awayScore === 'string' ? parseInt(match.awayScore) || 0 : 0))
    : 0;

  // Ülke bayraklarını al
  const homeFlag = getCountryFlag(homeTeam.country || '');
  const awayFlag = getCountryFlag(awayTeam.country || '');

  // Maç zamanı gösterimi - hata önleyici
  const getTimeDisplay = () => {
    try {
      if (isLive) {
        return 'CANLI';
      }
      if (isFinished) {
        return 'MS';
      }
      
      // Zaman bilgisi kontrolü
      if (match.time && typeof match.time === 'string') {
        return match.time;
      }
      
      return '00:00';
    } catch (error) {
      console.error('Zaman gösterimi hatası:', error);
      return '00:00';
    }
  };

  // Tıklama olayı - güvenli şekilde aktif
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      console.log('Maç kartına tıklandı:', match.id || 'ID yok');
      
      if (onClick && typeof onClick === 'function') {
        onClick();
      }
    } catch (error) {
      console.error('Maç tıklama hatası:', error);
      // Hata durumunda kullanıcıya bilgi ver
      alert('Maç detayları yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-[1.02] ${
        isLive 
          ? 'border-red-200 bg-gradient-to-r from-red-50/50 to-white' 
          : isFinished 
          ? 'border-gray-200 bg-gradient-to-r from-gray-50/30 to-white' 
          : 'border-blue-200 bg-gradient-to-r from-blue-50/30 to-white'
      }`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as any);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${homeTeam.name} vs ${awayTeam.name} maç detayları`}
    >
      {/* Header - Lig ve Durum */}
      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1.5">
              {/* Modern kupa ikonu */}
              <div className="relative">
                <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                </div>
                <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-yellow-400 rounded-sm"></div>
              </div>
              <span className="text-xs font-medium text-gray-600 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full border border-gray-200/50 shadow-sm">
                {match.league || 'Bilinmeyen Lig'}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${
              isLive 
                ? 'text-red-600 bg-red-50 border border-red-200/50' 
                : isFinished 
                ? 'text-gray-600 bg-gray-50 border border-gray-200/50' 
                : 'text-blue-600 bg-blue-50 border border-blue-200/50'
            }`}>
              {/* Modern durum ikonu */}
              <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                isLive 
                  ? 'bg-red-500 animate-pulse' 
                  : isFinished 
                  ? 'bg-gray-400' 
                  : 'bg-blue-500'
              }`}></div>
              {getTimeDisplay()}
            </span>
            {isLive && minuteInfo && (
              <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200/50 px-2 py-1 rounded-full shadow-sm">
                {minuteInfo}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Teams and Score */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{homeFlag}</span>
              {homeTeam.logo && (
                <img 
                  src={homeTeam.logo} 
                  alt={homeTeam.name}
                  className="w-8 h-8 object-contain rounded-lg bg-gray-100 p-1"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {homeTeam.name}
              </h3>
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center space-x-3 px-4">
            <div className="text-xl font-bold text-gray-900 min-w-[2rem] text-center">
              {homeScore}
            </div>
            <div className="text-lg font-medium text-gray-400">:</div>
            <div className="text-xl font-bold text-gray-900 min-w-[2rem] text-center">
              {awayScore}
            </div>
          </div>
          
          {/* Dakika bilgisi skorun altında */}
          {minuteInfo && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-8">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isLive 
                  ? 'text-red-600 bg-red-100 border border-red-200' 
                  : 'text-gray-600 bg-gray-100 border border-gray-200'
              }`}>
                {minuteInfo}
              </span>
            </div>
          )}

          {/* Away Team */}
          <div className="flex items-center space-x-3 flex-1 justify-end">
            <div className="min-w-0 flex-1 text-right">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {awayTeam.name}
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              {awayTeam.logo && (
                <img 
                  src={awayTeam.logo} 
                  alt={awayTeam.name}
                  className="w-8 h-8 object-contain rounded-lg bg-gray-100 p-1"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <span className="text-2xl">{awayFlag}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Additional Info */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{match.venue || 'Bilinmeyen Stadyum'}</span>
          <span>{match.referee || 'Bilinmeyen Hakem'}</span>
        </div>
      </div>
    </div>
  );
});