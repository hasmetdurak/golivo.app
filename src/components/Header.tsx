import React, { useState } from 'react';
import { Trophy, Calendar, ChevronLeft, ChevronRight, Menu, X, Users, User, BarChart3, Medal, Globe, TrendingUp } from 'lucide-react';

interface HeaderProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  currentView?: string;
  onViewChange?: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ selectedDate, onDateChange, currentView = 'matches', onViewChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatDateFull = (dateStr: string) => {
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
    <>
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                  <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">GoLivo</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Canlı Futbol Skorları</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Navigation Menu */}
              <nav className="flex items-center space-x-1">
                <button 
                  onClick={() => onViewChange?.('matches')}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentView === 'matches' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Trophy className="h-4 w-4 inline mr-1" />
                  Maçlar
                </button>
                <button 
                  onClick={() => onViewChange?.('leagues')}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentView === 'leagues' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Medal className="h-4 w-4 inline mr-1" />
                  Ligler
                </button>
                <button 
                  onClick={() => onViewChange?.('standings')}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentView === 'standings' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="h-4 w-4 inline mr-1" />
                  Puan Durumu
                </button>
                <button 
                  onClick={() => onViewChange?.('teams')}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentView === 'teams' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Users className="h-4 w-4 inline mr-1" />
                  Takımlar
                </button>
                <button 
                  onClick={() => onViewChange?.('players')}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentView === 'players' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <User className="h-4 w-4 inline mr-1" />
                  Oyuncular
                </button>
                <button 
                  onClick={() => onViewChange?.('statistics')}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentView === 'statistics' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <TrendingUp className="h-4 w-4 inline mr-1" />
                  İstatistikler
                </button>
                <button 
                  onClick={() => onViewChange?.('countries')}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentView === 'countries' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Globe className="h-4 w-4 inline mr-1" />
                  Ülkeler
                </button>
              </nav>
              
              {/* Date Navigation - Only show for matches view */}
              {currentView === 'matches' && (
                <>
                  <div className="flex items-center space-x-1 bg-gray-50 rounded-xl px-3 py-2">
                    <button 
                      onClick={() => changeDate(-1)}
                      className="p-1.5 hover:bg-white rounded-lg transition-colors"
                      title="Previous day"
                    >
                      <ChevronLeft className="h-4 w-4 text-gray-600" />
                    </button>
                    
                    <div className="flex items-center space-x-2 text-gray-900 min-w-[140px] justify-center">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">{formatDateFull(selectedDate)}</span>
                    </div>
                    
                    <button 
                      onClick={() => changeDate(1)}
                      className="p-1.5 hover:bg-white rounded-lg transition-colors"
                      title="Next day"
                    >
                      <ChevronRight className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={goToToday}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
                  >
                    Bugün
                  </button>
                </>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="flex lg:hidden items-center space-x-3">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? 
                  <X className="h-5 w-5 text-gray-600" /> : 
                  <Menu className="h-5 w-5 text-gray-600" />
                }
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-14 sm:top-16 z-40 bg-white border-b border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            {/* Mobile Navigation Menu */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button 
                onClick={() => {
                  onViewChange?.('matches');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-center ${
                  currentView === 'matches' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Trophy className="h-4 w-4 mr-1" />
                Maçlar
              </button>
              <button 
                onClick={() => {
                  onViewChange?.('leagues');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-center ${
                  currentView === 'leagues' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Medal className="h-4 w-4 mr-1" />
                Ligler
              </button>
              <button 
                onClick={() => {
                  onViewChange?.('standings');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-center ${
                  currentView === 'standings' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                Puan Durumu
              </button>
              <button 
                onClick={() => {
                  onViewChange?.('teams');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-center ${
                  currentView === 'teams' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Users className="h-4 w-4 mr-1" />
                Takımlar
              </button>
              <button 
                onClick={() => {
                  onViewChange?.('players');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-center ${
                  currentView === 'players' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <User className="h-4 w-4 mr-1" />
                Oyuncular
              </button>
              <button 
                onClick={() => {
                  onViewChange?.('statistics');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-center ${
                  currentView === 'statistics' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                İstatistikler
              </button>
            </div>
            
            {/* Mobile Date Navigation - Only show for matches view */}
            {currentView === 'matches' && (
              <>
                <div className="flex items-center justify-center space-x-1 bg-gray-50 rounded-xl p-3">
                  <button 
                    onClick={() => changeDate(-1)}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                    title="Previous day"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-600" />
                  </button>
                  
                  <div className="flex items-center space-x-2 text-gray-900 flex-1 justify-center">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">{formatDate(selectedDate)}</span>
                  </div>
                  
                  <button 
                    onClick={() => changeDate(1)}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                    title="Next day"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                
                <button 
                  onClick={() => {
                    goToToday();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  Bugüne Git
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};