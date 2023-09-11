import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { SalesEntities } from './sales.entities';
import { ProductEntities } from './product.entities';

@Entity('sales_items')
export class SalesItemsEntities {
  @PrimaryGeneratedColumn()
  sales_item_id: number;

  @ManyToOne(() => SalesEntities)
  @JoinColumn({ name: 'sales_id' })
  sales: SalesEntities;

  @ManyToOne((type) => ProductEntities)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntities;

  @Column()
  quantity: number;
}
