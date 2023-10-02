import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  JoinColumn,
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
