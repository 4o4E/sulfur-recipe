<template>
  <div class="row">
    <v-textarea
        class="textarea"
        label="输入wiki复制的配方"
        variant="outlined"
        auto-grow
        max-rows="30"
        v-model="recipe"
    />
  </div>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn prepend-icon="mdi-content-save-outline" size="x-large" ripple @click="saveRecipe">保存</v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn prepend-icon="mdi-cancel" size="x-large" ripple @click="recipe = ''">清空</v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn prepend-icon="mdi-cancel" size="x-large" ripple @click="cancel">取消</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import defaultRecipes from "@/assets/recipes.txt?raw";
import { ref } from "vue";
import type { RecipeItem } from "@/types.ts";
import { useRouter } from "vue-router";
import { useMessagesStore } from "@/store/message.ts";
import { useRecipeStore } from "@/store/recipe-store.ts";

const recipe = ref(localStorage.getItem('row-recipes') ?? defaultRecipes)
const itemRegex = /(?<amount>\d+)\s*(?<name>[^\\d]+)/i;

function parseItem(input: string): RecipeItem | null {
  const match = itemRegex.exec(input);
  if (!match) return null;
  return {
    name: match.groups?.name.trim() || '',
    amount: parseInt(match.groups?.amount || '1')
  };
}

const messages = useMessagesStore()
const recipeStore = useRecipeStore()
function saveRecipe() {
  const recipes = recipe.value
      .split("\n")
      .filter(e => e.includes("="))
      .map((e, index) => {
        const [output, input] = e.split("=")
        const out = parseItem(output);
        if (!out) return null;
        const ins = input.split("+").map(parseItem).filter(e => e != null);
        return {
          id: index,
          input: ins,
          output: out
        }
      })
      .filter(e => e != null)
      .filter(e => !e.input.some(e => e.name.length === 0));
  recipeStore.setRecipes(recipes, recipe.value)
  messages.add({ text: '已保存', color: 'success' })
}

const router = useRouter();
function cancel() {
  router.back();
}
</script>

<style scoped>
.row {
  padding: 1em;
  .textarea {
    max-height: 80vh;
  }
}
</style>