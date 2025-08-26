"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { LeagueSection } from "@/components/league-section"
import { LeagueSelector } from "@/components/league-selector"
import { MatchDetailsModal } from "@/components/match-details-modal"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  isLive?: boolean
  minute?: number
  status: "live" | "finished" | "upcoming"
  time?: string
  homeLogo?: string
  awayLogo?: string
}

interface MatchesByLeague {
  [key: string]: Match[]
}

const DEFAULT_LEAGUES = ["322", "152", "302", "207", "175", "168", "3", "4", "683", "244", "266", "63"]

export default function HomePage() {
  const [matches, setMatches] = useState<MatchesByLeague>({})
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>(DEFAULT_LEAGUES)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchMatches = async (leagues: string[] = selectedLeagues) => {
    try {
      const leaguesParam = leagues.join(",")
      const response = await fetch(`/api/matches?leagues=${leaguesParam}`)
      const data = await response.json()
      setMatches(data)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Failed to fetch matches:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchMatches()
  }, [])

  useEffect(() => {
    if (selectedLeagues.length > 0) {
      setLoading(true)
      fetchMatches(selectedLeagues)
    }
  }, [selectedLeagues])

  useEffect(() => {
    // Auto-refresh every 30 seconds for live matches
    const interval = setInterval(() => {
      if (selectedLeagues.length > 0) {
        setRefreshing(true)
        fetchMatches()
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [selectedLeagues])

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedMatch(null)
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchMatches()
  }

  const handleLeaguesChange = (leagues: string[]) => {
    setSelectedLeagues(leagues)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Maçlar yükleniyor...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />

      <main className="container mx-auto px-3 md:px-4 py-4 md:py-6">
        <div className="mb-4 md:mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-1 md:mb-2">
              Canlı Skorlar
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Seçtiğiniz liglerden canlı maç skorları ve güncel sonuçlar
            </p>
          </div>
        </div>

        {/* Kontrol Paneli */}
        <div className="mb-4 md:mb-6 flex flex-wrap items-center gap-3">
          <LeagueSelector 
            selectedLeagues={selectedLeagues}
            onLeaguesChange={handleLeaguesChange}
          />
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="gap-2 bg-card/60 backdrop-blur-sm border-border/50 hover:bg-card/80"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Yenileniyor...' : 'Yenile'}
          </Button>

          <div className="text-xs text-muted-foreground">
            Son güncelleme: {lastUpdate.toLocaleTimeString('tr-TR')}
          </div>
        </div>

        {/* Maç Listesi */}
        {Object.keys(matches).length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground space-y-2">
              <p className="text-lg">Seçili liglerden maç bulunamadı</p>
              <p className="text-sm">Farklı ligler seçmeyi deneyin veya daha sonra tekrar kontrol edin</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {Object.entries(matches).map(([league, leagueMatches]) => (
              <LeagueSection 
                key={league} 
                league={league} 
                matches={leagueMatches} 
                onMatchClick={handleMatchClick} 
              />
            ))}
          </div>
        )}

        <div className="mt-4 md:mt-6 text-center text-xs md:text-sm text-muted-foreground">
          {selectedLeagues.length} lig takip ediliyor • Otomatik yenileme: 30 saniye
        </div>
      </main>

      {selectedMatch && (
        <MatchDetailsModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          match={selectedMatch} 
        />
      )}
    </div>
  )
}
