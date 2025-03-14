<template>
  <UFormGroup :label="t('aiApiEndpointModel.title')" class="my-2">
    <UInput v-model="aiApiEndpointModel" @blur="saveAiApiEndpointModel"/>
  </UFormGroup>

  <UFormGroup :label="t('aiApiEndpoint.title')" class="my-2">
    <UInput v-model="aiApiEndpoint" @blur="saveAiApiEndpoint"/>
  </UFormGroup>

  <UFormGroup :label="t('aiApiSecret.title')" class="my-2">
    <UInput
        type="password"
        v-model="aiApiSecret"
        @blur="saveAiApiSecret"
    />
  </UFormGroup>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {useUserStore} from '~/stores/user'

const {t} = useI18n()
const userStore = useUserStore()

// Initialize from store or default to empty string
const aiApiEndpoint = ref(userStore.aiApiEndpoint || '')
const aiApiSecret = ref(userStore.aiApiSecret || '')
const aiApiEndpointModel = ref(userStore.aiApiEndpointModel || '')

// Use your toast composable (make sure it's set up in your project)
const toast = useToast()

// Save function triggered when input loses focus
function saveAiApiEndpoint() {
  userStore.setAiApiEndpoint(aiApiEndpoint.value)
  toast.add({
    title: t('aiApiEndpoint.updated'),
    timeout: 1500,
  })
}

function saveAiApiSecret() {
  userStore.setAiApiSecret(aiApiSecret.value)
  toast.add({
    title: t('aiApiSecret.updated'),
    timeout: 1500,
  })
}

function saveAiApiEndpointModel() {
  userStore.setAiApiEndpointModel(aiApiEndpointModel.value)
  toast.add({
    title: t('aiApiEndpointModel.updated'),
    timeout: 1500,
  })
}
</script>
