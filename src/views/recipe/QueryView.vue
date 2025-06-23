<template>
  <div class="container">
    <!-- 配方查询 -->
    <v-form class="query">
      <v-row>
        <v-col cols="12" md="8">
          <v-autocomplete
              v-model="hold"
              variant="outlined"
              :label="isOut ? '我要合成' : '我有的材料'"
              clearable
              :items="isOut ? allOutput : allInput"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn-toggle v-model="isOut" label="模式" mandatory>
            <v-btn :value="true">怎么合成</v-btn>
            <v-btn :value="false">可以合成</v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn width="100%" size="x-large" @click="search">查询</v-btn>
        </v-col>
      </v-row>
      <v-row style="margin-top: -24px">
        <v-col cols="12" md="6">
          <v-autocomplete
              v-model="lack"
              variant="outlined"
              label="我没有的材料"
              multiple
              clearable
              :items="allInput"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-autocomplete
              v-model="remove"
              variant="outlined"
              label="我不要合成"
              multiple
              clearable
              :items="allOutput"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-form>
    <!-- 数据展示 -->
    <div class="recipes">
      <v-virtual-scroll :items="filtered" item-key="id">
        <template v-slot:default="{ item: recipe }">
          <recipe-item :recipe="recipe">
            <template #afterInput="{ inputName, recipe }">
              <v-btn
                  style="margin-left: 1em"
                  icon="mdi-close"
                  size="x-small"
                  @click="addLack(inputName)"
              ></v-btn>
            </template>
            <template #afterOutput="{ recipe }">
              <v-btn
                  style="margin-left: 1em"
                  icon="mdi-arrow-right-thick"
                  size="x-small"
                  @click="searchHowToCraft(recipe.output.name)"
              ></v-btn>
              <v-btn
                  style="margin-left: 1em"
                  icon="mdi-close"
                  size="x-small"
                  @click="addRemove(recipe.output.name)"
              ></v-btn>
            </template>
          </recipe-item>
        </template>
      </v-virtual-scroll>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import RecipeItem from "@/components/RecipeItem.vue";
import { useRecipeStore } from "@/store/recipe-store.ts";
import type { Recipe } from "@/types.ts";

const recipeStore = useRecipeStore()
const allInput = computed(() => recipeStore.allInput)
const allOutput = computed(() => recipeStore.allOutput)
const filtered = ref<Recipe[]>([]);

// true -> 怎么合成 xxx
const isOut = ref(false);
const hold = ref('');
const lack = ref<string[]>([]);
const remove = ref<string[]>([]);

function search() {
  getFiltered().then(recipes => {
    filtered.value = recipes;
  });
}

async function getFiltered(): Promise<Recipe[]> {
  const search = hold.value;
  const hasSearch = search && search.trim().length > 0;
  let temp = recipeStore.recipes;
  // 关键字搜索
  if (hasSearch) {
    if (isOut.value) {
      temp = temp.filter(recipe => recipe.output.name === search);
    } else {
      temp = temp.filter(recipe => recipe.input.some(i => i.name === search));
    }
  }
  // 移除过滤
  const removeList = remove.value;
  if (removeList.length > 0) {
    temp = temp.filter(recipe => !removeList.includes(recipe.output.name));
  }
  // 缺少材料过滤
  const lackList = lack.value;
  if (lackList.length > 0) {
    temp = temp.filter(recipe => recipe.input.every(i => !lackList.includes(i.name)));
  }
  return temp
}

function addLack(inputName: string) {
  if (!lack.value.includes(inputName)) {
    lack.value.push(inputName);
    search();
  }
}

function searchHowToCraft(outputName: string) {
  hold.value = outputName;
  isOut.value = true;
  search();
}

function addRemove(outputName: string) {
  if (!remove.value.includes(outputName)) {
    remove.value.push(outputName);
    search();
  }
}

onMounted(search)
</script>

<style>
.container {
  min-width: 30em;
  width: 100%;
  padding: 1em;
}

.query {
  width: 100%;
  justify-content: space-between;
  align-items: center;

  v-row {
    display: flex;
  }
}

.recipes {
  max-height: 50em;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
