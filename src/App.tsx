// GoLivo Modern Football App - Comprehensive Statistical Dashboard
// Major update: Complete API utilization with visual components
// Features: Teams, Players, Leagues, Standings, Statistics
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MatchList } from './components/MatchList';
import { LeagueStandings } from './components/LeagueStandings';
import { TeamDashboard } from './components/TeamDashboard';
import { PlayerStatistics } from './components/PlayerStatistics';
import { StatisticsDashboard } from './components/StatisticsDashboard';
import { CountryDashboard } from './components/CountryDashboard';
import { FootballApi } from './services/api';
import { useTranslation } from './i18n/useTranslation';
import { initGeoRedirect } from './utils/geoRedirect';
import SEO from './components/SEO';

function App() {
  const { t, currentLang } = useTranslation();
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentView, setCurrentView] = useState('scores'); // New state for view management

  useEffect(() => {
    console.log('🌍 App mounting, current language:', currentLang, 'view:', currentView);
    // Initialize geo-redirect system - SSL certificates are now active!
    // Only run once on initial mount
    // Temporarily disabled to prevent redirects during testing
    // initGeoRedirect();
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    // Fetch data based on current view
    if (currentView === 'scores') {
      fetchLiveMatches();
    }
  }, [selectedDate, currentView]);

  const fetchLiveMatches = async () => {
    if (currentView !== 'scores') return; // Only fetch when in scores view
    
    console.log('fetchLiveMatches called, setting loading=true');
    setLoading(true);
    try {
      console.log('Fetching all matches for date:', selectedDate);
      const matches = await FootballApi.getLiveMatches('all', selectedDate);
      console.log('Received matches:', matches.length, matches);
      setLiveMatches(matches);
    } catch (error) {
      console.error('Error loading matches:', error);
      setLiveMatches([]);
    } finally {
      console.log('fetchLiveMatches completed, setting loading=false');
      setLoading(false);
    }
  };

  const testApiCall = async () => {
    console.log('🗋 Test API çağrısı başlatılıyor...');
    try {
      const response = await fetch(`https://apiv3.apifootball.com/?action=get_events&from=${selectedDate}&to=${selectedDate}&APIkey=47746f324863a1c7321a4b137847eba9e647469c8eacced9ca6175bbbadf5c2d`);
      const data = await response.json();
      console.log('🗋 Test API yanıtı:', data.length, 'maç bulundu');
      console.log('🗋 İlk maç:', data[0]);
    } catch (error) {
      console.error('🗋 Test API hatası:', error);
    }
  };

  // Render different views based on currentView state
  const renderMainContent = () => {
    switch (currentView) {
      case 'news':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
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
            <p className="text-gray-600">
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
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
            <p className="text-gray-600">
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
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
            <p className="text-gray-600">
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🏆 Leagues</h2>
            <p className="text-gray-600">This section will be completed soon...</p>
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
          <MatchList 
            matches={liveMatches}
            loading={loading}
            selectedLeague={selectedLeague}
            selectedDate={selectedDate}
            translations={t}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
      
      <Header 
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="space-y-4">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
}

export default App;