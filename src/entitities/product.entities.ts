import {Column,PrimaryGeneratedColumn,Entity} from 'typeorm'

@Entity('products')
export class ProductEntities {
    @PrimaryGeneratedColumn({type:'bigint'})
    product_id:number;

    @Column()
    product_name:string;

    @Column()
    packaging_size:number;

    @Column()
    initial_stocks:number
}