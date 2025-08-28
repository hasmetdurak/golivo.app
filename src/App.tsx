import React, { useState, useEffect } from 'react';
import { Go35MainPage } from './components/Go35MainPage';
import SEO from './components/SEO';

function App() {
  const [currentView, setCurrentView] = useState('scores');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    console.log('🌍 GoLivo App starting with Go35 design');
    
    // Add global error handler for stability
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('🚨 Unhandled promise rejection:', event.reason);
      event.preventDefault();
    };
    
    const handleError = (event: ErrorEvent) => {
      console.error('🚨 Global error:', event.error);
      if (event.error?.name === 'ChunkLoadError' || event.message?.includes('Loading chunk')) {
        console.log('🔄 Chunk load error detected, reloading...');
        window.location.reload();
      }
    };
    
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO />
      <Go35MainPage 
        currentView={currentView}
        onViewChange={setCurrentView}
      />
    </div>
  );
}

export default App;