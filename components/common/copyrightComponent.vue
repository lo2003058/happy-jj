<template>
  <div class="m-2 flex justify-center">
    <span class="text-sm text-gray-500 text-center dark:text-darkGreen">
      &copy; {{ moment().year() }} Copyright
      <a href="https://github.com/lo2003058" class="hover:underline">
        lo2003058
      </a>
      <br />
      <span>Developed with Nuxt.js + Tailwind CSS</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
</script>
