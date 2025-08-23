// GoLivo Modern Football App - Updated Design - Force Deploy 2024
// Last update: Modern horizontal layout without old components
// Vercel sync trigger: DEPLOY_NOW_2024
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MatchList } from './components/MatchList';
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

  useEffect(() => {
    console.log('App mounting, fetching matches...');
    // Initialize geo-redirect system (disabled temporarily for SSL setup)
    // initGeoRedirect();
    fetchLiveMatches();
  }, [selectedDate]);

  const fetchLiveMatches = async () => {
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

  // Get current language URL for SEO
  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin + window.location.pathname;
    }
    // Fallback for SSR or initial load
    const subdomainMap: Record<string, string> = {
      'tr': 'https://tr.golivo.app/',
      'en': 'https://en.golivo.app/',
      'de': 'https://de.golivo.app/',
      'es': 'https://es.golivo.app/',
      'pt': 'https://pt.golivo.app/',
      'fr': 'https://fr.golivo.app/',
      'it': 'https://it.golivo.app/',
      'ja': 'https://ja.golivo.app/',
      'ru': 'https://ru.golivo.app/',
      'ko': 'https://ko.golivo.app/',
      'zh-CN': 'https://cn.golivo.app/',
      'zh-TW': 'https://tw.golivo.app/',
      'hi': 'https://hi.golivo.app/',
      'pl': 'https://pl.golivo.app/',
      'fa': 'https://fa.golivo.app/',
      'vi': 'https://vi.golivo.app/',
      'kk': 'https://kk.golivo.app/',
      'tl': 'https://tl.golivo.app/',
      'sw': 'https://sw.golivo.app/',
      'en-IN': 'https://in.golivo.app/'
    };
    return subdomainMap[currentLang] || 'https://tr.golivo.app/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={t.appTitle}
        description={`${t.todaysMatches} - ${t.appTitle}. ${t.liveMatch} ${t.matchesCount.toLowerCase()}.`}
        canonical={getCurrentUrl()}
      />
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
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="space-y-4">
          <MatchList 
            matches={liveMatches}
            loading={loading}
            selectedLeague={selectedLeague}
            selectedDate={selectedDate}
            translations={t}
          />
        </div>
      </main>
    </div>
  );
}

export default App;