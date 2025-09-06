import React, { useState } from 'react';
import { Go35MainPage } from './components/Go35MainPage';
import { AnalysisPage } from './components/AnalysisPage';
import { NewsPage } from './components/NewsPage';
import { ContactPage } from './components/ContactPage';
import { CorporateLoadingScreen } from './components/ModernLoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [currentView, setCurrentView] = useState<string>('scores');
  const [isLoading, setIsLoading] = useState(false);

  const handleViewChange = (view: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentView(view);
      setIsLoading(false);
    }, 300);
  };

  if (isLoading) {
    return <CorporateLoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-cream-light via-white to-purple-50">
        {/* Page Content */}
        <main className="transition-all duration-500">
          {currentView === 'scores' && (
            <Go35MainPage 
              currentView={currentView} 
              onViewChange={handleViewChange} 
            />
          )}
          {currentView === 'news' && (
            <NewsPage 
              currentView={currentView} 
              onViewChange={handleViewChange} 
            />
          )}
          {currentView === 'analysis' && (
            <AnalysisPage 
              currentView={currentView} 
              onViewChange={handleViewChange} 
            />
          )}
          {currentView === 'contact' && (
            <ContactPage 
              currentView={currentView} 
              onViewChange={handleViewChange} 
            />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;