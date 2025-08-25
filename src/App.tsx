// GoLivo Modern Football App - Comprehensive Statistical Dashboard
// Major update: Complete API utilization with visual components
// Features: Teams, Players, Leagues, Standings, Statistics
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MatchList } from './components/MatchList';
import { MatchDetailsModal } from './components/MatchDetailsModal';
import { LeagueStandings } from './components/LeagueStandings';
import { TeamDashboard } from './components/TeamDashboard';
import { FootballApi } from './services/api';
import { Match } from './types';
import { useTranslation } from './i18n/useTranslation';
import SEO from './components/SEO';
import './App.css';

function App() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liveMatchesCount, setLiveMatchesCount] = useState(0);
  const [topLeagues, setTopLeagues] = useState<any[]>([]);
  const [quickStats, setQuickStats] = useState({
    totalMatches: 0,
    liveMatches: 0,
    finishedMatches: 0,
    upcomingMatches: 0
  });

  const { t } = useTranslation();

  const fetchLiveMatches = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('🌍 GeoIP redirect is disabled, using manual language selection');
      
      const data = await FootballApi.getLiveMatches('all', selectedDate);
      setMatches(data as Match[]);
      
      // İstatistikleri hesapla
      const stats = {
        totalMatches: data.length,
        liveMatches: data.filter(m => m.status === 'live').length,
        finishedMatches: data.filter(m => m.status === 'finished').length,
        upcomingMatches: data.filter(m => m.status === 'scheduled').length
      };
      setQuickStats(stats);
      setLiveMatchesCount(stats.liveMatches);
      
      // Top ligleri hesapla
      const leagueStats = data.reduce((acc: any, match) => {
        if (!acc[match.league]) {
          acc[match.league] = {
            name: match.league,
            matchCount: 0,
            liveCount: 0,
            country: match.country || 'Unknown'
          };
        }
        acc[match.league].matchCount++;
        if (match.status === 'live') {
          acc[match.league].liveCount++;
        }
        return acc;
      }, {});
      
      const sortedLeagues = Object.values(leagueStats)
        .sort((a: any, b: any) => b.liveCount - a.liveCount || b.matchCount - a.matchCount)
        .slice(0, 5);
      
      setTopLeagues(sortedLeagues);
      
    } catch (err) {
      console.error('Error fetching matches:', err);
      setError('Maç verileri yüklenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentView === 'dashboard' || currentView === 'scores') {
      fetchLiveMatches();
    }
  }, [selectedDate, currentView]);

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMatch(null);
  };

  // Render different views based on currentView state
  const renderMainContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <>
            {/* Modern Dashboard Header */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Canlı Maçlar Kartı */}
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-xl shadow-red-500/25">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100 text-sm font-medium">Canlı Maçlar</p>
                      <p className="text-3xl font-bold">{liveMatchesCount}</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Toplam Maçlar Kartı */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/25">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Toplam Maçlar</p>
                      <p className="text-3xl font-bold">{quickStats.totalMatches}</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-lg"></div>
                    </div>
                  </div>
                </div>

                {/* Bitmiş Maçlar Kartı */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl shadow-green-500/25">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Bitmiş Maçlar</p>
                      <p className="text-3xl font-bold">{quickStats.finishedMatches}</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Gelecek Maçlar Kartı */}
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl shadow-purple-500/25">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Gelecek Maçlar</p>
                      <p className="text-3xl font-bold">{quickStats.upcomingMatches}</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Ligler */}
              {topLeagues.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg mr-3 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-sm"></div>
                    </div>
                    En Aktif Ligler
            </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topLeagues.map((league: any, index) => (
                      <div key={index} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">{league.name}</span>
                          <span className="text-xs text-gray-500">{league.country}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-gray-600">{league.liveCount} canlı</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <span className="text-xs text-gray-600">{league.matchCount} maç</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <p className="text-red-800 font-medium">{error}</p>
                </div>
          </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          </div>
            )}

            {/* Match List */}
            {!isLoading && (
              <MatchList 
                matches={matches} 
                onMatchClick={handleMatchClick}
                selectedDate={selectedDate}
              />
            )}
          </>
        );
      case 'scores':
        return (
          <MatchList 
            matches={matches} 
            onMatchClick={handleMatchClick}
            selectedDate={selectedDate}
          />
        );
      case 'standings':
        return <LeagueStandings />;
      case 'teams':
        return <TeamDashboard />;
      case 'players':
        return (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg mr-3 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              Oyuncular
            </h2>
            <p className="text-gray-600">Oyuncu istatistikleri yakında eklenecek...</p>
          </div>
        );
      case 'news':
        return (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg mr-3 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              Futbol Haberleri
            </h2>
            <p className="text-gray-600">En son futbol haberleri yakında eklenecek...</p>
          </div>
        );
      default:
        return (
          <MatchList 
            matches={matches} 
            onMatchClick={handleMatchClick}
            selectedDate={selectedDate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <SEO />
      
      <Header 
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {renderMainContent()}
      </main>

      {/* Match Details Modal */}
      {selectedMatch && (
        <MatchDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          match={selectedMatch}
        />
      )}
    </div>
  );
}

export default App;