import { Module } from '@nestjs/common';
import { PackagingService } from './packaging.service';
import { PackagingController } from './packaging.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackagingEntities } from 'src/entitities/packaging.entities';
import { DeliveredPackagingEntities } from 'src/entitities/packaging-deliveries.entities';
import { ReleasedPackagingEntities } from 'src/entitities/packaging-released.entities';
import { ReturnedPackagingEntities } from 'src/entitities/packaging-returned.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PackagingEntities,
      DeliveredPackagingEntities,
      ReleasedPackagingEntities,
      ReturnedPackagingEntities,
    ]),
  ],
  providers: [PackagingService],
  controllers: [PackagingController],
})
export class PackagingModule {}
