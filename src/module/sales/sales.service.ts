import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesEntities } from 'src/entitities/sales.entities';
import { SalesItemsEntities } from 'src/entitities/sales-items.entities';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SalesEntities)
    private salesRepository: Repository<SalesEntities>,
  ) {}

 async findSales() {
    return this.salesRepository.find({
        relations: ['sales_items','sales_items.product'],
        order : {
            'sales_id': 'desc'
        }
    });
  
  }
}
