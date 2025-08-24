import React from 'react';

interface MatchCardProps {
  match: any;
  onClick?: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = React.memo(({ match, onClick }) => {
  // Güvenli veri erişimi
  if (!match) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-4 text-center text-gray-500">
        Geçersiz maç verisi
      </div>
    );
  }

  // Temel veriler
  const homeTeam = match.homeTeam || { name: 'Home Team', logo: '' };
  const awayTeam = match.awayTeam || { name: 'Away Team', logo: '' };
  
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';
  const isScheduled = match.status === 'scheduled';
  
  // Dakika bilgisini güvenli şekilde al
  const minuteInfo = match.minute || null;
  
  // Skor bilgilerini güvenli şekilde al
  const homeScore = match.homeScore !== undefined ? match.homeScore : '-';
  const awayScore = match.awayScore !== undefined ? match.awayScore : '-';

  // Maç zamanı gösterimi
  const getTimeDisplay = () => {
    if (isLive) {
      if (minuteInfo) {
        return minuteInfo;
      }
      return 'CANLI';
    }
    if (isFinished) {
      return 'MS';
    }
    return match.time || '00:00';
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
                alt={homeTeam.name}
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
                alt={awayTeam.name}
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