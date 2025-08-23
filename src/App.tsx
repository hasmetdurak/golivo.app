import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LeagueTabs } from './components/LeagueTabs';
import { MatchList } from './components/MatchList';
import { FootballApi } from './services/api';

function App() {
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
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
      console.error('Error loading matches:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50">
      <Header 
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <LeagueTabs 
            selectedLeague={selectedLeague}
            onLeagueSelect={setSelectedLeague}
          />
        </div>
        
        <div className="space-y-6">
          <MatchList 
            matches={liveMatches}
            loading={loading}
            selectedLeague={selectedLeague}
            selectedDate={selectedDate}
          />
        </div>
      </main>
      
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
}

export default App;