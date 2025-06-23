<template>
  <v-app>
    <app-drawer />
    <app-bar />
    <v-main>
      <router-view />
    </v-main>
    <v-snackbar-queue v-model="messages.queue" color="primary" :timeout="1000"></v-snackbar-queue>
  </v-app>
</template>

<script setup lang="ts">
import AppBar from "@/components/app/AppBar.vue";
import AppDrawer from "@/components/app/AppDrawer.vue";
import { useMessagesStore } from "@/store/message.ts";
import { onMounted } from "vue";
import { useRecipeStore } from "@/store/recipe-store.ts";

const messages = useMessagesStore()
const recipeStore = useRecipeStore()
onMounted(() => {
  recipeStore.loadFromLocalStorage()
})
</script>

<style>

</style>
