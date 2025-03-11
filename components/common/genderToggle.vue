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
import {useI18n} from "vue-i18n";
import {ref, computed, watch} from 'vue'
import {useUserStore} from '~/stores/user.js'

const {t, loadLocaleMessages, locale} = useI18n()
const userStore = useUserStore()
const gender = ref(userStore.gender || 'male')

// On mount, load and set the locale from userStore.language (or fallback to "en")
onMounted(async () => {
  const lang = userStore.language || 'en'
  await loadLocaleMessages(lang)
  locale.value = lang
})

// The computed property is true when gender is "female" so that the active style (pink) applies.
const isFemale = computed<boolean>({
  get() {
    return gender.value === 'female'
  },
  set(val: boolean) {
    gender.value = val ? 'female' : 'male'
  }
})

// Update userStore whenever the toggle changes
watch(isFemale, (newVal) => {
  userStore.setGender(newVal ? 'female' : 'male')
})
</script>
