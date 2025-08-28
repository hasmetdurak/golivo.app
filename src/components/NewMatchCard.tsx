import React, { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface NewMatchCardProps {
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
  matchId?: string
  onClick?: () => void
}

export function NewMatchCard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  isLive,
  minute,
  status,
  time,
  homeLogo,
  awayLogo,
  matchId,
  onClick,
}: NewMatchCardProps) {
  const [goalCelebration, setGoalCelebration] = useState(false)
  const [previousScore, setPreviousScore] = useState({ home: homeScore, away: awayScore })

  useEffect(() => {
    if (homeScore !== previousScore.home || awayScore !== previousScore.away) {
      if (previousScore.home !== undefined || previousScore.away !== undefined) {
        setGoalCelebration(true)
        setTimeout(() => setGoalCelebration(false), 2000)
      }
      setPreviousScore({ home: homeScore, away: awayScore })
    }
  }, [homeScore, awayScore, previousScore])

  return (
    <>
      {goalCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 animate-pulse" />
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  backgroundColor: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"][
                    Math.floor(Math.random() * 5)
                  ],
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div
        className={`
          hover:shadow-2xl transition-all duration-500 cursor-pointer group 
          bg-gradient-to-br from-card/80 via-card/70 to-card/60 backdrop-blur-lg 
          border-border/40 hover:border-primary/50 hover:bg-gradient-to-br hover:from-card/90 hover:via-card/80 hover:to-card/70
          active:scale-[0.98] relative overflow-hidden
          hover:scale-[1.02] md:hover:scale-[1.03] hover:-translate-y-1
          ${goalCelebration ? "animate-bounce shadow-2xl shadow-yellow-500/50" : ""}
          ${isLive ? "ring-2 ring-red-500/30 shadow-lg shadow-red-500/20" : ""}
        `}
        onClick={onClick}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x" />

        {isLive && <div className="absolute inset-0 rounded-lg border-2 border-red-500/50 animate-pulse" />}

        <div className="p-3 md:p-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Home Team */}
            <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
              <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-primary/25 to-purple-600/25 flex items-center justify-center overflow-hidden group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:shadow-primary/30">
                {homeLogo ? (
                  <img
                    src={homeLogo || "/placeholder.svg"}
                    alt={homeTeam}
                    className="w-5 h-5 md:w-7 md:h-7 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <span className="text-xs font-bold text-primary group-hover:text-white transition-colors">
                    {(homeTeam || 'TM').slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="team-name-font text-xs md:text-sm group-hover:text-primary group-hover:font-semibold transition-all duration-300 truncate tracking-wide">
                {homeTeam || 'Unknown Team'}
              </span>
            </div>

            {/* Score/Time */}
            <div className="flex items-center space-x-2 md:space-x-4 px-2 md:px-4 flex-shrink-0">
              {status === "live" && (
                <span className="animate-pulse font-bold text-xs px-1.5 md:px-2 py-0.5 md:py-1 shadow-lg shadow-red-500/30 bg-red-500 text-white rounded-full">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                    LIVE
                  </div>
                </span>
              )}

              <div className="text-center">
                {status === "upcoming" ? (
                  <div className="flex items-center space-x-1 text-muted-foreground group-hover:text-primary transition-colors">
                    <Clock className="w-3 h-3 md:w-4 md:h-4 group-hover:animate-spin" />
                    <span className="stats-font text-xs md:text-sm tracking-wide">{time}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    {/* Score Display */}
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <span
                        className={`score-font text-lg md:text-2xl tracking-tight text-foreground group-hover:text-primary transition-all duration-300 ${goalCelebration ? "animate-bounce text-yellow-500 scale-125" : ""}`}
                      >
                        {homeScore ?? 0}
                      </span>
                      <span className="text-muted-foreground font-bold text-sm md:text-base group-hover:text-primary transition-colors">
                        -
                      </span>
                      <span
                        className={`score-font text-lg md:text-2xl tracking-tight text-foreground group-hover:text-primary transition-all duration-300 ${goalCelebration ? "animate-bounce text-yellow-500 scale-125" : ""}`}
                      >
                        {awayScore ?? 0}
                      </span>
                    </div>
                    
                    {/* Red Minute Display Below Score for Live Matches */}
                    {isLive && minute && (
                      <div className="mt-1 flex items-center justify-center gap-1 md:gap-2">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-ping shadow-lg shadow-red-500/50" />
                        <span className="text-red-500 font-black text-sm md:text-base animate-pulse tracking-wider drop-shadow-sm">
                          {minute}'
                        </span>
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-ping shadow-lg shadow-red-500/50" />
                      </div>
                    )}
                  </div>
                )}

                {status === "finished" && (
                  <div className="text-xs text-muted-foreground mt-0.5 md:mt-1 flex items-center justify-center gap-1 md:gap-2 stats-font group-hover:text-primary/70 transition-colors">
                    <span>FT</span>
                    {minute && <span className="text-primary/70">({minute}')</span>}
                  </div>
                )}
              </div>
            </div>

            {/* Away Team */}
            <div className="flex items-center space-x-2 md:space-x-3 flex-1 justify-end min-w-0">
              <span className="team-name-font text-xs md:text-sm group-hover:text-primary group-hover:font-semibold transition-all duration-300 truncate tracking-wide">
                {awayTeam || 'Unknown Team'}
              </span>
              <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-primary/25 to-purple-600/25 flex items-center justify-center overflow-hidden group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500 flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:shadow-primary/30">
                {awayLogo ? (
                  <img
                    src={awayLogo || "/placeholder.svg"}
                    alt={awayTeam}
                    className="w-5 h-5 md:w-7 md:h-7 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <span className="text-xs font-bold text-primary group-hover:text-white transition-colors">
                    {(awayTeam || 'TM').slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}