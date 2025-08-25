import React from 'react';

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
    : { name: 'Home Team', logo: '' };
    
  const awayTeam = match.awayTeam && typeof match.awayTeam === 'object' 
    ? match.awayTeam 
    : { name: 'Away Team', logo: '' };
  
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

  // Maç zamanı gösterimi - hata önleyici
  const getTimeDisplay = () => {
    try {
      if (isLive) {
        if (minuteInfo) {
          return minuteInfo;
        }
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

  // Tıklama olayı - hata yakalama ile
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (onClick && typeof onClick === 'function') {
        onClick();
      }
    } catch (error) {
      console.error('Maç tıklama hatası:', error);
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
    >
      {/* Status Header */}
      <div className={`px-3 py-1.5 border-b flex items-center justify-between ${
        isLive 
          ? 'bg-red-500 border-red-600' 
          : isFinished 
          ? 'bg-gray-500 border-gray-600' 
          : 'bg-blue-500 border-blue-600'
      }`}>
        <div className="flex items-center space-x-2">
          <div className="text-white text-sm font-semibold">
            {getTimeDisplay()}
          </div>
          {isLive && minuteInfo && (
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-white">CANLI</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="px-3 py-3">
        {/* Teams Side by Side */}
        <div className="flex items-center justify-between space-x-4">
          {/* Home Team */}
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <div className="relative">
              <img 
                src={homeTeam.logo || 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=H'} 
                alt={homeTeam.name || 'Home Team'}
                className="w-8 h-8 object-contain rounded-lg bg-white shadow-sm p-0.5"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=H';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm truncate">
                {homeTeam.name || 'Ev Sahibi'}
              </div>
            </div>
          </div>
          
          {/* Score Display */}
          <div className="flex flex-col items-center space-y-1 px-3">
            <div className="flex items-center space-x-2">
              <div className={`text-xl font-bold ${
                isLive ? 'text-red-600' : 
                isFinished ? 'text-gray-700' : 'text-gray-400'
              }`}>
                {homeScore}
              </div>
              <div className="text-gray-400 font-medium">:</div>
              <div className={`text-xl font-bold ${
                isLive ? 'text-red-600' : 
                isFinished ? 'text-gray-700' : 'text-gray-400'
              }`}>
                {awayScore}
              </div>
            </div>
            {/* Dakika bilgisi skorun hemen altında */}
            {isLive && minuteInfo && (
              <div className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                {minuteInfo}'
              </div>
            )}
          </div>
          
          {/* Away Team */}
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <div className="flex-1 min-w-0 text-right">
              <div className="font-semibold text-gray-900 text-sm truncate">
                {awayTeam.name || 'Deplasman'}
              </div>
            </div>
            <div className="relative">
              <img 
                src={awayTeam.logo || 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=A'} 
                alt={awayTeam.name || 'Away Team'}
                className="w-8 h-8 object-contain rounded-lg bg-white shadow-sm p-0.5"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=A';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});