export type CreateOrderParams = {
    customer_id: number;
    sales_items: CreateOrderItemsParams[]
}

type CreateOrderItemsParams = {
    sales_id: number;
    product_id: number;
    quantity:number
}

  