import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupabaseModule } from 'nestjs-supabase-js';
import { KiotvietModule } from './kiotviet/kiotviet.module';
import { BoxModule } from './box/box.module';
import { TypeModule } from './type/type.module';
import { ProductModule } from './product/product.module';
import { SessionModule } from './session/session.module';
import { ScheduleModule } from '@nestjs/schedule';
import { OrderModule } from './order/order.module';
import { MeilisearchModule } from './meilisearch/meilisearch.module';
import { CategoryModule } from './category/category.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    SupabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        supabaseKey: configService.get<string>('SUPABASE_KEY'),
        supabaseUrl: configService.get<string>('SUPABASE_URL'),
      }),
    }),
    KiotvietModule,
    BoxModule,
    TypeModule,
    ProductModule,
    SessionModule,
    OrderModule,
    MeilisearchModule,
    CategoryModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
