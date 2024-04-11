import type {ProductOrder} from "@/types/product";

export type Order = {
  id: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  items: OrderItem[];
};


export type CreateOrder = {
  orderId: string;
  products: ProductOrder[];
};


export type PayOrder = {
  orderId: string;
  paymentValue: number;
};

export type ReceiptOrder = {
  change: number;
  order: Order;
};
