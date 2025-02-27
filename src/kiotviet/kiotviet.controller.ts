import { Controller, Get, Post } from '@nestjs/common';
import { KiotvietService } from './kiotviet.service';

@Controller('kiotviet')
export class KiotvietController {
  constructor(private readonly kiotvietService: KiotvietService) {}
  @Get()
  async getDataFromKiotviet() {
    return this.kiotvietService.getData();
  }
}
