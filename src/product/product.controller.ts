import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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

  @Get(':code')
  async getProductById(@Param('code') code: string) {
    return this.productService.getDetailProduct(code);
  }

  // product update change event
  // @Post('update')
  // async updateProduct(@Body() body: any) {
  //   return this.productService.updateProduct(body);
  // }
}
