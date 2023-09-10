import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Order } from 'src/typeorm/entities/orders.entites';
import { OrderItems } from 'src/typeorm/entities/order-items.entities';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
    imports: [TypeOrmModule.forFeature([Order,OrderItems])],
    controllers: [OrderController],
    providers: [OrderService]

})
export class OrderModule {}
