import React, { useMemo } from 'react';
import { TrendingUp, Globe, Trophy, Target, Clock, BarChart3, Activity, Zap, Award, Users, Flag, Calendar, Timer, Star } from 'lucide-react';

interface ComprehensiveStatsProps {
  analytics: any;
  totalDataPoints: any;
  extractedAt: string;
}

export const ComprehensiveStatsDashboard: React.FC<ComprehensiveStatsProps> = React.memo(({ 
  analytics, 
  totalDataPoints, 
  extractedAt 
}) => {
  // Memoize expensive calculations
  const memoizedStats = useMemo(() => {
    if (!analytics) return null;
    
    const { overview, leagues, geography, timing, quality } = analytics;
    
    return {
      overview,
      leagues,
      geography,
      timing,
      quality,
      totalDataPointsSum: totalDataPoints ? Object.values(totalDataPoints).reduce((a: number, b: any) => a + (Number(b) || 0), 0) : 0
    };
  }, [analytics, totalDataPoints]);
  
  if (!analytics || !memoizedStats) return null;
  
  const { overview, leagues, geography, timing, quality, totalDataPointsSum } = memoizedStats;

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    subtitle, 
    color = 'blue',
    trend,
    className = ''
  }: any) => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-lg flex items-center justify-center shadow-md`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="w-4 h-4" />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 font-medium mb-1">{title}</p>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );

  const ProgressBar = ({ label, value, total, color = 'blue' }: any) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    return (
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{label}</span>
          <span>{value}/{total} ({percentage.toFixed(1)}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`bg-gradient-to-r from-${color}-500 to-${color}-600 h-2 rounded-full transition-all duration-1000`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 mb-8">
      {/* Header Section - Simplified */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Football Analytics</h2>
            <p className="text-purple-100">Real-time match data and statistics</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold">{new Date(extractedAt).toLocaleTimeString()}</div>
            <div className="text-sm text-purple-200">{totalDataPointsSum} data points</div>
          </div>
        </div>
      </div>

      {/* Overview Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Activity}
          title="Total Matches"
          value={overview.totalMatches.toLocaleString()}
          subtitle="Across all leagues"
          color="blue"
        />
        <StatCard
          icon={Zap}
          title="Live Now"
          value={overview.liveMatches}
          subtitle="Active matches"
          color="red"
          className="ring-2 ring-red-200"
        />
        <StatCard
          icon={Target}
          title="Total Goals"
          value={overview.totalGoals.toLocaleString()}
          subtitle={`Avg: ${overview.avgGoalsPerMatch}/match`}
          color="green"
        />
        <StatCard
          icon={Trophy}
          title="Competitions"
          value={leagues.totalLeagues}
          subtitle={`${geography.totalCountries} countries`}
          color="purple"
        />
      </div>

      {/* Detailed Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Match Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Match Status</h3>
          </div>
          
          <div className="space-y-4">
            <ProgressBar 
              label="Finished" 
              value={overview.finishedMatches} 
              total={overview.totalMatches} 
              color="gray" 
            />
            <ProgressBar 
              label="Live" 
              value={overview.liveMatches} 
              total={overview.totalMatches} 
              color="red" 
            />
            <ProgressBar 
              label="Upcoming" 
              value={overview.upcomingMatches} 
              total={overview.totalMatches} 
              color="blue" 
            />
          </div>
        </div>

        {/* Time Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Match Timing</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <span className="font-medium text-yellow-800">Morning (6-12)</span>
              <span className="font-bold text-yellow-900">{timing.timeSlots.morning}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="font-medium text-blue-800">Afternoon (12-18)</span>
              <span className="font-bold text-blue-900">{timing.timeSlots.afternoon}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
              <span className="font-medium text-purple-800">Evening (18-24)</span>
              <span className="font-bold text-purple-900">{timing.timeSlots.evening}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="font-medium text-gray-800">Night (0-6)</span>
              <span className="font-bold text-gray-900">{timing.timeSlots.night}</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
            <div className="text-sm text-indigo-700 font-medium">Peak Time</div>
            <div className="text-lg font-bold text-indigo-900 capitalize">{timing.peakTime}</div>
          </div>
        </div>

        {/* Data Quality */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Data Richness</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Statistics Coverage</span>
                <span>{quality.dataRichness.statistics}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                  style={{ width: `${quality.dataRichness.statistics}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Events Coverage</span>
                <span>{quality.dataRichness.events}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                  style={{ width: `${quality.dataRichness.events}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Lineups Coverage</span>
                <span>{quality.dataRichness.lineups}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                  style={{ width: `${quality.dataRichness.lineups}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
            <div className="text-sm text-emerald-700 font-medium">Overall Quality Score</div>
            <div className="text-2xl font-bold text-emerald-900">
              {((parseFloat(quality.dataRichness.statistics) + parseFloat(quality.dataRichness.events) + parseFloat(quality.dataRichness.lineups)) / 3).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Top Leagues and Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Top Leagues */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Top Leagues by Matches</h3>
          </div>
          
          <div className="space-y-3">
            {leagues.topLeaguesByMatches.slice(0, 8).map(([leagueName, stats]: any, index: number) => (
              <div key={leagueName} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{leagueName}</div>
                    <div className="text-sm text-gray-500">
                      Live: {stats.live} • Finished: {stats.finished}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{stats.total}</div>
                  <div className="text-sm text-gray-500">matches</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Top Countries by Matches</h3>
          </div>
          
          <div className="space-y-3">
            {geography.topCountriesByMatches.slice(0, 8).map(([countryName, matchCount]: any, index: number) => {
              const flagMap: any = {
                'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
                'Spain': '🇪🇸',
                'Germany': '🇩🇪',
                'Italy': '🇮🇹',
                'France': '🇫🇷',
                'Turkey': '🇹🇷',
                'Netherlands': '🇳🇱',
                'Portugal': '🇵🇹',
                'Brazil': '🇧🇷',
                'Argentina': '🇦🇷',
                'USA': '🇺🇸'
              };
              
              return (
                <div key={countryName} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{flagMap[countryName] || '🌍'}</div>
                    <div>
                      <div className="font-medium text-gray-900">{countryName}</div>
                      <div className="text-sm text-gray-500">#{index + 1} in activity</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{matchCount}</div>
                    <div className="text-sm text-gray-500">matches</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});