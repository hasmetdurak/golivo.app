import React from 'react';
import { BarChart3, Activity, Clock, Trophy, Target, Globe, TrendingUp, Users, Zap, Award } from 'lucide-react';

interface GlobalStatsDashboardProps {
  stats: {
    total_matches: number;
    live_matches: number;
    finished_matches: number;
    upcoming_matches: number;
    total_goals: number;
    competitions: number;
    countries: number;
    tier_1_matches: number;
    has_odds: number;
    with_events: number;
  } | null;
  matches: any[];
}

export const GlobalStatsDashboard: React.FC<GlobalStatsDashboardProps> = ({ stats, matches }) => {
  if (!stats) return null;

  const averageGoalsPerMatch = stats.total_matches > 0 ? (stats.total_goals / stats.total_matches).toFixed(1) : '0.0';
  const livePercentage = stats.total_matches > 0 ? Math.round((stats.live_matches / stats.total_matches) * 100) : 0;
  
  // Calculate additional statistics
  const topLeagues = matches.reduce((acc: any, match: any) => {
    const league = match.league || 'Unknown';
    acc[league] = (acc[league] || 0) + 1;
    return acc;
  }, {});
  
  const topLeaguesList = Object.entries(topLeagues)
    .sort(([,a]: any, [,b]: any) => b - a)
    .slice(0, 5);

  const statCards = [
    {
      title: 'Total Matches',
      value: stats.total_matches,
      icon: Activity,
      color: 'blue',
      description: 'All matches tracked'
    },
    {
      title: 'Live Now',
      value: stats.live_matches,
      icon: Zap,
      color: 'red',
      description: `${livePercentage}% of all matches`,
      animated: true
    },
    {
      title: 'Total Goals',
      value: stats.total_goals,
      icon: Target,
      color: 'green',
      description: `${averageGoalsPerMatch} avg per match`
    },
    {
      title: 'Competitions',
      value: stats.competitions,
      icon: Trophy,
      color: 'yellow',
      description: 'Different leagues'
    },
    {
      title: 'Countries',
      value: stats.countries,
      icon: Globe,
      color: 'purple',
      description: 'Global coverage'
    },
    {
      title: 'Top Tier',
      value: stats.tier_1_matches,
      icon: Award,
      color: 'indigo',
      description: 'Premier competitions'
    },
    {
      title: 'With Odds',
      value: stats.has_odds,
      icon: TrendingUp,
      color: 'pink',
      description: 'Betting markets'
    },
    {
      title: 'Live Events',
      value: stats.with_events,
      icon: Users,
      color: 'cyan',
      description: 'Detailed coverage'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-600',
      red: 'from-red-50 to-red-100 border-red-200 text-red-600',
      green: 'from-green-50 to-green-100 border-green-200 text-green-600',
      yellow: 'from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-600',
      purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-600',
      indigo: 'from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-600',
      pink: 'from-pink-50 to-pink-100 border-pink-200 text-pink-600',
      cyan: 'from-cyan-50 to-cyan-100 border-cyan-200 text-cyan-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Global Football Statistics</h2>
            <p className="text-sm text-gray-600">Real-time data from LiveScore API</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Last updated</div>
          <div className="text-sm font-medium text-gray-700">{new Date().toLocaleTimeString()}</div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className={`bg-gradient-to-br ${getColorClasses(stat.color)} rounded-xl border-2 p-4 shadow-sm ${
                stat.animated ? 'animate-pulse' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-6 h-6 ${stat.color === 'red' ? 'text-red-500' : `text-${stat.color}-500`}`} />
                {stat.animated && (
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                )}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value.toLocaleString()}
              </div>
              <div className="text-xs font-medium text-gray-600 mb-1">
                {stat.title}
              </div>
              <div className="text-xs text-gray-500">
                {stat.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Leagues */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
          Most Active Leagues
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {topLeaguesList.map(([league, count]: [string, any], index: number) => (
            <div key={index} className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
              <div className="text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm font-bold text-white">
                    {league.charAt(0)}
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-900">{count}</div>
                <div className="text-xs text-gray-600 truncate" title={league}>
                  {league}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-green-700">
            {Math.round((stats.with_events / stats.total_matches) * 100)}%
          </div>
          <div className="text-xs text-green-600">Coverage Rate</div>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-blue-700">
            {Math.round((stats.has_odds / stats.total_matches) * 100)}%
          </div>
          <div className="text-xs text-blue-600">Odds Available</div>
        </div>
        <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-700">
            {Math.round((stats.tier_1_matches / stats.total_matches) * 100)}%
          </div>
          <div className="text-xs text-purple-600">Top Tier</div>
        </div>
      </div>
    </div>
  );
};