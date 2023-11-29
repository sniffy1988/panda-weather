// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss',[
      '@nuxtjs/i18n',
      { /* module options */ },
  ], '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  plugins: ['~/plugins/weather'],
  runtimeConfig: {
    NUXT_API_KEY: process.env.API_KEY,
    NUXT_IP_KEY: process.env.IP_KEY,
    public: {
      NUXT_API_KEY: process.env.API_KEY,
      NUXT_IP_KEY: process.env.IP_KEY,
    }
  }
})
