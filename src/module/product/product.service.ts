import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntities } from 'src/entitities/product.entities';
import { CreateProductParams } from 'src/utils/types/CreateProduct.types';
import { CreateProductionParams } from 'src/utils/types/CreateProduction.types';
import { ProductionOutputEntities } from 'src/entitities/production-outputs.entities';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntities)
    private productRepository: Repository<ProductEntities>,
    @InjectRepository(ProductionOutputEntities)
    private productionOutputRepository: Repository<ProductionOutputEntities>,
  ) {}

  // Find products data
  findProducts(): Promise<ProductEntities[]> {
    return this.productRepository
      .createQueryBuilder('p')
      .select(['product_id', 'product_name', 'packaging_size,initial_stocks'])
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

  // Find the 5 of most sold product
  findFiveBest(): Promise<ProductEntities[]> {
    return this.productRepository
      .createQueryBuilder('products')
      .select(['products.product_id,product_name'])
      .addSelect(
        'sum(sales_items.quantity * products.packaging_size) as total_sold',
      )
      .leftJoin('products.items', 'sales_items')
      .groupBy('products.product_id')
      .orderBy('total_sold', 'DESC')
      .limit(5)
      .getRawMany();
  }

  // Find all production datas
  findProductions(){
      return this.productionOutputRepository.find({
              relations : {
                  product: true
              }
      })
  }

  // Create new product
  createProduct(
    createProductParams: CreateProductParams,
  ): Promise<ProductEntities> {
    return this.productRepository.save(createProductParams);
  }

  // Create new production instance -- Added stocks per f.g
  createProduction(
    createProductionParams: CreateProductionParams,
  ): Promise<ProductionOutputEntities> {
    const newProduction = this.productionOutputRepository.create({
      ...createProductionParams,
      production_date: new Date(createProductionParams.production_date),
    });
    return this.productionOutputRepository.save(newProduction);
  }
}
