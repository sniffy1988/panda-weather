// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss','@nuxtjs/i18n', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', 'nuxt-highcharts'],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  i18n: {
    locales: [{
      code: 'en',
      file: 'en.json',
      name: 'English'
    }, {
      code: 'uk',
      file: 'uk.json',
      name: 'Українська'
      }],
      defaultLocale: 'en',
      lazy: true,
    langDir: 'locales',
    strategy: 'no_prefix'
  },
  plugins: ['~/plugins/weather', '~/plugins/dateFns'],
  runtimeConfig: {
    NUXT_API_KEY: process.env.API_KEY,
    NUXT_IP_KEY: process.env.IP_KEY,
    public: {
      NUXT_API_KEY: process.env.API_KEY,
      NUXT_IP_KEY: process.env.IP_KEY,
    }
  }
})
