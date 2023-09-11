import { Column, PrimaryGeneratedColumn, Entity, OneToMany, JoinColumn} from 'typeorm';
import { SalesItemsEntities } from './sales-items.entities';

@Entity('product_sales')
export class SalesEntities {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  sales_id: number;

  @Column()
  customer_id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  customer_name: string;

  @OneToMany((type)=>SalesItemsEntities, (props)=>props.sales)
  @JoinColumn({name:'sales_id'})
  sales_items: SalesItemsEntities[]
  
}
