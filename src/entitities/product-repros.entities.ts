import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ProductEntities } from './product.entities';

@Entity('production_outputs')
export class ProductReproEntities {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => ProductEntities)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntities;
}
