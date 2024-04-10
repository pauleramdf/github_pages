<template>
<!--  <v-expansion-panels>-->
<!--    <v-expansion-panel>-->
<!--      <v-expansion-panel-title collapse-icon="mdi-minus" expand-icon="mdi-plus">-->
<!--        Item-->
<!--      </v-expansion-panel-title>-->
<!--      <v-expansion-panel-text>-->

<!--      </v-expansion-panel-text>-->
<!--    </v-expansion-panel>-->
<!--  </v-expansion-panels>-->

  <div v-for="(list, i) in info" :key="i">
    <list-item
      :item="list"
      :pendingCreate="props.pendingCreate"
      @getItem="updateItem"
    />
  </div>
</template>

<script setup lang="ts">
import ListItem from "@/components/ListItem.vue";
import {computed, onMounted, ref} from "vue";
import { useProduct  } from "@/composables/useProduct";

const { refresh, data} = useProduct();

const totalItems = ref(0);
const totalPrice = ref(0);
const order = ref<ItemCart[]>([]);

const emit = defineEmits(["getItem"]);
const props = defineProps<{pendingCreate: boolean}>();

interface ItemCart {
  productId: string;
  name: string;
  counter: number;
  price: number;
};

const updateItem = (temp: ItemCart) => {
  const find =  order.value.findIndex(
    (element) => element.name == temp.name
  );
  if (find == -1) {
    order.value.push(temp);
  } else if (temp.counter == 0) {
    order.value.splice(find, 1);
  } else {
    order.value[find].counter = temp.counter;
  }
  updateItemPrice();
}
const updateItemPrice = () => {
  let total = 0;
  let numberItens = 0;

  order.value.forEach((element) => {
    total += element.price * element.counter;
    numberItens += element.counter;
  });

  totalItems.value = numberItens;
  totalPrice.value = total;

  emit("getItem",{items: totalItems, prices: totalPrice, order: order})
}


const info = computed(() => {
  return data.value;
});

onMounted(()=>{
  refresh(0);
});



</script>

