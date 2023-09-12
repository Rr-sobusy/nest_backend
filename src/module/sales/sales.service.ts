import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesEntities } from 'src/entitities/sales.entities';
import { SalesItemsEntities } from 'src/entitities/sales-items.entities';
import { CreateOrderParams } from 'src/utils/types/CreateOrder.types';

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
  async createSales(orderDetails: CreateOrderParams) {
    const newSales = this.salesRepository.save(orderDetails);

    // Iterate list from sales_items type from OrderItem request body
    orderDetails.sales_items.map(async (values) => {
      const newSalesItems = this.salesItemsRepository.create({
        product_id: values.product_id,
        quantity: values.quantity,
        sales: {
          sales_id: (await newSales).sales_id,
        },
      });
      await this.salesItemsRepository.save(newSalesItems);
    });
    return newSales;
  }
}
