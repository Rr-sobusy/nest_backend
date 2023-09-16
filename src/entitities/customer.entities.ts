import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { SalesEntities } from './sales.entities';

@Entity('customers')
export class CustomerEntities {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  customer_id: number;

  @Column()
  customer_name: string;

  @OneToMany(() => SalesEntities, (props) => props.customer)
  @JoinColumn({ name: 'customer_id' })
  sales: SalesEntities[];
}
