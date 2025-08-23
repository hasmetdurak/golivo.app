import React from 'react';
import { MatchCard } from './MatchCard';
import { LoadingSpinner } from './LoadingSpinner';
import { mockMatches } from '../data/mockData';
import { Trophy, Calendar, Activity, Clock, TrendingUp } from 'lucide-react';

interface MatchListProps {
  matches: any[];
  loading: boolean;
  selectedLeague: string;
  selectedDate: string;
}

export const MatchList: React.FC<MatchListProps> = ({ matches, loading, selectedLeague, selectedDate }) => {
  const displayMatches = matches.length > 0 ? matches : mockMatches;

  if (loading) {
    return <LoadingSpinner />;
  }

  // Group matches by league and sort by priority
  const groupedMatches = displayMatches.reduce((acc, match) => {
    const league = match.league;
    if (!acc[league]) {
      acc[league] = [];
    }
    acc[league].push(match);
    return acc;
  }, {} as Record<string, any[]>);

  // Sort leagues by priority (popular leagues first)
  const leaguePriority = {
    'Premier League': 1,
    'Champions League': 2,
    'La Liga': 3,
    'Serie A': 4,
    'Bundesliga': 5,
    'Ligue 1': 6,
    'Turkish Super League': 7
  };

  const leagues = Object.keys(groupedMatches).sort((a, b) => {
    const priorityA = leaguePriority[a as keyof typeof leaguePriority] || 999;
    const priorityB = leaguePriority[b as keyof typeof leaguePriority] || 999;
    return priorityA - priorityB;
  });

  const formatSelectedDate = () => {
    const date = new Date(selectedDate);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (displayMatches.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg p-8 text-center border border-slate-200">
        <div className="text-slate-400 mb-4 text-6xl">⚽</div>
        <h3 className="text-xl font-bold text-slate-700 mb-2">No Matches Found</h3>
        <p className="text-slate-500">No matches scheduled for {formatSelectedDate()}</p>
        <div className="mt-4 inline-flex items-center space-x-2 text-slate-400">
          <Clock className="h-3 w-3" />
          <span className="text-sm">Check back later for updates</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Date Display */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl shadow-xl p-4 border border-slate-700">
        <div className="flex items-center justify-center space-x-4 text-white">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-400" />
            <span className="text-lg font-bold">{formatSelectedDate()}</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-slate-600"></div>
          <div className="flex items-center space-x-3 text-slate-300">
            <div className="flex items-center space-x-1">
              <Trophy className="h-3 w-3 text-yellow-500" />
              <span className="text-sm font-medium">{leagues.length} Leagues</span>
            </div>
            <div className="flex items-center space-x-1">
              <Activity className="h-3 w-3 text-green-500" />
              <span className="text-sm font-medium">{displayMatches.length} Matches</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leagues */}
      {leagues.map((league) => {
        const leagueMatches = groupedMatches[league];
        const liveCount = leagueMatches.filter(match => match.status === 'live').length;
        const finishedCount = leagueMatches.filter(match => match.status === 'finished').length;
        const scheduledCount = leagueMatches.filter(match => match.status !== 'live' && match.status !== 'finished').length;
        
        return (
          <div key={league} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-200">
            <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md">
                    <Trophy className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{league}</h2>
                    <p className="text-slate-300 text-xs font-medium">Today's Fixtures</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {liveCount > 0 && (
                    <div className="flex items-center space-x-1 bg-red-500/20 px-2 py-1 rounded-lg border border-red-500/30">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                      <span className="text-xs font-bold text-red-400">{liveCount} LIVE</span>
                    </div>
                  )}
                  {finishedCount > 0 && (
                    <div className="flex items-center space-x-1 text-slate-400">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs font-medium">{finishedCount} Finished</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1 text-slate-300">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-xs font-semibold">{leagueMatches.length} Total</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-3">
                {leagueMatches.map((match, index) => (
                  <MatchCard key={match.id || index} match={match} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};