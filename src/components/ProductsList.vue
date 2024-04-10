<template>
  <v-card
    title="Products"
    flat
  >
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>

    <v-data-table
      :headers="headers"
      :items="productsList"
      :search="search"
      :items-per-page="pageSize"
    ></v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import {computed, onBeforeMount, ref} from "vue";
import {useProduct} from "@/composables/useProduct";

const { data: products, refresh, pageSize } = useProduct();

const search = ref("");
const pageProduct = ref<number>(0);

const headers = ref([
  { align: 'start', key: 'name', sortable: false, title: 'Products',},
  { key: 'price', title: 'Prices' },
  { key: 'quantity', title: 'Quantity' },
  { key: 'tag', title: 'Tag' },
  { key: 'updatedAt', title: 'Updated at' },
  ]);

const productsList = computed(() => {
  return products.value ? products.value : [];
});

onBeforeMount(() => {
  refresh(pageProduct.value);
});
</script>
