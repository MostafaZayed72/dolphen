// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    'vuetify-nuxt-module',
    '@nuxtjs/color-mode',
    "@nuxt/icon",
    "nuxt-security"
  ],

  security:{
headers:{
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    'img-src': ['self', 'data:', 'https://backend.babybuildingksa.com/'],
  },
}
  }

})