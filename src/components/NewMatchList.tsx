import React, { useState } from 'react';
import { NewLeagueSection } from './NewLeagueSection';
import { NewMatchDetailsModal } from './NewMatchDetailsModal';
import { LoadingSpinner } from './LoadingSpinner';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  isLive?: boolean;
  minute?: number;
  status: 'live' | 'finished' | 'upcoming';
  time?: string;
  league: string;
  homeLogo?: string;
  awayLogo?: string;
}

interface NewMatchListProps {
  matches: Match[];
  loading: boolean;
  selectedLeague: string;
  selectedDate: string;
  translations: any;
}

export const NewMatchList: React.FC<NewMatchListProps> = ({ 
  matches, 
  loading, 
  selectedLeague,
  selectedDate,
  translations
}) => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMatch(null);
  };

  // Group matches by league
  const groupedMatches = matches.reduce((acc: Record<string, Match[]>, match) => {
    if (!acc[match.league]) {
      acc[match.league] = [];
    }
    acc[match.league].push(match);
    return acc;
  }, {});

  // Always render something, even if empty
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(groupedMatches).map(([league, leagueMatches]) => (
        <NewLeagueSection 
          key={league}
          league={league}
          matches={leagueMatches}
          onMatchClick={handleMatchClick}
        />
      ))}
      
      {/* Show message when no matches */}
      {matches.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No matches found</h3>
          <p className="text-gray-500">There are no matches scheduled for this date.</p>
        </div>
      )}

      {selectedMatch && (
        <NewMatchDetailsModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          match={selectedMatch}
        />
      )}
    </div>
  );
};