import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Add Vitest configuration here
  test: {
    globals: true, // Use Vitest global APIs
    environment: 'jsdom', // Simulate DOM environment
    setupFiles: './src/test/setup.ts', // Optional setup file
    css: true, // Enable CSS processing if your components import CSS
  },
});
