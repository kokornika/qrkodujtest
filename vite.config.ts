import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['qrcode', 'qrcode.react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          qr: ['qrcode', 'qrcode.react'],
        },
      },
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});