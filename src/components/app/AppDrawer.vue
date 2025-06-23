<template>
  <v-navigation-drawer
      v-model="drawer"
      :expand-on-hover="rail"
      :rail="rail"
      floating
  >
    <template #prepend>
      <v-list>
        <v-list-item to="/" class="pa-1">
          <template #prepend>
            <v-icon
                icon="custom:vitify-nuxt"
                size="x-large"
                class="drawer-header-icon"
                color="primary"
            />
          </template>
          <v-list-item-title
              class="text-h5 font-weight-bold"
              style="line-height: 2rem"
          >
            火湖 <span class="text-primary">合成表</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
    <v-list-item to="/recipe/management" active-class="text-primary" title="配方导入" />
    <v-list-item to="/recipe/query" active-class="text-primary" title="配方查询" />
<!--    <v-list-item to="/recipe/simulation" active-class="text-primary" title="合成查询" />-->
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { drawer } from "@/utils.ts";
import { useDisplay } from "vuetify/framework";
import { computed } from "vue";
const { mobile, lgAndUp, width } = useDisplay()
const rail = computed(() => !drawer.value && !mobile.value)
</script>

<style scoped>

</style>