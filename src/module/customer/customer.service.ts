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
    return this.customerRepository
      .createQueryBuilder('customer')
      .select([
        `customer."customer_id"`,
        `customer."customer_name"`,
        `sum(sales_items.quantity * products.packaging_size) as total_bought`,
      ])
      .leftJoin('customer.sales', 'product_sales')
      .innerJoin('product_sales.sales_items', 'sales_items')
      .innerJoin('sales_items.product', 'products')
      .groupBy('customer.customer_id')
      .orderBy('total_bought', 'DESC')
      .getRawMany();
  }

  // Get three of best customers on current month
  findBestCustomerForMonth(currentYear:number) {
    return this.customerRepository
      .createQueryBuilder('customer')
      .select([
        `sum(sales_items.quantity * products.packaging_size) as total_bought`,
        `customer."customer_id"`,
        `customer."customer_name"`
      ])
      .innerJoin('customer.sales', 'product_sales')
      .innerJoin('product_sales.sales_items', 'sales_items')
      .innerJoin('sales_items.product', 'products')
      .where(`extract(month from product_sales."createdAt"::date) = extract(month from now()::date) 
      and extract(year from product_sales."createdAt"::date) = :currentYear`, {
        currentYear : currentYear
      })
      
      .groupBy('customer.customer_id')
      .orderBy('total_bought', 'DESC')
      .limit(3)
      .getRawMany();
  }
}
