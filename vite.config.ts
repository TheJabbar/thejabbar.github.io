import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
// Project site: https://thejabbar.github.io/ -> base './' keeps assets working on Pages.
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
      },
    },
  },
});
