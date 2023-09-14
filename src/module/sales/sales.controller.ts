import { Controller, Get, Post, Body , Param} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateOrderDto } from './dtos/CreateOrderDto';

@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Get()
  findSales() {
    return this.salesService.findSales();
  }

  @Get('salesthisyear/:currentYear')
  findSalesThisYear(@Param('currentYear') currentYear: number) {
    return this.salesService.findSalesPerYear(currentYear);
  }

  @Post()
  createSales(@Body() createOrderDto: CreateOrderDto) {
    return this.salesService.createSales(createOrderDto);
  }
}
