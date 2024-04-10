<template>
  <div>
  <v-card class="v-layout--full-height">
    <v-tabs v-model="tab" align-tabs="center" stacked>
      <v-tab value="0">
        <v-icon>mdi-invoice-text-multiple-outline</v-icon>
        Orders History
      </v-tab>

      <v-tab value="1">
        <v-icon>mdi-invoice-text-plus-outline</v-icon>
        New Order
      </v-tab>

    </v-tabs>

    <v-window class="full-height" v-model="tab">
      <v-window-item class="full-height" :value="1">>
        <v-card>
          <OrdersList :tab></OrdersList>
        </v-card>
      </v-window-item>

      <v-window-item class="full-height" :value="2">>
        <v-card>
          <NewOrder :pendingCreate @getItem="updateCart"></NewOrder>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
  <v-footer app absolute v-if="totalItems != 0">
    <v-col class="text-center" cols="12">
      <v-btn color="green"
      ><span class="font-weight-bold text-h6">
								Items: {{ totalItems }}
							</span>
      </v-btn>

      <v-btn color="red" @click="orderFood">
        <v-icon class="mr-3">mdi mdi-shopping</v-icon>
        <span class="font-weight-bold text-h6 mr-3"> R$: {{ totalPrice.toFixed(2)}}</span>
        Buy Now
      </v-btn>
    </v-col>
  </v-footer>
  </div>
</template>

<script lang="ts" setup>
import OrdersList from "@/components/OrdersList.vue";
import NewOrder from "@/components/NewOrder.vue";

import { useOrder } from "@/composables/useOrder";
import { ref } from "vue";
import type { CreateOrder } from "@/types/order";

const { create, pendingCreate } = useOrder();
const tab = ref(0);
const totalItems = ref(0);
const totalPrice = ref(0);
const order = ref<ItemCart[]>([]);

interface ItemCart {
  productId: string;
  name: string;
  counter: number;
  price: number;
};

const updateCart = ({items: i, prices: p, order: o}) => {
  console.log("Updating cart");

  totalItems.value = i.value;
  totalPrice.value = p.value;
  order.value = o.value;
};
const orderFood =  async () => {
  const body = {} as CreateOrder;

  body.orderId = null;

  body.products = order.value
    .filter(item  => item.counter > 0)
    .map(item => ({
      productId: item.productId,
      quantity: item.counter,
    }));

  await create(body);

  order.value = [];
  totalItems.value = 0;
  totalPrice.value = 0;
};
</script>
