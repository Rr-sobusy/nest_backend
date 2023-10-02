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

@Entity('released_packagings')
export class ReleasedPackagingEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @JoinColumn({ name: 'packaging_id' })
  packaging_id: number;

  @Column()
  quantity_released: number;

  @Column()
  date_released: Date;

  @Column()
  released_for: string;

  @ManyToOne(() => PackagingEntities)
  @JoinColumn({ name: 'packaging_id' })
  packaging: PackagingEntities;
}
