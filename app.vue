<template>
  <WelcomeComponent/>

  <div class="bg-gray-100 dark:bg-gray-800 min-h-screen">
    <GenderSelection v-if="!userStore.gender"/>

    <ToolsComponent v-if="userStore.gender"/>
    <SettingComponent v-if="userStore.gender"/>

    <FullCalendar/>

    <UNotifications/>
  </div>

</template>

<script setup lang="ts">
import {onMounted, watch} from 'vue'
import {useUserStore} from '~/stores/user'
import {useI18n} from 'vue-i18n'
import FullCalendar from '~/components/common/fullCalendar.vue'
import GenderSelection from '~/components/common/genderSelection.vue'
import WelcomeComponent from '~/components/common/welcomeComponent.vue'
import SettingComponent from '~/components/common/settingComponent.vue'
import ToolsComponent from "~/components/common/toolsComponent.vue";

const userStore = useUserStore()
const {locale} = useI18n()

// On mount, if no theme is set, use system preference
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

  // Initialize language if not already set
  if (!userStore.language) {
    const browserLang = navigator.language || 'en'
    if (browserLang.startsWith('en')) {
      // For any English variant, always use "en"
      userStore.setLanguage('en')
    } else if (browserLang.startsWith('zh')) {
      // For Chinese variants, preserve full language code (e.g. "zh-HK", "zh-TW", "zh-CN")
      userStore.setLanguage(browserLang)
    } else {
      // Otherwise, use the base language code (e.g. "fr" for "fr-FR")
      userStore.setLanguage(browserLang.split('-')[0])
    }
  }
  // Set the vue-i18n locale from userStore.language
  locale.value = userStore.language || 'en'
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

// Watch for language changes in the userStore and update vue-i18n locale
watch(
    () => userStore.language,
    (newLang) => {
      locale.value = newLang || 'en'
    }
)
</script>
