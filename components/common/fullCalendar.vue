<template>
  <div class="min-h-screen flex items-center justify-center sm:px-6 lg:px-8">
    <div
        class="w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden p-4 border bg-white dark:border-gray-700 dark:bg-gray-600">
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
import {calculateSafePeriodEvents} from '~/utils/safePeriod'
import moment from 'moment'

// Use your toast composable
const toast = useToast()

const userStore = useUserStore()
const {locale, t} = useI18n()

// userStore.events should be an array of first-day menstruation date strings.
const firstDayDates = computed(() => Array.isArray(userStore.events) ? userStore.events : [])

// Generate events based on the safe period calculation.
const safePeriodEvents = computed(() => calculateSafePeriodEvents(firstDayDates.value, t))

// Use safePeriodEvents as the calendar events.
const calendarEvents = computed(() => safePeriodEvents.value)

// When a date is clicked, if the date exists remove it; if not, check the day difference (< 20 days) before adding.
function handleDateClick(info: { dateStr: string }) {
  const currentEvents = Array.isArray(userStore.events) ? userStore.events : []

  // If the date already exists, remove it.
  if (currentEvents.includes(info.dateStr)) {
    const updatedEvents = currentEvents.filter(date => date !== info.dateStr)
    userStore.setEvents(updatedEvents)
    toast.add({
      title: t('dateRemoved'),
      icon: 'i-heroicons-x-mark',
      color: 'red',
      timeout: 3000,
    })
    return;
  }

  // Check if the new date is at least 26 days apart from all existing dates.
  const selectedDate = moment(info.dateStr, 'YYYY-MM-DD')
  const conflict = currentEvents.some(dateStr => {
    const existingDate = moment(dateStr, 'YYYY-MM-DD')
    const diff = Math.abs(existingDate.diff(selectedDate, 'days'))
    return diff < 26;
  })

  if (conflict) {
    toast.add({
      title: t('dateConflict'),
      description: t('dateConflictDescription', {days: 26}),
      icon: 'i-heroicons-exclamation-triangle',
      color: 'red',
      timeout: 3000,
    })
    return;
  }

  // If no conflict, add the new date.
  const updatedEvents = [...currentEvents, info.dateStr]
  userStore.setEvents(updatedEvents)
  toast.add({
    title: t('dateAdded'),
    icon: 'i-heroicons-check',
    color: 'green',
    timeout: 3000,
  })
}

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  height: 'auto',
  locale: locale.value,
  editable: false,
  events: calendarEvents.value,
  dateClick: handleDateClick,
  buttonText: {
    today: t('fullcalendar.today'),
  }
}))
</script>

<style scoped>
:global(.dark .fc .fc-col-header) {
  background-color: #2d3748 !important;
  color: #e2e8f0 !important;
}

:global(.dark .fc .fc-col-header-cell) {
  background-color: #2d3748 !important;
  color: #e2e8f0 !important;
}
</style>
