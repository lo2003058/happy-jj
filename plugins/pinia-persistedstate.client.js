// plugins/pinia-persistedstate.client.js
import {defineNuxtPlugin} from '#app'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
  // Register the persisted state plugin with Pinia
  nuxtApp.$pinia.use(piniaPluginPersistedstate)
})
