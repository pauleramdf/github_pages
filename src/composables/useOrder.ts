import { useFetch } from "./useFetch";
import { ref, onMounted } from "vue";
import type { Owner } from "@/types/owner";

const obcApi = import.meta.env.VITE_LANCHONETE_API;
const urlBase = `${obcApi}/owner`;

export const useOwner = () => {
  const { fetchBase } = useFetch();
  const data = ref<Owner[] | null>(null);

  async function refresh(): Promise<Owner[] | null> {
    try {
      const { data: d, statusCode, error } = await fetchGenerator<any>(`${urlBase}/version/update/cancel-update`, "PUT", undefined, body);
      if (statusCode.value === 200 && !error.value) {
        return d.value;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  onMounted(async () => {
    data.value = await refresh();
  });

  return { data, refresh };
};
