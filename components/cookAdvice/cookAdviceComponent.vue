<template>
  <div
      class="relative cursor-pointer border rounded-2xl h-32 w-full overflow-hidden"
      @click="isModalOpen = true"
  >
    <NuxtImg
        class="absolute inset-0 filter blur-sm rounded-2xl object-cover object-center"
        src="/images/recipe_thumbnail.webp"
        quality="70"
    />
    <div class="absolute inset-0 flex items-center justify-center">
      <span class="bg-black bg-opacity-50 text-white px-4 py-2 rounded-2xl text-lg font-bold">
        {{ t('cookAdvice.title') }}
      </span>
    </div>
  </div>

  <UModal
      v-model="isModalOpen"
      :ui="{
      container: 'flex flex-col h-auto',
      width: 'sm:max-w-7xl'
    }"
      :transition="true"
  >
    <div class="p-4 overflow-auto h-[85vh] scrollbar-hide">
      <div class="flex items-center justify-between p-2">
        <p class="text-2xl font-bold text-gray-600 dark:text-gray-300 p-2">
          {{ t(!useAI ? 'cookAdvice.title' : 'cookAdvice.aiRecipeTitle') }}
        </p>
        <div class="flex items-center space-x-2">
          <span class="text-md font-bold text-gray-600 dark:text-gray-300">
            {{ t('cookAdvice.useAi') }}
          </span>
          <UToggle
              v-model="useAI"
              :disabled="!userStore.aiApiEndpoint || !userStore.aiApiSecret || !userStore.aiApiEndpointModel"
              on-icon="i-heroicons-check-20-solid"
              off-icon="i-heroicons-x-mark-20-solid"
          />
        </div>
      </div>

      <!-- Responsive grid: 1 column on mobile, 2 columns when AI is off, 3 when on -->
      <div :class="useAI ? 'grid grid-cols-1 sm:grid-cols-3 gap-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'">
        <!-- AI Receipt (only when useAI is true) -->
        <div v-if="useAI" class="sm:h-[75vh] h-auto max-h-[75vh]">
          <div class="border rounded-lg p-4 bg-white dark:bg-gray-700 h-full overflow-y-auto scrollbar-hide">
            <AiRecipeForm
                @updateGenerateRecipe="handleUpdateGenerateRecipe"
            />
          </div>
        </div>

        <!-- Recipe Detail -->
        <div class="sm:h-[75vh] h-auto max-h-[75vh]">
          <div
              v-if="selectedRecipe"
              class="border rounded-lg p-4 bg-white dark:bg-gray-700 h-full overflow-y-auto scrollbar-hide"
          >
            <h2 class="text-2xl font-bold mb-4">{{ selectedRecipe.name }}</h2>
            <div class="mb-6">
              <h3 class="font-semibold text-xl mb-3 border-b pb-2">
                {{ t('cookAdvice.ingredients') }}:
              </h3>
              <ul class="list-disc pl-5 space-y-2">
                <li v-for="(ingredient, index) in selectedRecipe.ingredients" :key="index">
                  {{ ingredient.name }}: {{ ingredient.quantity }} {{ ingredient.unit }}
                </li>
              </ul>
            </div>
            <div class="mb-6">
              <h3 class="font-semibold text-xl mb-3 border-b pb-2">
                {{ t('cookAdvice.steps') }}:
              </h3>
              <ol class="list-decimal pl-5 space-y-3">
                <li v-for="(step, index) in selectedRecipe.steps" :key="index">
                  {{ step }}
                </li>
              </ol>
            </div>

            <UButton
                v-if="selectedRecipe.type && selectedRecipe.type === 'new'"
                block
                @click="handleStoreRecipe(selectedRecipe)"
            >
              {{ t('cookAdvice.button.storeRecipe') }}
            </UButton>

          </div>
          <div
              v-else
              class="h-full flex items-center justify-center border rounded-lg p-8 bg-white dark:bg-gray-700"
          >
            <p class="text-lg text-gray-600 dark:text-gray-300">
              {{ t('cookAdvice.notSelect') }}
            </p>
          </div>
        </div>

        <!-- Recipe List -->
        <div v-if="recipes.length > 0">
          <ul class="space-y-3 overflow-y-auto max-h-[75vh] scrollbar-hide">
            <!-- Loop through each recipe in the current group -->
            <li
                v-for="(recipe, recipeIndex) in recipes[0]?.items || []"
                :key="recipeIndex"
                class="cursor-pointer border rounded-lg p-3 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                :class="{'border-blue-500 border-2': selectedRecipe && selectedRecipe.name === recipe.name}"
                @click="selectRecipe(recipe)"
            >
              <div class="flex justify-between items-center">
                <p class="text-lg font-semibold">{{ recipe.name }}</p>
                <button
                    v-if="useAI"
                    @click.stop="deleteRecipe(recipe)"
                    class="text-red-500 hover:text-red-600 focus:outline-none"
                    title="Delete Recipe"
                >
                  <!-- x mark icon (using inline SVG from Heroicons) -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300 my-2">
                {{ t('cookAdvice.difficulty') }}:
                <span class="capitalize">{{ t(`difficulty.${recipe.difficulty}`) }}</span>
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300 my-2">
                {{ t('cookAdvice.time') }}: {{ recipe.time.time }} {{ t(`time.unit.${recipe.time.unit}`) }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300 my-2">
                {{ t('cookAdvice.tags') }}:
                <span v-for="(tag, tagIndex) in recipe.tags" :key="tagIndex" class="inline-block m-1">
                  <UBadge :label="tag"/>
                </span>
              </p>
            </li>

          </ul>
        </div>
        <div v-else class="flex flex-col items-center justify-center p-4 border rounded-lg bg-white dark:bg-gray-700">
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {{ t('cookAdvice.noRecipe') }}
          </p>
        </div>

      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import {ref, computed, watch} from 'vue'
import {useI18n} from 'vue-i18n'
import recipeList from '~/config/recipe'
import {useUserStore} from '~/stores/user.js'
import AiRecipeForm from "~/components/cookAdvice/aiRecipeForm.vue"; // Adjust the path as needed

const {locale, t} = useI18n()
const useAI = ref(false)
const userStore = useUserStore()

const toast = useToast()

// Compute recipes based on the current selection.
// If useAI is true, wrap userStore.recipes in an object with an items' property.
const recipes = computed(() => {
  if (useAI.value) {
    return userStore.recipes && userStore.recipes.length ? [{items: userStore.recipes}] : []
  } else {
    const lang = locale.value
    const group = recipeList.find(r => r.language === lang)
    return group ? [group] : []
  }
})

const isModalOpen = ref(false)
const selectedRecipe = ref(null)

// When a recipe is clicked, set it as the selected recipe.
function selectRecipe(recipe) {
  selectedRecipe.value = recipe
}

function handleUpdateGenerateRecipe(payload) {
  selectedRecipe.value = payload;
}

function handleStoreRecipe(recipe) {
  const recipes = userStore.recipes || [];
  delete recipe.type;
  recipes.unshift(recipe);
  userStore.setRecipes(recipes);
  selectedRecipe.value = null;
  toast.add({
    title: t('cookAdvice.recipeStored'),
    timeout: 1500,
  });
}

function deleteRecipe(recipeIndex) {
  // Delete the recipe from the user store
  // the format like recipes
  const recipes = userStore.recipes || [];
  recipes.splice(recipeIndex, 1);
  userStore.setRecipes(recipes);
  toast.add({
    title: t('cookAdvice.recipeDeleted'),
    timeout: 1500,
  });
}

// Reset selectedRecipe when useAI changes.
watch(useAI, (value) => {
  selectedRecipe.value = null
})
</script>

<style scoped>
/* Hide scrollbar on elements with the scrollbar-hide class */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
