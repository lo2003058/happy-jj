<template>
  <UFormGroup label="Gender" class="my-2">
    <UToggle
        size="xl"
        name="gender"
        v-model="isMale"
        :ui="{
        active: 'bg-pink-400 dark:bg-pink-700',
        inactive: 'bg-blue-400 dark:bg-blue-700'
      }"
    />
  </UFormGroup>
</template>

<script setup lang="ts">
import {ref, computed, watch} from 'vue'
import {useUserStore} from '~/stores/user.js'

const userStore = useUserStore()
const gender = ref(userStore.gender || 'male')

const isMale = computed<boolean>({
  get() {
    return gender.value === 'male'
  },
  set(val: boolean) {
    gender.value = val ? 'male' : 'female'
  }
})

// Update state whenever the toggle value changes
watch(isMale, (newVal) => {
  userStore.setGender(newVal ? 'male' : 'female')
})
</script>
