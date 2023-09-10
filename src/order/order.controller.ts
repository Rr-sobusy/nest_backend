import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/CreateOrderDto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  creatOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }
}
