import { Injectable } from '@nestjs/common';
import { OrdersParams } from 'src/utils/inteface/orders/orders.interface';

@Injectable()
export class OrderService {
  createOrder(orderDetails: OrdersParams) {
    return orderDetails;
  }
}
