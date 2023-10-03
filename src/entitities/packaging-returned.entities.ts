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
  
  @Entity('returned_packagings')
  export class ReturnedPackagingEntities {
        @PrimaryGeneratedColumn()
        id: number

        @Column()
        @JoinColumn({name: 'packaging_id'})
        packaging_id : number

        @Column()
        quantity_returned: number

        @Column()
        returned_date: Date

        @ManyToOne(()=>PackagingEntities)
        @JoinColumn({name:'packaging_id'})
        packaging: PackagingEntities
  }
  