import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntities } from 'src/entitities/product.entities';

@Module({
imports:[TypeOrmModule.forFeature([ProductEntities])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
