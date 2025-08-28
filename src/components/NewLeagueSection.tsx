import React, { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { NewMatchCard } from "./NewMatchCard"
import { getLeagueLogo } from "../lib/league-logos"

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

interface NewLeagueSectionProps {
  league: string
  matches: Match[]
  onMatchClick?: (match: Match) => void
}

export function NewLeagueSection({ league, matches, onMatchClick }: NewLeagueSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  
  const leagueLogo = getLeagueLogo(league)

  return (
    <div className="bg-card/40 backdrop-blur-sm border-border/50 rounded-xl border overflow-hidden shadow-sm">
      <div className="pb-2 md:pb-3 px-3 md:px-6 pt-3 md:pt-6">
        <button
          className="flex items-center justify-between w-full p-0 h-auto hover:bg-transparent"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {leagueLogo ? (
                <img
                  src={leagueLogo || "/placeholder.svg"}
                  alt={league}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-white text-xs font-bold">{(league || 'LG').slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <h3 className="text-base md:text-lg font-semibold truncate">{league}</h3>
            <span className="text-xs md:text-sm text-muted-foreground flex-shrink-0">({matches.length})</span>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
          ) : (
            <ChevronDown className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="pt-0 space-y-2 md:space-y-3 px-3 md:px-6 pb-3 md:pb-6">
          {matches.map((match) => (
            <NewMatchCard key={match.id} {...match} onClick={() => onMatchClick?.(match)} />
          ))}
        </div>
      )}
    </div>
  )
}