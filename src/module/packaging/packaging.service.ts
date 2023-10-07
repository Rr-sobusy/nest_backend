import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PackagingEntities } from 'src/entitities/packaging.entities';
import { DeliveredPackagingEntities } from 'src/entitities/packaging-deliveries.entities';
import { ReleasedPackagingEntities } from 'src/entitities/packaging-released.entities';
import { ReturnedPackagingEntities } from 'src/entitities/packaging-returned.entities';
import { CreateReleasedPackagingParams } from 'src/utils/types/CreateReleasedPackaging';
import { CreateDeliveredPackagingParams } from 'src/utils/types/CreateDeliveredPackaging';
@Injectable()
export class PackagingService {
  constructor(
    @InjectRepository(PackagingEntities)
    private packagingRepository: Repository<PackagingEntities>,
    @InjectRepository(DeliveredPackagingEntities)
    private deliveredPackagingRepository: Repository<DeliveredPackagingEntities>,
    @InjectRepository(ReleasedPackagingEntities)
    private releasedPackagingRepository: Repository<ReleasedPackagingEntities>,
    @InjectRepository(ReturnedPackagingEntities)
    private returnedPackagingRepository: Repository<ReturnedPackagingEntities>,
  ) {}

  findPackagings() {
    return this.packagingRepository.find({
      order: {
        packaging_name: 'ASC',
      },
    });
  }

  findDeliveredPackagings() {
    return this.deliveredPackagingRepository.find({
      relations: {
        packaging: true,
      },
    });
  }

  findReleasedPackagings() {
    return this.releasedPackagingRepository.find({
      relations: {
        packaging: true,
      },
    });
  }

  findReturnedPackagings() {
    return this.returnedPackagingRepository.find();
  }

  /**
   *  TODO : Create new packaging release instance
   */
  createReleasedPackaging(
    createReleasedPackagingParams: CreateReleasedPackagingParams,
  ) {
    return this.releasedPackagingRepository.save(createReleasedPackagingParams);
  }

  /**
   * TODO : create new packaging delivery instance
   */
  createDeliveredPackaging(
    createDeliveredPackagingParams: CreateDeliveredPackagingParams,
  ) {
    return this.deliveredPackagingRepository.save(
      createDeliveredPackagingParams,
    );
  }
}
