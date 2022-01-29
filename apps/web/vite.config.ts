import { defineConfig } from 'vite';
import solid from 'solid-start';
import windi from 'vite-plugin-windicss';

export default defineConfig({
  plugins: [solid(), windi()],
  server: {
    port: 8080,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      graphql: 'graphql-web-lite',
    },
  },
});
