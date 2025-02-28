import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { KiotvietModule } from 'src/kiotviet/kiotviet.module';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [KiotvietModule, RedisModule],
})
export class CategoryModule {}
