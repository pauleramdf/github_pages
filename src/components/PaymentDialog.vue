<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="props.paymentDialog"
      max-width="600"
    >
      <v-card>
        <v-card-title class="headline">
          Payment: R$ {{payment.due.toFixed(2)}}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="payment.amount"
                label="Amount"
                outlined
                type="number"
                :min="payment.due"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red darken-1"
            @click="close"
          >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            @click="createPayment"
          >
            Pay
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script setup lang="ts">
import {ref, watch} from "vue";
import type {Order, PayOrder} from "@/types/order";
import {useOrder} from "@/composables/useOrder";

const { payOrder } = useOrder();

const props = defineProps<{
  orderResult: Order | null,
  paymentDialog: boolean,
}>();

const emit = defineEmits(["paymentDialog"]);


const payment = ref({
  amount: props.orderResult?.totalPrice ?? 0,
  due: props.orderResult?.totalPrice ?? 0,
});


const close = () => {
  emit('paymentDialog', false);
}

const createPayment = () => {
  if(props.orderResult?.id){
    const body = ({
      orderId: props.orderResult.id,
      paymentValue: payment.value.amount,
    }) as PayOrder;

    payOrder(body).then((value) => {
      alert(`Payment success: change R$${value.change.toFixed(2)}`);
    }).catch((error) => {
      alert(`Payment error: ${error}`);
    }).finally(() => {
      setTimeout(() => {
        emit('paymentDialog', false);
      }, 1000);
    });
  }else{
    alert('Order sem ID')
    emit('paymentDialog', false);
  }
}

watch(()=> props.orderResult, (value) => {
  payment.value.amount = value?.totalPrice ?? 0;
  payment.value.due = value?.totalPrice ?? 0;
});
</script>

