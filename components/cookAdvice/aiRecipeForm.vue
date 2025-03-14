<template>
  <div class="flex flex-col space-y-4">
    <!-- Foods to Avoid Input -->
    <UFormGroup size="xl" :label="t('cookAdvice.food2Avoid.title')">
      <UInput
          v-model="foods2AvoidInput"
          :placeholder="t('cookAdvice.food2Avoid.placeholder')"
          icon="i-heroicons-x-circle"
          :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #trailing>
          <UButton
              color="gray"
              icon="i-heroicons-arrow-right-solid"
              variant="link"
              :padded="false"
              :disabled="foods2Avoid.length >= 10"
              @click="handleAddFoods2Avoid"
          />
        </template>
      </UInput>
    </UFormGroup>

    <!-- Foods to Avoid List -->
    <div class="border rounded-lg p-2 bg-white dark:bg-gray-800">
      <div class="flex flex-wrap gap-2">
        <div class="min-h-16">
          <UBadge
              color="gray"
              class="m-1 select-none"
              v-for="(food, index) in foods2Avoid"
              :key="index"
              :label="food"
          >
            <template #trailing>
              <UButton
                  class="ml-1"
                  variant="link"
                  icon="i-heroicons-x-mark"
                  :padded="false"
                  @click.stop="handleDeleteFoods2Avoid(food)"
              />
            </template>
          </UBadge>
        </div>
      </div>
    </div>

    <!-- Favorite Food Input -->
    <UFormGroup size="xl" :label="t('cookAdvice.favorite.title')">
      <UInput
          v-model="favoriteFoodInput"
          :placeholder="t('cookAdvice.favorite.placeholder')"
          icon="i-heroicons-check-circle"
          :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #trailing>
          <UButton
              color="gray"
              icon="i-heroicons-arrow-right-solid"
              variant="link"
              :padded="false"
              :disabled="favoriteFood.length >= 10"
              @click="handleAddFavoriteFood"
          />
        </template>
      </UInput>
    </UFormGroup>

    <!-- Favorite Food List -->
    <div class="border rounded-lg p-2 bg-white dark:bg-gray-800">
      <div class="flex flex-wrap gap-2">
        <div class="min-h-16">
          <UBadge
              :color="isSelected(food) ? 'green' : 'gray'"
              class="m-1 cursor-pointer"
              v-for="(food, index) in favoriteFood"
              :key="index"
              :label="food"
              @click="toggleFavorite(food)"
              :class="{'hover:bg-gray-200 dark:hover:bg-gray-600': !isSelected(food)}"
          >
            <template #trailing>
              <UButton
                  class="ml-2"
                  icon="i-heroicons-x-mark"
                  variant="link"
                  :padded="false"
                  @click.stop="handleDeleteFavoriteFood(food)"
              />
            </template>
          </UBadge>
        </div>
      </div>
    </div>

    <!-- Recipe Type -->
    <UFormGroup size="xl" :label="t('cookAdvice.recipeType.title')">
      <UDropdown
          v-model="recipeType"
          :items="[recipeTypeList]"
          :popper="{ placement: 'bottom-start' }"
          class="w-full"
      >
        <UButton
            size="xl"
            color="gray"
            class="w-full justify-between text-left dark:bg-gray-900 hover:dark:bg-gray-800"
            trailing-icon="i-heroicons-chevron-down-20-solid"
        >
      <span class="truncate">
        {{ recipeType || t('cookAdvice.recipeType.all') }}
      </span>
        </UButton>
        <template #item="{ item }">
          <div
              class="flex items-center justify-between w-full cursor-pointer py-2 px-3"
              @click="setRecipeType(item.label)"
          >
            <span class="truncate text-sm">{{ item.label }}</span>
          </div>
        </template>
      </UDropdown>
    </UFormGroup>

    <!-- Difficulty level-->
    <UFormGroup size="xl" :label="t('difficulty.title')">
      <UDropdown
          v-model="recipeDifficulty"
          :items="[recipeDifficultyList]"
          :popper="{ placement: 'bottom-start' }"
          class="w-full"
      >
        <UButton
            size="xl"
            color="gray"
            class="w-full justify-between text-left dark:bg-gray-900 hover:dark:bg-gray-800"
            trailing-icon="i-heroicons-chevron-down-20-solid"
        >
      <span class="truncate">
        {{ recipeDifficulty || t('difficulty.all') }}
      </span>
        </UButton>
        <template #item="{ item }">
          <div
              class="flex items-center justify-between w-full cursor-pointer py-2 px-3"
              @click="setRecipeDifficulty(item.label)"
          >
            <span class="truncate text-sm">{{ item.label }}</span>
          </div>
        </template>
      </UDropdown>
    </UFormGroup>

    <UFormGroup size="xl" :label="t('time.title')">
      <UDropdown
          v-model="timeType"
          :items="[timeTypeList]"
          :popper="{ placement: 'bottom-start' }"
          class="w-full"
      >
        <UButton
            size="xl"
            color="gray"
            class="w-full justify-between text-left dark:bg-gray-900 hover:dark:bg-gray-800"
            trailing-icon="i-heroicons-chevron-down-20-solid"
        >
      <span class="truncate">
        {{ timeType || t('time.all') }}
      </span>
        </UButton>
        <template #item="{ item }">
          <div
              class="flex items-center justify-between w-full cursor-pointer py-2 px-3"
              @click="setTimeType(item.label)"
          >
            <span class="truncate text-sm">{{ item.label }}</span>
          </div>
        </template>
      </UDropdown>
    </UFormGroup>
  </div>

  <div class="grid grid-cols-2 gap-2 mt-4">
    <UButton
        color="red"
        size="lg"
        class="w-full"
        @click="clearAllData"
        :loading="loading"
    >
      {{ t('cookAdvice.button.clearAll') }}
    </UButton>
    <UButton
        color="orange"
        size="lg"
        class="w-full"
        @click="fetchGenerateRecipe"
        :loading="loading"
    >
      {{ t('cookAdvice.button.generateRecipe') }}
    </UButton>
  </div>

