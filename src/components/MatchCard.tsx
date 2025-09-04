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
        // Dakika bilgisini daha iyi göster
        if (minuteInfo && minuteInfo !== '0' && minuteInfo !== 'null') {
          // Dakika sayısını temizle ve formatla
          const cleanMinute = minuteInfo.replace(/[^0-9]/g, '');
          if (cleanMinute && parseInt(cleanMinute) > 0) {
            return `${cleanMinute}'`;
          }
        }
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
      
      // onClick fonksiyonunun var olup olmadığını kontrol et
      if (onClick && typeof onClick === 'function') {
        // setTimeout ile asenkron çalıştır - daha güvenli
        setTimeout(() => {
          try {
            onClick();
          } catch (error) {
            console.error('onClick fonksiyonu hatası:', error);
            // Hata durumunda kullanıcıya bilgi ver
            alert('Maç detayları açılırken bir hata oluştu. Lütfen tekrar deneyin.');
          }
        }, 100);
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
      {/* Canlı maç animasyonu */}
      {isLive && (
        <div className="absolute top-2 right-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-red-600">CANLI</span>
          </div>
        </div>
      )}

      <div className="p-4">
        {/* Lig bilgisi */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {match.league && (
              <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                {match.league}
              </span>
            )}
            {match.country && (
              <span className="text-xs text-gray-500">
                {match.country}
              </span>
            )}
          </div>
          <div className="text-xs font-semibold text-gray-700">
            {getTimeDisplay()}
          </div>
        </div>

        {/* Takım bilgileri */}
        <div className="space-y-3">
          {/* Ev sahibi takım */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                {homeTeam.logo ? (
                  <img 
                    src={homeTeam.logo} 
                    alt={homeTeam.name}
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-xs font-bold text-gray-600">
                    {homeTeam.name?.charAt(0) || 'H'}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-900 truncate">
                  {homeTeam.name || 'Ev Sahibi'}
                </div>
                {homeTeam.country && (
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">{homeFlag}</span>
                    <span className="text-xs text-gray-500">{homeTeam.country}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 ml-4">
              {homeScore}
            </div>
          </div>

          {/* Deplasman takımı */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                {awayTeam.logo ? (
                  <img 
                    src={awayTeam.logo} 
                    alt={awayTeam.name}
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-xs font-bold text-gray-600">
                    {awayTeam.name?.charAt(0) || 'D'}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-900 truncate">
                  {awayTeam.name || 'Deplasman'}
                </div>
                {awayTeam.country && (
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">{awayFlag}</span>
                    <span className="text-xs text-gray-500">{awayTeam.country}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 ml-4">
              {awayScore}
            </div>
          </div>
        </div>

        {/* Maç durumu ve ek bilgiler */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className={`px-2 py-1 rounded-full font-medium ${
              isLive 
                ? 'bg-red-100 text-red-700' 
                : isFinished 
                  ? 'bg-gray-100 text-gray-700'
                  : 'bg-blue-100 text-blue-700'
            }`}>
              {isLive ? 'CANLI' : isFinished ? 'TAMAMLANDI' : 'BAŞLAYACAK'}
            </span>
            {match.venue && (
              <span className="truncate max-w-32">
                📍 {match.venue}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

MatchCard.displayName = 'MatchCard';