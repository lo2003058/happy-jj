<template>
  <div class="min-h-screen flex items-center justify-center sm:px-6 lg:px-8">
    <!-- Calendar container: full width on mobile, limited width on larger screens -->
    <div class="w-full max-w-4xl shadow-lg rounded-lg overflow-hidden p-4 border dark:border-gray-700 dark:bg-gray-800">
      <FullCalendar :options="calendarOptions"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import {computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {useUserStore} from '~/stores/user'

const userStore = useUserStore()
const {locale} = useI18n()

// Create a computed property for events to ensure reactivity.
const calendarEvents = computed(() => userStore.events || [])

// Function to handle a date click event and update events in userStore.
function handleDateClick(info: { dateStr: string }) {
  const newEvent = {title: 'test Event', date: info.dateStr}
  userStore.setEvents([...calendarEvents.value, newEvent])
}

// Define calendar options as a computed property.
const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  height: 'auto', // adapts to container height
  locale: locale.value,
  editable: true,
  events: calendarEvents.value,
  dateClick: handleDateClick
}))
</script>

<style scoped>
/* Override FullCalendar header table background and text color in dark mode */
:global(.dark .fc .fc-col-header) {
  background-color: #2d3748 !important;
  color: #e2e8f0 !important;
}

:global(.dark .fc .fc-col-header-cell) {
  background-color: #2d3748 !important;
  color: #e2e8f0 !important;
}
</style>
