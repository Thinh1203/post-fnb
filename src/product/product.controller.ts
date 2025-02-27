import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() body: any) {
    return this.productService.createProduct(body);
  }

  @Get()
  async getAllProduct(@Query() query: any) {
    return this.productService.getAllProduct(query);
  }
}
