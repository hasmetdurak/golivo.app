import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Flag } from 'lucide-react';
import { Go35Header } from './Go35Header';
import { MatchCard } from './MatchCard';
import { MatchDetailsModal } from './MatchDetailsModal';
import { GlobalStatsDashboard } from './GlobalStatsDashboard';
import { ComprehensiveStatsDashboard } from './ComprehensiveStatsDashboard';
import { FootballApi } from '../services/api';
import { getOfficialLeagueLogo } from '../utils/teamLogos';
import { getFormattedLeagueName, getLeagueLogo, getCountryFlag } from '../utils/leagueUtils';
import { InteractiveHoverButton } from './ui/interactive-hover-button';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  isLive?: boolean;
  minute?: number;
  status: "live" | "finished" | "upcoming" | "scheduled" | "halftime";
  time?: string;
  homeLogo?: string;
  awayLogo?: string;
  leagueId?: string;
  venue?: string;
  referee?: string;
  odds?: { home: number; draw: number; away: number };
  goalscorers?: any[];
  cards?: any[];
  substitutions?: any;
  events?: any[];
  statistics?: any;
  enhancedData?: any;
}

interface League {
  id: string;
  name: string;
  displayName?: string;
  country?: string;
  logo: string;
  matches: Match[];
  tier?: number;
}

interface Go35MainPageProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
}

