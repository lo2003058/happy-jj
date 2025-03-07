// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: false},

    modules: [
        '@nuxt/ui',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
    ],

    compatibilityDate: '2025-03-07',
})
