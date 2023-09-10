import {Column, PrimaryGeneratedColumn,Entity,ManyToOne, JoinColumn} from 'typeorm';
import { Order } from './orders.entites';


@Entity('order_items')
export class OrderItems {
        @PrimaryGeneratedColumn({type:'bigint'})
        id: number

        @ManyToOne(type => Order)
        @JoinColumn({name:'order_id'})
        order_id : number

        @Column()
        customer_name:string

}