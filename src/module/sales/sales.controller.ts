import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
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

  @Get('salesthisweek')
  findSalesThisWeek() {
    return this.salesService.findSalesThisWeek();
  }

  @Get('bestcustomerforentiremonth')
  findSample() {
    return this.salesService.findBestCustomerForMonth();
  }

  @Post()
  createSales(@Body() createOrderDto: CreateOrderDto) {
    return this.salesService.createSales(createOrderDto);
  }

  @Delete('deletesales/:salesId')
  destroySales(@Param('salesId') salesId: number) {
    return this.salesService.destroySales(salesId);
  }
}
