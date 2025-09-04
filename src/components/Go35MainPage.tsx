import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Go35Header } from './Go35Header';
import { FootballApi } from '../services/api';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  isLive?: boolean;
  minute?: number;
  status: "live" | "finished" | "upcoming";
  time?: string;
  homeLogo?: string;
  awayLogo?: string;
  leagueId?: string;
}

interface League {
  id: string;
  name: string;
  logo: string;
  matches: Match[];
}

interface Go35MainPageProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
}

export const Go35MainPage: React.FC<Go35MainPageProps> = ({ 
  currentView = 'scores', 
  onViewChange 
}) => {
  const [expandedLeagues, setExpandedLeagues] = useState<string[]>(['Premier League', 'La Liga', 'Serie A', 'Bundesliga']);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveMatches = async () => {
      try {
        setLoading(true);
        console.log('🔄 Fetching live matches...');
        const realMatches = await FootballApi.getLiveMatches();
        
        // Only show live matches
        const liveMatches = realMatches.filter(match => match.isLive);
        
        const groupedByLeague: League[] = [];
        const leagueMap = new Map();
        
        liveMatches.forEach(match => {
          const leagueName = match.league;
          if (!leagueMap.has(leagueName)) {
            leagueMap.set(leagueName, {
              id: leagueName.toLowerCase().replace(/\s+/g, '-'),
              name: leagueName,
              logo: '/placeholder-logo.svg',
              matches: []
            });
          }
          leagueMap.get(leagueName).matches.push({
            id: match.id,
            homeTeam: match.homeTeam.name,
            awayTeam: match.awayTeam.name,
            homeScore: match.homeScore,
            awayScore: match.awayScore,
            isLive: match.isLive,
            minute: match.minute,
            status: match.status,
            time: match.time,
            homeLogo: match.homeTeam.logo,
            awayLogo: match.awayTeam.logo,
            leagueId: match.league
          });
        });
        
        const leaguesArray = Array.from(leagueMap.values());
        setLeagues(leaguesArray);
        
        console.log('✅ Live matches loaded:', leaguesArray.length, 'leagues');
      } catch (error) {
        console.error('❌ API Error, using fallback live data:', error);
        
        // Fallback live matches only
        const mockLiveLeagues: League[] = [
          {
            id: '152',
            name: 'Premier League',
            logo: '/placeholder-logo.svg',
            matches: [
              {
                id: '1',
                homeTeam: 'Manchester City',
                awayTeam: 'Liverpool',
                homeScore: 2,
                awayScore: 1,
                isLive: true,
                minute: 67,
                status: 'live',
                homeLogo: '/placeholder-logo.svg',
                awayLogo: '/placeholder-logo.svg',
                leagueId: '152'
              },
              {
                id: '4',
                homeTeam: 'Arsenal',
                awayTeam: 'Tottenham',
                homeScore: 1,
                awayScore: 1,
                isLive: true,
                minute: 23,
                status: 'live',
                homeLogo: '/placeholder-logo.svg',
                awayLogo: '/placeholder-logo.svg',
                leagueId: '152'
              }
            ]
          },
          {
            id: '302',
            name: 'La Liga',
            logo: '/placeholder-logo.svg',
            matches: [
              {
                id: '3',
                homeTeam: 'Real Madrid',
                awayTeam: 'Barcelona',
                homeScore: 0,
                awayScore: 0,
                isLive: true,
                minute: 12,
                status: 'live',
                homeLogo: '/placeholder-logo.svg',
                awayLogo: '/placeholder-logo.svg',
                leagueId: '302'
              }
            ]
          }
        ];
        
        setLeagues(mockLiveLeagues);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLiveMatches();
    
    // Update every 10 seconds for live scores
    const interval = setInterval(fetchLiveMatches, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Go35Header currentView={currentView} onViewChange={onViewChange} />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading live matches...</p>
          </div>
        </div>
      </div>
    );
  }

  const totalLiveMatches = leagues.reduce((acc, league) => acc + league.matches.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Go35Header currentView={currentView} onViewChange={onViewChange} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Simple Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Live Football Scores
          </h1>
          <p className="text-gray-600">
            {totalLiveMatches} live matches • Updated every 10 seconds
          </p>
        </div>

        {totalLiveMatches === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚽</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Live Matches</h2>
            <p className="text-gray-600">Check back later for live football action!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {leagues.map((league) => (
              <div key={league.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div 
                  className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    setExpandedLeagues(prev => 
                      prev.includes(league.name) 
                        ? prev.filter(name => name !== league.name)
                        : [...prev, league.name]
                    );
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <img 
                      src={league.logo} 
                      alt={league.name} 
                      className="w-6 h-6 rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-logo.svg';
                      }}
                    />
                    <div>
                      <h2 className="font-semibold text-gray-900">{league.name}</h2>
                      <p className="text-sm text-gray-500">{league.matches.length} live matches</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                      LIVE
                    </span>
                    {expandedLeagues.includes(league.name) ? 
                      <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    }
                  </div>
                </div>

                {expandedLeagues.includes(league.name) && (
                  <div className="p-4">
                    <div className="space-y-3">
                      {league.matches.map((match) => (
                        <div key={match.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between">
                            {/* Teams and Score */}
                            <div className="flex items-center space-x-6 flex-1">
                              {/* Home Team */}
                              <div className="flex items-center space-x-2 flex-1">
                                <img 
                                  src={match.homeLogo || '/placeholder-logo.svg'} 
                                  alt={match.homeTeam} 
                                  className="w-5 h-5 rounded-full"
                                  onError={(e) => {
                                    e.currentTarget.src = '/placeholder-logo.svg';
                                  }}
                                />
                                <span className="font-medium text-gray-900 text-right">{match.homeTeam}</span>
                              </div>
                              
                              {/* Score */}
                              <div className="text-center min-w-[80px]">
                                <div className="text-xl font-bold text-gray-900 mb-1">
                                  {match.homeScore ?? 0} - {match.awayScore ?? 0}
                                </div>
                                {/* Flashing Red Minute */}
                                <div className="text-xs font-bold text-red-500 animate-pulse">
                                  {match.minute}'
                                </div>
                              </div>
                              
                              {/* Away Team */}
                              <div className="flex items-center space-x-2 flex-1">
                                <span className="font-medium text-gray-900">{match.awayTeam}</span>
                                <img 
                                  src={match.awayLogo || '/placeholder-logo.svg'} 
                                  alt={match.awayTeam} 
                                  className="w-5 h-5 rounded-full"
                                  onError={(e) => {
                                    e.currentTarget.src = '/placeholder-logo.svg';
                                  }}
                                />
                              </div>
                            </div>
                            
                            {/* Live Indicator */}
                            <div className="ml-4">
                              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                                LIVE
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};