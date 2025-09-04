import React, { useState } from 'react';
import { Go35MainPage } from './components/Go35MainPage';
import { AnalysisPage } from './components/AnalysisPage';
import { NewsPage } from './components/NewsPage';
import { ContactPage } from './components/ContactPage';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  const [currentView, setCurrentView] = useState<string>('scores');

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
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
      </div>
    </ErrorBoundary>
  );
}

export default App;