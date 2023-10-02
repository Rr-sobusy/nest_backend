import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  JoinColumn,
  ManyToMany,
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
  delivered_quatity: number;

  @Column()
  date_delivered: number;

  @ManyToMany(() => PackagingEntities, (props) => props.deliveredPackagings)
  @JoinColumn({ name: 'packaging_id' })
  packaging: PackagingEntities;
}
