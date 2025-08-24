import React, { useState } from 'react';
import { Trophy, Calendar, ChevronLeft, ChevronRight, Menu, X, BarChart3, MessageCircle, Newspaper, Target, ChevronDown } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from '../i18n/useTranslation';

interface HeaderProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  currentView?: string;
  onViewChange?: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ selectedDate, onDateChange, currentView = 'scores', onViewChange }) => {
  const [isStatsDropdownOpen, setIsStatsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, currentLang, changeLanguage } = useTranslation();

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
                <p className="text-xs text-gray-500 hidden sm:block">Live Football Scores</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Language Selector */}
              <LanguageSelector 
                currentLang={currentLang} 
                onLanguageChange={changeLanguage} 
              />
              
              {/* Navigation Menu */}
              <nav className="flex items-center space-x-1">
                <button 
                  onClick={() => onViewChange?.('scores')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentView === 'scores' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Trophy className="h-4 w-4 inline mr-1" />
                  {currentLang === 'tr' ? 'Skorlar' : 
                   currentLang === 'de' ? 'Ergebnisse' :
                   currentLang === 'es' ? 'Marcadores' :
                   currentLang === 'fr' ? 'Scores' :
                   currentLang === 'it' ? 'Punteggi' :
                   currentLang === 'pt' ? 'Placares' :
                   currentLang === 'ru' ? 'Счета' :
                   currentLang === 'ar' ? 'النتائج' :
                   'Scores'}
                </button>
                <button 
                  onClick={() => onViewChange?.('news')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentView === 'news' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Newspaper className="h-4 w-4 inline mr-1" />
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
                
                {/* Stats Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsStatsDropdownOpen(!isStatsDropdownOpen)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center ${
                      ['standings', 'teams', 'players', 'statistics', 'leagues', 'countries'].includes(currentView || '') 
                        ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    {currentLang === 'tr' ? 'İstatistikler' : 
                     currentLang === 'de' ? 'Statistiken' :
                     currentLang === 'es' ? 'Estadísticas' :
                     currentLang === 'fr' ? 'Statistiques' :
                     currentLang === 'it' ? 'Statistiche' :
                     currentLang === 'pt' ? 'Estatísticas' :
                     currentLang === 'ru' ? 'Статистика' :
                     currentLang === 'ar' ? 'الإحصائيات' :
                     'Stats'}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </button>
                  
                  {isStatsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="py-1">
                        <button
                          onClick={() => { onViewChange?.('standings'); setIsStatsDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          League Tables
                        </button>
                        <button
                          onClick={() => { onViewChange?.('teams'); setIsStatsDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Teams
                        </button>
                        <button
                          onClick={() => { onViewChange?.('players'); setIsStatsDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Players
                        </button>
                        <button
                          onClick={() => { onViewChange?.('statistics'); setIsStatsDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Advanced Stats
                        </button>
                        <button
                          onClick={() => { onViewChange?.('leagues'); setIsStatsDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Leagues
                        </button>
                        <button
                          onClick={() => { onViewChange?.('countries'); setIsStatsDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Countries
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => onViewChange?.('analysis')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentView === 'analysis' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Target className="h-4 w-4 inline mr-1" />
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
                  onClick={() => onViewChange?.('contact')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentView === 'contact' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <MessageCircle className="h-4 w-4 inline mr-1" />
                  {currentLang === 'tr' ? 'İletişim' : 
                   currentLang === 'de' ? 'Kontakt' :
                   currentLang === 'es' ? 'Contacto' :
                   currentLang === 'fr' ? 'Contact' :
                   currentLang === 'it' ? 'Contatti' :
                   currentLang === 'pt' ? 'Contato' :
                   currentLang === 'ru' ? 'Контакты' :
                   currentLang === 'ar' ? 'اتصل بنا' :
                   'Contact Us'}
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
                onLanguageChange={changeLanguage} 
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
                {currentLang === 'tr' ? 'Skorlar' : 
                 currentLang === 'de' ? 'Ergebnisse' :
                 currentLang === 'es' ? 'Marcadores' :
                 currentLang === 'fr' ? 'Scores' :
                 currentLang === 'it' ? 'Punteggi' :
                 currentLang === 'pt' ? 'Placares' :
                 currentLang === 'ru' ? 'Счета' :
                 currentLang === 'ar' ? 'النتائج' :
                 'Scores'}
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