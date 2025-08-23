// GoLivo Modern Football App - Updated Design - Force Deploy 2024
// Last update: Modern horizontal layout without old components
// Vercel sync trigger: DEPLOY_NOW_2024
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MatchList } from './components/MatchList';
import { FootballApi } from './services/api';

function App() {
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchLiveMatches();
  }, [selectedDate]);

  const fetchLiveMatches = async () => {
    setLoading(true);
    try {
      console.log('Fetching all matches for date:', selectedDate);
      const matches = await FootballApi.getLiveMatches('all');
      console.log('Received matches:', matches.length);
      setLiveMatches(matches);
    } catch (error) {
      console.error('Error loading matches:', error);
      setLiveMatches([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
          />
        </div>
      </main>
    </div>
  );
}

export default App;