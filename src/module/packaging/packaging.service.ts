import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PackagingEntities } from 'src/entitities/packaging.entities';
import { DeliveredPackagingEntities } from 'src/entitities/packaging-deliveries.entities';
import { ReleasedPackagingEntities } from 'src/entitities/packaging-released.entities';
import { ReturnedPackagingEntities } from 'src/entitities/packaging-returned.entities';

@Injectable()
export class PackagingService {
  constructor(
    @InjectRepository(PackagingEntities)
    private packagingRepository: Repository<PackagingEntities>,
    @InjectRepository(DeliveredPackagingEntities)
    private deliveredPackagingRepository: Repository<DeliveredPackagingEntities>,
    @InjectRepository(ReleasedPackagingEntities) private releasedPackagingRepository:Repository<ReleasedPackagingEntities>,
    @InjectRepository(ReturnedPackagingEntities) private returnedPackagingRepository:Repository<ReturnedPackagingEntities>
  ) {}

  findPackagings() {
    return this.packagingRepository.find({
      order: {
        packaging_name: 'ASC',
      },
    });
  }

  findDeliveredPackagings() {
    return this.deliveredPackagingRepository.find();
  }

  findReleasedPackagings(){
        return this.releasedPackagingRepository.find()
  }

  findReturnedPackagings(){
        return this.returnedPackagingRepository.find()
  }
}
