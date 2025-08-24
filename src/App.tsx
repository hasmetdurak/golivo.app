// GoLivo Modern Football App - Comprehensive Statistical Dashboard
// Major update: Complete API utilization with visual components
// Features: Teams, Players, Leagues, Standings, Statistics
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MatchList } from './components/MatchList';
import { LeagueStandings } from './components/LeagueStandings';
import { TeamDashboard } from './components/TeamDashboard';
import { PlayerStatistics } from './components/PlayerStatistics';
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
  const [currentView, setCurrentView] = useState('matches'); // New state for view management

  useEffect(() => {
    console.log('App mounting, view changed to:', currentView);
    // Initialize geo-redirect system - SSL certificates are now active!
    initGeoRedirect();
    
    // Fetch data based on current view
    if (currentView === 'matches') {
      fetchLiveMatches();
    }
  }, [selectedDate, currentView]);

  const fetchLiveMatches = async () => {
    if (currentView !== 'matches') return; // Only fetch when in matches view
    
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
      case 'standings':
        return <LeagueStandings />;
      case 'teams':
        return <TeamDashboard />;
      case 'players':
        return <PlayerStatistics />;
      case 'leagues':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🏆 Ligler</h2>
            <p className="text-gray-600">Bu bölüm yakında tamamlanacak...</p>
          </div>
        );
      case 'statistics':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 İstatistikler</h2>
            <p className="text-gray-600">Bu bölüm yakında tamamlanacak...</p>
          </div>
        );
      case 'countries':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🌍 Ülkeler</h2>
            <p className="text-gray-600">Bu bölüm yakında tamamlanacak...</p>
          </div>
        );
      case 'matches':
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