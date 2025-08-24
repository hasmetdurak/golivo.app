import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import { TrendingUp, BarChart3, PieChart, Activity, Target, Users, Trophy, Globe } from 'lucide-react';
import { FootballApi as footballApi } from '../services/api';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface StatsData {
  leagueStats: any[];
  topScorers: any[];
  teamStats: any[];
  matchStats: {
    totalMatches: number;
    liveMatches: number;
    finishedMatches: number;
    scheduledMatches: number;
    totalGoals: number;
    avgGoalsPerMatch: number;
    totalCards: number;
    redCards: number;
  };
}

export const StatisticsDashboard: React.FC = () => {
  const [statsData, setStatsData] = useState<StatsData>({
    leagueStats: [],
    topScorers: [],
    teamStats: [],
    matchStats: {
      totalMatches: 0,
      liveMatches: 0,
      finishedMatches: 0,
      scheduledMatches: 0,
      totalGoals: 0,
      avgGoalsPerMatch: 0,
      totalCards: 0,
      redCards: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState('overview');

  const majorLeagues = [
    { id: '152', name: 'Premier League', color: '#3B82F6' },
    { id: '302', name: 'La Liga', color: '#EF4444' },
    { id: '175', name: 'Bundesliga', color: '#EAB308' },
    { id: '207', name: 'Serie A', color: '#10B981' },
    { id: '168', name: 'Ligue 1', color: '#8B5CF6' },
    { id: '340', name: 'Süper Lig', color: '#F59E0B' }
  ];

  useEffect(() => {
    fetchStatisticsData();
  }, []);

  const fetchStatisticsData = async () => {
    setLoading(true);
    try {
      // Fetch data for multiple leagues
      const leaguePromises = majorLeagues.map(async (league) => {
        try {
          const [standings, topScorers] = await Promise.all([
            footballApi.getStandings(league.id),
            footballApi.getTopScorers(league.id)
          ]);
          return {
            league: league.name,
            color: league.color,
            standings: standings.slice(0, 5), // Top 5 teams
            topScorers: topScorers.slice(0, 3) // Top 3 scorers
          };
        } catch (error) {
          return {
            league: league.name,
            color: league.color,
            standings: generateMockStandings(league.name),
            topScorers: generateMockTopScorers(league.name)
          };
        }
      });

      const results = await Promise.all(leaguePromises);
      setStatsData({
        leagueStats: results,
        topScorers: results.flatMap(r => r.topScorers),
        teamStats: results.flatMap(r => r.standings),
        matchStats: generateMatchStats()
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setStatsData({
        leagueStats: generateMockLeagueStats(),
        topScorers: generateMockTopScorers(),
        teamStats: generateMockStandings(),
        matchStats: generateMatchStats()
      });
    } finally {
      setLoading(false);
    }
  };

  const generateMockStandings = (leagueName: string = 'Premier League') => {
    const teams = ['Manchester City', 'Arsenal', 'Liverpool', 'Chelsea', 'Tottenham'];
    return teams.map((team, index) => ({
      team_name: team,
      overall_league_position: (index + 1).toString(),
      overall_league_PTS: (80 - index * 5).toString(),
      overall_league_GF: (50 - index * 3).toString(),
      overall_league_GA: (20 + index * 2).toString(),
      overall_league_W: (20 - index).toString(),
      overall_league_D: (5 + index).toString(),
      overall_league_L: (3 + index).toString()
    }));
  };

  const generateMockTopScorers = (leagueName: string = 'All') => {
    const players = ['Haaland', 'Salah', 'Kane', 'Benzema', 'Mbappe'];
    return players.map((player, index) => ({
      player_name: player,
      team_name: `Team ${index + 1}`,
      goals: (25 - index * 2).toString(),
      assists: (10 - index).toString(),
      matches: '20'
    }));
  };

  const generateMockLeagueStats = () => {
    return majorLeagues.map(league => ({
      league: league.name,
      color: league.color,
      standings: generateMockStandings(league.name),
      topScorers: generateMockTopScorers(league.name)
    }));
  };

  const generateMatchStats = () => {
    return {
      totalMatches: 1250,
      liveMatches: 8,
      finishedMatches: 1180,
      scheduledMatches: 62,
      totalGoals: 3240,
      avgGoalsPerMatch: 2.6,
      totalCards: 850,
      redCards: 45
    };
  };

  // Chart configurations
  const leagueGoalsChart = {
    labels: statsData.leagueStats.map(l => l.league),
    datasets: [{
      label: 'Average Goals per Match',
      data: statsData.leagueStats.map(() => Math.random() * 3 + 1),
      backgroundColor: statsData.leagueStats.map(l => l.color),
      borderColor: statsData.leagueStats.map(l => l.color),
      borderWidth: 1
    }]
  };

  const topScorersChart = {
    labels: statsData.topScorers.slice(0, 10).map(s => s.player_name),
    datasets: [{
      label: 'Goals',
      data: statsData.topScorers.slice(0, 10).map(s => parseInt(s.goals)),
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 2
    }]
  };

  const matchStatsChart = {
    labels: ['Live', 'Finished', 'Scheduled'],
    datasets: [{
      data: [
        statsData.matchStats.liveMatches,
        statsData.matchStats.finishedMatches,
        statsData.matchStats.scheduledMatches
      ],
      backgroundColor: ['#10B981', '#6B7280', '#3B82F6'],
      borderWidth: 0
    }]
  };

  const teamPerformanceChart = {
    labels: statsData.teamStats.slice(0, 8).map(t => t.team_name),
    datasets: [
      {
        label: 'Points',
        data: statsData.teamStats.slice(0, 8).map(t => parseInt(t.overall_league_PTS)),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1
      },
      {
        label: 'Goals For',
        data: statsData.teamStats.slice(0, 8).map(t => parseInt(t.overall_league_GF)),
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="h-6 w-6 mr-2 text-purple-600" />
          Advanced Statistics Dashboard
        </h2>
        
        {/* Chart Navigation */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'leagues', label: 'League Stats', icon: Trophy },
            { id: 'players', label: 'Top Scorers', icon: Target },
            { id: 'teams', label: 'Team Performance', icon: Users }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveChart(id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center space-x-2 ${
                activeChart === id
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Matches</p>
              <p className="text-2xl font-bold text-gray-900">{statsData.matchStats.totalMatches}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Live Matches</p>
              <p className="text-2xl font-bold text-green-600">{statsData.matchStats.liveMatches}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Globe className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Goals</p>
              <p className="text-2xl font-bold text-red-600">{statsData.matchStats.totalGoals}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Goals/Match</p>
              <p className="text-2xl font-bold text-purple-600">{statsData.matchStats.avgGoalsPerMatch}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* League Goals Chart */}
        {(activeChart === 'overview' || activeChart === 'leagues') && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              League Performance
            </h3>
            <Bar data={leagueGoalsChart} options={chartOptions} />
          </div>
        )}

        {/* Match Status Distribution */}
        {(activeChart === 'overview' || activeChart === 'teams') && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-green-600" />
              Match Status Distribution
            </h3>
            <div className="flex justify-center">
              <div className="w-64 h-64">
                <Doughnut data={matchStatsChart} options={pieOptions} />
              </div>
            </div>
          </div>
        )}

        {/* Top Scorers Chart */}
        {(activeChart === 'overview' || activeChart === 'players') && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2 text-red-600" />
              Top Scorers Across Leagues
            </h3>
            <Bar data={topScorersChart} options={chartOptions} />
          </div>
        )}

        {/* Team Performance Comparison */}
        {(activeChart === 'overview' || activeChart === 'teams') && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-600" />
              Team Performance Comparison
            </h3>
            <Bar data={teamPerformanceChart} options={chartOptions} />
          </div>
        )}
      </div>

      {/* League Comparison Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
            League Comparison Analysis
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">League</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Top Team</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Points</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Goals For</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Top Scorer</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Goals</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {statsData.leagueStats.map((league, index) => {
                const topTeam = league.standings[0];
                const topScorer = league.topScorers[0];
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: league.color }}
                        ></div>
                        <span className="font-medium text-gray-900">{league.league}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                      {topTeam?.team_name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-blue-600">
                      {topTeam?.overall_league_PTS || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                      {topTeam?.overall_league_GF || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                      {topScorer?.player_name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-green-600">
                      {topScorer?.goals || 'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};