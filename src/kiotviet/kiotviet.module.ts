import { Module } from '@nestjs/common';
import { KiotvietService } from './kiotviet.service';
import { KiotvietController } from './kiotviet.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [KiotvietService],
  controllers: [KiotvietController],
  imports: [ConfigModule],
})
export class KiotvietModule {}
