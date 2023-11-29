// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss',[
      '@nuxtjs/i18n',
      { /* module options */ }
    ]],
  plugins: ['~/plugins/weather'],
  runtimeConfig: {
    NUXT_API_KEY: process.env.API_KEY,
    public: {
      NUXT_API_KEY: process.env.API_KEY,
    }
  }
})
