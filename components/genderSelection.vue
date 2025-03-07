<template>
  <!-- Wrap the full-page overlay in a transition -->
  <transition name="fade" @after-leave="handleAfterLeave">
    <!-- Render only when visible -->
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
      <div class="bg-white text-black rounded-lg p-8 shadow-lg max-w-xl w-full text-center">
        <h2 class="text-2xl font-bold mb-4">Welcome! Please select your gender</h2>
        <div class="flex justify-around">
          <button @click="selectGender('male')" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Male
          </button>
          <button @click="selectGender('female')" class="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
            Female
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import {ref} from 'vue'
import {useUserStore} from '~/stores/user'

const userStore = useUserStore()

// Control the component's visibility
const visible = ref(true)
// Store the selected gender locally until after the animation
const selectedGender = ref(null)

// When a user selects a gender, trigger the fade-out effect.
const selectGender = (gender) => {
  selectedGender.value = gender
  visible.value = false
}

// After fade-out, update the Pinia store (which will be persisted).
const handleAfterLeave = () => {
  userStore.setGender(selectedGender.value)
}
</script>

<style scoped>
/* Transition classes for the fade effect */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
