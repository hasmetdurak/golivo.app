import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Trophy, Users } from 'lucide-react';
import { MatchCard } from './MatchCard';

interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
  priority: number;
}

interface Match {
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
}

interface LeagueFrameProps {
  league: League;
  matches: Match[];
  expanded: boolean;
  onToggle: () => void;
}

const leagueVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const matchesVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { 
    height: 'auto', 
    opacity: 1,
    transition: { 
      height: { duration: 0.3 },
      opacity: { duration: 0.2, delay: 0.1 }
    }
  },
  exit: { 
    height: 0, 
    opacity: 0,
    transition: { 
      height: { duration: 0.3 },
      opacity: { duration: 0.2 }
    }
  }
};

export const LeagueFrame: React.FC<LeagueFrameProps> = ({ 
  league, 
  matches, 
  expanded, 
  onToggle 
}) => {
  const liveMatches = matches.filter(match => match.status === 'live');
  const upcomingMatches = matches.filter(match => match.status === 'scheduled');
  const finishedMatches = matches.filter(match => match.status === 'finished');

  return (
    <motion.div 
      variants={leagueVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden mb-6"
    >
      {/* League Header */}
      <motion.div 
        className="bg-gradient-to-r from-purple-600 to-purple-500 p-4 cursor-pointer"
        onClick={onToggle}
        whileHover={{ 
          background: "linear-gradient(to right, #7C3AED, #6B21A8)",
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-xl font-bold text-white">
                {league.name?.charAt(0) || 'L'}
              </span>
            </div>
            <div>
              <motion.h3 
                className="text-xl font-bold text-cream-light"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {league.name}
              </motion.h3>
              <motion.p 
                className="text-purple-100 text-sm"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {league.country}
              </motion.p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Match Statistics */}
            <div className="hidden sm:flex items-center space-x-4 text-cream-light">
              {liveMatches.length > 0 && (
                <motion.div 
                  className="flex items-center space-x-1"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">{liveMatches.length} CANLI</span>
                </motion.div>
              )}
              
              <div className="flex items-center space-x-1">
                <Trophy className="w-4 h-4" />
                <span className="text-sm">{matches.length} maç</span>
              </div>
            </div>
            
            {/* Mobile Statistics */}
            <div className="sm:hidden">
              <motion.span 
                className="bg-white/20 text-cream-light px-3 py-1 rounded-full text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                {liveMatches.length > 0 ? `🔴 ${liveMatches.length}` : matches.length}
              </motion.span>
            </div>
            
            {/* Expand/Collapse Button */}
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-cream-light"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </div>
        </div>
        
        {/* Live Indicator Bar */}
        {liveMatches.length > 0 && (
          <motion.div 
            className="mt-3 h-1 bg-red-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(liveMatches.length / matches.length) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        )}
      </motion.div>

      {/* Matches Section */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            variants={matchesVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-br from-purple-50 to-cream-light">
              {/* Live Matches First */}
              {liveMatches.length > 0 && (
                <div className="mb-6">
                  <motion.div 
                    className="flex items-center space-x-2 mb-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <h4 className="font-semibold text-red-600">Canlı Maçlar</h4>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                      {liveMatches.length}
                    </span>
                  </motion.div>
                  <div className="grid gap-3">
                    {liveMatches.map((match, index) => (
                      <motion.div
                        key={match.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <MatchCard
                          match={match}
                          isLive={true}
                          onClick={() => console.log('Live match clicked:', match.id)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Upcoming Matches */}
              {upcomingMatches.length > 0 && (
                <div className="mb-6">
                  <motion.div 
                    className="flex items-center space-x-2 mb-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-3 h-3 bg-purple-500 rounded-full" />
                    <h4 className="font-semibold text-purple-600">Gelecek Maçlar</h4>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-bold">
                      {upcomingMatches.length}
                    </span>
                  </motion.div>
                  <div className="grid gap-3">
                    {upcomingMatches.map((match, index) => (
                      <motion.div
                        key={match.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <MatchCard
                          match={match}
                          isLive={false}
                          onClick={() => console.log('Upcoming match clicked:', match.id)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Finished Matches */}
              {finishedMatches.length > 0 && (
                <div>
                  <motion.div 
                    className="flex items-center space-x-2 mb-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="w-3 h-3 bg-gray-500 rounded-full" />
                    <h4 className="font-semibold text-gray-600">Tamamlanan Maçlar</h4>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold">
                      {finishedMatches.length}
                    </span>
                  </motion.div>
                  <div className="grid gap-3">
                    {finishedMatches.map((match, index) => (
                      <motion.div
                        key={match.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <MatchCard
                          match={match}
                          isLive={false}
                          onClick={() => console.log('Finished match clicked:', match.id)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Empty State */}
              {matches.length === 0 && (
                <motion.div 
                  className="text-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">Henüz Maç Yok</h4>
                  <p className="text-gray-500">Bu lig için bugün planlanmış maç bulunmuyor.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Gradient Glow Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-purple-400/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        whileHover={{ opacity: 1 }}
      />
    </motion.div>
  );
};