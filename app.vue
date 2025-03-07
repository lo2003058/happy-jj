<template>
  <GenderSelection v-if="!userStore.gender"/>

  <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 py-4">
    <FullCalendar/>
  </div>
</template>

<script setup>
import FullCalendar from "~/components/fullCalendar";
import GenderSelection from '~/components/genderSelection'
import {useUserStore} from '~/stores/user'

const userStore = useUserStore()

</script>
