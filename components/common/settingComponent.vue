<template>
  <div class="relative">
    <!-- Top-right settings button -->
    <div class="absolute top-4 right-4 z-20">
      <UButton
          icon="i-heroicons-cog-6-tooth-solid"
          size="md"
          color="gray"
          variant="solid"
          @click="isOpen = true"
      />
    </div>

    <!-- Settings panel using USlideover -->
    <USlideover v-model="isOpen" :transition="false">
      <div class="p-4 flex-1 relative">
        <!-- Close button positioned inside the panel -->
        <UButton
            color="gray"
            variant="ghost"
            size="md"
            icon="i-heroicons-x-mark-20-solid"
            class="absolute top-5 right-5 z-10"
            square
            padded
            @click="isOpen = false"
        />
        <!-- Panel content -->
        <div class="mt-12">
          <h2 class="text-xl font-bold mb-4">Settings</h2>
          <p class="text-gray-600">
            <GenderToggle/>
            <ThemeToggle/>
          </p>
        </div>
      </div>
    </USlideover>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import GenderToggle from "~/components/common/genderToggle.vue";
import ThemeToggle from "~/components/common/themeToggle.vue";

const isOpen = ref(false)


</script>

<style scoped>
/* No additional styles needed since Tailwind is used */
</style>
