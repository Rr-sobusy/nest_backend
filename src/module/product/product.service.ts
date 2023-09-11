import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntities } from 'src/entitities/product.entities';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntities)
    private productRepository: Repository<ProductEntities>,
  ) {}

  // Fetch products data
  findProducts() {
    return this.productRepository
      .createQueryBuilder('p')
      .addSelect(
        `(select coalesce(sum(po.output_quantity), 0) from production_outputs po where po.product_id = p.product_id) as in`,
      )
      .addSelect(
        `(SELECT COALESCE(SUM(si.quantity), 0) FROM sales_items si WHERE si.product_id = p.product_id) AS out`,
      )
      .addSelect(
        `(select coalesce(sum(rp.quantity), 0) as repros from repro_products rp where rp.product_id = p.product_id)`,
      )
      .addSelect(
        ` (p.initial_stocks + (select coalesce(sum(po.output_quantity),0) as in from production_outputs po where po.product_id = p.product_id) -
      (select coalesce(sum(si.quantity), 0) as out from sales_items si where si.product_id = p.product_id) - 
       (select coalesce(sum(rp.quantity), 0) as repros from repro_products rp where rp.product_id = p.product_id)) as current_stocks`,
      )
      .orderBy('p.product_name', 'ASC')
      .getRawMany();
  }
}
