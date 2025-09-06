import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Users, Award } from 'lucide-react';
import { Go35Header } from './Go35Header';
import { StatsCard } from './StatsCard';
import { AnalysisChart } from './AnalysisChart';
import { ComprehensiveStatsDashboard } from './ComprehensiveStatsDashboard';
import { FootballApi } from '../services/api';

interface AnalysisPageProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
}

const possessionData = [
  { label: "Manchester City", value: 68 },
  { label: "Arsenal", value: 32 },
];

const shotsData = [
  { label: "Shots on Target", value: 75 },
  { label: "Shots off Target", value: 25 },
];

const playerRatings = [
  { name: "Kevin De Bruyne", rating: 9.2, team: "Manchester City" },
  { name: "Erling Haaland", rating: 8.8, team: "Manchester City" },
  { name: "Martin Ødegaard", rating: 8.5, team: "Arsenal" },
  { name: "Bukayo Saka", rating: 8.1, team: "Arsenal" },
];

export const AnalysisPage: React.FC<AnalysisPageProps> = ({ 
  currentView = 'analysis', 
  onViewChange 
}) => {
  const [stats, setStats] = useState({
    totalGoals: 0,
    liveMatches: 0,
    totalMatches: 0,
    activeLeagues: 0,
    countries: 0,
    withOdds: 0,
    tier1Matches: 0,
    avgGoalsPerMatch: 0,
    coverage: 0
  });
  const [comprehensiveData, setComprehensiveData] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get comprehensive data for analysis
        const comprehensiveResult = await FootballApi.getComprehensiveAllData();
        setComprehensiveData(comprehensiveResult);
        
        const matches = comprehensiveResult.matches || [];
        const liveMatches = matches.filter(m => m.isLive).length;
        const totalGoals = matches.reduce((acc, match) => 
          acc + (match.homeScore || 0) + (match.awayScore || 0), 0
        );
        const leagues = new Set(matches.map(m => m.league)).size;
        const countries = new Set(matches.map(m => m.country)).size;
        const withOdds = matches.filter(m => m.odds?.home).length;
        const tier1Matches = matches.filter(m => m.competition?.tier === 1).length;
        const avgGoalsPerMatch = matches.length > 0 ? (totalGoals / matches.length).toFixed(1) : '0.0';
        
        setStats({
          totalGoals,
          liveMatches,
          totalMatches: matches.length,
          activeLeagues: leagues,
          countries,
          withOdds,
          tier1Matches,
          avgGoalsPerMatch: parseFloat(avgGoalsPerMatch),
          coverage: Math.round((withOdds / matches.length) * 100)
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats({
          totalGoals: 127,
          liveMatches: 8,
          totalMatches: 45,
          activeLeagues: 6,
          countries: 15,
          withOdds: 38,
          tier1Matches: 22,
          avgGoalsPerMatch: 2.8,
          coverage: 84
        });
        
        // Set fallback comprehensive data
        setComprehensiveData(FootballApi.getFallbackComprehensiveData());
      }
    };
    
    fetchStats();
    // Refresh data every 3 minutes for analysis page
    const interval = setInterval(fetchStats, 180000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <Go35Header currentView={currentView} onViewChange={onViewChange} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Modern Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Match Analysis
          </h1>
          <p className="text-gray-600">In-depth statistics and performance analysis</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Goals Scored" 
            value={stats.totalGoals} 
            icon={Target} 
            trend={{ value: 12, isPositive: true }} 
            description="This season" 
          />
          <StatsCard 
            title="Live Matches" 
            value={stats.liveMatches} 
            icon={TrendingUp} 
            trend={{ value: 5, isPositive: true }} 
            description="Currently playing" 
          />
          <StatsCard 
            title="Total Matches" 
            value={stats.totalMatches} 
            icon={Users} 
            description="Today" 
          />
          <StatsCard 
            title="Active Leagues" 
            value={stats.activeLeagues} 
            icon={Award} 
            description="Competitions" 
          />
        </div>

        {/* Comprehensive Football Analytics */}
        {comprehensiveData && (
          <div className="mb-8">
            <ComprehensiveStatsDashboard 
              analytics={comprehensiveData.analytics}
              totalDataPoints={comprehensiveData.totalDataPoints}
              extractedAt={comprehensiveData.extractedAt}
            />
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AnalysisChart title="Ball Possession" data={possessionData} />
          <AnalysisChart title="Shot Accuracy" data={shotsData} />
        </div>

        {/* Player Ratings */}
        <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Player Ratings</h3>
          <div className="space-y-4">
            {playerRatings.map((player, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {player.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{player.name}</p>
                    <p className="text-sm text-gray-500">{player.team}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{player.rating}</div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};