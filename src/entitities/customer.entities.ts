import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    VirtualColumn
  } from 'typeorm';
  
  @Entity('customers')
  export class CustomerEntites {
        @PrimaryGeneratedColumn({type: 'bigint'})
        customer_id:number
        
        @Column()
        customer_name:string
  }
  