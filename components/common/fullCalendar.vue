<template>
  <div class="min-h-screen flex items-center justify-center sm:px-6 lg:px-8">
    <!-- Calendar container: full width on mobile, limited width on larger screens -->
    <div class="w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden p-4 border bg-white dark:border-gray-700 dark:bg-gray-600">
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
import {calculateSafePeriodEvents} from '~/utils/safePeriod' // adjust the import path as needed

const userStore = useUserStore()
const {locale, t} = useI18n()

// userStore.events should be an array of first-day date strings (e.g., ['2025-03-14']).
const firstDayDates = computed(() => Array.isArray(userStore.events) ? userStore.events : [])

// Generate events based on the safe period calculation.
const safePeriodEvents = computed(() => calculateSafePeriodEvents(firstDayDates.value, t))

// Use safePeriodEvents as the calendar events.
const calendarEvents = computed(() => {
  return safePeriodEvents.value.length > 0 ? safePeriodEvents.value : []
})

// Update the events array when a date is clicked.
function handleDateClick(info: { dateStr: string }) {
  console.log("Date clicked:", info.dateStr)
  // Append the clicked date to the existing events array.
  const currentEvents = Array.isArray(userStore.events) ? userStore.events : []
  const updatedEvents = [...currentEvents, info.dateStr]
  userStore.setEvents(updatedEvents)
}

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
/* Override FullCalendar header styles in dark mode */
:global(.dark .fc .fc-col-header) {
  background-color: #2d3748 !important;
  color: #e2e8f0 !important;
}

:global(.dark .fc .fc-col-header-cell) {
  background-color: #2d3748 !important;
  color: #e2e8f0 !important;
}
</style>
