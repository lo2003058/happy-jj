<template>
  <WelcomeComponent/>
  <GenderSelection v-if="!userStore.gender"/>
  <SettingComponent/>
  <FullCalendar/>
</template>

<script setup lang="ts">
import {onMounted, watch} from 'vue'
import {useUserStore} from '~/stores/user'
import FullCalendar from '~/components/common/fullCalendar.vue'
import GenderSelection from '~/components/common/genderSelection.vue'
import WelcomeComponent from '~/components/common/welcomeComponent.vue'
import SettingComponent from '~/components/common/settingComponent.vue'

const userStore = useUserStore()

// On mount, if no theme is set in the store, check system preference and update the store
onMounted(() => {
  if (!userStore.theme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    userStore.setTheme(prefersDark ? 'dark' : 'light')
  }
  // Apply the theme immediately on mount
  if (userStore.theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

// Watch for theme changes and update the <html> element class accordingly
watch(
    () => userStore.theme,
    (newTheme) => {
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
)
</script>
