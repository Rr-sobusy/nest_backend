export type CreateOrderParams = {
  customerId: number;
  createdAt: Date;
  updatedAt: Date;
  salesItems: CreateOrderItemsParams[];
};

type CreateOrderItemsParams = {
  productId: number;
  quantity: number;
};
