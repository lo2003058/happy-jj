<template>
  <UFormGroup label="Theme" class="my-2">
    <UToggle
        size="xl"
        name="theme"
        v-model="isDark"
        on-icon="i-heroicons-moon-20-solid"
        off-icon="i-heroicons-sun-20-solid"
        :ui="{
        active: 'bg-violet-200 dark:bg-violet-700',
        inactive: 'bg-sky-200 dark:bg-sky-700'
      }"
    />
  </UFormGroup>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue'
import {useUserStore} from '~/stores/user'

const userStore = useUserStore()

// Initialize theme from store if available, otherwise default to 'light'
const theme = ref(userStore.theme || 'light')

// Create a computed property that converts the boolean toggle to theme string
const isDark = computed<boolean>({
  get() {
    return theme.value === 'dark'
  },
  set(val: boolean) {
    theme.value = val ? 'dark' : 'light'
  }
})

// On mount, if no theme is stored, check system preference and update theme
onMounted(() => {
  if (!userStore.theme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    theme.value = prefersDark ? 'dark' : 'light'
  }
})

// Watch for theme changes and update both the <html> element and the store
watch(theme, (newTheme) => {
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  userStore.setTheme(newTheme)
})
</script>
