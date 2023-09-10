import {Column, PrimaryGeneratedColumn,Entity,OneToMany} from 'typeorm'
import { OrderItems } from './order-items.entities'


@Entity('orders')
export class Order {
        @PrimaryGeneratedColumn({type:'bigint'})
        order_id:number

        @Column()
        order_date: Date

        @Column()
        customer_name:string

        @OneToMany(()=>OrderItems, (items)=>items.order_id)
        items: OrderItems[]

}