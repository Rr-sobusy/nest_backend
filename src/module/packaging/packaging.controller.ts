import { Controller, Get, Post, Body } from '@nestjs/common';
import { PackagingService } from './packaging.service';
import { CreateReleasedPackagingDto } from './dtos/CreateReleasedPackagingDto';
import { CreateDeliveredPackagingDto } from './dtos/CreateDeliveredPackagingDto';
import { CreateReturnedPackagingDto } from './dtos/CreateReturnedPackagingDto';
@Controller('packaging')
export class PackagingController {
  constructor(private packagingService: PackagingService) {}
  @Get()
  findPackaging() {
    return this.packagingService.findPackagings();
  }

  @Get('delivered')
  findDeliveredPackaging() {
    return this.packagingService.findDeliveredPackagings();
  }

  @Get('released')
  findReleasedPackaging() {
    return this.packagingService.findReleasedPackagings();
  }

  @Get('returned')
  findReturnedPackaging() {
    return this.packagingService.findReturnedPackagings();
  }

  @Post('addreleased')
  createReleasePackaging(
    @Body() createReleasedPackagingDto: CreateReleasedPackagingDto,
  ) {
    return this.packagingService.createReleasedPackaging(
      createReleasedPackagingDto,
    );
  }

  @Post('adddelivered')
  createDeliveredPackaging(
    @Body() createDeliveredPackagingDto: CreateDeliveredPackagingDto,
  ) {
    return this.packagingService.createDeliveredPackaging(
      createDeliveredPackagingDto,
    );
  }

  @Post('addreturned')
  createReturnedPackaging(
    @Body() createReturnedPackagingDto: CreateReturnedPackagingDto,
  ) {
    return this.packagingService.createReturnedPackaging(
      createReturnedPackagingDto,
    );
  }
}
