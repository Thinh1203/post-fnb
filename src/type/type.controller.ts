import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  async createType(@Body() body: CreateTypeDto) {
    return this.typeService.createType(body);
  }

  @Get()
  async getAllType() {
    return this.typeService.getAllType();
  }

  @Get(':id')
  async getDetailType(@Param('id') id: string) {
    return this.typeService.getDetailType(id);
  }

  @Patch(':id')
  async updateType(@Body() body: CreateTypeDto, @Param('id') id: string) {
    return this.typeService.updateType(id, body);
  }

  @Delete(':id')
  async deleteType(@Param('id') id: string) {
    return this.typeService.deleteType(id);
  }
}
