<template>
  <div class="container">
    <div class="left container-item">
      <h2>我有什么</h2>

      <v-form class="input-container">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="5">
            <v-autocomplete
                v-model="name"
                variant="outlined"
                label="查询材料或产物"
                :items="allInput"
            >
              <template v-slot:chip="{ props, item }">
                <v-chip
                    v-bind="props"
                >
                  <v-avatar size="large">
                    <div style="width: 30px; height: 30px">
                      <v-img :src="getIconUrl(item.value)" />
                    </div>
                  </v-avatar>

                  {{ item.value }}
                </v-chip>
              </template>
            </v-autocomplete>
          </v-col>

          <v-col cols="12" sm="4">
            <v-number-input
                variant="outlined"
                control-variant="stacked"
                :min="1"
                v-model="amount"
                @wheel="onWheel"
            />
          </v-col>

          <v-col cols="12" sm="3">
            <v-btn
                prepend-icon="mdi-plus"
                size="x-large"
                width="100%"
                ripple
                style="margin-bottom: 22px"
                @click="addToBackpack(name, amount)"
            >添加
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-list>
        <v-list-item
            v-for="item in backpack"
            :key="item.name"
        >
          <v-row align="center" justify="center" style="padding-left: 1em">
            <div style="width: 30px; height: 30px">
              <img :src="getIconUrl(item.name)" />
            </div>
            <v-card-text>{{ item.name }} x {{ item.amount }}</v-card-text>
          </v-row>
        </v-list-item>
      </v-list>
    </div>
    <div class="right container-item">
      <h2>我能合成什么</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRecipeStore } from "@/store/recipe-store.ts";
import type { Recipe, RecipeItem } from "@/types.ts";
import { getIconUrl } from "@/icons.ts";

const name = ref('');
const amount = ref(1);

function onWheel(event: WheelEvent) {
  event.preventDefault();
  const delta = event.deltaY < 0 ? 1 : -1;
  amount.value = Math.max(1, amount.value + delta);
}

const recipeStore = useRecipeStore()
const allInput = computed(() => recipeStore.allInput)

const backpack = ref<RecipeItem[]>([])

function addToBackpack(name: string, amount: number) {
  if (!name || amount <= 0) return;
  const existing = backpack.value.find(i => i.name === name);
  if (existing) {
    existing.amount += amount;
  } else {
    backpack.value.push({ name, amount });
  }
}

const matchRule: { [key: string]: (recipe: Recipe) => boolean} = {
  /**
   * 需要有材料且数量足够才匹配该配方
   */
  all(recipe: Recipe) {
    return recipe.input.every(input => {
      const item = backpack.value.find(i => i.name === input.name);
      return item && item.amount >= input.amount;
    });
  },
  /**
   * 有材料就匹配该配方
   */
  ignoreAmount(recipe: Recipe) {
    return recipe.input.every(input => {
      return !!backpack.value.find(i => i.name === input.name);
    });
  },
  /**
   * 缺一个材料也匹配该配方
   */
  lack1(recipe: Recipe) {
    return recipe.input.every(input => {
      return !!backpack.value.find(i => i.name === input.name);
    });
  },

}

const canCrafted = computed(() => {
  return recipeStore.recipes.filter(recipe => {
    return recipe.input.every(input => {
      const item = backpack.value.find(i => i.name === input.name);
      return item && item.amount >= input.amount;
    });
  });
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

.container-item {
  padding: 1rem;
  width: 47%;
}

.left {
  background-color: darkblue;
}

.right {
  background-color: darkgreen;
}
</style>