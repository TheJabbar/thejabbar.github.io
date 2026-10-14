import { defineConfig } from 'vite';

// https://vitejs.dev/config/
// Project site: https://thejabbar.github.io/ -> base './' keeps assets working on Pages.
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
  },
});
