<template>
  <UFormGroup :label="t('gender')" class="my-2">
    <UToggle
        size="xl"
        name="gender"
        v-model="isFemale"
        :ui="{
        active: 'bg-pink-400 dark:bg-pink-700',   /* female */
        inactive: 'bg-blue-400 dark:bg-blue-700'     /* male */
      }"
    />
  </UFormGroup>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue'
import {useI18n} from 'vue-i18n'
import {useUserStore} from '~/stores/user'

const {t, loadLocaleMessages, locale} = useI18n()
const userStore = useUserStore()

// Initialize gender value from userStore; default to 'male'
const gender = ref<string>(userStore.gender || 'male')

// Use your toast composable (make sure it's set up in your project)
const toast = useToast()

// On mount, load and set the locale from userStore.language (or fallback to "en")
onMounted(async () => {
  const lang = userStore.language || 'en'
  await loadLocaleMessages(lang)
  locale.value = lang
})

// Computed property: returns true if gender is 'female'
const isFemale = computed<boolean>({
  get() {
    return gender.value === 'female'
  },
  set(val: boolean) {
    gender.value = val ? 'female' : 'male'
    toast.add({
      title: t('genderChanged'),
      timeout: 1500,
    })
  }
})

// Update userStore whenever the toggle changes
watch(isFemale, (newVal) => {
  userStore.setGender(newVal ? 'female' : 'male')
})
</script>
