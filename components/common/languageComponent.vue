<template>
  <UFormGroup :label="t('language')" class="my-2">
    <UDropdown :items="[languages]" :popper="{ placement: 'bottom-start' }">
      <UButton variant="outline" size="md" color="gray">
        {{ currentLanguage.label }}
      </UButton>

      <!-- Render each language option -->
      <template #item="{ item }">
        <div
            class="flex items-center justify-between w-full cursor-pointer py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            @click="setLanguage(item.code)"
        >
          <span class="truncate">{{ item.label }}</span>
          <UIcon
              v-if="item.code === currentLanguage.code"
              name="i-heroicons-check"
              class="w-4 h-4 text-green-500"
          />
        </div>
      </template>
    </UDropdown>
  </UFormGroup>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '~/stores/user'
import languageList, {type Language} from '~/config/language'

// Cast our imported language list to the proper type.
const languages: Language[] = languageList

const userStore = useUserStore()
const { locale, t } = useI18n()

// On mount, if no language is set, normalize the browser language and set it.
onMounted(() => {
  if (!userStore.language) {
    const browserLang: string = navigator.language || 'en'
    let langCode: "en" | "fr" | "zh-HK" | "zh-TW" | "zh-CN" = 'en'
    if (browserLang.startsWith('en')) {
      langCode = 'en'
    } else if (browserLang.startsWith('fr')) {
      langCode = 'fr'
    } else if (browserLang.startsWith('zh')) {
      // If the browser language exactly matches one of our supported Chinese locales, use it;
      // otherwise default to "zh-HK"
      if (browserLang === 'zh-HK' || browserLang === 'zh-TW' || browserLang === 'zh-CN') {
        langCode = browserLang as "zh-HK" | "zh-TW" | "zh-CN"
      } else {
        langCode = 'zh-HK'
      }
    }
    userStore.setLanguage(langCode)
    locale.value = langCode
  } else {
    locale.value = userStore.language
  }
})

// Compute the current language based on the vue-i18n locale value.
const currentLanguage = computed<Language>(() => {
  return languages.find(lang => lang.code === locale.value) || languages[0]
})

// Update the locale and user store when a language is selected.
const setLanguage = (code: "en" | "fr" | "zh-HK" | "zh-TW" | "zh-CN"): void => {
  locale.value = code
  userStore.setLanguage(code)
}

// Keep vue-i18n in sync with changes in userStore.language.
watch(() => userStore.language, (newLang) => {
  locale.value = newLang || 'en'
})
</script>
