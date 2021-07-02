module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'minecraft-shader': "url('/src/images/bg.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
