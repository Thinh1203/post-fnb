import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() data: any) {
    return this.orderService.createOrder(data);
  }

  @Get(':id')
  async getOrder(@Body() id: string) {
    return this.orderService.getOrder(id);
  }
}
