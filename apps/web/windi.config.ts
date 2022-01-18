import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  theme: {
    extend: {
      colors: {
        white: '#fefefe',
        black: '#333333',
        gray: {
          '50': '#FDFCFC',
          '100': '#F3F2F2',
          '200': '#DFDEDD',
          '300': '#CBCAC8',
          '400': '#B7B6B3',
          '500': '#A4A19E',
          '600': '#888681',
          '700': '#6C6965',
          '800': '#4F4D4A',
          '900': '#32312F',
        },
      },
      borderRadius: {
        sm: '0.25rem',
      },
    },
  },
});
