import React from 'react';
import { leagues } from '../data/leagues';

interface LeagueTabsProps {
  selectedLeague: string;
  onLeagueSelect: (leagueId: string) => void;
}

export const LeagueTabs: React.FC<LeagueTabsProps> = ({ selectedLeague, onLeagueSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Leagues</h2>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live Matches</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onLeagueSelect('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            selectedLeague === 'all'
              ? 'bg-purple-600 text-white shadow-lg transform scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700'
          }`}
        >
          All Matches
        </button>
        
        {leagues.map((league) => (
          <button
            key={league.id}
            onClick={() => onLeagueSelect(league.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedLeague === league.id
                ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700'
            }`}
          >
            <img 
              src={league.logo} 
              alt={league.name} 
              className="w-5 h-5 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span>{league.name}</span>
            {league.priority && (
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};