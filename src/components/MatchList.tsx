import React, { useState, useCallback } from 'react';
import { MatchCard } from './MatchCard';
import { LoadingSpinner } from './LoadingSpinner';
import { MatchDetailsModal } from './MatchDetailsModal';
import { Calendar, Activity, Clock } from 'lucide-react';
import type { Translations } from '../i18n/index';
import { sortedLeagues, priorityLeagues } from '../data/leagues';

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
  
  // Güvenli veri erişimi - daha sağlam hata önleyici
  const displayMatches = Array.isArray(matches) ? matches : [];
  
  // Hata durumunda bile uygulamanın çalışmasını sağlayan güvenli gruplama
  const groupedMatches: Record<string, any[]> = {};
  
  try {
    displayMatches.forEach(match => {
      // Null veya undefined maçları atla
      if (!match) return;
      
      // Lig adı olmayan maçlar için varsayılan değer
      const league = (match.league && typeof match.league === 'string') ? match.league : 'Bilinmeyen Lig';
      
      if (!groupedMatches[league]) {
        groupedMatches[league] = [];
      }
      groupedMatches[league].push(match);
    });
  } catch (error) {
    console.error('Maç gruplama hatası:', error);
    // Hata durumunda boş bir nesne döndür
    Object.keys(groupedMatches).forEach(key => delete groupedMatches[key]);
  }

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

  // Ligleri öncelik sırasına göre sırala - yeni sistem
  const getLeaguePriority = (leagueName: string) => {
    try {
      const league = sortedLeagues.find(l => l.name === leagueName);
      return league ? league.priority : 999; // Bilinmeyen ligler en sona
    } catch (error) {
      console.error('Lig öncelik hatası:', error);
      return 999; // Hata durumunda en sona
    }
  };

  const sortLeagues = (a: string, b: string) => {
    try {
      const priorityA = getLeaguePriority(a);
      const priorityB = getLeaguePriority(b);
      
      // Öncelik sırasına göre sırala
      return priorityA - priorityB;
    } catch (error) {
      console.error('Lig sıralama hatası:', error);
      return 0; // Hata durumunda sıralama yapma
    }
  };

  // Hata durumunda bile uygulamanın çalışmasını sağlayan lig listesi
  let leagueNames: string[] = [];
  try {
    leagueNames = Object.keys(groupedMatches).sort(sortLeagues);
  } catch (error) {
    console.error('Lig listesi oluşturma hatası:', error);
    leagueNames = []; // Boş liste ile devam et
  }

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

  // Boş veri durumu için daha sağlam kontrol
  const hasMatches = displayMatches && displayMatches.length > 0;
  
  if (!hasMatches) {
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
              <span className="text-sm font-medium">{leagueNames.length} {translations.leagues}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">{displayMatches.length} {translations.matches}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leagues */}
      {leagueNames.length > 0 ? (
        leagueNames.map((league) => {
          try {
            const leagueMatches = groupedMatches[league] || [];
            const leagueInfo = sortedLeagues.find(l => l.name === league);
            
            return (
              <div key={league} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 border border-gray-200">
                <div className="bg-gradient-to-r from-gray-50 to-white px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                      <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🏆</span>
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-800">{league}</h2>
                        {leagueInfo && (
                          <p className="text-gray-500 text-xs font-medium">{leagueInfo.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <span className="text-xs font-medium">{leagueMatches.length} {translations.matches}</span>
                      {leagueInfo && (
                        <span className="text-xs text-gray-400">• #{leagueInfo.priority}</span>
                      )}
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
          } catch (error) {
            console.error('Lig render hatası:', league, error);
            return null;
          }
        })
      ) : (
        // Lig bulunamadığında gösterilecek fallback
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center border border-gray-100">
          <div className="text-gray-300 mb-4 text-5xl sm:text-6xl">🏆</div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Lig Verisi Bulunamadı</h3>
          <p className="text-gray-500 text-sm sm:text-base">Maçlar mevcut ancak lig gruplandırması yapılamadı</p>
        </div>
      )}
      
      {/* Match Details Modal */}
      <MatchDetailsModal 
        match={selectedMatch}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};