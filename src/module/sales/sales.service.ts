import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesEntities } from 'src/entitities/sales.entities';

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
  async createSales(): Promise<number> {
    const { sales_id } = await this.salesRepository.findOne({
      order: { sales_id: 'desc' },
      where: {},
    });
    return sales_id;
  }
}
