import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { BoxService } from './box.service';
import { CreateBoxDto, UpdateBoxStatusDto } from './dto';

@Controller('box')
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  @Post()
  async createBox(@Body() body: CreateBoxDto) {
    return this.boxService.createBox(body);
  }

  @Put(':id')
  async updateBox(@Param('id') id: string, @Body() body: CreateBoxDto) {
    return this.boxService.updateBox(id, body);
  }

  @Patch(':id')
  async updateBoxStatus(
    @Param('id') id: string,
    @Body() body: UpdateBoxStatusDto,
  ) {
    return this.boxService.updateBoxStatus(id, body);
  }

  @Get(':id')
  async GetDetailBox(@Param('id') id: string) {
    return this.boxService.getDetailBox(id);
  }

  @Get()
  async GetAllBox() {
    return this.boxService.GetAllBox();
  }

  @Delete(':id')
  async deleteBox(@Param('id') id: string) {
    return this.boxService.deleteBox(id);
  }
}
