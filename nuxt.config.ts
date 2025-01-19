// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    'nuxt-vuefire',
    '@pinia/nuxt',
    "@nuxtjs/tailwindcss",
  ],
  vuefire: {
    config: {
      apiKey: process.env.apiKey,
      authDomain: "custos-v3.firebaseapp.com",
      projectId: "custos-v3",
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      measurementId: "G-EZH4B8ZXVV"
    }
  },
})