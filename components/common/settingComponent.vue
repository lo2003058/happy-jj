<template>
  <div class="relative">
    <!-- Top-right settings button -->
    <div class="absolute top-4 right-4">
      <UButton
          icon="i-heroicons-cog-6-tooth-solid"
          size="md"
          color="gray"
          variant="solid"
          @click="isOpen = true"
      />
    </div>

    <USlideover v-model="isOpen" :transition="true">
      <div class="flex flex-col h-full">
        <UCard class="flex-1 flex flex-col overflow-hidden">
          <template #header>
            <UButton
                color="gray"
                variant="ghost"
                size="sm"
                icon="i-heroicons-x-mark-20-solid"
                class="flex sm:hidden absolute end-5 top-5 z-10"
                square
                padded
                @click="isOpen = false"
            />
            <h2 class="text-xl font-bold">{{ t('settings') }}</h2>
          </template>

          <!-- Content area -->
          <div class="flex-1 overflow-auto">
            <GenderToggle/>
            <ThemeToggle/>
            <LanguageComponent/>
          </div>
        </UCard>

        <!-- Fixed footer with buttons and copyright -->
        <div class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4">
          <div class="grid grid-cols-2 gap-4 pb-3">
            <UButton
                block
                color="orange"
                variant="solid"
                size="md"
                @click="toast.add({
                  title: 'Clear events?',
                  timeout: 0,
                  actions: clearActions,
                })"
            >
              {{ t('clearAllEvents') }}
            </UButton>
            <UButton
                block
                color="red"
                variant="solid"
                size="md"
                @click="toast.add({
                  title: 'Reset to default?',
                  timeout: 0,
                  actions: resetActions,
                })"
            >
              {{ t('resetButton') }}
            </UButton>
          </div>
        </div>
      </div>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch} from 'vue'
import {useI18n} from 'vue-i18n'
import {useUserStore} from '~/stores/user'
import GenderToggle from '~/components/common/genderToggle.vue'
import ThemeToggle from '~/components/common/themeToggle.vue'
import LanguageComponent from '~/components/common/languageComponent.vue'
import CopyrightComponent from "~/components/common/copyrightComponent.vue";

const {t, locale, loadLocaleMessages} = useI18n()
const userStore = useUserStore()
const isOpen = ref(false)

const toast = useToast()

const resetActions = ref([{
  label: 'Yes',
  click: () => {
    userStore.clearAllData()
    toast.add({
      title: 'Data reset',
      timeout: 1500,
    })
    window.location.reload()
  }
}, {
  label: 'No',
  click: () => toast.add({
    title: 'Reset cancelled',
    timeout: 1500
  })
}])

const clearActions = ref([{
  label: 'Yes',
  click: () => {
    userStore.clearEvents()
    // Close the settings panel after clearing events
    isOpen.value = false;
  }
}, {
  label: 'No',
  click: () => toast.add({
    title: 'Clear cancelled',
    timeout: 1500
  })
}])

// On mount, load and set the locale from userStore.language (or fallback to "en")
onMounted(async () => {
  const lang = userStore.language || 'en'
  await loadLocaleMessages(lang)
  locale.value = lang
})

// Watch for changes in userStore.language and update vue-i18n locale accordingly
watch(
    () => userStore.language,
    async (newLang) => {
      if (newLang) {
        await loadLocaleMessages(newLang)
        locale.value = newLang
      }
    }
)

const handleResetToDefault = () => {
  userStore.clearAllData()
  toast.add({
    title: 'Data reset',
    timeout: 1500
  })
  window.location.reload()
}

const handleClearAllEvents = () => {
  userStore.clearEvents()
  // Close the settings panel after clearing events
  isOpen.value = false;
  toast.add({
    title: 'Events cleared',
    timeout: 1500
  })
}
</script>

<style scoped>
/* No additional styles needed since Tailwind is used */
</style>
