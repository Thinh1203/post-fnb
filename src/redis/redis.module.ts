import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import {
  RedisModule as RedisModuleConfig,
  RedisModuleOptions,
} from '@nestjs-modules/ioredis';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    RedisModuleConfig.forRootAsync({
      inject: [ConfigService],

      useFactory: async (
        configService: ConfigService,
      ): Promise<RedisModuleOptions> => {
        const redisUrl = configService.get<string>('REDIS_URL');
        return {
          url: redisUrl,
          options: {
            retryStrategy(times) {
              if (times >= 3) {
                return null;
              }
              return Math.min(times * 1000, 5000);
            },
            reconnectOnError: (err) => {
              return (
                err.message.includes('READONLY') ||
                err.message.includes('ECONNREFUSED')
              );
            },
          },
          type: 'single',
        };
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
