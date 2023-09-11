import { Module } from '@nestjs/common';;
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesEntities } from 'src/entitities/sales.entities';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { SalesItemsEntities } from 'src/entitities/sales-items.entities';

@Module({
imports:[TypeOrmModule.forFeature([SalesEntities, SalesItemsEntities])],
  controllers: [SalesController],
  providers: [SalesService]
})
export class SalesModule {}
