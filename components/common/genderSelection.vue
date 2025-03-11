<template>
  <transition name="fade" @after-leave="handleAfterLeave">
    <div
        v-if="visible"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-10"
    >
      <div class="relative bg-white text-black w-full h-screen overflow-hidden">
        <!-- Trapezoid backgrounds -->
        <div class="absolute inset-0">
          <!-- First trapezoid: mobile (top), desktop (left) -->
          <div
              class="absolute inset-0 bg-blue-500 trapezoid-first"
              :class="{ darkened: hoveredGender === 'female' }"
          ></div>
          <!-- Second trapezoid: mobile (bottom), desktop (right) -->
          <div
              class="absolute inset-0 bg-pink-500 trapezoid-second"
              :class="{ darkened: hoveredGender === 'male' }"
          ></div>
        </div>

        <!-- Content container with two sides -->
        <div class="relative flex flex-col md:flex-row h-full">
          <!-- Male side -->
          <div
              class="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center items-center text-white z-10 transition-all duration-300"
              :class="{ darkened: hoveredGender && hoveredGender !== 'male' }"
              @mouseenter="hoveredGender = 'male'"
              @mouseleave="hoveredGender = null"
          >
            <div class="text-center px-4">
              <h2 class="text-xl md:text-2xl font-bold mb-4">Male</h2>
              <NuxtImg
                  class="transition-transform"
                  :src="maleImage"
                  width="238"
                  height="342"
                  quality="50"
                  :class="{ zoom: hoveredGender === 'male' }"
                  @click="selectGender('male')"
              />
            </div>
          </div>

          <!-- Female side -->
          <div
              class="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center items-center text-white z-10 transition-all duration-300"
              :class="{ darkened: hoveredGender && hoveredGender !== 'female' }"
              @mouseenter="hoveredGender = 'female'"
              @mouseleave="hoveredGender = null"
          >
            <div class="text-center px-4">
              <h2 class="text-xl md:text-2xl font-bold mb-4">Female</h2>
              <NuxtImg
                  class="transition-transform"
                  :src="femaleImage"
                  width="238"
                  height="342"
                  quality="50"
                  :class="{ zoom: hoveredGender === 'female' }"
                  @click="selectGender('female')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import {ref} from 'vue'
import {useUserStore} from '~/stores/user.js'

const userStore = useUserStore()
const visible = ref(true)
const selectedGender = ref(null)
const hoveredGender = ref(null)

// Only static images are used
const maleImage = '/images/male/boy_h.png'
const femaleImage = '/images/female/girl_h.png'

const selectGender = (gender) => {
  selectedGender.value = gender
  visible.value = false
}

const handleAfterLeave = () => {
  userStore.setGender(selectedGender.value)
}
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

/* Dark overlay effect */
.darkened {
  filter: brightness(50%);
}

/* Zoom effect on hover */
.zoom {
  transform: scale(1.3);
  transition: transform 0.3s ease;
}

/* Mobile first: trapezoids as top and bottom */
/* First trapezoid (blue) appears at the top */
.trapezoid-first {
  clip-path: polygon(0 0, 100% 0, 100% 40%, 0 50%);
}

/* Second trapezoid (pink) appears at the bottom */
.trapezoid-second {
  clip-path: polygon(0 50%, 100% 40%, 100% 100%, 0 100%);
}

/* On desktop (md and above): revert to left/right trapezoids */
@media (min-width: 768px) {
  .trapezoid-first {
    clip-path: polygon(0 0, 60% 0, 40% 100%, 0 100%);
  }

  .trapezoid-second {
    clip-path: polygon(60% 0, 100% 0, 100% 100%, 40% 100%);
  }
}
</style>
