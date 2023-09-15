import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  VirtualColumn,
} from 'typeorm';
import { SalesEntities } from './sales.entities';
import { ProductEntities } from './product.entities';

@Entity('sales_items')
export class SalesItemsEntities {
  @PrimaryGeneratedColumn()
  sales_item_id: number;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => SalesEntities)
  @JoinColumn({ name: 'sales_id' })
  sales: SalesEntities;

  @ManyToOne((type) => ProductEntities)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntities;

  @VirtualColumn({
    query: (alias) =>
      `select product_name from products where product_id = ${alias}.product_id `,
  })
  product_name: string;

  @VirtualColumn({
    query: (alias) =>
      `select packaging_size from products where product_id = ${alias}.product_id `,
  })
  packaging_size: number;
}
