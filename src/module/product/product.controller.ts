import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/CreateProductDto';
import { CreateProductionDto } from './dtos/CreateProductionDto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  findProducts() {
    return this.productService.findProducts();
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Post('productionoutputs')
  createProduction(@Body() createProductionDto: CreateProductionDto) {
    return this.productService.createProduction(createProductionDto);
  }

  @Get('topsoldproduct')
  findFiveBest() {
    return this.productService.findFiveBest();
  }
}
