<template>
    <v-list>
      <v-list-item
        class="px-5"
        :key = "item.name"
        :title="item.name"
        :subtitle="`Price: R$ ${item.price.toFixed(2)}`"
      >

        <template v-slot:prepend>
          <v-avatar color="grey">
            <v-icon color="white"> mdi mdi-hamburger </v-icon>
          </v-avatar>
        </template>

        <template v-slot:append v-if="item.quantity !=0">
           <v-btn
              color="red"
              v-if="counter == 0"
              @click="increment"
            >
              <v-icon small>mdi-plus-circle</v-icon>
            </v-btn>

            <div v-else>
              <v-btn color="red" @click="decrement">
                <v-icon small>
                  mdi mdi-minus-circle
                </v-icon>
              </v-btn>
              <span class="pa-3" v-if="counter != 0">
                {{ counter }}
              </span>
              <v-btn color="green" icon @click="increment" :disabled="counter == props.item.quantity">
                <v-icon small>mdi-plus-circle</v-icon>
              </v-btn>
            </div>
        </template>
      </v-list-item>
    </v-list>
    <v-divider/>
</template>

<script setup lang="ts">
import {ref, onMounted, watch} from "vue";
import type { Product } from "@/types/product";

const counter = ref(0);
const cart = ref<Product[]>([]);

const props = defineProps<{item: Product, pendingCreate: boolean}>();
const emit = defineEmits(["getItem"]);


function setCart(){
    cart.value.forEach((cartItem) => {
      if (props.item.name == cartItem.name) {
        counter.value = cartItem.quantity;
      }
    });
    if (counter.value != 0)   emit('getItem', {
      name: props.item.name,
      counter: counter.value,
      price: props.item.price,
      productId: props.item.id,
    });
}

function increment(){
  if(counter.value < props.item.quantity){
    counter.value++;
    emit('getItem', {
      name: props.item.name,
      counter: counter.value,
      price: props.item.price,
      productId: props.item.id,
    });
  }else{
    alert("Quantidade máxima atingida");
  }
}

function decrement() {
  if (counter.value > 0) counter.value--;
  emit('getItem', {
    name: props.item.name,
    counter: counter.value,
    price: props.item.price,
    productId: props.item.id,
  });
}


onMounted(() => {
  setCart();
})

watch(() => props.pendingCreate, () => {
  if(props.pendingCreate){
    cart.value = [];
    counter.value = 0;
  }
})

</script>
