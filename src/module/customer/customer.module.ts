import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntites } from 'src/entitities/customer.entities';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';


@Module({
imports:[TypeOrmModule.forFeature([CustomerEntites])],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
