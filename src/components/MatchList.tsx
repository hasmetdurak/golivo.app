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
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center border border-gray-100">
        <div className="text-gray-300 mb-4 text-5xl sm:text-6xl">⚽</div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No Matches Found</h3>
        <p className="text-gray-500 text-sm sm:text-base">No matches scheduled for {formatSelectedDate()}</p>
        <div className="mt-4 inline-flex items-center space-x-2 text-gray-400">
          <Clock className="h-4 w-4" />
          <span className="text-sm">Check back later for updates</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Date Display */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span className="text-base sm:text-lg font-semibold text-gray-800">{formatSelectedDate()}</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-200"></div>
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center space-x-1">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">{leagues.length} Leagues</span>
            </div>
            <div className="flex items-center space-x-1">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">{displayMatches.length} Matches</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leagues */}
      {leagues.map((league) => {
        const leagueMatches = groupedMatches[league];
        const liveCount = leagueMatches.filter((match: any) => match.status === 'live').length;
        const finishedCount = leagueMatches.filter((match: any) => match.status === 'finished').length;
        const scheduledCount = leagueMatches.filter((match: any) => match.status !== 'live' && match.status !== 'finished').length;
        
        return (
          <div key={league} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 border border-gray-100">
            <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg">
                    <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800">{league}</h2>
                    <p className="text-gray-500 text-xs font-medium">Today's Fixtures</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  {liveCount > 0 && (
                    <div className="flex items-center space-x-1 bg-red-50 px-2 py-1 rounded-lg border border-red-200">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-red-600">{liveCount} LIVE</span>
                    </div>
                  )}
                  {finishedCount > 0 && (
                    <div className="flex items-center space-x-1 text-gray-500">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs font-medium">{finishedCount} Finished</span>
                    </div>
                  )}
                  {scheduledCount > 0 && (
                    <div className="flex items-center space-x-1 text-blue-600">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs font-medium">{scheduledCount} Scheduled</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-3 sm:p-4">
              <div className="grid gap-3 sm:gap-4">
                {leagueMatches.map((match: any, index: number) => (
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