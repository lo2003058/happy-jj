<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
      <NuxtImg
          :src="logo"
          alt="Logo"
          width="1600"
          height="800"
          quality="50"
          class="w-96 h-48"
      />
      <div class="text-xl text-gray-700 animate-bounce">
        {{ t('loading') }}
      </div>
    </div>
  </transition>
</template>

<script setup>
const { t } = useI18n()
import {ref, onMounted} from 'vue'

// Replace with the actual path to your logo image
const logo = '/images/happyjj.png'
const visible = ref(true)

onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, 2500)
})
</script>

<style scoped>
/* Fade transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
