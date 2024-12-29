/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        robotoMono: ['Roboto Mono', 'monospace'],
        audiowide: ['Audiowide', 'sans-serif'],
        exo2: ['Exo 2', 'sans-serif'],
        pressStart2P: ['Press Start 2P', 'cursive'],
        russoOne: ['Russo One', 'sans-serif'],
        syncopate: ['Syncopate', 'sans-serif'],
        bungee: ['Bungee', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
