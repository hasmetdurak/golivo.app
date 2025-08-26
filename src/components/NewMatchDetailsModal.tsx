import React from "react"
import { Target } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"

interface NewMatchDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  match: {
    homeTeam: string
    awayTeam: string
    homeScore?: number
    awayScore?: number
    status: "live" | "finished" | "upcoming"
    minute?: number
    homeLogo?: string
    awayLogo?: string
  }
}

export function NewMatchDetailsModal({ isOpen, onClose, match }: NewMatchDetailsModalProps) {
  // Mock data for demonstration - in real app, fetch from API
  const matchStats = {
    goalScorers: [
      { player: "Erling Haaland", team: "home", minute: 23, type: "goal" },
      { player: "Kevin De Bruyne", team: "home", minute: 45, type: "goal" },
      { player: "Mohamed Salah", team: "away", minute: 67, type: "goal" },
    ],
    cards: [
      { player: "Rodri", team: "home", minute: 34, type: "yellow" },
      { player: "Virgil van Dijk", team: "away", minute: 78, type: "yellow" },
      { player: "Darwin Núñez", team: "away", minute: 89, type: "red" },
    ],
    stats: {
      possession: { home: 58, away: 42 },
      shots: { home: 12, away: 8 },
      shotsOnTarget: { home: 6, away: 4 },
      corners: { home: 7, away: 3 },
      fouls: { home: 11, away: 14 },
    },
  }

  const homeEvents = [
    ...matchStats.goalScorers.filter((g) => g.team === "home"),
    ...matchStats.cards.filter((c) => c.team === "home"),
  ].sort((a, b) => a.minute - b.minute)

  const awayEvents = [
    ...matchStats.goalScorers.filter((g) => g.team === "away"),
    ...matchStats.cards.filter((c) => c.team === "away"),
  ].sort((a, b) => a.minute - b.minute)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] md:max-w-3xl max-h-[90vh] md:max-h-[80vh] overflow-y-auto bg-background/95 backdrop-blur-md mx-2 md:mx-auto">
        <DialogHeader className="pb-2 md:pb-4">
          <DialogTitle className="text-center">
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-2 md:mb-4">
              <div className="flex items-center gap-1 md:gap-2 min-w-0">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center flex-shrink-0">
                  {match.homeLogo ? (
                    <img
                      src={match.homeLogo || "/placeholder.svg"}
                      alt={match.homeTeam}
                      className="w-4 h-4 md:w-6 md:h-6 object-contain"
                    />
                  ) : (
                    <span className="text-xs font-bold">{match.homeTeam.slice(0, 2)}</span>
                  )}
                </div>
                <span className="font-bold text-sm md:text-lg truncate">{match.homeTeam}</span>
              </div>

              <div className="text-xl md:text-3xl font-black text-primary flex-shrink-0">
                {match.homeScore ?? 0} - {match.awayScore ?? 0}
              </div>

              <div className="flex items-center gap-1 md:gap-2 min-w-0">
                <span className="font-bold text-sm md:text-lg truncate">{match.awayTeam}</span>
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center flex-shrink-0">
                  {match.awayLogo ? (
                    <img
                      src={match.awayLogo || "/placeholder.svg"}
                      alt={match.awayTeam}
                      className="w-4 h-4 md:w-6 md:h-6 object-contain"
                    />
                  ) : (
                    <span className="text-xs font-bold">{match.awayTeam.slice(0, 2)}</span>
                  )}
                </div>
              </div>
            </div>

            {match.status === "live" && (
              <span className="animate-pulse font-bold text-xs px-1.5 md:px-2 py-0.5 md:py-1 shadow-lg shadow-red-500/30 bg-red-500 text-white rounded-full">
                LIVE {match.minute}'
              </span>
            )}
            {match.status === "finished" && (
              <span className="text-xs bg-gray-200 text-gray-800 font-bold px-3 py-1 rounded-full">
                Full Time
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            {/* Home Team Events */}
            <div className="space-y-2 md:space-y-4">
              <h3 className="text-sm md:text-lg font-bold text-center p-2 bg-primary/10 rounded-lg">
                {match.homeTeam}
              </h3>

              <div className="bg-muted/50 rounded-lg p-4 space-y-1 md:space-y-2">
                {homeEvents.length > 0 ? (
                  homeEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-1.5 md:p-2 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
                        {event.type === "goal" ? (
                          <div className="w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Target className="w-2 h-2 text-white" />
                          </div>
                        ) : (
                          <div
                            className={`w-3 h-4 md:w-4 md:h-5 rounded-sm flex items-center justify-center flex-shrink-0 ${
                              event.type === "yellow" ? "bg-yellow-500" : "bg-red-500"
                            }`}
                          >
                            <div className="w-1.5 h-2 md:w-2 md:h-3 bg-white rounded-sm"></div>
                          </div>
                        )}
                        <span className="font-medium text-xs md:text-sm truncate">{event.player}</span>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded flex-shrink-0">
                        {event.minute}'
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs md:text-sm text-muted-foreground text-center py-2">No events</p>
                )}
              </div>
            </div>

            {/* Away Team Events */}
            <div className="space-y-2 md:space-y-4">
              <h3 className="text-sm md:text-lg font-bold text-center p-2 bg-purple-500/10 rounded-lg">
                {match.awayTeam}
              </h3>

              <div className="bg-muted/50 rounded-lg p-4 space-y-1 md:space-y-2">
                {awayEvents.length > 0 ? (
                  awayEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-1.5 md:p-2 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
                        {event.type === "goal" ? (
                          <div className="w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Target className="w-2 h-2 text-white" />
                          </div>
                        ) : (
                          <div
                            className={`w-3 h-4 md:w-4 md:h-5 rounded-sm flex items-center justify-center flex-shrink-0 ${
                              event.type === "yellow" ? "bg-yellow-500" : "bg-red-500"
                            }`}
                          >
                            <div className="w-1.5 h-2 md:w-2 md:h-3 bg-white rounded-sm"></div>
                          </div>
                        )}
                        <span className="font-medium text-xs md:text-sm truncate">{event.player}</span>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded flex-shrink-0">
                        {event.minute}'
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs md:text-sm text-muted-foreground text-center py-2">No events</p>
                )}
              </div>
            </div>
          </div>

          {/* Match Statistics */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-4 text-center">Match Statistics</h3>
            <div className="space-y-2 md:space-y-4">
              {Object.entries(matchStats.stats).map(([key, value]) => (
                <div key={key} className="space-y-1 md:space-y-2">
                  <div className="flex justify-between text-xs md:text-sm font-medium">
                    <span>{value.home}</span>
                    <span className="capitalize text-center px-2">
                      {key === "possession"
                        ? "Possession %"
                        : key === "shots"
                          ? "Shots"
                          : key === "shotsOnTarget"
                            ? "Shots on Target"
                            : key === "corners"
                              ? "Corners"
                              : "Fouls"}
                    </span>
                    <span>{value.away}</span>
                  </div>
                  <div className="flex gap-1 md:gap-2 h-1.5 md:h-2">
                    <div
                      className="bg-primary rounded-l-full"
                      style={{ width: `${(value.home / (value.home + value.away)) * 100}%` }}
                    />
                    <div
                      className="bg-purple-500 rounded-r-full"
                      style={{ width: `${(value.away / (value.home + value.away)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}