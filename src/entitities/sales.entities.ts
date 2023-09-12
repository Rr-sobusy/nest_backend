import { Column, PrimaryGeneratedColumn, Entity, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { SalesItemsEntities } from './sales-items.entities';

@Entity('product_sales')
export class SalesEntities {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  sales_id: number;

  @Column()
  customer_id: number;

  @CreateDateColumn({})
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type)=>SalesItemsEntities, (props)=>props.sales)
  @JoinColumn({name:'sales_id'})
  sales_items: SalesItemsEntities[]
  
}
