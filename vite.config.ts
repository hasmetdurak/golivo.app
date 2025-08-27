import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Use relative paths for assets to work on all subdomains
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Force cache bust for Vercel/Netlify
    assetsDir: `assets-${Date.now()}`
  }
});