import { Module } from '@nestjs/common';
import { KiotvietService } from './kiotviet.service';
import { KiotvietController } from './kiotviet.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  providers: [KiotvietService],
  controllers: [KiotvietController],
  imports: [RedisModule],
  exports: [KiotvietService],
})
export class KiotvietModule {}
