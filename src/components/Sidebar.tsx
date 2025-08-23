import React from 'react';
import { Trophy, Target, TrendingUp } from 'lucide-react';
import { topScorers } from '../data/mockData';

export const Sidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Trophy className="h-5 w-5 text-purple-600" />
          <h3 className="font-bold text-gray-800">Top Scorers</h3>
        </div>
        
        <div className="space-y-3">
          {topScorers.slice(0, 5).map((scorer, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  index === 0 ? 'bg-yellow-500 text-white' : 
                  index === 1 ? 'bg-gray-400 text-white' :
                  index === 2 ? 'bg-amber-600 text-white' :
                  'bg-purple-200 text-purple-700'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{scorer.name}</p>
                  <p className="text-xs text-gray-600">{scorer.team}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-purple-600">{scorer.goals}</p>
                <p className="text-xs text-gray-500">goals</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Target className="h-5 w-5 text-purple-600" />
          <h3 className="font-bold text-gray-800">Today's Popular</h3>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-3 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Manchester City</p>
                <p className="text-sm text-gray-600">vs Liverpool</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-purple-600">9:00 PM</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">%85</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-3 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Barcelona</p>
                <p className="text-sm text-gray-600">vs Real Madrid</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-purple-600">10:30 PM</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">%92</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};