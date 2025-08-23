import React from 'react';

interface MatchCardProps {
  match: any;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';
  const isScheduled = !isLive && !isFinished;
  
  const getMatchTime = () => {
    if (isLive && match.minute) {
      return `${match.minute} LIVE`;
    }
    if (isFinished) {
      return 'FT';
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
    <div className={`bg-white border-l-4 hover:shadow-sm transition-all duration-200 ${
      isLive 
        ? 'border-red-500 bg-red-50/30' 
        : isFinished 
        ? 'border-gray-300' 
        : 'border-blue-300'
    }`}>
      
      <div className="px-4 py-3">
        {/* Time and Status */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium text-gray-600">
            {getMatchTime()}
          </div>
          {isLive && (
            <div className="flex items-center space-x-1 bg-red-600 px-2 py-1 rounded text-white">
              <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
              <span className="text-xs font-bold">LIVE</span>
            </div>
          )}
        </div>
        
        {/* Teams and Scores */}
        <div className="space-y-2">
          {/* Home Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <img 
                src={match.homeTeam.logo} 
                alt={match.homeTeam.name}
                className="w-6 h-6 object-contain flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/24x24/3B82F6/FFFFFF?text=H';
                }}
              />
              <span className="font-medium text-gray-900 text-sm truncate">
                {match.homeTeam.name}
              </span>
            </div>
            <span className={`text-lg font-bold min-w-[20px] text-center ${
              isLive ? 'text-red-600' : 
              isFinished ? 'text-gray-700' : 'text-gray-400'
            }`}>
              {isScheduled ? '-' : match.homeScore}
            </span>
          </div>
          
          {/* Away Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <img 
                src={match.awayTeam.logo} 
                alt={match.awayTeam.name}
                className="w-6 h-6 object-contain flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/24x24/3B82F6/FFFFFF?text=A';
                }}
              />
              <span className="font-medium text-gray-900 text-sm truncate">
                {match.awayTeam.name}
              </span>
            </div>
            <span className={`text-lg font-bold min-w-[20px] text-center ${
              isLive ? 'text-red-600' : 
              isFinished ? 'text-gray-700' : 'text-gray-400'
            }`}>
              {isScheduled ? '-' : match.awayScore}
            </span>
          </div>
        </div>
        
        {/* Half Time Score */}
        {getHalfTimeScore() && (
          <div className="mt-3 text-center">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {getHalfTimeScore()}
            </span>
          </div>
        )}
        
        {/* Latest Goal for Live Matches */}
        {isLive && match.events && match.events.length > 0 && (
          <div className="mt-3 text-center">
            <span className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded">
              ⚽ {match.events[match.events.length - 1].player} {match.events[match.events.length - 1].minute}'
            </span>
          </div>
        )}
      </div>
    </div>
  );
};