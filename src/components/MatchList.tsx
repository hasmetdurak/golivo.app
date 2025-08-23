import React, { useState } from 'react';
import { MatchCard } from './MatchCard';
import { LoadingSpinner } from './LoadingSpinner';
import { MatchDetailsModal } from './MatchDetailsModal';
import { Trophy, Calendar, Activity, Clock, TrendingUp } from 'lucide-react';

interface MatchListProps {
  matches: any[];
  loading: boolean;
  selectedLeague: string;
  selectedDate: string;
}

export const MatchList: React.FC<MatchListProps> = ({ matches, loading, selectedLeague, selectedDate }) => {
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const displayMatches = matches;

  const handleMatchClick = (match: any) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMatch(null);
  };

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

  // Sort matches within each league: live matches first, then by time
  Object.keys(groupedMatches).forEach(league => {
    groupedMatches[league].sort((a: any, b: any) => {
      // Live matches first
      if (a.status === 'live' && b.status !== 'live') return -1;
      if (b.status === 'live' && a.status !== 'live') return 1;
      
      // Then by time
      return a.time.localeCompare(b.time);
    });
  });

  // Sort leagues by priority (patron's preferred order - more distinct naming)
  const leaguePriority = {
    'Champions League': 1,
    'UEFA Champions League': 1,
    'English Premier League': 2,
    'Premier League': 2,
    'Spanish La Liga': 3,
    'La Liga': 3,
    'Spain La Liga': 3,
    'German Bundesliga': 4,
    'Bundesliga': 4,
    'Germany Bundesliga': 4,
    'Austrian Bundesliga': 5,
    'Austria Bundesliga': 5,
    'Italian Serie A': 6,
    'Serie A': 6,
    'Italy Serie A': 6,
    'French Ligue 1': 7,
    'Ligue 1': 7,
    'France Ligue 1': 7,
    'Dutch Eredivisie': 8,
    'Eredivisie': 8,
    'Netherlands Eredivisie': 8,
    'Portuguese Primeira Liga': 9,
    'Primeira Liga': 9,
    'Portugal Premier League': 9,
    'Belgian Pro League': 10,
    'Pro League': 10,
    'Belgium Pro League': 10,
    'Turkish Super League': 11,
    'Süper Lig': 11,
    'Russian Premier League': 12,
    'Russia Premier League': 12,
    'Premier Liga': 12,
    'American MLS': 13,
    'MLS': 13,
    'Major League Soccer': 13,
    'Brazilian Brasileirão': 14,
    'Brasileirão': 14,
    'Brazil Serie A': 14,
    'Argentine Primera División': 15,
    'Mexican Liga MX': 16,
    'Liga MX': 16,
    'Saudi Pro League': 17
  };

  // League to country mapping with simplified naming
  const leagueCountryMap: Record<string, string> = {
    'Champions League': 'CHAMPIONS LEAGUE',
    'UEFA Champions League': 'CHAMPIONS LEAGUE',
    'English Premier League': 'ENGLAND PREMIER LEAGUE',
    'Premier League': 'ENGLAND PREMIER LEAGUE',
    'Spanish La Liga': 'SPAIN LA LIGA',
    'La Liga': 'SPAIN LA LIGA',
    'Spain La Liga': 'SPAIN LA LIGA',
    'German Bundesliga': 'GERMANY BUNDESLIGA',
    'Bundesliga': 'GERMANY BUNDESLIGA',
    'Germany Bundesliga': 'GERMANY BUNDESLIGA',
    'Austrian Bundesliga': 'AUSTRIA BUNDESLIGA',
    'Austria Bundesliga': 'AUSTRIA BUNDESLIGA',
    'Italian Serie A': 'ITALY SERIE A',
    'Serie A': 'ITALY SERIE A',
    'Italy Serie A': 'ITALY SERIE A',
    'French Ligue 1': 'FRANCE LIGUE 1',
    'Ligue 1': 'FRANCE LIGUE 1',
    'France Ligue 1': 'FRANCE LIGUE 1',
    'Dutch Eredivisie': 'NETHERLANDS EREDIVISIE',
    'Eredivisie': 'NETHERLANDS EREDIVISIE',
    'Netherlands Eredivisie': 'NETHERLANDS EREDIVISIE',
    'Portuguese Primeira Liga': 'PORTUGAL PRIMEIRA LIGA',
    'Primeira Liga': 'PORTUGAL PRIMEIRA LIGA',
    'Portugal Premier League': 'PORTUGAL PRIMEIRA LIGA',
    'Belgian Pro League': 'BELGIUM PRO LEAGUE',
    'Pro League': 'BELGIUM PRO LEAGUE',
    'Belgium Pro League': 'BELGIUM PRO LEAGUE',
    'Turkish Super League': 'TURKEY SUPER LEAGUE',
    'Süper Lig': 'TURKEY SUPER LEAGUE',
    'Russian Premier League': 'RUSSIA PREMIER LEAGUE',
    'Russia Premier League': 'RUSSIA PREMIER LEAGUE',
    'Premier Liga': 'RUSSIA PREMIER LEAGUE',
    'American MLS': 'USA MLS',
    'MLS': 'USA MLS',
    'Major League Soccer': 'USA MLS',
    'Brazilian Brasileirão': 'BRAZIL BRASILEIRAO',
    'Brasileirão': 'BRAZIL BRASILEIRAO',
    'Brazil Serie A': 'BRAZIL BRASILEIRAO',
    'Argentine Primera División': 'ARGENTINA PRIMERA',
    'Mexican Liga MX': 'MEXICO LIGA MX',
    'Liga MX': 'MEXICO LIGA MX',
    'Saudi Pro League': 'SAUDI PRO LEAGUE'
  };

  // League color mapping for visual distinction
  const leagueColorMap: Record<string, { bg: string; border: string; icon: string }> = {
    'CHAMPIONS LEAGUE': { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-600' },
    'ENGLAND PREMIER LEAGUE': { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-600' },
    'SPAIN LA LIGA': { bg: 'bg-red-50', border: 'border-red-200', icon: 'bg-red-600' },
    'GERMANY BUNDESLIGA': { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'bg-yellow-600' },
    'AUSTRIA BUNDESLIGA': { bg: 'bg-red-50', border: 'border-red-300', icon: 'bg-red-500' },
    'ITALY SERIE A': { bg: 'bg-green-50', border: 'border-green-200', icon: 'bg-green-600' },
    'FRANCE LIGUE 1': { bg: 'bg-indigo-50', border: 'border-indigo-200', icon: 'bg-indigo-600' },
    'NETHERLANDS EREDIVISIE': { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'bg-orange-600' },
    'PORTUGAL PRIMEIRA LIGA': { bg: 'bg-teal-50', border: 'border-teal-200', icon: 'bg-teal-600' },
    'BELGIUM PRO LEAGUE': { bg: 'bg-gray-50', border: 'border-gray-200', icon: 'bg-gray-600' },
    'TURKEY SUPER LEAGUE': { bg: 'bg-rose-50', border: 'border-rose-200', icon: 'bg-rose-600' },
    'RUSSIA PREMIER LEAGUE': { bg: 'bg-cyan-50', border: 'border-cyan-200', icon: 'bg-cyan-600' },
    'USA MLS': { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'bg-emerald-600' },
    'BRAZIL BRASILEIRAO': { bg: 'bg-lime-50', border: 'border-lime-200', icon: 'bg-lime-600' },
    'ARGENTINA PRIMERA': { bg: 'bg-sky-50', border: 'border-sky-200', icon: 'bg-sky-600' },
    'MEXICO LIGA MX': { bg: 'bg-pink-50', border: 'border-pink-200', icon: 'bg-pink-600' },
    'SAUDI PRO LEAGUE': { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'bg-amber-600' }
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
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center border border-gray-100">
        <div className="text-gray-300 mb-4 text-5xl sm:text-6xl">⚽</div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Maç Bulunamadı</h3>
        <p className="text-gray-500 text-sm sm:text-base">{formatSelectedDate()} tarihinde planlanmış maç yok</p>
        <div className="mt-4 inline-flex items-center space-x-2 text-gray-400">
          <Clock className="h-4 w-4" />
          <span className="text-sm">Güncellemeler için daha sonra kontrol edin</span>
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
              <span className="text-sm font-medium">{leagues.length} Lig</span>
            </div>
            <div className="flex items-center space-x-1">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">{displayMatches.length} Maç</span>
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
        
        // Get simplified league name and colors
        const displayName = leagueCountryMap[league] || league.toUpperCase();
        const colors = leagueColorMap[displayName] || { bg: 'bg-gray-50', border: 'border-gray-200', icon: 'bg-gray-600' };
        
        return (
          <div key={league} className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 border ${colors.border}`}>
            <div className={`${colors.bg} px-4 sm:px-6 py-3 sm:py-4 border-b ${colors.border}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className={`p-1.5 sm:p-2 ${colors.icon} rounded-lg`}>
                    <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-base sm:text-lg font-semibold text-gray-800">{displayName}</h2>
                    </div>
                    <p className="text-gray-500 text-xs font-medium">Bugünkü Karşılaşmalar</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  {liveCount > 0 && (
                    <div className="flex items-center space-x-1 bg-red-50 px-2 py-1 rounded-lg border border-red-200">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-red-600">{liveCount} CANLI</span>
                    </div>
                  )}
                  {finishedCount > 0 && (
                    <div className="flex items-center space-x-1 text-gray-500">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs font-medium">{finishedCount} Bitti</span>
                    </div>
                  )}
                  {scheduledCount > 0 && (
                    <div className="flex items-center space-x-1 text-blue-600">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs font-medium">{scheduledCount} Planlandı</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-3 sm:p-4">
              <div className="grid gap-3 sm:gap-4">
                {leagueMatches.map((match: any, index: number) => (
                  <MatchCard 
                    key={match.id || index} 
                    match={match} 
                    onClick={() => handleMatchClick(match)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Match Details Modal */}
      <MatchDetailsModal 
        match={selectedMatch}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};