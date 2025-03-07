<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-4xl shadow-lg rounded-lg">
      <FullCalendar :options="calendarOptions"/>
    </div>
  </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

// Function to handle a date click event
function handleDateClick(info) {
  alert(`Date clicked: ${info.dateStr}`)
}

// Define calendar options, including color styling on events
const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next',
    center: 'title',
    right: 'today'
  },
  events: [
    {
      title: 'Meeting',
      date: '2025-03-01',
      backgroundColor: '#ff9f89', // Light red background
      borderColor: '#ff9f89'
    },
    {
      title: 'Conference',
      date: '2025-03-07',
      backgroundColor: '#87cefa', // Light blue background
      borderColor: '#87cefa'
    },
    {
      title: 'Lunch',
      date: '2025-03-10',
      backgroundColor: '#90ee90', // Light green background
      borderColor: '#90ee90'
    }
  ],
  dateClick: handleDateClick
}
</script>
