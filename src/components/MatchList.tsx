import React, { useState, useCallback } from 'react';
import { MatchCard } from './MatchCard';
import { LoadingSpinner } from './LoadingSpinner';
import { MatchDetailsModal } from './MatchDetailsModal';
import { Calendar, Activity, Clock } from 'lucide-react';
import type { Translations } from '../i18n/index';

interface MatchListProps {
  matches: any[];
  loading: boolean;
  selectedLeague: string;
  selectedDate: string;
  translations: Translations;
}

export const MatchList: React.FC<MatchListProps> = ({ matches, loading, selectedLeague, selectedDate, translations }) => {
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Güvenli veri erişimi
  const displayMatches = Array.isArray(matches) ? matches : [];

  // Maç tıklama olayı - hata önleyici
  const handleMatchClick = useCallback((match: any) => {
    try {
      if (match && match.id) {
        // Derin kopyalama yerine doğrudan atama
        setSelectedMatch(match);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Maç tıklama hatası:', error);
      setIsModalOpen(false);
      setSelectedMatch(null);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedMatch(null);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Basit gruplama - lig bazında
  const groupedMatches: Record<string, any[]> = {};
  displayMatches.forEach(match => {
    if (!match) return;
    
    const league = match.league || 'Bilinmeyen Lig';
    if (!groupedMatches[league]) {
      groupedMatches[league] = [];
    }
    groupedMatches[league].push(match);
  });

  // Ligleri sırala
  const leagues = Object.keys(groupedMatches).sort();

  const formatSelectedDate = () => {
    try {
      const date = new Date(selectedDate);
      return date.toLocaleDateString('tr-TR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return selectedDate;
    }
  };

  if (displayMatches.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center border border-gray-100">
        <div className="text-gray-300 mb-4 text-5xl sm:text-6xl">⚽</div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">{translations.noMatches}</h3>
        <p className="text-gray-500 text-sm sm:text-base">{formatSelectedDate()} tarihinde planlanmış maç yok</p>
        <div className="mt-4 inline-flex items-center space-x-2 text-gray-400">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{translations.checkLater}</span>
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
              <span className="text-lg">🏆</span>
              <span className="text-sm font-medium">{leagues.length} {translations.leagues}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">{displayMatches.length} {translations.matches}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leagues */}
      {leagues.map((league) => {
        const leagueMatches = groupedMatches[league] || [];
        
        return (
          <div key={league} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 border border-gray-200">
            <div className="bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 sm:p-2 bg-gray-600 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🏆</span>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800">{league}</h2>
                    <p className="text-gray-500 text-xs font-medium">Bugünkü Karşılaşmalar</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <span className="text-xs font-medium">{leagueMatches.length} {translations.matches}</span>
                </div>
              </div>
            </div>
            
            <div className="p-2 sm:p-3">
              <div className="grid gap-2 sm:gap-3">
                {leagueMatches.map((match: any, index: number) => (
                  <MatchCard 
                    key={match?.id || index} 
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