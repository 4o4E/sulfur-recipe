<template>
  <v-app-bar flat class="app-bar">
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <v-spacer />
    <v-switch
        v-model="isDark"
        color=""
        hide-details
        density="compact"
        inset
        false-icon="mdi-white-balance-sunny"
        true-icon="mdi-weather-night"
        class="opacity-80"
    />
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify/framework";
import { computed } from "vue";
import { drawer } from "@/utils.ts";

const theme = useTheme()
const isDark = computed({
  get() {
    return theme.global.name.value === 'dark'
  },
  set(v) {
    theme.global.name.value = v ? 'dark' : 'light'
  },
})
</script>

<style scoped>
router-link {
  margin: 0 1em;
  color: var(--v-primary-base);
  text-decoration: none;
}
</style>