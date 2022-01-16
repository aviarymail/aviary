import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import windi from 'vite-plugin-windicss';

export default defineConfig({
  plugins: [
    solid(),
    windi({
      config: {
        extract: { include: ['src/**/*.{ts,tsx}'] },
      },
    }),
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
