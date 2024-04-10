import { useFetch } from "./useFetch";
import { ref } from "vue";
import type { Product } from "../types/product";

const urlAPI = import.meta.env.VITE_LANCHONETE_API;
const urlBase = `${urlAPI}/products`;

export const useProduct = () => {
  const { fetchBase } = useFetch();
  const data = ref<Product[]>([]);
  const tPage = ref<number>(0);
  const pending = ref<boolean>(false);
  const pageSize = ref<number>(20);

  async function refresh(page: number, urlParams = "", size = pageSize.value, sort = ["createdAt", "desc"]): Promise<Product[] | null> {
    pending.value = true;

    try {
      const response = await fetchBase<any>(`${urlBase}/all?page=${page}&size=${size}${urlParams}`, "GET", undefined);

      tPage.value = response.totalPages;

      data.value = (response.content as Product[]);
      return null;
    } catch (error) {
      return null;
    }finally {
      pending.value = false;
    }
  }

  return { data, refresh, pending, totalPages: tPage, pageSize};
};
