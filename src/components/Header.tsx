import React from 'react';
import { Trophy, Calendar, ChevronLeft, ChevronRight, Activity, Users } from 'lucide-react';

interface HeaderProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ selectedDate, onDateChange }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const changeDate = (days: number) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + days);
    onDateChange(currentDate.toISOString().split('T')[0]);
  };

  const goToToday = () => {
    onDateChange(new Date().toISOString().split('T')[0]);
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg">
                  <Trophy className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">GoLivo</h1>
                <p className="text-sm text-slate-300 font-medium">Professional Football Scores</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6 ml-8">
              <div className="flex items-center space-x-2 text-slate-300">
                <Activity className="h-4 w-4" />
                <span className="text-sm font-medium">Live Matches</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">All Leagues</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-slate-700/50">
              <button 
                onClick={() => changeDate(-1)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-all duration-200 group"
                title="Previous day"
              >
                <ChevronLeft className="h-4 w-4 text-slate-300 group-hover:text-white" />
              </button>
              
              <div className="flex items-center space-x-3 text-white min-w-[240px] justify-center">
                <Calendar className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-semibold">{formatDate(selectedDate)}</span>
              </div>
              
              <button 
                onClick={() => changeDate(1)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-all duration-200 group"
                title="Next day"
              >
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-white" />
              </button>
            </div>
            
            <button 
              onClick={goToToday}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Today
            </button>
            
            <div className="flex items-center space-x-2 bg-red-500/10 backdrop-blur-sm px-3 py-2 rounded-xl border border-red-500/20">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-sm text-red-400 font-bold tracking-wider">LIVE</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};