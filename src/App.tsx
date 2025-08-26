import React, { useState, useEffect } from 'react';
import { NewHeader } from './components/NewHeader';
import { NewMatchList } from './components/NewMatchList';
import { LeagueStandings } from './components/LeagueStandings';
import { TeamDashboard } from './components/TeamDashboard';
import { FootballApi } from './services/api';
import { Match } from './types';
import { useTranslation } from './i18n/useTranslation';
import SEO from './components/SEO';
import { TestConnection } from './components/TestConnection';

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

<<<<<<< HEAD
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
=======
  // Render different views based on currentView state
  const renderMainContent = () => {
    switch (currentView) {
      case 'news':
        return (
          <div className="bg-card/60 backdrop-blur-sm border-border/50 rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
              📰 {currentLang === 'tr' ? 'Futbol Haberleri' : 
                   currentLang === 'de' ? 'Fußball-Nachrichten' :
                   currentLang === 'es' ? 'Noticias de Fútbol' :
                   currentLang === 'fr' ? 'Actualités Football' :
                   currentLang === 'it' ? 'Notizie Calcio' :
                   currentLang === 'pt' ? 'Notícias de Futebol' :
                   currentLang === 'ru' ? 'Футбольные Новости' :
                   currentLang === 'ar' ? 'أخبار كرة القدم' :
                   'Football News'}
            </h2>
            <p className="text-muted-foreground">
              {currentLang === 'tr' ? 'En son futbol haberleri yakında...' : 
               currentLang === 'de' ? 'Neueste Fußball-Nachrichten kommen bald...' :
               currentLang === 'es' ? 'Las últimas noticias de fútbol próximamente...' :
               currentLang === 'fr' ? 'Dernières actualités football bientôt...' :
               currentLang === 'it' ? 'Ultime notizie calcio in arrivo...' :
               currentLang === 'pt' ? 'Últimas notícias de futebol em breve...' :
               currentLang === 'ru' ? 'Последние футбольные новости скоро...' :
               currentLang === 'ar' ? 'آخر أخبار كرة القدم قريباً...' :
               'Latest football news coming soon...'}
            </p>
          </div>
        );
      case 'analysis':
        return (
          <div className="bg-card/60 backdrop-blur-sm border-border/50 rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
              🎯 {currentLang === 'tr' ? 'Maç Analizi' : 
                   currentLang === 'de' ? 'Spielanalyse' :
                   currentLang === 'es' ? 'Análisis de Partidos' :
                   currentLang === 'fr' ? 'Analyse de Match' :
                   currentLang === 'it' ? 'Analisi Partite' :
                   currentLang === 'pt' ? 'Análise de Jogos' :
                   currentLang === 'ru' ? 'Анализ Матчей' :
                   currentLang === 'ar' ? 'تحليل المباريات' :
                   'Match Analysis'}
            </h2>
            <p className="text-muted-foreground">
              {currentLang === 'tr' ? 'Profesyonel maç analizleri yakında...' : 
               currentLang === 'de' ? 'Professionelle Spielanalysen kommen bald...' :
               currentLang === 'es' ? 'Análisis profesional de partidos próximamente...' :
               currentLang === 'fr' ? 'Analyses professionnelles de matchs bientôt...' :
               currentLang === 'it' ? 'Analisi professionali delle partite in arrivo...' :
               currentLang === 'pt' ? 'Análise profissional de jogos em breve...' :
               currentLang === 'ru' ? 'Профессиональный анализ матчей скоро...' :
               currentLang === 'ar' ? 'تحليل مهني للمباريات قريباً...' :
               'Professional match analysis coming soon...'}
            </p>
          </div>
        );
      case 'contact':
        return (
          <div className="bg-card/60 backdrop-blur-sm border-border/50 rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
              💬 {currentLang === 'tr' ? 'İletişim' : 
                   currentLang === 'de' ? 'Kontakt' :
                   currentLang === 'es' ? 'Contacto' :
                   currentLang === 'fr' ? 'Contact' :
                   currentLang === 'it' ? 'Contatti' :
                   currentLang === 'pt' ? 'Contato' :
                   currentLang === 'ru' ? 'Контакты' :
                   currentLang === 'ar' ? 'اتصل بنا' :
                   'Contact Us'}
            </h2>
            <p className="text-muted-foreground">
              {currentLang === 'tr' ? 'Bizimle iletişime geçin...' : 
               currentLang === 'de' ? 'Nehmen Sie Kontakt mit uns auf...' :
               currentLang === 'es' ? 'Ponte en contacto con nosotros...' :
               currentLang === 'fr' ? 'Entrez en contact avec nous...' :
               currentLang === 'it' ? 'Mettiti in contatto con noi...' :
               currentLang === 'pt' ? 'Entre em contato conosco...' :
               currentLang === 'ru' ? 'Свяжитесь с нами...' :
               currentLang === 'ar' ? 'تواصل معنا...' :
               'Get in touch with us...'}
            </p>
          </div>
        );
      case 'leagues':
        return (
          <div className="bg-card/60 backdrop-blur-sm border-border/50 rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">🏆 Leagues</h2>
            <p className="text-muted-foreground">This section will be completed soon...</p>
          </div>
        );
      case 'standings':
        return <LeagueStandings />;
      case 'teams':
        return <TeamDashboard />;
      case 'players':
        return <PlayerStatistics />;
      case 'statistics':
        return <StatisticsDashboard />;
      case 'countries':
        return <CountryDashboard />;
      case 'scores':
      default:
        return (
          <>
            <NewMatchList 
              matches={liveMatches}
              loading={loading}
              selectedLeague={selectedLeague}
              selectedDate={selectedDate}
              translations={t}
            />
            {/* Test Connection Component for debugging */}
            {import.meta.env.DEV && (
              <div className="mt-8">
                <TestConnection />
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <SEO />
      {/* Debug info - will remove later */}
      {import.meta.env.DEV && (
        <div className="bg-yellow-100 p-2 text-xs flex items-center space-x-4">
          <span>Debug: Loading={loading ? 'true' : 'false'}, Matches={liveMatches.length}, Date={selectedDate}</span>
          <button 
            onClick={testApiCall}
            className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
          >
            Test API
          </button>
        </div>
      )}
>>>>>>> 9b5d802
      
      <NewHeader 
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        currentView={currentView}
        onViewChange={handleViewChange}
      />
<<<<<<< HEAD

      <main className="container mx-auto px-4 py-6">
        {/* Hata mesajı */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
=======
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
>>>>>>> 9b5d802
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