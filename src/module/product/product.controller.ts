import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  findProducts() {
    return this.productService.findProducts();
  }

  @Get('topsoldproduct')
  findFiveBest(){
   return this.productService.findFiveBest()
  }
}
