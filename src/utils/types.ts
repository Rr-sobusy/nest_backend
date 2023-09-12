export type CreateOrderParams = {
  customer_id: number;
  sales_items : CreateOrderItemsParams[]
};

 type CreateOrderItemsParams = {
  quantity: number;
  product_id: number;
};
