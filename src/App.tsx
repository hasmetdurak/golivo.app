// GoLivo Modern Football App - Comprehensive Statistical Dashboard
// Major update: Complete API utilization with visual components
// Features: Teams, Players, Leagues, Standings, Statistics
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { MatchList } from './components/MatchList';
import { MatchDetailsModal } from './components/MatchDetailsModal';
import { LeagueStandings } from './components/LeagueStandings';
import { TeamDashboard } from './components/TeamDashboard';
import { FootballApi } from './services/api';
import { Match } from './types';
import { useTranslation } from './i18n/useTranslation';
import SEO from './components/SEO';

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

  const fetchLiveMatches = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('🌍 GeoIP redirect is disabled, using manual language selection');
      
      const data = await FootballApi.getLiveMatches('all', selectedDate);
      
      // API'den gelen veriyi Match tipine dönüştür
      const normalizedMatches: Match[] = data.map((match: any) => ({
        id: match.id || '',
        league: match.league || 'Bilinmeyen Lig',
        country: match.country || '',
        status: match.status || 'scheduled',
        time: match.time || '',
        venue: match.venue || '',
        homeTeam: {
          name: match.homeTeam?.name || 'Ev Sahibi',
          logo: match.homeTeam?.logo || '',
          country: match.homeTeam?.country || ''
        },
        awayTeam: {
          name: match.awayTeam?.name || 'Deplasman',
          logo: match.awayTeam?.logo || '',
          country: match.awayTeam?.country || ''
        },
        homeScore: match.homeScore || 0,
        awayScore: match.awayScore || 0,
        halftimeScore: {
          home: 0,
          away: 0
        },
        events: [],
        statistics: [],
        minute: match.minute,
        referee: match.referee
      }));
      
      setMatches(normalizedMatches);
      
      // İstatistikleri hesapla
      const stats = {
        totalMatches: normalizedMatches.length,
        liveMatches: normalizedMatches.filter(m => m.status === 'live').length,
        finishedMatches: normalizedMatches.filter(m => m.status === 'finished').length,
        upcomingMatches: normalizedMatches.filter(m => m.status === 'scheduled').length
      };
      setQuickStats(stats);
      setLiveMatchesCount(stats.liveMatches);
      
      // Top ligleri hesapla
      const leagueStats = normalizedMatches.reduce((acc: any, match) => {
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
      setError('Maç verileri yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (currentView === 'dashboard' || currentView === 'scores') {
      fetchLiveMatches();
    }
  }, [selectedDate, currentView, fetchLiveMatches]);

  // Otomatik yenileme - canlı maçlar için
  useEffect(() => {
    if (liveMatchesCount > 0) {
      const interval = setInterval(() => {
        fetchLiveMatches();
      }, 30000); // 30 saniyede bir yenile

      return () => clearInterval(interval);
    }
  }, [liveMatchesCount, fetchLiveMatches]);

  const handleMatchClick = useCallback((match: Match) => {
    try {
      console.log('Maç seçildi:', match.id);
      setSelectedMatch(match);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Maç tıklama hatası:', error);
      alert('Maç detayları açılırken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    try {
      setIsModalOpen(false);
      // Kısa bir gecikme ile state'i temizle
      setTimeout(() => {
        setSelectedMatch(null);
      }, 300);
    } catch (error) {
      console.error('Modal kapatma hatası:', error);
      // Hata durumunda zorla kapat
      setIsModalOpen(false);
      setSelectedMatch(null);
    }
  }, []);

  const handleDateChange = useCallback((date: string) => {
    setSelectedDate(date);
  }, []);

  const handleViewChange = useCallback((view: string) => {
    setCurrentView(view);
  }, []);

  // Hata durumunda yeniden deneme
  const handleRetry = useCallback(() => {
    setError(null);
    fetchLiveMatches();
  }, [fetchLiveMatches]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <SEO 
        title="GoLivo - Canlı Futbol Skorları ve İstatistikler"
        description="En güncel canlı futbol skorları, maç istatistikleri, lig sıralamaları ve oyuncu performansları. Premier Lig, La Liga, Bundesliga ve daha fazlası."
        keywords="canlı skor, futbol, maç sonuçları, lig sıralaması, istatistikler"
      />
      
      <Header 
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Hata mesajı */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
                <span className="text-red-800 font-medium">{error}</span>
              </div>
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Tekrar Dene
              </button>
            </div>
          </div>
        )}

        {/* Ana içerik */}
        {currentView === 'dashboard' && (
          <div className="space-y-6">
            {/* Hızlı istatistikler */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Toplam Maç</p>
                    <p className="text-2xl font-bold text-gray-900">{quickStats.totalMatches}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xl">⚽</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Canlı Maç</p>
                    <p className="text-2xl font-bold text-red-600">{quickStats.liveMatches}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Tamamlanan</p>
                    <p className="text-2xl font-bold text-gray-900">{quickStats.finishedMatches}</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 text-xl">🏁</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Başlayacak</p>
                    <p className="text-2xl font-bold text-blue-600">{quickStats.upcomingMatches}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xl">⏰</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top ligler */}
            {topLeagues.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Popüler Ligler</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topLeagues.map((league, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{league.name}</p>
                        <p className="text-sm text-gray-600">{league.country}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">{league.matchCount}</p>
                        <p className="text-xs text-gray-500">maç</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Maç listesi */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Günün Maçları</h2>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="p-6">
                <MatchList
                  matches={matches}
                  onMatchClick={handleMatchClick}
                  selectedDate={selectedDate}
                  loading={isLoading}
                  translations={t}
                />
              </div>
            </div>
          </div>
        )}

        {currentView === 'scores' && (
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Canlı Skorlar</h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="p-6">
              <MatchList
                matches={matches}
                onMatchClick={handleMatchClick}
                selectedDate={selectedDate}
                loading={isLoading}
                translations={t}
              />
            </div>
          </div>
        )}

        {currentView === 'standings' && (
          <LeagueStandings />
        )}

        {currentView === 'teams' && (
          <TeamDashboard />
        )}
      </main>

      {/* Maç detay modalı */}
      <MatchDetailsModal
        match={selectedMatch}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;