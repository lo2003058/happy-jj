// stores/user.js
import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    gender: null,
    theme: null,
    language: null,
    events: [],
    recipes: [],
    foods2AvoidList: [],
    favoriteFoodList: [],
    aiApiEndpointModel: '',
    aiApiEndpoint: '',
    aiApiSecret: '',
  }),
  actions: {
    clearAllData() {
      this.gender = null;
      this.theme = null;
      this.language = null;
      this.events = [];
      this.recipes = [];
      this.foods2AvoidList = []
      this.favoriteFoodList = []
      this.aiApiEndpointModel = '';
      this.aiApiEndpoint = '';
      this.aiApiSecret = '';
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
    setRecipes(recipes) {
      this.recipes = recipes
    },
    setFoods2AvoidList(foods2AvoidList) {
      this.foods2AvoidList = foods2AvoidList
    },
    setFavoriteFoodList(favoriteFoodList) {
      this.favoriteFoodList = favoriteFoodList
    },
    setAiApiEndpointModel(aiApiEndpointModel) {
      this.aiApiEndpointModel = aiApiEndpointModel
    },
    setAiApiEndpoint(aiApiEndpoint) {
      this.aiApiEndpoint = aiApiEndpoint
    },
    setAiApiSecret(aiApiSecret) {
      this.aiApiSecret = aiApiSecret
    },
  },
  persist: true,
})
