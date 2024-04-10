export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
};

export type ProductOrder = {
  productId: string;
  quantity: number;
}
