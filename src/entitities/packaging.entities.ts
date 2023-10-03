import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  JoinColumn,
  VirtualColumn,
} from 'typeorm';
import { DeliveredPackagingEntities } from './packaging-deliveries.entities';
import { ReleasedPackagingEntities } from './packaging-released.entities';
import { ReturnedPackagingEntities } from './packaging-returned.entities';

@Entity('packagings')
export class PackagingEntities {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  packaging_id: number;

  @Column()
  packaging_name: string;

  @Column()
  initial_stocks: number;

  // Virtual tables
  @VirtualColumn({
    query: (alias) =>
      `select coalesce(sum(delivered_quantity), 0) from delivered_packagings where packaging_id = ${alias}.packaging_id`,
  })
  total_delivered: number;

  @VirtualColumn({
    query: (alias) =>
      `select coalesce(sum(quantity_released), 0) from released_packagings where packaging_id = ${alias}.packaging_id`,
  })
  total_released: number;

  @VirtualColumn({
    query: (alias) =>
      `select coalesce(sum(quantity_returned), 0) from returned_packagings where packaging_id = ${alias}.packaging_id`,
  })
  total_returned: number;


  // One to manies
  @OneToMany(() => DeliveredPackagingEntities, (props) => props.packaging)
  @JoinColumn({ name: 'packaging_id' })
  deliveredPackagings: DeliveredPackagingEntities[];

  @OneToMany(() => ReleasedPackagingEntities, (props) => props.packaging)
  @JoinColumn({ name: 'packaging_id' })
  releasedPackagings: ReleasedPackagingEntities[];

  @OneToMany(() => ReturnedPackagingEntities, (props) => props.packaging)
  @JoinColumn({ name: ' packaging_id' })
  returnedPackagings: ReturnedPackagingEntities[];
}
