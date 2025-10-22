// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: false},
    app: {
        head: {
            title: 'Happy JJ',
            meta: [
                {
                    name: 'description',
                    content: 'A period tracking app for Happy JJs'
                }
            ]
        }
    },
    modules: [
        '@nuxt/ui',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@nuxt/image',
        '@nuxtjs/i18n',
    ],
    i18n: {
        locales: [
            {
                code: 'en',
                file: 'en.js'
            },
            {
                code: 'fr',
                file: 'fr.js'
            },
            {
                code: 'zh',
                file: 'zh-TW.js'
            },
            {
                code: 'zh-HK',
                file: 'zh-HK.js'
            },
            {
                code: 'zh-TW',
                file: 'zh-TW.js'
            },
            {
                code: 'zh-CN',
                file: 'zh-CN.js'
            }
        ],
        lazy: true,
        langDir: 'locales/',
        defaultLocale: 'en'
    },
    compatibilityDate: '2025-03-07',
    vite: {
        build: {
            sourcemap: false,
        },
    },
})
