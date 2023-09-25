import { Controller, Get , Param} from '@nestjs/common';
import { CustomerService } from './customer.service';
@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  findCustomers() {
   return this.customerService.findCustomer();
  }

  @Get('totalvolumebought')
  findCustomerVolume(){
      return this.customerService.findCustomerVolume()
  }

  @Get('bestforentiremonth/:currentYear')
  findCustomerForMonth(@Param('currentYear') currentYear:number){
        return this.customerService.findBestCustomerForMonth(currentYear)
  }
}
