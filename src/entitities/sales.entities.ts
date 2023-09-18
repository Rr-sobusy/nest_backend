import {
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VirtualColumn,
  ManyToOne,
  Column
} from 'typeorm';
import { SalesItemsEntities } from './sales-items.entities';
import { CustomerEntities } from './customer.entities';

@Entity('product_sales')
export class SalesEntities {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  sales_id: number;

  @Column()
  @JoinColumn({name: 'customer_id'})
  customer_id : number

  @ManyToOne(()=> CustomerEntities)
  @JoinColumn({name: 'customer_id'})
  customer:CustomerEntities

  @VirtualColumn({
    query: (alias) =>
      `select customer_name from customers where customer_id = ${alias}.customer_id`,
  })
  customer_name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => SalesItemsEntities, (props) => props.sales)
  @JoinColumn({ name: 'sales_id' })
  sales_items: SalesItemsEntities[];
}
