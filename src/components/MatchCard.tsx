import React from 'react';

interface MatchCardProps {
  match: any;
  onClick?: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onClick }) => {
  // Güvenli veri erişimi için varsayılan değerler
  const safeMatch = match || {};
  const homeTeam = safeMatch.homeTeam || { name: 'Home Team', logo: '' };
  const awayTeam = safeMatch.awayTeam || { name: 'Away Team', logo: '' };
  
  const isLive = safeMatch.status === 'live';
  const isFinished = safeMatch.status === 'finished';
  const isScheduled = !isLive && !isFinished;
  
  const getMatchTime = () => {
    if (isLive && safeMatch.minute) {
      return `${safeMatch.minute} CANLI`;
    }
    if (isFinished) {
      return 'MS'; // Maç Sonu
    }
    return safeMatch.time || '00:00';
  };
  
  const getHalfTimeScore = () => {
    if (isFinished || isLive) {
      // Güvenli skor erişimi
      const homeScore = parseInt(safeMatch.homeScore) || 0;
      const awayScore = parseInt(safeMatch.awayScore) || 0;
      const htHome = Math.floor(homeScore / 2);
      const htAway = Math.floor(awayScore / 2);
      return `İY ${htHome}-${htAway}`;
    }
    return null;
  };
  
  // Güvenli skor değerleri
  const homeScore = !isScheduled ? (parseInt(safeMatch.homeScore) || 0) : '-';
  const awayScore = !isScheduled ? (parseInt(safeMatch.awayScore) || 0) : '-';
  
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-[1.02] ${
      isLive 
        ? 'border-red-200 bg-gradient-to-r from-red-50/50 to-white' 
        : isFinished 
        ? 'border-gray-200 bg-gradient-to-r from-gray-50/30 to-white' 
        : 'border-blue-200 bg-gradient-to-r from-blue-50/30 to-white'
    }`}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) {
          try {
            onClick();
          } catch (error) {
            console.error('Error handling match click:', error);
          }
        }
      }}
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
            {getMatchTime()}
          </div>
          {isLive && (
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-white">CANLI</span>
            </div>
          )}
        </div>
        
        {/* Half Time Score */}
        {getHalfTimeScore() && (
          <span className="text-xs text-white/90 bg-white/20 px-2 py-1 rounded">
            {getHalfTimeScore()}
          </span>
        )}
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
                {homeTeam.name}
              </div>
              <div className="text-xs text-gray-500 truncate">Ev Sahibi</div>
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
            {/* Minute Information */}
            {(isLive || safeMatch.minute) && (
              <div className={`text-sm font-bold ${
                isLive ? 'text-red-600' : 
                isFinished ? 'text-gray-700' : 'text-gray-400'
              }`}>
                {safeMatch.minute || (isScheduled ? safeMatch.time : '')}
              </div>
            )}
            {isFinished && !safeMatch.minute && (
              <div className="text-xs text-gray-500 font-medium">
                Full Time
              </div>
            )}
            {isScheduled && !safeMatch.minute && (
              <div className="text-xs text-gray-500 font-medium">
                {safeMatch.time || '00:00'}
              </div>
            )}
          </div>
          
          {/* Away Team */}
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <div className="flex-1 min-w-0 text-right">
              <div className="font-semibold text-gray-900 text-sm truncate">
                {awayTeam.name}
              </div>
              <div className="text-xs text-gray-500 truncate">Deplasman</div>
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
        
        {/* Match Events Timeline - Two Column Layout */}
        {safeMatch.events && safeMatch.events.length > 0 && (
          <div className="mt-3 border-t pt-3">
            <div className="text-xs text-gray-500 mb-3 font-medium text-center">Maç Olayları</div>
            <div className="grid grid-cols-2 gap-3">
              {/* Home Team Events */}
              <div className="space-y-1">
                <div className="text-xs text-gray-400 font-medium text-center">Ev Sahibi</div>
                <div className="space-y-1">
                  {safeMatch.events.filter((event: any) => event && event.team === 'home').map((event: any, index: number) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-2 px-2 py-1 rounded text-xs ${
                        event.type === 'Goal' 
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : event.type === 'Yellow Card'
                          ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                          : event.type === 'Red Card'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      <span className="text-xs">{event.icon || '⚽'}</span>
                      <span className="text-xs font-bold">{event.minute || '0'}</span>
                      <span 
                        className="text-xs truncate flex-1 text-blue-600"
                        title={event.player || 'Unknown'}
                      >
                        {(event.player || 'Unknown').split(' ').slice(-1)[0]}
                      </span>
                    </div>
                  ))}
                  {safeMatch.events.filter((event: any) => event && event.team === 'home').length === 0 && (
                    <div className="text-xs text-gray-400 italic text-center py-2">Olay yok</div>
                  )}
                </div>
              </div>
              
              {/* Away Team Events */}
              <div className="space-y-1">
                <div className="text-xs text-gray-400 font-medium text-center">Deplasman</div>
                <div className="space-y-1">
                  {safeMatch.events.filter((event: any) => event && event.team === 'away').map((event: any, index: number) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-2 px-2 py-1 rounded text-xs ${
                        event.type === 'Goal' 
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : event.type === 'Yellow Card'
                          ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                          : event.type === 'Red Card'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      <span className="text-xs">{event.icon || '⚽'}</span>
                      <span className="text-xs font-bold">{event.minute || '0'}</span>
                      <span 
                        className="text-xs truncate flex-1 text-purple-600"
                        title={event.player || 'Unknown'}
                      >
                        {(event.player || 'Unknown').split(' ').slice(-1)[0]}
                      </span>
                    </div>
                  ))}
                  {safeMatch.events.filter((event: any) => event && event.team === 'away').length === 0 && (
                    <div className="text-xs text-gray-400 italic text-center py-2">Olay yok</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};