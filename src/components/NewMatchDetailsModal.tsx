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
  // Mock events for demonstration
  const homeEvents = [
    { type: "goal", player: "K. Garcia", minute: 6 },
    { type: "yellow", player: "A. Abqar", minute: 78 },
  ]

  const awayEvents = [
    { type: "goal", player: "P. Duran", minute: 66 },
    { type: "yellow", player: "M. Ristic", minute: 64 },
  ]

  const matchStats = {
    stats: {
      possession: { home: 58, away: 42 },
      shots: { home: 12, away: 8 },
      shotsOnTarget: { home: 4, away: 3 },
      corners: { home: 6, away: 4 },
      fouls: { home: 11, away: 14 },
    },
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* DÜZELTME: Şeffaflığı azalt, okunabilirliği artır */}
      <DialogContent className="max-w-[95vw] md:max-w-3xl max-h-[90vh] md:max-h-[80vh] overflow-y-auto bg-white border-2 border-gray-200 shadow-2xl mx-2 md:mx-auto">
        <DialogHeader className="pb-2 md:pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 -m-6 mb-4 p-6 border-b border-gray-200">
          <DialogTitle className="text-center">
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-2 md:mb-4">
              <div className="flex items-center gap-1 md:gap-2 min-w-0">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center flex-shrink-0 shadow-md">
                  {match.homeLogo ? (
                    <img
                      src={match.homeLogo || "/placeholder.svg"}
                      alt={match.homeTeam}
                      className="w-6 h-6 md:w-8 md:h-8 object-contain"
                    />
                  ) : (
                    <span className="text-sm font-bold text-blue-600">{(match.homeTeam || 'TM').slice(0, 2)}</span>
                  )}
                </div>
                <span className="font-bold text-lg md:text-xl text-gray-900 truncate">{match.homeTeam}</span>
              </div>

              <div className="text-2xl md:text-4xl font-black text-blue-600 flex-shrink-0 bg-white px-4 py-2 rounded-lg shadow-md border border-blue-200">
                {match.homeScore ?? 0} - {match.awayScore ?? 0}
              </div>

              <div className="flex items-center gap-1 md:gap-2 min-w-0">
                <span className="font-bold text-lg md:text-xl text-gray-900 truncate">{match.awayTeam}</span>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center flex-shrink-0 shadow-md">
                  {match.awayLogo ? (
                    <img
                      src={match.awayLogo || "/placeholder.svg"}
                      alt={match.awayTeam}
                      className="w-6 h-6 md:w-8 md:h-8 object-contain"
                    />
                  ) : (
                    <span className="text-sm font-bold text-blue-600">{(match.awayTeam || 'TM').slice(0, 2)}</span>
                  )}
                </div>
              </div>
            </div>

            {match.status === "live" && (
              <span className="animate-pulse font-bold text-sm px-3 py-2 shadow-lg bg-red-500 text-white rounded-full border-2 border-red-600">
                🔴 LIVE {match.minute}'
              </span>
            )}
            {match.status === "finished" && (
              <span className="text-sm bg-gray-600 text-white font-bold px-4 py-2 rounded-full border-2 border-gray-700">
                ⏱️ Full Time
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6 p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Home Team Events */}
            <div className="space-y-3">
              <h3 className="text-lg md:text-xl font-bold text-center p-3 bg-blue-600 text-white rounded-lg shadow-md">
                {match.homeTeam}
              </h3>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
                {homeEvents.length > 0 ? (
                  homeEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-200"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {event.type === "goal" ? (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                            <Target className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div
                            className={`w-4 h-6 rounded-sm flex items-center justify-center flex-shrink-0 shadow-md ${
                              event.type === "yellow" ? "bg-yellow-500 border border-yellow-600" : "bg-red-500 border border-red-600"
                            }`}
                          >
                            <div className="w-2 h-4 bg-white rounded-sm"></div>
                          </div>
                        )}
                        <span className="font-semibold text-gray-900 truncate">{event.player}</span>
                      </div>
                      <span className="text-sm bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full flex-shrink-0">
                        {event.minute}'
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center py-4 font-medium">No events</p>
                )}
              </div>
            </div>

            {/* Away Team Events */}
            <div className="space-y-3">
              <h3 className="text-lg md:text-xl font-bold text-center p-3 bg-purple-600 text-white rounded-lg shadow-md">
                {match.awayTeam}
              </h3>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
                {awayEvents.length > 0 ? (
                  awayEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-200"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {event.type === "goal" ? (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                            <Target className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div
                            className={`w-4 h-6 rounded-sm flex items-center justify-center flex-shrink-0 shadow-md ${
                              event.type === "yellow" ? "bg-yellow-500 border border-yellow-600" : "bg-red-500 border border-red-600"
                            }`}
                          >
                            <div className="w-2 h-4 bg-white rounded-sm"></div>
                          </div>
                        )}
                        <span className="font-semibold text-gray-900 truncate">{event.player}</span>
                      </div>
                      <span className="text-sm bg-purple-100 text-purple-800 font-bold px-3 py-1 rounded-full flex-shrink-0">
                        {event.minute}'
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center py-4 font-medium">No events</p>
                )}
              </div>
            </div>
          </div>

          {/* Match Statistics */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6 text-center text-gray-900">📊 Match Statistics</h3>
            <div className="space-y-4">
              {Object.entries(matchStats.stats).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold text-gray-900">
                    <span className="bg-blue-100 px-2 py-1 rounded">{value.home}</span>
                    <span className="capitalize text-center px-4 bg-white py-1 rounded shadow-sm border">
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
                    <span className="bg-purple-100 px-2 py-1 rounded">{value.away}</span>
                  </div>
                  <div className="flex gap-1 h-3 rounded-full overflow-hidden border border-gray-300">
                    <div
                      className="bg-blue-500"
                      style={{ width: `${(value.home / (value.home + value.away)) * 100}%` }}
                    />
                    <div
                      className="bg-purple-500"
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