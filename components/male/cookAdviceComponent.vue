<template>
    <UButton label="Open" @click="isOpen = true"/>



    <UModal v-model="isOpen">
      <div class="p-4">
        <div class="h-48"/>
      </div>
    </UModal>
</template>

<script setup lang="ts">
const isOpen = ref(false)
</script>
<style scoped>

</style>
