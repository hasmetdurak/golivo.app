import React from 'react';
import { MatchCard } from './MatchCard';
import { LoadingSpinner } from './LoadingSpinner';
import { mockMatches } from '../data/mockData';
import { Trophy, Calendar } from 'lucide-react';

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
    'Super Lig': 1,
    'Premier League': 2,
    'La Liga': 3,
    'Champions League': 4,
    'Bundesliga': 5,
    'Serie A': 6,
    'Ligue 1': 7
  };

  const leagues = Object.keys(groupedMatches).sort((a, b) => {
    const priorityA = leaguePriority[a as keyof typeof leaguePriority] || 999;
    const priorityB = leaguePriority[b as keyof typeof leaguePriority] || 999;
    return priorityA - priorityB;
  });

  const formatSelectedDate = () => {
    const date = new Date(selectedDate);
    return date.toLocaleDateString('tr-TR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (displayMatches.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <div className="text-gray-400 mb-4 text-6xl">⚽</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No matches found</h3>
        <p className="text-gray-500">{formatSelectedDate()} tarihinde maç bulunmuyor</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Date Display */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center justify-center space-x-2 text-gray-700">
          <Calendar className="h-5 w-5 text-purple-600" />
          <span className="font-semibold text-lg">{formatSelectedDate()}</span>
          <span className="text-sm text-gray-500">- {leagues.length} Liga, {displayMatches.length} Maç</span>
        </div>
      </div>

      {/* Leagues */}
      {leagues.map((league) => {
        const leagueMatches = groupedMatches[league];
        const liveCount = leagueMatches.filter(match => match.status === 'live').length;
        const finishedCount = leagueMatches.filter(match => match.status === 'finished').length;
        const scheduledCount = leagueMatches.filter(match => match.status !== 'live' && match.status !== 'finished').length;
        
        return (
          <div key={league} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Trophy className="h-6 w-6 text-white" />
                  <h2 className="text-xl font-bold text-white">{league}</h2>
                </div>
                <div className="flex items-center space-x-4 text-purple-100">
                  {liveCount > 0 && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">{liveCount} Canlı</span>
                    </div>
                  )}
                  <div className="text-sm">
                    {leagueMatches.length} maç
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
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