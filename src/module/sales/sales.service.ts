import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesEntities } from 'src/entitities/sales.entities';
import { CreateOrderParams } from 'src/utils/types';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SalesEntities)
    private salesRepository: Repository<SalesEntities>,
  ) {}

  // Find sales data
  findSales() {
    return this.salesRepository.find({
      relations: ['sales_items', 'sales_items.product'],
      order: {
        sales_id: 'desc',
      },
    });
  }

  // Create new sales instance
  // async createSales(orderDetails: CreateOrderParams) {
  //   const newSales = this.salesRepository.create({
  //     ...orderDetails,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });
  //   return this.salesRepository.save(newSales);
  // }
}
