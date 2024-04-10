<template>
    <v-layout class="v-layout--full-height">
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Doe"
          nav
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <RouterLink style="text-decoration: none; color: inherit;" to="/"><v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item></RouterLink>
          <RouterLink style="text-decoration: none; color: inherit;" to="orders"><v-list-item prepend-icon="mdi-invoice-text-multiple-outline" title="Orders" value="orders"></v-list-item></RouterLink>
          <RouterLink style="text-decoration: none; color: inherit;" to="products"><v-list-item prepend-icon="mdi-silverware" title="Products" value="products"></v-list-item></RouterLink>
        </v-list>
      </v-navigation-drawer>


  <v-main>
    <RouterView/>
  </v-main>
  </v-layout>
</template>

<script lang="ts" setup>

import {ref} from "vue";

const drawer = ref(true);
const rail = ref(true)

</script>
