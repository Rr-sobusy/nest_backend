import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { PackagingEntities } from './packaging.entities';

@Entity('delivered_packagings')
export class DeliveredPackagingEntities {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  @JoinColumn({ name: 'packaging_id' })
  packaging_id: number;

  @Column()
  delivered_quantity: number;

  @Column()
  date_delivered: number;

  @ManyToOne(() => PackagingEntities)
  @JoinColumn({ name: 'packaging_id' })
  packaging: PackagingEntities;
}
