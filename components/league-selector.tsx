"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Globe, Trophy, Star, Filter } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Country {
  country_id: string
  country_name: string
  country_logo: string
}

interface League {
  country_id: string
  country_name: string
  league_id: string
  league_name: string
  league_season: string
  league_logo: string
  country_logo: string
}

interface LeagueSelectorProps {
  selectedLeagues: string[]
  onLeaguesChange: (leagues: string[]) => void
}

const FEATURED_LEAGUES = [
  { id: "322", name: "Süper Lig", country: "Turkey", priority: 1 },
  { id: "152", name: "Premier League", country: "England", priority: 2 },
  { id: "302", name: "La Liga", country: "Spain", priority: 3 },
  { id: "207", name: "Serie A", country: "Italy", priority: 4 },
  { id: "175", name: "Bundesliga", country: "Germany", priority: 5 },
  { id: "168", name: "Ligue 1", country: "France", priority: 6 },
  { id: "3", name: "UEFA Champions League", country: "Europe", priority: 7 },
  { id: "4", name: "UEFA Europa League", country: "Europe", priority: 8 },
]

export function LeagueSelector({ selectedLeagues, onLeaguesChange }: LeagueSelectorProps) {
  const [countries, setCountries] = useState<Country[]>([])
  const [leagues, setLeagues] = useState<League[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCountriesAndLeagues()
  }, [])

  const fetchCountriesAndLeagues = async () => {
    setLoading(true)
    try {
      const [countriesRes, leaguesRes] = await Promise.all([
        fetch("/api/countries"),
        fetch("/api/leagues")
      ])
      
      const countriesData = await countriesRes.json()
      const leaguesData = await leaguesRes.json()
      
      setCountries(countriesData)
      setLeagues(leaguesData)
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredLeagues = leagues.filter(league => {
    const matchesCountry = selectedCountry === "all" || league.country_id === selectedCountry
    const matchesSearch = league.league_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         league.country_name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCountry && matchesSearch
  })

  const groupedLeagues = filteredLeagues.reduce((acc, league) => {
    const country = league.country_name
    if (!acc[country]) {
      acc[country] = []
    }
    acc[country].push(league)
    return acc
  }, {} as Record<string, League[]>)

  const toggleLeague = (leagueId: string) => {
    const newSelection = selectedLeagues.includes(leagueId)
      ? selectedLeagues.filter(id => id !== leagueId)
      : [...selectedLeagues, leagueId]
    
    onLeaguesChange(newSelection)
  }

  const selectFeaturedLeagues = () => {
    onLeaguesChange(FEATURED_LEAGUES.map(l => l.id))
  }

  const clearSelection = () => {
    onLeaguesChange([])
  }

  const selectAllFromCountry = (countryLeagues: League[]) => {
    const countryLeagueIds = countryLeagues.map(l => l.league_id)
    const newSelection = [...new Set([...selectedLeagues, ...countryLeagueIds])]
    onLeaguesChange(newSelection)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-card/60 backdrop-blur-sm border-border/50 hover:bg-card/80">
          <Filter className="w-4 h-4" />
          <span>Ligler ({selectedLeagues.length})</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Lig Seçimi
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Hızlı Seçim Butonları */}
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={selectFeaturedLeagues}
              className="gap-1"
            >
              <Star className="w-3 h-3" />
              Popüler Ligler
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={clearSelection}
            >
              Temizle
            </Button>
            <Badge variant="secondary" className="px-2 py-1">
              {selectedLeagues.length} lig seçili
            </Badge>
          </div>

          {/* Filtreler */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Ülke</label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Ülke seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Ülkeler</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country.country_id} value={country.country_id}>
                      <div className="flex items-center gap-2">
                        {country.country_logo && (
                          <img 
                            src={country.country_logo} 
                            alt={country.country_name}
                            className="w-4 h-4 rounded-sm"
                          />
                        )}
                        {country.country_name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Arama</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Lig veya ülke ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>

          {/* Lig Listesi */}
          <div className="max-h-96 overflow-y-auto space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              Object.entries(groupedLeagues).map(([country, countryLeagues]) => (
                <Card key={country} className="bg-card/40 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        {country}
                        <Badge variant="secondary" className="text-xs">
                          {countryLeagues.length}
                        </Badge>
                      </CardTitle>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => selectAllFromCountry(countryLeagues)}
                        className="text-xs"
                      >
                        Tümünü Seç
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {countryLeagues.map(league => {
                        const isSelected = selectedLeagues.includes(league.league_id)
                        const isFeatured = FEATURED_LEAGUES.some(f => f.id === league.league_id)
                        
                        return (
                          <div
                            key={league.league_id}
                            onClick={() => toggleLeague(league.league_id)}
                            className={`
                              p-3 rounded-lg border cursor-pointer transition-all duration-200
                              ${isSelected 
                                ? 'bg-primary/10 border-primary/50 shadow-sm' 
                                : 'bg-muted/30 border-border/50 hover:bg-muted/50'
                              }
                            `}
                          >
                            <div className="flex items-center gap-2">
                              {league.league_logo && (
                                <img
                                  src={league.league_logo}
                                  alt={league.league_name}
                                  className="w-5 h-5 rounded-sm"
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1">
                                  <span className="text-sm font-medium truncate">
                                    {league.league_name}
                                  </span>
                                  {isFeatured && (
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  )}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {league.league_season}
                                </span>
                              </div>
                              {isSelected && (
                                <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Alt Butonlar */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {selectedLeagues.length} lig seçildi
            </div>
            <Button onClick={() => setIsOpen(false)} className="bg-primary">
              Uygula
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
