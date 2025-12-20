module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      perspective: {
        '1000': '1000px',
        '1500': '1500px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.preserve-3d': {
          transformStyle: 'preserve-3d',
        },
        '.perspective-1500': {
          perspective: '1500px',
        },
      })
    },
  ],
}
