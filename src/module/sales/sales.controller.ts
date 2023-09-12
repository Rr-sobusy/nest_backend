import { Controller, Get, Post, Body } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateOrderDto } from './dtos/CreateOrderDto';

@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Get()
  findSales() {
    return this.salesService.findSales();
  }

  @Post()
  createSales(@Body() createOrderDto: CreateOrderDto) {
    return this.salesService.createSales(createOrderDto);
  }
}
