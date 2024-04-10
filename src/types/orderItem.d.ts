import type {Product} from "@/types/product";

export type OrderItem = {
  id: string;
  Product: Product;
  Order: Order;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
};
