import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntities } from 'src/entitities/customer.entities';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntities)
    private customerRepository: Repository<CustomerEntities>,
  ) {}

  findCustomer() {
    return this.customerRepository.find({
      order: {
        customer_name: 'ASC',
      },
    });
  }

  // Find customer's total bought in volume
  findCustomerVolume() {
  return  this.customerRepository.createQueryBuilder('customer').select([``])
  }
}
