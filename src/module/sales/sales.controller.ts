import { Controller, Get, Post , Body} from '@nestjs/common';
import { SalesService } from './sales.service';


@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Get()
  findSales() {
    return this.salesService.findSales();
  }


}
