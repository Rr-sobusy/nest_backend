import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntites } from 'src/entitities/customer.entities';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntites)
    private customerRepository: Repository<CustomerEntites>,
  ) {}

  findCustomer() {
    return this.customerRepository.find({
        order : {
            customer_name: 'ASC'
        }
    });
  }
}
