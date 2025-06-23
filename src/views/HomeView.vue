<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn size="x-large" ripple @click="redirect('/recipe/management')">修改合成表</v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn size="x-large" ripple @click="redirect('/recipe/query')">查询配方</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
function redirect(path: string) {
  router.push(path);
}
</script>

<style>
</style>
