import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    OneToMany,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
  import { ProductEntities } from './product.entities';

  
  @Entity('production_outputs')
  export class ProductionOutputEntities {
    @PrimaryGeneratedColumn({type: 'bigint'})
    production_id : number

    @ManyToOne(()=> ProductEntities)
    @JoinColumn({name : 'product_id'})
    product : ProductEntities

    @Column()
    product_id : number

    @Column()
    output_quantity : number;

    @Column()
    damaged_packaging: number;

    @Column()
    production_date : Date;

  }
  