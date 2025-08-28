import React, { useState, useEffect } from 'react';
import { NewHeader } from './components/NewHeader';
import { NewMatchList } from './components/NewMatchList';
import { LeagueStandings } from './components/LeagueStandings';
import { TeamDashboard } from './components/TeamDashboard';
import { PlayerStatistics } from './components/PlayerStatistics';
import { StatisticsDashboard } from './components/StatisticsDashboard';
import { CountryDashboard } from './components/CountryDashboard';
import { FootballApi } from './services/api';
import { useTranslation } from './i18n/useTranslation';
import SEO from './components/SEO';
import { TestConnection } from './components/TestConnection';

function App() {
  const { t, currentLang } = useTranslation();
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentView, setCurrentView] = useState('scores');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🌍 App mounting, current language:', currentLang, 'view:', currentView);
    
    // Prevent any automatic redirects that might cause white screen
    console.log('🚫 Auto-redirects disabled for stability');
  }, []);

  useEffect(() => {
    if (currentView === 'scores') {
      fetchLiveMatches();
    }
  }, [selectedDate, currentView]);

  const fetchLiveMatches = async () => {
    if (currentView !== 'scores') return;
    
    console.log('fetchLiveMatches called, setting loading=true');
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching all matches for date:', selectedDate);
      const matches = await FootballApi.getLiveMatches('all', selectedDate);
      console.log('Received matches:', matches.length, matches);
      setLiveMatches(matches);
    } catch (error) {
      console.error('Error loading matches:', error);
      setLiveMatches([]);
      setError('Failed to load matches. Please try again later.');
    } finally {
      console.log('fetchLiveMatches completed, setting loading=false');
      setLoading(false);
    }
  };

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
      {import.meta.env.DEV && (
        <div className="bg-yellow-100 p-2 text-xs flex items-center space-x-4">
          <span>Debug: Loading={loading ? 'true' : 'false'}, Matches={liveMatches.length}, Date={selectedDate}</span>
        </div>
      )}
      
      <NewHeader 
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    onClick={() => setError(null)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
}

export default App;