import React from 'react';
import { Clock, TrendingUp } from 'lucide-react';

interface MatchCardProps {
  match: any;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';
  
  return (
    <div className={`bg-gradient-to-r ${
      isLive ? 'from-red-50 to-pink-50 border-l-4 border-red-500' : 
      isFinished ? 'from-gray-50 to-slate-50 border-l-4 border-gray-400' :
      'from-blue-50 to-indigo-50 border-l-4 border-blue-500'
    } rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer group`}>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {isLive && (
            <div className="flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-white tracking-wider">LIVE</span>
            </div>
          )}
          {isFinished && (
            <div className="bg-gray-500 px-3 py-1 rounded-full">
              <span className="text-xs font-bold text-white">FINISHED</span>
            </div>
          )}
          {!isLive && !isFinished && (
            <div className="bg-blue-500 px-3 py-1 rounded-full">
              <span className="text-xs font-bold text-white">SCHEDULED</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {match.minute && (
            <div className="flex items-center space-x-1 text-purple-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{match.minute}'</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-3 flex-1 justify-end">
          <span className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors text-right">
            {match.homeTeam.name}
          </span>
          <img 
            src={match.homeTeam.logo} 
            alt={match.homeTeam.name}
            className="w-8 h-8 object-contain"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/32x32/8B5CF6/FFFFFF?text=?';
            }}
          />
        </div>
        
        <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm min-w-[80px] justify-center">
          <span className={`text-2xl font-bold ${
            isLive ? 'text-red-600' : 
            isFinished ? 'text-gray-600' : 'text-blue-600'
          }`}>
            {match.homeScore}
          </span>
          <span className="text-gray-400 font-medium">-</span>
          <span className={`text-2xl font-bold ${
            isLive ? 'text-red-600' : 
            isFinished ? 'text-gray-600' : 'text-blue-600'
          }`}>
            {match.awayScore}
          </span>
        </div>
        
        <div className="flex items-center space-x-3 flex-1">
          <img 
            src={match.awayTeam.logo} 
            alt={match.awayTeam.name}
            className="w-8 h-8 object-contain"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/32x32/8B5CF6/FFFFFF?text=?';
            }}
          />
          <span className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
            {match.awayTeam.name}
          </span>
        </div>
      </div>
    </div>
  );
};