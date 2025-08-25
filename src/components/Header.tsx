import React, { useState } from 'react';
import { Trophy, Calendar, ChevronLeft, ChevronRight, Menu, X, BarChart3, MessageCircle, Newspaper, Target, ChevronDown } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from '../i18n/useTranslation';
import { supportedLanguages } from '../i18n';

interface HeaderProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  currentView?: string;
  onViewChange?: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ selectedDate, onDateChange, currentView = 'scores', onViewChange }) => {
  const [isStatsDropdownOpen, setIsStatsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, currentLang } = useTranslation();

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
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  {/* Futbol topu simgesi */}
                  <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                    <div className="absolute inset-0 bg-white rounded-full opacity-90"></div>
                    {/* Top desenleri */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-800 rounded-full"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-800 rounded-full"></div>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-gray-800 rounded-full"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-gray-800 rounded-full"></div>
                    {/* Hız çizgileri */}
                    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                      <div className="w-0.5 h-1 bg-white rounded-full"></div>
                      <div className="w-0.5 h-1 bg-white rounded-full"></div>
                      <div className="w-0.5 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent tracking-tight">Golivo</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Live Football Scores</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Language Selector */}
              <LanguageSelector 
                currentLang={currentLang} 
                onLanguageChange={(langCode) => {
                  // Force page reload to apply new language
                  window.location.reload();
                }} 
              />
              
              {/* Navigation Menu */}
              <nav className="flex items-center space-x-1">
                <button 
                  onClick={() => onViewChange?.('dashboard')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    currentView === 'dashboard' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="w-4 h-4 inline mr-1">
                    <div className="w-full h-full bg-current rounded-sm"></div>
                  </div>
                  Dashboard
                </button>
                <button 
                  onClick={() => onViewChange?.('scores')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    currentView === 'scores' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="relative w-4 h-4 inline mr-1">
                    <div className="absolute inset-0 bg-current rounded-full"></div>
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute left-0.5 top-0.5 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute right-0.5 top-0.5 w-1 h-1 bg-white rounded-full"></div>
                  </div>
                  {t.matches}
                </button>
                <button 
                  onClick={() => onViewChange?.('standings')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    currentView === 'standings' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="w-4 h-4 inline mr-1">
                    <div className="w-full h-1 bg-current rounded-sm mb-0.5"></div>
                    <div className="w-3/4 h-1 bg-current rounded-sm mb-0.5"></div>
                    <div className="w-1/2 h-1 bg-current rounded-sm"></div>
                  </div>
                  Sıralama
                </button>
                <button 
                  onClick={() => onViewChange?.('teams')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    currentView === 'teams' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="w-4 h-4 inline mr-1">
                    <div className="w-2 h-2 bg-current rounded-full mb-0.5"></div>
                    <div className="w-3 h-2 bg-current rounded-full"></div>
                  </div>
                  Takımlar
                </button>
                <button 
                  onClick={() => onViewChange?.('players')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    currentView === 'players' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="w-4 h-4 inline mr-1">
                    <div className="w-2 h-2 bg-current rounded-full mb-0.5"></div>
                    <div className="w-3 h-2 bg-current rounded-full"></div>
                  </div>
                  Oyuncular
                </button>
                <button 
                  onClick={() => onViewChange?.('news')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    currentView === 'news' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="w-4 h-4 inline mr-1">
                    <div className="w-full h-1 bg-current rounded-sm mb-0.5"></div>
                    <div className="w-3/4 h-1 bg-current rounded-sm mb-0.5"></div>
                    <div className="w-1/2 h-1 bg-current rounded-sm"></div>
                  </div>
                  {currentLang === 'tr' ? 'Haberler' : 
                   currentLang === 'de' ? 'Nachrichten' :
                   currentLang === 'es' ? 'Noticias' :
                   currentLang === 'fr' ? 'Actualités' :
                   currentLang === 'it' ? 'Notizie' :
                   currentLang === 'pt' ? 'Notícias' :
                   currentLang === 'ru' ? 'Новости' :
                   currentLang === 'ar' ? 'أخبار' :
                   'News'}
                </button>
              </nav>
              
              {/* Date Navigation - Only show for scores view */}
              {currentView === 'scores' && (
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
                    Today
                  </button>
                </>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="flex lg:hidden items-center space-x-3">
              {/* Mobile Language Selector */}
              <LanguageSelector 
                currentLang={currentLang} 
                onLanguageChange={() => {}} 
              />
              
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
                  onViewChange?.('scores');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-center ${
                  currentView === 'scores' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Trophy className="h-4 w-4 mr-1" />
                {t.matches}
              </button>
              <button 
                onClick={() => {
                  onViewChange?.('news');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-center ${
                  currentView === 'news' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Newspaper className="h-4 w-4 mr-1" />
                {currentLang === 'tr' ? 'Haberler' : 
                 currentLang === 'de' ? 'Nachrichten' :
                 currentLang === 'es' ? 'Noticias' :
                 currentLang === 'fr' ? 'Actualités' :
                 currentLang === 'it' ? 'Notizie' :
                 currentLang === 'pt' ? 'Notícias' :
                 currentLang === 'ru' ? 'Новости' :
                 currentLang === 'ar' ? 'الأخبار' :
                 'News'}
              </button>
              <button 
                onClick={() => {
                  onViewChange?.('analysis');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-center ${
                  currentView === 'analysis' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Target className="h-4 w-4 mr-1" />
                {currentLang === 'tr' ? 'Analiz' : 
                 currentLang === 'de' ? 'Analyse' :
                 currentLang === 'es' ? 'Análisis' :
                 currentLang === 'fr' ? 'Analyse' :
                 currentLang === 'it' ? 'Analisi' :
                 currentLang === 'pt' ? 'Análise' :
                 currentLang === 'ru' ? 'Анализ' :
                 currentLang === 'ar' ? 'تحليل' :
                 'Analysis'}
              </button>
              <button 
                onClick={() => {
                  onViewChange?.('contact');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-center ${
                  currentView === 'contact' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                {currentLang === 'tr' ? 'İletişim' : 
                 currentLang === 'de' ? 'Kontakt' :
                 currentLang === 'es' ? 'Contacto' :
                 currentLang === 'fr' ? 'Contact' :
                 currentLang === 'it' ? 'Contatti' :
                 currentLang === 'pt' ? 'Contato' :
                 currentLang === 'ru' ? 'Контакты' :
                 currentLang === 'ar' ? 'اتصل بنا' :
                 'Contact'}
              </button>
            </div>
            
            {/* Stats Submenu */}
            <div className="border-t pt-4">
              <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                {currentLang === 'tr' ? '📊 İstatistikler' : 
                 currentLang === 'de' ? '📊 Statistiken' :
                 currentLang === 'es' ? '📊 Estadísticas' :
                 currentLang === 'fr' ? '📊 Statistiques' :
                 currentLang === 'it' ? '📊 Statistiche' :
                 currentLang === 'pt' ? '📊 Estatísticas' :
                 currentLang === 'ru' ? '📊 Статистика' :
                 currentLang === 'ar' ? '📊 الإحصائيات' :
                 '📊 Statistics'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => {
                    onViewChange?.('standings');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-2 text-xs font-medium rounded-lg transition-colors ${
                    currentView === 'standings' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  League Tables
                </button>
                <button 
                  onClick={() => {
                    onViewChange?.('teams');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-2 text-xs font-medium rounded-lg transition-colors ${
                    currentView === 'teams' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Teams
                </button>
                <button 
                  onClick={() => {
                    onViewChange?.('players');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-2 text-xs font-medium rounded-lg transition-colors ${
                    currentView === 'players' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Players
                </button>
                <button 
                  onClick={() => {
                    onViewChange?.('statistics');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-2 text-xs font-medium rounded-lg transition-colors ${
                    currentView === 'statistics' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Advanced Stats
                </button>
                <button 
                  onClick={() => {
                    onViewChange?.('leagues');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-2 text-xs font-medium rounded-lg transition-colors ${
                    currentView === 'leagues' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Leagues
                </button>
                <button 
                  onClick={() => {
                    onViewChange?.('countries');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-2 text-xs font-medium rounded-lg transition-colors ${
                    currentView === 'countries' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Countries
                </button>
              </div>
            </div>
            
            {/* Mobile Date Navigation - Only show for scores view */}
            {currentView === 'scores' && (
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
                  Go to Today
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};