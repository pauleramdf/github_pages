<template>
  <v-card
    title="Orders"
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
      :items="ordersList"
      :search="search"
      :items-per-page="pageSize"
    ></v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import {computed, onBeforeMount, ref, watch} from "vue";
import {useOrder} from "@/composables/useOrder";

const { data: orders, refresh, pageSize } = useOrder();

const search = ref("");
const pageOrders = ref<number>(0);

const props = defineProps<{tab: number}>();

const headers = ref([
  { align: 'start', key: 'name', sortable: false, title: 'Orders',},
  { key: 'totalPrice', title: 'Total Price' },
  { key: 'qntItems', title: 'Items' },
  { key: 'status', title: 'Status' },
  { key: 'updatedAt', title: 'Updated at' },
]);

const ordersList = computed(() => {
  return orders.value ? orders.value.map((order) => ({
      name: order.id,
      totalPrice: order.totalPrice,
      qntItems: order.items?.length || 0,
      status: order.status,
      updatedAt: order.updatedAt,
    })) : [];
});

const updateTab = () => {
  if (props.tab == 0) {
    refresh(pageOrders.value);
  }
}

onBeforeMount(() => {
  refresh(pageOrders.value);
});

watch(() => props.tab, updateTab);
</script>
