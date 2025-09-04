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
        Invalid match data
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
  
  // Dakika bilgisini güvenli şekilde al - DÜZELTME
  const minuteInfo = match.minute && typeof match.minute === 'string' 
    ? match.minute 
    : (match.minute && typeof match.minute === 'number' ? match.minute.toString() : null);

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

  // Maç zamanı gösterimi - TEK FONKSIYON (DUPLICATE KALDIRILDI)
  const getTimeDisplay = () => {
    try {
      if (isLive) {
        // Dakika bilgisini daha iyi göster
        if (minuteInfo && minuteInfo !== '0' && minuteInfo !== 'null' && minuteInfo !== '') {
          // Dakika sayısını temizle ve formatla
          const cleanMinute = minuteInfo.toString().replace(/[^0-9]/g, '');
          if (cleanMinute && parseInt(cleanMinute) >= 0) {
            return `${cleanMinute}'`;
          }
        }
        // Fallback için LIVE göster
        return 'LIVE';
      }
      if (isFinished) {
        return 'FT';
      }
      
      // Zaman bilgisi kontrolü
      if (match.time && typeof match.time === 'string') {
        return match.time;
      }
      
      return '00:00';
    } catch (error) {
      console.error('Time display error:', error);
      return 'LIVE';
    }
  };

  // Debug için console log ekle
  if (isLive) {
    console.log('🔴 Live Match Debug:', {
      matchId: match.id,
      minuteInfo: minuteInfo,
      minute: match.minute,
      status: status,
      isLive: isLive,
      timeDisplay: getTimeDisplay()
    });
  }

  // Tıklama olayı - güvenli şekilde aktif
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      console.log('Match card clicked:', match.id || 'No ID');
      
      // onClick fonksiyonunun var olup olmadığını kontrol et
      if (onClick && typeof onClick === 'function') {
        // setTimeout ile asenkron çalıştır - daha güvenli
        setTimeout(() => {
          try {
            onClick();
          } catch (error) {
            console.error('onClick function error:', error);
            alert('An error occurred while opening match details. Please try again.');
          }
        }, 100);
      }
    } catch (error) {
      console.error('Match click error:', error);
      alert('An error occurred while loading match details. Please try again.');
    }
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-[1.02] ${
        isLive 
          ? 'border-red-200 bg-gradient-to-r from-red-50 to-orange-50' 
          : isFinished 
            ? 'border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50'
            : 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50'
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as any);
        }
      }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className="flex items-center space-x-3 flex-1">
            <img 
              src={homeTeam.logo || '/placeholder-logo.svg'} 
              alt={homeTeam.name}
              className="w-8 h-8 object-contain rounded-full"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-logo.svg';
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 truncate">{homeTeam.name}</div>
              <div className="text-xs text-gray-500">{homeFlag}</div>
            </div>
          </div>
          
          {/* Score and Time */}
          <div className="flex flex-col items-center space-y-2 px-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-gray-900">{homeScore}</span>
              <span className="text-gray-400">-</span>
              <span className="text-2xl font-bold text-gray-900">{awayScore}</span>
            </div>
            
            {/* Time/Status Display - ENHANCED */}
            <div className="text-center">
              <div className={`text-sm font-bold px-2 py-1 rounded ${
                isLive 
                  ? 'text-red-600 bg-red-100 animate-pulse' 
                  : isFinished 
                    ? 'text-gray-600 bg-gray-100'
                    : 'text-blue-600 bg-blue-100'
              }`}>
                {getTimeDisplay()}
              </div>
              {isLive && (
                <div className="text-xs text-red-500 font-medium mt-1 animate-pulse">
                  LIVE
                </div>
              )}
            </div>
          </div>
          
          {/* Away Team */}
          <div className="flex items-center space-x-3 flex-1 justify-end">
            <div className="flex-1 min-w-0 text-right">
              <div className="font-semibold text-gray-900 truncate">{awayTeam.name}</div>
              <div className="text-xs text-gray-500">{awayFlag}</div>
            </div>
            <img 
              src={awayTeam.logo || '/placeholder-logo.svg'} 
              alt={awayTeam.name}
              className="w-8 h-8 object-contain rounded-full"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-logo.svg';
              }}
            />
          </div>
        </div>
        
        {/* Match Info */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{match.league || 'Unknown League'}</span>
            {match.venue && <span>{match.venue}</span>}
          </div>
        </div>
      </div>
    </div>
  );
});

MatchCard.displayName = 'MatchCard';