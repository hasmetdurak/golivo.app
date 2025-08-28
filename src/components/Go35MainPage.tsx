import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Go35Header } from './Go35Header';

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
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [leagues, setLeagues] = useState<League[]>([]);

  useEffect(() => {
    // Mock data that matches go35 structure
    const mockLeagues: League[] = [
      {
        id: '152',
        name: 'Premier League',
        logo: '/api/placeholder/32/32',
        matches: [
          {
            id: '1',
            homeTeam: 'Liverpool',
            awayTeam: 'Newcastle United',
            homeScore: 4,
            awayScore: 2,
            status: 'finished',
            homeLogo: '/api/placeholder/24/24',
            awayLogo: '/api/placeholder/24/24'
          },
          {
            id: '2',
            homeTeam: 'West Ham United',
            awayTeam: 'Brighton & Hove Albion',
            homeScore: 0,
            awayScore: 0,
            status: 'finished',
            homeLogo: '/api/placeholder/24/24',
            awayLogo: '/api/placeholder/24/24'
          },
          {
            id: '3',
            homeTeam: 'Burnley',
            awayTeam: 'Luton Town',
            homeScore: 1,
            awayScore: 1,
            status: 'finished',
            homeLogo: '/api/placeholder/24/24',
            awayLogo: '/api/placeholder/24/24'
          },
          {
            id: '4',
            homeTeam: 'Chelsea',
            awayTeam: 'Fulham',
            homeScore: 1,
            awayScore: 0,
            status: 'finished',
            homeLogo: '/api/placeholder/24/24',
            awayLogo: '/api/placeholder/24/24'
          },
          {
            id: '5',
            homeTeam: 'Newcastle United',
            awayTeam: 'Manchester City',
            homeScore: 2,
            awayScore: 3,
            status: 'finished',
            homeLogo: '/api/placeholder/24/24',
            awayLogo: '/api/placeholder/24/24'
          }
        ]
      },
      {
        id: '302',
        name: 'La Liga',
        logo: '/api/placeholder/32/32',
        matches: [
          {
            id: '6',
            homeTeam: 'Getafe',
            awayTeam: 'Rayo Vallecano',
            homeScore: 0,
            awayScore: 2,
            status: 'finished',
            homeLogo: '/api/placeholder/24/24',
            awayLogo: '/api/placeholder/24/24'
          },
          {
            id: '7',
            homeTeam: 'Valencia',
            awayTeam: 'Villarreal',
            homeScore: 3,
            awayScore: 1,
            status: 'finished',
            homeLogo: '/api/placeholder/24/24',
            awayLogo: '/api/placeholder/24/24'
          },
          {
            id: '8',
            homeTeam: 'Real Sociedad',
            awayTeam: 'Alaves',
            homeScore: 1,
            awayScore: 1,
            status: 'finished',
            homeLogo: '/api/placeholder/24/24',
            awayLogo: '/api/placeholder/24/24'
          },
          {
            id: '9',
            homeTeam: 'Girona',
            awayTeam: 'Atletico Madrid',
            homeScore: 4,
            awayScore: 3,
            status: 'finished',
            homeLogo: '/api/placeholder/24/24',
            awayLogo: '/api/placeholder/24/24'
          },
          {
            id: '10',
            homeTeam: 'Celta Vigo',
            awayTeam: 'Real Betis',
            homeScore: 2,
            awayScore: 1,
            status: 'finished',
            homeLogo: '/api/placeholder/24/24',
            awayLogo: '/api/placeholder/24/24'
          }
        ]
      },
      {
        id: '207',
        name: 'Serie A',
        logo: '/api/placeholder/32/32',
        matches: [
          {
            id: '11',
            homeTeam: 'Bologna',
            awayTeam: 'Genoa',
            homeScore: 1,
            awayScore: 1,
            status: 'finished',
            homeLogo: '/api/placeholder/24/24',
            awayLogo: '/api/placeholder/24/24'
          },
          {
            id: '12',
            homeTeam: 'Frosinone',
            awayTeam: 'Monza',
            homeScore: 2,
            awayScore: 3,
            status: 'finished',
            homeLogo: '/api/placeholder/24/24',
            awayLogo: '/api/placeholder/24/24'
          }
        ]
      },
      {
        id: '175',
        name: 'Bundesliga',
        logo: '/api/placeholder/32/32',
        matches: [
          {
            id: '13',
            homeTeam: 'Bayern Munich',
            awayTeam: 'Hoffenheim',
            homeScore: 3,
            awayScore: 0,
            status: 'finished',
            homeLogo: '/api/placeholder/24/24',
            awayLogo: '/api/placeholder/24/24'
          },
          {
            id: '14',
            homeTeam: 'RB Leipzig',
            awayTeam: 'Eintracht Frankfurt',
            homeScore: 0,
            awayScore: 1,
            status: 'finished',
            homeLogo: '/api/placeholder/24/24',
            awayLogo: '/api/placeholder/24/24'
          }
        ]
      }
    ];

    setLeagues(mockLeagues);
    
    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const toggleLeague = (leagueName: string) => {
    setExpandedLeagues(prev => 
      prev.includes(leagueName) 
        ? prev.filter(name => name !== leagueName)
        : [...prev, leagueName]
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (currentView !== 'scores') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Go35Header currentView={currentView} onViewChange={onViewChange} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {currentView === 'news' && 'Football News'}
              {currentView === 'analysis' && 'Match Analysis'}
              {currentView === 'contact' && 'Contact Us'}
            </h2>
            <p className="text-gray-600">
              {currentView === 'news' && 'Latest football news coming soon...'}
              {currentView === 'analysis' && 'Professional match analysis coming soon...'}
              {currentView === 'contact' && 'Get in touch with us...'}
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Go35Header currentView={currentView} onViewChange={onViewChange} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Live Scores</h1>
          <p className="text-gray-600">Stay updated with the latest football scores and live matches</p>
        </div>

        {/* League Sections */}
        <div className="space-y-6">
          {leagues.map((league) => (
            <div key={league.id} className="bg-white rounded-lg shadow">
              {/* League Header */}
              <button
                onClick={() => toggleLeague(league.name)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <img 
                    src={league.logo} 
                    alt={league.name}
                    className="w-8 h-8 object-contain"
                  />
                  <h3 className="text-lg font-semibold text-gray-900">{league.name}</h3>
                  <span className="text-sm text-gray-500">({league.matches.length})</span>
                </div>
                {expandedLeagues.includes(league.name) ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {/* Matches */}
              {expandedLeagues.includes(league.name) && (
                <div className="px-6 pb-6 space-y-3">
                  {league.matches.map((match) => (
                    <div 
                      key={match.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      {/* Home Team */}
                      <div className="flex items-center space-x-3 flex-1">
                        <img 
                          src={match.homeLogo} 
                          alt={match.homeTeam}
                          className="w-6 h-6 object-contain"
                        />
                        <span className="font-medium text-gray-900">{match.homeTeam}</span>
                      </div>

                      {/* Score */}
                      <div className="flex items-center space-x-4 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">{match.homeScore}</span>
                          <span className="text-gray-500">-</span>
                          <span className="text-lg font-bold text-gray-900">{match.awayScore}</span>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">
                          FT
                        </span>
                      </div>

                      {/* Away Team */}
                      <div className="flex items-center space-x-3 flex-1 justify-end">
                        <span className="font-medium text-gray-900">{match.awayTeam}</span>
                        <img 
                          src={match.awayLogo} 
                          alt={match.awayTeam}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-sm text-gray-500">
          Last updated: {formatTime(lastUpdate)} • Auto-refresh every 10 seconds
        </div>
      </main>
    </div>
  );
};