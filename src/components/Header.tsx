import React from 'react';
import { Trophy, Globe, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ selectedDate, onDateChange }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { 
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
    <header className="bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Golivo</h1>
                <p className="text-xs text-purple-200">Live Football Scores</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-purple-700 rounded-lg px-4 py-2">
              <button 
                onClick={() => changeDate(-1)}
                className="p-1 hover:bg-purple-600 rounded transition-colors"
              >
                <ChevronLeft className="h-4 w-4 text-white" />
              </button>
              
              <div className="flex items-center space-x-2 text-white min-w-[200px] justify-center">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">{formatDate(selectedDate)}</span>
              </div>
              
              <button 
                onClick={() => changeDate(1)}
                className="p-1 hover:bg-purple-600 rounded transition-colors"
              >
                <ChevronRight className="h-4 w-4 text-white" />
              </button>
            </div>
            
            <button 
              onClick={goToToday}
              className="px-3 py-1 bg-purple-500 hover:bg-purple-400 text-white text-sm rounded-lg transition-colors"
            >
              Today
            </button>
            
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-purple-200 font-medium">LIVE</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};