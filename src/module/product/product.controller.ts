import { Controller, Get, Post, Body , Delete, Param} from '@nestjs/common';
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

  @Get('productiondatas')
  findProductions(){
    return this.productService.findProductions()
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Post('productionoutputs')
  createProduction(@Body() createProductionDto: CreateProductionDto) {
    return this.productService.createProduction(createProductionDto);
  }

  @Delete('deleteproduction/:productionId')
  destroyProduction(@Param('productionId') productionId:number){
        return this.productService.destroyProduction(productionId)
  }

  @Get('topsoldproduct')
  findFiveBest() {
    return this.productService.findFiveBest();
  }
}
