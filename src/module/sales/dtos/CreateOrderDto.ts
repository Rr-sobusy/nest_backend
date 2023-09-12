export class CreateOrderDto {
  customer_id: number;
  sales_items: CreateOrderItemsDto[]
}

export class CreateOrderItemsDto {
  quantity: number;
  product_id: number;
  sales_id:number
}
