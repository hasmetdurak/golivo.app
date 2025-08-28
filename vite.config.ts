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
    // Force cache bust for Netlify
    assetsDir: `assets-${Date.now()}`,
    // Improve loading
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', '@radix-ui/react-dialog']
        }
      }
    },
    // Ensure assets are properly inlined
    assetsInlineLimit: 4096
  },
  // Improve dev server stability
  server: {
    port: 5173,
    host: true,
    strictPort: false
  }
});