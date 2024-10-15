/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#F6FFF7',
          400: '#CDFFD3',
          500: '#A4FFAF',
          600: '#6CFF7E',
          700: '#34FF4C',
          800: '#00FB1E',
          900: '#00C318',
          950: '#00A714',
        },
        secondary: '#6B7280',
        carnation: '#F64A4A',
        cream: '#F8CD65',
      },
      fontFamily: {
        body: [
          'JetBrainsMono',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        headline: ['JetBrainsMono', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    ({ addComponents, theme }) => {
      addComponents({
        '.container': {
          'width': '100%',
          'marginLeft': 'auto',
          'marginRight': 'auto',
          'paddingLeft': theme('spacing.4'),
          'paddingRight': theme('spacing.4'),
          '@screen lg': {
            maxWidth: '1200px',
            paddingLeft: theme('spacing.5'),
            paddingRight: theme('spacing.5'),
          },
        },
      })
    },
  ],
}
