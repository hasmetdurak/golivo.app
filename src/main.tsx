import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);