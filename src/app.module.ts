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
import { ProductionOutputEntities } from './entitities/production-outputs.entities';
import { PackagingModule } from './module/packaging/packaging.module';
import { PackagingEntities } from 'src/entitities/packaging.entities';
import { DeliveredPackagingEntities } from 'src/entitities/packaging-deliveries.entities';
import { ReleasedPackagingEntities } from 'src/entitities/packaging-released.entities';
import { ReturnedPackagingEntities } from 'src/entitities/packaging-returned.entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        ProductEntities,
        SalesEntities,
        SalesItemsEntities,
        CustomerEntities,
        ProductionOutputEntities,
        PackagingEntities,
        ReleasedPackagingEntities,
        DeliveredPackagingEntities,
        ReturnedPackagingEntities
      ],
      synchronize: false,
    }),
    ProductModule,
    SalesModule,
    CustomerModule,
    PackagingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