export const Go35MainPage: React.FC<Go35MainPageProps> = ({ 
  currentView = 'scores', 
  onViewChange 
}) => {
  const [expandedLeagues, setExpandedLeagues] = useState<string[]>(['England Premier League', 'Spain La Liga', 'Italy Serie A', 'Germany Bundesliga', 'France Ligue 1']);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [comprehensiveData, setComprehensiveData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [modalViewMode, setModalViewMode] = useState<'mini' | 'full'>('mini');
  const [globalStats, setGlobalStats] = useState<any>(null);
  const [allMatches, setAllMatches] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const handleMatchClick = (match: any) => {
    console.log('🎯 Match clicked:', match.id);
    setSelectedMatch(match);
  };

  const handleCloseModal = () => {
    setSelectedMatch(null);
  };

  const handleViewModeChange = (mode: 'mini' | 'full') => {
    setModalViewMode(mode);
  };

  useEffect(() => {
    let isMounted = true;
    let refreshTimeout: NodeJS.Timeout;
    
    const fetchComprehensiveData = async (isInitialLoad = false) => {
      // Prevent overlapping requests
      if (isRefreshing && !isInitialLoad) {
        console.log('⏭️ Skipping refresh - already in progress');
        return;
      }
      
      try {
        if (isInitialLoad) {
          setLoading(true);
        } else {
          setIsRefreshing(true);
        }
        
        console.log('🚀 Starting comprehensive data extraction...');
        
        // Get all available data from API
        const comprehensiveResult = await FootballApi.getComprehensiveAllData();
        
        // Only update state if component is still mounted
        if (!isMounted) return;
        
        // Batch state updates to prevent flickering
        setComprehensiveData(comprehensiveResult);
        
        // Process matches efficiently
        const allMatches = comprehensiveResult.matches || [];
        
        // Filter matches more efficiently
        const relevantMatches = allMatches.filter(match => {
          const isLive = match.isLive;
          const isToday = new Date(match.scheduled || new Date()).toDateString() === new Date().toDateString();
          const isRecent = match.status === 'finished' && 
            (Date.now() - new Date(match.scheduled || 0).getTime()) < 86400000; // Last 24 hours
          
          return isLive || isToday || isRecent;
        });
        
        console.log('📊 Comprehensive data loaded:', {
          totalMatches: allMatches.length,
          liveMatches: liveMatches.length,
          todayMatches: todayMatches.length,
          leagues: comprehensiveResult.leagues?.length || 0,
          countries: comprehensiveResult.countries?.length || 0
        });
        
        // Process leagues with enhanced data - optimized
        const leagueMap = new Map();
        
        // Process relevant matches only
        relevantMatches.forEach(match => {
          const leagueName = match.league;
          if (!leagueMap.has(leagueName)) {
            leagueMap.set(leagueName, {
              id: leagueName.toLowerCase().replace(/\s+/g, '-'),
              name: leagueName,
              displayName: getFormattedLeagueName(leagueName, match.country),
              country: match.country || 'Unknown',
              logo: '/placeholder-logo.svg', // Will be enriched with TheSportsDB
              matches: [],
              tier: match.competition?.tier || 10,
              enhancedData: {
                totalGoals: 0,
                avgGoalsPerMatch: 0,
                dataQuality: 0
              }
            });
          }
          
          const league = leagueMap.get(leagueName);
          league.matches.push({
            id: match.id,
            homeTeam: match.homeTeam?.name || match.homeTeam,
            awayTeam: match.awayTeam?.name || match.awayTeam,
            homeScore: match.homeScore,
            awayScore: match.awayScore,
            homeHtScore: match.homeHtScore,
            awayHtScore: match.awayHtScore,
            isLive: match.isLive,
            minute: match.minute,
            status: match.status === 'upcoming' ? 'scheduled' : match.status,
            time: match.time,
            homeLogo: match.homeLogo || '/placeholder-logo.svg',
            awayLogo: match.awayLogo || '/placeholder-logo.svg',
            leagueId: match.league,
            venue: match.venue,
            referee: match.referee,
            odds: match.odds,
            competition: match.competition,
            events: match.enhancedData?.events || [],
            statistics: match.enhancedData?.statistics || {},
            enhancedData: match.enhancedData
          });
          
          // Update league stats
          if (match.status === 'finished') {
            league.enhancedData.totalGoals += (match.homeScore || 0) + (match.awayScore || 0);
          }
          league.enhancedData.dataQuality = match.enhancedData?.dataQuality || {};
        });
        
        // Calculate league averages
        leagueMap.forEach(league => {
          const finishedMatches = league.matches.filter((m: any) => m.status === 'finished');
          if (finishedMatches.length > 0) {
            league.enhancedData.avgGoalsPerMatch = league.enhancedData.totalGoals / finishedMatches.length;
          }
        });
        
        // Enrich leagues with TheSportsDB logos
        const leaguesArray = Array.from(leagueMap.values());
        
        // Fetch league logos from TheSportsDB in parallel
        await Promise.all(
          leaguesArray.map(async (league) => {
            try {
              const logo = await FootballApi.getLeagueLogoFromSportsDB(league.name);
              league.logo = logo;
            } catch (error) {
              console.warn(`Failed to fetch logo for league ${league.name}:`, error);
            }
          })
        );
        
        const priorityLeagues = ['England Premier League', 'Spain La Liga', 'Italy Serie A', 'Germany Bundesliga', 'France Ligue 1', 'Turkey Süper Lig'];
        
        leaguesArray.sort((a, b) => {
          const aHasLive = a.matches.some((m: any) => m.isLive);
          const bHasLive = b.matches.some((m: any) => m.isLive);
          
          if (aHasLive !== bHasLive) return bHasLive ? 1 : -1;
          if (a.tier !== b.tier) return a.tier - b.tier;
          
          const aIndex = priorityLeagues.indexOf(a.displayName || a.name);
          const bIndex = priorityLeagues.indexOf(b.displayName || b.name);
          
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          
          return a.name.localeCompare(b.name);
        });
        
        // Batch state updates at the end
        setAllMatches(allMatches);
        setLeagues(leaguesArray);
        setGlobalStats(comprehensiveResult.analytics?.overview || {});
        setLastUpdate(new Date());
        
        console.log('✨ Enhanced leagues processed:', {
          leagues: leaguesArray.length,
          totalMatches: leaguesArray.reduce((acc, league) => acc + league.matches.length, 0)
        });
        
      } catch (error) {
        console.error('❌ Comprehensive data error:', error);
        
        // Enhanced fallback with sample data
        const fallbackData = FootballApi.getFallbackComprehensiveData();
        setComprehensiveData(fallbackData);
        
        const enhancedFallback: League[] = [
          {
            id: 'premier-league',
            name: 'Premier League',
            displayName: 'England Premier League',
            country: 'England',
            logo: getEnhancedLeagueLogo('Premier League'),
            matches: [
              {
                id: 'live-1',
                homeTeam: 'Liverpool',
                awayTeam: 'Arsenal',
                homeScore: 1,
                awayScore: 2,
                isLive: true,
                minute: 67,
                status: 'live',
                time: '67\'',
                homeLogo: '/placeholder-logo.svg',
                awayLogo: '/placeholder-logo.svg',
                events: [
                  { minute: '23', type: 'goal', team: 'home', player: 'Salah', description: 'Goal' },
                  { minute: '56', type: 'goal', team: 'away', player: 'Saka', description: 'Goal' }
                ]
              }
            ]
          }
        ];
        setLeagues(enhancedFallback);
        setGlobalStats(fallbackData.analytics.overview);
        setAllMatches(fallbackData.matches);
      } finally {
        if (isMounted) {
          if (isInitialLoad) {
            setLoading(false);
          } else {
            setIsRefreshing(false);
          }
        }
      }
    };

    // Initial load
    fetchComprehensiveData(true);
    
    // Auto-refresh every 3 minutes (180 seconds) - much more reasonable for comprehensive data
    const scheduleNextRefresh = () => {
      refreshTimeout = setTimeout(() => {
        if (isMounted) {
          fetchComprehensiveData(false).finally(() => {
            if (isMounted) {
              scheduleNextRefresh(); // Schedule next refresh
            }
          });
        }
      }, 180000); // 3 minutes instead of 30 seconds
    };
    
    scheduleNextRefresh();
    
    return () => {
      isMounted = false;
      if (refreshTimeout) {
        clearTimeout(refreshTimeout);
      }
    };
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Go35Header currentView={currentView} onViewChange={onViewChange} />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading live matches...</p>
          </div>
        </div>
      </div>
    );
  }

  const totalMatches = leagues.reduce((acc, league) => acc + league.matches.length, 0);
  const totalLiveMatches = leagues.reduce((acc, league) => 
    acc + league.matches.filter(match => match.isLive).length, 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Go35Header currentView={currentView} onViewChange={onViewChange} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Simple Title */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Live Football Scores
          </h1>
          {isRefreshing && (
            <div className="flex items-center justify-center space-x-2 text-purple-600">
              <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Updating...</span>
            </div>
          )}
        </div>

        {/* Scores Section - Always Visible */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading matches...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {totalMatches === 0 ? (
              <div className="text-center py-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No Live Matches Currently</h2>
                <p className="text-gray-600 mb-6">Showing today's completed matches</p>
              </div>
            ) : null}
            {leagues.map((league) => (
              <div key={league.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img 
                        src={league.logo} 
                        alt={league.displayName || league.name} 
                        className="w-10 h-10 rounded-lg shadow-sm border border-gray-200"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-logo.svg';
                        }}
                      />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
                        <span className="text-xs">{getCountryFlag(league.country || 'Unknown')}</span>
                      </div>
                    </div>
                    <InteractiveHoverButton
                      onClick={() => {
                        const leagueKey = league.displayName || league.name;
                        setExpandedLeagues(prev => 
                          prev.includes(leagueKey) 
                            ? prev.filter(name => name !== leagueKey)
                            : [...prev, leagueKey]
                        );
                      }}
                      className="bg-white hover:bg-gray-50 border-gray-200 text-gray-900 hover:text-purple-600"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{league.displayName || league.name}</span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {league.matches.length} matches
                        </span>
                      </div>
                    </InteractiveHoverButton>
                  </div>
                  <div className="flex items-center space-x-3">
                    {league.matches.some(m => m.isLive) && (
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-lg">
                        LIVE
                      </span>
                    )}
                    {expandedLeagues.includes(league.displayName || league.name) ? 
                      <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    }
                  </div>
                </div>

                {expandedLeagues.includes(league.displayName || league.name) && (
                  <div className="p-4 bg-gray-50">
                    <div className="grid gap-3">
                      {league.matches.map((match) => (
                        <MatchCard
                          key={match.id}
                          match={{
                            id: match.id,
                            homeTeam: { name: match.homeTeam, logo: match.homeLogo || '/placeholder-logo.svg' },
                            awayTeam: { name: match.awayTeam, logo: match.awayLogo || '/placeholder-logo.svg' },
                            homeScore: match.homeScore,
                            awayScore: match.awayScore,
                            isLive: match.isLive,
                            minute: match.isLive ? (match.minute?.toString() || '0') : null,
                            status: match.status,
                            time: match.isLive 
                              ? (match.minute ? `${match.minute}'` : 'LIVE')
                              : match.status === 'finished' 
                                ? 'FT'
                                : match.time || '00:00',
                            league: league.displayName || league.name
                          }}
                          isLive={match.isLive || false}
                          onClick={() => {
                            console.log('🎯 MatchCard onClick triggered for:', match.id);
                            handleMatchClick({
                              id: match.id,
                              homeTeam: { name: match.homeTeam, logo: match.homeLogo },
                              awayTeam: { name: match.awayTeam, logo: match.awayLogo },
                              homeScore: match.homeScore,
                              awayScore: match.awayScore,
                              isLive: match.isLive,
                              minute: match.minute?.toString() || '0',
                              status: match.status,
                              time: match.isLive 
                                ? (match.minute ? `${match.minute}'` : 'LIVE')
                                : match.status === 'finished' 
                                  ? 'FT'
                                  : match.time || '00:00',
                              league: league.displayName || league.name,
                              venue: match.venue || 'Unknown Venue',
                              referee: match.referee || 'Unknown Referee',
                              goalscorers: match.goalscorers || [],
                              cards: match.cards || [],
                              substitutions: match.substitutions || {},
                              events: match.events || [],
                              statistics: match.statistics || {},
                              enhancedData: match.enhancedData
                            });
                          }}
                        />

                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      
      {/* Match Details Modal - WORKING */}
      {selectedMatch && (
        <MatchDetailsModal
          match={selectedMatch}
          isOpen={!!selectedMatch}
          onClose={handleCloseModal}
          viewMode={modalViewMode}
          onViewModeChange={handleViewModeChange}
        />
      )}
    </div>
  );
};