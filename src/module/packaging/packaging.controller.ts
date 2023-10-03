import { Controller, Get } from '@nestjs/common';
import { PackagingService } from './packaging.service';
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
  findReturnedPackaging(){
    return this.packagingService.findReturnedPackagings()
  }
}
