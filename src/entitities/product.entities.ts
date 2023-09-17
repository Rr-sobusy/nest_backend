import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { SalesItemsEntities } from './sales-items.entities';
import { ProductionOutputEntities } from './production-outputs.entities';

@Entity('products')
export class ProductEntities {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  product_id: number;

  @Column()
  product_name: string;

  @Column()
  packaging_size: number;

  @Column()
  initial_stocks: number;

  @OneToMany(() => SalesItemsEntities, (sales) => sales.product)
  @JoinColumn({ name: 'product_id' })
  items: SalesItemsEntities[];

  @OneToMany(() => ProductionOutputEntities, (props) => props.product)
  @JoinColumn({ name: 'production_id' })
  production: ProductionOutputEntities[];
}
