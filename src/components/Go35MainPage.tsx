import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Go35Header } from './Go35Header';
import { MatchCard } from './MatchCard';
import { MatchDetailsModal } from './MatchDetailsModal';
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
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [modalViewMode, setModalViewMode] = useState<'mini' | 'full'>('mini');

  // Match click handler with double-click detection
  const handleMatchClick = (match: any) => {
    console.log('🎯 Match clicked:', match);
    if (selectedMatch?.id === match.id) {
      // Same match clicked - toggle view mode
      const newMode = modalViewMode === 'mini' ? 'full' : 'mini';
      setModalViewMode(newMode);
      console.log('🔄 Toggling view mode to:', newMode);
    } else {
      // New match clicked - open in mini mode
      setSelectedMatch(match);
      setModalViewMode('mini');
      console.log('🆕 Opening new match in mini mode');
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedMatch(null);
    setModalViewMode('mini');
    console.log('❌ Modal closed');
  };

  // View mode change handler
  const handleViewModeChange = (mode: 'mini' | 'full') => {
    setModalViewMode(mode);
    console.log('🔄 View mode changed to:', mode);
  };

  useEffect(() => {
    const fetchAllMatches = async () => {
      try {
        setLoading(true);
        console.log('🔄 Fetching all matches (live + today)...');
        const allMatches = await FootballApi.getLiveMatches();
        
        // Maçları kategorilere ayır
        const liveMatches = allMatches.filter(match => match.isLive);
        const todayMatches = allMatches.filter(match => !match.isLive);
        
        console.log('🔴 Live matches:', liveMatches.length);
        console.log('📅 Today matches:', todayMatches.length);
        
        // Liglere göre grupla
        const groupedByLeague: League[] = [];
        const leagueMap = new Map();
        
        // Önce canlı maçları ekle
        liveMatches.forEach(match => {
          const leagueName = match.league;
          if (!leagueMap.has(leagueName)) {
            leagueMap.set(leagueName, {
              id: leagueName.toLowerCase().replace(/\s+/g, '-'),
              name: leagueName,
              logo: getLeagueLogo(leagueName),
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
        
        // Sonra günün diğer maçlarını ekle
        todayMatches.forEach(match => {
          const leagueName = match.league;
          if (!leagueMap.has(leagueName)) {
            leagueMap.set(leagueName, {
              id: leagueName.toLowerCase().replace(/\s+/g, '-'),
              name: leagueName,
              logo: getLeagueLogo(leagueName),
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
        
        // Her lig içinde maçları sırala: önce canlı, sonra zaman sırasına göre
        leagueMap.forEach(league => {
          league.matches.sort((a, b) => {
            // Önce canlı maçlar
            if (a.isLive && !b.isLive) return -1;
            if (!a.isLive && b.isLive) return 1;
            
            // Canlı maçlar kendi içinde dakikaya göre
            if (a.isLive && b.isLive) {
              const aMinute = parseInt(a.minute || '0');
              const bMinute = parseInt(b.minute || '0');
              return bMinute - aMinute; // Büyük dakika önce
            }
            
            // Diğer maçlar zaman sırasına göre
            if (a.time && b.time) {
              return a.time.localeCompare(b.time);
            }
            
            return 0;
          });
        });
        
        const leaguesArray = Array.from(leagueMap.values());
        
        // Ligleri öncelik sırasına göre sırala
        const priorityLeagues = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'Süper Lig'];
        leaguesArray.sort((a, b) => {
          const aIndex = priorityLeagues.indexOf(a.name);
          const bIndex = priorityLeagues.indexOf(b.name);
          
          if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
          }
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          
          return a.name.localeCompare(b.name);
        });
        
        setLeagues(leaguesArray);
        
        console.log('✅ All matches loaded:', leaguesArray.length, 'leagues');
      } catch (error) {
        console.error('❌ API Error:', error);
        
        // Fallback canlı maç verileri
        const mockLiveLeagues: League[] = [
          {
            id: 'premier-league',
            name: 'Premier League',
            logo: '/leagues/premier-league-2024.svg',
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
                awayLogo: '/placeholder-logo.svg'
              },
              {
                id: 'live-2',
                homeTeam: 'Manchester City',
                awayTeam: 'Chelsea',
                homeScore: 0,
                awayScore: 1,
                isLive: true,
                minute: 45,
                status: 'live',
                time: '45\'',
                homeLogo: '/placeholder-logo.svg',
                awayLogo: '/placeholder-logo.svg'
              },
              {
                id: 'upcoming-1',
                homeTeam: 'Tottenham',
                awayTeam: 'Manchester United',
                homeScore: 0,
                awayScore: 0,
                isLive: false,
                minute: 0,
                status: 'upcoming',
                time: '19:45',
                homeLogo: '/placeholder-logo.svg',
                awayLogo: '/placeholder-logo.svg'
              }
            ]
          }
        ];
        setLeagues(mockLiveLeagues);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMatches();
    
    // Her 30 saniyede bir güncelle
    const interval = setInterval(fetchAllMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  // Liga logosu getir
  const getLeagueLogo = (leagueName: string): string => {
    const logoMap: { [key: string]: string } = {
      'Premier League': '/leagues/premier-league-2024.svg',
      'English Premier League': '/leagues/premier-league-2024.svg',
      'La Liga': '/leagues/laliga-2024.svg',
      'Spanish La Liga': '/leagues/laliga-2024.svg',
      'Serie A': '/leagues/serie-a-2022.svg',
      'Italian Serie A': '/leagues/serie-a-2022.svg',
      'Bundesliga': '/placeholder-logo.svg',
      'German Bundesliga': '/placeholder-logo.svg',
      'Süper Lig': '/leagues/super-lig.svg',
      'Turkish Super League': '/leagues/super-lig.svg',
      'Super Lig': '/leagues/super-lig.svg'
    };
    return logoMap[leagueName] || '/placeholder-logo.svg';
  };
  
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
        {/* Enhanced Title */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Live Football Scores
          </h1>
          <p className="text-gray-600">
            🔴 {totalLiveMatches} live matches • 📅 {totalMatches - totalLiveMatches} today's matches • Updated every 30 seconds
          </p>
        </div>

        {totalMatches === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚽</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Matches Today</h2>
            <p className="text-gray-600">Check back later for live football action!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {leagues.map((league) => (
              <div key={league.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div 
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 cursor-pointer hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
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
                      className="w-8 h-8 rounded-full shadow-sm"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-logo.svg';
                      }}
                    />
                    <div>
                      <h2 className="font-bold text-gray-900 text-lg">{league.name}</h2>
                      <p className="text-sm text-gray-600">
                        🔴 {league.matches.filter(m => m.isLive).length} live • 
                        📅 {league.matches.filter(m => !m.isLive).length} today
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {league.matches.some(m => m.isLive) && (
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-lg">
                        LIVE
                      </span>
                    )}
                    {expandedLeagues.includes(league.name) ? 
                      <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    }
                  </div>
                </div>

                {expandedLeagues.includes(league.name) && (
                  <div className="p-4 bg-gray-50">
                    <div className="grid gap-3">
                      {league.matches.map((match) => (
                        <MatchCard
                          key={match.id}
                          match={{
                            id: match.id,
                            homeTeam: { name: match.homeTeam, logo: match.homeLogo },
                            awayTeam: { name: match.awayTeam, logo: match.awayLogo },
                            homeScore: match.homeScore,
                            awayScore: match.awayScore,
                            isLive: match.isLive,
                            minute: match.minute?.toString(),
                            status: match.status,
                            time: match.time,
                            league: league.name
                          }}
                          onClick={() => handleMatchClick({
                            id: match.id,
                            homeTeam: { name: match.homeTeam, logo: match.homeLogo },
                            awayTeam: { name: match.awayTeam, logo: match.awayLogo },
                            homeScore: match.homeScore,
                            awayScore: match.awayScore,
                            isLive: match.isLive,
                            minute: match.minute?.toString(),
                            status: match.status,
                            time: match.time,
                            league: league.name
                          })}
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
      
      {/* Match Details Modal */}
      <MatchDetailsModal
        match={selectedMatch}
        isOpen={!!selectedMatch}
        onClose={handleCloseModal}
        viewMode={modalViewMode}
        onViewModeChange={handleViewModeChange}
      />
    </div>
  );
};