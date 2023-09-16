require('dotenv').config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntities } from './entitities/product.entities';
import { ProductModule } from './module/product/product.module';
import { SalesModule } from './module/sales/sales.module';
import { SalesEntities } from './entitities/sales.entities';
import { SalesItemsEntities } from './entitities/sales-items.entities';
import { CustomerModule } from './module/customer/customer.module';
import { CustomerEntities } from './entitities/customer.entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [ProductEntities, SalesEntities, SalesItemsEntities, CustomerEntities],
      synchronize: false,
    }),
    ProductModule,
    SalesModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
