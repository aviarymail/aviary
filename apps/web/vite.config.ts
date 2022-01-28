import { defineConfig } from 'vite';
import solid from 'solid-start';
import windi from 'vite-plugin-windicss';

export default defineConfig({
  plugins: [solid(), windi()],
  server: {
    port: 8080,
    proxy: {
      '/graphql': 'http://localhost:3000',
    },
  },
  resolve: {
    alias: {
      graphql: 'graphql-web-lite',
    },
  },
});
