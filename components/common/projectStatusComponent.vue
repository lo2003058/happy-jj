<template>
  <div class="flex items-center justify-center">
    <div class="flex flex-col items-center gap-4 p-4">
      <NuxtImg :src="imageSrc" quality="70" alt="Project status" />
      <p class="text-xl text-gray-800 dark:text-gray-100 select-none">{{ statusMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{ status: 'developing' }>()

const imageSrc = computed(() => {
  switch (props.status) {
    case 'developing':
      return '/images/sorry_man.png'
    default:
      return '/images/sorry_man.png'
  }
})

const statusMessage = computed(() => {
  switch (props.status) {
    case 'developing':
      return t('projectStatus.developing')
    default:
      return 'Project status unknown.'
  }
})
</script>
