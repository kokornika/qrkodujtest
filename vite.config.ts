import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
  define: {
    'process.env.VITE_EMAIL_SERVICE_ID': JSON.stringify(''),
    'process.env.VITE_EMAIL_TEMPLATE_ID': JSON.stringify(''),
    'process.env.VITE_EMAIL_USER_ID': JSON.stringify(''),
  }
});