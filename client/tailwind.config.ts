import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./pages/**/*.{html,js}', './components/**/*.{html,js}'],
  theme: {
    extend: {},
    colors: {
      'blue': '#1fb6ff',
    },

  },
  plugins: [],

}

export default config;
