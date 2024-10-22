// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css', 'assets/css/fonts.css'],

  app: {
    head: {
      title: 'Password Generator',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Generate secure and customizable passwords with ease using our password generator tool.' },
        { hid: 'keywords', name: 'keywords', content: 'password generator, secure passwords, strong passwords, web security, Nuxt 3, Tailwind CSS, Nuxt UI' },
        { hid: 'author', name: 'author', content: 'Jimena Miguez' },
        { name: 'robots', content: 'index, follow' },
        { name: 'og:title', content: 'Secure Password Generator' },
        { name: 'og:description', content: 'Create secure and customizable passwords instantly. Protect your online accounts with strong passwords.' },

      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@nuxt/ui', '@nuxtjs/i18n', 'nuxt-svgo', 'nuxt-headlessui', 'nuxt-lodash'],
  i18n: {
    locales: [
      {
        name: 'English',
        code: 'en',
        iso: 'en-GB',
        file: 'en.json',
      },
      {
        name: 'Deutsch',
        code: 'de',
        iso: 'de-DE',
        file: 'de.json',
      },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'i18n',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    compilation: {
      strictMessage: false,
    },
  },
})
