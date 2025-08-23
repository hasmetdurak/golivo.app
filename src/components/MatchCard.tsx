import React from 'react';
import { Clock } from 'lucide-react';

interface MatchCardProps {
  match: any;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';
  const isScheduled = !isLive && !isFinished;
  
  const getMatchTime = () => {
    if (isLive && match.minute) {
      return `${match.minute}'`;
    }
    if (isFinished) {
      return 'FT';
    }
    return match.time || '15:00';
  };
  
  return (
    <div className={`relative bg-white rounded-xl border hover:shadow-md transition-all duration-200 ${
      isLive 
        ? 'border-red-200 shadow-sm shadow-red-100' 
        : isFinished 
        ? 'border-gray-200' 
        : 'border-gray-200'
    }`}>
      
      {/* Live indicator stripe */}
      {isLive && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-500"></div>
      )}
      
      <div className="p-4 sm:p-6">
        {/* Status and Time Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {isLive && (
              <div className="flex items-center space-x-1 bg-red-600 px-2 py-1 rounded-lg">
                <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-white">LIVE</span>
              </div>
            )}
            {isFinished && (
              <div className="bg-gray-500 px-2 py-1 rounded-lg">
                <span className="text-xs font-semibold text-white">FT</span>
              </div>
            )}
            {isScheduled && (
              <div className="bg-gray-100 px-2 py-1 rounded-lg">
                <span className="text-xs font-semibold text-gray-600">{getMatchTime()}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-1 text-gray-500">
            <Clock className="h-3 w-3" />
            <span className="text-xs font-medium">{getMatchTime()}</span>
          </div>
        </div>
        
        {/* Teams and Score - Mobile First Layout */}
        <div className="space-y-4">
          {/* Mobile Layout */}
          <div className="sm:hidden">
            {/* Home Team */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <img 
                  src={match.homeTeam.logo} 
                  alt={match.homeTeam.name}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/32x32/3B82F6/FFFFFF?text=?';
                  }}
                />
                <span className="font-medium text-gray-900 text-sm truncate">
                  {match.homeTeam.name}
                </span>
              </div>
              <span className={`text-xl font-bold min-w-[24px] text-center ${
                isLive ? 'text-red-600' : 
                isFinished ? 'text-gray-600' : 'text-blue-600'
              }`}>
                {match.homeScore}
              </span>
            </div>
            
            {/* Away Team */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <img 
                  src={match.awayTeam.logo} 
                  alt={match.awayTeam.name}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/32x32/3B82F6/FFFFFF?text=?';
                  }}
                />
                <span className="font-medium text-gray-900 text-sm truncate">
                  {match.awayTeam.name}
                </span>
              </div>
              <span className={`text-xl font-bold min-w-[24px] text-center ${
                isLive ? 'text-red-600' : 
                isFinished ? 'text-gray-600' : 'text-blue-600'
              }`}>
                {match.awayScore}
              </span>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between">
            {/* Home Team */}
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <img 
                src={match.homeTeam.logo} 
                alt={match.homeTeam.name}
                className="w-10 h-10 object-contain flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=?';
                }}
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 truncate">
                  {match.homeTeam.name}
                </h3>
                <p className="text-xs text-gray-500">Home</p>
              </div>
            </div>
            
            {/* Score */}
            <div className="flex items-center space-x-3 mx-6">
              <span className={`text-2xl font-bold ${
                isLive ? 'text-red-600' : 
                isFinished ? 'text-gray-600' : 'text-blue-600'
              }`}>
                {match.homeScore}
              </span>
              <div className="w-8 h-0.5 bg-gray-200"></div>
              <span className={`text-2xl font-bold ${
                isLive ? 'text-red-600' : 
                isFinished ? 'text-gray-600' : 'text-blue-600'
              }`}>
                {match.awayScore}
              </span>
            </div>
            
            {/* Away Team */}
            <div className="flex items-center space-x-3 flex-1 min-w-0 flex-row-reverse">
              <img 
                src={match.awayTeam.logo} 
                alt={match.awayTeam.name}
                className="w-10 h-10 object-contain flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=?';
                }}
              />
              <div className="min-w-0 flex-1 text-right">
                <h3 className="font-semibold text-gray-900 truncate">
                  {match.awayTeam.name}
                </h3>
                <p className="text-xs text-gray-500">Away</p>
              </div>
            </div>
          </div>
          
          {/* Last Goal Info for Live Matches */}
          {isLive && match.events && match.events.length > 0 && (
            <div className="border-t border-gray-100 pt-3 mt-3">
              <div className="text-center">
                <span className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded-lg">
                  ⚽ {match.events[match.events.length - 1].player} {match.events[match.events.length - 1].minute}'
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};