</template>

<script setup>
import {ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {useUserStore} from '~/stores/user'
import {getRecipeDifficultyList, getRecipeTypeList, getTimeTypeList} from '~/config/recipe'

const userStore = useUserStore()
const {t, locale} = useI18n()
const toast = useToast()

// Initialize lists from the store (or empty array if not set)
const foods2Avoid = ref(userStore.foods2AvoidList || [])
const favoriteFood = ref(userStore.favoriteFoodList || [])

// Input models for new food entries
const foods2AvoidInput = ref('')
const favoriteFoodInput = ref('')

const loading = ref(false)

// For toggling selected favorite food, maximum limit is 5
const selectedFavoriteFoodList = ref([])

const defaultRecipeType = t('cookAdvice.recipeType.all')
const defaultRecipeDifficulty = t('difficulty.all')
const defaultTimeType = t('time.all')

// Recipe type
const recipeType = ref(defaultRecipeType)
const recipeDifficulty = ref(defaultRecipeDifficulty)
const timeType = ref(defaultTimeType)

// Get the recipe type list using the translation function.
const recipeTypeList = computed(() => getRecipeTypeList(t) || [])
const recipeDifficultyList = computed(() => getRecipeDifficultyList(t) || [])
const timeTypeList = computed(() => getTimeTypeList(t) || [])

const generateRecipe = defineEmits(['updateGenerateRecipe']);

// Add food to the "foods2Avoid" list
function handleAddFoods2Avoid() {
  if (foods2Avoid.value.length >= 10) return // Prevent adding if at limit
  const food = foods2AvoidInput.value.trim()
  if (food && !foods2Avoid.value.includes(food)) {
    foods2Avoid.value.push(food)
    userStore.setFoods2AvoidList(foods2Avoid.value)
    toast.add({
      title: t('cookAdvice.foodAdded'),
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 3000,
    })
    foods2AvoidInput.value = ''
  }
}

// Add food to the "favoriteFood" list
function handleAddFavoriteFood() {
  if (favoriteFood.value.length >= 10) return // Prevent adding if at limit
  const food = favoriteFoodInput.value.trim()
  if (food && !favoriteFood.value.includes(food)) {
    favoriteFood.value.push(food)
    userStore.setFavoriteFoodList(favoriteFood.value)
    toast.add({
      title: t('cookAdvice.foodAdded'),
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 3000,
    })
    favoriteFoodInput.value = ''
  }
}

// Delete food from the "foods2Avoid" list
function handleDeleteFoods2Avoid(food) {
  const index = foods2Avoid.value.indexOf(food)
  if (index !== -1) {
    foods2Avoid.value.splice(index, 1)
    userStore.setFoods2AvoidList(foods2Avoid.value)
    toast.add({
      title: t('cookAdvice.foodDeleted'),
      icon: 'i-heroicons-x-mark-circle',
      color: 'red',
      timeout: 3000,
    })
  }
}

// Delete food from the "favoriteFood" list
function handleDeleteFavoriteFood(food) {
  const index = favoriteFood.value.indexOf(food)
  if (index !== -1) {
    favoriteFood.value.splice(index, 1)
    userStore.setFavoriteFoodList(favoriteFood.value)
    // Also remove it from the selection if it's selected.
    selectedFavoriteFoodList.value = selectedFavoriteFoodList.value.filter(f => f !== food)
    toast.add({
      title: t('cookAdvice.foodDeleted'),
      icon: 'i-heroicons-x-mark-circle',
      color: 'red',
      timeout: 3000,
    })
  }
}

// Toggle selection on badge click. Maximum selection is 5.
function toggleFavorite(food) {
  const maxSelected = 5
  if (isSelected(food)) {
    selectedFavoriteFoodList.value = selectedFavoriteFoodList.value.filter(f => f !== food)
  } else {
    if (selectedFavoriteFoodList.value.length < maxSelected) {
      selectedFavoriteFoodList.value.push(food)
    } else {
      toast.add({
        title: t('cookAdvice.maxSelected', {count: maxSelected}),
        icon: 'i-heroicons-exclamation-triangle',
        color: 'red',
        timeout: 3000,
      })
    }
  }
}

function isSelected(food) {
  return selectedFavoriteFoodList.value.includes(food)
}

function setRecipeType(value) {
  recipeType.value = value
}

function setRecipeDifficulty(value) {
  recipeDifficulty.value = value
}

function setTimeType(value) {
  timeType.value = value
}

function clearAllData() {
  selectedFavoriteFoodList.value = []
  recipeType.value = defaultRecipeType
}

async function fetchGenerateRecipe() {
  loading.value = true;
  try {
    const data = await $fetch('/api/openai', {
      method: 'POST',
      body: {
        aiApiEndpointModel: userStore.aiApiEndpointModel,
        aiApiEndpoint: userStore.aiApiEndpoint,
        aiApiSecret: userStore.aiApiSecret,
        locale: locale.value,
        foods2Avoid: foods2Avoid.value,
        favoriteFood: selectedFavoriteFoodList.value,
        recipeType: recipeType.value,
        recipeDifficulty: recipeDifficulty.value,
        timeType: timeType.value,
      },
    });

    // Check if data is returned and log the complete reply.
    if (data && data.choices && data.choices.length > 0) {
      const recipe = JSON.parse(data.choices[0].message.content);
      recipe.type = 'new';
      generateRecipe('updateGenerateRecipe', recipe);
    }
  } catch (err) {
    console.log("err:", err);
    toast.add({
      title: t('cookAdvice.apiError'),
      icon: 'i-heroicons-x-mark-20-solid',
      color: 'red',
      timeout: 3000,
    });
  } finally {
    loading.value = false;
  }
}


</script>
