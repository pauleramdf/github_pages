<template>
  <v-app class="fill-height">
    <component :is="layout">
      <RouterView />
    </component>
  </v-app>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";

const DefaultLayout = defineAsyncComponent(() => import("./layouts/DefaultLayout.vue"));

const layout = computed(() => DefaultLayout);
</script>
