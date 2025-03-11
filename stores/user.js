// stores/user.js
import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    gender: null,
    theme: null,
    language: null,
    events: [],
  }),
  actions: {
    clearAllData() {
      this.gender = null;
      this.theme = null;
      this.language = null;
      this.events = [];
    },
    clearEvents() {
      this.events = [];
    },
    setGender(gender) {
      this.gender = gender
    },
    setTheme(theme) {
      this.theme = theme
    },
    setLanguage(language) {
      this.language = language
    },
    setEvents(events) {
      this.events = events
    },
    addMenstruationDate(date) {
      this.events = [...this.events, date];
    }
  },
  persist: true,
})
