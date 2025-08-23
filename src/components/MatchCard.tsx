import React from 'react';
import { Clock, Calendar, Trophy, Target } from 'lucide-react';

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
    <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-2xl transform hover:scale-[1.02] ${
      isLive 
        ? 'bg-gradient-to-r from-red-50 via-orange-50 to-red-50 border-red-200 shadow-lg shadow-red-100' 
        : isFinished 
        ? 'bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200 shadow-md' 
        : 'bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-blue-200 shadow-md'
    }`}>
      
      {/* Live indicator stripe */}
      {isLive && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 animate-pulse"></div>
      )}
      
      <div className="p-6">
        {/* Status and Time Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {isLive && (
              <div className="flex items-center space-x-2 bg-red-600 px-4 py-2 rounded-full shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-white tracking-wider">LIVE</span>
              </div>
            )}
            {isFinished && (
              <div className="bg-slate-600 px-4 py-2 rounded-full shadow-md">
                <span className="text-xs font-bold text-white">FINISHED</span>
              </div>
            )}
            {isScheduled && (
              <div className="bg-blue-600 px-4 py-2 rounded-full shadow-md">
                <span className="text-xs font-bold text-white">UPCOMING</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-xl ${
              isLive ? 'bg-red-100 text-red-700' : 
              isFinished ? 'bg-slate-100 text-slate-700' : 
              'bg-blue-100 text-blue-700'
            }`}>
              <Clock className="h-4 w-4" />
              <span className="text-sm font-bold">{getMatchTime()}</span>
            </div>
          </div>
        </div>
        
        {/* Teams and Score */}
        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative">
              <img 
                src={match.homeTeam.logo} 
                alt={match.homeTeam.name}
                className="w-12 h-12 object-contain rounded-lg shadow-md bg-white p-1"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/48x48/3B82F6/FFFFFF?text=?';
                }}
              />
              {isLive && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-700 transition-colors">
                {match.homeTeam.name}
              </h3>
              <p className="text-sm text-slate-500 font-medium">Home</p>
            </div>
          </div>
          
          {/* Score */}
          <div className="mx-8">
            <div className={`flex items-center justify-center space-x-4 px-6 py-4 rounded-2xl shadow-lg border-2 ${
              isLive 
                ? 'bg-gradient-to-r from-red-600 to-orange-600 border-red-300 text-white' 
                : isFinished 
                ? 'bg-gradient-to-r from-slate-600 to-slate-700 border-slate-300 text-white' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-300 text-white'
            }`}>
              <span className="text-3xl font-bold">{match.homeScore}</span>
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 bg-white rounded-full mb-1"></div>
                <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
              </div>
              <span className="text-3xl font-bold">{match.awayScore}</span>
            </div>
            {isLive && match.events && match.events.length > 0 && (
              <div className="text-center mt-2">
                <span className="text-xs text-red-600 font-semibold bg-red-100 px-2 py-1 rounded-full">
                  {match.events[match.events.length - 1].player} {match.events[match.events.length - 1].minute}'
                </span>
              </div>
            )}
          </div>
          
          {/* Away Team */}
          <div className="flex items-center space-x-4 flex-1 flex-row-reverse">
            <div className="relative">
              <img 
                src={match.awayTeam.logo} 
                alt={match.awayTeam.name}
                className="w-12 h-12 object-contain rounded-lg shadow-md bg-white p-1"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/48x48/3B82F6/FFFFFF?text=?';
                }}
              />
              {isLive && (
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <div className="flex-1 text-right">
              <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-700 transition-colors">
                {match.awayTeam.name}
              </h3>
              <p className="text-sm text-slate-500 font-medium">Away</p>
            </div>
          </div>
        </div>
        
        {/* Additional Info for Live Matches */}
        {isLive && (
          <div className="mt-4 pt-4 border-t border-red-200">
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-red-600">
                <Target className="h-4 w-4" />
                <span className="font-medium">Live Updates</span>
              </div>
              <div className="w-px h-4 bg-red-300"></div>
              <div className="flex items-center space-x-1 text-slate-600">
                <Trophy className="h-4 w-4" />
                <span className="font-medium">{match.league}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};