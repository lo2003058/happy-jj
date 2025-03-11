// stores/user.js
import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    gender: null,
    theme: null,
  }),
  actions: {
    setGender(gender) {
      this.gender = gender
    },
    setTheme(theme) {
      this.theme = theme
    },
  },
  persist: true,
})
