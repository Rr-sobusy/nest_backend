export class CreateOrderDto {
  customer_id: number;
  sales_items: CreateOrderItemsDto[];
}

class CreateOrderItemsDto {
  quantity: number;
  product_id: number;
  sales_id:number
}
