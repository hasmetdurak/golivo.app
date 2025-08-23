import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LeagueTabs } from './components/LeagueTabs';
import { MatchList } from './components/MatchList';
import { FootballApi } from './services/api';

function App() {
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchLiveMatches();
  }, [selectedLeague, selectedDate]);

  const fetchLiveMatches = async () => {
    setLoading(true);
    try {
      const matches = await FootballApi.getLiveMatches(selectedLeague);
      setLiveMatches(matches);
    } catch (error) {
      console.error('Maçlar yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Header 
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <LeagueTabs 
          selectedLeague={selectedLeague}
          onLeagueSelect={setSelectedLeague}
        />
        
        <div className="mt-6">
          <MatchList 
            matches={liveMatches}
            loading={loading}
            selectedLeague={selectedLeague}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;