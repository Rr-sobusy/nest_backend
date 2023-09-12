import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesEntities } from 'src/entitities/sales.entities';
import { SalesItemsEntities } from 'src/entitities/sales-items.entities';
import { CreateOrderParams } from 'src/utils/types/CreateOrder.types';
import { CreateOrderItemsParams } from 'src/utils/types/CreateOrderItems.types';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SalesEntities)
    private salesRepository: Repository<SalesEntities>,
    @InjectRepository(SalesItemsEntities)
    private salesItemsRepository: Repository<SalesItemsEntities>,
  ) {}

  // Find sales data
  findSales() {
    return this.salesRepository.find({
      relations: ['sales_items'],
      order: {
        sales_id: 'desc',
      },
    });
  }

  // Create new sales instance
  async createSales(
    orderDetails: CreateOrderParams,
    orderItemsDetails?: CreateOrderItemsParams,
  ) {
    this.salesRepository.create(orderDetails);

    // await this.salesItemsRepository.save({
    //     quantity: 29,
    //     product_id: 3,
    //     sales: {
    //       sales_id:482
    //     }
    // });
    // const { sales_id } = await this.salesRepository.findOne({
    //   where: {},
    //   order: {
    //     sales_id: 'desc',
    //   },
    // });
  }
}
