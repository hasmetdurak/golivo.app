import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Calendar, Trophy } from 'lucide-react';
import { getOfficialTeamLogo } from '../utils/teamLogos';

interface MatchCardProps {
  match: {
    id: string;
    homeTeam: { name: string; logo: string };
    awayTeam: { name: string; logo: string };
    homeScore?: number;
    awayScore?: number;
    isLive?: boolean;
    minute?: string | null;
    status: 'scheduled' | 'live' | 'halftime' | 'finished';
    time?: string;
    league?: string;
    venue?: string;
  };
  isLive: boolean;
  onClick: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 25px rgba(107, 33, 168, 0.15)",
    transition: { duration: 0.2 }
  }
};

export const MatchCard: React.FC<MatchCardProps> = ({ match, isLive, onClick }) => {
  const getStatusDisplay = () => {
    if (match.status === 'live') {
      return match.minute && match.minute !== '0' ? `${match.minute}` : 'LIVE';
    }
    if (match.status === 'finished') {
      return 'FT';
    }
    return match.time || '00:00';
  };

  const getStatusColor = () => {
    switch (match.status) {
      case 'live':
        return 'from-live-green to-emerald-500';
      case 'finished':
        return 'from-gray-500 to-gray-600';
      default:
        return 'from-purple-500 to-purple-600';
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={onClick}
      className={`
        relative p-4 rounded-xl cursor-pointer transition-all duration-300 group
        ${
          isLive 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 shadow-green-100' 
            : 'bg-cream-light border border-purple-100 hover:border-purple-300'
        }
        hover:shadow-xl hover:bg-white
        before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r 
        before:from-purple-500/0 before:via-purple-500/5 before:to-purple-500/0
        before:opacity-0 group-hover:before:opacity-100 before:transition-opacity
      `}
    >
      {/* Live Indicator */}
      {isLive && (
        <motion.div 
          className="absolute -top-2 -right-2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse font-bold">
            CANLI
          </div>
        </motion.div>
      )}
      
      {/* Match Content - Modern Side by Side Layout */}
      <div className="space-y-4">
        {/* League Info */}
        {match.league && (
          <div className="flex items-center justify-center space-x-2 text-xs text-purple-600 font-medium">
            <Trophy className="w-3 h-3" />
            <span>{match.league}</span>
          </div>
        )}
        
        {/* Teams Layout */}
        <div className="grid grid-cols-7 items-center gap-2">
          {/* Home Team */}
          <div className="col-span-3 flex items-center space-x-2">
            <motion.img 
              src={getOfficialTeamLogo(match.homeTeam.name)} 
              className="w-8 h-8 rounded-full shadow-sm flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
              onError={(e) => {
                e.currentTarget.src = '/placeholder-logo.svg';
              }}
            />
            <span className="font-semibold text-gray-800 text-sm truncate">
              {match.homeTeam.name}
            </span>
          </div>
          
          {/* Score Section */}
          <div className="col-span-1 flex items-center justify-center space-x-2">
            <motion.span 
              className="text-xl font-bold text-purple-800"
              whileHover={{ scale: 1.1 }}
            >
              {match.homeScore ?? 0}
            </motion.span>
            <span className="text-gray-400 font-medium">-</span>
            <motion.span 
              className="text-xl font-bold text-purple-800"
              whileHover={{ scale: 1.1 }}
            >
              {match.awayScore ?? 0}
            </motion.span>
          </div>
          
          {/* Away Team */}
          <div className="col-span-3 flex items-center justify-end space-x-2">
            <span className="font-semibold text-gray-800 text-sm truncate text-right">
              {match.awayTeam.name}
            </span>
            <motion.img 
              src={getOfficialTeamLogo(match.awayTeam.name)} 
              className="w-8 h-8 rounded-full shadow-sm flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: -5 }}
              onError={(e) => {
                e.currentTarget.src = '/placeholder-logo.svg';
              }}
            />
          </div>
        </div>
        
        {/* Match Status & Info */}
        <div className="flex items-center justify-center space-x-4">
          <motion.div 
            className={`text-sm font-medium px-3 py-1 rounded-full shadow-md ${
              isLive 
                ? 'text-white bg-red-500'
                : `text-white bg-gradient-to-r ${getStatusColor()}`
            }`}
            whileHover={{ scale: 1.05 }}
            animate={isLive ? { 
              scale: [1, 1.1, 1],
              backgroundColor: ['#ef4444', '#dc2626', '#ef4444']
            } : {}}
            transition={isLive ? { 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
          >
            {getStatusDisplay()}
          </motion.div>
          
          {match.venue && (
            <div className="text-xs text-gray-500 flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              <span className="truncate max-w-20">{match.venue}</span>
            </div>
          )}
          
          {match.time && match.status === 'scheduled' && (
            <div className="text-xs text-gray-500 flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{match.time}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Hover Glow Effect */}
      <motion.div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 blur-xl transition-opacity pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.2 }}
      />
      
      {/* Live Match Pulse Ring */}
      {isLive && (
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-red-400 opacity-30"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};