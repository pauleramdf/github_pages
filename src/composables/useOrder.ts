import { useFetch } from "./useFetch";
import { ref } from "vue";
import type {CreateOrder, Order, PayOrder, ReceiptOrder} from "../types/order";

const urlAPI = import.meta.env.VITE_LANCHONETE_API;
const urlBase = `${urlAPI}/orders`;

export const useOrder = () => {
  const { fetchBase } = useFetch();
  const data = ref<Order[]>([]);
  const tPage = ref<number>(0);
  const pending = ref<boolean>(false);
  const pageSize = ref<number>(20);
  const pendingCreate = ref(false);
  const pendingPayment = ref(false);

  async function refresh(page: number, urlParams = "", size = pageSize.value, sort = ["createdAt", "desc"]): Promise<Order[] | null> {
    pending.value = true;

    try {
      const response = await fetchBase<any>(`${urlBase}/all?page=${page}&size=${size}${urlParams}`, "GET", undefined);

      tPage.value = response.totalPages;

      data.value = (response.content as Order[]);
      return null;
    } catch (error) {
      return null;
    }finally {
      pending.value = false;
    }
  }

  async function create(createOrder: CreateOrder): Promise<Order | null> {
    pendingCreate.value = true;
    try {
      const body = JSON.stringify(createOrder);

      const response = await fetchBase<any>(`${urlBase}/total_batch`, "POST", undefined, body);

      console.log(response);
      return response;

    } catch (error) {
      return null;
    }finally {
      pendingCreate.value = false;
    }
  }

    async function payOrder(payOrder :PayOrder): Promise<ReceiptOrder> {
      pendingPayment.value = true;
      try {
        const body = JSON.stringify(payOrder);

        return fetchBase<any>(`${urlBase}/close`, "POST", undefined, body);;
      } catch (error) {
        throw new Error("Erro ao pagar pedido");
      }finally {
        pendingPayment.value = false;
      }
    }


  return { data, refresh, pending, totalPages: tPage, pageSize, create, pendingCreate, payOrder, pendingPayment };
};
