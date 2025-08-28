import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

// Import fonts
// import '@fontsource/inter/300.css';
// import '@fontsource/inter/400.css';
// import '@fontsource/inter/500.css';
// import '@fontsource/inter/600.css';
// import '@fontsource/inter/700.css';
// import '@fontsource/inter/900.css';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
// import '@fontsource/roboto/900.css';

// Prevent white screen by ensuring we have a root element
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('🚨 Root element not found! Creating one...');
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
}

console.log('🚀 GoLivo app starting...', {
  hostname: window.location.hostname,
  href: window.location.href,
  userAgent: navigator.userAgent
});

const root = rootElement || document.getElementById('root')!;

try {
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ErrorBoundary>
    </StrictMode>
  );
  console.log('✅ GoLivo app rendered successfully');
  
  // Hide loading screen
  setTimeout(() => {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.classList.add('fade-out');
      setTimeout(() => loading.remove(), 500);
    }
  }, 100);
} catch (error) {
  console.error('🚨 Error rendering app:', error);
  // Hide loading screen even on error
  const loading = document.getElementById('loading');
  if (loading) loading.remove();
  
  // Fallback rendering
  root.innerHTML = '<div style="padding: 20px; font-family: Arial, sans-serif;"><h1>GoLivo - Live Football Scores</h1><p>Loading...</p><p style="color: #666; font-size: 14px;">If this message persists, please refresh the page.</p></div>';
}