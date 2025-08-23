import React from 'react';

interface MatchCardProps {
  match: any;
  onClick?: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onClick }) => {
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';
  const isScheduled = !isLive && !isFinished;
  
  const getMatchTime = () => {
    if (isLive && match.minute) {
      return `${match.minute} CANLI`;
    }
    if (isFinished) {
      return 'MS'; // Maç Sonu
    }
    return match.time || '00:00';
  };
  
  const getHalfTimeScore = () => {
    if (isFinished || isLive) {
      // Simulate half-time score for demo
      const htHome = Math.floor(match.homeScore / 2);
      const htAway = Math.floor(match.awayScore / 2);
      return `İY ${htHome}-${htAway}`;
    }
    return null;
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
      onClick={onClick}
    >
      
      {/* Status Header */}
      <div className={`px-4 py-2 border-b flex items-center justify-between ${
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
      
      <div className="px-4 py-4">
        {/* Teams Side by Side */}
        <div className="flex items-center justify-between space-x-4">
          {/* Home Team */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="relative">
              <img 
                src={match.homeTeam.logo} 
                alt={match.homeTeam.name}
                className="w-10 h-10 object-contain rounded-lg bg-white shadow-sm p-1"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=H';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm truncate">
                {match.homeTeam.name}
              </div>
              <div className="text-xs text-gray-500 truncate">Ev Sahibi</div>
            </div>
          </div>
          
          {/* Score Display */}
          <div className="flex items-center space-x-3 px-4">
            <div className={`text-2xl font-bold ${
              isLive ? 'text-red-600' : 
              isFinished ? 'text-gray-700' : 'text-gray-400'
            }`}>
              {isScheduled ? '-' : match.homeScore}
            </div>
            <div className="text-gray-400 font-medium">:</div>
            <div className={`text-2xl font-bold ${
              isLive ? 'text-red-600' : 
              isFinished ? 'text-gray-700' : 'text-gray-400'
            }`}>
              {isScheduled ? '-' : match.awayScore}
            </div>
          </div>
          
          {/* Away Team */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="flex-1 min-w-0 text-right">
              <div className="font-semibold text-gray-900 text-sm truncate">
                {match.awayTeam.name}
              </div>
              <div className="text-xs text-gray-500 truncate">Deplasman</div>
            </div>
            <div className="relative">
              <img 
                src={match.awayTeam.logo} 
                alt={match.awayTeam.name}
                className="w-10 h-10 object-contain rounded-lg bg-white shadow-sm p-1"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=A';
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Latest Goal for Live Matches */}
        {isLive && match.events && match.events.length > 0 && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
              <span className="text-red-600">⚽</span>
              <span className="text-sm text-red-700 font-medium">
                {match.events[match.events.length - 1].player} 
                <span className="text-red-500 ml-1">{match.events[match.events.length - 1].minute}</span>
              </span>
            </div>
          </div>
        )}
        
        {/* Match Events Timeline - Show all events */}
        {match.events && match.events.length > 0 && (
          <div className="mt-4 border-t pt-3">
            <div className="text-xs text-gray-500 mb-2 font-medium">Maç Olayları</div>
            <div className="flex flex-wrap gap-2 max-h-16 overflow-y-auto">
              {match.events.map((event: any, index: number) => (
                <div 
                  key={index}
                  className={`inline-flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${
                    event.type === 'Goal' 
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : event.type === 'Yellow Card'
                      ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                      : event.type === 'Red Card'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  <span className="text-xs">{event.icon}</span>
                  <span className="text-xs font-bold">{event.minute}</span>
                  <span 
                    className={`text-xs truncate max-w-20 ${
                      event.team === 'home' ? 'text-blue-600' : 'text-purple-600'
                    }`}
                    title={event.player}
                  >
                    {event.player.split(' ').slice(-1)[0]} {/* Sadece soyad */}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};