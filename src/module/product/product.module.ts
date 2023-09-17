import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntities } from 'src/entitities/product.entities';
import { ProductionOutputEntities } from 'src/entitities/production-outputs.entities';

@Module({
imports:[TypeOrmModule.forFeature([ProductEntities, ProductionOutputEntities])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
