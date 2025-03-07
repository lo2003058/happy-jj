// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    gender: null,
  }),
  actions: {
    setGender(gender) {
      this.gender = gender
    },
  },
  persist: true,
})
