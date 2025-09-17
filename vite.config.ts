import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        // Ensure sitemap.xml and robots.txt are copied to build
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'sitemap.xml' || assetInfo.name === 'robots.txt') {
            return '[name].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
  },
  // Ensure static files are served correctly
  publicDir: 'public',
  server: {
    // For development, serve static files properly
    fs: {
      strict: false,
    },
  },
});
