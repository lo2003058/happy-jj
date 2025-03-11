<template>
  <div class="relative">
    <!-- Top-right settings button -->
    <div class="absolute top-4 left-4">
      <UButton
          icon="i-heroicons-wrench-screwdriver-solid"
          size="md"
          color="gray"
          variant="solid"
          @click="isOpen = true"
      />
    </div>

    <USlideover
        v-model="isOpen"
        :transition="true"
        side="left"
    >
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
            <h2 class="text-xl font-bold">{{ t('tools') }}</h2>
          </template>

          <!-- Tools area -->
          <div class="flex-1 overflow-auto">

          </div>
        </UCard>

        <!-- Fixed footer with buttons and copyright -->
        <div class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4">
          <CopyrightComponent/>
        </div>
      </div>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch} from 'vue'
import {useI18n} from 'vue-i18n'
import {useUserStore} from '~/stores/user'
import CopyrightComponent from "~/components/common/copyrightComponent.vue";

const {t, locale, loadLocaleMessages} = useI18n()
const userStore = useUserStore()
const isOpen = ref(false)

const toast = useToast()

</script>

<style scoped>
/* No additional styles needed since Tailwind is used */
</style>
