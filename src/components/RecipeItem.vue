<template>
  <h2>
    <img :src="getIconUrl(recipe.output.name)" alt="" style="width: 1.5em; height: 1.5em; vertical-align: middle;" />
    <span>{{ recipe.output.name }} x {{ recipe.output.amount }}</span>
    <slot name="afterOutput" :recipe="recipe"/>
  </h2>
  <ul>
    <li v-for="item in recipe.input" :key="item.name">
      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <img :src="getIconUrl(item.name)" alt="" style="width: 1.5em; height: 1.5em; vertical-align: middle;" />
      <span>{{ item.name }} x {{ item.amount }}</span>
      <slot name="afterInput" :inputName="item.name" :recipe="recipe"/>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { getIconUrl } from "@/icons.ts";
import type { Recipe } from "@/types.ts";

interface PropsType {
  recipe: Recipe;
}

// 展示在列表项后的html
defineSlots<{
  afterOutput: (props: { recipe: Recipe }) => any;
  afterInput: (props: { inputName: string, recipe: Recipe }) => any;
}>();

const { recipe } = defineProps<PropsType>();
</script>

<style scoped>

</style>